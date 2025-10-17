import React from "react";

type Feature = {
  icon?: {
    url?: string;
  };
  title?: string;
  description?: string;
};

type Props = {
  heading?: string;
  subHeading?: string;
  features?: Feature[];
  image?: {
    url?: string;
    alt?: string;
  };
};

export default function PDPWhyChooseSection({
  heading,
  subHeading,
  features,
  image,
}: Props) {
  return (
    <section className="px-5 py-[60px] md:py-[80px] lg:py-[100px] bg-white">
      <div className="max-w-[1240px] mx-auto flex flex-col-reverse md:flex-row items-center gap-[48px] lg:gap-[100px]">
        {/* Left Content */}
        <div className="w-full md:w-[55%]">
          {heading && (
            <h2 className="font-Roboto text-PrimaryBlack font-semibold leading-[38px] md:leading-[52px] text-[28px] md:text-[44px] tracking-tight mb-4">
              {heading}
            </h2>
          )}

          {subHeading && (
            <p className="text-[#666] text-[16px] md:text-[18px] mb-8 leading-relaxed">
              {subHeading}
            </p>
          )}

          {/* Features Grid */}
          {features && features.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-start gap-3 bg-[#F8FAFB] rounded-[16px] p-5 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {/* Icon */}
                  {feature.icon?.url && (
                    <div className="w-[48px] h-[48px] rounded-full bg-[#EAF4FF] flex items-center justify-center">
                      <img
                        src={feature.icon.url}
                        alt={feature.title || ""}
                        className="w-[28px] h-[28px] object-contain"
                      />
                    </div>
                  )}

                  {/* Title */}
                  {feature.title && (
                    <h3 className="text-[#111] text-[18px] font-semibold leading-snug">
                      {feature.title}
                    </h3>
                  )}

                  {/* Description */}
                  {feature.description && (
                    <p className="text-[#555] text-[15px] leading-relaxed">
                      {feature.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Image */}
        {image?.url && (
          <div className="w-full md:w-[45%] relative">
            <img
              src={image.url}
              alt={image.alt || ""}
              className="rounded-[20px] w-full object-cover shadow-md"
            />
          </div>
        )}
      </div>
    </section>
  );
}
