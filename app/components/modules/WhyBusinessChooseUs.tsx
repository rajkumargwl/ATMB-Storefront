// import type {SanityWhyBusinessesChooseUs} from '~/lib/sanity';
// import whyChooseBg from "~/components/media/why-choose-bg.png";

// type Props = {
//   data: SanityWhyBusinessesChooseUs;
// };

// export default function WhyBusinessesChooseUs({data}: Props) {
//   return (
//      <section className="relative overflow-hidden bg-PrimaryBlack text-white py-[40px] md:py-[60px] lg:py-[100px] px-5 bg-no-repeat bg-bottom-left">
//        <div className="absolute z-1 bottom-[-250px] left-[0px]">
//          <img
//            src={whyChooseBg}
//            alt="user"
//            className="w-[530px] h-[782px]"
//            />
//        </div>
//        <div className="relative z-2 max-w-[1240px] mx-auto flex justify-between flex-col md:flex-row gap-11 md:gap-5">
//       <div className="max-w-[379px] flex flex-col gap-5">
//         <h3 className="font-Roboto text-white font-semibold leading-[31.2px] md:leading-[43.2px] tracking-[-0.39px] md:tracking-[-0.54px] text-[26px] md:text-[36px]">
//           {data?.heading || '"Why Businesses Choose Us"'}
//         </h3>
//         <p className="font-Roboto text-LightWhite font-normal leading-[21px] md:leading-[27px] text-[14px] md:text-[18px] tracking-[0px]">
//         {data?.description || 'Trusted by entrepreneurs, digital nomads, and small businesses worldwide for <br />reliability, flexibility, and growth support.'}
//         </p>
//       </div>

//       <div className="max-w-[683px]">
//         {/* Left side image placeholder */}
//         <div className="hidden w-[430px] h-[390px] bg-[#C6CBCE] rounded-2xl flex items-center justify-center">
//         {data?.image?.url ? (
//           <img
//             src={data.image.url}
//             alt="Feature"
//             className="h-12 w-12 object-contain"
//           />
//         ) : (
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-12 w-12 text-gray-500"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M3 7l9 9m0 0l9-9m-9 9V3"
//             />
//           </svg>
//         )}

//         </div>

//         {/* Right side content */}
//         <div className="grid grid-cols-2 gap-x-4 md:gap-x-10 gap-y-[44px] md:gap-y-[72px]">
//           {/* <div>
//             <h3 className="font-semibold text-md text-[#171717]">All-in-One Platform</h3>
//             <p className="text-[#525252] text-sm mt-2">
//               Manage mail, calls, and growth tools from one dashboard — no juggling multiple providers.
//             </p>
//           </div> */}

//           {data?.features?.map((feature) => (
//             <div className='flex flex-col items-start gap-5 md:gap-6'>
//               <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-grid w-8 md:w-10 h-8 md:h-10 text-orange-500" aria-hidden="true"><rect width="7" height="7" x="3" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="14" rx="1"></rect><rect width="7" height="7" x="3" y="14" rx="1"></rect></svg></div>
//              <div className='flex flex-col gap-2'>
//               <h3 className="font-Roboto text-white font-medium leading-[27px] text-[18px] tracking-[0px]">
//                 {feature.title}
//               </h3>
//               {feature.description && (
//                 <p className="font-Roboto text-LightWhite font-normal leading-[21px] text-[14px] tracking-[0px]">
//                   {feature.description}
//                 </p>               
                
//               )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       </div>
//     </section>
//   );
// }
import type { SanityWhyBusinessesChooseUs } from '~/lib/sanity';
import whyChooseBg from "~/components/media/why-choose-bg.png";

type Props = {
  data: SanityWhyBusinessesChooseUs;
};

export default function WhyBusinessesChooseUs({ data }: Props) {
  return (
    <section className="relative overflow-hidden bg-PrimaryBlack text-white py-[40px] md:py-[60px] lg:py-[100px] px-5 bg-no-repeat bg-bottom-left">
      {/* Background Image */}
      <div className="absolute z-1 bottom-[-250px] left-0">
        <img
          src={whyChooseBg}
          alt="Background"
          className="w-[530px] h-[782px]"
        />
      </div>

      <div className="relative z-2 max-w-[1240px] mx-auto flex justify-between flex-col md:flex-row gap-11 md:gap-5">
        {/* Left section */}
        <div className="max-w-[379px] flex flex-col gap-5">
          <h3 className="font-Roboto text-white font-semibold leading-[31.2px] md:leading-[43.2px] tracking-[-0.39px] md:tracking-[-0.54px] text-[26px] md:text-[36px]">
            {data?.heading }
          </h3>
          <p className="font-Roboto text-LightWhite font-normal leading-[21px] md:leading-[27px] text-[14px] md:text-[18px] tracking-[0px]">
            {data?.description }
          </p>
        </div>

        {/* Right section */}
        <div className="max-w-[683px]">
          <div className="grid grid-cols-2 gap-x-4 md:gap-x-10 gap-y-[44px] md:gap-y-[72px]">
            {data?.features?.map((feature) => (
              <div
                key={feature._key}
                className="flex flex-col items-start gap-5 md:gap-6"
              >
                {/* Icon (Dynamic with fallback) */}
                <div>
                  {feature.icon?.upload?.url ? (
                    <img
                      src={feature.icon.upload.url}
                      alt={feature.icon.upload.altText || feature.title}
                      className="w-8 md:w-10 h-8 md:h-10 object-contain"
                    />
                  ) : feature.icon?.svgCode ? (
                    <div
                      className="w-8 md:w-10 h-8 md:h-10 text-orange-500"
                      dangerouslySetInnerHTML={{ __html: feature.icon.svgCode }}
                    />
                  ) : (
                    // Static fallback icon (your Lucide grid)
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-layout-grid w-8 md:w-10 h-8 md:h-10 text-orange-500"
                      aria-hidden="true"
                    >
                      <rect width="7" height="7" x="3" y="3" rx="1"></rect>
                      <rect width="7" height="7" x="14" y="3" rx="1"></rect>
                      <rect width="7" height="7" x="14" y="14" rx="1"></rect>
                      <rect width="7" height="7" x="3" y="14" rx="1"></rect>
                    </svg>
                  )}
                </div>

                {/* Title + Description */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-Roboto text-white font-medium leading-[27px] text-[18px] tracking-[0px]">
                    {feature.title}
                  </h3>
                  {feature.description && (
                    <p className="font-Roboto text-LightWhite font-normal leading-[21px] text-[14px] tracking-[0px]">
                      {feature.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
