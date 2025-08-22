// app/routes/locations.tsx

import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import HubSpotForm from './HubSpotForm';

type LocationType = {
  name: string;
  pname: string;
  count: number;
  url: string;
};

export async function loader() {
  return json({
    locations: [
      {
        name: 'Location A',
        pname: 'Country A',
        count: 5,
        url: '/location-a',
      }
    ]  });

}

export default function ContactPage() {
  const {locations} = useLoaderData<typeof loader>();

  return (
    <div className="p-6 max-w-4xl mx-auto mt-20">
        <HubSpotForm />
    </div>
  );
}
