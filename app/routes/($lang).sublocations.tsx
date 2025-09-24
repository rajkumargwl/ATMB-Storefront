// app/routes/locations.tsx
import {json, type LoaderFunctionArgs, defer} from '@shopify/remix-oxygen';
import {useLoaderData, useNavigate} from '@remix-run/react';
import {useState, useEffect, useMemo, useRef} from 'react';
import {AnalyticsPageType, type SeoHandleFunction} from '@shopify/hydrogen';
import Header from '~/components/global/Header';
import Footer from '~/components/global/Footer';
import {HEADER_QUERY} from '~/queries/sanity/header';
import {FOOTER_QUERY} from '~/queries/sanity/footer';
import {notFound} from '~/lib/utils';

type Feature = {
  feature_id: string;
  label: string;
  description?: string;
  status?: string;
  type?: string;
};

type Rating = {
  rating_id: string;
  type: string;
  status: string;
  value: number;
};

type LocationAPI = {
  _id: string;
  displayName: string;
  city: string;
  stateCode: string;
  postalCode: string;
  addressLine1: string;
  addressLine2?: string;
  latitude?: number;
  longitude?: number;
  planTier?: string;
  priceRange?: number;
  featureList?: Feature[];
  ratingList?: Rating[];
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
  } else {
    const locations: LocationAPI[] = await context.sanity.query({
      query: `*[_type == "location"][0...10]{
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

  console.log('Fetched locations:', JSON.stringify(results.locations));

  return defer({
    locations: results.locations,
    header,
    footer,
    analytics: {pageType: AnalyticsPageType.page},
  });
}

export default function LocationsPage() {
  const navigate = useNavigate();
  const {locations, header, footer} = useLoaderData<typeof loader>();
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<LocationAPI | null>(
    locations[0] || null,
  );

  const [showFilters, setShowFilters] = useState(false);
  const [planTier, setPlanTier] = useState('');
  const [minPrice, setMinPrice] = useState(
    Math.min(...locations.map((loc) => loc.priceRange || 0), 0),
  );
  const [maxPrice, setMaxPrice] = useState(
    Math.max(...locations.map((loc) => loc.priceRange || 999), 999),
  );
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature],
    );
  };

  const filtered = locations.filter((loc) => {
    const matchCity = selectedCity ? loc.city === selectedCity : true;
    const matchTier = planTier ? loc.planTier === planTier : true;
    const matchPrice =
      (loc.priceRange || 0) >= minPrice && (loc.priceRange || 0) <= maxPrice;
    const matchFeatures =
      selectedFeatures.length > 0
        ? selectedFeatures.every((f) =>
            (loc.featureList || []).map((ft) => ft.label).includes(f),
          )
        : true;

    return matchCity && matchTier && matchPrice && matchFeatures;
  });

  useEffect(() => {
    if (filtered.length > 0) {
      setSelectedLocation(filtered[0]);
    }
  }, [selectedCity, planTier, minPrice, maxPrice, selectedFeatures]);

  const cities = Array.from(
    new Set(locations.map((loc) => loc.city).filter(Boolean)),
  );

  const uniqueFeatures = Array.from(
    new Set(locations.flatMap((loc) => loc.featureList?.map((f) => f.label) || [])),
  );

  const uniqueTiers = Array.from(
    new Set(locations.map((loc) => loc.planTier).filter(Boolean)),
  );

  // --- MAP LOGIC ---
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const boundsRef = useRef<google.maps.LatLngBounds | null>(null);

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDXYZ7HuZbqyLOv8xlijti1jwP9k4lSJqM`;
      script.async = true;
      script.onload = () => initMap();
      document.body.appendChild(script);
    } else {
      initMap();
    }
  }, [filtered]);

  const initMap = () => {
    if (!filtered.length) return;

    const map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        center: {lat: filtered[0].latitude || 0, lng: filtered[0].longitude || 0},
        zoom: 4,
      },
    );

    mapRef.current = map;

    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    filtered.forEach((loc) => {
      if (loc.latitude && loc.longitude) {
        const marker = new google.maps.Marker({
          position: {lat: loc.latitude, lng: loc.longitude},
          map,
          title: loc.displayName,
          icon: {
            url:
              'data:image/svg+xml;utf-8,' +
              encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
                <path fill="#FF6600" d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5S13.4 11.5 12 11.5z"/>
              </svg>
            `),
            scaledSize: new google.maps.Size(32, 32),
            anchor: new google.maps.Point(16, 32),
          },
        });
        markersRef.current.push(marker);
      }
    });

    const bounds = new google.maps.LatLngBounds();
    markersRef.current.forEach((m) => bounds.extend(m.getPosition()!));
    map.fitBounds(bounds);
    boundsRef.current = bounds;
  };

  const zoomToLocation = (loc: LocationAPI) => {
    if (mapRef.current && loc.latitude && loc.longitude) {
      mapRef.current.setZoom(12);
      mapRef.current.panTo({lat: loc.latitude, lng: loc.longitude});
    }
  };

  const resetToAllLocations = () => {
    if (mapRef.current && boundsRef.current && !boundsRef.current.isEmpty()) {
      mapRef.current.fitBounds(boundsRef.current);
    }
  };

  return (
    <>
     {/* <Header data={header} searchResults={mergedResults} searchQuery={q} /> */}

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
                <path d="M3 5h18M6.75 10h10.5M10.5 15h3" />
              </svg>
            </button>
          </div>

          <p className="text-gray-600 mb-2">{filtered.length} locations found</p>

          {/* Locations List */}
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {filtered.map((loc) => (
              <div
                key={loc._id}
                className="border rounded-lg p-4 shadow-sm hover:shadow-md transition cursor-pointer"
                onMouseEnter={() => zoomToLocation(loc)}
              >
                {/* Top Row: Badges + Distance */}
                
                <div className="flex items-center justify-between mb-2">
                  <div className="flex gap-2">
                    {loc.ratingList?.some(
                      (r) => r.type === 'TOPRATED' && r.status === 'ACTIVE',
                    ) && (
                      <span className="text-xs bg-orange-100 text-orange-600 font-semibold px-2 py-1 rounded">
                        TOP RATED
                      </span>
                    )}
                    <span className="text-xs bg-blue-100 text-blue-600 font-semibold px-2 py-1 rounded">
                      PREMIUM ADDRESS
                    </span>
                  </div>
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                    0.2 miles
                  </span>
                </div>

                {/* Location Title + Address */}
                <h2 className="font-semibold text-lg">{loc.displayName}</h2>
                <p className="text-sm text-gray-600">
                  {loc.addressLine1}, {loc.city}, {loc.stateCode}{' '}
                  {loc.postalCode}
                </p>

                {/* Price Row */}
                <div className="flex items-center justify-between mt-3">
                  <p className="text-sm text-gray-500">Starting from</p>
                  <p className="text-lg font-bold text-gray-900">
                    US${(loc.priceRange || 0.0).toFixed(2)}/month
                  </p>
                </div>

                {/* Feature Icons */}
                <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-700">
                  {loc.featureList?.slice(0, 3).map((feature) => (
                    <div
                      key={feature.feature_id}
                      className="flex items-center gap-1"
                    >
                      <span>📬</span> {feature.label}
                    </div>
                  ))}
                  {loc.featureList && loc.featureList.length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{loc.featureList.length - 3}
                    </span>
                  )}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() =>
                    navigate(`/PDP/virtual-mailbox?locationId=${loc._id}`)
                  }
                  className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-lg"
                >
                  Select
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side Map */}
        <div className="w-full md:w-1/2 p-4">
          <div id="map" className="w-full h-[600px] rounded shadow" />
        </div>
      </div>

      {/* Filter Popup */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Filters</h2>

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
                  setMinPrice(Math.min(...locations.map((loc) => loc.priceRange || 0)));
                  setMaxPrice(Math.max(...locations.map((loc) => loc.priceRange || 999)));
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

      {/* <Footer data={footer} /> */}
    </>
  );
}
