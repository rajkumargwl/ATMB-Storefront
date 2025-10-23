import {useNavigate, useLoaderData, Await} from '@remix-run/react';
import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
 
import {notFound} from '~/lib/utils';
import {PRODUCT_QUERY} from '~/queries/shopify/product';
import type {Product, ProductVariant} from '@shopify/hydrogen/storefront-api-types';
import {type ShopifyAnalyticsProduct} from '@shopify/hydrogen';
import AddToCartButton from '~/components/product/buttons/AddToCartButton';
import {useState, useEffect, Suspense} from 'react';
import ReplacePlanAddToCartButton from '~/components/cart/ReplacePlanAddToCartButton';
import { PRODUCT_PAGE_QUERY } from '~/queries/sanity/product';
import { SanityProductPage } from '~/lib/sanity';
import ModuleGrid from '~/components/modules/ModuleGrid'; // Make sure this is imported
import { SanityPreview } from 'hydrogen-sanity';
// Loader
// -----------------
import {AnalyticsPageType, type SeoHandleFunction} from '@shopify/hydrogen';
const seo: SeoHandleFunction = ({data}) => ({
  title: data?.page?.seo?.title || 'Virtual phone number',
  description:
    data?.page?.seo?.description ||
    'A custom storefront powered by Hydrogen and Sanity',
});
export const handle = { seo };
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
 
 
 
  //if (!page) throw notFound();

  const handle = params.handle ?? 'virtual-phone-number';
    const [page] = await Promise.all([
      context.sanity.query<SanityProductPage>({
        query: PRODUCT_PAGE_QUERY,
        params: { slug: handle },
        cache,
      }),
    ]);
 
  const {product} = await context.storefront.query<{product: Product}>(PRODUCT_QUERY, {
    variables: {handle, selectedOptions: []},
  });
  if (!product) throw notFound();
 
  return defer({
   
   
    product,
    page,
   
  });
}
 
// -----------------
// Component
// -----------------
export default function Plans() {
  const [replaceLineId, setReplaceLineId] = useState<string | null>(null);
  const {page, product} = useLoaderData<typeof loader>();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
 
  const variants = (product?.variants?.nodes ?? []) as ProductVariant[];
  const filteredVariants = variants.filter((variant) => {
    const planTypeField = variant.metafields?.find((m) => m.key === 'plan_type');
    return planTypeField?.value?.toLowerCase() === billingCycle;
  });
  const sortedVariants = filteredVariants.sort((a, b) => a.position - b.position);
 
  useEffect(() => {
    const storedLineId = sessionStorage.getItem('replaceLineId');
    if (storedLineId) setReplaceLineId(storedLineId);
  }, []);
 
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1">
        {/* <p className="text-sm text-gray-500 mb-4">Home &gt; Anytime Phone</p> */}
 
        {/* ✅ Sanity data rendering same as About Us */}
       
 
          {/* Inro Section */}
          <section className="flex flex-col md:flex-row items-center gap-8 mb-16">
          {/* LEFT SIDE - TEXT */}
          {/* <div className="flex-1 space-y-6">
            <h1 className="text-4xl font-bold text-gray-900">
              {page.introSection?.heading}
            </h1>
 
            <p className="text-gray-600">{page.introSection?.description}</p>
 
          
            <div className="flex flex-wrap gap-4 mt-4">
              {page.introSection?.features?.map((feat: any, i: number) => (
                <div key={i} className="flex items-center gap-2">
                  {feat.icon?.asset?.url && (
                    <img
                      src={feat.icon.asset.url}
                      alt={feat.icon.asset.altText || 'icon'}
                      className="w-5 h-5"
                    />
                  )}
                  <span className="text-sm text-gray-700">{feat.text}</span>
                </div>
              ))}
            </div>
 
            {page.introSection?.testimonial && (
              <div className="flex items-center gap-3 mt-8 bg-gray-100 p-4 rounded-lg max-w-md">
                {page.introSection.testimonial.authorImage?.asset?.url && (
                  <img
                    src={page.introSection.testimonial.authorImage.asset.url}
                    alt={page.introSection.testimonial.author}
                    className="w-12 h-12 rounded-full"
                  />
                )}
                <div>
                  <p className="text-sm italic text-gray-700">
                    “{page.introSection.testimonial.quote}”
                  </p>
                  <p className="text-sm font-semibold">
                    {page.introSection.testimonial.author}
                  </p>
                  <p className="text-xs text-gray-500">
                    {page.introSection.testimonial.role}
                  </p>
                </div>
              </div>
            )}
          </div> */}
 
          {/* RIGHT SIDE - IMAGE */}
          {/* <div className="flex-1 flex justify-center">
            {page.introSection?.rightImage?.asset?.url && (
              <img
                src={page.introSection.rightImage.asset.url}
                alt={page.introSection.rightImage.asset.altText || 'Intro image'}
                className="rounded-xl shadow-lg w-full max-w-md"
              />
            )}
          </div> */}
        </section>
        {/* END HERO SECTION */}
 
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
 
         {/* Sanity Modules Grid */}
                 {page?.modules && page.modules.length > 0 && (
                   <div className="mb-8 mt-8 px-0 md:px-0">
                     <ModuleGrid items={page.modules} />
                   </div>
                 )}
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