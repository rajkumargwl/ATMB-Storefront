import {useLoaderData, useNavigate} from '@remix-run/react';
import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import SearchBox from '~/components/SearchBox';

// Loader
export async function loader({context}: LoaderFunctionArgs) {
  const cache = context.storefront.CacheCustom({
    mode: 'public',
    maxAge: 60,
    staleWhileRevalidate: 60,
  });

  const [locations] = await Promise.all([
    context.sanity.query({
      query: /* groq */ `
        *[_type == "location" && defined(country) && country != "" ]{
          country,
          state,
          country_code,
          name,
          city,
          postalCode,
          type,
          _id
        }
      `,
      cache,
    }),
  
  ]);

  const usMap: Record<string, number> = {};
  const countryMap: Record<string, number> = {};

  locations.forEach((loc: any) => {
    const name = loc.country;
    if (!countryMap[name]) countryMap[name] = 0;
    countryMap[name] += 1;

    if (loc.country === 'United States') {
      const state = loc.state || 'Unknown';
      if (!usMap[state]) usMap[state] = 0;
      usMap[state] += 1;
    }
  });

  const countries = Object.entries(countryMap)
    .map(([name, count]) => ({ name, count, type: 'country' }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const usLocations = Object.entries(usMap)
    .map(([state, count]) => ({ name: state, count, type: 'state',country:"United States" }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return defer({ countries, usLocations,locations });
}

// Component
export default function CountryLocationsPage() {
  const { countries, usLocations,locations } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
        <h1 className="text-2xl font-bold mb-6">Search Locations</h1>
        <SearchBox
          placeholder="Enter address or zip code..."
          buttonText="Search"
          initialQuery=""
          results={locations || []}
          onResultClick={(item) => {
            navigate(`/sublocations?q=${encodeURIComponent(item.name || item.city || '')}`);
          }}
        />


        {/* US Section */}
        <h2 className="text-2xl font-bold mt-12 mb-6">United States</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {usLocations.map((c, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center text-gray-700 hover:text-orange-600 cursor-pointer py-2"
              onClick={() => navigate(`/${encodeURIComponent(c.country)}/${encodeURIComponent(c.name)}`)}
            >
              <span>{c.name}</span>
              <span className="bg-gray-100 rounded-full px-2 py-0.5 text-sm">
                {c.count}
              </span>
            </div>
          ))}
        </div>

        {/* International Section */}
        <h2 className="text-2xl font-bold mt-12 mb-6">International</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {countries.map((c, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center text-gray-700 hover:text-orange-600 cursor-pointer py-2"
              onClick={() => navigate(`/country/${encodeURIComponent(c.name)}`)}
            >
              <span>{c.name}</span>
              <span className="bg-gray-100 rounded-full px-2 py-0.5 text-sm">
                {c.count}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
