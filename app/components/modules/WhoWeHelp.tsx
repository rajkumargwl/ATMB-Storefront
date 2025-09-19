// import { useState } from 'react';
// import type {SanityWhoWeHelp} from '~/lib/sanity';
// import man1 from "~/components/media/men1.svg";

// import CheckArrow from '~/components/icons/CheckArrow';
// import Call from '~/components/icons/Call';
// import Mail from '~/components/icons/Mail';
// import Turn from '~/components/icons/Turn';
// import Map from '~/components/icons/Map';
// import WhiteChevron from '~/components/icons/WhiteChevron';
// import BlackChevron from '~/components/icons/BlackChevron';



// type Props = {
//   data: SanityWhoWeHelp;
// };

// const tabs = [
//   "Small Business Owner",
//   "E-Commerce Entrepreneur",
//   "Frequent Traveler",
//   "Remote Worker",
//   "Digital Nomad",
//   "Aspiring Entrepreneur",
// ];



// export default function HomeHero({ data }: Props) {
//     const [activeTab, setActiveTab] = useState(
//       data?.tabs?.[0]?.label || ""
//     );
//     // Find active tab data
//     const activeData = data?.tabs?.find(
//     (t) => t.label === activeTab
//     );
//     const [active, setActive] = useState(0);
//   return (

// <section className="px-5 bg-white py-[40px] md:py-[60px] lg:py-[100px]">
//      <div className="max-w-[1240px] mx-auto">
//         {/* Heading */}
//         <div className="text-center mb-11 md:mb-14">
//           <h2 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[26px] md:text-[36px] tracking-[-0.39px] md:tracking-[-0.54px]">Who We Help</h2>
//           <p className="font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[27px] text-[14px] md:text-[18px] tracking-[0px] text-center mt-4">
//             From solo professionals to scaling businesses we’ve got you covered
//           </p>
//         </div>

//         {/* Tabs */}
//         <div className="flex gap-4 items-center">
//         <button className="w-10 h-10 hidden md:flex items-center justify-center rounded-full bg-[#F9F9F9] border border-LightWhite text-white shrink-0">
//           <BlackChevron />
//         </button>
//         <div className="flex items-center justify-start gap-4 overflow-x-auto whitespace-nowrap  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] 
//             [scrollbar-width:'none']">
        

//         {tabs.map((tab, idx) => (
//           <button
//             key={idx}
//             onClick={() => setActive(idx)}
//             className={`px-6 py-3 rounded-full border border-LightWhite text-base font-normal leading-[24px] tracking-[0px] shrink-0 ${
//               active === idx
//                 ? "bg-PrimaryBlack text-white"
//                 : "bg-white text-LightGray"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
        
//         </div>
//         <button className="w-10 h-10 hidden md:flex items-center justify-center rounded-full bg-DarkOrange text-white shrink-0">
//          <WhiteChevron />
//         </button>
//         </div>

//         {/* Content Grid */}
//         <div className="flex flex-col md:flex-row gap-[40px] lg:gap-[124px] max-w-[1214px] mx-auto pt-[44px] md:pt-[56px]">
//           {/* Left Content */}
//           <div className="w-full md:w-[57%]">
//             <h3 className="font-Roboto text-PrimaryBlack font-semibold leading-[28px] md:leading-[31.2px] text-[20px] md:text-[24px] tracking-[-0.3px] md:tracking-[-0.36px] mb-3 md:mb-4">
//               Streamline Your Business Anywhere
//             </h3>
//             <p className="font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[24px] text-[16px] tracking-[0px] mb-6 md:mb-8">
//               You’re running a growing business and need to handle mail, calls,
//               and operations seamlessly without being tied to one location.
//             </p>

//             <ul className="space-y-5">
//               {[
//                 "Use a professional business address.",
//                 "Store and deliver important documents.",
//                 "Use business phone numbers.",
//                 "Streamline customer communication.",
//               ].map((item, i) => (
//                 <li key={i} className="flex items-center gap-4 font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[24px] text-[14px] md:text-[16px] tracking-[0px]">
//                   <CheckArrow />
//                   {item}
//                 </li>
//               ))}
//             </ul>

