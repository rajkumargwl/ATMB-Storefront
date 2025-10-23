import React from 'react';

interface Step {
  title: string;
  description: string;
  icon?: {
    url?: string;
  };
}

interface ReferralStepProps {
  data: {
    heading?: string;
    subheading?: string;
    steps?: Step[];
  };
}

export function RefferalStep({ data }: ReferralStepProps) {
  const { heading, subheading, steps = [] } = data || {};

  return (
    <section className="bg-[#0F1114] text-white px-5 py-[60px] md:py-[80px]">
      <div className="max-w-[1240px] mx-auto text-center">
        {/* Heading */}
        {heading && (
          <h2 className="text-[24px] md:text-[36px] font-semibold leading-[1.3] font-Roboto">
            {heading}
          </h2>
        )}

        {/* Subheading */}
        {subheading && (
          <p className="text-[16px] md:text-[18px] font-Roboto text-[#B3B3B3] mt-2">
            {subheading}
          </p>
        )}

        {/* Steps */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[40px] md:gap-[60px] items-start relative">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center relative">
              {/* Icon */}
              {step.icon?.url && (
                <div className="bg-[#FF6600] w-[70px] h-[70px] rounded-full flex items-center justify-center mb-4">
                  <img
                    src={step.icon.url}
                    alt={step.title || 'Step Icon'}
                    className="w-[32px] h-[32px] object-contain"
                  />
                </div>
              )}

              {/* Title */}
              <h3 className="text-[18px] md:text-[20px] font-semibold mb-2 font-Roboto">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-[14px] md:text-[16px] leading-[1.5] text-[#CCCCCC] font-Roboto">
                {step.description}
              </p>

              {/* Dotted Arrow Between Steps (Desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-[35px] right-[-30px] w-[60px] border-t-2 border-dotted border-[#FF6600] transform translate-x-[50%]"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
