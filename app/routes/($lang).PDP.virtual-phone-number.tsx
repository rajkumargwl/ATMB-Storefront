// app/routes/($lang).plans.tsx
import {useNavigate, useLoaderData} from '@remix-run/react';
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
import {useState, useEffect} from 'react';
import ReplacePlanAddToCartButton from '~/components/cart/ReplacePlanAddToCartButton';

// Loader
export async function loader({context, params, request}: LoaderFunctionArgs) {
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

  const [header, footer] = await Promise.all([
    context.sanity.query({query: HEADER_QUERY,params: { language }, cache}),
    context.sanity.query({query: FOOTER_QUERY,params: { language }, cache}),
  ]);

  if (!header || !footer) throw notFound();

  const handle = params.handle ?? 'virtual-phone-number';

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
  const [replaceLineId, setReplaceLineId] = useState<string | null>(null);
  const {header, footer, product} = useLoaderData<typeof loader>();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const variants = (product?.variants?.nodes ?? []) as ProductVariant[];

  const filteredVariants = variants.filter((variant) => {
    const planTypeField = variant.metafields?.find((m) => m.key === 'plan_type');
    return planTypeField?.value?.toLowerCase() === billingCycle;
  });

  const sortedVariants = filteredVariants.sort((a, b) => a.position - b.position);

  const productAnalytics: ShopifyAnalyticsProduct | null = selectedVariant
    ? {
        productGid: product.id,
        variantGid: selectedVariant.id,
        name: product.title,
        variantName: selectedVariant.title,
        brand: product.vendor,
        price: selectedVariant.price.amount,
        quantity: 1,
      }
    : null;
useEffect(() => {
    const storedLineId = sessionStorage.getItem('replaceLineId');
    if (storedLineId) setReplaceLineId(storedLineId);
  }, []);
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
      setBillingCycle((prev) => (prev === 'monthly' ? 'yearly' : 'monthly'))
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

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sortedVariants.map((variant, idx) => {
            const isSelected = selectedVariant?.id === variant.id;
            return (
              <div
                key={variant.id}
                className={`rounded-2xl border p-6 shadow-sm relative bg-white cursor-pointer transition ${
                  isSelected
                    ? 'border-orange-500 ring-2 ring-orange-300'
                    : 'border-gray-200'
                }`}
                onClick={() => setSelectedVariant(variant)}
              >
                {idx === 1 && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold">{variant.title}</h3>
                <p className="text-2xl font-semibold mt-2">
                  US${variant.price.amount}
                  <span className="text-base font-normal">/{billingCycle}</span>
                </p>

                <ul className="mt-4 space-y-2">
                  {variant.selectedOptions.map((opt, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-green-600">✔</span>
                      <span>{opt.value}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <button
                    className={`w-full py-2 rounded-xl font-semibold ${
                      isSelected
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {isSelected ? 'Selected' : 'Select'}
                  </button>
                </div>
              </div>
            );
          })}
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

        {/* Bottom Add to Cart */}
        {selectedVariant && (
          <div className="flex justify-between items-center mt-6 p-4 bg-white rounded-xl shadow-md">
            <div>
              <h5 className="font-bold">{selectedVariant.title}</h5>
              <p className="text-red-600 font-semibold">
                US${selectedVariant.price.amount}/{billingCycle}
              </p>
            </div>
            {/* <AddToCartButton
              lines={[
                {merchandiseId: selectedVariant.id, quantity: 1},
              ]}
              disabled={!selectedVariant.availableForSale}
              analytics={
                productAnalytics
                  ? {
                      products: [productAnalytics],
                      totalValue: parseFloat(productAnalytics.price),
                    }
                  : undefined
              }
              buttonClassName="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600"
              text="Add to Cart"
            /> */}
             <ReplacePlanAddToCartButton
              selectedVariant={selectedVariant}
              replaceLineId={replaceLineId}
              locationProperties={[]}
              disabled={!selectedVariant || !selectedVariant.availableForSale}
              buttonClassName="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600"
              text={selectedVariant ? 'Add to Cart' : 'Select a Plan First'}
            />
          </div>
        )}
      </main>
    </div>
  );
}
