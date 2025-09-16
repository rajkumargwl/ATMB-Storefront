import { useState } from "react";
import ArrowRightIcon from "~/components/icons/ArrowRightIcon";
import type { SanityFAQ } from "~/lib/sanity";

type Props = {
  data: SanityFAQ;
};

export default function FAQ({ data }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col items-center px-6 py-12 bg-white">
      {/* Heading */}
      <h2 className="text-[36px] font-bold text-center text-[#091019] mb-2">
        {data?.headline}
      </h2>
      <p className="text-[#091019] text-center max-w-3xl mb-10 text-[18px] leading-[27px]">
       {data?.subheadline}
      </p>

      {/* FAQ Content */}
      <div className="w-full max-w-2xl space-y-3">
        {data?.faqCategories?.[activeTab]?.faqs?.length > 0 ? (
          data.faqCategories[activeTab].faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-lg border border-gray-200 ${
                  isOpen ? "bg-[#0B0D17] text-white" : "bg-[#F9F9F9]"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex justify-between items-center w-full px-5 py-4 text-left font-medium text-lg"
                >
                  <span>{faq.question}</span>
                  <span
                    className={`text-2xl font-bold ${
                      isOpen ? "rotate-45" : ""
                    } transition-transform`}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 text-sm leading-relaxed text-gray-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 italic text-center">
            No FAQs available for this section.
          </p>
        )}
      </div>


      {/* View All FAQs Button */}
      <button className="mt-10 flex items-center gap-2 bg-[#E85B1A] hover:bg-[#d45113] transition text-white font-semibold px-8 py-3 rounded-full shadow-md">
        View All FAQs
        <ArrowRightIcon />
      </button>
    </div>
  );
}
