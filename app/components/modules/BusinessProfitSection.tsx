import React from "react";

type Feature = {
  heading?: string;
  description?: string;
  icon?: {
    url?: string;
  };
};

type Testimonial = {
  avatar?: {
    url?: string;
  };
  name?: string;
  quote?: string;
  role?: string;
};

type BusinessProfitSectionProps = {
  title?: string;
  features?: Feature[];
  sideImage?: {
    url?: string;
  };
  testimonials?: Testimonial[];
};

export default function BusinessProfitSection({
  title,
  features = [],
  sideImage,
  testimonials = [],
}: BusinessProfitSectionProps) {
  return (
    <section
      className="bg-[#0C0C0C] text-white py-[60px] md:py-[100px] px-5"
      aria-labelledby="business-profit-heading"
    >
      <div className="max-w-[1240px] mx-auto">
        {/* Section Title */}
        {title && (
          <h2
            id="business-profit-heading"
            className="text-center font-Roboto font-semibold text-[24px] md:text-[36px] leading-[43.2px] tracking-[-0.36px] text-white mb-[44px]"
          >
            {title}
          </h2>
        )}

        {/* Features and Side Image */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_376px] gap-[24px] md:gap-[32px] items-center">
          {/* Left Features */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-[24px] md:gap-[28px]">
            {features.map((item, index) => (
              <div
                key={index}
                className="bg-white text-[#0C0C0C] rounded-[12px] p-[24px] md:p-[28px] flex flex-col items-start shadow-sm hover:shadow-md transition-all focus-within:ring-2 focus-within:ring-[#FF6600]"
                tabIndex={0}
                role="group"
                aria-labelledby={`feature-${index}-heading`}
              >
                {/* Icon + Heading */}
                <div className="flex items-center gap-2 mb-3">
                  {item.icon?.url && (
                    <img
                      src={item.icon.url}
                      alt=""
                      aria-hidden="true"
                      className="w-[24px] h-[24px]"
                    />
                  )}
                  <h3
                    id={`feature-${index}-heading`}
                    className="font-Roboto font-semibold text-[18px] md:text-[20px] leading-[28px]"
                  >
                    {item.heading}
                  </h3>
                </div>
                {/* Description */}
                <p className="font-Roboto text-[15px] md:text-[16px] leading-[24px] text-[#4A4A4A]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Side Image */}
          {sideImage?.url && (
            <div className="flex justify-center items-center md:justify-end">
              <img
                src={sideImage.url}
                alt=""
                className="rounded-[16px] w-full max-w-[376px] object-cover"
              />
            </div>
          )}
        </div>

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] md:gap-[32px] mt-[60px]">
            {testimonials.map((testi, index) => (
              <div
                key={index}
                className="bg-white text-[#0C0C0C] rounded-[12px] p-[24px] shadow-sm"
              >
                <p className="font-Roboto italic text-[15px] md:text-[16px] leading-[24px] mb-4">
                  {testi.quote}
                </p>
                <div className="flex items-center gap-3">
                  {testi.avatar?.url && (
                    <img
                      src={testi.avatar.url}
                      alt=""
                      className="w-[44px] h-[44px] rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-Roboto font-semibold text-[16px] text-[#0C0C0C]">
                      {testi.name}
                    </p>
                    <p className="font-Roboto text-[14px] text-[#4A4A4A]">
                      {testi.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
