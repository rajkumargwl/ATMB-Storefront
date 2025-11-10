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
 
export function RefferalBottomBanner({ data }: RenterReferralBannerProps) {
  const {
   sectionTitle: heading = '',
    description,
    image,
    buttonText = 'Join The Program',
    buttonLink = '#',
  } = data || {};
 
  return (
    <section className="bg-DarkOrange relative flex flex-col  items-center justify-between text-white md:px-5  overflow-hidden">
      <div className="relative z-[3] max-w-[1240px] mx-auto w-full flex flex-col md:flex-row gap-[0] md:gap-[60px] lg:gap-[251px]">
        {/* Text Section */}
        <div className="relative z-[4] w-full md:w-[57.3%] lg:w-[60%] pb-[0] pt-[100px] md:py-[60px] lg:py-[100px] flex flex-col justify-center px-5 md:px-[0]">
          {heading && (
            <h2 className="max-w-[594px] font-Roboto text-white font-semibold leading-[38.4px] md:leading-[43.2px] text-[32px] md:text-[36px] tracking-[-0.48px] md:tracking-[-0.54px]">
              {heading}
            </h2>
          )}
 
          {description && (
            <p className="mt-6 text-white font-Roboto text-[16px] md:text-[18px] leading-[1.5] font-normal">
              {description}
            </p>
          )}
 
          {buttonText && (
            <a
              href={buttonLink || '#'}
              className="mt-4 flex items-center justify-center w-[180px] h-[52px] md:h-[52px] rounded-[100px] font-normal leading-[16px] tracking-[0.08px] text-[16px] text-PrimaryBlack bg-white px-4 py-[12px] border border-PrimaryBlack transition-all  hover:bg-PrimaryBlack hover:text-white"
            >
              {buttonText}
            </a>
          )}
        </div>
 
        {/* Image Section */}
        {image?.url && (
          <div className="w-full md:w-[42.7%] lg:w-[40%] relative z-[4] flex items-center justify-end md:justify-start px-5 md:px-[0px]">
            <img
              src={image.url}
              alt="Referral banner image"
              className="w-[262px] h-full object-contain object-bottom"
            />
          </div>
        )}
      </div>
    </section>
  );
}
 