import React from "react";

type Highlight = {
  icon?: {
    url?: string;
  };
  text?: string;
};

type Props = {
  heading?: string;
  highlights?: Highlight[];
  
};

export default function PDPHighlightsSection({ heading, highlights }: Props) {
  return (
    <section className="px-5 py-[60px] md:py-[80px] lg:py-[100px] bg-[#F6F6F6]">
      <div className="max-w-[1240px] mx-auto text-center">
        {/* Heading */}
        {heading && (
          <h2 className="font-Roboto text-PrimaryBlack font-semibold leading-[38px] md:leading-[52px] text-[28px] md:text-[44px] tracking-tight mb-10 md:mb-14">
            {heading}
          </h2>
        )}

        {/* Highlights Grid */}
        {highlights && highlights.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-8 md:gap-x-12 md:gap-y-12">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center bg-white rounded-[16px] shadow-sm hover:shadow-md transition-all duration-300 p-6 md:p-8 group"
              >
                {/* Icon */}
                {item.icon?.url && (
                  <div className="w-[64px] h-[64px] mb-5 flex items-center justify-center rounded-full bg-[#EAF4FF] group-hover:bg-[#D6EBFF] transition-all duration-300">
                    <img
                      src={item.icon.url}
                      alt={item.text || ""}
                      className="w-[32px] h-[32px] object-contain"
                    />
                  </div>
                )}

                {/* Text */}
                {item.text && (
                  <p className="text-[#333] text-[16px] md:text-[18px] font-medium leading-snug max-w-[200px]">
                    {item.text}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
