import React from "react";
 
type JoinCtaBannerSectionProps = {
  heading: string;
  subText?: string;
  cta: {
    label: string;
    url?: string | null;
  };
  notification?: {
    avatar?: { url?: string };
    text?: string;
  };
  sideImage?: {
    url?: string;
  };
};
 
const JoinCtaBannerSection: React.FC<JoinCtaBannerSectionProps> = ({
  heading,
  subText,
  cta,
  notification,
  sideImage,
}) => {
  return (
    <section className="bg-DarkOrange relative flex flex-col  items-center justify-between text-white md:px-5  overflow-hidden">
      {/* Left Section */}
      <div className="hidden md:flex absolute z-[2] right-[238px] top-[50px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="674" height="542" viewBox="0 0 674 542" fill="none">
          <g filter="url(#filter0_f_4557_67097)">
            <path d="M341.881 206.68C331.099 212.332 324.495 188.437 312.786 185.114C300.853 181.726 287.913 184.511 276.004 187.979C261.506 192.202 246.091 196.733 235.594 207.598C224.942 218.621 206.999 237.452 216.863 249.187C233.962 269.529 274.216 254.406 291.734 274.387C301.288 285.284 274.748 298.833 273.008 313.227C271.04 329.523 264.911 362.962 281.227 361.354C306.574 358.856 311.924 319.445 334.26 307.192C341.576 303.178 348.013 316.267 354.944 320.915C370.834 331.572 385.265 361.728 402.141 352.716C418.214 344.132 398.288 316.913 396.405 298.772C395.509 290.133 392.92 281.695 393.873 273.061C394.667 265.87 396.661 258.333 401.465 252.929C419.283 232.884 457.986 225.468 459.966 198.708C461.328 180.299 421.642 197.557 406.32 187.287C393.656 178.798 398.593 143.393 383.998 147.785C360.704 154.795 363.43 195.384 341.881 206.68Z" fill="white"/>
          </g>
          <defs>
            <filter id="filter0_f_4557_67097" x="0" y="-66.5903" width="674" height="642" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="107" result="effect1_foregroundBlur_4557_67097"/>
            </filter>
          </defs>
        </svg>
      </div>
     
      <div className="relative z-[3] max-w-[1240px] mx-auto w-full flex flex-col md:flex-row gap-11 md:gap-6">
      <div className="relative z-[4] w-full md:w-[57.3%] lg:w-[67.3%] pb-[0] py-[40px] md:py-[60px] lg:py-[80px] flex flex-col justify-center px-5 md:px-[0]">
        <h2 className="mb-[12px] max-w-[556px] font-Roboto text-white font-semibold leading-[38.4px] md:leading-[61.6px] text-[32px] md:text-[56px] tracking-[-0.48px] md:tracking-[-1.12px]">
          {heading}
        </h2>
        {subText && (
          <p className="font-Roboto text-white font-normal leading-[27px] md:leading-[27px] text-[18px] md:text-[18px] tracking-[0px]">
            {subText}
          </p>
        )}
 
        {cta?.label && (
          <a
            href={cta.url ?? "#"}
            className="mt-8 flex items-center justify-center w-full md:w-[221px] h-[52px] md:h-[52px] rounded-[100px] font-medium leading-[16px] tracking-[0.08px] text-[16px] text-PrimaryBlack bg-white px-4 py-[12px]"
          >
            {cta.label}
          </a>
        )}
 
        {notification?.text && (
          <div className="flex items-center gap-2 mt-8">
            {notification?.avatar?.url && (
              <img
                src={notification.avatar.url}
                alt="User"
                className="w-10 h-10 rounded-full"
              />
            )}
            <p className="font-Roboto text-white font-medium leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px]">{notification.text}</p>
          </div>
        )}
      </div>
 
      {/* Right Image */}
      {sideImage?.url && (
        <div className="w-full md:w-[42.7%] lg:w-[32.7%] relative z-[4]">
          <img
            src={sideImage.url}
            alt="Join CTA"
            className="w-full md:w-[367px] h-[400px] md:h-full object-cover object-top"
          />
        </div>
      )}
      </div>
    </section>
  );
};
 
export default JoinCtaBannerSection;