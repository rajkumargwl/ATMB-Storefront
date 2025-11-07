interface OperatorMailCenterProps {
  module: {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonLink?: string;
    backgroundColor?: string;
    textColor?: string;
  };
}
 
export function OperatorMailCenter({module}: OperatorMailCenterProps) {
  const {title, subtitle, buttonText, buttonLink, backgroundColor = '#FF6600', textColor = '#FFFFFF'} = module;
 
 
  return (
    <section
      className="px-5 py-[40px] md:py-[60px] lg:py-[80px] bg-PrimaryBlack relative z-[2] overflow-hidden"
      // style={{backgroundColor, color: textColor}}
    >
       <div className="absolute hidden md:block z-[1] md:bottom-[-35px] md:right-[0px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="650" height="368" viewBox="0 0 650 368" fill="none">
          <g filter="url(#filter0_f_2348_31940)">
            <path d="M411.881 248.27C401.099 253.922 394.495 230.028 382.786 226.704C370.853 223.317 357.913 226.101 346.004 229.57C331.506 233.793 316.091 238.323 305.594 249.188C294.942 260.212 276.999 279.042 286.863 290.777C303.962 311.119 344.216 295.996 361.734 315.977C371.288 326.875 344.748 340.423 343.008 354.817C341.04 371.113 334.911 404.552 351.227 402.944C376.574 400.446 381.924 361.035 404.26 348.782C411.576 344.769 418.013 357.857 424.944 362.506C440.834 373.163 455.265 403.319 472.141 394.306C488.214 385.722 468.288 358.503 466.405 340.363C465.509 331.723 462.92 323.285 463.873 314.652C464.667 307.461 466.661 299.924 471.465 294.519C489.283 274.474 527.986 267.058 529.966 240.299C531.328 221.889 491.642 239.148 476.32 228.877C463.656 220.388 468.593 184.983 453.998 189.376C430.704 196.386 433.43 236.975 411.881 248.27Z" fill="#FF6600"/>
          </g>
          <defs>
            <filter id="filter0_f_2348_31940" x="0" y="-95" width="814" height="782" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="142" result="effect1_foregroundBlur_2348_31940"/>
            </filter>
          </defs>
        </svg>
        </div>
      <div className="mx-auto max-w-[1240px] text-center relative z-[2] flex flex-col items-center">
        {title && (
          <h2 className="max-w-[856px] mx-auto mb-8 text-center font-Roboto text-white font-semibold leading-[38.4px] md:leading-[61.6px] text-[32px] md:text-[56px] tracking-[-0.48px] md:tracking-[-1.12px]">
            {title}
          </h2>
        )}
        
        {subtitle && (
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        
          {buttonText && (
            buttonLink ? (
              <a
                href={buttonLink}
                className="flex items-center justify-center bg-DarkOrange text-white font-medium font-Roboto leading-[16px] text-[16px] tracking-[0.08px] py-[12px]  px-4 rounded-full w-full md:w-[221px] h-[52px] md:h-[52px]"
                >
                {buttonText}
              </a>
            ) : (
              <button
                className="flex items-center justify-center bg-DarkOrange text-white font-medium font-Roboto leading-[16px] text-[16px] tracking-[0.08px] py-[12px]  px-4 rounded-full w-full md:w-[221px] h-[52px] md:h-[52px] transition-all  hover:bg-[#DF5D07] hover:text-white"
              >
                {buttonText}
              </button>
            )
          )}
      </div>
    </section>
  );
}
 