import {useNavigate, useLoaderData} from '@remix-run/react';
import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {notFound} from '~/lib/utils';
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
  console.log('Page data:', page);
  console.log('Location data:', location);
  const highlights = Array.from(
    new Set(
      location.featureList
        .filter((feature) => feature.class === "HIGHLIGHT")
        .map((feature) => feature.label)
    )
  );

  const services = Array.from(
    new Set(
      location.featureList
        .filter((feature) => feature.class !== "HIGHLIGHT")
        .map((feature) => feature.label)
    )
  );

 
  const variants = (product?.variants?.nodes ?? []) as ProductVariant[];
 
  // Filter by billing cycle from metafields
  const filteredVariants = variants.filter((variant) => {
    const planTypeField = variant.metafields?.find((m) => m.key === 'plan_type');
    return planTypeField?.value?.toLowerCase() === billingCycle;
  });
 
  // Sort by Shopify's built-in `position`
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
    console.log('Replace line ID from sessionStorage:', storedLineId);
  }, []);
 
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">
          {/* Breadcrumb + Title */}
          <div className="px-5 pt-[24px] md:pt-[32px]">
          <div className="max-w-[1240px] mx-auto ">
             <nav className="flex items-center flex-row gap-[7px] mb-6" aria-label="Breadcrumb">
                <ol className="flex items-center flex-row gap-[7px]">
                  <li><Link to={`#`}><span className="font-Roboto text-LightGray font-normal leading-[14px] md:leading-[14px] text-[14px] md:text-[14px] tracking-[0.07px]">Virtual Mailbox</span> </Link></li>
                  <li className='flex items-center flex-row gap-[7px]'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M10.6813 7.71732C10.8362 7.87232 10.8362 8.12732 10.6813 8.28232L6.68125 12.2823C6.52625 12.4373 6.27125 12.4373 6.11625 12.2823C5.96125 12.1273 5.96125 11.8723 6.11625 11.7173L9.83375 7.99982L6.11625 4.28232C5.96125 4.12732 5.96125 3.87232 6.11625 3.71732C6.27125 3.56232 6.52625 3.56232 6.68125 3.71732L10.6813 7.71732Z" fill="#091019"/>
                    </svg>
                    <Link to={`#`}><span className="font-Roboto text-LightGray font-normal leading-[14px] md:leading-[14px] text-[14px] md:text-[14px] tracking-[0.07px]">Locations</span> </Link></li>
                  <li className="flex items-center flex-row gap-[7px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M10.6813 7.71732C10.8362 7.87232 10.8362 8.12732 10.6813 8.28232L6.68125 12.2823C6.52625 12.4373 6.27125 12.4373 6.11625 12.2823C5.96125 12.1273 5.96125 11.8723 6.11625 11.7173L9.83375 7.99982L6.11625 4.28232C5.96125 4.12732 5.96125 3.87232 6.11625 3.71732C6.27125 3.56232 6.52625 3.56232 6.68125 3.71732L10.6813 7.71732Z" fill="#091019"/>
                    </svg>
                      <Link to={`#`} aria-current="page"><span className="font-Roboto text-PrimaryBlack font-normal leading-[14px] md:leading-[14px] text-[14px] md:text-[14px] tracking-[0.07px]">{location?.displayName} </span> </Link></li>
                </ol>  
            </nav>          
           
            {/* <h2 className="text-2xl font-bold mt-2">{product?.title}</h2>
            <p className="text-lg font-semibold">{location?.displayName}</p>
            <p className="text-gray-600">{location?.addressLine1}</p>
            <p className="text-gray-600">
              Mailbox ID: <span className="font-bold">#{location.locationId}</span>
            </p> */}
          </div>
          </div>
 
          {/* Billing cycle toggle */}
          {/* <div className="flex justify-center items-center gap-4 mb-8">
            <span
              onClick={() => setBillingCycle('monthly')}
              className={`cursor-pointer px-4 py-2 rounded-full font-medium ${
                billingCycle === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Monthly
            </span>
            <span
              onClick={() => setBillingCycle('yearly')}
              className={`cursor-pointer px-4 py-2 rounded-full font-medium ${
                billingCycle === 'yearly'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Yearly
            </span>
          </div>
  */}
          {/* Plans Grid */}
          {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {sortedVariants.map((variant) => {
              const isSelected = selectedVariant?.id === variant.id;
              return (
                <div
                  key={variant.id}
                  className={`rounded-2xl border p-6 shadow-sm relative bg-white cursor-pointer ${
                    isSelected
                      ? 'border-blue-500 ring-2 ring-blue-300'
                      : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedVariant(variant)}
                >
                  <h3 className="text-xl font-bold">{variant.title}</h3>
                  <p className="text-2xl font-semibold mt-2">
                    {variant.price.amount} {variant.price.currencyCode}
                    <span className="text-base font-normal">
                      /{billingCycle}
                    </span>
                  </p>
 
                  <ul className="mt-4 space-y-2">
                    {variant.selectedOptions.map((opt, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-green-600">✔</span>
                        <span>
                          {opt.name}: {opt.value}
                        </span>
                      </li>
                    ))}
                  </ul>
 
                  {isSelected && (
                    <span className="absolute top-2 right-2 text-blue-600 font-semibold">
                      ✓ Selected
                    </span>
                  )}
                </div>
              );
            })}
          </div> */}
 {/* Location Info Section */}
<div className="max-w-[1240px] mx-auto mt-12 px-5 md:px-0">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
    
    {/* Left: Location Title and Features */}
    <div>
      <h2 className="text-[28px] font-bold text-PrimaryBlack mb-2">
        {location?.displayName} 
      </h2>

      <div className="flex items-center gap-3 mb-4">
      {isTopRated && (
    <>
        <div className="flex items-center gap-1 text-[#FF7A00] font-medium text-sm">
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
          </svg> */}
          <img src={Toprated} alt="Top Rated" className="w-4 h-4"/>
          <span>TOP RATED</span>
        </div>
         <span className="text-gray-400">|</span>
    </>
      )}
       
        <div className="flex items-center gap-1 text-[#0070F3] font-medium text-sm">
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg> */}
          <img src={Premium} alt="Premium Address" className="w-4 h-4"/>
          <span>PREMIUM ADDRESS</span>
        </div>
      </div>

      {/* Features */}
      <div className="bg-[#F8F8F8] border border-[#EAEAEA] rounded-[12px] p-6">
        <h3 className="text-gray-700 font-semibold mb-3">Services</h3>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {/* {location?.featureList?.length > 0 ? (
            location.featureList.map((feature) => (
              <div key={feature._key} className="flex items-center gap-2 text-[16px] text-gray-800">
                <span className="text-[#FF7A00]">📦</span>
                <span>{feature.label}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No services available</p>
          )} */}
            {services.length > 0 ? (
          services.map((feature) => {
            const matchedService = servicesIcons.find(
              (service) =>
                service.name.toLowerCase() === feature.toLowerCase()
            );

            return (
              <div
                key={feature._key}
                className="flex items-center gap-2 text-[16px] text-gray-800"
              >
                <img
                  src={matchedService?.icon ||defaultIcon}
                  alt={feature}
                  className="w-5 h-5"
                />
                <span>{feature}</span>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-sm">No services available</p>
        )}
        
  



        </div>
      </div>
    </div>

    {/* Right: Address Preview */}
    <div className="border border-dashed border-gray-400 rounded-[12px] p-6">
      <h3 className="text-gray-600 font-medium mb-4">Your Real Street Address Preview</h3>
      <p className="text-PrimaryBlack font-semibold">Your Name</p>
      <p className="text-PrimaryBlack font-semibold mb-2">Your Company Name</p>
      <p>{location?.addressLine1}</p>
      <p>
        Ste #<span className="font-semibold">MAILBOX</span>
      </p>
      <p>
        {location?.city}, {location?.state} {location?.postalCode}
      </p>
      <p>{location?.country}</p>
    </div>
  </div>
</div>
{/* plans */}
{enablePlansSection && (
  <section className="py-9">
    {/* Toggle Button */}
    <h2 className="text-3xl font-bold text-center mb-6">Plans & Pricing</h2>
    <span className="text-center text-gray-600 mb-4 block">Select a service plan that fits your needs.</span>
    <div className="flex justify-center mb-10">
      <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2">
        <span
          className={`text-sm font-semibold transition-colors ${
            billingCycle === "monthly" ? "text-orange-600" : "text-gray-500"
          }`}
        >
          Monthly
        </span>

        {/* Toggle Switch */}
        <button
          onClick={() =>
            setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")
          }
          className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
            billingCycle === "yearly" ? "bg-orange-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-[3px] left-[3px] w-[18px] h-[18px] bg-white rounded-full shadow transition-transform duration-300 ${
              billingCycle === "yearly" ? "translate-x-6" : "translate-x-0"
            }`}
          ></span>
        </button>

        <span
          className={`text-sm font-semibold transition-colors ${
            billingCycle === "yearly" ? "text-orange-600" : "text-gray-500"
          }`}
        >
          Yearly (Save 20%)
        </span>
      </div>
    </div>

    {/* Plan Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {sortedVariants.map((variant) => {
        const isPopular = variant.title === "Silver";

        // Safe price parsing
        const rawAmount = variant?.price?.amount ?? 0;
        const parsed =
          typeof rawAmount === "number"
            ? rawAmount
            : parseFloat(String(rawAmount).replace(/[^0-9.-]+/g, ""));
        const monthlyPrice = Number.isFinite(parsed) ? parsed : 0;

        // Apply billing cycle logic
        const displayPrice =
          billingCycle === "yearly"
            ? (monthlyPrice * 12 * 0.8).toFixed(2)
            : monthlyPrice.toFixed(2);

        const currency = variant?.price?.currencyCode ?? "$";

        return (
          <div
            key={variant.id}
            className="relative rounded-3xl border bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg border-gray-200"
          >
            {/* Most Popular Badge */}
            {isPopular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-100 text-orange-600 text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                🔥 Most Popular
              </span>
            )}

            {/* Title and Price */}
            <h3 className="text-xl font-bold mt-2">{variant.title}</h3>
            <p className="text-sm text-gray-500 mt-2">Starting from</p>
            <p className="text-2xl font-bold mt-1">
              {currency}
              {displayPrice}
              <span className="text-base font-normal text-gray-500">
                /{billingCycle.toLowerCase()}
              </span>
            </p>

            {/* Features */}
            <ul className="mt-6 space-y-3 text-left">
              {variant.selectedOptions.map((opt, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700">
                  <span className="text-green-600">✔</span>
                  <span>{opt.value}</span>
                </li>
              ))}
            </ul>

            {/* Add to Cart Button */}
            <div className="flex justify-center pt-6">
              <ReplacePlanAddToCartButton
                selectedVariant={variant}
                replaceLineId={replaceLineId}
                locationProperties={locationProperties}
                buttonClassName="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600"
                text="Add to Cart"
              />
            </div>
          </div>
        );
      })}
    </div>
  </section>
)}


          {/* Sanity Modules Grid */}
          {page?.modules && page.modules.length > 0 && (
            <div className="mb-0 mt-0 px-0 md:px-0">
              <ModuleGrid items={page.modules} searchQuery={''} homeSearchResults={[]} highlights={highlights} />
            </div>
          )}
 
          
        </main>
      </div>
    </>
  );
}