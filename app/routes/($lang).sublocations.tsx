// app/routes/locations.tsx
import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {useState, useEffect, useMemo} from 'react';
import {defer} from '@shopify/remix-oxygen';
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
  planTier?: string; // optional for filtering
  features?: string[];
  price?: number;
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
            longitude
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
        longitude
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

export default function SublocationsPage() {
  const {locations, header, footer} = useLoaderData<typeof loader>();

  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<LocationAPI | null>(
    locations[0] || null,
  );

  // Filters
  const [showFilters, setShowFilters] = useState(false);
  const [planTier, setPlanTier] = useState('');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(999);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature],
    );
  };

  // Apply Filters
  const filtered = useMemo(() => {
    return locations.filter((loc) => {
      const price = loc.price ?? 0;

      if (selectedCity && loc.city !== selectedCity) return false;
      if (planTier && loc.planTier !== planTier) return false;
      if (price < minPrice || price > maxPrice) return false;
      if (
        selectedFeatures.length > 0 &&
        !selectedFeatures.every((f) => loc.features?.includes(f))
      )
        return false;

      return true;
    });
  }, [locations, selectedCity, planTier, minPrice, maxPrice, selectedFeatures]);

  // Reset location if city changes
  useEffect(() => {
    if (filtered.length > 0) {
      setSelectedLocation(filtered[0]);
    }
  }, [selectedCity, filtered]);

  const cities = Array.from(
    new Set(locations.map((loc) => loc.city).filter(Boolean)),
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

          {/* Dropdown + Filter */}
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
              className="p-2 bg-gray-200 rounded hover:bg-gray-300"
              title="Open Filters"
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
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBBVlawFbk_Wpf71qDshZmiycrbuK5oC7o&q=${
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

      {/* Filter Modal */}
      {showFilters && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-500 text-2xl"
              >
                ×
              </button>
            </div>

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
                  <option value="Basic">Basic</option>
                  <option value="Premium">Premium</option>
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
                {[
                  'Easy Ingress',
                  '24/7 access',
                  'Mail Forwarding',
                  'Mail Scanning',
                  'Parking',
                  'ADA Accessibility',
                ].map((feature) => (
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
                  setMinPrice(0);
                  setMaxPrice(999);
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
