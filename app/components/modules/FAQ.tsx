import { useState } from "react";
import type { SanityFAQ } from "~/lib/sanity";

type Props = {
  data: SanityFAQ;
};

export default function FAQ({ data }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col items-center p-8 bg-white mb-10">
      {/* Badge */}
      <div className="flex items-center gap-2 mb-4 bg-[#FFE5D8] px-3 py-2 rounded-full">
        <span className="w-2 h-2 bg-[#EE6D2D] rounded-full" />
        <span className="text-sm font-medium text-gray-700">
          {data?.headline}
        </span>
      </div>

      {/* Headline */}
      <h2 className="text-[36px] xs:text-lg font-semibold text-center max-w-[870px] mb-4">
        {data?.subheadline}
      </h2>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-8 mt-10">
        {data?.faqCategories?.length > 0 ? (
          data.faqCategories.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveTab(idx);
                setOpenIndex(null);
              }}
              className={`px-6 py-2  ${
                idx === activeTab
                  ? "bg-[#F9F9F9] text-[#091019] border-[#091019] rounded-full border transition"
                  : "bg-transparent text-[#5A5D60]"
              }`}
            >
              {tab.title}
            </button>
          ))
        ) : (
          null
        )}
      </div>

      {/* FAQ Content */}
      <div className="w-full max-w-3xl space-y-4">
        {data?.faqCategories?.[activeTab]?.faqs?.length > 0 ? (
          data.faqCategories[activeTab].faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-[#F9F9F9] border border-[#DCDCDC] rounded-lg shadow-sm p-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="flex justify-between w-full text-left font-semibold text-[#091019] text-[20px]"
              >
                {faq.question}
                <span className="text-xl">
                  {openIndex === idx ? "×" : "+"}
                </span>
              </button>
              {openIndex === idx && (
                <p className="mt-3 text-[15px] text-[#091019] font-extralight">
                  {faq.answer}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic items-center text-center">No FAQs available for this section.</p>
        )}
      </div>
    </div>
  );
}
