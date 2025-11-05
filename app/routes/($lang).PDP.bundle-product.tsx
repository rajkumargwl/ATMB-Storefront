// app/routes/($lang).bundle-details.tsx
import { useLoaderData } from '@remix-run/react';
import { defer, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import Header from '~/components/global/Header';
import Footer from '~/components/global/Footer';
import { HEADER_QUERY } from '~/queries/sanity/header';
import { FOOTER_QUERY } from '~/queries/sanity/footer';
import { notFound, usePrefixPathWithLocale, validateLocale } from '~/lib/utils';
import { VARIANT_WITH_PRODUCT_QUERY } from '~/queries/shopify/product';
import type { Product, ProductVariant } from '@shopify/hydrogen/storefront-api-types';
import { useCart } from '@shopify/hydrogen-react';
import { useState, useEffect } from 'react';
import { CartForm } from '@shopify/hydrogen';
import RightArrowWhite from '~/components/icons/RightArrowWhite';
import {AnalyticsPageType, type SeoHandleFunction} from '@shopify/hydrogen';
const seo: SeoHandleFunction = ({data}) => ({
  title: data?.page?.seo?.title || 'Anytime Mailbox',
  description:
    data?.page?.seo?.description ||
    'A custom storefront powered by Hydrogen and Sanity',
});
export const handle = { seo };
interface LocationData {
  _id: string;
  locationId: string;
  displayName: string;
  addressLine1: string;
}
 
// Location query
const LOCATION_QUERY = /* groq */ `
  *[_type == "location" && locationId == $id][0]{
    _id,
    locationId,
    displayName,
    addressLine1
  }
`;
 
export async function loader({ context, request, params }: LoaderFunctionArgs) {
   validateLocale({ context, params });
    let language = params.lang || 'en';
    if(language !== 'en-es'){
      language = 'en';
    }
  const cache = context.storefront.CacheCustom({ mode: 'public', maxAge: 60, staleWhileRevalidate: 60 });
 
  const [header, footer] = await Promise.all([
    context.sanity.query({ query: HEADER_QUERY, params: { language }, cache }),
    context.sanity.query({ query: FOOTER_QUERY, params: { language }, cache }),
  ]);
  if (!header || !footer) throw notFound();
 
  const url = new URL(request.url);
  const locationId = url.searchParams.get('locationId') ?? '101';
  const variantId = url.searchParams.get('variantId');
  if (!variantId) throw notFound();
 
  const variantGlobalId = `gid://shopify/ProductVariant/${variantId}`;
 
  const { productVariant } = await context.storefront.query<{
    productVariant: ProductVariant & { product: Product };
  }>(VARIANT_WITH_PRODUCT_QUERY, {
    variables: { variantId: variantGlobalId },
  });
 
  if (!productVariant || !productVariant.product) throw notFound();
 
  const location = await context.sanity.query<LocationData>({
    query: LOCATION_QUERY,
    params: { id: locationId },
    cache,
  });
  if (!location) throw notFound();
 
  return defer({
    location,
    header,
    footer,
    product: productVariant.product,
    selectedVariant: productVariant,
  });
}
 
export default function BundleDetails() {
// const { location, header, footer, product, selectedVariant } = useLoaderData<typeof loader>();
  const { location, header, footer, product, selectedVariant } = useLoaderData<{
    location: LocationData;
    header: any;
    footer: any;
    product: Product;
    selectedVariant: ProductVariant;
  }>();
  
  //const { addLineItems } = useCart();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const locationProperties = Object.entries(location).map(([key, value]) => ({
    key,
    value: String(value), // Shopify requires string values
  }));
  
  // Parse bundle features
  const features: string[] = (() => {
    const raw =
      selectedVariant.metafields?.find((m) => m.key === 'bundle_feature')?.value ||
      product.metafields?.find((m) => m.key === 'bundle_feature')?.value;
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [String(raw)];
    }
  })();
 
    // Parse associated products robustly
    const associatedProducts: any[] = (() => {
      const metafield = selectedVariant.metafields?.find(
        (m) => m && m.key === "bundle_items"
      );
      if (!metafield) return [];
 
      let parsed: any[] = [];
 
      // Try parsing JSON string
      if (metafield.value) {
        try {
          parsed = JSON.parse(metafield.value); // expects [{id, title, price, plan_type, features}]
        } catch (err) {
          console.error("Failed to parse bundle_items JSON", err);
          parsed = [];
        }
      }
 
      // Fallback: handle GraphQL references safely
      if (metafield.references?.edges?.length) {
        const refs = metafield.references.edges
          .map((edge) => {
            const node = edge?.node;
            if (!node) return null; // skip null refs
 
            // If reference is a ProductVariant
            if (node.__typename === "ProductVariant") {
              return {
                id: node.id,
                title: node.product?.title || node.title || "Untitled Variant",
                price: node.priceV2 || node.price || null,
                plan_type: node.metafields?.find((m) => m && m.key === "plan_type")?.value,
                features:
                  node.selectedOptions?.map(
                    (opt) => `${opt.name}: ${opt.value}`
                  ) || [],
              };
            }
 
            // If reference is a Product (no variants)
            if (node.__typename === "Product") {
              return {
                id: node.id,
                title: node.title || "Untitled Product",
                price: node.priceRange?.minVariantPrice || null,
                plan_type: node.metafields?.find((m) => m && m.key === "plan_type")?.value,
                features: [],
              };
            }
 
            return null; // ignore anything else
          })
          .filter(Boolean);
 
        parsed = [...parsed, ...refs];
      }
 
      return parsed;
    })();
 
 
    const handleAddToCart = async (variantId: string) => {
      if (!selectedVariant) return;
    
      const gid = variantId.startsWith('gid://') ? variantId : `gid://shopify/ProductVariant/${variantId}`;
    
      const attributes: { key: string; value: string }[] = [
        
        { key: 'Location', value: `${location.displayName} - ${location.addressLine1}` },
       // { key: 'Mailbox ID', value: location.locationId },
        ...associatedProducts
          .filter(item => item.title || (item.features?.length ?? 0) > 0)
          .map((item, idx) => ({
            key: `Associated Product ${idx + 1}`,
            value: `${item.title ? `Title: ${item.title}` : ''} ${
              item.features?.length ? `Features: ${item.features.join(', ')}` : ''
            }`.trim(),
          })),
      ];
    
      await addLineItems({
        lines: [{ merchandiseId: gid, quantity: 1, attributes }],
      });
    
      // Manually redirect to cart
      window.location.href = usePrefixPathWithLocale('/cart');
    };
    
    
 
  useEffect(() => {
    const storedLineId = sessionStorage.getItem('replaceLineId');
    if (storedLineId) console.log('Replace line ID from sessionStorage:', storedLineId);
  }, []);
 
  return (
    <div className="px-5 pt-[24px] md:pt-[32px] pb-[40px] bg-white">
     
      <main className="max-w-[1240px] mx-auto flex flex-col md:flex-row gap-10 items-start">
        {/* Main product info */}
        <section className="w-full md:w-[60.14%] flex flex-col">
          <h1 className="mb-4 md:mb-5 font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[38.4px] text-[24px] md:text-[32px] tracking-[-0.36px] md:tracking-[-0.48px]">{product.title}</h1>
          <p className=" font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px]">{location.displayName}</p>
          <p className=" font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px]">{location.addressLine1}</p>
          <p className=" font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px]">
            Mailbox ID: <span className=" font-Roboto text-PrimaryBlack font-semibold leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px]">#{location.locationId}</span>
          </p>
 
          {/* Description */}
          <p
            className=" font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px]"
            dangerouslySetInnerHTML={{
              __html: product.descriptionHtml || product.description || '',
            }}
          />
 
          {/* Price & Features */}
          {selectedVariant && (
            <div className="mt-6">
              <p className="mb-2 font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[38.4px] text-[24px] md:text-[32px] tracking-[-0.36px] md:tracking-[-0.48px]">Price: ${selectedVariant.price.amount}</p>
              {features.length > 0 && (
                <>
                  <p className="mb-3 md:mb-6 font-Roboto text-LightGray font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px] mb-1">Features:</p>
                  <ul className="flex flex-col gap-4 mb-8 md:mb-10">
                    {features.map((f, idx) => (
                      <li key={idx} className='flex items-center gap-3 font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]'>
                        <span className='flex items-center justify-center w-[24px] h-[24px]'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none"><path d="M16.5544 0.110975C16.8206 0.305975 16.8806 0.680975 16.6856 0.950975L6.18563 15.351C6.08063 15.4935 5.92313 15.5835 5.74688 15.5947C5.57063 15.606 5.40188 15.546 5.27438 15.4222L0.174375 10.3222C-0.058125 10.0897 -0.058125 9.70722 0.174375 9.47472C0.406875 9.24222 0.789375 9.24222 1.02188 9.47472L5.62688 14.0797L15.7144 0.245975C15.9094 -0.0202754 16.2844 -0.0802754 16.5544 0.114725V0.110975Z" fill="#091019"></path>
                          </svg>
                        </span>
                        {f}
                        </li>
                    ))}
                  </ul>
                </>
              )}
              {/* Add to Cart button here */}
              {selectedVariant && (
              <CartForm
                route="/cart"
                action={CartForm.ACTIONS.LinesAdd}
                inputs={{
                  lines: [
                    {
                      merchandiseId: selectedVariant.id,
                      quantity: 1,
                      attributes: [
                        //{ key: 'Location', value: `${location.displayName} - ${location.addressLine1}` },
                        //{ key: 'Mailbox ID', value: location.locationId },
                        ...locationProperties,
                        ...associatedProducts
                          .filter(item => item.title || (item.features?.length ?? 0) > 0)
                          .map((item, idx) => ({
                            key: `Associated Product ${idx + 1}`,
                            value: `${item.title ? `${item.title}` : ''} ${
                              item.features?.length ? ` ${item.features.join(', ')}` : ''
                            }`.trim(),
                          })),
                      ],
                    },
                  ],
                  redirectTo: usePrefixPathWithLocale('/cart') // redirect after adding
                }}
              >
                <button className="group relative flex items-center justify-center w-full md:w-[330px] h-[44px] md:h-[52px] rounded-[100px] font-normal tracking-[0.08px] text-[16px] leading-[16px] text-PrimaryBlack border border-[#091019] px-4 py-[12px] bg-white  hover:bg-DarkOrange hover:text-white hover:border-DarkOrange overflow-hidden transition-all">
                  
                    <span className="relative flex items-center">Add to Cart <span className="absolute right-0 opacity-0 translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-[35px] transition-all duration-300">
              <RightArrowWhite />
            </span></span>
                </button>
              </CartForm>
)}
              {/* <button
              onClick={() => handleAddToCart(selectedVariant.id)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add to Cart
            </button> */}
 
            </div>
          )}
 
        </section>
 
          {/* Associated products aside */}
          <aside className="w-full md:w-[39.86%] flex flex-col  p-6 md:p-8 bg-white rounded-[24px] border border-LightWhite">
            <h2 className="mb-[11px] font-Roboto text-PrimaryBlack font-semibold leading-[28px] md:leading-[31.2px] text-[20px] md:text-[24px] tracking-[-0.3px] md:tracking-[-0.36px]">Associated Products</h2>
 
            {associatedProducts.filter(item => item.title || (item.features?.length ?? 0) > 0).length === 0 ? (
              <p className=" font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px]">No associated products.</p>
            ) : (
              <ul className="list-none p-0 m-0 flex flex-col gap-4">
                {associatedProducts
                  .filter(item => item.title || (item.features?.length ?? 0) > 0)
                  .map((item: any, idx: number) => (
                    <li key={item.id || idx} className='pb-4 border-b border-LightWhite last:pb-0 last:border-b-0'>
                      {item.title && <p className="mb-1 block font-Roboto text-PrimaryBlack font-medium leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">{item.title}</p>}
 
                      {item.features?.length > 0 && (
                        <ul className="list-none p-0 m-0">
                          {item.features.map((f: string, i: number) => (
                            <li key={i} className='font-Roboto text-LightGray font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px]'>{f}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
              </ul>
            )}
          </aside>
      </main>
      
    </div>
  );
}
 