// import { useState } from "react";
// import ArrowRightIcon from "~/components/icons/ArrowRightIcon";
// import type { SanityFAQ } from "~/lib/sanity";
// import PlusFAQ from '~/components/icons/PlusFAQ';
// import CloseFAQ from '~/components/icons/CloseFAQ';

// type Props = {
//   data: SanityFAQ;
// };

// export default function FAQ({ data }: Props) {
//   const [activeTab, setActiveTab] = useState(0);
//   const [openIndex, setOpenIndex] = useState<number | null>(0);

//   return (
//     <section className="px-5 py-[40px] md:py-[60px] lg:py-[100px]">
//        <div className="max-w-[1240px] mx-auto">
//     <div className="flex flex-col items-center">
//         <div className="max-w-[744px] mx-auto pb-[44px] md:pb-[56px] flex flex-col align-center justify-center gap-5">
//       {/* Heading */}
//         <h2 className="font-Roboto text-PrimaryBlack font-semibold leading-[38.4px] md:leading-[43.2px] text-[32px] md:text-[36px] tracking-[-0.48px] md:tracking-[-0.54px] text-center">
//             {data?.headline}
//           </h2>
//           <p className="font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px] text-center">
//           {data?.subheadline}
//           </p>
//       </div>

//       {/* FAQ Content */}
//       <div className="space-y-4 max-w-[812px] lg:min-w-[812px] mx-auto">
//         {data?.faqCategories?.[activeTab]?.faqs?.length > 0 ? (
//           data.faqCategories[activeTab].faqs.map((faq, idx) => {
//             const isOpen = openIndex === idx;
//             return (
//               <div
//                 key={idx}
//                 className={`rounded-[12px] p-6 border border-LightWhite ${
//                   isOpen ? "bg-PrimaryBlack text-white" : "bg-[#F9F9F9]"
//                 }`}
//               >
//                 <button
//                   onClick={() => setOpenIndex(isOpen ? null : idx)}
//                   className="w-full flex justify-between items-center text-left gap-6"
//                 >
//                   <span className={`font-Roboto font-medium leading-[28px] text-[20px] tracking-[0px] ${
//                       isOpen ? "text-white" : ""
//                     } text-PrimaryBlack`}>{faq.question}</span>
//                   <span
//                     className={`text-2xl font-bold ${
//                       isOpen ? "rotate-0" : ""
//                     } transition-transform`}
//                   >
//                     {isOpen ? <CloseFAQ /> : <PlusFAQ />}
//                   </span>
//                 </button>

//                 {isOpen && (
//                   <div className="pt-4 font-Roboto text-white font-normal leading-[24px] text-[16px] tracking-[0px]">
//                     {faq.answer}
//                   </div>
//                 )}
//               </div>
//             );
//           })
//         ) : (
//           <p className="font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px] text-center">
//             No FAQs available for this section.
//           </p>
//         )}
//       </div>


//       {/* View All FAQs Button */}
//       <div className="flex justify-center mt-11 md:mt-14">
//         <button className="bg-DarkOrange text-white font-Roboto font-medium leading-[16px] text-[16px] tracking-[0.08px] py-3 md:py-[18px] px-4 md:px-[143px] rounded-[100px] min-w-[205px] md:min-w-aauto min-h-[52px] md:min-h-auto">
//           View All FAQs
//         </button>
//       </div>
//     </div>
//     </div>
//     </section>
//   );
// }
import { useState } from "react";
 import { useRef } from "react";
import ArrowRightIcon from "~/components/icons/ArrowRightIcon";
import type { SanityFAQ } from "~/lib/sanity";
import PlusFAQ from '~/components/icons/PlusFAQ';
import CloseFAQ from '~/components/icons/CloseFAQ';
import RightArrowWhite from '~/components/icons/RightArrowWhite';

type Props = {
  data: SanityFAQ;
};

export default function FAQ({ data }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="px-5 py-[40px] md:py-[60px] lg:py-[100px]">
      <div className="max-w-[1240px] mx-auto">
        <div className="flex flex-col items-center">
          <div className="max-w-[744px] mx-auto pb-[44px] md:pb-[56px] flex flex-col align-center justify-center gap-5">
            {/* Heading */}
            <h2 className="font-Roboto text-PrimaryBlack font-semibold leading-[38.4px] md:leading-[43.2px] text-[32px] md:text-[36px] tracking-[-0.48px] md:tracking-[-0.54px] text-center">
              {data?.headline}
            </h2>
            <p className="font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px] text-center">
              {data?.subheadline}
            </p>
          </div>

          {/* FAQ Content */}
          <div className="space-y-4 max-w-[812px] lg:min-w-[812px] mx-auto">
            {/* {data?.faqs?.length > 0 ? (
              data.faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-[12px] p-6 border border-LightWhite ${
                      isOpen ? "bg-[#F6F6F6] text-white" : "bg-white"
                    }`}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full flex justify-between items-center text-left gap-6"
                    >
                      <span className={`font-Roboto font-medium leading-[28px] text-[20px] tracking-[0px] ${
                          isOpen ? "text-PrimaryBlack" : ""
                        } text-PrimaryBlack`}>{faq.question}</span>
                      <span
                        className={`text-2xl font-bold ${
                          isOpen ? "rotate-0" : ""
                        } transition-transform`}
                      >
                        {isOpen ? <CloseFAQ /> : <PlusFAQ />}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="pt-4 font-Roboto text-PrimaryBlack font-normal leading-[24px] text-[16px] tracking-[0px]">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px] text-center">
                No FAQs available.
              </p>
            )} */}
           

                {data?.faqs?.length > 0 ? (
                  data.faqs.map((faq, idx) => {
                    const isOpen = openIndex === idx;
                    const contentRef = useRef(null);

                    return (
                      <div
                        key={idx}
                        className={`rounded-[12px] p-6 border border-LightWhite transition-colors duration-300 ${
                          isOpen ? "bg-[#F6F6F6]" : "bg-white"
                        }`}
                      >
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : idx)}
                          className="w-full flex justify-between items-center text-left gap-6"
                        >
                          <span className="font-Roboto font-medium leading-[28px] text-[20px] text-PrimaryBlack">
                            {faq.question}
                          </span>
                          <span
                            className={`text-2xl font-bold transition-transform duration-300 ${
                              isOpen ? "rotate-45" : "rotate-0"
                            }`}
                          >
                            {isOpen ? <CloseFAQ /> : <PlusFAQ />}
                          </span>
                        </button>

                        {/* Smooth auto height transition */}
                        <div
                          ref={contentRef}
                          style={{
                            maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
                          }}
                          className={`transition-[max-height] duration-500 ease-in-out overflow-hidden`}
                        >
                          <p className="pt-4 font-Roboto text-PrimaryBlack font-normal leading-[24px] text-[16px]">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px] text-center">
                    No FAQs available.
                  </p>
                )}


          </div>

          {/* View All FAQs Button */}
          <div className="flex justify-center mt-11 md:mt-14">
          <button className="group relative flex items-center justify-center bg-DarkOrange text-white font-Roboto font-medium leading-[16px] text-[16px] tracking-[0.08px] h-[52px] px-4 md:px-[143px] rounded-[100px] min-w-[205px] md:min-w-auto min-h-[52px] md:min-h-auto overflow-hidden transition-all hover:scale-[1.01] hover:bg-[#DD5827]">
            <span className="relative flex items-center">View All FAQs <span className="absolute right-0 opacity-0 translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-[35px] transition-all duration-300">
              <RightArrowWhite />
            </span></span>
            
          </button>
          </div>
        </div>
      </div>
    </section>
  );
}
