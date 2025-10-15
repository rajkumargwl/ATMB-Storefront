import React from "react";

type Step = {
  icon?: { url?: string };
  title?: string;
  description?: string;
};

type Props = {
  heading?: string;
  description?: string;
  steps?: Step[];
};

export default function PDPHowItWorksSection({
  heading,
  description,
  steps,
}: Props) {
  return (
    <section className="px-5 py-[60px] md:py-[80px] lg:py-[100px] bg-[#F9FBFC]">
      <div className="max-w-[1200px] mx-auto text-center">
        {/* Heading */}
        {heading && (
          <h2 className="text-[28px] md:text-[40px] font-semibold text-PrimaryBlack leading-[1.2] mb-4">
            {heading}
          </h2>
        )}

        {/* Description */}
        {description && (
          <p className="text-[#666] text-[16px] md:text-[18px] leading-relaxed max-w-[700px] mx-auto mb-12">
            {description}
          </p>
        )}

        {/* Steps */}
        {steps && steps.length > 0 && (
          <div className="relative flex flex-col md:flex-row md:justify-between items-center gap-10 md:gap-6 mt-10">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center md:w-[30%] bg-white rounded-[16px] shadow-sm hover:shadow-md transition-all duration-300 p-6"
              >
                {/* Icon */}
                {step.icon?.url && (
                  <div className="w-[72px] h-[72px] rounded-full bg-[#EAF4FF] flex items-center justify-center mb-5">
                    <img
                      src={step.icon.url}
                      alt={step.title || ""}
                      className="w-[36px] h-[36px] object-contain"
                    />
                  </div>
                )}

                {/* Step Number */}
                <div className="text-[14px] font-semibold text-[#0071E3] mb-1">
                  Step {idx + 1}
                </div>

                {/* Title */}
                {step.title && (
                  <h3 className="text-[18px] md:text-[20px] font-semibold text-[#111] leading-snug mb-2">
                    {step.title}
                  </h3>
                )}

                {/* Description */}
                {step.description && (
                  <p className="text-[#555] text-[15px] leading-relaxed">
                    {step.description}
                  </p>
                )}
              </div>
            ))}

            {/* Decorative connectors for desktop */}
            <div className="hidden md:block absolute top-[110px] left-0 right-0 h-[2px] bg-gradient-to-r from-[#E0E0E0] via-[#CCC] to-[#E0E0E0] -z-10"></div>
          </div>
        )}
      </div>
    </section>
  );
}
