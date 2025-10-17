import React from "react";

type Feature = {
  icon?: {
    url?: string;
  };
  label?: string;
};

type Props = {
  title?: string;
  subtitle?: string;
  features?: Feature[];
};

export default function PDPDetailedFeatureSection({ title, subtitle, features }: Props) {
  return (
    <section className="px-5 py-[60px] md:py-[80px] lg:py-[100px] bg-white">
      <div className="max-w-[1240px] mx-auto text-center">
        {/* Section Heading */}
        {title && (
          <h2 className="font-Roboto text-PrimaryBlack font-semibold leading-[38px] md:leading-[52px] text-[28px] md:text-[44px] tracking-tight mb-2">
            {title}
          </h2>
        )}

        {/* Subtitle */}
        {subtitle && (
          <p className="text-[#4B4B4B] text-[16px] md:text-[18px] leading-[26px] md:leading-[28px] max-w-[700px] mx-auto mb-10 md:mb-16">
            {subtitle}
          </p>
        )}

        {/* Features Grid */}
        {features && features.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10 md:gap-x-10 md:gap-y-14">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center group"
              >
                {/* Icon */}
                {feature.icon?.url && (
                  <div className="w-[64px] h-[64px] md:w-[80px] md:h-[80px] mb-4 flex items-center justify-center rounded-full bg-[#F6F6F6] group-hover:bg-[#E8F3FF] transition-all duration-300">
                    <img
                      src={feature.icon.url}
                      alt={feature.label || ""}
                      className="w-[36px] h-[36px] object-contain"
                    />
                  </div>
                )}

                {/* Label */}
                <p className="text-[15px] md:text-[16px] text-[#333] font-medium leading-snug">
                  {feature.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
