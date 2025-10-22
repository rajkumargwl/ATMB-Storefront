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
import { Link } from 'react-router-dom';
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
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="px-5 pt-[24px] md:pt-[32px] hidden">
        <div className="max-w-[1240px] mx-auto ">
        {/* Breadcrumb */}
          <nav className="flex items-center flex-row gap-[7px] mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center flex-row gap-[7px]">
              <li><Link to={`/`}><span className="font-Roboto text-LightGray font-normal leading-[14px] md:leading-[14px] text-[14px] md:text-[14px] tracking-[0.07px]">Home</span> </Link></li>
              <li className="flex items-center flex-row gap-[7px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10.6813 7.71732C10.8362 7.87232 10.8362 8.12732 10.6813 8.28232L6.68125 12.2823C6.52625 12.4373 6.27125 12.4373 6.11625 12.2823C5.96125 12.1273 5.96125 11.8723 6.11625 11.7173L9.83375 7.99982L6.11625 4.28232C5.96125 4.12732 5.96125 3.87232 6.11625 3.71732C6.27125 3.56232 6.52625 3.56232 6.68125 3.71732L10.6813 7.71732Z" fill="#091019"/>
                </svg>
                  <Link to={`#`} aria-current="page"><span className="font-Roboto text-PrimaryBlack font-normal leading-[14px] md:leading-[14px] text-[14px] md:text-[14px] tracking-[0.07px]">Anytime Phone</span> </Link></li>
            </ol>  
          </nav>
          </div>
          </div>
 
        {/* Product Title & Description */}
        <div className="px-5 pt-[24px] md:pt-[32px] hidden">
        <h2 className="text-2xl font-bold">{product.title}</h2>
        <p className="text-gray-600 mt-2">{product.description}</p>
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
        </div>
 
        {/* Plan Card */}
        <div className="rounded-2xl border p-6 shadow-sm bg-white hidden">
          <h3 className="text-xl font-bold">{product.title}</h3>
          <p className="text-2xl font-semibold mt-2">
            US${displayPrice}
            <span className="text-base font-normal">/{billingCycle}</span>
          </p>
          </div>
          {/* Sanity Modules Grid */}
                    {page?.modules && page.modules.length > 0 && (
                      <div className="mb-0 mt-0 px-0 md:px-0">
                        <ModuleGrid items={page.modules} searchQuery={''} homeSearchResults={[]} />
                      </div>
                    )}
          <div className="mt-6 hidden">
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
        
     
      </main>
    </div>
  );
}