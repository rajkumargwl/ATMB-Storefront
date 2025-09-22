// import type {SanityBusinessAtFingerips} from '~/lib/sanity';
// import business1 from "~/components/media/business1.svg";
// import business3 from "~/components/media/business3.svg";
// import mobile1 from "~/components/media/mobile1.png";
// import businessBg from "~/components/media/your-business-bg.png";

// import BusinessIcon1 from '~/components/icons/BusinessIcon1';

// type Props = {
//   data: SanityBusinessAtFingerips;
// };

// export default function BusinessAtFingerips({data}: Props) {
//    const features = [
//       {
//         title: "Complete Mail Management",
//         description: "View, open, scan, forward, or shred incoming mail in seconds.",
//         icon: business1,
//       },
//       {
//         title: "Call & Message Control",
//         description: "Answer calls, forward to team members, read voicemail transcriptions.",
//         icon: business1,
//       },
//       {
//         title: "Business Insights Dashboard",
//         description: "Track usage, review performance reports, and access growth tools.",
//         icon: business1,
//       },
//       {
//         title: "Enterprise-Grade Security",
//         description: "End-to-end encryption, secure login, role-based access for teams.",
//         icon: business1,
//       },
//     ];

//   return (
//     // <section className="py-16 px-6 lg:px-20 bg-white mb-10">
//     //   <div className="max-w-5xl mx-auto px-6 text-center">
//     //     <h3 className="text-sm font-bold text-gray-500">
//     //     {data?.heading || 'Your Business at Your Fingertips — On Mobile and Desktop'}
//     //     </h3>
//     //     <p className="text-[30px] font-extralight text-[#1F2937] mt-2">
//     //     {data?.description || "Whether you're on a flight, at a café, or in your home office, our mobile app and desktop portal keep you connected, in control, and ready to act instantly." }
//     //     </p>
//     //   </div>
//     //   <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center mt-12">
//     //     {/* Left Section - Illustration + Personas */}
//     //     <div className="relative flex justify-center">
//     //       <div className="w-60 h-96 bg-[#C6CBCE] rounded-xl flex items-center justify-center">
//     //         <span className="text-gray-500"> <img
//     //             src={data?.phoneImage?.url}
//     //             className=""
//     //           /></span>
//     //       </div>

//     //       {/* Floating Cards */}
//     //       {data?.personas?.map((persona, index) => (
//     //       <div
//     //         key={index}
//     //         className="absolute border border-[#E5E5E5] bg-white shadow-md rounded-lg p-3 flex items-center gap-2 w-52"
//     //         style={{
//     //           top:
//     //             index === 0
//     //               ? "106px"
//     //               : index === 1
//     //               ? "1.5rem"
//     //               : index === 2
//     //               ? "auto"
//     //               : "auto",
//     //           left:
//     //             index === 0
//     //               ? "37px"
//     //               : index === 2
//     //               ? "74px"
//     //               : "auto",
//     //           right:
//     //             index === 1
//     //               ? "90px"
//     //               : index === 3
//     //               ? "128px"
//     //               : "auto",
//     //           bottom:
//     //             index === 2
//     //               ? "2.5rem"
//     //               : index === 3
//     //               ? "-1.5rem"
//     //               : "auto",
//     //         }}
//     //       >
//     //         {/* Image or Emoji */}
//     //         {persona?.authorImage?.url ? (
//     //           <img
//     //             src={persona?.authorImage?.url}
//     //             alt={persona?.role}
//     //             className="w-8 h-8 rounded-full"
//     //           />
//     //         ) : (
//     //           <span className="text-2xl">👤</span>
//     //         )}

//     //         {/* Texts */}
//     //         <div>
//     //           <p className="font-semibold text-[14px]">{persona?.role}</p>
//     //           <p className="text-[10px] text-[#525252]">{persona?.quote}</p>
//     //         </div>
//     //       </div>
//     //     ))}

//     //     </div>

