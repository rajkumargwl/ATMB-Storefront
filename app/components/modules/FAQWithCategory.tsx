import { useRef, useState } from "react";
import PlusFAQ from '~/components/icons/PlusFAQ';
import CloseFAQ from '~/components/icons/CloseFAQ';
import '~/styles/tailwind.css';

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

  // ✅ only declare once, not inside map
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    const total = categories.length;

    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        const next = (idx + 1) % total;
        setActiveCategory(next);
        setOpenIndex(null);
        tabRefs.current[next]?.focus();
        break;

      case "ArrowLeft":
        e.preventDefault();
        const prev = (idx - 1 + total) % total;
        setActiveCategory(prev);
        setOpenIndex(null);
        tabRefs.current[prev]?.focus();
        break;

      case "Home": // jump to first
        e.preventDefault();
        setActiveCategory(0);
        setOpenIndex(null);
        tabRefs.current[0]?.focus();
        break;

      case "End": // jump to last
        e.preventDefault();
        setActiveCategory(total - 1);
        setOpenIndex(null);
        tabRefs.current[total - 1]?.focus();
        break;

      default:
        break;
    }
  };

  return (
    <section className="bg-white text-gray-900 md:py-25 py-10">
      <div className="max-w-4xl mx-auto px-4">
        {/* Tabs */}
        <div
          className="flex overflow-x-auto gap-3 mb-11 scrollbar-hide border-LightWhite"
          role="tablist"
          aria-label="FAQ Categories"
        >
          {categories.map((cat, idx) => (
            <button
              key={idx}
              ref={(el) => (tabRefs.current[idx] = el)}
              onClick={() => {
                setActiveCategory(idx);
                setOpenIndex(null);
              }}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`px-6 py-3 rounded-full border border-LightWhite text-base font-normal leading-[24px] tracking-[0px] transition-all shrink-0 ${
                activeCategory === idx
                  ? "bg-PrimaryBlack text-white"
                  : "bg-white text-LightGray hover:border-PrimaryBlack hover:bg-[#f3f3f3]"
              }`}
              role="tab"
              aria-selected={activeCategory === idx}
              aria-controls={`tabpanel-${idx}`}
              tabIndex={activeCategory === idx ? 0 : -1}
              id={`tab-${idx}`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* FAQ Accordions */}
        <div
          className="space-y-4"
          id={`tabpanel-${activeCategory}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeCategory}`}
          tabIndex={0} // allows tabbing into FAQ after tablist
        >
          {categories?.[activeCategory]?.faqs && categories[activeCategory].faqs.length > 0 ? (
            categories[activeCategory].faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;

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
                    aria-expanded={isOpen}
                    aria-controls={`faq-content-${idx}`}
                    id={`faq-header-${idx}`}
                  >
                    <span className="font-Roboto font-medium leading-[28px] text-[20px] text-PrimaryBlack">
                      {faq.question}
                    </span>
                    <span className="text-2xl font-bold transition-transform duration-300">
                      {isOpen ? <CloseFAQ /> : <PlusFAQ />}
                    </span>
                  </button>

                  {/* Smooth auto height transition */}
                  <div
                    ref={(el) => (contentRefs.current[idx] = el)}
                    style={{
                      maxHeight: isOpen
                        ? `${contentRefs.current[idx]?.scrollHeight || 0}px`
                        : "0px",
                    }}
                    className="transition-[max-height] duration-500 ease-in-out overflow-hidden"
                    id={`faq-content-${idx}`}
                    role="region"
                    aria-labelledby={`faq-header-${idx}`}
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
      </div>
    </section>
  );
}
