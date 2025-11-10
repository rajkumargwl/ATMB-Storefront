import {useNavigate, useLoaderData} from '@remix-run/react';
import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {notFound, validateLocale} from '~/lib/utils';
import {PRODUCT_QUERY} from '~/queries/shopify/product';
import type {Product, ProductVariant} from '@shopify/hydrogen/storefront-api-types';
import {type ShopifyAnalyticsProduct} from '@shopify/hydrogen';
import AddToCartButton from '~/components/product/buttons/AddToCartButton';
import {useState, useEffect} from 'react';
import ReplacePlanAddToCartButton from '~/components/cart/ReplacePlanAddToCartButton';
import {useCart} from '@shopify/hydrogen-react';
import { PRODUCT_PAGE_QUERY } from '~/queries/sanity/product';
import { SanityProductPage } from '~/lib/sanity';
import ModuleGrid from '~/components/modules/ModuleGrid'; // Make sure this is imported
import { Link } from 'react-router-dom';
import Recycling from "~/components/icons/Recycle.png";
import OnlineStorage from "~/components/icons/Storage.png";
import MailForwarding from "~/components/icons/send.png";
import LocalPickup from "~/components/icons/Frame.png";
import Scan from "~/components/icons/scan.png";
import Toprated from "~/components/icons/Badge.png";
import Premium from "~/components/icons/Crown.png";
import defaultIcon from "~/components/icons/default.png";
 

const servicesIcons = [
  { name: "Mail Forwarding", icon: MailForwarding },
  { name: "Document Scanning", icon: Scan },
  { name: "Local Pickup", icon: LocalPickup },
  { name: "Recycling", icon: Recycling },
  { name: "Online Storage", icon: OnlineStorage },
  { name: "Top Rated", icon: Toprated },
  { name: "Premium Address", icon: Premium },
];
  import {AnalyticsPageType, type SeoHandleFunction} from '@shopify/hydrogen';
import LocationInfo from '~/components/modules/LocationInfo';
  const seo: SeoHandleFunction = ({data}) => ({
   title: data?.page?.seo?.title || 'Vitual Mailbox',
   description:
     data?.page?.seo?.description ||
     'A custom storefront powered by Hydrogen and Sanity',
 });
 export const handle = { seo };
// Location query from Sanity
const LOCATION_QUERY = /* groq */ `
  *[_type == "location" && locationId == $id][0]{
    _id,
    locationId,
    parentLocationId,
    country,
    countryCode,
    state,
    stateCode,
    city,
    addressLine1,
    postalCode,
    coordinates,
    displayName,
    webkey,
    featureList,
    ratingList,
    attributionList,
    attributeList,
    createdAt,
    planTier,
    priceRange,
    options
  }
`;
 
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
 
  const handle = params.handle ?? 'virtual-mailbox';
 
  // Fetch Shopify product
  const {product} = await context.storefront.query<{product: Product}>(PRODUCT_QUERY, {
    variables: {
      handle,
      selectedOptions: [],
    },
  });
  if (!product) throw notFound();
 
  // Fetch Sanity location dynamically
  const locationId = new URL(request.url).searchParams.get('locationId') ?? '101';
  const location = await context.sanity.query({
    query: LOCATION_QUERY,
    params: {id: locationId},
    cache,
  });
  if (!location) throw notFound();
 
  // Fetch PDP modules from Sanity
  const [page] = await Promise.all([
    context.sanity.query<SanityProductPage>({
      query: PRODUCT_PAGE_QUERY,
      params: { slug: handle },
      cache,
    }),
  ]);

//  console.log("Product variants with metafields:");
//  product.variants.nodes.forEach((variant: any, i: number) => {
//    const metafields = (variant.metafields || [])
//      .filter((m: any) => m !== null)
//      .map((m: any) => ({
//        key: m.key,
//        value: m.value,
//      }));
 
//    console.log(`Variant ${i + 1}:`, {
//      title: variant.title,
//      metafields,
//    });
//  });
 

  return defer({
    location,
    page,
    product,
  });
}
 
export default function Plans() {
  // const {lines} = useCart();
  // console.log('Cart lines in Plans page:', lines);
  const [replaceLineId, setReplaceLineId] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const {location, product, page} = useLoaderData<typeof loader>();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const highlights = Array.from(
    new Set(
      location.featureList
        .filter((featur) => featur.feature.class === "HIGHLIGHT")
        .map((featur) => featur.feature.label)
    )
  );


  const services = Array.from(
    new Set(
      location.featureList
      .filter((featur) => featur.feature.class === "Mail")
      .map((featur) => featur.feature.label)
    )
  );
  // this below code is as per the New Schema of Locations 
//   const services = Array.from(
//   new Set(
//     (location.featureList || [])
//       .filter((item) => item.feature?.class === "Mail")
//       .map((item) => item.feature?.label)
//       .filter(Boolean) // remove undefined/null
//   )
// );
//console.log('services:', services);

  const variants = (product?.variants?.nodes ?? []) as ProductVariant[];
 
  // Filter by billing cycle from metafields
  /*const filteredVariants = variants.filter((variant) => {
    const planTypeField = variant.metafields?.find((m) => m.key === 'plan_type');
    return planTypeField?.value?.toLowerCase() === billingCycle;
  });
 
  // Sort by Shopify's built-in `position`
  const sortedVariants = filteredVariants.sort((a, b) => a.position - b.position);*/
 // Map variants to include metafields
const variantsWithBillingId = variants.map((variant) => {

  const planTypeField = variant.metafields?.find((m) => m && m.key === 'plan_type');
  const billingProductField = variant.metafields?.find((m) => m && m.key === 'billing_product_id');
  const bundleItemsField = variant.metafields?.find((m) => m && m.key === 'bundle_items');

  return {
    ...variant,
    planType: planTypeField?.value?.toLowerCase() || null,
    billingProductId: billingProductField?.value || null,
    bundleItems: bundleItemsField?.value ? JSON.parse(bundleItemsField.value) : null,
  };
});

// Filter variants by billing cycle (monthly/yearly)
const filteredVariants = variantsWithBillingId.filter(
  (variant) => variant.planType === billingCycle
);

// Sort by Shopify's built-in position
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
 
  const locationProperties = Object.entries(location).map(([key, value]) => ({
    key,
    value: String(value), // Shopify requires string values
  }));
  const isTopRated = location?.ratingList?.some(
    (r: any) => r.type === 'TOPRATED'
  );
  const enablePlansSection = page?.modules?.some(
    (mod) => mod._type === "productplans" && mod.enablePlansSection === true
  );
 
  useEffect(() => {
    const storedLineId = sessionStorage.getItem('replaceLineId');
    if (storedLineId) setReplaceLineId(storedLineId);
    //console.log('Replace line ID from sessionStorage:', storedLineId);
  }, []);
 
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">
         
         <LocationInfo location={location} services={services} servicesIcons={servicesIcons}/>
          {/* Sanity Modules Grid */}
          {page?.modules && page.modules.length > 0 && (
            <div className="mb-0 mt-0 px-0 md:px-0">
              <ModuleGrid items={page.modules} searchQuery={''} homeSearchResults={[]} productData={product} highlights={highlights} location={location}  />
            </div>
          )}
 
          
        </main>
      </div>
    </>
  );
}