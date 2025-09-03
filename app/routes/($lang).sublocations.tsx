// app/routes/locations.tsx
import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {useState, useEffect} from 'react';
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
            city match $search ||
            postalCode match $search
          )][0...10]{
            _id,
            name,
            city,
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

  const filtered = selectedCity
    ? locations.filter((loc) => loc.city === selectedCity)
    : locations;

  // If dropdown changes, reset map to first location in that city
  useEffect(() => {
    if (filtered.length > 0) {
      setSelectedLocation(filtered[0]);
    }
  }, [selectedCity]);

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

          {/* Dropdown */}
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="border p-2 rounded mb-4 w-full"
          >
            <option value="">Select a City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

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

      <Footer data={footer} />
    </>
  );
}
