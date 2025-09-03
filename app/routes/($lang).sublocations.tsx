// app/routes/locations.tsx
import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {useState} from 'react';

type LocationAPI = {
  location_id: string;
  country: string;
  state: string;
  city: string;
  address_line1: string;
  postal_code: string;
  latitude: number;
  longitude: number;
  display_name: string;
};

export async function loader() {
  const res = await fetch(
    'https://development.anytimeapi.com/location/retrieve',
    {
      method: 'POST',
      headers: {
        'API-Version': 'v2',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Ocp-Apim-Subscription-Key': 'd4cf98dbbb7945eab6149a1abe05a341',
        'API-Environment': 'dev',
      },
      body: JSON.stringify({
        id: 'c6bb7f29-df8f-41bf-bf08-d56a5a745588',
        limit: 10,
        offset: 0,
      }),
    }
  );

  if (!res.ok) {
    throw new Response('Failed to fetch locations', {status: res.status});
  }

  const result = await res.json();

  const data: LocationAPI[] = result.data || [];
  return json({locations: data});
}

export default function LocationsPage() {
  const {locations} = useLoaderData<typeof loader>();
  const [selectedCity, setSelectedCity] = useState<string>('');

  // filter by dropdown
  const filtered = selectedCity
    ? locations.filter((loc) => loc.city === selectedCity)
    : locations;

  const cities = Array.from(
    new Set(locations.map((loc) => loc.city).filter(Boolean))
  );

  return (
    <div className="flex flex-col md:flex-row mt-10 max-w-6xl mx-auto">
      {/* Left Side */}
      <div className="w-full md:w-1/2 p-4">
        <h1 className="text-3xl font-bold mb-4">
          Virtual Mailbox in {filtered[0]?.country || 'Unknown'}
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
              key={loc.location_id}
              className="border rounded p-4 shadow-sm hover:shadow-md"
            >
              <h2 className="font-semibold text-lg">
                {loc.city || 'Unknown City'} - {loc.display_name}
              </h2>
              <p className="text-sm text-gray-600">
                {loc.address_line1 || 'No address provided'}
              </p>
              <p className="text-sm text-gray-600">
                {loc.state}, {loc.country} {loc.postal_code}
              </p>
              <button className="bg-orange-500 text-white px-4 py-2 rounded mt-2">
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side Map */}
      <div className="w-full md:w-1/2 p-4">
        <iframe
          title="map"
          width="100%"
          height="600"
          style={{border: 0}}
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyA360dg2Scy3OZJnjw32OUEpSD0DoawVkY&q=${
            filtered[0]?.latitude || 28.4180517
          },${filtered[0]?.longitude || 77.0501229}`}
        ></iframe>
      </div>
    </div>
  );
}
