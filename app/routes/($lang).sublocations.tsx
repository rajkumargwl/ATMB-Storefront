import {json, type LoaderFunctionArgs, defer} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import LocationsList, {LocationAPI} from '~/components/location/LocationList';
import {HEADER_QUERY} from '~/queries/sanity/header';
import {FOOTER_QUERY} from '~/queries/sanity/footer';
import {notFound} from '~/lib/utils';

export async function loader({context, request}: LoaderFunctionArgs) {
  const cache = context.storefront.CacheCustom({mode: 'public', maxAge: 60, staleWhileRevalidate: 60});

  const [header, footer] = await Promise.all([
    context.sanity.query({query: HEADER_QUERY, cache}),
    context.sanity.query({query: FOOTER_QUERY, cache}),
  ]);

  if (!header || !footer) throw notFound();

  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  console.log("Search query:", q);

  let results = {locations: [] as LocationAPI[]};

  if (q) {
    const searchParam = `${q}*`;
    try {
      results = await context.sanity.query({
        query: `{
          "locations": *[_type == "location" && (
            name match $search ||
            displayName match $search ||
            city match $search ||
            postalCode match $search
          )][0...10]{
            _id,
            displayName,
            city,
            stateCode,
            addressLine1,
            addressLine2,
            postalCode,
            coordinates,
            "latitude":coordinates.lat,
            "longitude":coordinates.lng,
            featureList[]{
              feature_id,
              label,
              description,
              status,
              type
            },
            ratingList[]{
              rating_id,
              type,
              status,
              value
            },
            planTier,
            priceRange
          }
        }`,
        params: {search: searchParam},
      });
    } catch (error) {
      console.error('Sanity query failed:', error);
    }
  } 
  else {
    const locations: LocationAPI[] = await context.sanity.query({
      query: `*[_type == "location"][0...50]{
        _id,
        displayName,
        city,
        stateCode,
        addressLine1,
        addressLine2,
        postalCode,
        coordinates,
        "latitude":coordinates.lat,
        "longitude":coordinates.lng,
        featureList[]{
          feature_id,
          label,
          description,
          status,
          type
        },
        ratingList[]{
          rating_id,
          type,
          status,
          value
        },
        planTier,
        priceRange
      }`,
    });
    results.locations = locations;
  }

  return defer({locations:results.locations, header, footer, q});
}

export default function LocationsPage() {
  const {locations, q} = useLoaderData<typeof loader>();
  return <LocationsList locations={locations} initialQuery={q} />;
}
