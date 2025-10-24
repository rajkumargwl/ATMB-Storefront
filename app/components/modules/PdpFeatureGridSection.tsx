import React from "react";
 
type Icon = {
  url: string;
  alt?: string | null;
};
 
type Feature = {
  title: string;
  icon: Icon;
};
 
type Props = {
  heading: string;
  subHeading: string;
  features: Feature[];
};
 
const PdpFeatureGridSection: React.FC<{ data: Props }> = ({ data }) => {
  if (!data) return null;
 
  const { heading, subHeading, features } = data;
 
  return (
    <section
      className="px-5 py-[40px] md:py-[60px] lg:py-[100px] bg-[#F6F6F6]"
      aria-labelledby="detailed-features"
    >
      <div className="max-w-[1240px] mx-auto relative z-[2]">
        <div className="flex flex-col md:items-center justify-center gap-3 md:gap-3 mb-[32px] md:mb-[64px]">
        {/* Heading */}
        <h2
          id="detailed-features"
          className="text-center font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[0.12px] md:tracking-[-0.54px]"
        >
          {heading}
        </h2>
        <p className="text-center font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px]">
          {subHeading}
        </p>
        </div>
 
        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features?.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[20px] md:rounded-[24px] p-5 md:p-6 flex flex-col items-start border border-LightWhite"
            >
              <img
                src={feature.icon?.url}
                alt={feature.icon?.alt || feature.title}
                className="w-8 h-8 mb-5"
                aria-hidden={!feature.icon?.alt}
              />
              <h3 className="font-Roboto text-PrimaryBlack font-medium leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px]">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
 
export default PdpFeatureGridSection;