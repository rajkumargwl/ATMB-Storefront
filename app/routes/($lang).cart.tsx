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
import {PRODUCT_QUERY, ALL_PRODUCTS_QUERY,BUNDLE_PRODUCTS_QUERY} from '~/queries/shopify/product';
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
// export async function loader({context}: LoaderFunctionArgs) {
  
//   const [virtualMailbox, virtualPhone, BusinessAcc] = await Promise.all([
//     context.storefront.query<{product: Product}>(PRODUCT_QUERY, {
//       variables: {handle: 'virtual-mailbox', selectedOptions: []},
//     }),
//     context.storefront.query<{product: Product}>(PRODUCT_QUERY, {
//       variables: {handle: 'virtual-phone-number', selectedOptions: []},
//     }),
//     context.storefront.query<{product: Product}>(PRODUCT_QUERY, {
//       variables: {handle: 'business-accelerato', selectedOptions: []},
//     }),
//     // context.storefront.query(ALL_PRODUCTS_QUERY, {
//     //   variables: {first: 50}, 
//     // }),
    
//   ]);

//   if (!virtualMailbox?.product || !virtualPhone?.product || !BusinessAcc?.product) {
//     throw notFound();
//   }
//  // Combine them into an array
// const AllProducts = [
//   virtualMailbox.product,
//   virtualPhone.product,
//   BusinessAcc.product,
// ];

// console.log(AllProducts);
//   return defer({
//     bundleProducts: [virtualMailbox.product, virtualPhone.product],
//     essentialsProducts: AllProducts ?? [],
//   });
// }


// export async function loader({context}: LoaderFunctionArgs) {
//   const {storefront, session, cart} = context;

  
//   const [virtualMailbox, virtualPhone, BusinessAcc] = await Promise.all([
//     storefront.query<{product: Product}>(PRODUCT_QUERY, {
//       variables: {handle: 'virtual-mailbox', selectedOptions: []},
//     }),
//     storefront.query<{product: Product}>(PRODUCT_QUERY, {
//       variables: {handle: 'virtual-phone-number', selectedOptions: []},
//     }),
//     storefront.query<{product: Product}>(PRODUCT_QUERY, {
//       variables: {handle: 'business-accelerato', selectedOptions: []},
//     }),
//   ]);

//   const essentialsProducts = [
//     virtualMailbox.product,
//     virtualPhone.product,
//     BusinessAcc.product,
//   ];

  
//   const cartData = await cart.get(); // Hydrogen Cart API
//   const cartHandles = cartData?.lines?.edges?.map(
//     (line) => line.node.merchandise.product.handle
//   ) || [];

//   //console.log('Cart object:', JSON.stringify(cartData, null, 2));
//   //console.log('Cart product handles:', cartHandles);

 
//   const allBundles = await storefront.query(BUNDLE_PRODUCTS_QUERY, {
//     variables: {country: 'US', language: 'EN'},
//   });
// console.log("bundle data:", allBundles);
//   const bundleProducts = allBundles?.products?.nodes?.filter((bundle) => {
//     return bundle.variants.edges.some((variantEdge) => {
//       const bundleItemsField = variantEdge.node.metafields?.find(
//         (mf) => mf?.key === 'bundle_items'
//       );

//       if (!bundleItemsField?.references?.edges) return false;

//       return bundleItemsField.references.edges.some(
//         (ref) => cartHandles.includes(ref.node.product.handle)
//       );
//     });
//   }) || [];

//   // Fallback if no bundles match
//   const bundlesToShow = bundleProducts.length > 0
//     ? bundleProducts
//     : [virtualMailbox.product, virtualPhone.product];

//   return defer({
//     essentialsProducts,
//     bundleProducts: bundlesToShow,
//     cart: cartData,
//   });
// }

