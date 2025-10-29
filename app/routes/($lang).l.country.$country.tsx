import {useLoaderData, useNavigate} from '@remix-run/react';
import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useEffect, useRef, useState} from 'react';
import ArrowRightCountries from '~/components/icons/ArrowRightCountries';
import LeftArrowBlack from '~/components/icons/LeftArrowBlack';
import { DEFAULT_LOCALE } from '~/lib/utils';
import { useRootLoaderData } from '~/root';

// 🔹 Loader
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
          "latitude":coordinates.lat,
          "longitude":coordinates.lng,
          _id
        }
      `,
      params: {country: decodedCountry},
      cache,
    }),
  ]);

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

// 🔹 Google Map Component
function CountryMap({
  locations,
  onMarkerClick,
}: {
  locations: any[];
  onMarkerClick: (loc: any) => void;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const boundsRef = useRef<google.maps.LatLngBounds | null>(null);

  useEffect(() => {
    if (!window.google || !mapRef.current) return;

    if (!mapInstance.current) {
      mapInstance.current = new google.maps.Map(mapRef.current, {
        center: {lat: 20, lng: 0},
        zoom: 4,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: false,
        gestureHandling: 'cooperative',
      });
    }

    const map = mapInstance.current;
    boundsRef.current = new google.maps.LatLngBounds();

    // Clear old markers
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    const markerIcon = {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: '#F15A24',
      fillOpacity: 1,
      scale: 7,
      strokeColor: 'white',
      strokeWeight: 2,
    };

    // Add new markers
    locations.forEach((loc) => {
      if (!loc.latitude || !loc.longitude) return;

      const position = new google.maps.LatLng(loc.latitude, loc.longitude);
      const marker = new google.maps.Marker({
        position: {lat: loc.latitude, lng: loc.longitude},
        map,
        title: loc.name,
        icon: {
    url: "data:image/svg+xml;utf-8," + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
        <path fill="#FF6600" d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5S13.4 11.5 12 11.5z"/>
      </svg>
    `),
    scaledSize: new google.maps.Size(32, 32),
    anchor: new google.maps.Point(16, 32),
  },
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="font-family: Roboto, sans-serif; max-width: 200px;">
            <strong>${loc.name || 'Location'}</strong><br/>
            ${loc.city ? loc.city + ', ' : ''}${loc.state || ''}<br/>
            ${loc.country}
          </div>
        `,
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
        onMarkerClick(loc);

        // Smooth pan animation
        map.panTo(position);
        map.setZoom(10);
      });

      markersRef.current.push(marker);
      boundsRef.current?.extend(position);
    });

    // Smooth fit to bounds animation
    if (locations.length > 0) {
      map.fitBounds(boundsRef.current!);
      setTimeout(() => {
        map.panBy(0, -50); // adjust center for better visibility
      }, 500);
    }

    return () => {
      markersRef.current.forEach((m) => m.setMap(null));
      markersRef.current = [];
    };
  }, [locations, onMarkerClick]);

  // 🔹 Custom zoom controls
  const handleZoomIn = () => {
    if (mapInstance.current) {
      mapInstance.current.setZoom(mapInstance.current.getZoom()! + 1);
    }
  };

  const handleZoomOut = () => {
    if (mapInstance.current) {
      mapInstance.current.setZoom(mapInstance.current.getZoom()! - 1);
    }
  };

  return (
    <div className="relative w-full h-[750px] rounded-xl overflow-hidden">
      <div ref={mapRef} className="w-full h-full transition-all duration-500" />

      {/* Zoom buttons */}
      <div className="absolute top-4 right-4 flex flex-col bg-white rounded-lg shadow-md overflow-hidden z-10">
        <button
          onClick={handleZoomIn}
          className="p-2 border-b hover:bg-gray-100 transition"
          aria-label="Zoom in"
        >
          +
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 hover:bg-gray-100 transition"
          aria-label="Zoom out"
        >
          −
        </button>
      </div>
    </div>
  );
}

// 🔹 Main Country Page
export default function CountryPage() {
  const {decodedCountry, states, locations} = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [showMap, setShowMap] = useState(false);

  const getPrefixedPath = usePrefixPathWithLocale2();

  function handleLocationClick(loc: any) {
    const countrySlug = encodeURIComponent(loc.country);
    const stateSlug = encodeURIComponent(loc.state || '');
    const url = getPrefixedPath(`/l/${countrySlug}/${stateSlug}`);
    navigate(url);
  }

  return (
    <div className="flex flex-col min-h-screen bg-white relative">
      <main
        className={`grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto w-full pt-10 pb-16 px-5 transition-all duration-500 ease-in-out ${
          showMap ? 'opacity-100' : 'opacity-100'
        }`}
      >
        {/* Left Column */}
        <aside
          className={`rounded-xl shadow-sm transition-all duration-500 ease-in-out ${
            showMap ? 'hidden md:block' : 'block'
          }`}
        >
          <div className="flex items-center space-x-4 mb-6">
            <button
              className="rounded-full md:border md:border-LightWhite p-2 md:p-[11px]"
              title='Back'
              onClick={() => navigate(-1)}
            >
              <LeftArrowBlack />
            </button>

            <h1 className="font-Roboto text-PrimaryBlack font-semibold text-[24px] leading-[31.2px] tracking-[-0.39px]">
            Virtual Mailbox in {decodedCountry}
            </h1>
          </div>

          <ul className="space-y-8">
            {states.map((state, index) => (
              <button
                key={index}
                type='button'
                className="group flex items-center gap-2 text-[18px] font-[500] text-[#091019] cursor-pointer transition-all duration-300"
                onClick={() => {
                  const loc = locations.find((l: any) => l.state === state.name);
                  if (loc) handleLocationClick(loc);
                }}
              >
                <span className="group-hover:text-[#F15A24]">{state.name}</span>
                <span className="text-[12px] bg-[#0000001a] font-[400] leading-[18px] text-[#091019] rounded-full w-6 h-6 flex items-center justify-center">
                  {state.count}
                </span>
                <span className="opacity-0 group-hover:opacity-100 translate-x-[-6px] group-hover:translate-x-[0] transition-all duration-300 bg-[#F15A24] rounded-full w-6 h-6 flex items-center justify-center">
                  <ArrowRightCountries />
                </span>
              </button>
            ))}
          </ul>
        </aside>

        {/* Right Column - Map */}
        <section
          className={`rounded-xl shadow-sm overflow-hidden transition-all duration-500 ease-in-out ${
            showMap ? 'block' : 'hidden md:block'
          }`}
        >
          <div className="md:hidden flex items-center space-x-4 mb-6">
            <button
              className="rounded-full md:border md:border-LightWhite p-2 md:p-[11px]"
              title='Back'
              onClick={() => navigate(-1)}
            >
              <LeftArrowBlack />
            </button>

            <h1 className="font-Roboto text-PrimaryBlack font-semibold text-[24px] leading-[31.2px] tracking-[-0.39px]">
            Virtual Mailbox in {decodedCountry}
            </h1>
          </div>
          <CountryMap
            locations={locations}
            onMarkerClick={(loc) => handleLocationClick(loc)}
          />
        </section>
      </main>

      {/* Mobile Toggle */}
      <div className="md:hidden fixed bottom-6 left-0 right-0 flex justify-center z-50">
        <button
          onClick={() => setShowMap(!showMap)}
          className="flex items-center gap-3 bg-black text-white rounded-full px-6 py-3 text-[16px] font-[400] font-medium shadow-md"
        >
          {showMap ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="14" viewBox="0 0 20 14" fill="none">
                <path
                  d="M1.30078 12.6001C1.52321 12.6003 1.7002 12.778 1.7002 13.0005C1.69999 13.2228 1.52308 13.3997 1.30078 13.3999C1.0783 13.3999 0.900598 13.2229 0.900391 13.0005C0.900391 12.7779 1.07817 12.6001 1.30078 12.6001ZM5.80078 12.8999H19C19.0539 12.8999 19.1006 12.9466 19.1006 13.0005C19.1004 13.0542 19.0537 13.1001 19 13.1001H5.80078C5.74705 13.1001 5.70042 13.0542 5.7002 13.0005C5.7002 12.9466 5.74692 12.8999 5.80078 12.8999ZM1.30078 6.6001C1.52321 6.60031 1.7002 6.77801 1.7002 7.00049C1.69999 7.22278 1.52308 7.3997 1.30078 7.3999C1.0783 7.3999 0.900598 7.22291 0.900391 7.00049C0.900391 6.77788 1.07817 6.6001 1.30078 6.6001ZM5.80078 6.8999H19C19.0539 6.8999 19.1006 6.94663 19.1006 7.00049C19.1004 7.05418 19.0537 7.1001 19 7.1001H5.80078C5.74705 7.1001 5.70042 7.05418 5.7002 7.00049C5.7002 6.94663 5.74692 6.8999 5.80078 6.8999ZM1.30078 0.600098C1.52321 0.600305 1.7002 0.778011 1.7002 1.00049C1.69999 1.22278 1.52308 1.3997 1.30078 1.3999C1.0783 1.3999 0.900598 1.22291 0.900391 1.00049C0.900391 0.777881 1.07817 0.600098 1.30078 0.600098ZM5.80078 0.899902H19C19.0539 0.899902 19.1006 0.946631 19.1006 1.00049C19.1004 1.05418 19.0537 1.1001 19 1.1001H5.80078C5.74705 1.1001 5.70042 1.05418 5.7002 1.00049C5.7002 0.946631 5.74692 0.899902 5.80078 0.899902Z"
                  fill="#091019"
                  stroke="white"
                />
              </svg>
              View as List
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                <path
                  d="M19.5527 1.31714C19.583 1.33588 19.6006 1.36664 19.6006 1.40112V15.8533C19.6006 15.8924 19.5768 15.9293 19.54 15.946L14.5088 18.2292V18.2302C14.2129 18.3647 13.8736 18.3819 13.5596 18.2781H13.5605L7.02441 16.0994L6.82715 16.0339L6.6416 16.1267L1.54688 18.6912C1.50949 18.7099 1.47545 18.7048 1.4541 18.6912C1.41668 18.6672 1.40039 18.6316 1.40039 18.5984V4.14624C1.40039 4.10724 1.42336 4.0703 1.45996 4.05347V4.05444L6.49219 1.77026C6.78809 1.63576 7.12734 1.61863 7.44141 1.72241V1.72144L13.9756 3.90015L14.1729 3.96655L14.3584 3.8728L19.4531 1.31128L19.4541 1.31226C19.4854 1.29662 19.5226 1.29857 19.5527 1.31714ZM6.09375 2.17261L1.89355 4.0769L1.60059 4.21069V18.4392L2.3252 18.074L6.52539 15.9587L6.80078 15.8201V1.85132L6.09375 2.17261ZM18.6758 1.92554L14.4756 4.04077L14.2002 4.17944V18.1482L14.9072 17.8279L19.1064 15.9226L19.4004 15.7898V1.56128L18.6758 1.92554ZM14 4.11987L13.6582 4.00562L7.6582 2.00659L7 1.78784V15.8806L7.34277 15.9939L13.3428 17.9929L14 18.2126V4.11987Z"
                  fill="#091019"
                  stroke="white"
                />
              </svg>
              View as Map
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export function usePrefixPathWithLocale2() {
  const selectedLocale = useRootLoaderData()?.selectedLocale ?? DEFAULT_LOCALE;

  return (path?: string | null) => {
    if (!path) return selectedLocale.pathPrefix || '/';
    return `${selectedLocale.pathPrefix}${path.startsWith('/') ? path : '/' + path}`;
  };
}

