import { useState } from "react";
import type {SanityFAQ} from '~/lib/sanity';

type Props = {
  data: SanityFAQ;
};

export default function FAQ({ data }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col items-center p-8 bg-[#F2F5F7]">
      <h2 className="text-lg font-bold mb-2">{data?.headline || "Frequently Asked Questions"}</h2>
      <p className="text-[#374151] mb-8">
      {data?.subheadline || "Find quick answers to the most common questions about our services."}
      </p>

      <div className="flex w-full max-w-5xl">
      {/* Sidebar Tabs */}
      <div className="w-1/4 border-r pr-4">
        {data?.faqCategories?.length > 0 ? (
          data?.faqCategories?.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveTab(idx);
                setOpenIndex(null);
              }}
              className={`block w-full text-left py-3 px-2 mb-1 rounded-md ${
                idx === activeTab
                  ? "font-semibold text-black border-l-2 border-black bg-gray-50"
                  : "text-[#374151] hover:text-black"
              }`}
            >
              {tab.title}
            </button>
          ))
        ) : (
          <p className="text-[#374151] italic">No FAQ categories available.</p>
        )}
      </div>

      {/* FAQ Content */}
      <div className="w-3/4 pl-6">
        {data?.faqCategories?.length > 0 &&
        data?.faqCategories[activeTab]?.faqs?.length > 0 ? (
          data?.faqCategories[activeTab]?.faqs?.map((faq, idx) => (
            <div key={idx} className="border-b border-[#C6CBCD] py-4">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="flex justify-between w-full text-left font-semibold text-lg text-gray-800"
              >
                {faq.question}
                <span>{openIndex === idx ? "−" : "+"}</span>
              </button>
              {openIndex === idx && (
                <p className="mt-4 font-normal text-sm text-[#374151]">{faq.answer}</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-[#374151] italic">No FAQs available for this section.</p>
        )}
      </div>
    </div>

    </div>
  );
}
