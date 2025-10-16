import React from "react";
 
type Award = {
  icon: { url: string };
  title: string;
  subTitle: string;
};
 
type MediaCoverage = {
  link?: string | null;
  logo: { url: string };
};
 
type IndustryPartner = {
  link?: string | null;
  logo: { url: string };
  name: string;
};
 
type Props = {
  heading: string;
  awards: Award[];
  mediaCoverage: MediaCoverage[];
  industryPartners: IndustryPartner[];
};
 
const BusinessIndustryRecognitionSection: React.FC<Props> = ({
  heading,
  awards,
  mediaCoverage,
  industryPartners,
}) => {
  return (
    <section className="px-5 py-[40px] md:py-[60px] lg:py-[80px] bg-PrimaryBlack relative z-[2] overflow-hidden">
      <div className="absolute z-[1] bottom-[-50px] right-[-40px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="490" height="449" viewBox="0 0 490 449" fill="none">
            <g filter="url(#filter0_f_4557_66940)">
              <path d="M411.881 343.68C401.099 349.332 394.495 325.437 382.786 322.114C370.853 318.726 357.913 321.511 346.004 324.979C331.506 329.202 316.091 333.733 305.594 344.598C294.942 355.621 276.999 374.452 286.863 386.187C303.962 406.529 344.216 391.406 361.734 411.387C371.288 422.284 344.748 435.833 343.008 450.227C341.04 466.523 334.911 499.962 351.227 498.354C376.574 495.856 381.924 456.445 404.26 444.192C411.576 440.178 418.013 453.267 424.944 457.915C440.834 468.572 455.265 498.728 472.141 489.716C488.214 481.132 468.288 453.913 466.405 435.772C465.509 427.133 462.92 418.695 463.873 410.061C464.667 402.87 466.661 395.333 471.465 389.929C489.283 369.884 527.986 362.468 529.966 335.708C531.328 317.299 491.642 334.557 476.32 324.287C463.656 315.798 468.593 280.393 453.998 284.785C430.704 291.795 433.43 332.384 411.881 343.68Z" fill="#FF6600"/>
            </g>
            <defs>
              <filter id="filter0_f_4557_66940" x="0" y="0.409668" width="814" height="782" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="142" result="effect1_foregroundBlur_4557_66940"/>
              </filter>
            </defs>
        </svg>
      </div>
      <div className="max-w-[1240px] mx-auto relative z-[2]">
        {/* Heading */}
        <h2 className="mb-[44px] md:mb-[64px] font-Roboto text-white font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]">
          {heading}
        </h2>
 
        <div className="grid md:grid-cols-3 gap-[64px] md:gap-[48px]">
          {/* Awards & Certificates */}
          <div className="flex flex-col items-start gap-6 pr-[50px] relative after:content-[''] after:absolute after:w-[100%] md:after:w-[1px] after:h-[1px] md:after:h-[100%] after:bg-LightWhite after:opacity-40 after:bottom-[-32px] md:after:bottom-[auto] md:after:top-0 after:right-[0px] md:after:right-[-24px]">
            <h3 className="font-Roboto text-white font-semibold leading-[28px] md:leading-[31.2px] text-[20px] md:text-[24px] tracking-[-0.3px] md:tracking-[-0.36px]">
              Awards & Certificates
            </h3>
            <div className="flex flex-col gap-6">
              {awards.map((award, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-left"
                >
                  <img
                    src={award.icon.url}
                    alt="Award Icon"
                    className="w-10 h-10  object-cover"
                  />
                  <div className="flex flex-col gap-2">
                    <p className="font-Roboto text-white font-medium leading-[27px] md:leading-[28px] text-[18px] md:text-[20px] tracking-[0px]">
                      {award.title}
                    </p>
                    <p className="font-Roboto text-white font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px]">{award.subTitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
 
          {/* Media & Press Coverage */}
          <div className="flex flex-col items-start gap-6 md:px-[50px]  relative after:content-[''] after:absolute after:w-[100%] md:after:w-[1px] after:h-[1px] md:after:h-[100%] after:bg-LightWhite after:opacity-40 after:bottom-[-32px] md:after:bottom-[auto] md:after:top-0 after:right-[0px] md:after:right-[-24px]">
            <h3 className="font-Roboto text-white font-semibold leading-[28px] md:leading-[31.2px] text-[20px] md:text-[24px] tracking-[-0.3px] md:tracking-[-0.36px]">
              Media & Press Coverage
            </h3>
            <div className="flex flex-col items-start gap-[20px] md:gap-[35px]">
              {mediaCoverage.map((media, idx) => (
                <div key={idx} className="flex justify-center">
                  <img
                    src={media.logo.url}
                    alt="Media logo"
                    className="w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
 
          {/* Industry Partnerships */}
          <div className="flex flex-col items-start gap-6 md:px-[50px]">
            <h3 className="font-Roboto text-white font-semibold leading-[28px] md:leading-[31.2px] text-[20px] md:text-[24px] tracking-[-0.3px] md:tracking-[-0.36px]">
              Industry Partnerships
            </h3>
            <div className="flex flex-col items-start gap-[20px] md:gap-[35px]">
              {industryPartners.map((partner, idx) => (
                <div key={idx} className="flex justify-center">
                  <img
                    src={partner.logo.url}
                    alt={partner.name}
                    className="w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
 
export default BusinessIndustryRecognitionSection;
 