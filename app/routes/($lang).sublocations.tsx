// app/routes/locations.tsx
import {json, type LoaderFunctionArgs, defer} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {useState, useEffect} from 'react';
import {AnalyticsPageType, type SeoHandleFunction} from '@shopify/hydrogen';
import Header from '~/components/global/Header';
import Footer from '~/components/global/Footer';
import {HEADER_QUERY} from '~/queries/sanity/header';
import {FOOTER_QUERY} from '~/queries/sanity/footer';
import {notFound} from '~/lib/utils';

type LocationAPI = {
  _id: string;
  name: string;
  city: string;
  postalCode: string;
  slug: string;
  latitude?: number;
  longitude?: number;
  planTier?: string;
  price?: number;
  features?: string[];
};

const seo: SeoHandleFunction = () => ({
  title: 'Locations - Sanity x Hydrogen',
  description: 'Find virtual mailbox locations and view them on map.',
});

export const handle = {seo};

export async function loader({context, request}: LoaderFunctionArgs) {
  const cache = context.storefront.CacheCustom({
    mode: 'public',
    maxAge: 60,
    staleWhileRevalidate: 60,
  });

  // fetch header + footer
  const [header, footer] = await Promise.all([
    context.sanity.query({query: HEADER_QUERY, cache}),
    context.sanity.query({query: FOOTER_QUERY, cache}),
  ]);

  if (!header || !footer) throw notFound();

  const url = new URL(request.url);
  const q = url.searchParams.get('q') || '';

  let results = {locations: [] as LocationAPI[]};

  if (q) {
    const searchParam = `${q}*`;
    try {
      results = await context.sanity.query({
        query: `{
          "locations": *[_type == "location" && (
            name match $search ||
            display_name match $search ||
            city match $search ||
            postalCode match $search
          )][0...10]{
            _id,
            name,
            city,
            display_name,
            postalCode,
            "slug": slug.current,
            latitude,
            longitude,
            planTier,
            price,
            features
          }
        }`,
        params: {search: searchParam},
      });
    } catch (error) {
      console.error('Sanity query failed:', error);
    }
  } else {
    const locations: LocationAPI[] = await context.sanity.query({
      query: `*[_type == "location"][0...10]{
        _id,
        name,
        city,
        display_name,
        postalCode,
        "slug": slug.current,
        latitude,
        longitude,
        planTier,
        price,
        features
      }`,
    });
    results.locations = locations;
  }

  return defer({
    locations: results.locations,
    header,
    footer,
    analytics: {pageType: AnalyticsPageType.page},
  });
}

