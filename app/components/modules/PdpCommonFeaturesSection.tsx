import React from "react";

type FeatureCategory = {
  categoryTitle: string;
  features: string[];
  icon?: {
    url?: string;
    alt?: string;
  };
};

type PdpCommonFeaturesSectionProps = {
  heading: string;
  subHeading?: string;
  featureCategories?: FeatureCategory[];
};

const PdpCommonFeaturesSection: React.FC<{ data: PdpCommonFeaturesSectionProps }> = ({ data }) => {
  if (!data) return null;

  const { heading, subHeading, featureCategories = [] } = data;

  return (
    <section
      className="bg-[#0F172A] text-white py-16 px-6 md:px-12"
      aria-labelledby="common-features-heading"
    >
      <div className="max-w-7xl mx-auto text-center">
        {/* Section Heading */}
        <h2
          id="common-features-heading"
          className="text-2xl md:text-3xl font-semibold text-white"
        >
          {heading}
        </h2>
        {subHeading && (
          <p className="text-sm md:text-base text-white/70 mt-2">{subHeading}</p>
        )}

        {/* Feature Categories Grid */}
        <div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          role="list"
        >
          {featureCategories.map((category, idx) => (
            <div
              key={idx}
              role="listitem"
              className="bg-white text-[#1A1A1A] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-4">
                {category.icon?.url && (
                  <div className="bg-[#FF6600]/10 w-8 h-8 rounded-full flex items-center justify-center">
                    <img
                      src={category.icon.url}
                      alt={category.icon.alt || ""}
                      className="w-4 h-4"
                      aria-hidden={!category.icon.alt}
                    />
                  </div>
                )}
                <h3 className="font-semibold text-[16px] md:text-[18px] text-[#FF6600]">
                  {category.categoryTitle}
                </h3>
              </div>

              {/* Feature List */}
              <ul className="list-disc list-inside space-y-1 text-[14px] md:text-[15px] text-[#1A1A1A]/90">
                {category.features?.map((item, i) => (
                  <li key={i} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PdpCommonFeaturesSection;
