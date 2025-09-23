import { useState } from "react";

type FAQ = {
  question: string;
  answer: string;
};

type Category = {
  title: string;
  faqs: FAQ[] | null;
};

type FAQWithCategoryProps = {
  categories: Category[];
};

export default function FAQWithCategory({ categories }: FAQWithCategoryProps) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white text-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveCategory(idx);
                setOpenIndex(null); // reset open faq when switching category
              }}
              className={`px-5 py-2 rounded-full border text-sm font-medium transition ${
                activeCategory === idx
                  ? "bg-black text-white"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-4">
          {categories[activeCategory].faqs?.map((faq, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-lg shadow-sm"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === idx ? null : idx)
                }
                className="flex justify-between items-center w-full px-5 py-4 text-left text-gray-900 font-medium"
              >
                {faq.question}
                <span className="text-xl">
                  {openIndex === idx ? "×" : "+"}
                </span>
              </button>

              {openIndex === idx && (
                <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          )) || (
            <p className="text-gray-500 text-sm">No FAQs available.</p>
          )}
        </div>
      </div>
    </section>
  );
}
