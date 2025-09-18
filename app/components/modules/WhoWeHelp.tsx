import { useState } from 'react';
import type {SanityWhoWeHelp} from '~/lib/sanity';
import man1 from "~/components/media/men1.svg";

import CheckArrow from '~/components/icons/CheckArrow';
import Call from '~/components/icons/Call';
import Mail from '~/components/icons/Mail';
import Turn from '~/components/icons/Turn';
import Map from '~/components/icons/Map';
import WhiteChevron from '~/components/icons/WhiteChevron';
import BlackChevron from '~/components/icons/BlackChevron';



type Props = {
  data: SanityWhoWeHelp;
};

const tabs = [
  "Small Business Owner",
  "E-Commerce Entrepreneur",
  "Frequent Traveler",
  "Remote Worker",
  "Digital Nomad",
  "Aspiring Entrepreneur",
];



export default function HomeHero({ data }: Props) {
    const [activeTab, setActiveTab] = useState(
      data?.tabs?.[0]?.label || ""
    );
    // Find active tab data
    const activeData = data?.tabs?.find(
    (t) => t.label === activeTab
    );
    const [active, setActive] = useState(0);
  return (

//     <section className="bg-[#F2F5F7] py-12 border-t border-b border-[#C6CBCD]">
//          <div className="max-w-8xl mx-auto px-4">
//     {/* Heading */}
//     <div className="text-center">
//       <p className="text-sm text-gray-500 uppercase tracking-wide">{data?.title || 'Who We Help'}</p>
//       <h2 className="text-2xl font-normal text-gray-900 mt-2">
//         {data?.subtitle1 || 'From solo professionals to scaling businesses'} <br />
//         <span className="font-bold text-black">{data?.subtitle2 || 'we’ve got you covered'}</span>
//       </h2>
//     </div>

//     {/* Tabs */}
//     <div className="mt-8 flex flex-wrap justify-center gap-4 border-b border-[#C6CBCD]">
//     {data?.tabs?.map((tab, i) => (
//     <button
//         key={i}
//         onClick={() => setActiveTab(tab.label)}
//         className={`px-4 py-2 text-sm font-medium ${
//         activeTab === tab.label
//             ? "border-b-2 border-black text-black"
//             : "text-gray-500 hover:text-black"
//         }`}
//     >
//         {tab.label}
//     </button>
//     ))}
// </div>

//     {/* Tab content */}
//    {/* Tab content */}
//    {activeData && (
//     <div className="mt-15 grid md:grid-cols-2 gap-10 max-w-6xl mx-auto items-center">
//         {/* Left content */}
//         <div className="flex flex-col justify-center">
//         {/* Description */}
//         {activeData?.description && (
//             <p className="text-gray-700">{activeData?.description}</p>
//         )}

//         {/* Key Needs */}
//         {activeData?.keyNeeds?.length > 0 && (
//             <div className="mt-6">
//             <p className="font-bold text-gray-900">Key Needs:</p>
//             <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
//                 {activeData?.keyNeeds.map((need, i) => (
//                 <li key={i}>{need}</li>
//                 ))}
//             </ul>
//             </div>
//         )}

//         {/* Services */}
//         {activeData?.services?.length > 0 && (
//             <div className="mt-8">
//             <p className="font-bold text-gray-900">Relevant Services:</p>
//             <div className="flex gap-4 mt-3 flex-wrap justify-center">
//                 {activeData?.services.map((service, i) => (
//                 <div
//                     key={i}
//                     className="flex-1 p-4 text-center border rounded-lg shadow-sm bg-white min-w-[120px]"
//                 >
//                     {service?.title}
//                 </div>
//                 ))}
//             </div>
//             </div>
//         )}

//         {/* Button */}
//         {activeData?.button?.label && (
//             <button className="mt-6 bg-black text-white px-6 py-2 rounded-md self-center md:self-start">
//             {activeData?.button?.label}
//             </button>
//         )}
//         </div>

//         {/* Right content */}
//         {(activeData?.quote || activeData?.image) && (
//         <div className="relative flex items-center justify-center rounded-2xl min-h-[300px]">
//             <div className="w-[420px] h-[400px] bg-[#E1E4E5] flex items-center justify-center rounded-xl">
//             {activeData?.image ? (
//                     <img
//                         src={activeData.image.url}
//                         alt={activeData.image.altText || "Service image"}
//                         width={activeData.image.width}
//                         height={activeData.image.height}
//                         className="object-contain rounded-xl bg-E1E4E5"
//                     />
//             ) : (
//                 <span className="text-gray-400"></span>
//             )}
//             </div>
//             {activeData?.quote && (
//             <div className="absolute bottom-6 left-6 bg-white p-4 rounded-md shadow-md max-w-[250px]">
//                 <p className="text-sm italic text-gray-600">{activeData?.quote}</p>
//             </div>
//             )}
//         </div>
//         )}
//     </div>
//     )}


//     </div>
//   </section>

<section className="px-5 bg-white py-[40px] md:py-[60px] lg:py-[100px]">
     <div className="max-w-[1240px] mx-auto">
        {/* Heading */}
        <div className="text-center mb-11 md:mb-14">
          <h2 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[26px] md:text-[36px] tracking-[-0.39px] md:tracking-[-0.54px]">Who We Help</h2>
          <p className="font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[27px] text-[14px] md:text-[18px] tracking-[0px] text-center mt-4">
            From solo professionals to scaling businesses we’ve got you covered
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 items-center">
        <button className="w-10 h-10 hidden md:flex items-center justify-center rounded-full bg-[#F9F9F9] border border-LightWhite text-white shrink-0">
          <BlackChevron />
        </button>
        <div className="flex items-center justify-start gap-4 overflow-x-auto whitespace-nowrap  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] 
            [scrollbar-width:'none']">
        

        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            className={`px-6 py-3 rounded-full border border-LightWhite text-base font-normal leading-[24px] tracking-[0px] shrink-0 ${
              active === idx
                ? "bg-PrimaryBlack text-white"
                : "bg-white text-LightGray"
            }`}
          >
            {tab}
          </button>
        ))}
        
        </div>
        <button className="w-10 h-10 hidden md:flex items-center justify-center rounded-full bg-DarkOrange text-white shrink-0">
         <WhiteChevron />
        </button>
        </div>

        {/* Content Grid */}
        <div className="flex flex-col md:flex-row gap-[40px] lg:gap-[124px] max-w-[1214px] mx-auto pt-[44px] md:pt-[56px]">
          {/* Left Content */}
          <div className="w-full md:w-[57%]">
            <h3 className="font-Roboto text-PrimaryBlack font-semibold leading-[28px] md:leading-[31.2px] text-[20px] md:text-[24px] tracking-[-0.3px] md:tracking-[-0.36px] mb-3 md:mb-4">
              Streamline Your Business Anywhere
            </h3>
            <p className="font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[24px] text-[16px] tracking-[0px] mb-6 md:mb-8">
              You’re running a growing business and need to handle mail, calls,
              and operations seamlessly without being tied to one location.
            </p>

            <ul className="space-y-5">
              {[
                "Use a professional business address.",
                "Store and deliver important documents.",
                "Use business phone numbers.",
                "Streamline customer communication.",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[24px] text-[14px] md:text-[16px] tracking-[0px]">
                  <CheckArrow />
                  {item}
                </li>
              ))}
            </ul>

            {/* Testimonial */}
            <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-LightWhite">
              <div className="flex items-start gap-4">
                <img
                  src={man1}
                  alt="user"
                  className="w-[56px] md:w-[70px] h-[56px] md:h-[70px] rounded-full object-cover"
                />
                <div className="flex flex-col gap-1">
                  <p className="font-Roboto text-PrimaryBlack font-normal leading-[21px] text-[14px] tracking-[0px]">Small Business Owner</p>
                  <p className="md:max-[451px] font-Roboto text-PrimaryBlack font-medium leading-[20.8px] text-[16px] tracking-[0px] italic">
                    “I need to manage my business from anywhere, without
                    worrying about missing mail or calls.”
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div  className="w-full md:w-[43%]">
            <h3 className="font-Roboto text-PrimaryBlack font-medium leading-[27px] text-[18px] tracking-[0px] mb-6">Key Services</h3>

            <div className="space-y-[3px]">
              <div className="p-6 bg-[#F6F6F6] rounded-t-[12px] relative">
                <div className="flex items-start gap-3">
                  <div className="w-[28px]">
                  <Call />
                  </div>
                  <div className='flex gap-3 flex-col'>
                    <p className="font-Roboto text-PrimaryBlack font-medium leading-[27px] text-[18px] tracking-[0px]">Business number</p>
                    <p className="max-w-[380px] font-Roboto text-PrimaryBlack font-normal leading-[21px] text-[14px] tracking-[0px]">
                      View, open, scan, forward, or shred incoming mail in
                      seconds.
                    </p>
                  </div>
                </div>
                <div className="w-[253px] h-1 absolute left-0 bottom-0 bg-gradient-to-r from-[rgba(132,57,20,0)] to-[#091019]">

                </div>
              </div>

              <div className="flex items-start gap-3 border-b border-LightWhite px-6 py-5">
                <Map />
                <p className="font-Roboto text-PrimaryBlack font-medium leading-[27px] text-[18px] tracking-[0px]">Business address</p>
              </div>
              <div className="flex items-start gap-3 border-b border-LightWhite px-6 py-5">
              <Turn />
                 <p className="font-Roboto text-PrimaryBlack font-medium leading-[27px] text-[18px] tracking-[0px]">Call forwarding</p>
              </div>
               <div className="flex items-start gap-3 border-b border-LightWhite px-6 py-5">
               <Mail />
                 <p className="font-Roboto text-PrimaryBlack font-medium leading-[27px] text-[18px] tracking-[0px]">Scan &amp; mail</p>
              </div>
            </div>

            <button className="md:max-w-[386px] mt-6 w-full bg-DarkOrange text-white font-medium font-Roboto leading-[16px] text-[16px] tracking-[0.08px] py-[14px] md:py-[18px] rounded-full">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
