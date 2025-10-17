import React from "react";

type Feature = {
  featureItem?: string;
};

type FeatureSection = {
  icon?: { url?: string; alt?: string };
  sectionTitle?: string;
  features?: Feature[];
};

type Props = {
  title?: string;
  subtitle?: string;
  featureSections?: FeatureSection[];
};

export default function PDPCommonFeaturesSection({
  title,
  subtitle,
  featureSections,
}: Props) {
  return (
    <section className="px-5 py-[60px] md:py-[80px] lg:py-[100px] bg-[#F8FBFF]">
      <div className="max-w-[1200px] mx-auto text-center">
        {/* Section Heading */}
        {title && (
          <h2 className="text-[28px] md:text-[40px] font-semibold text-PrimaryBlack leading-tight mb-3">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-[#666] text-[16px] md:text-[18px] leading-relaxed mb-12 max-w-[700px] mx-auto">
            {subtitle}
          </p>
        )}

        {/* Feature Sections */}
        {featureSections && featureSections.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px] md:gap-[40px] text-left">
            {featureSections.map((section, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[16px] shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col"
              >
                {/* Icon + Title */}
                <div className="flex items-center gap-3 mb-4">
                  {section.icon?.url && (
                    <div className="w-[48px] h-[48px] flex items-center justify-center bg-[#EAF4FF] rounded-full">
                      <img
                        src={section.icon.url}
                        alt={section.icon.alt || ""}
                        className="w-[24px] h-[24px] object-contain"
                      />
                    </div>
                  )}
                  {section.sectionTitle && (
                    <h3 className="text-[18px] md:text-[20px] font-semibold text-[#111]">
                      {section.sectionTitle}
                    </h3>
                  )}
                </div>

                {/* Feature List */}
                {section.features && section.features.length > 0 && (
                  <ul className="space-y-2 mt-2">
                    {section.features.map((feat, i) => (
                      <li
                        key={i}
                        className="flex items-start text-[#555] text-[15px] leading-relaxed"
                      >
                        <span className="inline-block mt-[6px] mr-2 w-[6px] h-[6px] bg-[#0071E3] rounded-full flex-shrink-0"></span>
                        {feat.featureItem}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
