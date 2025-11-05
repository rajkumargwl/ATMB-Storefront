import {useNavigate, useLoaderData, Await} from '@remix-run/react';
import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
 
import {notFound, validateLocale} from '~/lib/utils';
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
   validateLocale({ context, params });
    let language = params.lang || 'en';
    if(language !== 'en-es'){
      language = 'en';
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
    const planTypeField = variant.metafields?.find((m) => m && m.key === 'plan_type');
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
{/* <div className="flex justify-center items-center gap-3 mb-10">
  <span
    className={`font-medium ${
      billingCycle === 'monthly' ? 'text-black' : 'text-gray-500'
    }`}
  >
    Monthly
  </span>
  <button
    onClick={() =>
      setBillingCycle((prev) =>
        prev === 'monthly' ? 'yearly' : 'monthly',
      )
    }
    className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
      billingCycle === 'yearly' ? 'bg-green-500' : 'bg-gray-300'
    }`}
  >
    <div
      className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-300 ${
        billingCycle === 'yearly' ? 'translate-x-8' : 'translate-x-0'
      }`}
    />
  </button>
  <span
    className={`font-medium ${
      billingCycle === 'yearly' ? 'text-black' : 'text-gray-500'
    }`}
  >
    Yearly <span className="text-green-600 text-sm font-semibold">20% Off</span>
  </span>
</div>
 
{/* Dynamic Plan Cards */}
{/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
  {product?.variants?.nodes?.map((variant: ProductVariant, index: number) => {
    const basePrice = parseFloat(variant.price.amount);
    const yearlyPrice = (basePrice * 12 * 0.8).toFixed(2);
    const displayPrice =
      billingCycle === 'monthly' ? basePrice.toFixed(2) : yearlyPrice;
 
    // Example logic for “Most Popular” badge
    const isMostPopular =
      variant.title?.toLowerCase().includes('50') || index === 1;
 
    const features = [
      variant.title.toLowerCase().includes('unlimited')
        ? 'No live answering minutes'
        : `${variant.title.split(' ')[1]} Live answering minutes`,
      'Appointment scheduling',
      'Appointment scheduling App',
    ];
 
    return (
      <div
        key={variant.id}
        className={`relative rounded-2xl p-8 flex flex-col ${
          isMostPopular
            ? 'border-2 border-orange-500 shadow-md bg-white'
            : 'border border-gray-200 shadow-sm bg-white'
        }`}
      >
        {isMostPopular && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
            🔥 Most Popular
          </span>
        )}
        <h3 className="text-lg font-semibold mb-2">{variant.title}</h3>
        <p className="text-2xl font-bold mb-4">
          ${displayPrice}
          <span className="text-base font-normal text-gray-500">
            /{billingCycle}
          </span>
        </p>
 
        <ul className="space-y-2 text-gray-700 flex-1">
          {features.map((f) => (
            <li key={f}>✓ {f}</li>
          ))}
        </ul>
 
      
         <ReplacePlanAddToCartButton
                    selectedVariant={variant}
                    replaceLineId={replaceLineId}
                    locationProperties={[]}
                    buttonClassName="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600"
                    text="Add to Cart"
                  />
      </div>
    );
  })}
</div> */}
    
         {/* Sanity Modules Grid */}
                 {page?.modules && page.modules.length > 0 && (
                   <div className="mb-0 mt-0 px-0 md:px-0">
                     <ModuleGrid items={page.modules} productData={product} />
                     
                   </div>
                 )}
    
      </main>
    </div>
  );
}