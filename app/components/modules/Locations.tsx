import { useState } from "react";
import type {SanityLocations} from '~/lib/sanity';

type Props = {
  data: SanityLocations;
};

export default function Locations({ data }: Props) {
  const [sortBy, setSortBy] = useState("Most Operators");

  const locations = [
    { city: "New York, NY", operators: 18 },
    { city: "Los Angeles, CA", operators: 15 },
    { city: "Chicago, IL", operators: 12 },
    { city: "Miami, FL", operators: 11 },
    { city: "Houston, TX", operators: 10 },
    { city: "Phoenix, AZ", operators: 9 },
    { city: "Philadelphia, PA", operators: 8 },
    { city: "San Antonio, TX", operators: 7 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Title */}
      <div className="text-center mb-8">
        <h3 className="text-md font-bold text-gray-600">
          {data.heading || 'Find a Anytime Mailbox Location Near You'}
        </h3>
        <p className="text-[30px] font-normal text-gray-900 mt-5">
        {data.description || ' Search by city, browse all available locations, or choose from our most popular spots with the highest number of operators.'}
        </p>
      </div>

      {/* Search Input */}
      <div className="mb-10 bg-[#FAFAFA] border-[#E5E5E5] border p-9 rounded-sm">
          <input
            type="text"
            placeholder={data.searchPlaceholder || 'Enter state, city, or ZIP'}
            className="w-full rounded-lg border border-[#D4D4D4] py-3 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
      </div>

        {/* Controls with Top Locations */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        {/* Left: Top Locations */}
        <h2 className="text-lg font-semibold">{data.title || 'Top Locations'}</h2>

        {/* Right: Sort + Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm">Sort by:</span>
            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-md py-2 px-3 text-sm bg-white"
            >
                <option>Most Operators</option>
                <option>Least Operators</option>
                <option>Alphabetical</option>
            </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
            <button className="flex items-center gap-2 border rounded-md py-2 px-4 hover:bg-gray-50">
                View on Map
            </button>
            <button className="border rounded-md py-2 px-4 hover:bg-gray-50">
                Browse All Locations
            </button>
            </div>
        </div>
        </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {locations.map((loc, idx) => (
          <div
            key={idx}
            className="border rounded-lg p-4 flex flex-col items-start hover:shadow-md transition"
          >
            <div className="flex items-center gap-2 text-gray-700 font-medium">
               {loc.city}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {loc.operators} Operators
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
