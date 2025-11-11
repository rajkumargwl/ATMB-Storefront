import React from "react";
import { Check } from "lucide-react";

type PartnerLogo = {
  alt: string;
  logo: {
    url: string;
  };
};


type Icon = {
  url: string;
};

type Props = {
  companyName: string;
  designation: string;
  
  highlightsTitle: string;
  highlights: string[];
  partnerLogos: PartnerLogo[];
  icon: Icon;
  isVerified: boolean;
  location?: any;
};

const PdpMailCenterHighlightsSection: React.FC<Props> = ({
  companyName,
  designation,
  highlightsTitle,
  highlights,
  partnerLogos,
  icon,
  isVerified,
  location,
}) => {
  const hasHighlights = highlights && highlights.length > 0;

  return (
    <section className="px-5 py-[40px] bg-PrimaryBlack relative z-[2] overflow-hidden">
      {/* Background SVGs */}
      <div className="hidden md:flex absolute z-[1] top-[0px] left-[0px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="530" height="196" viewBox="0 0 530 196" fill="none">
          <g filter="url(#filter0_f_3370_46520)">
            <path
              d="M127.881 91.6762C117.099 97.3281 110.495 73.434 98.7856 70.1101C86.8528 66.7228 73.9135 69.5071 62.0041 72.976C47.5064 77.1988 32.0914 81.7294 21.5935 92.5941C10.9419 103.618 -7.00099 122.448 2.86325 134.184C19.9619 154.526 60.2163 139.403 77.7342 159.384C87.2879 170.281 60.7475 183.829 59.0085 198.224C57.0397 214.52 50.9105 247.958 67.2274 246.35C92.5744 243.853 97.9243 204.441 120.26 192.188C127.576 188.175 134.013 201.264 140.944 205.912C156.834 216.569 171.265 246.725 188.141 237.712C204.214 229.128 184.288 201.909 182.405 183.769C181.509 175.129 178.92 166.691 179.873 158.058C180.667 150.867 182.661 143.33 187.465 137.925C205.283 117.881 243.986 110.464 245.966 83.7048C247.328 65.2953 207.642 82.5539 192.32 72.2837C179.656 63.7946 184.593 28.3895 169.998 32.7819C146.704 39.792 149.43 80.3809 127.881 91.6762Z"
              fill="#FF6600"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_3370_46520"
              x="-284"
              y="-251.594"
              width="814"
              height="782"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="142" result="effect1_foregroundBlur_3370_46520" />
            </filter>
          </defs>
        </svg>
      </div>

      {/* Mobile Background */}
      <div className="flex md:hidden absolute z-[1] top-[0px] right-[0px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="393" height="782" viewBox="0 0 393 782" fill="none">
          <g filter="url(#filter0_f_3065_39219)">
            <path
              d="M294.881 343.27C284.099 348.922 277.495 325.028 265.786 321.704C253.853 318.317 240.913 321.101 229.004 324.57C214.506 328.793 199.091 333.323 188.594 344.188C177.942 355.212 159.999 374.042 169.863 385.777C186.962 406.119 227.216 390.996 244.734 410.977C254.288 421.875 227.748 435.423 226.008 449.817C224.04 466.113 217.911 499.552 234.227 497.944C259.574 495.446 264.924 456.035 287.26 443.782C294.576 439.769 301.013 452.857 307.944 457.506C323.834 468.163 338.265 498.319 355.141 489.306C371.214 480.722 351.288 453.503 349.405 435.363C348.509 426.723 345.92 418.285 346.873 409.652C347.667 402.461 349.661 394.924 354.465 389.519C372.283 369.474 410.986 362.058 412.966 335.299C414.328 316.889 374.642 334.148 359.32 323.877C346.656 315.388 351.593 279.983 336.998 284.376C313.704 291.386 316.43 331.975 294.881 343.27Z"
              fill="#FF6600"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_3065_39219"
              x="-117"
              y="0"
              width="814"
              height="782"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="142" result="effect1_foregroundBlur_3065_39219" />
            </filter>
          </defs>
        </svg>
      </div>

      {/* Content */}
      <div
        className={`max-w-[1240px] mx-auto flex flex-col md:flex-row gap-9 md:gap-6 relative z-[2] ${
          hasHighlights ? "" : "items-center justify-center text-center"
        }`}
      >
        {/* Left Section */}
        <div
          className={`w-full ${
            hasHighlights ? "md:w-[31.5%]" : "md:w-full flex flex-col items-center justify-center text-center"
          }`}
        >
          <div className={`flex items-center gap-2 mb-1 ${!hasHighlights ? "justify-center" : ""}`}>
            <h2 className="font-Roboto text-white font-medium leading-[28px] text-[20px]">
              {location?.displayName}
            </h2>
            {isVerified && icon?.url && (
              <img src={icon.url} alt="verified" className="w-6 h-6" />
            )}
          </div>
          <p className="font-Roboto text-white text-[12px] leading-[18px]">{designation}</p>

          <div className="flex flex-wrap gap-2 mt-6">
              {partnerLogos?.map((partner, index) => (
              <div
                key={index}
                className="w-[54px] h-[33px] bg-white rounded-[3px] flex items-center justify-center border border-LightWhite"
              >
                  <img
        src={partner.logo?.url}
        alt={partner.alt || `partner-logo-${index}`}
        className="w-auto h-auto object-contain"
      />
              </div>
            ))}
          </div>
        </div>

        {/* Right Section — only render if highlights exist */}
        {hasHighlights && (
          <div className="w-full md:w-[68.5%] flex flex-col">
            <h3 className="font-Roboto text-white font-medium text-[20px] leading-[28px] mb-4">
              {highlightsTitle || "Location Key Highlights"}
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-4 md:gap-y-6 gap-x-2 md:gap-x-6">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-center gap-2 md:gap-3">
                  <span className="flex items-center justify-center w-6 h-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 17 16" fill="none">
                      <path
                        d="M16.5544 0.110975C16.8206 0.305975 16.8806 0.680975 16.6856 0.950975L6.18563 15.351C6.08063 15.4935 5.92313 15.5835 5.74688 15.5947C5.57063 15.606 5.40188 15.546 5.27438 15.4222L0.174375 10.3222C-0.058125 10.0897 -0.058125 9.70722 0.174375 9.47472C0.406875 9.24222 0.789375 9.24222 1.02188 9.47472L5.62688 14.0797L15.7144 0.245975C15.9094 -0.0202754 16.2844 -0.0802754 16.5544 0.114725V0.110975Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                  <span className="font-Roboto text-white text-[16px] leading-[24px]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PdpMailCenterHighlightsSection;