//     //     {/* Right Section - Text + Features */}
//     //     <div>

//     //       <div className="grid grid-cols-2 gap-6 mt-8">
//     //         {data?.features?.map((feature) => (
//     //         <div className="flex items-start gap-3">
//     //           <div
//     //             className="w-28 h-[52px] bg-[#E5E5E5] flex items-center justify-center"
//     //             dangerouslySetInnerHTML={{ __html: feature?.icon?.iconCode || '' }}
//     //           />
//     //           <div>
//     //             <h4 className="font-semibold text-[#171717] text-[16px]">{feature?.title}</h4>
//     //             <p className="text-sm text-[#525252] mt-2">{feature?.description}</p>
//     //           </div>
//     //         </div>
//     //         ))}
            
//     //       </div>

//     //       {/* CTA Buttons */}
//     //       <div className="mt-10 flex gap-4">
//     //       {data?.appButtons?.map((btn) => (
//     //         <a
//     //           key={btn?.label}
//     //           href={btn?.url}
//     //           target="_blank"
//     //           rel="noopener noreferrer"
//     //           className={`px-5 py-3 rounded-lg flex items-center gap-2`}
//     //           style={{
//     //             backgroundColor: btn?.icon?.bgColor || "black",
//     //             color: btn?.icon?.textColor || "white",
//     //           }}
//     //         >
//     //           {/* If iconFile exists, show image, else use iconCode (SVG string) */}
//     //           {btn?.icon?.iconFile?.asset?.url ? (
//     //             <img
//     //               src={btn.icon.iconFile.asset.url}
//     //               alt={btn.label}
//     //               className="h-5 w-5"
//     //             />
//     //           ) : btn?.icon?.iconCode ? (
//     //             <span
//     //               dangerouslySetInnerHTML={{ __html: btn.icon.iconCode }}
//     //               className="h-5 w-5"
//     //             />
//     //           ) : null}

//     //           {btn?.label}
//     //         </a>
//     //       ))}
//     //     </div>


//     //     <p className="text-sm text-gray-500 mt-6 flex items-center gap-1">
//     //       {/* Render stars dynamically */}
//     //       {Array.from({ length: data?.socialProof?.rating || 0 }).map((_, i) => (
//     //         data?.socialProof?.starIcon?.svgFile?.asset?.url ? (
//     //           <img
//     //             key={i}
//     //             src={socialProof.starIcon.svgFile.asset.url}
//     //             alt="star"
//     //             className="w-4 h-4"
//     //           />
//     //         ) : (
//     //           <span
//     //             key={i}
//     //             dangerouslySetInnerHTML={{ __html: data?.socialProof?.starIcon?.svgCode || '' }}
//     //             className="w-4 h-4 inline-block"
//     //           />
//     //         )
//     //       ))}

//     //       {/* Text */}
//     //       <span className="ml-2">{data?.socialProof?.text}</span>
//     //     </p>

//     //     </div>
//     //   </div>
//     // </section>

//     <section className="bg-DarkOrange py-[40px] md:py-[60px] lg:py-[100px] px-5 text-center">
//          <div className="max-w-[1240px] mx-auto">
//         {/* Heading */}
//         <div className="flex flex-col gap-5 max-w-[850px] mx-auto">
//             <h2 className="font-Roboto text-white font-semibold leading-[31.2px] md:leading-[43.2px] text-[26px] md:text-[36px] tracking-[-0.39px] md:tracking-[-0.54px] text-center">
//             Your Business, Anytime on Mobile 
//             </h2>
//             <p className="font-Roboto text-white font-normal leading-[21px] md:leading-[27px] text-[14px] md:text-[18px] tracking-[0px] text-center">
//             Whether you're on a flight, at a café, or in your home office, our mobile app and desktop portal keep you connected, in control, and ready to act instantly.
//             </p>
//         </div>
  