//             {/* Testimonial */}
//             <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-LightWhite">
//               <div className="flex items-start gap-4">
//                 <img
//                   src={man1}
//                   alt="user"
//                   className="w-[56px] md:w-[70px] h-[56px] md:h-[70px] rounded-full object-cover"
//                 />
//                 <div className="flex flex-col gap-1">
//                   <p className="font-Roboto text-PrimaryBlack font-normal leading-[21px] text-[14px] tracking-[0px]">Small Business Owner</p>
//                   <p className="md:max-[451px] font-Roboto text-PrimaryBlack font-medium leading-[20.8px] text-[16px] tracking-[0px] italic">
//                     “I need to manage my business from anywhere, without
//                     worrying about missing mail or calls.”
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Content */}
//           <div  className="w-full md:w-[43%]">
//             <h3 className="font-Roboto text-PrimaryBlack font-medium leading-[27px] text-[18px] tracking-[0px] mb-6">Key Services</h3>

//             <div className="space-y-[3px]">
//               <div className="p-6 bg-[#F6F6F6] rounded-t-[12px] relative">
//                 <div className="flex items-start gap-3">
//                   <div className="w-[28px]">
//                   <Call />
//                   </div>
//                   <div className='flex gap-3 flex-col'>
//                     <p className="font-Roboto text-PrimaryBlack font-medium leading-[27px] text-[18px] tracking-[0px]">Business number</p>
//                     <p className="max-w-[380px] font-Roboto text-PrimaryBlack font-normal leading-[21px] text-[14px] tracking-[0px]">
//                       View, open, scan, forward, or shred incoming mail in
//                       seconds.
//                     </p>
//                   </div>
//                 </div>
//                 <div className="w-[253px] h-1 absolute left-0 bottom-0 bg-gradient-to-r from-[rgba(132,57,20,0)] to-[#091019]">

//                 </div>
//               </div>

//               <div className="flex items-start gap-3 border-b border-LightWhite px-6 py-5">
//                 <Map />
//                 <p className="font-Roboto text-PrimaryBlack font-medium leading-[27px] text-[18px] tracking-[0px]">Business address</p>
//               </div>
//               <div className="flex items-start gap-3 border-b border-LightWhite px-6 py-5">
//               <Turn />
//                  <p className="font-Roboto text-PrimaryBlack font-medium leading-[27px] text-[18px] tracking-[0px]">Call forwarding</p>
//               </div>
//                <div className="flex items-start gap-3 border-b border-LightWhite px-6 py-5">
//                <Mail />
//                  <p className="font-Roboto text-PrimaryBlack font-medium leading-[27px] text-[18px] tracking-[0px]">Scan &amp; mail</p>
//               </div>
//             </div>

//             <button className="md:max-w-[386px] mt-6 w-full bg-DarkOrange text-white font-medium font-Roboto leading-[16px] text-[16px] tracking-[0.08px] py-[14px] md:py-[18px] rounded-full">
//               Get Started
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
import { useRef, useState } from "react";
import type { SanityWhoWeHelp } from "~/lib/sanity";
import CheckArrow from "~/components/icons/CheckArrow";
import WhiteChevron from "~/components/icons/WhiteChevron";
import BlackChevron from "~/components/icons/BlackChevron";
import RightArrowWhite from '~/components/icons/RightArrowWhite';

type Props = {
  data: SanityWhoWeHelp;
};

