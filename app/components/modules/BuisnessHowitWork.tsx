import React from "react";

type Step = {
  heading?: string;
  text?: string;
  icon?: {
    url?: string;
  };
};


type BuisnessHowItWorkProps = {
  title?: string;
  description?: string;
  steps?: Step[];
  ctaText?: string;
  ctaUrl?: string;
};

export default function BuisnessHowitWork({ 
  title, 
  description, 
  steps = [], 
  ctaText, 
  ctaUrl 
}: BuisnessHowItWorkProps) {
  return (
    <section
      className="w-full bg-[#0C0C0C] text-white py-[40px] md:py-[60px] lg:py-[100px] px-5"
      aria-labelledby="buisness-howitwork-heading"
    >
      <div className="max-w-[1240px] mx-auto text-center">
        {/* Title */}
        {title && (
          <h2
            id="buisness-howitwork-heading"
            className="mb-5 max-w-[911px] mx-auto font-Roboto font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px]"
          >
            {title}
          </h2>
        )}

        {/* Description */}
        {description && (
          <p
            id="buisness-howitwork-desc"
            className="max-w-[911px] mx-auto font-Roboto text-gray-200 font-normal leading-[27px] text-[18px]"
          >
            {description}
          </p>
        )}

        {/* Steps */}
        <ul
          role="list"
          className="grid grid-cols-1 md:grid-cols-3 items-start justify-center gap-[40px] md:gap-10 mb-[44px] md:mb-[64px] mt-[44px] md:mt-[64px]"
        >
          {steps.map((step, idx) => (
            <li
              key={idx}
              role="listitem"
              tabIndex={0}
              aria-label={`${step.heading ?? ""}. ${step.text ?? ""}`}
              className="relative flex flex-col items-center text-center focus-within:outline-none focus-within:ring-2 focus-within:ring-DarkOrange rounded-lg"
            >
              {/* Icon */}
              {step?.icon?.url && (
  <div
    className="w-[60px] md:w-[80px] h-[60px] md:h-[80px] rounded-full bg-[#FF6600] flex items-center justify-center mb-5 md:mb-8"
    aria-hidden="true"
  >
    <img
      src={step.icon.url}
      alt=""
      className="w-6 md:w-8 h-6 md:h-8"
    />
  </div>
)}

              {/* Step Heading */}
              {step.heading && (
                <h3 className="text-center mb-3 md:mb-4 font-Roboto font-semibold leading-[27px] md:leading-[28px] text-[18px] md:text-[20px] tracking-[-0.3px]">
                  {step.heading}
                </h3>
              )}

              {/* Step Text */}
              {step.text && (
                <p className="text-center font-Roboto font-normal leading-[21px] md:leading-[24px] text-[14px] md:text-[16px] text-gray-300">
                  {step.text}
                </p>
              )}

              {/* Dashed Arrows (Alternate for Odd/Even Steps) */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block" aria-hidden="true">
                  {idx % 2 === 0 ? (
                    <div className="absolute right-[-85px] top-[33px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="169"
                        height="25"
                        viewBox="0 0 169 25"
                        fill="none"
                        className="w-[130px] lg:w-[169px]"
                      >
                        <path
                          d="M168.533 4.77305C168.708 4.24933 168.425 3.68264 167.902 3.5073L159.367 0.649985C158.844 0.474646 158.277 0.757058 158.102 1.28077C157.926 1.80448 158.209 2.37118 158.732 2.54651L166.319 5.08635L163.779 12.6725C163.603 13.1962 163.886 13.7629 164.409 13.9382C164.933 14.1136 165.5 13.8311 165.675 13.3074L168.533 4.77305Z"
                          fill="#FF6600"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className="absolute right-[-85px] top-[30px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="169"
                        height="25"
                        viewBox="0 0 169 25"
                        fill="none"
                        className="w-[130px] lg:w-[169px]"
                      >
                        <path
                          d="M168.384 20.2262C168.559 20.7499 168.277 21.3166 167.753 21.492L159.219 24.3493C158.695 24.5246 158.129 24.2422 157.953 23.7185C157.778 23.1948 158.06 22.6281 158.584 22.4528L166.17 19.9129L163.63 12.3268C163.455 11.8031 163.737 11.2364 164.261 11.0611C164.785 10.8857 165.351 11.1681 165.527 11.6918L168.384 20.2262Z"
                          fill="#FF6600"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        {ctaText && (
          <a
            href={ctaUrl ?? "#"}
            className="flex items-center justify-center w-[249px] mx-auto md:w-[296px] h-[44px] md:h-[52px] rounded-full bg-[#FF6600] px-4 py-3 text-white font-Roboto font-medium text-[16px] leading-[16px] tracking-[0.08px] focus:outline-none focus:ring-4 focus:ring-[#FF6600]/50 focus:ring-offset-2 focus:ring-offset-[#0C0C0C]"
            aria-label={ctaText}
          >
            {ctaText}
          </a>
        )}
      </div>
    </section>
  );
}
