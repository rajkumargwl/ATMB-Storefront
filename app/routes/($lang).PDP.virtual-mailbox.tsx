
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

  useEffect(() => {
    const storedLineId = sessionStorage.getItem('replaceLineId');
    if (storedLineId) setReplaceLineId(storedLineId);
    console.log('Replace line ID from sessionStorage:', storedLineId);
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 p-8">
          {/* Breadcrumb + Title */}
          <div className="mb-8">
            <p className="text-sm text-gray-500">Virtual Mailbox &gt; Locations &gt; Plans</p>
            <h2 className="text-2xl font-bold mt-2">{product?.title}</h2>
            <p className="text-lg font-semibold">{location?.displayName}</p>
            <p className="text-gray-600">{location?.addressLine1}</p>
            <p className="text-gray-600">
              Mailbox ID: <span className="font-bold">#{location.locationId}</span>
            </p>
          </div>

          {/* Billing cycle toggle */}
          <div className="flex justify-center items-center gap-4 mb-8">
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

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
          </div>

          {/* Sanity Modules Grid */}
          {page?.modules && page.modules.length > 0 && (
            <div className="mb-8 mt-8 px-0 md:px-0">
              <ModuleGrid items={page.modules} searchQuery={''} homeSearchResults={[]} />
            </div>
          )}

          {/* Add to Cart */}
          <div className="flex justify-center pt-6">
            <ReplacePlanAddToCartButton
              selectedVariant={selectedVariant}
              replaceLineId={replaceLineId}
              locationProperties={locationProperties}
              disabled={!selectedVariant || !selectedVariant.availableForSale}
              buttonClassName="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600"
              text={selectedVariant ? 'Add to Cart' : 'Select a Plan First'}
            />
          </div>
        </main>
      </div>
    </>
  );
}
