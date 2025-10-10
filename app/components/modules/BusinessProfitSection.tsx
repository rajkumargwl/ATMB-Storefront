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
      className="bg-PrimaryBlack text-white py-[40px] md:py-[60px] lg:py-[100px] px-5"
      aria-labelledby="business-profit-heading"
    >
      <div className="max-w-[1240px] mx-auto">
        {/* Section Title */}
        {title && (
          <h2
            id="business-profit-heading"
            className="max-w-[508px] mx-auto mb-[44px] md:mb-[56px] text-center font-Roboto text-white font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]"
          >
            {title}
          </h2>
        )}
 
        {/* Features and Side Image */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch items-center">
          {/* Left Features */}
          <div className="w-full md:w-[68.85%] grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-y-6 gap-x-8">
            {features.map((item, index) => (
              <div
                key={index}
                className="md:min-h-[242px] bg-white rounded-[20px] p-[20px] md:p-[24px] flex flex-col items-start border border-LightWhite"
                tabIndex={0}
                role="group"
                aria-labelledby={`feature-${index}-heading`}
              >
                {/* Icon + Heading */}
                <div className="flex flex-col items-start gap-6 mb-2">
                  <div className="w-11 h-11 bg-DarkOrange rounded-full flex items-center justify-center">
                  {item.icon?.url && (
                    <img
                      src={item.icon.url}
                      alt=""
                      aria-hidden="true"
                      className="w-[24px] h-[24px]"
                    />
                  )}
                  </div>
                  <h3
                    id={`feature-${index}-heading`}
                    className="font-Roboto text-PrimaryBlack font-medium leading-[28px] md:leading-[33.6px] text-[20px] md:text-[24px] tracking-[0px]"
                  >
                    {item.heading}
                  </h3>
                </div>
                {/* Description */}
                <p className="font-Roboto text-LightGray font-normal text-[14px] leading-[21px] tracking-[0px]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
 
          {/* Side Image */}
          {sideImage?.url && (
            <div className="w-full md:w-[31.15%] flex justify-center rounded-[20px] bg-DarkOrange overflow-hidden">
            <div className="flex items-end w-full h-full bg-DarkOrange rounded-[20px]  flex justify-center pt-[30px] md:pt-[0px] ">
              <img
                src={sideImage.url}
                alt=""
                className="w-full max-w-[376px] object-cover"
              />
            </div>
            </div>
          )}
        </div>
 
        {/* Testimonials */}
        {testimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] md:gap-[24px] mt-[64px]">
            {testimonials.map((testi, index) => (
              <div
                key={index}
                className="bg-white  rounded-[12px] p-[24px] border border-LightWhite flex flex-col justify-between"
              >
                <p className="mb-4 font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">
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
                    <p className="font-Roboto text-PrimaryBlack font-medium leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">
                      {testi.name}
                    </p>
                    <p className="font-Roboto text-LightGray font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px]">
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