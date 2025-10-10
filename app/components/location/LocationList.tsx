import {json, type LoaderFunctionArgs, defer} from '@shopify/remix-oxygen';
import {useLoaderData, useNavigate} from '@remix-run/react';
import {useState, useEffect, useMemo, useRef} from 'react';
import {AnalyticsPageType, type SeoHandleFunction} from '@shopify/hydrogen';
import {HEADER_QUERY} from '~/queries/sanity/header';
import {FOOTER_QUERY} from '~/queries/sanity/footer';
import {notFound} from '~/lib/utils';
import Map from '~/components/icons/Map';
import CloseIconBlack from '~/components/icons/CloseIconBlack';
import Location from "~/components/media/location.svg";
import Location1 from "~/components/media/location1.svg";
import LeftArrowBlack from '~/components/icons/LeftArrowBlack';
import SearchWhite from "~/components/media/Search.svg";

const services = [
    { name: "Mail Forwarding", icon: Location},
    { name: "Document Scanning", icon: Location1 },
    { name: "Local Pickup", icon: Location },
    { name: "Recycling", icon: Location1 },
    { name: "Online Storage", icon: Location },
  ];
  
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


interface LocationsListProps {
  locations: LocationAPI[];
  initialQuery?: string;
}

export default function LocationsList({locations, initialQuery = ''}: LocationsListProps) {
    const [minVal, setMinVal] = useState(25);
    const [maxVal, setMaxVal] = useState(75);
    const [showMore, setShowMore] = useState(false);
  
    const visibleItems = services.slice(0, 3);
    const hiddenItems = services.slice(3);
  
  
    const navigate = useNavigate();
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [searchCity, setSearchCity] = useState<string>('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<LocationAPI | null>(
      locations[0] || null,
    );
  console.log("locations in subloc", locations);
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
    const displayNames = Array.from(
      new Set(locations.map((loc) => loc.displayName).filter(Boolean)),
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
      console.log(loc.latitude, loc.longitude);
      console.log(loc.featureList);
      if (loc.latitude && loc.longitude) {
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
        markersRef.current.push(marker);
      }
    });
     
      
          // Fit to bounds
          const bounds = new google.maps.LatLngBounds();
          markersRef.current.forEach((m) => bounds.extend(m.getPosition()!));
          map.fitBounds(bounds);
        };
    const smoothZoom = (
      map: google.maps.Map,
      targetZoom: number,
      currentZoom?: number,
      onComplete?: () => void
    ) => {
      currentZoom = currentZoom || map.getZoom() || 4;
      if (currentZoom === targetZoom) {
        if (onComplete) onComplete();
        return;
      }
     
      google.maps.event.addListenerOnce(map, 'zoom_changed', () => {
        smoothZoom(
          map,
          targetZoom,
          currentZoom! + (targetZoom > currentZoom ? 1 : -1),
          onComplete
        );
      });
     
      setTimeout(() => map.setZoom(currentZoom!), 80);
    };
     
      
    const smoothPanTo = (
      map: google.maps.Map,
      target: google.maps.LatLngLiteral,
      duration = 1000,
      onComplete?: () => void
    ) => {
      const start = map.getCenter();
      if (!start) return;
     
      const startLat = start.lat();
      const startLng = start.lng();
      const deltaLat = target.lat - startLat;
      const deltaLng = target.lng - startLng;
     
      let startTime: number | null = null;
     
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
     
        // ease-in-out
        const easeInOut = progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress;
     
        const lat = startLat + deltaLat * easeInOut;
        const lng = startLng + deltaLng * easeInOut;
     
        map.setCenter({ lat, lng });
     
        if (progress < 1) {
          requestAnimationFrame(step);
        } else if (onComplete) {
          onComplete();
        }
      };
     
      requestAnimationFrame(step);
    };
     
    const zoomToLocation = (loc: LocationAPI) => {
      if (mapRef.current && loc.latitude && loc.longitude) {
        const target = { lat: loc.latitude, lng: loc.longitude };
     
        // Step 1: Zoom OUT a bit first
        smoothZoom(mapRef.current, 8, undefined, () => {
          // Step 2: Pan while zoomed out
          smoothPanTo(mapRef.current!, target, 1200, () => {
            // Step 3: Zoom back IN to final level
            smoothZoom(mapRef.current!, 12);
          });
        });
      }
    };

  const resetToAllLocations = () => {
    if (mapRef.current && boundsRef.current && !boundsRef.current.isEmpty()) {
      mapRef.current.fitBounds(boundsRef.current);
    }
  };
  const combinedCities = cities.map((city, index) => ({
    id: index,
    city,
    displayName: displayNames[index] || city, // fallback if displayName missing
  }));

  return (
    <>
     {/* <Header data={header} searchResults={mergedResults} searchQuery={q} /> */}
    <div className="flex px-5 pt-[24px] md:pt-[40px] pb-[40px] md:pb-[60px]">
      <div className="flex flex-col lg:flex-row max-w-[1340px] mx-auto w-full gap-10">
        {/* Left Side */}
        <div className="w-full lg:w-[53%]">
          <h1 className="font-Roboto text-PrimaryBlack font-semibold text-[24px] leading-[31.2px] tracking-[-0.39px] mb-4">
            Virtual Mailbox in {selectedLocation?.city || 'Unknown'}
          </h1>

          {/* City Dropdown + Filter Icon */}
          {/* <div className="flex items-center  justify-between gap-3 mb-4 md:mb-6">
             <div className="flex items-center justify-between gap-3 w-full">  
              <button className="rounded-full md:border md:border-LightWhite p-2 md:p-[11px]"
               onClick={() => navigate("/")}>
                <LeftArrowBlack />
              </button>  
                        
             <div className="shadow-[0_6px_24px_0_rgba(0,0,0,0.05)] md:shadow-none flex items-center justify-between gap-[10px] w-full rounded-full border border-LightWhite py-[4px] md:py-[3px] pl-3 md:pl-4 pr-[4px] md:pr-[3px]">  
              <select
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="py-[3px] md:py-2  w-full bg-white font-Roboto text-PrimaryBlack font-normal text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] tracking-[0px] appearance-none"
              >
                <option value="">Select a City</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <button
  className="flex"
  onClick={() => {
    setSelectedCity("");
    setSearchCity(""); // clear active search as well
  }}
>
  <CloseIconBlack />
</button> 
               <button className="flex items-center justify-center min-w-[32px] md:min-w-[48px] w-[32px] md:w-12 h-[32px] md:h-12 bg-DarkOrange rounded-full">
                 <img
                  src={SearchWhite}
                  alt="Logo"
                  className="w-[16px] md:w-[21px] h-[16px]  md:h-[21px] object-contain"
                  onClick={() => setSelectedCity(searchCity)}
                />
              </button> 
               </div>
             </div>
            <div className='flex items-center gap-[10px] px-[9px] md:px-4 py-[9px] md:py-3 border border-LightWhite rounded-full'>
              <button
              onClick={() => setShowFilters(true)}
              className=""
            >
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-5 h-5 md:w-6 md:h-6">
              <path d="M21.25 11.9999H8.895M4.534 11.9999H2.75M4.534 11.9999C4.534 11.4217 4.76368 10.8672 5.17251 10.4584C5.58134 10.0496 6.13583 9.81989 6.714 9.81989C7.29217 9.81989 7.84666 10.0496 8.25549 10.4584C8.66432 10.8672 8.894 11.4217 8.894 11.9999C8.894 12.5781 8.66432 13.1326 8.25549 13.5414C7.84666 13.9502 7.29217 14.1799 6.714 14.1799C6.13583 14.1799 5.58134 13.9502 5.17251 13.5414C4.76368 13.1326 4.534 12.5781 4.534 11.9999ZM21.25 18.6069H15.502M15.502 18.6069C15.502 19.1852 15.2718 19.7403 14.8628 20.1492C14.4539 20.5582 13.8993 20.7879 13.321 20.7879C12.7428 20.7879 12.1883 20.5572 11.7795 20.1484C11.3707 19.7396 11.141 19.1851 11.141 18.6069M15.502 18.6069C15.502 18.0286 15.2718 17.4745 14.8628 17.0655C14.4539 16.6566 13.8993 16.4269 13.321 16.4269C12.7428 16.4269 12.1883 16.6566 11.7795 17.0654C11.3707 17.4742 11.141 18.0287 11.141 18.6069M11.141 18.6069H2.75M21.25 5.39289H18.145M13.784 5.39289H2.75M13.784 5.39289C13.784 4.81472 14.0137 4.26023 14.4225 3.8514C14.8313 3.44257 15.3858 3.21289 15.964 3.21289C16.2503 3.21289 16.5338 3.26928 16.7983 3.37883C17.0627 3.48839 17.3031 3.64897 17.5055 3.8514C17.7079 4.05383 17.8685 4.29415 17.9781 4.55864C18.0876 4.82313 18.144 5.10661 18.144 5.39289C18.144 5.67917 18.0876 5.96265 17.9781 6.22714C17.8685 6.49163 17.7079 6.73195 17.5055 6.93438C17.3031 7.13681 17.0627 7.29739 16.7983 7.40695C16.5338 7.5165 16.2503 7.57289 15.964 7.57289C15.3858 7.57289 14.8313 7.34321 14.4225 6.93438C14.0137 6.52555 13.784 5.97106 13.784 5.39289Z" stroke="#091019" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
            </svg>
            </button>
              <span className='hidden md:flex font-Roboto text-PrimaryBlack font-normal text-[16px] leading-[24px] tracking-[0px]'>Filters</span>
            </div>
            
          </div> */}
 <div className="flex items-center justify-between gap-3 mb-4 md:mb-6">
  <div className="flex items-center gap-3 w-full relative">  
    <button
      className="rounded-full md:border md:border-LightWhite p-2 md:p-[11px]"
      onClick={() => navigate(-1)}
    >
      <LeftArrowBlack />
    </button>  

    <div className="flex flex-col w-full relative">
  <div className="flex items-center gap-[10px] w-full rounded-full border border-LightWhite py-[4px] md:py-[3px] pl-3 md:pl-4 pr-[4px] md:pr-[3px] shadow-[0_6px_24px_0_rgba(0,0,0,0.05)] md:shadow-none bg-white">
    <input
      type="text"
      value={searchCity}
      onChange={(e) => {
        setSearchCity(e.target.value);
        setShowSuggestions(true); // show suggestions when typing
        navigate(`/sublocations?q=${encodeURIComponent(searchCity)}`, { replace: true });
      }}
      placeholder="Type a city"
      className="flex-1 py-[3px] md:py-2 bg-white font-Roboto text-PrimaryBlack font-normal text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] tracking-[0px] border-none outline-none"
    />
    {searchCity && (
      <button
        className="flex"
        onClick={() => {
          setSelectedCity("");
          setSearchCity("");
          setShowSuggestions(false); // hide suggestions when cleared
        }}
      >
        <CloseIconBlack />
      </button>
    )}
    <button
      className="flex items-center justify-center min-w-[32px] md:min-w-[48px] w-[32px] md:w-12 h-[32px] md:h-12 bg-DarkOrange rounded-full"
      onClick={() => setSelectedCity(searchCity)}
    >
      <img
        src={SearchWhite}
        alt="Logo"
        className="w-[16px] md:w-[21px] h-[16px] md:h-[21px] object-contain"
      />
    </button>
  </div>

  {/* Autocomplete suggestions */}
  {/* {showSuggestions && searchCity && cities.filter(city =>
      city.toLowerCase().includes(searchCity.toLowerCase())
    ).length > 0 && (
    <ul className="absolute z-50 w-full bg-white border border-LightWhite rounded-b-md max-h-40 overflow-y-auto mt-12 shadow-md">
      {cities
        .filter((city) =>
          city.toLowerCase().includes(searchCity.toLowerCase())
        )
        .map((city) => (
          <li
            key={city}
            className="px-3 py-2 cursor-pointer hover:bg-gray-100"
            onClick={() => {
              setSearchCity(city);
              setSelectedCity(city);
              setShowSuggestions(false); // hide suggestions on select
            }}
          >
            {city}
          </li>
        ))}
    </ul>
  )} */}
   {showSuggestions &&
  searchCity &&
  combinedCities.filter(
    (cityObj) =>
      cityObj.city?.toLowerCase().includes(searchCity.toLowerCase()) ||
      cityObj.displayName?.toLowerCase().includes(searchCity.toLowerCase())
  ).length > 0 && (
    <ul className="absolute z-50 w-full bg-white border border-LightWhite rounded-b-md max-h-40 overflow-y-auto mt-12 shadow-md">
      {combinedCities
        .filter(
          (cityObj) =>
            cityObj.city?.toLowerCase().includes(searchCity.toLowerCase()) ||
            cityObj.displayName?.toLowerCase().includes(searchCity.toLowerCase())
        )
        .map((cityObj) => (
          <li
            key={cityObj.id}
            className="px-3 py-2 cursor-pointer hover:bg-gray-100"
            onClick={() => {
              setSearchCity(cityObj.displayName || cityObj.city);
              setSelectedCity(cityObj);
              setShowSuggestions(false);
              navigate(`/sublocations?q=${encodeURIComponent(cityObj.displayName || cityObj.city)}`, { replace: true });
              
            }}
          >
            {cityObj.displayName} ({cityObj.city})
          </li>
        ))}
    </ul>
)}

</div>
  </div>

  <div className="flex items-center gap-[10px] px-[9px] md:px-4 py-[9px] md:py-3 border border-LightWhite rounded-full">
    <button onClick={() => setShowFilters(true)}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-5 h-5 md:w-6 md:h-6"> <path d="M21.25 11.9999H8.895M4.534 11.9999H2.75M4.534 11.9999C4.534 11.4217 4.76368 10.8672 5.17251 10.4584C5.58134 10.0496 6.13583 9.81989 6.714 9.81989C7.29217 9.81989 7.84666 10.0496 8.25549 10.4584C8.66432 10.8672 8.894 11.4217 8.894 11.9999C8.894 12.5781 8.66432 13.1326 8.25549 13.5414C7.84666 13.9502 7.29217 14.1799 6.714 14.1799C6.13583 14.1799 5.58134 13.9502 5.17251 13.5414C4.76368 13.1326 4.534 12.5781 4.534 11.9999ZM21.25 18.6069H15.502M15.502 18.6069C15.502 19.1852 15.2718 19.7403 14.8628 20.1492C14.4539 20.5582 13.8993 20.7879 13.321 20.7879C12.7428 20.7879 12.1883 20.5572 11.7795 20.1484C11.3707 19.7396 11.141 19.1851 11.141 18.6069M15.502 18.6069C15.502 18.0286 15.2718 17.4745 14.8628 17.0655C14.4539 16.6566 13.8993 16.4269 13.321 16.4269C12.7428 16.4269 12.1883 16.6566 11.7795 17.0654C11.3707 17.4742 11.141 18.0287 11.141 18.6069M11.141 18.6069H2.75M21.25 5.39289H18.145M13.784 5.39289H2.75M13.784 5.39289C13.784 4.81472 14.0137 4.26023 14.4225 3.8514C14.8313 3.44257 15.3858 3.21289 15.964 3.21289C16.2503 3.21289 16.5338 3.26928 16.7983 3.37883C17.0627 3.48839 17.3031 3.64897 17.5055 3.8514C17.7079 4.05383 17.8685 4.29415 17.9781 4.55864C18.0876 4.82313 18.144 5.10661 18.144 5.39289C18.144 5.67917 18.0876 5.96265 17.9781 6.22714C17.8685 6.49163 17.7079 6.73195 17.5055 6.93438C17.3031 7.13681 17.0627 7.29739 16.7983 7.40695C16.5338 7.5165 16.2503 7.57289 15.964 7.57289C15.3858 7.57289 14.8313 7.34321 14.4225 6.93438C14.0137 6.52555 13.784 5.97106 13.784 5.39289Z" stroke="#091019" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/> </svg>
    </button>
    <span className="hidden md:flex font-Roboto text-PrimaryBlack font-normal text-[16px] leading-[24px] tracking-[0px]">
      Filters
    </span>
  </div>
</div>



          <p className="font-Roboto text-PrimaryBlack font-normal text-[14px] leading-[21px] tracking-[0px] mb-4">{filtered.length} locations found</p>

          {/* Locations List */}
          <div className="space-y-4 max-h-[605px] overflow-y-auto">
           
            {filtered.map((loc) => (
              <div
                key={loc._id}
                className="bg-white border border-LightWhite rounded-[12px] p-5 md:p-6 cursor-pointer"
                onMouseEnter={() => zoomToLocation(loc)}
              >
                {/* Top Row: Badges + Distance */}
                
               

                {/* Location Title + Address */}
                <div className="flex flex-col md:flex-row justify-between">
                   <div className="">
                     <div className="flex items-center justify-between mb-3 md:mb-4">
                  <div className="flex gap-8">
                    {loc.ratingList?.some(
                      (r) => r.type === 'TOPRATED' && r.status === 'ACTIVE',
                    ) && (
                      <span className="text-xs bg-orange-100 text-orange-600 font-semibold px-2 py-1 rounded">
                        TOP RATED
                      </span>
                    )}
                    <div className="flex items-center gap-2 relative after:content-[''] after:absolute after:w-[1px] after:h-[13px] after:bg-LightWhite after:top-[1px] after:right-[-17px]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <mask id="path-1-inside-1_3106_3781" fill="white">
                          <path d="M7.28406 0.999941C7.72406 0.732441 8.27656 0.732441 8.71656 0.999941C8.98406 1.16244 9.17656 1.25244 9.36656 1.30244C9.55656 1.35244 9.76906 1.37244 10.0816 1.36494C10.5966 1.35244 11.0741 1.62994 11.3216 2.07994C11.4716 2.35244 11.5941 2.52744 11.7341 2.66744C11.8741 2.80744 12.0466 2.92994 12.3216 3.07994C12.7741 3.32744 13.0491 3.80494 13.0366 4.31994C13.0291 4.63244 13.0491 4.84244 13.0991 5.03494C13.1491 5.22744 13.2391 5.41744 13.4016 5.68494C13.6691 6.12494 13.6691 6.67744 13.4016 7.11744C13.2391 7.38494 13.1491 7.57744 13.0991 7.76744C13.0491 7.95744 13.0291 8.16994 13.0366 8.48244C13.0491 8.99744 12.7716 9.47494 12.3216 9.72244C12.0491 9.87244 11.8741 9.99494 11.7341 10.1349C11.5941 10.2749 11.4716 10.4474 11.3216 10.7224C11.2866 10.7874 11.2466 10.8474 11.2016 10.9049V14.8049C11.2016 14.9399 11.1341 15.0649 11.0216 15.1399C10.9091 15.2149 10.7666 15.2274 10.6441 15.1749L7.99906 14.0349L5.35656 15.1674C5.23406 15.2199 5.09156 15.2074 4.97906 15.1324C4.86656 15.0574 4.79906 14.9349 4.79906 14.7999V10.8999C4.75406 10.8424 4.71406 10.7824 4.67906 10.7174C4.52906 10.4449 4.40656 10.2699 4.26656 10.1299C4.12656 9.98994 3.95406 9.86744 3.67906 9.71744C3.22656 9.46994 2.95156 8.99244 2.96406 8.47744C2.97156 8.16494 2.95156 7.95494 2.90156 7.76244C2.85156 7.56994 2.76156 7.37994 2.59906 7.11244C2.33156 6.67244 2.33156 6.11994 2.59906 5.67994C2.76156 5.41244 2.85156 5.21994 2.90156 5.02994C2.95156 4.83994 2.97156 4.62744 2.96406 4.31494C2.95156 3.79994 3.22906 3.32244 3.67906 3.07494C3.95156 2.92494 4.12656 2.80244 4.26656 2.66244C4.40656 2.52244 4.52906 2.35494 4.67906 2.08244C4.92656 1.62994 5.40406 1.35494 5.91906 1.36744C6.23156 1.37494 6.44156 1.35494 6.63406 1.30494C6.82656 1.25494 7.01656 1.16494 7.28406 1.00244V0.999941ZM10.0791 11.4324C9.76656 11.4249 9.55656 11.4449 9.36406 11.4949C9.17156 11.5449 8.98156 11.6349 8.71406 11.7974C8.27406 12.0649 7.72156 12.0649 7.28156 11.7974C7.01406 11.6349 6.82156 11.5449 6.63156 11.4949C6.44156 11.4449 6.22906 11.4249 5.91656 11.4324C5.80656 11.4349 5.69906 11.4249 5.59656 11.4024V14.1924L7.83906 13.2324C7.93906 13.1899 8.05406 13.1899 8.15406 13.2324L10.3966 14.1924V11.4024C10.2916 11.4249 10.1841 11.4349 10.0766 11.4324H10.0791ZM8.29906 1.68494C8.11406 1.57244 7.88406 1.57244 7.69906 1.68494C7.39906 1.86744 7.13156 1.99744 6.83906 2.07744C6.54656 2.15744 6.25156 2.17494 5.89906 2.16744C5.68406 2.16244 5.48406 2.27744 5.37906 2.46744C5.21156 2.77744 5.04406 3.02244 4.83156 3.23744C4.61906 3.45244 4.37406 3.61494 4.06406 3.78244C3.87406 3.88494 3.75906 4.08494 3.76406 4.30244C3.77156 4.65494 3.75156 4.94994 3.67406 5.24244C3.59656 5.53494 3.46656 5.79994 3.28406 6.09994C3.17156 6.28494 3.17156 6.51494 3.28406 6.69994C3.46656 6.99994 3.59656 7.26744 3.67656 7.55994C3.75656 7.85244 3.77406 8.14744 3.76656 8.49994C3.76156 8.71494 3.87656 8.91494 4.06656 9.01994C4.37656 9.18744 4.62156 9.35494 4.83656 9.56744C5.05156 9.77994 5.21656 10.0274 5.38406 10.3374C5.48656 10.5274 5.68656 10.6424 5.90406 10.6374C6.25656 10.6299 6.55156 10.6499 6.84406 10.7274C7.13656 10.8049 7.40156 10.9374 7.70406 11.1199C7.88906 11.2324 8.11906 11.2324 8.30406 11.1199C8.60406 10.9374 8.87156 10.8074 9.16406 10.7274C9.45656 10.6474 9.75156 10.6299 10.1041 10.6374C10.3191 10.6424 10.5191 10.5274 10.6241 10.3374C10.7916 10.0299 10.9591 9.78244 11.1716 9.56744C11.3841 9.35244 11.6316 9.18744 11.9416 9.01994C12.1316 8.91744 12.2466 8.71744 12.2416 8.49994C12.2341 8.14744 12.2541 7.85244 12.3316 7.55994C12.4091 7.26744 12.5416 7.00244 12.7241 6.69994C12.8366 6.51494 12.8366 6.28494 12.7241 6.09994C12.5416 5.79994 12.4116 5.53244 12.3316 5.23994C12.2516 4.94744 12.2341 4.65244 12.2416 4.29994C12.2466 4.08494 12.1316 3.88494 11.9416 3.77994C11.6341 3.61244 11.3866 3.44494 11.1716 3.23244C10.9566 3.01994 10.7841 2.77494 10.6166 2.46494C10.5141 2.27494 10.3141 2.15994 10.0966 2.16494C9.74406 2.17244 9.44906 2.15244 9.15656 2.07494C8.86406 1.99744 8.59906 1.86744 8.29906 1.68494ZM5.99906 6.39994C5.99906 7.50494 6.89406 8.39994 7.99906 8.39994C9.10406 8.39994 9.99906 7.50494 9.99906 6.39994C9.99906 5.29494 9.10406 4.39994 7.99906 4.39994C6.89406 4.39994 5.99906 5.29494 5.99906 6.39994ZM7.99906 9.19994C6.45156 9.19994 5.19906 7.94744 5.19906 6.39994C5.19906 4.85244 6.45156 3.59994 7.99906 3.59994C9.54656 3.59994 10.7991 4.85244 10.7991 6.39994C10.7991 7.94744 9.54656 9.19994 7.99906 9.19994Z"/>
                        </mask>
                        <path d="M7.28406 0.999941C7.72406 0.732441 8.27656 0.732441 8.71656 0.999941C8.98406 1.16244 9.17656 1.25244 9.36656 1.30244C9.55656 1.35244 9.76906 1.37244 10.0816 1.36494C10.5966 1.35244 11.0741 1.62994 11.3216 2.07994C11.4716 2.35244 11.5941 2.52744 11.7341 2.66744C11.8741 2.80744 12.0466 2.92994 12.3216 3.07994C12.7741 3.32744 13.0491 3.80494 13.0366 4.31994C13.0291 4.63244 13.0491 4.84244 13.0991 5.03494C13.1491 5.22744 13.2391 5.41744 13.4016 5.68494C13.6691 6.12494 13.6691 6.67744 13.4016 7.11744C13.2391 7.38494 13.1491 7.57744 13.0991 7.76744C13.0491 7.95744 13.0291 8.16994 13.0366 8.48244C13.0491 8.99744 12.7716 9.47494 12.3216 9.72244C12.0491 9.87244 11.8741 9.99494 11.7341 10.1349C11.5941 10.2749 11.4716 10.4474 11.3216 10.7224C11.2866 10.7874 11.2466 10.8474 11.2016 10.9049V14.8049C11.2016 14.9399 11.1341 15.0649 11.0216 15.1399C10.9091 15.2149 10.7666 15.2274 10.6441 15.1749L7.99906 14.0349L5.35656 15.1674C5.23406 15.2199 5.09156 15.2074 4.97906 15.1324C4.86656 15.0574 4.79906 14.9349 4.79906 14.7999V10.8999C4.75406 10.8424 4.71406 10.7824 4.67906 10.7174C4.52906 10.4449 4.40656 10.2699 4.26656 10.1299C4.12656 9.98994 3.95406 9.86744 3.67906 9.71744C3.22656 9.46994 2.95156 8.99244 2.96406 8.47744C2.97156 8.16494 2.95156 7.95494 2.90156 7.76244C2.85156 7.56994 2.76156 7.37994 2.59906 7.11244C2.33156 6.67244 2.33156 6.11994 2.59906 5.67994C2.76156 5.41244 2.85156 5.21994 2.90156 5.02994C2.95156 4.83994 2.97156 4.62744 2.96406 4.31494C2.95156 3.79994 3.22906 3.32244 3.67906 3.07494C3.95156 2.92494 4.12656 2.80244 4.26656 2.66244C4.40656 2.52244 4.52906 2.35494 4.67906 2.08244C4.92656 1.62994 5.40406 1.35494 5.91906 1.36744C6.23156 1.37494 6.44156 1.35494 6.63406 1.30494C6.82656 1.25494 7.01656 1.16494 7.28406 1.00244V0.999941ZM10.0791 11.4324C9.76656 11.4249 9.55656 11.4449 9.36406 11.4949C9.17156 11.5449 8.98156 11.6349 8.71406 11.7974C8.27406 12.0649 7.72156 12.0649 7.28156 11.7974C7.01406 11.6349 6.82156 11.5449 6.63156 11.4949C6.44156 11.4449 6.22906 11.4249 5.91656 11.4324C5.80656 11.4349 5.69906 11.4249 5.59656 11.4024V14.1924L7.83906 13.2324C7.93906 13.1899 8.05406 13.1899 8.15406 13.2324L10.3966 14.1924V11.4024C10.2916 11.4249 10.1841 11.4349 10.0766 11.4324H10.0791ZM8.29906 1.68494C8.11406 1.57244 7.88406 1.57244 7.69906 1.68494C7.39906 1.86744 7.13156 1.99744 6.83906 2.07744C6.54656 2.15744 6.25156 2.17494 5.89906 2.16744C5.68406 2.16244 5.48406 2.27744 5.37906 2.46744C5.21156 2.77744 5.04406 3.02244 4.83156 3.23744C4.61906 3.45244 4.37406 3.61494 4.06406 3.78244C3.87406 3.88494 3.75906 4.08494 3.76406 4.30244C3.77156 4.65494 3.75156 4.94994 3.67406 5.24244C3.59656 5.53494 3.46656 5.79994 3.28406 6.09994C3.17156 6.28494 3.17156 6.51494 3.28406 6.69994C3.46656 6.99994 3.59656 7.26744 3.67656 7.55994C3.75656 7.85244 3.77406 8.14744 3.76656 8.49994C3.76156 8.71494 3.87656 8.91494 4.06656 9.01994C4.37656 9.18744 4.62156 9.35494 4.83656 9.56744C5.05156 9.77994 5.21656 10.0274 5.38406 10.3374C5.48656 10.5274 5.68656 10.6424 5.90406 10.6374C6.25656 10.6299 6.55156 10.6499 6.84406 10.7274C7.13656 10.8049 7.40156 10.9374 7.70406 11.1199C7.88906 11.2324 8.11906 11.2324 8.30406 11.1199C8.60406 10.9374 8.87156 10.8074 9.16406 10.7274C9.45656 10.6474 9.75156 10.6299 10.1041 10.6374C10.3191 10.6424 10.5191 10.5274 10.6241 10.3374C10.7916 10.0299 10.9591 9.78244 11.1716 9.56744C11.3841 9.35244 11.6316 9.18744 11.9416 9.01994C12.1316 8.91744 12.2466 8.71744 12.2416 8.49994C12.2341 8.14744 12.2541 7.85244 12.3316 7.55994C12.4091 7.26744 12.5416 7.00244 12.7241 6.69994C12.8366 6.51494 12.8366 6.28494 12.7241 6.09994C12.5416 5.79994 12.4116 5.53244 12.3316 5.23994C12.2516 4.94744 12.2341 4.65244 12.2416 4.29994C12.2466 4.08494 12.1316 3.88494 11.9416 3.77994C11.6341 3.61244 11.3866 3.44494 11.1716 3.23244C10.9566 3.01994 10.7841 2.77494 10.6166 2.46494C10.5141 2.27494 10.3141 2.15994 10.0966 2.16494C9.74406 2.17244 9.44906 2.15244 9.15656 2.07494C8.86406 1.99744 8.59906 1.86744 8.29906 1.68494ZM5.99906 6.39994C5.99906 7.50494 6.89406 8.39994 7.99906 8.39994C9.10406 8.39994 9.99906 7.50494 9.99906 6.39994C9.99906 5.29494 9.10406 4.39994 7.99906 4.39994C6.89406 4.39994 5.99906 5.29494 5.99906 6.39994ZM7.99906 9.19994C6.45156 9.19994 5.19906 7.94744 5.19906 6.39994C5.19906 4.85244 6.45156 3.59994 7.99906 3.59994C9.54656 3.59994 10.7991 4.85244 10.7991 6.39994C10.7991 7.94744 9.54656 9.19994 7.99906 9.19994Z" fill="#091019"/>
                        <path d="M7.28406 0.999941L6.76458 0.145462L6.28406 0.437593V0.999941H7.28406ZM8.71656 0.999941L8.19708 1.85442L8.19738 1.8546L8.71656 0.999941ZM10.0816 1.36494L10.1056 2.36465L10.1058 2.36465L10.0816 1.36494ZM11.3216 2.07994L10.4453 2.56186L10.4455 2.56217L11.3216 2.07994ZM12.3216 3.07994L12.8014 2.2026L12.8004 2.20205L12.3216 3.07994ZM13.0366 4.31994L12.0369 4.29568L12.0368 4.29595L13.0366 4.31994ZM13.4016 5.68494L12.5469 6.20413L12.5471 6.20443L13.4016 5.68494ZM13.4016 7.11744L12.5471 6.59796L12.5469 6.59826L13.4016 7.11744ZM13.0366 8.48244L12.0368 8.50643L12.0369 8.50671L13.0366 8.48244ZM12.3216 9.72244L11.8396 8.84623L11.8393 8.8464L12.3216 9.72244ZM11.3216 10.7224L10.4437 10.2436L10.4411 10.2483L11.3216 10.7224ZM11.2016 10.9049L10.4141 10.2886L10.2016 10.5602V10.9049H11.2016ZM10.6441 15.1749L10.2483 16.0933L10.2501 16.0941L10.6441 15.1749ZM7.99906 14.0349L8.39487 13.1166L8.00018 12.9465L7.60514 13.1158L7.99906 14.0349ZM5.35656 15.1674L4.96264 14.2483L5.35656 15.1674ZM4.79906 10.8999H5.79906V10.5552L5.58657 10.2836L4.79906 10.8999ZM4.67906 10.7174L5.55957 10.2433L5.55511 10.2352L4.67906 10.7174ZM3.67906 9.71744L3.19919 10.5948L3.20021 10.5953L3.67906 9.71744ZM2.96406 8.47744L3.96377 8.50171L3.96377 8.50143L2.96406 8.47744ZM2.59906 7.11244L3.45372 6.59325L3.45354 6.59296L2.59906 7.11244ZM2.59906 5.67994L3.45354 6.19943L3.45372 6.19913L2.59906 5.67994ZM2.96406 4.31494L3.96377 4.29095L3.96377 4.29068L2.96406 4.31494ZM3.67906 3.07494L4.16098 3.95116L4.16129 3.95099L3.67906 3.07494ZM4.67906 2.08244L5.55511 2.56467L5.5564 2.56231L4.67906 2.08244ZM5.91906 1.36744L5.8948 2.36715L5.89507 2.36715L5.91906 1.36744ZM7.28406 1.00244L7.80325 1.8571L8.28406 1.56502V1.00244H7.28406ZM10.0791 11.4324V12.4324L10.1031 10.4327L10.0791 11.4324ZM8.71406 11.7974L8.19488 10.9428L8.19458 10.943L8.71406 11.7974ZM7.28156 11.7974L7.80105 10.943L7.80075 10.9428L7.28156 11.7974ZM5.91656 11.4324L5.93928 12.4322L5.94056 12.4322L5.91656 11.4324ZM5.59656 11.4024L5.81097 10.4257L4.59656 10.1591V11.4024H5.59656ZM5.59656 14.1924H4.59656V15.7083L5.99011 15.1117L5.59656 14.1924ZM7.83906 13.2324L7.44792 12.3121L7.44551 12.3131L7.83906 13.2324ZM8.15406 13.2324L8.54761 12.3131L8.5452 12.3121L8.15406 13.2324ZM10.3966 14.1924L10.003 15.1117L11.3966 15.7083V14.1924H10.3966ZM10.3966 11.4024H11.3966V10.1655L10.187 10.4246L10.3966 11.4024ZM10.0766 11.4324V10.4324L10.0533 12.4322L10.0766 11.4324ZM8.29906 1.68494L8.81878 0.830605L8.81864 0.83052L8.29906 1.68494ZM7.69906 1.68494L7.17948 0.83052L7.17934 0.830605L7.69906 1.68494ZM5.89906 2.16744L5.87581 3.16717L5.87779 3.16722L5.89906 2.16744ZM5.37906 2.46744L4.50378 1.98373L4.49928 1.99207L5.37906 2.46744ZM4.06406 3.78244L4.53885 4.66254L4.53943 4.66223L4.06406 3.78244ZM3.76406 4.30244L4.76384 4.28117L4.7638 4.27946L3.76406 4.30244ZM3.28406 6.09994L2.42973 5.58022L2.42964 5.58036L3.28406 6.09994ZM3.28406 6.69994L2.42964 7.21952L2.42973 7.21966L3.28406 6.69994ZM3.76656 8.49994L4.76629 8.52319L4.76634 8.52121L3.76656 8.49994ZM4.06656 9.01994L3.58285 9.89522L3.59119 9.89973L4.06656 9.01994ZM5.38406 10.3374L6.26416 9.86265L6.26385 9.86207L5.38406 10.3374ZM5.90406 10.6374L5.88279 9.63767L5.88108 9.63771L5.90406 10.6374ZM7.70406 11.1199L8.22365 10.2655L8.22064 10.2637L7.70406 11.1199ZM8.30406 11.1199L8.82364 11.9744L8.82378 11.9743L8.30406 11.1199ZM10.1041 10.6374L10.1273 9.63771L10.1253 9.63767L10.1041 10.6374ZM10.6241 10.3374L11.4993 10.8211L11.5022 10.8158L10.6241 10.3374ZM11.9416 9.01994L11.4668 8.13984L11.4662 8.14015L11.9416 9.01994ZM12.2416 8.49994L11.2418 8.52121L11.2418 8.52292L12.2416 8.49994ZM12.7241 6.69994L11.8696 6.18036L11.8678 6.18337L12.7241 6.69994ZM12.7241 6.09994L13.5785 5.58036L13.5784 5.58022L12.7241 6.09994ZM12.2416 4.29994L11.2418 4.27669L11.2418 4.27867L12.2416 4.29994ZM11.9416 3.77994L12.4253 2.90468L12.4199 2.90177L11.9416 3.77994ZM10.6166 2.46494L9.73646 2.93973L9.73678 2.94031L10.6166 2.46494ZM10.0966 2.16494L10.1178 3.16472L10.1195 3.16468L10.0966 2.16494ZM7.28406 0.999941L7.80355 1.85442C7.9244 1.78095 8.07623 1.78095 8.19708 1.85442L8.71656 0.999941L9.23605 0.145462C8.4769 -0.316065 7.52373 -0.316065 6.76458 0.145462L7.28406 0.999941ZM8.71656 0.999941L8.19738 1.8546C8.50299 2.04025 8.78941 2.18461 9.11207 2.26952L9.36656 1.30244L9.62106 0.335367C9.56372 0.320277 9.46514 0.28463 9.23575 0.14528L8.71656 0.999941ZM9.36656 1.30244L9.11207 2.26952C9.42571 2.35205 9.74049 2.37342 10.1056 2.36465L10.0816 1.36494L10.0576 0.365229C9.79764 0.371468 9.68742 0.352831 9.62106 0.335367L9.36656 1.30244ZM10.0816 1.36494L10.1058 2.36465C10.2442 2.36129 10.3762 2.4361 10.4453 2.56186L11.3216 2.07994L12.1978 1.59802C11.7719 0.823787 10.9489 0.343594 10.0573 0.365236L10.0816 1.36494ZM11.3216 2.07994L10.4455 2.56217C10.6175 2.87453 10.7929 3.14054 11.027 3.37455L11.7341 2.66744L12.4412 1.96033C12.3952 1.91434 12.3257 1.83035 12.1976 1.59771L11.3216 2.07994ZM11.7341 2.66744L11.027 3.37455C11.2593 3.60693 11.5216 3.78269 11.8427 3.95784L12.3216 3.07994L12.8004 2.20205C12.5715 2.07719 12.4888 2.00796 12.4412 1.96033L11.7341 2.66744ZM12.3216 3.07994L11.8417 3.95728C11.9657 4.02511 12.0403 4.15463 12.0369 4.29568L13.0366 4.31994L14.0363 4.34421C14.0578 3.45525 13.5824 2.62977 12.8014 2.2026L12.3216 3.07994ZM13.0366 4.31994L12.0368 4.29595C12.028 4.66286 12.0498 4.97312 12.1312 5.28634L13.0991 5.03494L14.0669 4.78354C14.0483 4.71176 14.0301 4.60202 14.0363 4.34393L13.0366 4.31994ZM13.0991 5.03494L12.1312 5.28634C12.2167 5.61542 12.363 5.90148 12.5469 6.20413L13.4016 5.68494L14.2562 5.16575C14.1151 4.93341 14.0815 4.83947 14.0669 4.78354L13.0991 5.03494ZM13.4016 5.68494L12.5471 6.20443C12.6206 6.32528 12.6206 6.4771 12.5471 6.59796L13.4016 7.11744L14.256 7.63693C14.7176 6.87778 14.7176 5.9246 14.256 5.16546L13.4016 5.68494ZM13.4016 7.11744L12.5469 6.59826C12.3612 6.90387 12.2169 7.19029 12.132 7.51295L13.0991 7.76744L14.0661 8.02193C14.0812 7.96459 14.1169 7.86602 14.2562 7.63663L13.4016 7.11744ZM13.0991 7.76744L12.132 7.51295C12.0495 7.82658 12.0281 8.14137 12.0368 8.50643L13.0366 8.48244L14.0363 8.45845C14.03 8.19851 14.0487 8.0883 14.0661 8.02193L13.0991 7.76744ZM13.0366 8.48244L12.0369 8.50671C12.0402 8.64507 11.9654 8.77705 11.8396 8.84623L12.3216 9.72244L12.8035 10.5987C13.5777 10.1728 14.0579 9.34981 14.0363 8.45818L13.0366 8.48244ZM12.3216 9.72244L11.8393 8.8464C11.527 9.01834 11.261 9.19383 11.027 9.42783L11.7341 10.1349L12.4412 10.842C12.4872 10.7961 12.5712 10.7265 12.8038 10.5985L12.3216 9.72244ZM11.7341 10.1349L11.027 9.42783C10.7946 9.66021 10.6188 9.92249 10.4437 10.2436L11.3216 10.7224L12.1995 11.2013C12.3243 10.9724 12.3935 10.8897 12.4412 10.842L11.7341 10.1349ZM11.3216 10.7224L10.4411 10.2483C10.4356 10.2585 10.4277 10.2712 10.4141 10.2886L11.2016 10.9049L11.9891 11.5212C12.0655 11.4236 12.1375 11.3164 12.202 11.1965L11.3216 10.7224ZM11.2016 10.9049H10.2016V14.8049H11.2016H12.2016V10.9049H11.2016ZM11.2016 14.8049H10.2016C10.2016 14.6022 10.304 14.4165 10.4669 14.3079L11.0216 15.1399L11.5763 15.972C11.9642 15.7134 12.2016 15.2777 12.2016 14.8049H11.2016ZM11.0216 15.1399L10.4669 14.3079C10.6361 14.1951 10.8505 14.1755 11.038 14.2558L10.6441 15.1749L10.2501 16.0941C10.6826 16.2794 11.182 16.2348 11.5763 15.972L11.0216 15.1399ZM10.6441 15.1749L11.0399 14.2566L8.39487 13.1166L7.99906 14.0349L7.60326 14.9533L10.2483 16.0933L10.6441 15.1749ZM7.99906 14.0349L7.60514 13.1158L4.96264 14.2483L5.35656 15.1674L5.75048 16.0866L8.39298 14.9541L7.99906 14.0349ZM5.35656 15.1674L4.96264 14.2483C5.15011 14.168 5.3645 14.1876 5.53376 14.3004L4.97906 15.1324L4.42436 15.9645C4.81862 16.2273 5.31801 16.2719 5.75048 16.0866L5.35656 15.1674ZM4.97906 15.1324L5.53376 14.3004C5.69086 14.4051 5.79906 14.5904 5.79906 14.7999H4.79906H3.79906C3.79906 15.2795 4.04227 15.7098 4.42436 15.9645L4.97906 15.1324ZM4.79906 14.7999H5.79906V10.8999H4.79906H3.79906V14.7999H4.79906ZM4.79906 10.8999L5.58657 10.2836C5.57295 10.2662 5.56501 10.2535 5.55953 10.2433L4.67906 10.7174L3.79859 11.1915C3.86311 11.3114 3.93517 11.4186 4.01156 11.5162L4.79906 10.8999ZM4.67906 10.7174L5.55511 10.2352C5.38317 9.92285 5.20768 9.65684 4.97367 9.42284L4.26656 10.1299L3.55946 10.837C3.60545 10.883 3.67496 10.967 3.80302 11.1997L4.67906 10.7174ZM4.26656 10.1299L4.97367 9.42284C4.74129 9.19046 4.47902 9.01469 4.15791 8.83955L3.67906 9.71744L3.20021 10.5953C3.42911 10.7202 3.51183 10.7894 3.55946 10.837L4.26656 10.1299ZM3.67906 9.71744L4.15893 8.8401C4.03492 8.77227 3.96034 8.64275 3.96377 8.50171L2.96406 8.47744L1.96436 8.45318C1.94278 9.34213 2.4182 10.1676 3.19919 10.5948L3.67906 9.71744ZM2.96406 8.47744L3.96377 8.50143C3.97258 8.13452 3.9508 7.82426 3.86945 7.51104L2.90156 7.76244L1.93368 8.01384C1.95232 8.08562 1.97054 8.19536 1.96435 8.45345L2.96406 8.47744ZM2.90156 7.76244L3.86945 7.51104C3.78397 7.18197 3.63758 6.8959 3.45372 6.59325L2.59906 7.11244L1.7444 7.63163C1.88555 7.86398 1.91915 7.95792 1.93368 8.01384L2.90156 7.76244ZM2.59906 7.11244L3.45354 6.59296C3.38007 6.4721 3.38007 6.32028 3.45354 6.19943L2.59906 5.67994L1.74458 5.16046C1.28306 5.9196 1.28306 6.87278 1.74458 7.63193L2.59906 7.11244ZM2.59906 5.67994L3.45372 6.19913C3.63937 5.89352 3.78373 5.60709 3.86864 5.28443L2.90156 5.02994L1.93449 4.77545C1.9194 4.83279 1.88375 4.93136 1.7444 5.16075L2.59906 5.67994ZM2.90156 5.02994L3.86864 5.28443C3.95117 4.9708 3.97254 4.65602 3.96377 4.29095L2.96406 4.31494L1.96435 4.33893C1.97059 4.59887 1.95195 4.70908 1.93449 4.77545L2.90156 5.02994ZM2.96406 4.31494L3.96377 4.29068C3.96041 4.15231 4.03522 4.02033 4.16098 3.95116L3.67906 3.07494L3.19714 2.19873C2.42291 2.62456 1.94272 3.44757 1.96436 4.33921L2.96406 4.31494ZM3.67906 3.07494L4.16129 3.95099C4.47365 3.77904 4.73966 3.60356 4.97367 3.36955L4.26656 2.66244L3.55946 1.95533C3.51346 2.00133 3.42947 2.07084 3.19684 2.1989L3.67906 3.07494ZM4.26656 2.66244L4.97367 3.36955C5.2005 3.14272 5.37589 2.89025 5.55511 2.56467L4.67906 2.08244L3.80302 1.60021C3.68223 1.81963 3.61262 1.90217 3.55946 1.95533L4.26656 2.66244ZM4.67906 2.08244L5.5564 2.56231C5.62423 2.4383 5.75375 2.36372 5.8948 2.36715L5.91906 1.36744L5.94333 0.367736C5.05437 0.346159 4.22889 0.821584 3.80172 1.60257L4.67906 2.08244ZM5.91906 1.36744L5.89507 2.36715C6.26198 2.37596 6.57224 2.35418 6.88546 2.27283L6.63406 1.30494L6.38266 0.337058C6.31089 0.355701 6.20114 0.373923 5.94306 0.367729L5.91906 1.36744ZM6.63406 1.30494L6.88546 2.27283C7.21454 2.18735 7.5006 2.04095 7.80325 1.8571L7.28406 1.00244L6.76488 0.14778C6.53252 0.288928 6.43859 0.322533 6.38266 0.337058L6.63406 1.30494ZM7.28406 1.00244H8.28406V0.999941H7.28406H6.28406V1.00244H7.28406ZM10.0791 11.4324L10.1031 10.4327C9.73614 10.4239 9.42589 10.4457 9.11266 10.5271L9.36406 11.4949L9.61546 12.4628C9.68724 12.4442 9.79698 12.426 10.0551 12.4322L10.0791 11.4324ZM9.36406 11.4949L9.11266 10.5271C8.78359 10.6125 8.49752 10.7589 8.19488 10.9428L8.71406 11.7974L9.23325 12.6521C9.4656 12.511 9.55954 12.4774 9.61546 12.4628L9.36406 11.4949ZM8.71406 11.7974L8.19458 10.943C8.07373 11.0164 7.9219 11.0164 7.80105 10.943L7.28156 11.7974L6.76208 12.6519C7.52122 13.1134 8.4744 13.1134 9.23355 12.6519L8.71406 11.7974ZM7.28156 11.7974L7.80075 10.9428C7.49514 10.7571 7.20872 10.6128 6.88606 10.5279L6.63156 11.4949L6.37707 12.462C6.43441 12.4771 6.53298 12.5128 6.76238 12.6521L7.28156 11.7974ZM6.63156 11.4949L6.88606 10.5279C6.57242 10.4453 6.25764 10.424 5.89257 10.4327L5.91656 11.4324L5.94056 12.4322C6.20049 12.4259 6.3107 12.4446 6.37707 12.462L6.63156 11.4949ZM5.91656 11.4324L5.89384 10.4327C5.85891 10.4335 5.83125 10.4301 5.81097 10.4257L5.59656 11.4024L5.38216 12.3792C5.56688 12.4197 5.75422 12.4364 5.93928 12.4322L5.91656 11.4324ZM5.59656 11.4024H4.59656V14.1924H5.59656H6.59656V11.4024H5.59656ZM5.59656 14.1924L5.99011 15.1117L8.23261 14.1517L7.83906 13.2324L7.44551 12.3131L5.20301 13.2731L5.59656 14.1924ZM7.83906 13.2324L8.2302 14.1528C8.08026 14.2165 7.91286 14.2165 7.76292 14.1528L8.15406 13.2324L8.5452 12.3121C8.19526 12.1634 7.79786 12.1634 7.44792 12.3121L7.83906 13.2324ZM8.15406 13.2324L7.76051 14.1517L10.003 15.1117L10.3966 14.1924L10.7901 13.2731L8.54761 12.3131L8.15406 13.2324ZM10.3966 14.1924H11.3966V11.4024H10.3966H9.39656V14.1924H10.3966ZM10.3966 11.4024L10.187 10.4246C10.1593 10.4306 10.13 10.4334 10.0998 10.4327L10.0766 11.4324L10.0533 12.4322C10.2382 12.4365 10.4238 12.4193 10.6061 12.3802L10.3966 11.4024ZM10.0766 11.4324V12.4324H10.0791V11.4324V10.4324H10.0766V11.4324ZM8.29906 1.68494L8.81864 0.83052C8.31445 0.523915 7.68368 0.523915 7.17948 0.83052L7.69906 1.68494L8.21864 2.53936C8.08445 2.62097 7.91368 2.62097 7.77948 2.53936L8.29906 1.68494ZM7.69906 1.68494L7.17934 0.830605C6.92477 0.985472 6.74581 1.06622 6.57525 1.11287L6.83906 2.07744L7.10288 3.04201C7.51732 2.92866 7.87336 2.74941 8.21878 2.53928L7.69906 1.68494ZM6.83906 2.07744L6.57525 1.11287C6.41658 1.15626 6.23114 1.17428 5.92033 1.16767L5.89906 2.16744L5.87779 3.16722C6.27198 3.1756 6.67654 3.15862 7.10288 3.04201L6.83906 2.07744ZM5.89906 2.16744L5.92231 1.16771C5.33271 1.154 4.78774 1.46999 4.50382 1.98376L5.37906 2.46744L6.2543 2.95113C6.18038 3.08489 6.03541 3.17088 5.87581 3.16717L5.89906 2.16744ZM5.37906 2.46744L4.49928 1.99207C4.3604 2.2491 4.2455 2.40784 4.12033 2.53448L4.83156 3.23744L5.54279 3.9404C5.84263 3.63704 6.06273 3.30578 6.25885 2.94281L5.37906 2.46744ZM4.83156 3.23744L4.12033 2.53448C4.0054 2.65077 3.85584 2.75831 3.58869 2.90265L4.06406 3.78244L4.53943 4.66223C4.89229 4.47157 5.23273 4.25411 5.54279 3.9404L4.83156 3.23744ZM4.06406 3.78244L3.58927 2.90234C3.06345 3.18601 2.75082 3.73791 2.76433 4.32542L3.76406 4.30244L4.7638 4.27946C4.7673 4.43197 4.68467 4.58387 4.53885 4.66254L4.06406 3.78244ZM3.76406 4.30244L2.76429 4.32371C2.77075 4.62738 2.7517 4.8192 2.70742 4.98632L3.67406 5.24244L4.64071 5.49856C4.75143 5.08068 4.77238 4.6825 4.76384 4.28117L3.76406 4.30244ZM3.67406 5.24244L2.70742 4.98632C2.66407 5.14992 2.5864 5.32267 2.42973 5.58022L3.28406 6.09994L4.1384 6.61966C4.34672 6.27721 4.52905 5.91996 4.64071 5.49856L3.67406 5.24244ZM3.28406 6.09994L2.42964 5.58036C2.12304 6.08456 2.12304 6.71533 2.42964 7.21952L3.28406 6.69994L4.13848 6.18036C4.22009 6.31456 4.22009 6.48533 4.13848 6.61952L3.28406 6.09994ZM3.28406 6.69994L2.42973 7.21966C2.58459 7.47424 2.66534 7.6532 2.71199 7.82376L3.67656 7.55994L4.64114 7.29613C4.52778 6.88169 4.34853 6.52564 4.1384 6.18022L3.28406 6.69994ZM3.67656 7.55994L2.71199 7.82376C2.75538 7.98242 2.7734 8.16786 2.76679 8.47867L3.76656 8.49994L4.76634 8.52121C4.77472 8.12702 4.75774 7.72246 4.64114 7.29613L3.67656 7.55994ZM3.76656 8.49994L2.76683 8.47669C2.75312 9.06629 3.06911 9.61126 3.58288 9.89518L4.06656 9.01994L4.55025 8.1447C4.68401 8.21862 4.77 8.36359 4.76629 8.52319L3.76656 8.49994ZM4.06656 9.01994L3.59119 9.89973C3.84822 10.0386 4.00696 10.1535 4.1336 10.2787L4.83656 9.56744L5.53952 8.85621C5.23616 8.55638 4.9049 8.33628 4.54193 8.14015L4.06656 9.01994ZM4.83656 9.56744L4.1336 10.2787C4.25063 10.3943 4.36071 10.5471 4.50428 10.8128L5.38406 10.3374L6.26385 9.86207C6.07242 9.50778 5.85249 9.16554 5.53952 8.85621L4.83656 9.56744ZM5.38406 10.3374L4.50396 10.8122C4.78763 11.3381 5.33953 11.6507 5.92704 11.6372L5.90406 10.6374L5.88108 9.63771C6.03359 9.6342 6.18549 9.71683 6.26416 9.86265L5.38406 10.3374ZM5.90406 10.6374L5.92533 11.6372C6.229 11.6308 6.42082 11.6498 6.58794 11.6941L6.84406 10.7274L7.10018 9.7608C6.6823 9.65008 6.28412 9.62913 5.88279 9.63767L5.90406 10.6374ZM6.84406 10.7274L6.58794 11.6941C6.74817 11.7365 6.91983 11.8147 7.18749 11.9762L7.70406 11.1199L8.22064 10.2637C7.8833 10.0602 7.52496 9.87334 7.10018 9.7608L6.84406 10.7274ZM7.70406 11.1199L7.18448 11.9744C7.68868 12.281 8.31945 12.281 8.82364 11.9744L8.30406 11.1199L7.78448 10.2655C7.91868 10.1839 8.08945 10.1839 8.22364 10.2655L7.70406 11.1199ZM8.30406 11.1199L8.82378 11.9743C9.07836 11.8194 9.25732 11.7387 9.42788 11.692L9.16406 10.7274L8.90025 9.76287C8.48581 9.87622 8.12977 10.0555 7.78434 10.2656L8.30406 11.1199ZM9.16406 10.7274L9.42788 11.692C9.58654 11.6486 9.77198 11.6306 10.0828 11.6372L10.1041 10.6374L10.1253 9.63767C9.73114 9.62928 9.32658 9.64626 8.90025 9.76287L9.16406 10.7274ZM10.1041 10.6374L10.0808 11.6372C10.6704 11.6509 11.2154 11.3349 11.4993 10.8211L10.6241 10.3374L9.74882 9.85375C9.82274 9.71999 9.96771 9.634 10.1273 9.63771L10.1041 10.6374ZM10.6241 10.3374L11.5022 10.8158C11.6437 10.5562 11.759 10.3956 11.8828 10.2704L11.1716 9.56744L10.4603 8.86448C10.1591 9.16925 9.93947 9.50371 9.74589 9.85909L10.6241 10.3374ZM11.1716 9.56744L11.8828 10.2704C11.9985 10.1534 12.1512 10.0433 12.4169 9.89973L11.9416 9.01994L11.4662 8.14015C11.1119 8.33159 10.7697 8.55151 10.4603 8.86448L11.1716 9.56744ZM11.9416 9.01994L12.4164 9.90004C12.9422 9.61637 13.2548 9.06447 13.2413 8.47696L12.2416 8.49994L11.2418 8.52292C11.2383 8.37041 11.321 8.21851 11.4668 8.13984L11.9416 9.01994ZM12.2416 8.49994L13.2413 8.47867C13.2349 8.175 13.2539 7.98318 13.2982 7.81606L12.3316 7.55994L11.3649 7.30382C11.2542 7.7217 11.2332 8.11988 11.2418 8.52121L12.2416 8.49994ZM12.3316 7.55994L13.2982 7.81606C13.3407 7.65584 13.4188 7.48418 13.5803 7.21652L12.7241 6.69994L11.8678 6.18337C11.6643 6.52071 11.4775 6.87905 11.3649 7.30382L12.3316 7.55994ZM12.7241 6.69994L13.5785 7.21952C13.8851 6.71533 13.8851 6.08456 13.5785 5.58036L12.7241 6.09994L11.8696 6.61952C11.788 6.48533 11.788 6.31456 11.8696 6.18036L12.7241 6.69994ZM12.7241 6.09994L13.5784 5.58022C13.4235 5.32564 13.3428 5.14669 13.2961 4.97613L12.3316 5.23994L11.367 5.50376C11.4803 5.9182 11.6596 6.27424 11.8697 6.61966L12.7241 6.09994ZM12.3316 5.23994L13.2961 4.97613C13.2527 4.81746 13.2347 4.63202 13.2413 4.32121L12.2416 4.29994L11.2418 4.27867C11.2334 4.67286 11.2504 5.07742 11.367 5.50376L12.3316 5.23994ZM12.2416 4.29994L13.2413 4.32319C13.255 3.73359 12.939 3.18862 12.4252 2.9047L11.9416 3.77994L11.4579 4.65518C11.3241 4.58126 11.2381 4.43629 11.2418 4.27669L12.2416 4.29994ZM11.9416 3.77994L12.4199 2.90177C12.1603 2.76035 11.9998 2.64499 11.8745 2.52121L11.1716 3.23244L10.4686 3.94367C10.7734 4.2449 11.1078 4.46453 11.4632 4.65811L11.9416 3.77994ZM11.1716 3.23244L11.8745 2.52121C11.7479 2.39606 11.6308 2.23832 11.4963 1.98957L10.6166 2.46494L9.73678 2.94031C9.93737 3.31156 10.1652 3.64382 10.4686 3.94367L11.1716 3.23244ZM10.6166 2.46494L11.4967 1.99015C11.213 1.46433 10.6611 1.1517 10.0736 1.16521L10.0966 2.16494L10.1195 3.16468C9.96703 3.16818 9.81513 3.08555 9.73646 2.93973L10.6166 2.46494ZM10.0966 2.16494L10.0753 1.16517C9.77162 1.17163 9.5798 1.15258 9.41268 1.1083L9.15656 2.07494L8.90044 3.04159C9.31832 3.15231 9.7165 3.17325 10.1178 3.16472L10.0966 2.16494ZM9.15656 2.07494L9.41268 1.1083C9.24908 1.06495 9.07633 0.987282 8.81878 0.830605L8.29906 1.68494L7.77934 2.53928C8.12179 2.7476 8.47904 2.92993 8.90044 3.04159L9.15656 2.07494ZM5.99906 6.39994H4.99906C4.99906 8.05723 6.34178 9.39994 7.99906 9.39994V8.39994V7.39994C7.44635 7.39994 6.99906 6.95266 6.99906 6.39994H5.99906ZM7.99906 8.39994V9.39994C9.65635 9.39994 10.9991 8.05723 10.9991 6.39994H9.99906H8.99906C8.99906 6.95266 8.55178 7.39994 7.99906 7.39994V8.39994ZM9.99906 6.39994H10.9991C10.9991 4.74266 9.65635 3.39994 7.99906 3.39994V4.39994V5.39994C8.55178 5.39994 8.99906 5.84723 8.99906 6.39994H9.99906ZM7.99906 4.39994V3.39994C6.34178 3.39994 4.99906 4.74266 4.99906 6.39994H5.99906H6.99906C6.99906 5.84723 7.44635 5.39994 7.99906 5.39994V4.39994ZM7.99906 9.19994V8.19994C7.00385 8.19994 6.19906 7.39516 6.19906 6.39994H5.19906H4.19906C4.19906 8.49973 5.89928 10.1999 7.99906 10.1999V9.19994ZM5.19906 6.39994H6.19906C6.19906 5.40473 7.00385 4.59994 7.99906 4.59994V3.59994V2.59994C5.89928 2.59994 4.19906 4.30016 4.19906 6.39994H5.19906ZM7.99906 3.59994V4.59994C8.99428 4.59994 9.79906 5.40473 9.79906 6.39994H10.7991H11.7991C11.7991 4.30016 10.0988 2.59994 7.99906 2.59994V3.59994ZM10.7991 6.39994H9.79906C9.79906 7.39516 8.99428 8.19994 7.99906 8.19994V9.19994V10.1999C10.0988 10.1999 11.7991 8.49973 11.7991 6.39994H10.7991Z" fill="#FF6600" mask="url(#path-1-inside-1_3106_3781)"/>
                      </svg>
                      <span className="font-Roboto text-LightGray font-medium text-[12px] leading-[12px] tracking-[0.36px] uppercase">
                         TOP RATED
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <mask id="path-1-inside-1_3106_3786" fill="white">
                          <path d="M8.4 3.2C8.4 2.98 8.22 2.8 8 2.8C7.78 2.8 7.6 2.98 7.6 3.2C7.6 3.42 7.78 3.6 8 3.6C8.22 3.6 8.4 3.42 8.4 3.2ZM8.0525 4.4C8.0175 4.4025 7.9825 4.4025 7.95 4.4L5.9325 7.4225C5.82 7.59 5.6 7.6475 5.42 7.5575L2.93 6.3125L3.7575 11.0075C3.8575 11.58 4.3575 12 4.94 12H11.055C11.6375 12 12.135 11.5825 12.2375 11.0075L13.065 6.3125L10.575 7.5575C10.395 7.6475 10.175 7.59 10.0625 7.4225L8.0525 4.4ZM7.1925 4.0875C6.95 3.8675 6.8 3.55 6.8 3.2C6.8 2.5375 7.3375 2 8 2C8.6625 2 9.2 2.5375 9.2 3.2C9.2 3.5525 9.0475 3.87 8.8075 4.0875L10.5375 6.6825L12.675 5.615C12.6275 5.485 12.6 5.345 12.6 5.2C12.6 4.5375 13.1375 4 13.8 4C14.4625 4 15 4.5375 15 5.2C15 5.84 14.4975 6.365 13.865 6.3975L13.0275 11.1475C12.86 12.1025 12.0275 12.8 11.0575 12.8H4.9425C3.9725 12.8 3.1425 12.1025 2.9725 11.1475L2.135 6.3975C1.5025 6.365 1 5.84 1 5.2C1 4.5375 1.5375 4 2.2 4C2.8625 4 3.4 4.5375 3.4 5.2C3.4 5.345 3.375 5.485 3.325 5.615L5.4625 6.6825L7.1925 4.0875ZM2.6 5.2C2.6 4.98 2.42 4.8 2.2 4.8C1.98 4.8 1.8 4.98 1.8 5.2C1.8 5.42 1.98 5.6 2.2 5.6C2.42 5.6 2.6 5.42 2.6 5.2ZM13.8 5.6C14.02 5.6 14.2 5.42 14.2 5.2C14.2 4.98 14.02 4.8 13.8 4.8C13.58 4.8 13.4 4.98 13.4 5.2C13.4 5.42 13.58 5.6 13.8 5.6Z"/>
                        </mask>
                        <path d="M8.4 3.2C8.4 2.98 8.22 2.8 8 2.8C7.78 2.8 7.6 2.98 7.6 3.2C7.6 3.42 7.78 3.6 8 3.6C8.22 3.6 8.4 3.42 8.4 3.2ZM8.0525 4.4C8.0175 4.4025 7.9825 4.4025 7.95 4.4L5.9325 7.4225C5.82 7.59 5.6 7.6475 5.42 7.5575L2.93 6.3125L3.7575 11.0075C3.8575 11.58 4.3575 12 4.94 12H11.055C11.6375 12 12.135 11.5825 12.2375 11.0075L13.065 6.3125L10.575 7.5575C10.395 7.6475 10.175 7.59 10.0625 7.4225L8.0525 4.4ZM7.1925 4.0875C6.95 3.8675 6.8 3.55 6.8 3.2C6.8 2.5375 7.3375 2 8 2C8.6625 2 9.2 2.5375 9.2 3.2C9.2 3.5525 9.0475 3.87 8.8075 4.0875L10.5375 6.6825L12.675 5.615C12.6275 5.485 12.6 5.345 12.6 5.2C12.6 4.5375 13.1375 4 13.8 4C14.4625 4 15 4.5375 15 5.2C15 5.84 14.4975 6.365 13.865 6.3975L13.0275 11.1475C12.86 12.1025 12.0275 12.8 11.0575 12.8H4.9425C3.9725 12.8 3.1425 12.1025 2.9725 11.1475L2.135 6.3975C1.5025 6.365 1 5.84 1 5.2C1 4.5375 1.5375 4 2.2 4C2.8625 4 3.4 4.5375 3.4 5.2C3.4 5.345 3.375 5.485 3.325 5.615L5.4625 6.6825L7.1925 4.0875ZM2.6 5.2C2.6 4.98 2.42 4.8 2.2 4.8C1.98 4.8 1.8 4.98 1.8 5.2C1.8 5.42 1.98 5.6 2.2 5.6C2.42 5.6 2.6 5.42 2.6 5.2ZM13.8 5.6C14.02 5.6 14.2 5.42 14.2 5.2C14.2 4.98 14.02 4.8 13.8 4.8C13.58 4.8 13.4 4.98 13.4 5.2C13.4 5.42 13.58 5.6 13.8 5.6Z" fill="#091019"/>
                        <path d="M8.0525 4.4L9.13499 3.68013L8.7155 3.04933L7.95988 3.1033L8.0525 4.4ZM7.95 4.4L8.04971 3.10383L7.29113 3.04548L6.86875 3.67827L7.95 4.4ZM5.9325 7.4225L7.01169 8.14733L7.01375 8.14423L5.9325 7.4225ZM5.42 7.5575L6.00138 6.39474L5.42 7.5575ZM2.93 6.3125L3.51138 5.14974L1.20146 3.99479L1.64973 6.53815L2.93 6.3125ZM3.7575 11.0075L5.03811 10.7838L5.03777 10.7819L3.7575 11.0075ZM12.2375 11.0075L13.5173 11.2356L13.5178 11.2331L12.2375 11.0075ZM13.065 6.3125L14.3453 6.53815L14.7935 3.99479L12.4836 5.14974L13.065 6.3125ZM10.0625 7.4225L8.98 8.14238L8.98332 8.14732L10.0625 7.4225ZM7.1925 4.0875L8.27417 4.80861L8.89524 3.877L8.06599 3.12468L7.1925 4.0875ZM8.8075 4.0875L7.93452 3.12422L7.10442 3.8765L7.72583 4.80861L8.8075 4.0875ZM10.5375 6.6825L9.45584 7.40361L10.0921 8.35803L11.1183 7.84553L10.5375 6.6825ZM12.675 5.615L13.2558 6.77803L14.2945 6.25931L13.896 5.16885L12.675 5.615ZM13.865 6.3975L13.7983 5.09921L12.7645 5.15233L12.5847 6.17177L13.865 6.3975ZM13.0275 11.1475L11.7472 10.9218L11.747 10.9229L13.0275 11.1475ZM2.9725 11.1475L1.69225 11.3732L1.69262 11.3753L2.9725 11.1475ZM2.135 6.3975L3.41525 6.17177L3.23551 5.15233L2.20171 5.09921L2.135 6.3975ZM3.325 5.615L2.11165 5.14833L1.68776 6.25044L2.74417 6.77803L3.325 5.615ZM5.4625 6.6825L4.88167 7.84553L5.90788 8.35803L6.54417 7.40361L5.4625 6.6825ZM8.4 3.2H9.7C9.7 2.26203 8.93797 1.5 8 1.5V2.8V4.1C7.50203 4.1 7.1 3.69797 7.1 3.2H8.4ZM8 2.8V1.5C7.06203 1.5 6.3 2.26203 6.3 3.2H7.6H8.9C8.9 3.69797 8.49797 4.1 8 4.1V2.8ZM7.6 3.2H6.3C6.3 4.13797 7.06203 4.9 8 4.9V3.6V2.3C8.49797 2.3 8.9 2.70203 8.9 3.2H7.6ZM8 3.6V4.9C8.93797 4.9 9.7 4.13797 9.7 3.2H8.4H7.1C7.1 2.70203 7.50203 2.3 8 2.3V3.6ZM8.0525 4.4L7.95988 3.1033C7.98409 3.10157 8.01355 3.10105 8.04971 3.10383L7.95 4.4L7.85029 5.69617C7.95145 5.70395 8.05091 5.70343 8.14512 5.6967L8.0525 4.4ZM7.95 4.4L6.86875 3.67827L4.85125 6.70077L5.9325 7.4225L7.01375 8.14423L9.03125 5.12173L7.95 4.4ZM5.9325 7.4225L4.85332 6.69768C5.10653 6.32067 5.59829 6.1932 6.00138 6.39474L5.42 7.5575L4.83862 8.72025C5.60171 9.1018 6.53347 8.85933 7.01168 8.14732L5.9325 7.4225ZM5.42 7.5575L6.00138 6.39474L3.51138 5.14974L2.93 6.3125L2.34862 7.47526L4.83862 8.72026L5.42 7.5575ZM2.93 6.3125L1.64973 6.53815L2.47723 11.2331L3.7575 11.0075L5.03777 10.7819L4.21027 6.08685L2.93 6.3125ZM3.7575 11.0075L2.47689 11.2312C2.68579 12.4272 3.72708 13.3 4.94 13.3V12V10.7C4.98792 10.7 5.02921 10.7328 5.03811 10.7838L3.7575 11.0075ZM4.94 12V13.3H11.055V12V10.7H4.94V12ZM11.055 12V13.3C12.2698 13.3 13.3047 12.4285 13.5173 11.2356L12.2375 11.0075L10.9577 10.7794C10.9653 10.7365 11.0052 10.7 11.055 10.7V12ZM12.2375 11.0075L13.5178 11.2331L14.3453 6.53815L13.065 6.3125L11.7847 6.08685L10.9572 10.7819L12.2375 11.0075ZM13.065 6.3125L12.4836 5.14974L9.99362 6.39474L10.575 7.5575L11.1564 8.72025L13.6464 7.47526L13.065 6.3125ZM10.575 7.5575L9.99362 6.39474C10.3967 6.1932 10.8885 6.32067 11.1417 6.69768L10.0625 7.4225L8.98332 8.14732C9.46153 8.85933 10.3933 9.1018 11.1564 8.72025L10.575 7.5575ZM10.0625 7.4225L11.145 6.70263L9.13499 3.68013L8.0525 4.4L6.97001 5.11987L8.98001 8.14237L10.0625 7.4225ZM7.1925 4.0875L8.06599 3.12468C8.08659 3.14337 8.1 3.17193 8.1 3.2H6.8H5.5C5.5 3.92807 5.81341 4.59163 6.31901 5.05032L7.1925 4.0875ZM6.8 3.2H8.1C8.1 3.25547 8.05547 3.3 8 3.3V2V0.7C6.61953 0.7 5.5 1.81953 5.5 3.2H6.8ZM8 2V3.3C7.94453 3.3 7.9 3.25547 7.9 3.2H9.2H10.5C10.5 1.81953 9.38047 0.7 8 0.7V2ZM9.2 3.2H7.9C7.9 3.17146 7.9132 3.14354 7.93452 3.12422L8.8075 4.0875L9.68048 5.05078C10.1818 4.59646 10.5 3.93354 10.5 3.2H9.2ZM8.8075 4.0875L7.72583 4.80861L9.45584 7.40361L10.5375 6.6825L11.6192 5.96139L9.88916 3.36639L8.8075 4.0875ZM10.5375 6.6825L11.1183 7.84553L13.2558 6.77803L12.675 5.615L12.0942 4.45197L9.95667 5.51947L10.5375 6.6825ZM12.675 5.615L13.896 5.16885C13.8962 5.16919 13.9 5.17994 13.9 5.2H12.6H11.3C11.3 5.51006 11.3588 5.80081 11.454 6.06115L12.675 5.615ZM12.6 5.2H13.9C13.9 5.25547 13.8555 5.3 13.8 5.3V4V2.7C12.4195 2.7 11.3 3.81953 11.3 5.2H12.6ZM13.8 4V5.3C13.7445 5.3 13.7 5.25547 13.7 5.2H15H16.3C16.3 3.81953 15.1805 2.7 13.8 2.7V4ZM15 5.2H13.7C13.7 5.14705 13.7406 5.10218 13.7983 5.09921L13.865 6.3975L13.9317 7.69579C15.2544 7.62782 16.3 6.53295 16.3 5.2H15ZM13.865 6.3975L12.5847 6.17177L11.7472 10.9218L13.0275 11.1475L14.3078 11.3732L15.1453 6.62323L13.865 6.3975ZM13.0275 11.1475L11.747 10.9229C11.6889 11.2543 11.3979 11.5 11.0575 11.5V12.8V14.1C12.6571 14.1 14.0311 12.9507 14.308 11.3721L13.0275 11.1475ZM11.0575 12.8V11.5H4.9425V12.8V14.1H11.0575V12.8ZM4.9425 12.8V11.5C4.60467 11.5 4.31232 11.2564 4.25238 10.9197L2.9725 11.1475L1.69262 11.3753C1.97268 12.9486 3.34033 14.1 4.9425 14.1V12.8ZM2.9725 11.1475L4.25275 10.9218L3.41525 6.17177L2.135 6.3975L0.854748 6.62323L1.69225 11.3732L2.9725 11.1475ZM2.135 6.3975L2.20171 5.09921C2.25944 5.10218 2.3 5.14706 2.3 5.2H1H-0.3C-0.3 6.53294 0.745559 7.62782 2.06829 7.69579L2.135 6.3975ZM1 5.2H2.3C2.3 5.25547 2.25547 5.3 2.2 5.3V4V2.7C0.81953 2.7 -0.3 3.81953 -0.3 5.2H1ZM2.2 4V5.3C2.14453 5.3 2.1 5.25547 2.1 5.2H3.4H4.7C4.7 3.81953 3.58047 2.7 2.2 2.7V4ZM3.4 5.2H2.1C2.1 5.19496 2.10105 5.17588 2.11165 5.14833L3.325 5.615L4.53835 6.08167C4.64895 5.79412 4.7 5.49504 4.7 5.2H3.4ZM3.325 5.615L2.74417 6.77803L4.88167 7.84553L5.4625 6.6825L6.04333 5.51947L3.90583 4.45197L3.325 5.615ZM5.4625 6.6825L6.54417 7.40361L8.27417 4.80861L7.1925 4.0875L6.11084 3.36639L4.38083 5.96139L5.4625 6.6825ZM2.6 5.2H3.9C3.9 4.26203 3.13797 3.5 2.2 3.5V4.8V6.1C1.70203 6.1 1.3 5.69797 1.3 5.2H2.6ZM2.2 4.8V3.5C1.26203 3.5 0.5 4.26203 0.5 5.2H1.8H3.1C3.1 5.69797 2.69797 6.1 2.2 6.1V4.8ZM1.8 5.2H0.5C0.5 6.13797 1.26203 6.9 2.2 6.9V5.6V4.3C2.69797 4.3 3.1 4.70203 3.1 5.2H1.8ZM2.2 5.6V6.9C3.13797 6.9 3.9 6.13797 3.9 5.2H2.6H1.3C1.3 4.70203 1.70203 4.3 2.2 4.3V5.6ZM13.8 5.6V6.9C14.738 6.9 15.5 6.13797 15.5 5.2H14.2H12.9C12.9 4.70203 13.302 4.3 13.8 4.3V5.6ZM14.2 5.2H15.5C15.5 4.26203 14.738 3.5 13.8 3.5V4.8V6.1C13.302 6.1 12.9 5.69797 12.9 5.2H14.2ZM13.8 4.8V3.5C12.862 3.5 12.1 4.26203 12.1 5.2H13.4H14.7C14.7 5.69797 14.298 6.1 13.8 6.1V4.8ZM13.4 5.2H12.1C12.1 6.13797 12.862 6.9 13.8 6.9V5.6V4.3C14.298 4.3 14.7 4.70203 14.7 5.2H13.4Z" fill="#4093FF" mask="url(#path-1-inside-1_3106_3786)"/>
                      </svg>
                      <span className="font-Roboto text-LightGray font-medium text-[12px] leading-[12px] tracking-[0.36px] uppercase">
                        PREMIUM ADDRESS
                      </span>
                    </div>
                   
                  </div>
                 
                </div>
                      <div className="flex items-start md:items-center flex-row gap-3 pb-2">
                       <h2 className="font-Roboto text-PrimaryBlack font-semibold text-[20px] leading-[28px] tracking-[-0.3px]">{loc.displayName}</h2>
                        <span className="border border-[rgba(116,160,56,0.3)] bg-[rgba(85,128,25,0.08)] px-2 py-1 tpx-2 py-1 rounded-[8px] font-Roboto text-[#558019] font-normal text-[12px] leading-[18px] tracking-[0px] min-w-[67px]">
                        0.2 miles
                        </span>
                      </div> 
                      <p className="font-Roboto text-PrimaryBlack font-normal text-[14px] leading-[21px] tracking-[0px]">
                        {loc.addressLine1}, {loc.city}, {loc.stateCode}{' '}
                        {loc.postalCode}
                      </p>
                  </div> 
                  {/* Price Row */}
                  <div className="hidden md:flex flex-col gap-[2px]">
                    <p className="font-Roboto text-[#4B5563] font-normal text-[14px] leading-[21px] tracking-[0px]">Starting from</p>
                    <p className="font-Roboto text-PrimaryBlack font-semibold text-[24px] leading-[31.2px] tracking-[-0.39px]">
                      US${(loc.priceRange || 0.0).toFixed(2)}<span className='font-Roboto text-LightGray font-normal text-[18px] leading-[27px] tracking-[0px]'>/month</span>
                    </p>
                  </div>                 

                </div>

                {/* Feature Icons */}
                <div className="flex flex-col md:flex-row md:justify-between mt-4">
                <div className="flex-wrap gap-4 text-sm text-gray-700">
                  
                  {loc.featureList?.slice(0, 3).map((feature) => (
                    
                    <div
                      key={loc._id + feature.label}
                      className="flex items-center gap-3 font-Roboto text-PrimaryBlack font-normal text-[14px] leading-[21px] tracking-[0px]"
                    >
                      <span className='flex items-center w-[20px] h-[20px]'><Map /> </span> {feature.label}
                    </div>
                  ))}
                  {loc.featureList && loc.featureList.length > 3 && (
                    <span className="">
                      +{loc.featureList.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center flex-wrap gap-3 relative">
                    {/* Show first 3 */}
                    {/* {visibleItems.map((service, idx) => (
                      <div key={idx} className="flex items-center gap-2 font-Roboto text font-normal text-[14px] leading-[21px] tracking-[0px]">
                         <img
                          src={Location}
                          alt="location"
                          className="w-[18px] h-[18px] object-contain"
                        />
                                <span className='font-Roboto text-PrimaryBlack font-normal text-[14px] leading-[21px] tracking-[0px]'>{service.name}</span>
                      </div>
                    ))} */}

                    {/* +N button */}
                    {/* {hiddenItems.length > 0 && (
                      <div className="relative">
                        <button
                          onClick={() => setShowMore(!showMore)}
                          className={`px-[9px] py-1 bg-[#F6F6F6] rounded-full border font-Roboto font-medium text-[12px] leading-[18px] tracking-[0px]
                            ${showMore 
                                ? "text-DarkOrange border-PrimaryBlack" 
                                : "text-PrimaryBlack border-LightWhite"
                              }`}
                        >
                          +{hiddenItems.length}
                        </button> */}

                        {/* Popover */}
                        {/* {showMore && (
                          <div className="absolute left-[-75px] bottom-10 min-w-[184px] bg-PrimaryBlack rounded-[12px] p-4 z-10 flex flex-col gap-3">
                            {hiddenItems.map((service, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm hover:bg-gray-100 rounded-md cursor-pointer">
                                 <img
                                    src={Location}
                                    alt="location"
                                    className="w-[18px] h-[18px] object-contain invert"
                                  />
                                <span className='font-Roboto text-white font-normal text-[14px] leading-[21px] tracking-[0px]'>{service.name}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )} */}
                  </div>

                {/* CTA Button */}
                {/* <button
                  onClick={() =>
                    navigate(`/PDP/virtual-mailbox?locationId=${loc._id}`)
                  }
                  className="hidden md:flex rounded-[100px] font-normal leading-[16px] tracking-[0.08px] text-base text-PrimaryBlack border border-[#091019] px-[23px] py-[13px] transition-all"
                >
                  Select
                </button> */}
                 <button
                onClick={() => {
                  const currentUrlParams = new URLSearchParams(window.location.search);
                  const variantId = currentUrlParams.get("variantId");

                  // Build query string with locationId
                  const queryParams = new URLSearchParams();
                  queryParams.set("locationId", loc._id);

                  if (variantId) {
                    // If variantId exists, add it and redirect to bundle-product
                    queryParams.set("variantId", variantId);
                    navigate(`/PDP/bundle-product?${queryParams.toString()}`);
                  } else {
                    // Otherwise, redirect to virtual-mailbox only with locationId
                    navigate(`/PDP/virtual-mailbox?${queryParams.toString()}`);
                  }
                }}
                className="hidden md:flex rounded-[100px] font-normal leading-[16px] tracking-[0.08px] text-base text-PrimaryBlack border border-[#091019] px-[23px] py-[13px] transition-all"
              >
                Select
           </button>



                </div>
                <div className='flex items-center justify-between md:hidden mt-6'>
                   <div className="flex  flex-col gap-[2px]">
                      <p className="font-Roboto text-[#4B5563] font-normal text-[14px] leading-[21px] tracking-[0px]">Starting from</p>
                      <p className="font-Roboto text-PrimaryBlack font-semibold text-[24px] leading-[31.2px] tracking-[-0.39px]">
                        US${(loc.priceRange || 0.0).toFixed(2)}<span className='font-Roboto text-LightGray font-normal text-[18px] leading-[27px] tracking-[0px]'>/month</span>
                      </p>
                    </div>  
                     <button
                        onClick={() =>
                          navigate(`/PDP/virtual-mailbox?locationId=${loc._id}`)
                        }
                        className="rounded-[100px] font-normal leading-[16px] tracking-[0.08px] text-base text-PrimaryBlack border border-[#091019] px-[23px] py-[13px] transition-all"
                      >
                        Select
                    </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side Map */}
        <div className="w-full lg:w-[47%]">
          <div id="map" className="w-full h-[450px] md:h-[762px] rounded shadow" />
        </div>
      </div>
      </div>

      {/* Filter Popup */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-[12px] border border-LightWhite max-w-[467px] w-full">
           <div className="flex items-center justify-between  mb-6">
            <h2 className="font-Roboto text-PrimaryBlack font-semibold text-[24px] leading-[31.2px] tracking-[-0.36px]">Filters</h2>
            <button
             onClick={() => setShowFilters(false)}
             > <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                  <path d="M19.0227 6.32363C19.2552 6.09113 19.2552 5.70863 19.0227 5.47613C18.7902 5.24363 18.4077 5.24363 18.1752 5.47613L11.9989 11.6524L5.82266 5.47613C5.59016 5.24363 5.20766 5.24363 4.97516 5.47613C4.74266 5.70863 4.74266 6.09113 4.97516 6.32363L11.1514 12.4999L4.97516 18.6761C4.74266 18.9086 4.74266 19.2911 4.97516 19.5236C5.20766 19.7561 5.59016 19.7561 5.82266 19.5236L11.9989 13.3474L18.1752 19.5236C18.4077 19.7561 18.7902 19.7561 19.0227 19.5236C19.2552 19.2911 19.2552 18.9086 19.0227 18.6761L12.8464 12.4999L19.0227 6.32363Z" fill="#091019"/>
                </svg>
            </button>           
           </div> 
            <div className="space-y-4">
              {/* Plan Tier */}
              <div>
                <label className="block font-Roboto text-PrimaryBlack font-normal text-[14px] leading-[21px] tracking-[0px] mb-3">Plan Tier</label>
                <div className='flex relative'>
                <select
                  value={planTier}
                  onChange={(e) => setPlanTier(e.target.value)}
                  className=" relative z-[2] border border-LightWhite bg-transparent px-3 py-[18.5px] rounded-[8px] w-full font-Roboto text-PrimaryBlack font-normal text-[14px] leading-[21px] tracking-[0px] appearance-none"
                >
                  <option value="">All Tiers</option>
                  {uniqueTiers.map((tier) => (
                    <option key={tier} value={tier}>
                      {tier}
                    </option>
                  ))}
                </select>
                <span className='absolute right-[10px] top-[20px] z-[1]'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M9.64531 13.353C9.83906 13.5468 10.1578 13.5468 10.3516 13.353L15.3516 8.35303C15.5453 8.15928 15.5453 7.84053 15.3516 7.64678C15.1578 7.45303 14.8391 7.45303 14.6453 7.64678L9.99844 12.2937L5.35156 7.64678C5.15781 7.45303 4.83906 7.45303 4.64531 7.64678C4.45156 7.84053 4.45156 8.15928 4.64531 8.35303L9.64531 13.353Z" fill="#091019"/>
                  </svg>
                </span>
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block  font-Roboto text-PrimaryBlack font-normal text-[14px] leading-[21px] tracking-[0px]">Price Range / Month</label>
                
              <div className="relative w-full h-3 mt-3 mb-3">
                    {/* Slider Track */}
                    <div className="bg-LightWhite absolute top-1/2 w-full h-[6px] bg-PrmaryBlack rounded-[10px] -translate-y-1/2"></div>

                    {/* Active Range */}
                    <div
                      className="absolute top-1/2 h-[6px] bg-[#0B111A] rounded -translate-y-1/2"
                      style={{
                        left: `${minVal}%`,
                        right: `${100 - maxVal}%`,
                      }}
                    ></div>

                    {/* Left Thumb */}
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={minVal}
                      onChange={(e) => setMinVal(Math.min(Number(e.target.value), maxVal - 1))}
                      className="absolute top-[-5px] w-full appearance-none bg-transparent pointer-events-none"
                    />
                    {/* Right Thumb */}
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={maxVal}
                      onChange={(e) => setMaxVal(Math.max(Number(e.target.value), minVal + 1))}
                      className="absolute top-[-5px] w-full appearance-none bg-transparent pointer-events-none"
                    />

                    {/* Style thumbs */}
                    <style jsx>{`
                      input[type="range"]::-webkit-slider-thumb {
                        pointer-events: auto;
                        -webkit-appearance: none;
                        height: 20px;
                        width: 20px;
                        border-radius: 50%;
                        background: white;
                        border: 3px solid #091019;
                        cursor: pointer;
                        position: relative;
                      }
                      input[type="range"]::-moz-range-thumb {
                        pointer-events: auto;
                        height: 20px;
                        width: 20px;
                        border-radius: 50%;
                        background: white;
                        border: 3px solid #091019;
                        cursor: pointer;
                      }
                    `}</style>
                  </div>

            
                <div className="flex items-center justify-between gap-2 mt-3">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    className="border border-LightWhite w-20 px-3 py-2 rounded-[8px] font-Roboto text-PrimaryBlack font-normal text-[16px] leading-[24px] tracking-[0px]"
                  />
                  {/* <span>—</span> */}
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="border border-LightWhite w-20 px-3 py-2 rounded-[8px] font-Roboto text-PrimaryBlack font-normal text-[16px] leading-[24px] tracking-[0px]"
                  />
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-2">
                {uniqueFeatures.map((feature) => (
           
                  <label
                    key={feature}
                    className="flex items-center gap-2 font-Roboto text-PrimaryBlack font-normal text-[14px] leading-[21px] tracking-[0px] cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFeatures.includes(feature)}
                      onChange={() => toggleFeature(feature)}
                      className="peer hidden"
                    />
                    <span className="w-4 h-4 border border-[#4D4E4F] rounded-[4px] bg-white 
                                    peer-checked:bg-PrimaryBlack flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M3.41823 7.41621C3.67656 7.67871 4.10156 7.67871 4.3599 7.41621L9.69323 2.08288C9.95573 1.82455 9.95573 1.39954 9.69323 1.14121C9.43489 0.878711 9.0099 0.878711 8.75156 1.14121L3.88906 6.00371L1.69323 3.80788C1.4349 3.54538 1.0099 3.54538 0.751563 3.80788C0.489062 4.06621 0.489062 4.49121 0.751563 4.74954L3.41823 7.41621Z" fill="white"/>
                  </svg>
                    </span>
                    {feature}
                  </label>


                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-[93px] flex justify-center gap-4">
              <button
                 onClick={() => {
                  // Clear dropdown + search
                  setSelectedCity("");
                  setSearchCity("");
              
                  // Reset filters
                  setPlanTier("");
                  setMinPrice(Math.min(...locations.map((loc) => loc.priceRange || 0)));
                  setMaxPrice(Math.max(...locations.map((loc) => loc.priceRange || 999)));
                  setSelectedFeatures([]);
              
                  // Optional: reset slider values too
                  setMinVal(0);
                  setMaxVal(100);
                }}
                className="w-1/2 rounded-[100px] font-normal leading-[16px] tracking-[0.08px] text-base text-PrimaryBlack border border-[#091019] px-5 py-[13px] transition-all hover:scale-[1.02] hover:bg-[#F3F3F3]"
              >
                Reset
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="flex items-center justify-center w-1/2 rounded-[100px] bg-[#F60] font-Roboto text-white px-5 py-[13px] font-normal leading-[16px] tracking-[0.08px] text-base flex items-center gap-2 transition-all hover:scale-[1.02] hover:bg-[#DD5827]"
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
