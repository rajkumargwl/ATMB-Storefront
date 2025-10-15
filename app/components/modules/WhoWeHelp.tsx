import { useRef, useState, useEffect } from "react";
import type { SanityWhoWeHelp } from "~/lib/sanity";
import CheckArrow from "~/components/icons/CheckArrow";
import WhiteChevron from "~/components/icons/WhiteChevron";
import BlackChevron from "~/components/icons/BlackChevron";
import BlackwhiteChevron from "~/components/icons/BlackwhiteChevron";
import RightArrowWhite from '~/components/icons/RightArrowWhite';

type Props = {
  data: SanityWhoWeHelp;
};

export default function HomeHero({ data }: Props) {
  const [activeTab, setActiveTab] = useState(data?.tabs?.[0]?.label || "");
  const activeData = data?.tabs?.find((t) => t.label === activeTab);
  
  // Auto-play accordion state
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // ref for scroll container
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // State to track scroll position for button states
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollLeft = () => {
    if (scrollRef.current && canScrollLeft) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current && canScrollRight) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // Update scroll button states based on scroll position
  useEffect(() => {
    const checkScrollButtons = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // 10px tolerance
      }
    };

    // Check initially
    checkScrollButtons();

    // Add scroll event listener
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollButtons);
      window.addEventListener('resize', checkScrollButtons);
      
      return () => {
        scrollContainer.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', checkScrollButtons);
      };
    }
  }, [activeTab]); // Re-check when tab changes

  // Auto-play effect for services
  useEffect(() => {
    if (!activeData?.services) return;
    
    setProgress(0);
    setActiveServiceIndex(0); // Reset to first service when tab changes

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveServiceIndex((prevIndex) =>
            (prevIndex + 1) % activeData.services.length
          );
          return 0;
        }
        return prev + 1; // smoother continuous fill
      });
    }, 50); // ~5s total (100 * 50ms)

    return () => clearInterval(interval);
  }, [activeData, activeTab]);

  return (
    <section className="px-5 bg-white py-[40px] md:py-[60px] lg:py-[100px]">
      <div className="max-w-[1240px] mx-auto">
        {/* Heading */}
        <div className="text-center mb-11 md:mb-14">
          <h2 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[26px] md:text-[36px] tracking-[-0.39px] md:tracking-[-0.54px]">
            {data?.title}
          </h2>
          <p className="font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[27px] text-[14px] md:text-[18px] tracking-[0px] text-center mt-4">
            {data?.subtitle}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 items-center">
          <button
            onClick={scrollLeft}
            className={`w-10 h-10 hidden md:flex items-center justify-center rounded-full border border-LightWhite text-white shrink-0 ${
              canScrollLeft 
                ? "bg-DarkOrange" 
                : "bg-[#E6E6E6]"
            }`}
            disabled={!canScrollLeft}
            tabIndex={canScrollLeft ? 0 : -1} // Prevent focus when disabled
          >
            <span className="sr-only">(scroll left)</span>
            <BlackChevron />
          </button>

          <div
            ref={scrollRef}
            role="tablist"
            aria-label="Who we help categories"
            className="flex items-center justify-start gap-4 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
          >
            {data?.tabs?.map((tab, idx) => {
              const isSelected = activeTab === tab.label;

              const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
                const tabs = data?.tabs || [];
                let newIndex = idx;

                switch (e.key) {
                  case "ArrowRight":
                  case "ArrowDown":
                    e.preventDefault();
                    newIndex = (idx + 1) % tabs.length;
                    document.getElementById(`tab-${newIndex}`)?.focus();
                    break;
                  case "ArrowLeft":
                  case "ArrowUp":
                    e.preventDefault();
                    newIndex = (idx - 1 + tabs.length) % tabs.length;
                    document.getElementById(`tab-${newIndex}`)?.focus();
                    break;
                  case "Home":
                    e.preventDefault();
                    document.getElementById("tab-0")?.focus();
                    break;
                  case "End":
                    e.preventDefault();
                    document.getElementById(`tab-${tabs.length - 1}`)?.focus();
                    break;
                  case "Enter":
                  case " ":
                    e.preventDefault();
                    setActiveTab(tab.label);
                    break;
                }
              };

              return (
                <button
                  key={idx}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`tabpanel-${idx}`}
                  id={`tab-${idx}`}
                  onClick={() => setActiveTab(tab.label)}
                  onKeyDown={handleKeyDown}
                  tabIndex={isSelected ? 0 : -1} // Only selected tab is tabbable
                  className={`px-6 py-3 rounded-full border border-LightWhite text-base font-normal leading-[24px] tracking-[0px] transition-all shrink-0 ${
                    isSelected
                      ? "bg-PrimaryBlack text-white"
                      : "bg-white text-LightGray hover:border-PrimaryBlack hover:bg-[#f3f3f3]"
                  }`}
                >
                  {isSelected && (
                    <span className="sr-only">(selected tab is)</span>
                  )}
                  {tab.label}
                </button>
              );
            })}
          </div>

          <button
            onClick={scrollRight}
            className={`w-10 h-10 hidden md:flex items-center justify-center rounded-full shrink-0 ${
              canScrollRight ? "bg-DarkOrange text-white" : "bg-[#E6E6E6] text-black"
            }`}
            tabIndex={canScrollRight ? 0 : -1}
            disabled={!canScrollRight}
          >
            <span className="sr-only">(scroll right)</span>
            {canScrollRight ? <WhiteChevron /> : <BlackwhiteChevron />}
          </button>
        </div>

        {/* Content Grid */}
        {activeData && (
          <div className="flex flex-col md:flex-row gap-[40px] lg:gap-[124px] max-w-[1214px] mx-auto pt-[44px] md:pt-[56px]">
            {/* Left Content */}
            <div 
              id={`tabpanel-${data?.tabs?.findIndex((t) => t.label === activeTab)}`}
              role="tabpanel"
              aria-labelledby={`tab-${data?.tabs?.findIndex((t) => t.label === activeTab)}`}
              className="w-full md:w-[57%]"
            >
              <h3 className="font-Roboto text-PrimaryBlack font-semibold leading-[28px] md:leading-[31.2px] text-[20px] md:text-[24px] tracking-[-0.3px] md:tracking-[-0.36px] mb-3 md:mb-4">
                {activeData.heading}
              </h3>
              <p className="font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[24px] text-[16px] tracking-[0px] mb-6 md:mb-8">
                {activeData.description}
              </p>

              <ul className="space-y-5">
                {activeData.keyNeeds?.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-4 font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[24px] text-[14px] md:text-[16px] tracking-[0px]"
                  >
                    <CheckArrow />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Testimonial */}
              {activeData.quote && (
                <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-LightWhite">
                  <div className="flex items-start gap-4">
                    {activeData.quote.avatar?.url && (
                      <img
                        src={activeData.quote.avatar.url}
                        alt={activeData.quote.avatar?.altText || "user"}
                        className="w-[56px] md:w-[70px] h-[56px] md:h-[70px] rounded-full object-cover"
                      />
                    )}
                    <div className="flex flex-col gap-1">
                      <p className="font-Roboto text-PrimaryBlack font-normal leading-[21px] text-[14px] tracking-[0px]">
                        {activeData.quote.author}
                      </p>
                      <p className="md:max-w-[451px] font-Roboto text-PrimaryBlack font-medium leading-[20.8px] text-[16px] tracking-[0px] italic">
                        {activeData.quote.text}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Content (Services) with Auto-Play Accordion */}
            <div className="w-full md:w-[43%]">
              <h3 className="font-Roboto text-PrimaryBlack font-medium leading-[27px] text-[18px] tracking-[0px] mb-6">
                Key Services
              </h3>

              <div className="space-y-[4px]">
                {activeData.services?.map((service, idx) => {
                  const isActive = activeServiceIndex === idx;
                  return (
                    <div
                    key={idx}
                    className={`flex flex-col relative rounded-[12px] transition-all duration-500 ${
                      isActive ? "bg-[#F6F6F6] pt-5" : "bg-white py-5"
                    } ${idx !== activeData.services.length - 1 ? "border-b border-LightWhite" : ""}`}
                  >
                    {/* Header */}
                    <div className="flex items-start gap-3 px-6">
                      {/* Icon container */}
                      <div className="flex items-start justify-center w-[28px] h-[28px] flex-shrink-0">
                        {service.icon?.upload?.url ? (
                          <img
                            src={service.icon.upload.url}
                            alt={service.icon.upload.altText || service.title}
                            className="w-[28px] h-[28px] object-contain"
                            title={service.icon?.tooltipTitle}
                          />
                        ) : service.icon?.svgCode ? (
                          <span
                            className="w-[28px] h-[28px] flex items-center justify-center mt-[4px]"
                            dangerouslySetInnerHTML={{ __html: service.icon.svgCode }}
                          />
                        ) : (
                          <span className="w-[28px] h-[28px] block" />
                        )}
                      </div>
                   
                      {/* Text block */}
                      <div className="flex-1">
                        <p className="font-Roboto text-PrimaryBlack font-medium leading-[27px] text-[18px] tracking-[0px]">
                          {service.title}
                        </p>
                  
                        {isActive && service.description && (
                          <p className="mt-1 font-Roboto font-normal text-PrimaryBlack text-[14px] leading-[21px] tracking-[0px]">
                            {service.description}
                          </p>
                        )}
                      </div>
                    </div>
                  
                    {/* Progress bar */}
                    {isActive && (
                      <div className="mt-5 px-6 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-1 bg-gradient-to-r from-[rgba(132,57,20,0.4)] to-[#091019] transition-[width] ease-linear"
                          style={{
                            width: `${isActive ? progress : 0}%`,
                            transitionDuration: "10ms",
                          }}
                        />
                      </div>
                    )}
                  </div>
                  
                  
                  
                  );
                })}
              </div>

              {activeData.button?.label && (
                <button className="group flex items-center justify-center md:max-w-[386px] mt-6 w-full bg-DarkOrange text-white font-medium font-Roboto leading-[16px] text-[16px] tracking-[0.08px] py-[14px] md:py-[18px] rounded-full overflow-hidden transition-all hover:scale-[1.01] hover:bg-[#DD5827]">
                  <span className="relative flex items-center"> 
                    {activeData.button.label} 
                    <span className="sr-only">(Explore More services)</span> 
                    <span className="absolute right-0 opacity-0 translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-[35px] transition-all duration-300">
                      <RightArrowWhite />
                    </span>
                  </span>               
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
