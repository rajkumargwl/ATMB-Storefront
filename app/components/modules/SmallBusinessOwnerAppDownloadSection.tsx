import React from "react";
 
interface AppButton {
   alt: string;
  icon: {
    url: string;
  };
  link?: string | null;
}
 
interface SmallBusinessOwnerAppDownloadSectionProps {
  title: string;
  description: string;
  image: {
    url: string;
  };
  buttons: AppButton[];
}
 
const SmallBusinessOwnerAppDownloadSection: React.FC<SmallBusinessOwnerAppDownloadSectionProps> = ({
  title,
  description,
  image,
  buttons,
}) => {
  return (
    <section className="bg-DarkOrange px-5 py-[40px] md:py-[60px] lg:py-[80px] relative z-[2] overflow-hidden">
         <div className="absolute z-[1] top-[0px] right-[250px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="694" height="514" viewBox="0 0 694 514" fill="none">
              <g filter="url(#filter0_f_4278_51689)">
                <path d="M352.278 132.255C340.619 138.383 333.478 112.479 320.817 108.875C307.914 105.203 293.923 108.222 281.045 111.982C265.369 116.56 248.7 121.472 237.349 133.25C225.831 145.202 206.43 165.616 217.096 178.338C235.585 200.391 279.112 183.996 298.054 205.658C308.384 217.472 279.686 232.16 277.806 247.765C275.677 265.431 269.05 301.682 286.693 299.939C314.101 297.232 319.886 254.505 344.038 241.222C351.948 236.871 358.908 251.06 366.403 256.1C383.585 267.653 399.189 300.345 417.437 290.575C434.816 281.269 413.271 251.76 411.235 232.094C410.266 222.728 407.467 213.58 408.497 204.22C409.355 196.425 411.511 188.254 416.706 182.395C435.972 160.664 477.823 152.624 479.963 123.613C481.436 103.655 438.523 122.366 421.956 111.232C408.262 102.028 413.601 63.6454 397.819 68.4073C372.631 76.0069 375.578 120.01 352.278 132.255Z" fill="white"/>
              </g>
              <defs>
                <filter id="filter0_f_4278_51689" x="0" y="-146" width="694" height="660" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                  <feGaussianBlur stdDeviation="107" result="effect1_foregroundBlur_4278_51689"/>
                </filter>
              </defs>
            </svg>
        </div>
 
       <div className="max-w-[1240px] mx-auto relative z-[2] flex flex-col md:flex-row gap-[40px] lg:gap-[205px]">
        {/* Left Content */}
        <div className="w-full md:w-[59%] flex flex-col justify-center">
          <h2 className="mb-[12px] max-w-[609px] font-Roboto text-white font-semibold leading-[38.4px] md:leading-[51.6px] lg:leading-[61.6px] text-[32px] md:text-[42px] lg:text-[56px] tracking-[-0.48px] md:tracking-[-1.12px]">
            {title}
          </h2>
          <p className="max-w-[610px] font-Roboto text-white font-normal leading-[21px] md:leading-[24px] text-[14px] md:text-[16px] tracking-[0px] mb-8">{description}</p>
 
          {/* Buttons */}
          <div className="flex gap-6">
            {buttons?.map((btn, index) => (
              <a
                key={index}
                href={btn.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={btn.icon?.url}
                 alt={btn.alt || `Download app button ${index + 1}`}
                  className="w-full object-cover"
                />
              </a>
            ))}
          </div>
        </div>
 
        {/* Right Image */}
        <div className="w-full md:w-[41%] flex flex-col items-center md:items-left">
          <img
            src={image?.url}
            alt="App preview"
            className="max-w-[231px] md:max-w-[358px] h-auto object-cover mb-[-80px] md:mb-[-80px]"
          />
        </div>
      </div>
    </section>
  );
};
 
export default SmallBusinessOwnerAppDownloadSection;
 