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
  
  const { addLineItems } = useCart();
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
    <div className="flex flex-col min-h-screen">
     
      <main className="flex-1 p-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main product info */}
        <section className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-lg font-semibold">{location.displayName}</p>
          <p className="text-gray-600">{location.addressLine1}</p>
          <p className="text-gray-600 mb-4">
            Mailbox ID: <span className="font-bold">#{location.locationId}</span>
          </p>

          {/* Description */}
          <p
            className="text-gray-700 mb-4"
            dangerouslySetInnerHTML={{
              __html: product.descriptionHtml || product.description || '',
            }}
          />

          {/* Price & Features */}
          {selectedVariant && (
            <div className="mb-6">
              <p className="text-xl font-semibold mb-2">Price: ${selectedVariant.price.amount}</p>
              {features.length > 0 && (
                <>
                  <p className="font-semibold mb-1">Features:</p>
                  <ul className="list-disc list-inside">
                    {features.map((f, idx) => (
                      <li key={idx}>{f}</li>
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
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Add to Cart
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
          <aside className="lg:col-span-1 bg-gray-50 p-4 rounded-lg border border-gray-200 w-full max-w-full">
            <h2 className="text-xl font-bold mb-4">Associated Products</h2>

            {associatedProducts.filter(item => item.title || (item.features?.length ?? 0) > 0).length === 0 ? (
              <p className="text-gray-500">No associated products.</p>
            ) : (
              <ul className="space-y-2">
                {associatedProducts
                  .filter(item => item.title || (item.features?.length ?? 0) > 0)
                  .map((item: any, idx: number) => (
                    <li key={item.id || idx}>
                      {item.title && <p className="font-semibold">{item.title}</p>}

                      {item.features?.length > 0 && (
                        <ul className="list-disc list-inside text-gray-700 mb-1">
                          {item.features.map((f: string, i: number) => (
                            <li key={i}>{f}</li>
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
