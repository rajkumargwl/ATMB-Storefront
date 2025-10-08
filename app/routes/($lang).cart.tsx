// app/routes/($lang).cart.tsx

import {Await, useLoaderData} from '@remix-run/react';
import {Suspense} from 'react';
import {useRootLoaderData} from '~/root'; 
import {
  CartActions,
  CartLineItems,
  CartSummary,
} from '~/components/cart/Cart';
import {
  CartForm,
  type CartQueryData,
  type SeoHandleFunction,
} from '@shopify/hydrogen';
import SpinnerIcon from '~/components/icons/Spinner';
import CartBundleSection from '~/components/cart/CartBundleSection';
import CartEssentialsSection from '~/components/cart/CartEssentialsSection';

import {
  defer,
  json,
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  redirect,
} from '@shopify/remix-oxygen';
import type {Product} from '@shopify/hydrogen/storefront-api-types';
import {PRODUCT_QUERY, ALL_PRODUCTS_QUERY} from '~/queries/shopify/product';
import {notFound} from '~/lib/utils';
import {isLocalPath} from '~/lib/utils';
import invariant from 'tiny-invariant';

const seo: SeoHandleFunction = () => ({
  title: 'Cart',
  noIndex: true,
});

export const handle = {
  seo,
};

export async function action({request, context}: ActionFunctionArgs) {
  const {session, cart} = context;

  const [formData, customerAccessToken] = await Promise.all([
    request.formData(),
    session.get('customerAccessToken'),
  ]);

  const {action, inputs} = CartForm.getFormInput(formData);
  invariant(action, 'No cartAction defined');

  let status = 200;
  let result: CartQueryData;

  switch (action) {
    case CartForm.ACTIONS.LinesAdd:
      result = await cart.addLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesUpdate:
      result = await cart.updateLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesRemove:
      result = await cart.removeLines(inputs.lineIds);
      break;
    case CartForm.ACTIONS.DiscountCodesUpdate: {
      const formDiscountCode = inputs.discountCode;

      // User inputted discount code
      const discountCodes = (
        formDiscountCode ? [formDiscountCode] : []
      ) as string[];

      // Combine discount codes already applied on cart
      discountCodes.push(...inputs.discountCodes);

      result = await cart.updateDiscountCodes(discountCodes);
      break;
    }
    case CartForm.ACTIONS.BuyerIdentityUpdate:
      result = await cart.updateBuyerIdentity({
        ...inputs.buyerIdentity,
        customerAccessToken,
      });
      break;
      case 'REPLACE_LINE': {
        if (inputs.lineIds?.length) {
          await cart.removeLines(inputs.lineIds);
        }
      
        if (inputs.lines?.length) {
          result = await cart.addLines(inputs.lines);
        } else {
          result = await cart.get();
        }
        break;
      }
    default:
      invariant(false, `${action} cart action is not defined`);
  }

  /**
   * The Cart ID may change after each mutation. We need to update it each time in the session.
   */
  const cartId = result.cart.id;
  const headers = cart.setCartId(result.cart.id);

  // const redirectTo = formData.get('redirectTo') ?? null;
  // if (typeof redirectTo === 'string' && isLocalPath(request, redirectTo)) {
  //   status = 303;
  //   headers.set('Location', redirectTo);
  // }
  // const redirectTo = formData.get('redirectTo');
  // if (typeof redirectTo === 'string' && isLocalPath(request, redirectTo)) {
  //   return redirect(redirectTo, {headers});
  // }
  if (inputs.redirectTo && typeof inputs.redirectTo === 'string') {
    return redirect(inputs.redirectTo, {headers});
  }


  const {cart: cartResult, errors} = result;
  return json(
    {
      cart: cartResult,
      errors,
      analytics: {
        cartId,
      },
    },
    {status, headers},
  );
}
export async function loader({context}: LoaderFunctionArgs) {
  
  const [virtualMailbox, virtualPhone, BusinessAcc] = await Promise.all([
    context.storefront.query<{product: Product}>(PRODUCT_QUERY, {
      variables: {handle: 'virtual-mailbox', selectedOptions: []},
    }),
    context.storefront.query<{product: Product}>(PRODUCT_QUERY, {
      variables: {handle: 'virtual-phone-number', selectedOptions: []},
    }),
    context.storefront.query<{product: Product}>(PRODUCT_QUERY, {
      variables: {handle: 'business-accelerato', selectedOptions: []},
    }),
    // context.storefront.query(ALL_PRODUCTS_QUERY, {
    //   variables: {first: 50}, 
    // }),
    
  ]);

  if (!virtualMailbox?.product || !virtualPhone?.product || !BusinessAcc?.product) {
    throw notFound();
  }
 // Combine them into an array
const AllProducts = [
  virtualMailbox.product,
  virtualPhone.product,
  BusinessAcc.product,
];

console.log(AllProducts);
  return defer({
    bundleProducts: [virtualMailbox.product, virtualPhone.product],
    essentialsProducts: AllProducts ?? [],
  });
}
export default function Cart() {
  const rootData = useRootLoaderData();
  const { bundleProducts, essentialsProducts} = useLoaderData<typeof loader>();
  
console.log('Essentials Products in Cart page:', essentialsProducts);
  return (
    <section className="px-4 pb-20 pt-10 md:px-8 md:pb-8 md:pt-20">
      <Suspense fallback={<div className="flex justify-center"><SpinnerIcon /></div>}>
      <Await resolve={rootData?.cart}>
  {(cart) => {
   const availableEssentials = essentialsProducts.filter(
    (product) =>
      !cart.lines.edges.some(
        (line) => line.node.merchandise.product.handle === product.handle
      )
  );
  const firstEssential = availableEssentials.length
  ? availableEssentials[Math.floor(Math.random() * availableEssentials.length)]
  : null;

    return (
      <>
        {cart && cart.lines.edges.length > 0 && (
          <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-3 lg:gap-12">
            {/* LEFT SIDE */}
            <div className="col-span-2 space-y-8">
              <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
              
              <CartLineItems linesObj={cart.lines} />

              <CartBundleSection bundleProducts={bundleProducts} />
              <CartEssentialsSection essentialsProducts={firstEssential ? [firstEssential] : []} />
            </div>

            {/* RIGHT SIDE */}
            <div className="md:sticky md:top-[80px] space-y-6">
              <CartSummary cart={cart} cost={cart.cost} />
              <CartActions cart={cart} />
            </div>
          </div>
        )}

        {!cart?.lines?.edges?.length && (
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-2xl font-semibold mb-4">Your Cart is Empty</h1>
            <p className="mb-8">Looks like you haven't added anything to your cart yet.</p>
            <a
              href="/"
              className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600"
            >
              Continue Shopping
            </a>
          </div>
        )}
      </>
    );
  }}
</Await>

      </Suspense>
    </section>
  );
}
