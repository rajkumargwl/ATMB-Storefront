
import { useState, useEffect } from "react";
import type { SanityBusinessAtFingerips } from '~/lib/sanity';
import mobile1 from "~/components/media/mobile1.png";
import businessBg from "~/components/media/your-business-bg.png";

type Props = {
  data: SanityBusinessAtFingerips;
};

export default function BusinessAtFingerips({ data }: Props) {
  const features = data?.features || [];
  
  // Find the initially highlighted feature or use the last one
  const initialHighlighted = features.find(f => f.highlight) || features[features.length - 1];
  
  // Desktop initial order - move highlighted feature to the center (index 2)
  const getInitialOrder = () => {
    const nonHighlighted = features.filter(f => !f.highlight);
    const highlighted = features.find(f => f.highlight) || features[features.length - 1];
    
    return [
      nonHighlighted[0] || highlighted,
      nonHighlighted[1] || highlighted,
      highlighted,
      nonHighlighted[2] || highlighted,
      nonHighlighted[3] || highlighted,
    ].filter(Boolean);
  };

  const [orderedFeatures, setOrderedFeatures] = useState(getInitialOrder());
  const [activeIndex, setActiveIndex] = useState(2); // Center position for desktop
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleClick = (index) => {
    if (isMobile) return; // disable reordering on mobile

    if (index === activeIndex) return;
    
    const clickedItem = orderedFeatures[index];
    const otherItems = orderedFeatures.filter((_, i) => i !== index);

    let newOrder = [];
    if (index < 2) {
      newOrder = [clickedItem, ...otherItems];
    } else {
      newOrder = [...otherItems.slice(0, 2), clickedItem, ...otherItems.slice(2)];
    }

    setOrderedFeatures(newOrder);
    setActiveIndex(newOrder.indexOf(clickedItem));
  };

  // Determine which features to render based on device
  const renderFeatures = isMobile ? features : orderedFeatures;

  return (
    <section className="bg-DarkOrange py-[40px] md:py-[60px] lg:py-[100px] px-5 text-center">
      <div className="max-w-[1240px] mx-auto">
        {/* Heading */}
        <div className="flex flex-col gap-5 max-w-[850px] mx-auto">
          <h2 className="font-Roboto text-white font-semibold leading-[31.2px] md:leading-[43.2px] text-[26px] md:text-[36px] tracking-[-0.39px] md:tracking-[-0.54px] text-center">
            {data?.headline}
          </h2>
          <p className="font-Roboto text-white font-normal leading-[21px] md:leading-[27px] text-[14px] md:text-[18px] tracking-[0px] text-center">
            {data?.subheadline}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="mt-14 gap-8 max-w-[1192px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6 auto-rows-min">
          {renderFeatures.map((item, index) => {
            // On mobile → highlighted item always active
            const isActive = isMobile
              ? item.highlight || index === features.length - 1
              : index === activeIndex;

            return (
              <div
                key={item._key || index}
                onClick={() => handleClick(index)}
                className={`flex flex-col items-start justify-between text-left rounded-[20px] p-5 md:p-6 border transition-all duration-500
                  ${isActive ? "md:row-span-2 bg-PrimaryBlack border-PrimaryBlack cursor-pointer" 
                            : "md:row-span-1 bg-white border-LightWhite cursor-pointer"} ${index === 0 ? "nth-4:bg-red-500" : ""}`}
              >
                {/* Icon */}
                <div className="w-full">
                  <div className="bg-DarkOrange rounded-full p-[8px] md:p-[10px] mb-5 md:mb-6 inline-block">
                    <img
                      src={item.icon?.iconFile?.url || ""}
                      alt={item.title}
                      className="w-5 md:w-6 h-5 md:h-6 object-cover "
                       title={item.icon?.tooltipTitle}
                    />
                  </div>
                  {/* Title */}
                  <h3 className={`max-w-[100%] md:max-w-[238px] font-Roboto font-medium leading-[28px] md:leading-[33.6px] text-[20px] md:text-[24px] tracking-[0px]
                    ${isActive ? "text-white" : "text-PrimaryBlack"}`}>
                    {item.title}
                  </h3>
                  {/* Description */}
                  <p className={`mt-2 font-Roboto font-normal leading-[21px] text-[14px] tracking-[0px]
                    ${isActive ? "text-white" : "text-LightGray"}`}>
                    {item.description}
                  </p>
                </div>

                {isActive && (
                  <div className="mt-[20px] w-full">
                    <img
                      src={data?.phoneImage?.url || mobile1}
                      alt="business"
                      className="w-full -mb-6 object-cover"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}