import React from "react";
import { PortableText } from "@portabletext/react";
import RealLifeImg from "~/components/media/real_life-img-bg2.svg";
 
interface Cta {
  label: string;
  url?: string | null;
}
 
interface ImageType {
  url: string;
}
 
interface DescriptionBlock {
  _key: string;
  _type: string;
  children: {
    _key: string;
    _type: string;
    marks: string[];
    text: string;
  }[];
  markDefs: any[];
  style: string;
}
 
interface BusinessSupportProps {
  title: string;
  description: DescriptionBlock[];
  cta: Cta;
  sideImage: ImageType;
}
 
const BusinessSupport: React.FC<{ data: BusinessSupportProps }> = ({ data }) => {
  const { title, description, cta, sideImage } = data;
 
  return (
    <section className="overflow-hidden relative bg-PrimaryBlack text-white py-[40px] md:py-[60px] lg:py-[100px] px-5">
      <div className="hidden md:flex absolute z-[1] top-[-20px] right-[0px] md:right-[0]">
          <svg xmlns="http://www.w3.org/2000/svg" width="530" height="478" viewBox="0 0 530 478" fill="none">
            <g filter="url(#filter0_f_4864_27726)">
              <path d="M411.881 39.2699C401.099 44.9219 394.495 21.0277 382.786 17.7039C370.853 14.3166 357.913 17.1009 346.004 20.5698C331.506 24.7926 316.091 29.3231 305.594 40.1879C294.942 51.2117 276.999 70.042 286.863 81.7774C303.962 102.119 344.216 86.9963 361.734 106.977C371.288 117.875 344.748 131.423 343.008 145.817C341.04 162.113 334.911 195.552 351.227 193.944C376.574 191.446 381.924 152.035 404.26 139.782C411.576 135.769 418.013 148.857 424.944 153.506C440.834 164.163 455.265 194.319 472.141 185.306C488.214 176.722 468.288 149.503 466.405 131.363C465.509 122.723 462.92 114.285 463.873 105.652C464.667 98.4606 466.661 90.9237 471.465 85.5192C489.283 65.4744 527.986 58.0582 529.966 31.2985C531.328 12.889 491.642 30.1477 476.32 19.8774C463.656 11.3883 468.593 -24.0168 453.998 -19.6243C430.704 -12.6143 433.43 27.9746 411.881 39.2699Z" fill="#FF6600"/>
            </g>
            <defs>
              <filter id="filter0_f_4864_27726" x="0" y="-304" width="814" height="782" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="142" result="effect1_foregroundBlur_4864_27726"/>
              </filter>
            </defs>
          </svg>
      </div>
       <div className="flex md:hidden absolute z-[1] bottom-[178px] right-[0px] md:right-[0]">
          <svg xmlns="http://www.w3.org/2000/svg" width="393" height="677" viewBox="0 0 393 677" fill="none">
            <g filter="url(#filter0_f_5144_23526)">
              <path d="M274.881 343.579C264.099 349.23 257.495 325.336 245.786 322.012C233.853 318.625 220.913 321.409 209.004 324.878C194.506 329.101 179.091 333.632 168.594 344.496C157.942 355.52 139.999 374.351 149.863 386.086C166.962 406.428 207.216 391.305 224.734 411.286C234.288 422.183 207.748 435.732 206.008 450.126C204.04 466.422 197.911 499.86 214.227 498.253C239.574 495.755 244.924 456.343 267.26 444.091C274.576 440.077 281.013 453.166 287.944 457.814C303.834 468.471 318.265 498.627 335.141 489.615C351.214 481.031 331.288 453.811 329.405 435.671C328.509 427.032 325.92 418.593 326.873 409.96C327.667 402.769 329.661 395.232 334.465 389.828C352.283 369.783 390.986 362.367 392.966 335.607C394.328 317.198 354.642 334.456 339.32 324.186C326.656 315.697 331.593 280.292 316.998 284.684C293.704 291.694 296.43 332.283 274.881 343.579Z" fill="#FF6600"/>
            </g>
            <defs>
              <filter id="filter0_f_5144_23526" x="-137" y="0.308594" width="814" height="782" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="142" result="effect1_foregroundBlur_5144_23526"/>
              </filter>
            </defs>
          </svg>
      </div>
      <div className="relative z-[2] max-w-[1165px] mx-auto flex flex-col md:flex-row gap-[44px] md:gap-[64px] lg:gap-[175px] items-center">
        {/* Left Content */}
        <div className="w-full md:w-[63.8%] flex flex-col gap-4 md:gap-6">
          <h2 className="mb-2 md:mb-0 max-w-[563px] font-Roboto text-white font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]">{title}</h2>
          <div className="space-y-4 solution-right-content-real ">
            <PortableText value={description} />
          </div>
          {cta?.label && (
            <a
              href={cta?.url || "#"}
              className="flex items-center justify-center bg-DarkOrange text-white font-normal font-Roboto leading-[16px] text-[16px] tracking-[0.08px] py-[12px]  px-4 rounded-full w-full md:w-[247px] h-[52px]"
            >
              {cta.label}
            </a>
          )}
        </div>
 
        {/* Right Image */}
        <div className="w-full md:w-[37.2%] flex flex-col relative z-[3]">         
          <img
            src={sideImage?.url}
            alt="Business Support"
            className="max-w-[365px] h-auto object-cover relative z-[4]"
          />
           <div className="absolute z-[2]  bottom-[40px] md:bottom-[27px] right-[-65px] md:right-[-33px] left-[-5px] md:left-[-30px]">
              <img src={RealLifeImg} alt="real_life-img-bg" className="w-[421px] h-[271px]" />
          </div>
          <div className="opacity-25 absolute z-[5] w-full w-[385px] h-[75px]  bottom-[-2px] left-[-20px] bg-[linear-gradient(187deg,rgba(9,16,25,0)_6.26%,#091019_95.69%)]">
             
          </div>
        </div>
      </div>
    </section>
  );
};
 
export default BusinessSupport;