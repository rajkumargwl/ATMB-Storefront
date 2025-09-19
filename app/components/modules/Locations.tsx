// import { useState } from "react";
// import type {SanityLocations} from '~/lib/sanity';
// import mailbox1 from "~/components/media/mailbox1.svg";
// import whiteArrow from "~/components/media/white-arrow.svg";


// type Props = {
//   data: SanityLocations;
// };

// export default function Locations({ data }: Props) {
//   const [sortBy, setSortBy] = useState("Most Operators");

//  const locations = [
//   { city: "New York", state: "NY", operators: 18, img: mailbox1 },
//   { city: "Los Angeles", state: "CA", operators: 15, img: mailbox1 },
//   { city: "Chicago", state: "IL", operators: 12, img: mailbox1 },
//   { city: "Miami", state: "FL", operators: 11, img: mailbox1 },
//   { city: "Houston", state: "TX", operators: 11, img: mailbox1},
//   { city: "Phoenix", state: "AZ", operators: 9, img: mailbox1 },
//   { city: "Philadelphia", state: "PA", operators: 9, img: mailbox1 },
//   { city: "San Antonio", state: "TX", operators: 7, img: mailbox1 },
// ];

//   return (
//     // <div className="max-w-6xl mx-auto px-4 py-12">
//     //   {/* Title */}
//     //   <div className="text-center mb-8">
//     //     <h3 className="text-md font-bold text-gray-600">
//     //       {data.heading || 'Find a Anytime Mailbox Location Near You'}
//     //     </h3>
//     //     <p className="text-[30px] font-normal text-gray-900 mt-5">
//     //     {data.description || ' Search by city, browse all available locations, or choose from our most popular spots with the highest number of operators.'}
//     //     </p>
//     //   </div>

//     //   {/* Search Input */}
//     //   <div className="mb-10 bg-[#FAFAFA] border-[#E5E5E5] border p-9 rounded-sm">
//     //       <input
//     //         type="text"
//     //         placeholder={data.searchPlaceholder || 'Enter state, city, or ZIP'}
//     //         className="w-full rounded-lg border border-[#D4D4D4] py-3 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//     //       />
//     //   </div>

//     //     {/* Controls with Top Locations */}
//     //     <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
//     //     {/* Left: Top Locations */}
//     //     <h2 className="text-lg font-semibold">{data.title || 'Top Locations'}</h2>

//     //     {/* Right: Sort + Buttons */}
//     //     <div className="flex flex-col sm:flex-row items-center gap-4">
//     //         {/* Sort Dropdown */}
//     //         <div className="flex items-center gap-2">
//     //         <span className="text-gray-600 text-sm">Sort by:</span>
//     //         <select
//     //             value={sortBy}
//     //             onChange={(e) => setSortBy(e.target.value)}
//     //             className="border rounded-md py-2 px-3 text-sm bg-white"
//     //         >
//     //             <option>Most Operators</option>
//     //             <option>Least Operators</option>
//     //             <option>Alphabetical</option>
//     //         </select>
//     //         </div>

//     //         {/* Buttons */}
//     //         <div className="flex gap-3">
//     //         <button className="flex items-center gap-2 border rounded-md py-2 px-4 hover:bg-gray-50">
//     //             View on Map
//     //         </button>
//     //         <button className="border rounded-md py-2 px-4 hover:bg-gray-50">
//     //             Browse All Locations
//     //         </button>
//     //         </div>
//     //     </div>
//     //     </div>

//     //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//     //     {locations.map((loc, idx) => (
//     //       <div
//     //         key={idx}
//     //         className="border rounded-lg p-4 flex flex-col items-start hover:shadow-md transition"
//     //       >
//     //         <div className="flex items-center gap-2 text-gray-700 font-medium">
//     //            {loc.city}
//     //         </div>
//     //         <p className="text-sm text-gray-500 mt-1">
//     //           {loc.operators} Operators
//     //         </p>
//     //       </div>
//     //     ))}
//     //   </div>
//     // </div>


//     <section className="bg-white text-white py-[40px] md:py-[60px] lg:py-[100px] px-5">
//     <div className="max-w-[1240px] mx-auto">
//       {/* Heading */}
//       <div className="max-w-[744px] mx-auto pb-[44px] md:pb-[64px] flex flex-col align-center justify-center gap-4 md:gap-5">
//         <h2 className="font-Roboto text-PrimaryBlack font-semibold leading-[33.8px] md:leading-[43.2px] text-[26px] md:text-[36px] tracking-[-0.39px] md:tracking-[-0.54px] text-center">
//            Find a Virtual Mailbox Near You
//         </h2>
//         <p className="font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[27px] text-[14px] md:text-[18px] tracking-[0px] text-center">
//         Search by city, browse all available locations, or choose from our most popular spots with the highest number of operators.
//         </p>
//       </div>

//       {/* Locations Grid */}
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[1088px] mx-auto">
//         {locations.map((loc, i) => (
//           <div
//             key={i}
//             className={`relative p-2 md:p-3 flex flex-row gap-2 md:gap-3 items-start transition-all rounded-[12px] border border-LightWhite bg-white hover:bg-black group
//               loc.active
//                 ? "bg-black text-white border-black"
//                 : "bg-white text-gray-900 border-gray-200"
//             }`}
//           >
//             {/* Image */}
//             <img
//               src={loc.img}
//               alt={loc.city}
//               className="w-11 md:w-16 h-11 md:h-16 object-cover rounded-lg"
//             />

