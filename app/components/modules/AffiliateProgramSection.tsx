import React from "react";
 
type AffiliateProgramSectionProps = {
  label?: string;
  heading?: string;
  description?: string | null;
  ctaText?: string;
  ctaUrl?: string | null;
  image?: {
    url?: string;
    alt?: string;
  };
};
 
export default function AffiliateProgramSection({
  label,
  heading,
  description,
  ctaText,
  ctaUrl,
  image,
}: AffiliateProgramSectionProps) {
  return (
    <section className="px-5 py-[40px] md:py-[54px] bg-white">
      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row gap-[62px] lg:gap-[62px] items-center">
      {/* Left Side */}
      <div className="w-full md:w-[48.1%] space-y-5 md:space-y-5">
        {label && (
          <p className="font-Roboto text-LightGray font-medium leading-[27px] md:leading-[28px] text-[18px] md:text-[20px] tracking-[0px]">{label}</p>
        )}
        {heading && (
          <h2 className="max-w-[464px] font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]">
            {heading}
          </h2>
        )}
        {description && (
          <p className="text-base text-gray-600 mb-6">{description}</p>
        )}
        {ctaText && (
          <a
            href={ctaUrl ?? "#"}
            className="flex items-center justify-center w-full md:w-[249px] h-[44px] md:h-[52px] rounded-full bg-DarkOrange px-4 py-3 text-white  font-Roboto font-normal text-[16px] md:text-[16px] leading-[16px] tracking-[0.08px] "
          >
            {ctaText}
          </a>
        )}
      </div>
 
      {/* Right Side (Image) */}
      {image?.url && (
        <div className="w-full md:w-[51.9%] relative">
          <img
            src={image.url}
            alt={image.alt || "Affiliate Program"}
            className="rounded-[20px] w-full max-h-[400px] object-cover"
          />
        </div>
      )}
      </div>
    </section>
  );
}