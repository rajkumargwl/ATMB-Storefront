import React from "react";
 
interface Card {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string | null;
  image?: { url?: string };
}
 
interface SolutionMailboxLocationHowItWorksProps {
  data?: {
    title?: string;
    subtitle?: string;
    cards?: Card[];
  };
}
 
const SolutionMailboxLocationHowItWorks: React.FC<SolutionMailboxLocationHowItWorksProps> = ({
  data,
}) => {
  return (
    <section className="bg-PrimaryBlack py-[40px] md:py-[60px] lg:py-[100px] px-5 relative z-[2] overflow-hidden">
      <div className="absolute z-[1] right-[0px] bottom-[-168px] hidden md:flex">
        <svg xmlns="http://www.w3.org/2000/svg" width="600" height="783" viewBox="0 0 600 783" fill="none">
          <g filter="url(#filter0_f_3890_38330)">
            <path d="M411.881 343.818C401.099 349.47 394.495 325.576 382.786 322.252C370.853 318.865 357.913 321.649 346.004 325.118C331.506 329.341 316.091 333.871 305.594 344.736C294.942 355.76 276.999 374.59 286.863 386.326C303.962 406.668 344.216 391.545 361.734 411.526C371.288 422.423 344.748 435.971 343.008 450.366C341.04 466.662 334.911 500.1 351.227 498.492C376.574 495.995 381.924 456.583 404.26 444.33C411.576 440.317 418.013 453.406 424.944 458.054C440.834 468.711 455.265 498.867 472.141 489.854C488.214 481.27 468.288 454.051 466.405 435.911C465.509 427.272 462.92 418.833 463.873 410.2C464.667 403.009 466.661 395.472 471.465 390.068C489.283 370.023 527.986 362.607 529.966 335.847C531.328 317.437 491.642 334.696 476.32 324.426C463.656 315.937 468.593 280.532 453.998 284.924C430.704 291.934 433.43 332.523 411.881 343.818Z" fill="#FF6600"/>
          </g>
          <defs>
            <filter id="filter0_f_3890_38330" x="0" y="0.54834" width="814" height="782" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="142" result="effect1_foregroundBlur_3890_38330"/>
            </filter>
          </defs>
        </svg>
      </div>
      <div className="max-w-[984px] mx-auto relative z-[2]">
        {/* Title + Subtitle */}
         <div className="flex flex-col items-center justify-center gap-4 md:gap-5 mb-[44px] md:mb-[64px]">
          <h2 className="text-center font-Roboto text-white font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]">{data?.title || ""}</h2>
          <p className="text-center font-Roboto text-white font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px]">{data?.subtitle || ""}</p>
        </div>
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data?.cards?.map((card, index) => (
            <div
              key={index}
              className="bg-[#F6F6F6] rounded-[24px] p-6 border border-LightWhite overflow-hidden text-left flex flex-col"
            >
              {/* Image */}
              {card?.image?.url && (
                <img
                  src={card.image.url}
                  alt={card?.title || "Card image"}
                  className="w-full h-[242px] md:h-auto object-cover rounded-[12px]"
                />
              )}
 
              {/* Content */}
              <div className="flex flex-col mt-8">
                <h3 className="mb-4 font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[31.2px] text-[24px] md:text-[24px] tracking-[-0.36px] md:tracking-[-0.36px]">
                  {card?.title || ""}
                </h3>
                <p className="font-Roboto text-PrimaryBlack font-normal leading-[27px] md:leading-[27px] text-[18px] md:text-[18px] tracking-[0px]">
                  {card?.description || ""}
                </p>
 
                {/* Button */}
                {card?.buttonText && (
                  <div className="mt-8">
                    <a
                      href={card?.buttonLink || "/sublocations"}
                      className="flex items-center justify-center bg-DarkOrange text-white font-normal font-Roboto leading-[16px] text-[16px] tracking-[0.08px] py-[12px]  px-4 rounded-full w-full h-[52px]"
                    >
                      {card.buttonText}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )) || null}
        </div>
      </div>
    </section>
  );
};
 
export default SolutionMailboxLocationHowItWorks;