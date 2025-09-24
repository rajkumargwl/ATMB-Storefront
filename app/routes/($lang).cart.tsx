import {Await} from '@remix-run/react';
import {useLoaderData} from '@remix-run/react';
import {Suspense} from 'react';
import {CartActions, CartLineItems, CartSummary} from '~/components/cart/Cart';
import SpinnerIcon from '~/components/icons/Spinner';
import {useRootLoaderData} from '~/root'; 

import CartBundleSection from '~/components/cart/CartBundleSection';
import CartEssentialsSection from '~/components/cart/CartEssentialsSection';
// app/routes/($lang).cart.tsx
import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import type {Product} from '@shopify/hydrogen/storefront-api-types';
import {PRODUCT_QUERY} from '~/queries/shopify/product';
import {notFound} from '~/lib/utils';
// Loader
export async function loader({context}: LoaderFunctionArgs) {
  const cartId = await context.session.get('cartId');

  const [ virtualMailbox, virtualPhone, BusinessAcc] = await Promise.all([
   
    context.storefront.query<{product: Product}>(PRODUCT_QUERY, {
      variables: {handle: 'virtual-mailbox', selectedOptions: []},
    }),
    context.storefront.query<{product: Product}>(PRODUCT_QUERY, {
      variables: {handle: 'virtual-phone-number', selectedOptions: []},
    }),
    context.storefront.query<{product: Product}>(PRODUCT_QUERY, {
      variables: {handle: 'business-accelerato', selectedOptions: []},
    }),
  ]);

  if (!virtualMailbox?.product || !virtualPhone?.product || !BusinessAcc?.product) {
    throw notFound();
  }

  return defer({
    bundleProducts: [virtualMailbox.product, virtualPhone.product],
    essentialsProducts: [BusinessAcc.product],
  });
}


export default function Cart() {
  const rootData = useRootLoaderData();
  const { bundleProducts, essentialsProducts} = useLoaderData<typeof loader>();


  return (
    <section className="px-4 pb-20 pt-10 md:px-8 md:pb-8 md:pt-20">
      <Suspense fallback={<div className="flex justify-center"><SpinnerIcon /></div>}>
        <Await resolve={rootData?.cart}>
          {(cart) => (
            <>
              {cart && (
                <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-3 lg:gap-12">
                  
                  {/* LEFT SIDE */}
                  <div className="col-span-2 space-y-8">
                    <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
                    
                    <CartLineItems linesObj={cart.lines} />

                    <CartBundleSection bundleProducts={bundleProducts} />
                    <CartEssentialsSection essentialsProducts={essentialsProducts} />
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="md:sticky md:top-[80px] space-y-6">
                    <CartSummary cost={cart.cost} />
                    <CartActions cart={cart} />
                  </div>
                </div>
              )}
            </>
          )}
        </Await>
      </Suspense>
    </section>
  );
}
