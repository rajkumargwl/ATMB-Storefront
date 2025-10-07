import {useLoaderData, useNavigate, useParams} from '@remix-run/react';
import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import SearchBox from '~/components/SearchBox';

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
          country,
          state,
          city,
          name,
          postalCode,
          type,
          _id
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
  const navigate = useNavigate();
console.log("locations", locations);
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
        <h1 className="text-2xl font-bold mb-6">
          Locations in {decodedState}, {decodedCountry}
        </h1>

        <SearchBox
          placeholder="Search by address, city, or zip code..."
          buttonText="Search"
          initialQuery=""
          results={locations || []}
          onResultClick={(item) => {
            navigate(
              `/sublocations?q=${encodeURIComponent(item.name || item.city || '')}`,
            );
          }}
        />

        {/* City list */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Cities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cities.map((city, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center text-gray-700 hover:text-orange-600 cursor-pointer py-2"
                onClick={() =>
                  navigate(`/sublocations?q=${encodeURIComponent(city.name)}`)
                }
              >
                <span>{city.name}</span>
                <span className="bg-gray-100 rounded-full px-2 py-0.5 text-sm">
                  {city.count}
                </span>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
