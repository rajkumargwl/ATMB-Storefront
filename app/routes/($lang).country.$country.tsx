import {useLoaderData, useNavigate} from '@remix-run/react';
import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import SearchBox from '~/components/SearchBox';

// Loader
export async function loader({context, params}: LoaderFunctionArgs) {
  const {country} = params;
  if (!country) throw new Response('Country not found', {status: 404});

  const decodedCountry = decodeURIComponent(country);

  const cache = context.storefront.CacheCustom({
    mode: 'public',
    maxAge: 60,
    staleWhileRevalidate: 60,
  });

  const [locations] = await Promise.all([
    context.sanity.query({
      query: /* groq */ `
        *[_type == "location" && country == $country]{
          country,
          state,
          city,
          name,
          postalCode,
          type,
          _id
        }
      `,
      params: {country: decodedCountry},
      cache,
    }),
  ]);

  // Count states
  const stateMap: Record<string, number> = {};
  locations.forEach((loc: any) => {
    const state = loc.state || 'Unknown';
    if (!stateMap[state]) stateMap[state] = 0;
    stateMap[state] += 1;
  });

  const states = Object.entries(stateMap)
    .map(([name, count]) => ({name, count}))
    .sort((a, b) => a.name.localeCompare(b.name));

  return defer({decodedCountry, states, locations});
}

// Component
export default function CountryPage() {
  const {decodedCountry, states, locations} = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  function handleLocationClick(loc: any) {
    const countrySlug = encodeURIComponent(loc.country);
    const stateSlug = encodeURIComponent((loc.state || ''));
    navigate(`/${countrySlug}/${stateSlug}`);
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
        <h1 className="text-2xl font-bold mb-6">Locations in {decodedCountry}</h1>

        <SearchBox
          placeholder="Search by address, city, or zip code..."
          buttonText="Search"
          initialQuery=""
          results={locations || []}
          onResultClick={(item) => {
            handleLocationClick(item);
          }}
        />

<div className="mt-10">
  <h2 className="text-xl font-semibold mb-4">States</h2>
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {states.map((state: any, idx: number) => (
      <div
        key={idx}
        className="flex justify-between items-center text-gray-700 hover:text-orange-600 cursor-pointer py-2"
        onClick={() => {
          const loc = locations.find((l: any) => l.state === state.name);
          if (loc) handleLocationClick(loc);
        }}
      >
        <span >{state.name}</span>
        <span className="bg-gray-100 rounded-full px-2 py-0.5 text-sm">
                {state.count}
              </span>
      </div>
    ))}
  </div>
</div>
      </main>
    </div>
  );
}
