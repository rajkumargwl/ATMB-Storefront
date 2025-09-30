import React from "react";

type Step = {
  icon?: {
    url?: string;
  };
  title?: string;
  text?: string;
};

type StepsSectionProps = {
  heading?: string;
  description?: string;
  steps?: Step[];
  ctaText?: string;
  ctaUrl?: string | null;
};

export default function StepsSection({
  heading,
  description,
  steps,
  ctaText,
  ctaUrl,
}: StepsSectionProps) {
  return (
    <section className="w-full bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        {heading && (
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {heading}
          </h2>
        )}

        {/* Description */}
        {description && (
          <p className="text-base text-gray-600 max-w-3xl mx-auto mb-12">
            {description}
          </p>
        )}

        {/* Steps */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 mb-12">
          {steps?.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center max-w-xs relative">
              {/* Icon */}
              {step.icon?.url && (
                <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center mb-4">
                  <img
                    src={step.icon.url}
                    alt={step.title || ""}
                    className="w-8 h-8"
                  />
                </div>
              )}
              {/* Title */}
              {step.title && (
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
              )}
              {/* Text */}
              {step.text && (
                <p className="text-sm text-gray-600">{step.text}</p>
              )}

              {/* Dashed arrow (only show between steps) */}
              {idx < (steps.length ?? 0) - 1 && (
                <div className="hidden md:block absolute right-[-70px] top-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    height="20"
                    fill="none"
                    viewBox="0 0 60 20"
                  >
                    <path
                      d="M0 10h55M55 10l-5-5m5 5l-5 5"
                      stroke="#f97316"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        {ctaText && (
          <a
            href={ctaUrl ?? "#"}
            className="inline-block px-8 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition"
          >
            {ctaText}
          </a>
        )}
      </div>
    </section>
  );
}
