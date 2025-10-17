// app/routes/($lang).plans.tsx
import {useLoaderData} from '@remix-run/react';
import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';

import {notFound} from '~/lib/utils';
import {PRODUCT_QUERY} from '~/queries/shopify/product';
import type {Product, ProductVariant} from '@shopify/hydrogen/storefront-api-types';
import {type ShopifyAnalyticsProduct} from '@shopify/hydrogen';
import AddToCartButton from '~/components/product/buttons/AddToCartButton';
import {useState} from 'react';
import { PRODUCT_PAGE_QUERY } from '~/queries/sanity/product';
import { SanityProductPage } from '~/lib/sanity';
import ModuleGrid from '~/components/modules/ModuleGrid'; // Make sure this is imported
// Loader
export async function loader({context, params}: LoaderFunctionArgs) {
  const language = params.lang || 'en';
 
  // Validate supported languages
  const supportedLanguages = ['en', 'es'];
  if (!supportedLanguages.includes(language)) {
    throw notFound();
  }
  
  const cache = context.storefront.CacheCustom({
    mode: 'public',
    maxAge: 60,
    staleWhileRevalidate: 60,
  });




  const handle = params.handle ?? 'business-accelerato';

  const {product} = await context.storefront.query<{product: Product}>(PRODUCT_QUERY, {
    variables: {handle, selectedOptions: []},
  });
  if (!product) throw notFound();
  
   // Fetch PDP modules from Sanity
  const [page] = await Promise.all([
    context.sanity.query<SanityProductPage>({
      query: PRODUCT_PAGE_QUERY,
      params: { slug: handle },
      cache,
    }),
  ]);



  return defer({
    page,
    product,
  });
}

export default function Plans() {
  const {page, product} = useLoaderData<typeof loader>();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  // Every product in Shopify has at least 1 default variant
  const defaultVariant = (product?.variants?.nodes?.[0] ??
    null) as ProductVariant | null;

  if (!defaultVariant) {
    return <p className="text-center text-gray-500 mt-10">No plan available.</p>;
  }

  // Example: yearly price = 12 months - 20% discount
  const basePrice = parseFloat(defaultVariant.price.amount);
  const yearlyPrice = (basePrice * 12 * 0.8).toFixed(2);

  const displayPrice =
    billingCycle === 'monthly' ? basePrice.toFixed(2) : yearlyPrice;

  const productAnalytics: ShopifyAnalyticsProduct = {
    productGid: product.id,
    variantGid: defaultVariant.id,
    name: product.title,
    variantName: defaultVariant.title,
    brand: product.vendor,
    price: displayPrice,
    quantity: 1,
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 p-6">
        {/* Breadcrumb */}
        <p className="text-sm text-gray-500 mb-4">Home &gt; Anytime Phone</p>

        {/* Product Title & Description */}
        <h2 className="text-2xl font-bold">{product.title}</h2>
        <p className="text-gray-600 mt-2">{product.description}</p>

        {/* Billing Toggle */}
        <div className="flex justify-end items-center gap-3 my-6">
          <span className="font-medium">Monthly</span>
          <button
            onClick={() =>
              setBillingCycle((prev) =>
                prev === 'monthly' ? 'yearly' : 'monthly',
              )
            }
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 
              ${billingCycle === 'yearly' ? 'bg-green-500' : 'bg-gray-300'}`}
          >
            <div
              className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-white shadow-md 
                transition-transform duration-300 
                ${billingCycle === 'yearly' ? 'translate-x-7' : 'translate-x-0'}`}
            />
          </button>
       
        </div>

        {/* Plan Card */}
        <div className="rounded-2xl border p-6 shadow-sm bg-white">
          <h3 className="text-xl font-bold">{product.title}</h3>
          <p className="text-2xl font-semibold mt-2">
            US${displayPrice}
            <span className="text-base font-normal">/{billingCycle}</span>
          </p>
          {/* Sanity Modules Grid */}
                    {page?.modules && page.modules.length > 0 && (
                      <div className="mb-8 mt-8 px-0 md:px-0">
                        <ModuleGrid items={page.modules} searchQuery={''} homeSearchResults={[]} />
                      </div>
                    )}
          <div className="mt-6">
            <AddToCartButton
              lines={[{merchandiseId: defaultVariant.id, quantity: 1}]}
              disabled={!defaultVariant.availableForSale}
              analytics={{
                products: [productAnalytics],
                totalValue: parseFloat(productAnalytics.price),
              }}
              buttonClassName="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 w-full"
              text="Add to Cart"
            />
          </div>
        </div>
     
      </main>
    </div>
  );
}