//         {/* Cards Grid */}
//         <div className="mt-14 gap-8 max-w-[1192px] mx-auto flex flex-col md:flex-row">
//         <div className="w-[100%] md:w-[67.5%] grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4 md:gap-y-6">
//           {features.map((item, index) => (
//             <div
//               key={index}
//               className="group bg-white text-left rounded-[20px] p-5 md:p-6 border border-LightWhite hover:bg-PrimaryBlack hover:border-PrimaryBlack transition-all"
//             >
//               {/* Icon */}
//               <div className="bg-DarkOrange rounded-full p-[8px] md:p-[10px] mb-5 md:mb-6 inline-block"> <img
//                 src={item.icon}
//                 alt={item.title}
//                 className="w-5 md:w-6 h-5 md:h-6 object-cover rounded-lg"
//                 />
//               </div>
//               {/* Title */}
//               <h3 className="max-w-[100%] md:max-w-[238px] font-Roboto text-PrimaryBlack font-medium leading-[28px] md:leading-[33.6px] text-[20px] md:text-[24px] tracking-[0px] group-hover:text-white">
//                 {item.title}
//               </h3>
//               {/* Description */}
//               <p className="mt-2 font-Roboto text-LightGray font-normal leading-[21px] text-[14px] tracking-[0px] group-hover:text-white">
//                 {item.description}
//               </p>
//             </div>
//           ))}
//         </div>
  
//           {/* Right Large Card */}
//           <div className="w-[100%] md:w-[32.5%]">
//           <div className="bg-PrimaryBlack relative rounded-[20px] p-6 md:p-6 text-left flex flex-col justify-between gap-[60px] transition-all md:min-h-[577px] lg:min-h-[501px]">
//             <div className='absolute top-[0px] right-[3px]'>
//                <img
//                 src={businessBg}
//                 alt="businesss"
//                 className="w-[235px] h-[204px] object-cover rounded-lg"
//                 />
//             </div>
//             <div>
//             <div className="bg-DarkOrange rounded-full p-[8px] md:p-[10px] mb-5 md:mb-6 inline-block">
//                  <img
//                 src={business3}
//                 alt="businesss"
//                 className="w-5 md:w-6 h-5 md:h-6 object-cover rounded-lg"
//                 />
//             </div>
//               <h3 className="max-w-[100%] md:max-w-[238px] font-Roboto text-white font-medium leading-[28px] md:leading-[33.6px] text-[20px] md:text-[24px] tracking-[0px] group-hover:text-white">
//                 Real-Time Notifications
//               </h3>
//               <p className="mt-2 font-Roboto text-white font-normal leading-[21px] text-[14px] tracking-[0px] group-hover:text-white">
//                 Instant alerts for new mail, calls, or accelerator updates.
//               </p>
//             </div>
//             {/* Image mock */}
//             <div className="">
//               <div className="">
//                  <img
//                 src={mobile1}
//                 alt="businesss"
//                 className="w-full -mb-6 object-cover"
//                 />
//               </div>
//             </div>
//           </div>
//           </div>
//           </div>
//         </div>
//       </section>

//   );
// }

// import type { SanityBusinessAtFingerips } from '~/lib/sanity';
// import mobile1 from "~/components/media/mobile1.png";
// import businessBg from "~/components/media/your-business-bg.png";

// type Props = {
//   data: SanityBusinessAtFingerips;
// };

// export default function BusinessAtFingerips({ data }: Props) {
//   const features = data?.features || [];
//   const highlightedFeature = features.find(f => f.highlight) || features[features.length - 1];

//   return (
//     <section className="bg-DarkOrange py-[40px] md:py-[60px] lg:py-[100px] px-5 text-center">
//       <div className="max-w-[1240px] mx-auto">
//         {/* Heading */}
//         <div className="flex flex-col gap-5 max-w-[850px] mx-auto">
//           <h2 className="font-Roboto text-white font-semibold leading-[31.2px] md:leading-[43.2px] text-[26px] md:text-[36px] tracking-[-0.39px] md:tracking-[-0.54px] text-center">
//             {data?.headline}
//           </h2>
//           <p className="font-Roboto text-white font-normal leading-[21px] md:leading-[27px] text-[14px] md:text-[18px] tracking-[0px] text-center">
//             {data?.subheadline}
//           </p>
//         </div>

