import {useLoaderData} from '@remix-run/react';
import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
 
import {notFound, validateLocale} from '~/lib/utils';
import {PRODUCT_QUERY} from '~/queries/shopify/product';
import type {Product, ProductVariant} from '@shopify/hydrogen/storefront-api-types';
import {type ShopifyAnalyticsProduct} from '@shopify/hydrogen';
import AddToCartButton from '~/components/product/buttons/AddToCartButton';
import {useState} from 'react';
import { PRODUCT_PAGE_QUERY } from '~/queries/sanity/product';
import { SanityProductPage } from '~/lib/sanity';
import ModuleGrid from '~/components/modules/ModuleGrid'; // Make sure this is imported
import { Link } from 'react-router-dom';

import {AnalyticsPageType, type SeoHandleFunction} from '@shopify/hydrogen';
import PdpAnytimePhoneSection from '~/components/modules/PdpAnytimePhoneSection';
const seo: SeoHandleFunction = ({data}) => ({
  title: data?.page?.seo?.title || 'Buisness Accelerator',
  description:
    data?.page?.seo?.description ||
    'A custom storefront powered by Hydrogen and Sanity',
});
export const handle = { seo };
// Loader
export async function loader({context, params}: LoaderFunctionArgs) {
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
 
   const productData = {
    title: product.title,
    description: product.description || 'Resources, mentorship, and tools to grow faster.',
    // Extract features from product if available, otherwise use default
    features: [
      { text: 'Expert guidance' },
      { text: 'Partner network' },
      { text: 'Growth planning tools' },
    ],
    // Use Sanity main image if available, otherwise null
    mainImage: page?.mainImage ? {
      url: page.mainImage.url,
      alt: page.mainImage.alt || product.title,
    } : undefined,
    // Add testimonial if available from Sanity
    testimonial: page?.testimonial ? {
      authorName: page.testimonial.authorName,
      authorTitle: page.testimonial.authorTitle,
      quote: page.testimonial.quote,
      authorImage: page.testimonial.authorImage ? {
        url: page.testimonial.authorImage.url,
        alt: page.testimonial.authorImage.alt,
      } : undefined,
    } : undefined,
  };



 
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
      

 {page?.modules
  ?.filter((mod) => mod._type === 'pdpanytimePhoneSection')
  ?.map((mod) => (
    <PdpAnytimePhoneSection
      key={mod._key}
      title={mod.title}
      description={mod.description}
    features={
  mod.features?.map((f: any) => ({
    icon: { url: f?.icon?.url }, // wrap URL again inside object
    text: f?.text,
  })) ?? []
}

      mainImage={mod.mainImage}
      testimonial={{
  authorImage: { url: mod.testimonial?.authorImage?.url }, // 🟢 keep object
  authorName: mod.testimonial?.authorName,
  authorTitle: mod.testimonial?.authorTitle,
  quote: mod.testimonial?.quote,
}}
      breadcrumb="Home > Anytime Phone"
      productData={{
        product,
        defaultVariant,
        billingCycle,
        displayPrice,
        setBillingCycle,
        productAnalytics,
      }}
    />
))}

          {/* Sanity Modules Grid */}
                    {page?.modules && page.modules.length > 0 && (
                      <div className="mb-0 mt-0 px-0 md:px-0">
                        <ModuleGrid items={page.modules} searchQuery={''} homeSearchResults={[]} />
                      </div>
                    )}
      
      </main>
    </div>
  );
}