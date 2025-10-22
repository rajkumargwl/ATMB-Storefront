import React from "react";
 
type FeatureCategory = {
  categoryTitle: string;
  features: string[];
  icon?: {
    url?: string;
    alt?: string;
  };
};
 
type PdpCommonFeaturesSectionProps = {
  heading: string;
  subHeading?: string;
  featureCategories?: FeatureCategory[];
};
 
const PdpCommonFeaturesSection: React.FC<{ data: PdpCommonFeaturesSectionProps }> = ({ data }) => {
  if (!data) return null;
 
  const { heading, subHeading, featureCategories = [] } = data;
 
  return (
    <section
      className="bg-PrimaryBlack text-white py-[40px] md:py-[60px] lg:py-[100px] px-5 relative z-[2] overflow-hidden"
      aria-labelledby="common-features-heading">
        <div className="hidden md:flex absolute z-[1] top-[0px] left-[0px]">
          <svg xmlns="http://www.w3.org/2000/svg" width="511" height="518" viewBox="0 0 511 518" fill="none">
            <g opacity="0.8" filter="url(#filter0_f_4061_50033)">
              <path d="M108.881 79.2699C98.0988 84.9219 91.4949 61.0277 79.7856 57.7039C67.8528 54.3166 54.9135 57.1009 43.0041 60.5698C28.5064 64.7926 13.0914 69.3231 2.59352 80.1879C-8.05814 91.2117 -26.001 110.042 -16.1367 121.777C0.961899 142.119 41.2163 126.996 58.7342 146.977C68.2879 157.875 41.7475 171.423 40.0085 185.817C38.0397 202.113 31.9105 235.552 48.2274 233.944C73.5744 231.446 78.9243 192.035 101.26 179.782C108.576 175.769 115.013 188.857 121.944 193.506C137.834 204.163 152.265 234.319 169.141 225.306C185.214 216.722 165.288 189.503 163.405 171.363C162.509 162.723 159.92 154.285 160.873 145.652C161.667 138.461 163.661 130.924 168.465 125.519C186.283 105.474 224.986 98.0582 226.966 71.2985C228.328 52.889 188.642 70.1477 173.32 59.8774C160.656 51.3883 165.593 15.9832 150.998 20.3757C127.704 27.3857 130.43 67.9746 108.881 79.2699Z" fill="#FF6600"/>
            </g>
            <defs>
              <filter id="filter0_f_4061_50033" x="-303" y="-264" width="814" height="782" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="142" result="effect1_foregroundBlur_4061_50033"/>
              </filter>
            </defs>
          </svg>
        </div>
         <div className="flex md:hidden absolute z-[1] top-[0px] left-[0px]">
         <svg xmlns="http://www.w3.org/2000/svg" width="393" height="428" viewBox="0 0 393 428" fill="none">
            <g filter="url(#filter0_f_4061_49733)">
              <path d="M37.7303 25.4218C29.4901 29.7532 24.4433 11.4418 15.4947 8.89457C6.37532 6.2987 -3.51328 8.43245 -12.6148 11.0908C-23.6943 14.327 -35.4749 17.799 -43.4977 26.1253C-51.6379 34.5735 -65.3504 49.0042 -57.8118 57.9976C-44.7446 73.5868 -13.9811 61.9971 -0.593399 77.3099C6.70782 85.6609 -13.5751 96.0438 -14.9041 107.075C-16.4087 119.564 -21.0928 145.189 -8.62294 143.957C10.7479 142.043 14.8364 111.84 31.9064 102.45C37.4974 99.3742 42.4164 109.405 47.7131 112.967C59.8569 121.134 70.8857 144.244 83.7822 137.337C96.0657 130.759 80.8382 109.899 79.3993 95.9974C78.714 89.3766 76.7358 82.9099 77.4639 76.2937C78.0703 70.7829 79.5942 65.0069 83.2656 60.8652C96.8826 45.5038 126.461 39.8203 127.974 19.3129C129.015 5.20469 98.6857 18.4309 86.9766 10.5603C77.2982 4.05461 81.0713 -23.0783 69.9168 -19.7121C52.1152 -14.3399 54.1982 16.7656 37.7303 25.4218Z" fill="#FF6600"/>
            </g>
            <defs>
              <filter id="filter0_f_4061_49733" x="-344" y="-304" width="756" height="732" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="142" result="effect1_foregroundBlur_4061_49733"/>
              </filter>
            </defs>
          </svg>
        </div>
      <div className="max-w-[1240px] mx-auto relative z-[2]">
        <div className="flex flex-col md:items-center justify-center gap-4 md:gap-5 mb-[32px] md:mb-[64px]">
          {/* Section Heading */}
          <h2
            id="common-features-heading"
            className="text-center font-Roboto text-white font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]"
          >
            {heading}
          </h2>
          {subHeading && (
            <p className="text-center font-Roboto text-white font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px]">{subHeading}</p>
          )}
        </div>
 
        {/* Feature Categories Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
        >
          {featureCategories.map((category, idx) => (
            <div
              key={idx}
              role="listitem"
              className="bg-white rounded-[12px] p-6 border border-LightWhite md:min-h-[474px]"
            >
              {/* Category Header */}
              <div className="flex flex-row gap-3 mb-4 items-center">
                {category.icon?.url && (
                  <div className="bg-DarkOrange w-9 h-9 rounded-full flex items-center justify-center">
                    <img
                      src={category.icon.url}
                      alt={category.icon.alt || ""}
                      className="w-4 h-4"
                      aria-hidden={!category.icon.alt}
                    />
                  </div>
                )}
                <h3 className="font-Roboto text-PrimaryBlack font-medium md:font-semibold leading-[18px] md:leading-[28px] text-[18px] md:text-[20px] tracking-[0.09px] md:tracking-[-0.3px]">
                  {category.categoryTitle}
                </h3>
              </div>
 
              {/* Feature List */}
              <ul className="list-disc list-inside flex flex-col gap-4">
                {category.features?.map((item, i) => (
                  <li key={i} className="pl-1 md:pl-2 font-Roboto text-PrimaryBlack font-normal leading-[14px] md:leading-[14px] text-[14px] md:text-[14px] tracking-[0.07px]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
 
export default PdpCommonFeaturesSection;