//         {/* Cards Grid */}
//         <div className="mt-14 gap-8 max-w-[1192px] mx-auto flex flex-col md:flex-row">
//           {/* Left Grid */}
//           <div className="w-[100%] md:w-[67.5%] grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4 md:gap-y-6">
//             {features
//               .filter(f => !f.highlight)
//               .map((item, index) => (
//                 <div
//                   key={index}
//                   className="bg-white text-left rounded-[20px] p-5 md:p-6 border border-LightWhite transition-all"
//                 >
//                   {/* Icon */}
//                   <div className="bg-DarkOrange rounded-full p-[8px] md:p-[10px] mb-5 md:mb-6 inline-block">
//                     <img
//                       src={item.icon?.iconFile?.url || ""}
//                       alt={item.title}
//                       className="w-5 md:w-6 h-5 md:h-6 object-cover rounded-lg"
//                     />
//                   </div>
//                   {/* Title */}
//                   <h3 className="max-w-[100%] md:max-w-[238px] font-Roboto text-PrimaryBlack font-medium leading-[28px] md:leading-[33.6px] text-[20px] md:text-[24px] tracking-[0px]">
//                     {item.title}
//                   </h3>
//                   {/* Description */}
//                   <p className="mt-2 font-Roboto text-LightGray font-normal leading-[21px] text-[14px] tracking-[0px]">
//                     {item.description}
//                   </p>
//                 </div>
//               ))}
//           </div>

//           {/* Right Large Card */}
//           <div className="w-[100%] md:w-[32.5%]">
//             <div className="bg-PrimaryBlack relative rounded-[20px] p-6 md:p-6 text-left flex flex-col justify-between gap-[60px] transition-all md:min-h-[577px] lg:min-h-[501px]">
//               <div className="absolute top-[0px] right-[3px]">
//                 <img
//                   src={businessBg}
//                   alt="business"
//                   className="w-[235px] h-[204px] object-cover rounded-lg"
//                 />
//               </div>
//               <div>
//                 <div className="bg-DarkOrange rounded-full p-[8px] md:p-[10px] mb-5 md:mb-6 inline-block">
//                   <img
//                     src={highlightedFeature.icon?.iconFile?.url || ""}
//                     alt={highlightedFeature.title}
//                     className="w-5 md:w-6 h-5 md:h-6 object-cover rounded-lg"
//                   />
//                 </div>
//                 <h3 className="max-w-[100%] md:max-w-[238px] font-Roboto text-white font-medium leading-[28px] md:leading-[33.6px] text-[20px] md:text-[24px] tracking-[0px] group-hover:text-white">
//                   {highlightedFeature.title}
//                 </h3>
//                 <p className="mt-2 font-Roboto text-white font-normal leading-[21px] text-[14px] tracking-[0px] group-hover:text-white">
//                   {highlightedFeature.description}
//                 </p>
//               </div>
//               {/* Image mock */}
//               <div>
//                 <div>
//                   <img
//                     src={data?.phoneImage?.url || mobile1}
//                     alt="business"
//                     className="w-full -mb-6 object-cover"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
import { useState, useEffect } from "react";
import type { SanityBusinessAtFingerips } from '~/lib/sanity';
import mobile1 from "~/components/media/mobile1.png";
import businessBg from "~/components/media/your-business-bg.png";

type Props = {
  data: SanityBusinessAtFingerips;
};

