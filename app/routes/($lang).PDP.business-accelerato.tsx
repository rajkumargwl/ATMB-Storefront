// app/routes/($lang).plans.tsx
import {useLoaderData} from '@remix-run/react';
import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import Header from '~/components/global/Header';
import Footer from '~/components/global/Footer';
import {HEADER_QUERY} from '~/queries/sanity/header';
import {FOOTER_QUERY} from '~/queries/sanity/footer';
import {notFound} from '~/lib/utils';
import {PRODUCT_QUERY} from '~/queries/shopify/product';
import type {Product, ProductVariant} from '@shopify/hydrogen/storefront-api-types';
import {type ShopifyAnalyticsProduct} from '@shopify/hydrogen';
import AddToCartButton from '~/components/product/buttons/AddToCartButton';
import {useState} from 'react';

// Loader
export async function loader({context, params}: LoaderFunctionArgs) {
  const cache = context.storefront.CacheCustom({
    mode: 'public',
    maxAge: 60,
    staleWhileRevalidate: 60,
  });

  const [header, footer] = await Promise.all([
    context.sanity.query({query: HEADER_QUERY, cache}),
    context.sanity.query({query: FOOTER_QUERY, cache}),
  ]);

  if (!header || !footer) throw notFound();

  const handle = params.handle ?? 'business-accelerato';

  const {product} = await context.storefront.query<{product: Product}>(PRODUCT_QUERY, {
    variables: {handle, selectedOptions: []},
  });
  if (!product) throw notFound();

  return defer({
    header,
    footer,
    product,
  });
}

export default function Plans() {
  const {header, footer, product} = useLoaderData<typeof loader>();
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
          <span className="font-medium">
            Yearly <span className="text-green-600">20% Off</span>
          </span>
        </div>

        {/* Plan Card */}
        <div className="rounded-2xl border p-6 shadow-sm bg-white">
          <h3 className="text-xl font-bold">{product.title}</h3>
          <p className="text-2xl font-semibold mt-2">
            US${displayPrice}
            <span className="text-base font-normal">/{billingCycle}</span>
          </p>

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

        {/* Highlights */}
        <div className="bg-black text-white rounded-xl mt-12 p-6 text-center">
          <h4 className="font-semibold mb-4">Key Highlights</h4>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span>Dedicated Local or Toll-Free Number</span>|
            <span>Unlimited Calling</span>|
            <span>Custom Greetings & Auto-Attendant</span>|
            <span>411 Directory Listing</span>
          </div>
        </div>
      </main>
    </div>
  );
}
