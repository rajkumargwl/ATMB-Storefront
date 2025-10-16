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
      className="bg-[#F8F8F8] py-16 px-6 md:px-12"
      aria-labelledby="detailed-features"
    >
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2
          id="detailed-features"
          className="text-2xl md:text-3xl font-semibold text-[#1A1A1A]"
        >
          {heading}
        </h2>
        <p className="text-sm md:text-base text-[#4B4B4B] mt-2">
          {subHeading}
        </p>

        {/* Features Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features?.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-start text-left border border-gray-200"
            >
              <img
                src={feature.icon?.url}
                alt={feature.icon?.alt || feature.title}
                className="w-7 h-7 mb-4 text-[#FF6600]"
                aria-hidden={!feature.icon?.alt}
              />
              <h3 className="text-[15px] md:text-base font-medium text-[#1A1A1A] leading-snug">
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