export default function LocationsPage() {
  const {locations, header, footer} = useLoaderData<typeof loader>();
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<LocationAPI | null>(
    locations[0] || null,
  );

  // filter states
  const [showFilters, setShowFilters] = useState(false);
  const [planTier, setPlanTier] = useState('');
  const [minPrice, setMinPrice] = useState(
    Math.min(...locations.map((loc) => loc.price || 0)),
  );
  const [maxPrice, setMaxPrice] = useState(
    Math.max(...locations.map((loc) => loc.price || 999)),
  );
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature],
    );
  };

  // city filter
  const filtered = locations.filter((loc) => {
    const matchCity = selectedCity ? loc.city === selectedCity : true;
    const matchTier = planTier ? loc.planTier === planTier : true;
    const matchPrice =
      (loc.price || 0) >= minPrice && (loc.price || 0) <= maxPrice;
    const matchFeatures =
      selectedFeatures.length > 0
        ? selectedFeatures.every((f) => loc.features?.includes(f))
        : true;

    return matchCity && matchTier && matchPrice && matchFeatures;
  });

  // reset selected location on filter change
  useEffect(() => {
    if (filtered.length > 0) {
      setSelectedLocation(filtered[0]);
    }
  }, [selectedCity, planTier, minPrice, maxPrice, selectedFeatures]);

  const cities = Array.from(
    new Set(locations.map((loc) => loc.city).filter(Boolean)),
  );

  const uniqueFeatures = Array.from(
    new Set(locations.flatMap((loc) => loc.features || [])),
  );

  const uniqueTiers = Array.from(
    new Set(locations.map((loc) => loc.planTier).filter(Boolean)),
  );

  return (
    <>
      <Header data={header} />

      <div className="flex flex-col md:flex-row mt-10 max-w-6xl mx-auto">
        {/* Left Side */}
        <div className="w-full md:w-1/2 p-4">
          <h1 className="text-3xl font-bold mb-4">
            Virtual Mailbox in {selectedLocation?.city || 'Unknown'}
          </h1>

          {/* City Dropdown + Filter Icon */}
          <div className="flex items-center gap-2 mb-4">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="">Select a City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <button
              onClick={() => setShowFilters(true)}
              className="p-2 border rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="h-5 w-5 text-gray-700"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* funnel-style filter icon */}
                <path d="M3 5h18M6.75 10h10.5M10.5 15h3" />
              </svg>
            </button>
          </div>

          <p className="text-gray-600 mb-2">{filtered.length} locations found</p>

          {/* Locations List */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {filtered.map((loc) => (
              <div
                key={loc._id}
                className="border rounded p-4 shadow-sm hover:shadow-md"
              >
                <h2 className="font-semibold text-lg">
                  {loc.city || 'Unknown City'} - {loc.name}
                </h2>
                <p className="text-sm text-gray-600">
                  Postal Code: {loc.postalCode || 'N/A'}
                </p>
                <p className="text-sm text-gray-600">
                  Tier: {loc.planTier || 'N/A'} | Price: $
                  {loc.price?.toFixed(2) || 'N/A'}
                </p>
                {loc.features && (
                  <p className="text-sm text-gray-600">
                    Features: {loc.features.join(', ')}
                  </p>
                )}
                <button
                  onClick={() => setSelectedLocation(loc)}
                  className="bg-orange-500 text-white px-4 py-2 rounded mt-2"
                >
                  Select Plan
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side Map */}
        <div className="w-full md:w-1/2 p-4">
          {selectedLocation ? (
            <iframe
              title="map"
              width="100%"
              height="600"
              style={{border: 0}}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyD9hXTbp7SLLl5FSCKtRNu9mezIjxz89D8&q=${
                selectedLocation.latitude && selectedLocation.longitude
                  ? `${selectedLocation.latitude},${selectedLocation.longitude}`
                  : selectedLocation.city || 'New Delhi'
              }`}
            ></iframe>
          ) : (
            <p className="text-gray-500">
              Select a plan to view it on the map.
            </p>
          )}
        </div>
      </div>

      {/* Filter Popup */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Filters</h2>

            {/* Filters */}
            <div className="space-y-4">
              {/* Plan Tier */}
              <div>
                <label className="block text-sm font-medium">Plan Tier</label>
                <select
                  value={planTier}
                  onChange={(e) => setPlanTier(e.target.value)}
                  className="border p-2 rounded w-full"
                >
                  <option value="">All Tiers</option>
                  {uniqueTiers.map((tier) => (
                    <option key={tier} value={tier}>
                      {tier}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium">Price Range</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    className="border w-20 p-1 rounded"
                  />
                  <span>—</span>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="border w-20 p-1 rounded"
                  />
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-2">
                {uniqueFeatures.map((feature) => (
                  <label key={feature} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedFeatures.includes(feature)}
                      onChange={() => toggleFeature(feature)}
                    />
                    {feature}
                  </label>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => {
                  setPlanTier('');
                  setMinPrice(Math.min(...locations.map((loc) => loc.price || 0)));
                  setMaxPrice(Math.max(...locations.map((loc) => loc.price || 999)));
                  setSelectedFeatures([]);
                }}
                className="px-4 py-2 border rounded"
              >
                Reset
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="px-4 py-2 bg-black text-white rounded"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer data={footer} />
    </>
  );
}
