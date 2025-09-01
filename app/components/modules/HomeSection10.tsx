import { useState } from "react";

const tabs = [
  {
    title: "Getting Started",
    faqs: [
      {
        q: "What is a Virtual Mailbox?",
        a: "A Virtual Mailbox is a service that allows you to access and manage your postal mail remotely. It comes with a real street address where you can receive mail and packages. You can access your postal mail through our app or on a browser as long as you have a working internet connection."
      },
      {
        q: "What are the application requirements to open a Virtual Mailbox?",
        a: "To open a Virtual Mailbox, you generally need to complete an application form, provide proof of identity, and submit address verification documents as required."
      },
      {
        q: "Why should I use a Virtual Mailbox?",
        a: "It allows you to manage your mail remotely, provides a real street address, and offers features like scanning, forwarding, and package handling."
      },
      {
        q: "How does a Virtual Mailbox work?",
        a: "Your mail is received at a secure facility, scanned, and uploaded to your digital mailbox. You can then choose to forward, open & scan, or discard mail."
      },
      {
        q: "What features does a Virtual Mailbox offer?",
        a: "Mail scanning, forwarding, shredding, check deposit, and notifications depending on your selected plan."
      }
    ]
  },
  { title: "Plans & Pricing", faqs: [] },
  { title: "Mail Handling & Features", faqs: [] },
  { title: "Phone Services", faqs: [] },
  { title: "Verification & Compliance", faqs: [] },
  { title: "Technical Support", faqs: [] }
];

export default function FAQ() {
  const [activeTab, setActiveTab] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col items-center p-8 bg-[#F2F5F7]">
      <h2 className="text-lg font-bold mb-2">Frequently Asked Questions</h2>
      <p className="text-[#374151] mb-8">
        Find quick answers to the most common questions about our services.
      </p>

      <div className="flex w-full max-w-5xl">
        {/* Sidebar Tabs */}
        <div className="w-1/4 border-r pr-4">
          {tabs.map((tab, idx) => (
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
          ))}
        </div>

        {/* FAQ Content */}
        <div className="w-3/4 pl-6">
          {tabs[activeTab].faqs.length > 0 ? (
            tabs[activeTab].faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-[#C6CBCD] py-4">
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="flex justify-between w-full text-left font-semibold text-lg text-gray-800"
                >
                  {faq.q}
                  <span>{openIndex === idx ? "−" : "+"}</span>
                </button>
                {openIndex === idx && (
                  <p className="mt-4 font-normal text-sm text-[#374151]">{faq.a}</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-[#374151]">No FAQs available for this section.</p>
          )}
        </div>
      </div>
    </div>
  );
}
