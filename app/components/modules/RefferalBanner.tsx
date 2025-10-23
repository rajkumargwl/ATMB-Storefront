import React from 'react';

interface RenterReferralBannerProps {
  data: {
    _key?: string;
    _type?: string;
    buttonLink?: string | null;
    buttonText?: string;
    image?: {
      url?: string;
    };
    sectionTitle?: string;
    description?: string;
  };
}

export function RefferalBanner({ data }: RenterReferralBannerProps) {
  const {
   sectionTitle: heading = '',
    description,
    image,
    buttonText = 'Join The Program',
    buttonLink = '#',
  } = data || {};

  return (
    <section className="bg-[#FF6600] px-5 py-[60px] md:py-[80px]">
      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row justify-between items-center gap-[40px] md:gap-[60px]">
        {/* Text Section */}
        <div className="w-full md:w-1/2">
          {heading && (
            <h2 className="font-Roboto text-white font-semibold text-[24px] md:text-[40px] leading-[1.3] tracking-tight">
              {heading}
            </h2>
          )}

          {description && (
            <p className="mt-3 text-white font-Roboto text-[16px] md:text-[18px] leading-[1.5] font-normal">
              {description}
            </p>
          )}

          {buttonText && (
            <a
              href={buttonLink || '#'}
              className="inline-flex items-center justify-center mt-6 bg-white text-[#000000] font-Roboto font-medium text-[16px] md:text-[18px] px-6 py-3 rounded-full border border-white hover:bg-transparent hover:text-white transition-all duration-300"
            >
              {buttonText}
            </a>
          )}
        </div>

        {/* Image Section */}
        {image?.url && (
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <img
              src={image.url}
              alt="Referral banner image"
              className="w-full max-w-[400px] md:max-w-[460px] h-auto object-contain"
            />
          </div>
        )}
      </div>
    </section>
  );
}
