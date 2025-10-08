import {useLoaderData, useNavigate, useParams} from '@remix-run/react';
import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import LocationsList, {LocationAPI} from '~/components/location/LocationList';

// Loader
export async function loader({context, params}: LoaderFunctionArgs) {
  const {country, state} = params;
  if (!country || !state)
    throw new Response('Country or State not found', {status: 404});

  const decodedCountry = decodeURIComponent(country);
  const decodedState = decodeURIComponent(state);

  const cache = context.storefront.CacheCustom({
    mode: 'public',
    maxAge: 60,
    staleWhileRevalidate: 60,
  });
console.log("decodedCountry, decodedState", decodedCountry, decodedState);
  const [locations] = await Promise.all([
    context.sanity.query({
      query: /* groq */ `
        *[_type == "location" && country == $country && state == $state]{
          _id, displayName, city, stateCode, addressLine1, addressLine2, postalCode, coordinates, "latitude":coordinates.lat, "longitude":coordinates.lng, featureList[]{feature_id,label,description,status,type}, ratingList[]{rating_id,type,status,value}, planTier, priceRange
        }
      `,
      params: {country: decodedCountry, state: decodedState},
      cache,
    }),
  ]);
  // Count how many locations per city
  const cityMap: Record<string, number> = {};
  locations.forEach((loc: any) => {
    const city = loc.city || 'Unknown';
    if (!cityMap[city]) cityMap[city] = 0;
    cityMap[city] += 1;
  });

  const cities = Object.entries(cityMap)
    .map(([name, count]) => ({name, count}))
    .sort((a, b) => a.name.localeCompare(b.name));

  return defer({decodedCountry, decodedState, cities, locations});
}

// Component
export default function StatePage() {
  const {decodedCountry, decodedState, cities, locations} =
    useLoaderData<typeof loader>();
    return <LocationsList locations={locations} />;
}
