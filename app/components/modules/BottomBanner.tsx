import React from 'react';
 
interface BottomBanner {
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
 
export function BottomBanner({ data }: BottomBanner) {
  const {
   sectionTitle: heading = '',
    description,
    image,
    buttonText = 'Join The Program',
    buttonLink = '#',
  } = data || {};
 
  return (
   <section className="bg-DarkOrange relative flex flex-col  items-center justify-between text-white px-5 py-[60px]  overflow-hidden">
      <div className="relative z-[3] max-w-[1240px] mx-auto w-full flex flex-col md:flex-row gap-[40px] md:gap-[24px]">
        {/* Text Section */}
        <div className="relative z-[4] w-full md:w-[60.3%] order-2 md:order-1  flex flex-col justify-center">
          {heading && (
            <h2 className="max-w-[707px] text-center md:text-left font-Roboto text-white font-semibold leading-[38.4px] md:leading-[61.6px] text-[32px] md:text-[56px] tracking-[-0.48px] md:tracking-[-1.12px]">
              {heading}
            </h2>
          )}
 
          {description && (
            <p className="mt-8 text-white font-Roboto text-[16px] md:text-[18px] leading-[1.5] font-normal">
              {description}
            </p>
          )}
 
          {buttonText && (
            <a
              href={buttonLink || '#'}
              className="mt-8 flex items-center justify-center w-full md:w-[221px] h-[52px] md:h-[52px] rounded-[100px] font-normal leading-[16px] tracking-[0.08px] text-[16px] text-PrimaryBlack bg-white px-4 py-[12px] border border-PrimaryBlack transition-all  hover:bg-PrimaryBlack hover:text-white"
            >
              {buttonText}
            </a>
          )}
        </div>
 
        {/* Image Section */}
        {image?.url && (
          <div className="w-full md:w-[39.7%] order-1 md:order-2 relative z-[4] flex items-center">
            <img
              src={image.url}
              alt="Referral banner image"
              className="w-full md:w-[431px] h-auto md:h-[344px] object-contain"
            />
          </div>
        )}
      </div>
    </section>
  );
}
 