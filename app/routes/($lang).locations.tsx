// app/routes/locations.tsx

import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';

type LocationType = {
  name: string;
  pname: string;
  count: number;
  url: string;
};

export async function loader() {
  const res = await fetch(
    'https://qa-location.atmbstage.com/Location/GetLocationCount?locationPricing=true'
  );

  if (!res.ok) {
    throw new Response('Failed to fetch location count', {status: res.status});
  }

  const data: LocationType[] = await res.json();

  // Filter locations with at least 1 count
  const filtered = data.filter((loc) => loc.count > 0);

  return json({locations: filtered});
}

export default function LocationsPage() {
  const {locations} = useLoaderData<typeof loader>();

  return (
    <div className="p-6 max-w-4xl mx-auto mt-20">
      <h1 className="text-3xl font-bold mb-6">📍 Available Locations</h1>

      <ul className="space-y-4">
        {locations.map((loc) => (
          <li key={loc.url} className="border p-4 rounded shadow hover:shadow-md transition">
           
              {loc.name}
            
            <p className="text-sm text-gray-600">
              {loc.pname ? `Country: ${loc.pname}` : 'Region'} | 📦 {loc.count} locations
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