export default function BusinessAtFingerips({ data }: Props) {
  const features = data?.features || [];
  
  // Find the initially highlighted feature or use the last one
  const initialHighlighted = features.find(f => f.highlight) || features[features.length - 1];
  
  // Desktop initial order - move highlighted feature to the center (index 2)
  const getInitialOrder = () => {
    const nonHighlighted = features.filter(f => !f.highlight);
    const highlighted = features.find(f => f.highlight) || features[features.length - 1];
    
    return [
      nonHighlighted[0] || highlighted,
      nonHighlighted[1] || highlighted,
      highlighted,
      nonHighlighted[2] || highlighted,
      nonHighlighted[3] || highlighted,
    ].filter(Boolean);
  };

  const [orderedFeatures, setOrderedFeatures] = useState(getInitialOrder());
  const [activeIndex, setActiveIndex] = useState(2); // Center position for desktop
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleClick = (index) => {
    if (isMobile) return; // disable reordering on mobile

    if (index === activeIndex) return;
    
    const clickedItem = orderedFeatures[index];
    const otherItems = orderedFeatures.filter((_, i) => i !== index);

    let newOrder = [];
    if (index < 2) {
      newOrder = [clickedItem, ...otherItems];
    } else {
      newOrder = [...otherItems.slice(0, 2), clickedItem, ...otherItems.slice(2)];
    }

    setOrderedFeatures(newOrder);
    setActiveIndex(newOrder.indexOf(clickedItem));
  };

  // Determine which features to render based on device
  const renderFeatures = isMobile ? features : orderedFeatures;

  return (
    <section className="bg-DarkOrange py-[40px] md:py-[60px] lg:py-[100px] px-5 text-center">
      <div className="max-w-[1240px] mx-auto">
        {/* Heading */}
        <div className="flex flex-col gap-5 max-w-[850px] mx-auto">
          <h2 className="font-Roboto text-white font-semibold leading-[31.2px] md:leading-[43.2px] text-[26px] md:text-[36px] tracking-[-0.39px] md:tracking-[-0.54px] text-center">
            {data?.headline}
          </h2>
          <p className="font-Roboto text-white font-normal leading-[21px] md:leading-[27px] text-[14px] md:text-[18px] tracking-[0px] text-center">
            {data?.subheadline}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="mt-14 gap-8 max-w-[1192px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6 auto-rows-min">
          {renderFeatures.map((item, index) => {
            // On mobile → highlighted item always active
            const isActive = isMobile
              ? item.highlight || index === features.length - 1
              : index === activeIndex;

            return (
              <div
                key={item._key || index}
                onClick={() => handleClick(index)}
                className={`flex flex-col items-start justify-between text-left rounded-[20px] p-5 md:p-6 border transition-all duration-500
                  ${isActive ? "md:row-span-2 bg-PrimaryBlack border-PrimaryBlack cursor-pointer" 
                            : "md:row-span-1 bg-white border-LightWhite cursor-pointer"}`}
              >
                {/* Icon */}
                <div className="w-full">
                  <div className="bg-DarkOrange rounded-full p-[8px] md:p-[10px] mb-5 md:mb-6 inline-block">
                    <img
                      src={item.icon?.iconFile?.url || ""}
                      alt={item.title}
                      className="w-5 md:w-6 h-5 md:h-6 object-cover rounded-lg"
                    />
                  </div>
                  {/* Title */}
                  <h3 className={`max-w-[100%] md:max-w-[238px] font-Roboto font-medium leading-[28px] md:leading-[33.6px] text-[20px] md:text-[24px] tracking-[0px]
                    ${isActive ? "text-white" : "text-PrimaryBlack"}`}>
                    {item.title}
                  </h3>
                  {/* Description */}
                  <p className={`mt-2 font-Roboto font-normal leading-[21px] text-[14px] tracking-[0px]
                    ${isActive ? "text-white" : "text-LightGray"}`}>
                    {item.description}
                  </p>
                </div>

                {isActive && (
                  <div className="mt-[20px] w-full">
                    <img
                      src={data?.phoneImage?.url || mobile1}
                      alt="business"
                      className="w-full -mb-6 object-cover"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}