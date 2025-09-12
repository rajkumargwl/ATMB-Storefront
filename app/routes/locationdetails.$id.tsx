// app/routes/locationdetails.$id.tsx
import {
  Await,
  useLoaderData,
} from '@remix-run/react';
import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Suspense} from 'react';
import Header from '~/components/global/Header';
import Footer from '~/components/global/Footer';
import {SanityPreview} from 'hydrogen-sanity';
import {validateLocale, notFound} from '~/lib/utils';
import {HEADER_QUERY} from '~/queries/sanity/header';
import {FOOTER_QUERY} from '~/queries/sanity/footer';
import type {SeoHandleFunction} from '@shopify/hydrogen';

// -------------------------
// Location query inline
// -------------------------
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

// -------------------------
// SEO handle
// -------------------------
const seo: SeoHandleFunction = ({data}) => ({
  title: data?.location?.displayName || 'Location Details',
  description: `Details for ${data?.location?.displayName || 'location'}`,
});
export const handle = {seo};

// -------------------------
// Loader
// -------------------------
export async function loader({context, params}: LoaderFunctionArgs) {
  validateLocale({context, params});

  const cache = context.storefront.CacheCustom({
    mode: 'public',
    maxAge: 60,
    staleWhileRevalidate: 60,
  });

  const {id} = params;
  if (!id) throw notFound();

  // Fetch location + header/footer
  const [location, header, footer] = await Promise.all([
    context.sanity.query({query: LOCATION_QUERY, params: {id}, cache}),
    context.sanity.query({query: HEADER_QUERY, cache}),
    context.sanity.query({query: FOOTER_QUERY, cache}),
  ]);

  if (!location) throw notFound();


  return defer({
    location,
    header,
    footer,
  });
}

// -------------------------
// Component
// -------------------------
export default function LocationPage() {
  const {location, header, footer} = useLoaderData<typeof loader>();

  return (
    <>
      <Header data={header} />
      <main className="max-w-4xl mx-auto p-6">
        <SanityPreview
          data={location}
          query={LOCATION_QUERY}
          params={{id: location.locationId}}
        >
          {(loc) => (
            <Suspense>
              <Await resolve={loc}>
                <div className="space-y-3">
                  <h1 className="text-2xl font-bold mb-6">
                    {loc.displayName}
                  </h1>

                  <p><strong>ID:</strong> {loc._id}</p>
                  <p><strong>Location ID:</strong> {loc.locationId}</p>
                  <p><strong>Parent Location ID:</strong> {loc.parentLocationId}</p>
                  <p><strong>Country:</strong> {loc.country}</p>
                  <p><strong>Country Code:</strong> {loc.countryCode}</p>
                  <p><strong>State:</strong> {loc.state}</p>
                  <p><strong>State Code:</strong> {loc.stateCode}</p>
                  <p><strong>City:</strong> {loc.city}</p>
                  <p><strong>Address:</strong> {loc.addressLine1}</p>
                  <p><strong>Postal Code:</strong> {loc.postalCode}</p>

                  {loc.coordinates && (
                    <p>
                      <strong>Coordinates:</strong>{' '}
                      {loc.coordinates.lat}, {loc.coordinates.lng}
                    </p>
                  )}

                  <p><strong>Web Key:</strong> {loc.webkey}</p>
                  <p><strong>Created At:</strong> {new Date(loc.createdAt).toLocaleString()}</p>
                  <p><strong>Plan Tier:</strong> {loc.planTier}</p>
                  <p><strong>Price Range:</strong> {loc.priceRange}</p>

                  {loc.options?.length > 0 && (
                    <div>
                      <h2 className="text-lg font-semibold">Options</h2>
                      <ul className="list-disc ml-5">
                        {loc.options.map((opt: string, i: number) => (
                          <li key={i}>{opt}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {loc.featureList?.length > 0 && (
                    <div>
                      <h2 className="text-lg font-semibold">Feature List</h2>
                      <ul className="list-disc ml-5">
                        {loc.featureList.map((f: string, i: number) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {loc.ratingList?.length > 0 && (
                    <div>
                      <h2 className="text-lg font-semibold">Rating List</h2>
                      <ul className="list-disc ml-5">
                        {loc.ratingList.map((r: string, i: number) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {loc.attributionList?.length > 0 && (
                    <div>
                      <h2 className="text-lg font-semibold">Attribution List</h2>
                      <ul className="list-disc ml-5">
                        {loc.attributionList.map((a: string, i: number) => (
                          <li key={i}>{a}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {loc.attributeList?.length > 0 && (
                    <div>
                      <h2 className="text-lg font-semibold">Attribute List</h2>
                      <ul className="list-disc ml-5">
                        {loc.attributeList.map((a: string, i: number) => (
                          <li key={i}>{a}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Await>
            </Suspense>
          )}
        </SanityPreview>
      </main>
      <Footer data={footer} />
    </>
  );
}
