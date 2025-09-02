// app/routes/locations.tsx
import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {useState} from 'react';

type LocationAPI = {
  slocid: number;
  city: string;
  state: string;
  ltitle: string;
  lmprice: string;
  foraddss: string;
  mlat: number;
  mlong: number;
  sdeftext: string; // state/country
};

export async function loader() {
  const res = await fetch(
    'https://qa-location.atmbstage.com/Location/GetLocationPlan'
  );

  if (!res.ok) {
    throw new Response('Failed to fetch locations', {status: res.status});
  }

  const data: LocationAPI[] = await res.json();
  return json({locations: data});
}

export default function LocationsPage() {
  const {locations} = useLoaderData<typeof loader>();
  const [selectedCity, setSelectedCity] = useState<string>('');

  // filter by dropdown
  const filtered = selectedCity
    ? locations.filter((loc) => loc.city === selectedCity)
    : locations;

  const cities = Array.from(new Set(locations.map((loc) => loc.city)));

  return (
    <div className="flex flex-col md:flex-row mt-10 max-w-6xl mx-auto">
      {/* Left Side */}
      <div className="w-full md:w-1/2 p-4">
        <h1 className="text-3xl font-bold mb-4">
          Virtual Mailbox in {filtered[0]?.sdeftext || 'California'}
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

        <p className="text-gray-600 mb-2">
          {filtered.length} locations found
        </p>

        {/* Locations List */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto">
          {filtered.map((loc) => (
            <div
              key={loc.slocid}
              className="border rounded p-4 shadow-sm hover:shadow-md"
            >
              <h2 className="font-semibold text-lg">
                {loc.city} {loc.ltitle}
              </h2>
              <p
                className="text-sm text-gray-600"
                dangerouslySetInnerHTML={{__html: loc.foraddss}}
              />
              <p
                className="font-medium mt-2"
                dangerouslySetInnerHTML={{__html: loc.lmprice}}
              />
              <button className="bg-orange-500 text-white px-4 py-2 rounded mt-2">
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side Map */}
      <div className="w-full md:w-1/2 p-4">
        {/* <iframe
          title="map"
          width="100%"
          height="600"
          style={{border: 0}}
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyA360dg2Scy3OZJnjw32OUEpSD0DoawVkY&q=${
            filtered[0]?.mlat || 34.0522
          },${filtered[0]?.mlong || -118.2437}`}
        ></iframe> */}
        <iframe
  src="https://www.google.com/maps?q=Hollywood,CA&output=embed"
  width="100%"
  height="600"
  style={{border: 0}}
  loading="lazy">
</iframe>
      </div>
    </div>
  );
}
