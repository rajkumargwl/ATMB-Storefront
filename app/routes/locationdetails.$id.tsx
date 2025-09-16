// app/routes/locationdetails.$id.tsx
import {Await, useLoaderData} from '@remix-run/react';
import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Suspense} from 'react';

import {SanityPreview} from 'hydrogen-sanity';
import {validateLocale, notFound} from '~/lib/utils';

import type {SeoHandleFunction} from '@shopify/hydrogen';

// -------------------------
// Location query
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
  addressLine2,
  postalCode,
  coordinates,
  displayName,
  webkey,
  
  featureList[]{
    category,
    class,
    description,
    feature_id,
    label,
    status,
    type,
    sort_order
  },

  ratingList[]{
    rating_id,
    sort_order,
    status,
    type,
    value
  },

  attributionList[]{
    attribution_id,
    name,
    sort_order,
    status,
    type,
    value
  },

  attributeList[]{
    attribute_id,
    name,
    sort_order,
    status,
    type,
    value
  },

  createdAt,
  planTier,
  priceRange,
  options[]
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

  const location = await context.sanity.query({
    query: LOCATION_QUERY,
    params: {id},
    cache,
  });

  if (!location) throw notFound();

  return defer({location});
}

// -------------------------
// Component
// -------------------------
export default function LocationPage() {
  const {location} = useLoaderData<typeof loader>();
  console.log('Location data:', location);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <SanityPreview
        data={location}
        query={LOCATION_QUERY}
        params={{id: location.locationId}}
      >
        {(loc) => (
          <Suspense>
            <Await resolve={loc}>
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">{loc.displayName}</h1>

                <div className="space-y-1">
                  <p><strong>ID:</strong> {loc._id}</p>
                  <p><strong>Location ID:</strong> {loc.locationId}</p>
                  <p><strong>Parent Location ID:</strong> {loc.parentLocationId || '-'}</p>
                  <p><strong>Country:</strong> {loc.country}</p>
                  <p><strong>Country Code:</strong> {loc.countryCode}</p>
                  <p><strong>State:</strong> {loc.state}</p>
                  <p><strong>State Code:</strong> {loc.stateCode}</p>
                  <p><strong>City:</strong> {loc.city}</p>
                  <p><strong>Address:</strong> {loc.addressLine1} {loc.addressLine2 || ''}</p>
                  <p><strong>Postal Code:</strong> {loc.postalCode}</p>
                  {loc.coordinates && (
                    <p>
                      <strong>Coordinates:</strong> {loc.coordinates.lat}, {loc.coordinates.lng}
                    </p>
                  )}
                  <p><strong>Web Key:</strong> {loc.webkey}</p>
                  <p><strong>Created At:</strong> {new Date(loc.createdAt).toLocaleString()}</p>
                  <p><strong>Plan Tier:</strong> {loc.planTier || '-'}</p>
                  <p><strong>Price Range:</strong> {loc.priceRange}</p>
                </div>

                {loc.options?.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold">Options</h2>
                    <ul className="list-disc ml-5">
                      {loc.options.map((opt, i) => (
                        <li key={i}>{opt}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {loc.featureList?.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold">Feature List</h2>
                    <ul className="list-disc ml-5">
                      {loc.featureList.map((f, i) => (
                        <li key={i}>
                          <strong>{f.label}</strong> ({f.type}) - {f.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {loc.ratingList?.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold">Rating List</h2>
                    <ul className="list-disc ml-5">
                      {loc.ratingList.map((r, i) => (
                        <li key={i}>
                          <strong>{r.type}</strong>: {r.value} (Status: {r.status})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {loc.attributionList?.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold">Attribution List</h2>
                    <ul className="list-disc ml-5">
                      {loc.attributionList.map((a, i) => (
                        <li key={i}>
                          <strong>{a.name}</strong>: {a.value} (Type: {a.type})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {loc.attributeList?.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold">Attribute List</h2>
                    <ul className="list-disc ml-5">
                      {loc.attributeList.map((a, i) => (
                        <li key={i}>
                          <strong>{a.name}</strong>: {a.value} (Type: {a.type})
                        </li>
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
  );
}