//             {/* Operators */}
//             <div className="flex flex-col gap-[2px]">
//                 <span
//                 className={`text-sm ${
//                     loc.active ? "text-gray-300" : "font-Roboto text-LightGray font-normal leading-[18px] md:leading-[21px] text-[12px] md:text-[14px] tracking-[0px] group-hover:text-white"
//                 }`}
//                 >
//                 <span className="text-DarkOrange w-1 h-1 inline-block group-hover:text-white">•</span> {loc.operators} Operators
//                 </span>

//                 {/* City */}
//                 <h3 className="font-Roboto text-PrimaryBlack font-medium leading-[24px] md:leading-[28px] text-[16px] md:text-[20px] tracking-[0px] group-hover:text-white line-clamp-1">{loc.city}, <span className="inline font-Roboto text-LightGray font-medium leading-[24px] md:leading-[28px] text-[16px] md:text-[20px] tracking-[0px] group-hover:text-white">{loc.state}</span></h3>

//                  {/* City */}
                
//                 <div>
//                   <img
//                 src={whiteArrow}
//                 alt="arrow"
//                 className="w-6 md:w-6 h-6 md:h-6 absolute right-3 top-3 hidden group-hover:block"
//               />
//                 </div>
             
//             </div>

//             {/* Arrow on Active */}
//             {loc.active && (
//               <ArrowUpRight className="absolute top-3 right-3 w-5 h-5 text-white" />
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Button */}
//       <div className="mt-11 md:mt-8 text-center">
//         <button className="w-full md:w-auto min-h-[44px] md:min-h-auto bg-DarkOrange text-white font-Roboto font-medium leading-[16px] text-[16px] tracking-[0.08px] py-[12px] md:py-[18px] px-[16px] md:px-[117px] rounded-[100px]">
//           Browse All Locations
//         </button>
//       </div>
//     </div>
//     </section>

//   );
// }
import type { SanityLocations } from '~/lib/sanity';
import whiteArrow from "~/components/media/white-arrow.svg";
import RightArrowWhite from '~/components/icons/RightArrowWhite';

type Props = {
  data: SanityLocations;
};

export default function Locations({ data }: Props) {
  const locations = data?.locations || [];

  return (
    <section className="bg-white text-white py-[40px] md:py-[60px] lg:py-[100px] px-5">
      <div className="max-w-[1240px] mx-auto">
        {/* Heading */}
        <div className="max-w-[744px] mx-auto pb-[44px] md:pb-[64px] flex flex-col align-center justify-center gap-4 md:gap-5">
          <h2 className="font-Roboto text-PrimaryBlack font-semibold leading-[33.8px] md:leading-[43.2px] text-[26px] md:text-[36px] tracking-[-0.39px] md:tracking-[-0.54px] text-center">
            {data?.heading || "Find a Virtual Mailbox Near You"}
          </h2>
          <p className="font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[27px] text-[14px] md:text-[18px] tracking-[0px] text-center">
            {data?.description ||
              "Search by city, browse all available locations, or choose from our most popular spots with the highest number of operators."}
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[1088px] mx-auto">
          {locations.map((loc, i) => (
            <div
              key={i}
              className="relative p-2 md:p-3 flex flex-row gap-2 md:gap-3 items-start transition-all rounded-[12px] border border-LightWhite bg-white hover:bg-black group"
            >
              {/* Image */}
              <img
                src={loc.image?.url || ""}
                alt={loc.image?.altText || loc.city}
                className="w-11 md:w-16 h-11 md:h-16 object-cover rounded-lg"
              />

              {/* Operators + City */}
              <div className="flex flex-col gap-[2px]">
                <span className="text-sm font-Roboto text-LightGray font-normal leading-[18px] md:leading-[21px] text-[12px] md:text-[14px] tracking-[0px] group-hover:text-white">
                  <span className="text-DarkOrange w-1 h-1 inline-block group-hover:text-white">•</span>{" "}
                  {loc.operatorCount} Operators
                </span>

                {/* City + State */}
                <h3 className="font-Roboto text-PrimaryBlack font-medium leading-[24px] md:leading-[28px] text-[16px] md:text-[20px] tracking-[0px] group-hover:text-white line-clamp-1">
                  {loc.city},{" "}
                  <span className="inline font-Roboto text-LightGray font-medium leading-[24px] md:leading-[28px] text-[16px] md:text-[20px] tracking-[0px] group-hover:text-white">
                    {loc.state}
                  </span>
                </h3>

                {/* Hover Arrow */}
                <div>
                  <img
                    src={whiteArrow}
                    alt="arrow"
                    className="w-6 md:w-6 h-6 md:h-6 absolute right-3 top-3 hidden group-hover:block"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="mt-11 md:mt-8 text-center">
          <a
            href={data?.browseAllUrl || "#"}
            className="group flex items-center justify-center w-full md:w-auto max-w-[386px] mx-auto min-h-[44px] md:min-h-auto bg-DarkOrange text-white font-Roboto font-medium leading-[16px] text-[16px] tracking-[0.08px] py-[12px] md:py-[18px] px-[16px] md:px-[117px] rounded-[100px] inline-block overflow-hidden transition-all hover:scale-[1.01] hover:bg-[#DD5827]">
            
             <span className="relative flex items-center"> {data?.browseAllText } <span className="absolute right-0 opacity-0 translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-[35px] transition-all duration-300">
              <RightArrowWhite />
            </span></span>
          </a>
        </div>
      </div>
    </section>
  );
}
