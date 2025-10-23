import React from 'react';
 
type BrandLogo = {
  alt: string;
  url: string;
};
 
type CTA = {
  label: string;
  url?: string | null;
};
 
type Props = {
  title: string;
  description: string;
  trustedByText: string;
  ownerImage: { url: string };
  brandLogos?: BrandLogo[];
  primaryCta?: CTA;
  secondaryCta?: CTA;
};
 
export default function SmallBusinessOwnerSection({
  title,
  description,
  trustedByText,
  ownerImage,
  brandLogos = [],
  primaryCta,
  secondaryCta,
}: Props) {
  return (
    <section className="px-5 py-[40px] md:py-[60px] lg:pt-[74px] lg:pb-[79.5px] bg-white">
      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row gap-[44px] md:gap-[65px] items-start">
        {/* LEFT CONTENT */}
        <div className="w-full md:w-[54.21%] flex flex-col relative">
          <h1 className="md:pt-[24.5px] max-w-[481px] mb-4 md:mb-5 font-Roboto text-PrimaryBlack font-semibold leading-[43.2px] md:leading-[43.2px] text-[36px] md:text-[36px] tracking-[-0.54px] md:tracking-[-0.54px]">
            {title}
          </h1>
          <p className="max-w-[540px] mb-[32px] md:mb-[40px]  font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[27px] text-[14px] md:text-[18px] tracking-[0px]">{description}</p>
 
          {/* CTA BUTTONS */}
          <div className="flex flex-row gap-4 justify-start mb-[44px] md:mb-[108px]">
            {primaryCta?.label && (
              <a
                href={primaryCta.url || '#'}
                className="flex items-center justify-center w-full md:w-[192px] bg-DarkOrange text-white font-Roboto font-normal leading-[16px] text-[16px] tracking-[0.08px] h-[52px] px-[16px] py-[12px] rounded-[100px]"
              >
                {primaryCta.label}
              </a>
            )}
            {secondaryCta?.label && (
              <a
                href={secondaryCta.url || '#'}
                className="flex items-center justify-center w-full md:w-[192px] bg-white text-PrimaryBlack font-Roboto font-normal leading-[16px] text-[16px] tracking-[0.08px] h-[52px] px-[15px] md:px-[16px] py-[12px] rounded-[100px] border border-PrimaryBlack"
              >
                {secondaryCta.label}
              </a>
            )}
          </div>
 
          {/* TRUSTED TEXT */}
          <p className="mb-3 font-Roboto text-PrimaryBlack font-medium leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">{trustedByText}</p>
 
          {/* BRAND LOGOS */}
          {brandLogos.length > 0 && (
            <div className="flex flex-wrap items-center justify-start gap-x-8 gap-y-6">
              {brandLogos.map((logo, index) => (
                <img
                  key={index}
                  src={logo.url}
                  alt={logo.alt}
                  className="max-w-[100%] object-contain"
                />
              ))}
            </div>
          )}
        </div>
 
        {/* RIGHT IMAGE */}
        <div className="w-full md:w-[45.79%] relative w-full flex justify-center">
          <img
            src={ownerImage.url}
            alt="Small business owner"
            className="rounded-[20px]  object-contain"
          />
        </div>
      </div>
    </section>
  );
}
 