export async function loader({ context }: LoaderFunctionArgs) {
  const { storefront, cart } = context;

  const cartData = await cart.get();
  const cartHandles =
    cartData?.lines?.edges?.map((line) => line.node.merchandise.product.handle) || [];

  const [virtualMailbox, virtualPhone, BusinessAcc] = await Promise.all([
    storefront.query<{ product: Product }>(PRODUCT_QUERY, { variables: { handle: 'virtual-mailbox', selectedOptions: [] } }),
    storefront.query<{ product: Product }>(PRODUCT_QUERY, { variables: { handle: 'virtual-phone-number', selectedOptions: [] } }),
    storefront.query<{ product: Product }>(PRODUCT_QUERY, { variables: { handle: 'business-accelerato', selectedOptions: [] } }),
  ]);

  const essentialsProducts = [virtualMailbox.product, virtualPhone.product, BusinessAcc.product];

  const allBundles = await storefront.query(BUNDLE_PRODUCTS_QUERY, {
    variables: { country: "US", language: "EN" },
  });
  const bundles = allBundles?.products?.nodes || [];

  const displayedHandles = new Set<string>();
  const matchingBundles: any[] = [];

  for (const bundle of bundles) {
    if (cartHandles.includes(bundle.handle)) continue;

    const associatedItemsMap = new Map<string, any>();

    // Collect all associated items for this bundle
    for (const variantEdge of bundle.variants.edges) {
      const bundleItemsField = variantEdge.node.metafields?.find(
        (mf) => mf?.key === "bundle_items"
      );
      const refs = bundleItemsField?.references?.edges || [];

      for (const ref of refs) {
        const product = ref.node.product;
        const variant = ref.node;
        if (!product) continue;

        const handle = product.handle || product.id;

        // Deduplicate globally and per bundle
        if (!associatedItemsMap.has(handle) && !displayedHandles.has(handle)) {
          const featuresMf = variant.metafields?.find((mf: any) => mf.key === "features");
          let features: string[] = [];
          if (featuresMf?.value) {
            try { features = JSON.parse(featuresMf.value); } catch { features = [featuresMf.value]; }
          }

          associatedItemsMap.set(handle, {
            productId: product.id,
            productHandle: handle,
            productTitle: product.title,
            variantId: variant.id,
            variantTitle: variant.title,
            price: variant.priceV2?.amount ?? null,
            currency: variant.priceV2?.currencyCode ?? "USD",
            inCart: cartHandles.includes(handle),
            features,
          });

          displayedHandles.add(handle); // mark as displayed globally
        }
      }
    }

    const associatedItems = Array.from(associatedItemsMap.values());
    if (associatedItems.length === 0) continue;

    const monthlyVariant = bundle.variants.edges.find(v => v.node.title.toLowerCase() === "monthly")?.node;
    const yearlyVariant = bundle.variants.edges.find(v => v.node.title.toLowerCase() === "yearly")?.node;

    const bundleFeatureMf = bundle.metafields?.find((mf: any) => mf.key === "bundle_feature");
    let bundleFeature: string[] = [];
    if (bundleFeatureMf?.value) {
      try {
        const parsed = JSON.parse(bundleFeatureMf.value);
        if (Array.isArray(parsed)) bundleFeature = parsed;
      } catch {
        bundleFeature = [bundleFeatureMf.value];
      }
    }

    matchingBundles.push({
      id: bundle.id,
      title: bundle.title,
      handle: bundle.handle,
      description: bundle.description,
      image: bundle.featuredImage?.url ?? null,
      price: monthlyVariant?.priceV2?.amount ?? null,
      compareAtPrice: monthlyVariant?.compareAtPriceV2?.amount ?? null,
      yearlyPrice: yearlyVariant?.priceV2?.amount ?? null,
      yearlyCompareAtPrice: yearlyVariant?.compareAtPriceV2?.amount ?? null,
      currency: monthlyVariant?.priceV2?.currencyCode ?? "USD",
      monthlyVariantId: monthlyVariant?.id ?? null,
      yearlyVariantId: yearlyVariant?.id ?? null,
      billing: "monthly",
      bundleFeature,
      associatedItems,
      itemsInCart: associatedItems.filter(i => i.inCart).map(i => i.productHandle),
    });
  }

  return defer({
    bundleProducts: matchingBundles,
    cart: cartData,
    essentialsProducts,
  });
}



export default function Cart() {
  const rootData = useRootLoaderData();
  const { bundleProducts, essentialsProducts} = useLoaderData<typeof loader>();
  
//console.log('Essentials Products in Cart page:', essentialsProducts);
  return (
    <section className="">
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
          <div className="">
            <div className="bg-white px-5 pt-[32px] pb-[40px] md:pb-[60px]">
              <div className='max-w-[1240px] mx-auto'>
                <div className='flex flex-row items-center justify-start mb-6 md:mb-8 gap-3 md:gap-6'>
                    <span className='flex items-center justify-center w-[32px] md:w-[48px] h-[32px] md:h-[48px] border border-LightWhite rounded-full'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className='w-[16px] md:w-[24px] h-[16px] md:h-[24px]'>
                        <path d="M9.53027 5.33008C9.56751 5.29284 9.63366 5.29284 9.6709 5.33008C9.70773 5.36727 9.70774 5.43254 9.6709 5.46973L3.24121 11.8994H21C21.0539 11.8994 21.1006 11.9461 21.1006 12C21.1005 12.0538 21.0538 12.0996 21 12.0996H3.24121L9.6709 18.5293C9.70807 18.5665 9.70794 18.6326 9.6709 18.6699C9.63366 18.7072 9.56751 18.7072 9.53027 18.6699L2.93066 12.0703C2.89343 12.0331 2.89343 11.9669 2.93066 11.9297L9.53027 5.33008Z" fill="#091019" stroke="#091019"/>
                      </svg>
                    </span>
                    <h1 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[38.4px] text-[24px] md:text-[32px] tracking-[-0.36px] md:tracking-[-0.48px]">Your Cart</h1>
                </div>
              </div>
            <div className='max-w-[1240px] mx-auto gap-[24px] md:gap-[59px] flex flex-col lg:flex-row'>
              <div className='w-full lg:w-[65.35%]'>                
                <CartLineItems linesObj={cart.lines} />
              </div>
              <div className="w-full lg:w-[34.65%] md:sticky md:top-[80px] space-y-6">
                <CartSummary cart={cart} cost={cart.cost} />
                <CartActions cart={cart} />
              </div>
            </div>

            </div>
           

            <div className="bg-[#F6F6F6] px-5 pt-[40px] md:pt-[60px] pb-[40px] md:pb-[60px] lg:pb-[120px]"> 
              <div className='max-w-[1240px] mx-auto flex flex-col lg:flex-row gap-[24px] md:gap-[40px]'>

              <CartBundleSection bundleProducts={bundleProducts} />
              <CartEssentialsSection essentialsProducts={firstEssential ? [firstEssential] : []} />
            </div>
            </div>        

      
           
          </div>
        )}

        {!cart?.lines?.edges?.length && (
          <div className='px-5 py-[40px] md:py-[60px] lg:py-[150px]'>
            <div className="mx-auto max-w-[1240px] text-center flex flex-col items-center  gap-6">
              <h1 className="text-center font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]">Your Cart is Empty</h1>
              <p className="font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">Looks like you haven't added anything to your cart yet.</p>
              <a
                href="/"
                className="flex items-center justify-center bg-DarkOrange text-white font-normal font-Roboto text-[16px] tracking-[0.08px] py-[12px] px-4 rounded-full h-[52px] min-w-[207px]"
              >
                Continue Shopping
              </a>
            </div>
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
