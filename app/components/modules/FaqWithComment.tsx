import { useState } from "react";
import { Link } from "@remix-run/react";
import type { SanityFAQ } from "~/lib/sanity";
import PlusFAQ from "~/components/icons/PlusFAQ";
import CloseFAQ from "~/components/icons/CloseFAQ";
import RightArrowWhite from "~/components/icons/RightArrowWhite";
 
type Props = {
  data: SanityFAQ;
};
 
export default function FaqWithComment({ data }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
 
  return (
    <section className="px-5 py-[40px] md:py-[60px] lg:py-[100px] bg-white">
      <div className="max-w-[1240px] mx-auto">
        <div className="flex flex-col items-center">
          {/* Section Heading */}
          <div className="max-w-[744px] mx-auto pb-[44px] md:pb-[56px] text-center space-y-5">
            <h2 className="font-Roboto text-PrimaryBlack font-semibold leading-[38.4px] md:leading-[43.2px] text-[32px] md:text-[36px] tracking-[-0.48px] md:tracking-[-0.54px]">
              {data?.headline}
            </h2>
            <p className="font-Roboto text-PrimaryBlack font-normal text-[16px] md:text-[18px] leading-[24px] md:leading-[27px] tracking-[0px]">
              {data?.subheadline}
            </p>
          </div>
 
          {/* FAQ List */}
          <div className="space-y-4 max-w-[812px] lg:min-w-[812px] mx-auto">
            {data?.faqs?.length ? (
              data.faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
 
                return (
                  <div
                    key={idx}
                    className={`rounded-[12px] p-6 border border-LightWhite transition-colors duration-300 ${
                      isOpen ? "bg-[#F6F6F6]" : "bg-white"
                    }`}
                  >
                    {/* Question Header */}
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full flex justify-between items-center text-left gap-6"
                    >
                      <span className="font-Roboto font-medium leading-[28px] text-[20px] text-PrimaryBlack tracking-[0px]">
                        {faq.question}
                      </span>
                      <span className="transition-transform duration-300">
                        {isOpen ? <CloseFAQ /> : <PlusFAQ />}
                      </span>
                    </button>
 
                    {/* Expandable Content */}
                    <div
                      className={`transition-all duration-500 overflow-hidden ${
                        isOpen ? "max-h-[1000px] ease-in" : "max-h-0 ease-out"
                      }`}
                    >
                      <div className="pt-4">
                        <p className="font-Roboto text-PrimaryBlack font-normal md:font-medium leading-[24px] text-[16px] tracking-[0px]">
                          {faq.answer}
                        </p>
 
                        {/* Comment Section */}
                        {faq.comment && (
                          <div className="mt-4 pt-4 border-t border-LightWhite">
                            {faq.comment.quote && (
                              <p className="mb-3 italic font-Roboto text-PrimaryBlack font-normal leading-[20.8px] text-[16px] tracking-[0px]">
                                {faq.comment.quote}
                              </p>
                            )}
                            <div className="flex items-center gap-3">
                              {faq.comment.authorImage?.url && (
                                <img
                                  src={faq.comment.authorImage.url}
                                  alt={faq.comment.author || ""}
                                  className="w-11 h-11 rounded-full object-cover"
                                />
                              )}
                              <div>
                                <p className="font-Roboto text-PrimaryBlack font-medium leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">
                                  {faq.comment.author}
                                </p>
                                {faq.comment.role && (
                                  <p className="font-Roboto text-LightGray font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px]">
                                    {faq.comment.role}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="font-Roboto text-center text-[16px] md:text-[18px] text-PrimaryBlack">
                No FAQs available.
              </p>
            )}
          </div>
 
          {/* View All Button */}
          <div className="flex justify-center mt-11 md:mt-14 md:hidden">
            <Link to="/faq">
              <span className="group relative flex items-center justify-center bg-DarkOrange text-white font-Roboto font-medium leading-[16px] text-[16px] tracking-[0.08px] h-[52px] px-4 md:px-[143px] rounded-[100px] min-w-[205px] overflow-hidden transition-all hover:scale-[1.01] hover:bg-[#DD5827]">
                <span className="relative flex items-center">
                  View All FAQs
                  <span className="absolute right-0 opacity-0 translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-[35px] transition-all duration-300">
                    <RightArrowWhite />
                  </span>
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}