export default function HomeHero({ data }: Props) {
  const [activeTab, setActiveTab] = useState(data?.tabs?.[0]?.label || "");
  const activeData = data?.tabs?.find((t) => t.label === activeTab);

  // ref for scroll container
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <section className="px-5 bg-white py-[40px] md:py-[60px] lg:py-[100px]">
      <div className="max-w-[1240px] mx-auto">
        {/* Heading */}
        <div className="text-center mb-11 md:mb-14">
          <h2 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[26px] md:text-[36px] tracking-[-0.39px] md:tracking-[-0.54px]">
            {data?.title}
          </h2>
          <p className="font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[27px] text-[14px] md:text-[18px] tracking-[0px] text-center mt-4">
            {data?.subtitle}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 items-center">
          <button
            onClick={scrollLeft}
            className="w-10 h-10 hidden md:flex items-center justify-center rounded-full bg-[#F9F9F9] border border-LightWhite text-white shrink-0"
          >
            <BlackChevron />
          </button>

          <div
            ref={scrollRef}
            className="flex items-center justify-start gap-4 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
          >
            {data?.tabs?.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(tab.label)}
                className={`px-6 py-3 rounded-full border border-LightWhite text-base font-normal leading-[24px] tracking-[0px] transition-all shrink-0 ${
                  activeTab === tab.label
                    ? "bg-PrimaryBlack text-white"
                    : "bg-white text-LightGray hover:border-PrimaryBlack hover:bg-[#f3f3f3]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={scrollRight}
            className="w-10 h-10 hidden md:flex items-center justify-center rounded-full bg-DarkOrange text-white shrink-0"
          >
            <WhiteChevron />
          </button>
        </div>

        {/* Content Grid */}
        {activeData && (
          <div className="flex flex-col md:flex-row gap-[40px] lg:gap-[124px] max-w-[1214px] mx-auto pt-[44px] md:pt-[56px]">
            {/* Left Content */}
            <div className="w-full md:w-[57%]">
              <h3 className="font-Roboto text-PrimaryBlack font-semibold leading-[28px] md:leading-[31.2px] text-[20px] md:text-[24px] tracking-[-0.3px] md:tracking-[-0.36px] mb-3 md:mb-4">
                {activeData.heading}
              </h3>
              <p className="font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[24px] text-[16px] tracking-[0px] mb-6 md:mb-8">
                {activeData.description}
              </p>

              <ul className="space-y-5">
                {activeData.keyNeeds?.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-4 font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[24px] text-[14px] md:text-[16px] tracking-[0px]"
                  >
                    <CheckArrow />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Testimonial */}
              {activeData.quote && (
                <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-LightWhite">
                  <div className="flex items-start gap-4">
                    {activeData.quote.avatar?.url && (
                      <img
                        src={activeData.quote.avatar.url}
                        alt={activeData.quote.avatar?.altText || "user"}
                        className="w-[56px] md:w-[70px] h-[56px] md:h-[70px] rounded-full object-cover"
                      />
                    )}
                    <div className="flex flex-col gap-1">
                      <p className="font-Roboto text-PrimaryBlack font-normal leading-[21px] text-[14px] tracking-[0px]">
                        {activeData.quote.author}
                      </p>
                      <p className="md:max-w-[451px] font-Roboto text-PrimaryBlack font-medium leading-[20.8px] text-[16px] tracking-[0px] italic">
                        {activeData.quote.text}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Content (Services) */}
            <div className="w-full md:w-[43%]">
              <h3 className="font-Roboto text-PrimaryBlack font-medium leading-[27px] text-[18px] tracking-[0px] mb-6">
                Key Services
              </h3>

              <div className="space-y-[3px]">
                {activeData.services?.map((service, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 px-6 py-5 ${
                      idx === 0
                        ? "p-6 bg-[#F6F6F6] rounded-t-[12px] relative"
                        : "border-b border-LightWhite"
                    }`}
                  >
                    <div className="w-[28px]">
                      {service.icon?.upload?.url ? (
                        <img
                          src={service.icon.upload.url}
                          alt={service.icon.upload.altText || service.title}
                          className="w-[28px] h-[28px] object-contain"
                        />
                      ) : (
                        <span className="w-[28px] h-[28px] block" />
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-Roboto text-PrimaryBlack font-medium leading-[27px] text-[18px] tracking-[0px]">
                        {service.title}
                      </p>
                      {idx === 0 && service.description && (
                        <p className="max-w-[380px] font-Roboto text-PrimaryBlack font-normal leading-[21px] text-[14px] tracking-[0px]">
                          {service.description}
                        </p>
                      )}
                    </div>

                    {/* gradient underline only for first card */}
                    {idx === 0 && (
                      <div className="w-[253px] h-1 absolute left-0 bottom-0 bg-gradient-to-r from-[rgba(132,57,20,0)] to-[#091019]" />
                    )}
                  </div>
                ))}
              </div>

              {activeData.button?.label && (
                <button className="group flex items-center justify-center md:max-w-[386px] mt-6 w-full bg-DarkOrange text-white font-medium font-Roboto leading-[16px] text-[16px] tracking-[0.08px] py-[14px] md:py-[18px] rounded-full overflow-hidden transition-all hover:scale-[1.01] hover:bg-[#DD5827]">
                    
                   <span className="relative flex items-center"> {activeData.button.label}  <span className="absolute right-0 opacity-0 translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-[35px] transition-all duration-300">
                    <RightArrowWhite />
                  </span></span>               
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
