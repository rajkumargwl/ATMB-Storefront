import React from "react";
import { PortableText } from "@portabletext/react";
import RealLifeImg from "~/components/media/real_life-img-bg.svg";
 
type SolutionRealLifeProps = {
  title?: string;
  description?: any[];
  rightImage?: { url: string };
};
 
const SolutionRealLife: React.FC<{ data: SolutionRealLifeProps }> = ({ data }) => {
  return (
    <section className="overflow-hidden relative z-[2] bg-PrimaryBlack text-white py-[40px] md:py-[60px] lg:py-[100px] px-5">
      <div className="absolute z-[1] top-[-20px] right-[-40px] md:right-[0]">
        <svg xmlns="http://www.w3.org/2000/svg" width="530" height="479" viewBox="0 0 530 479" fill="none">
        <g filter="url(#filter0_f_3495_69801)">
        <path d="M411.881 39.8183C401.099 45.4702 394.495 21.5761 382.786 18.2522C370.853 14.8649 357.913 17.6492 346.004 21.1181C331.506 25.3409 316.091 29.8714 305.594 40.7362C294.942 51.7601 276.999 70.5904 286.863 82.3257C303.962 102.668 344.216 87.5446 361.734 107.526C371.288 118.423 344.748 131.971 343.008 146.366C341.04 162.662 334.911 196.1 351.227 194.492C376.574 191.995 381.924 152.583 404.26 140.33C411.576 136.317 418.013 149.406 424.944 154.054C440.834 164.711 455.265 194.867 472.141 185.854C488.214 177.27 468.288 150.051 466.405 131.911C465.509 123.272 462.92 114.833 463.873 106.2C464.667 99.009 466.661 91.472 471.465 86.0676C489.283 66.0228 527.986 58.6065 529.966 31.8469C531.328 13.4374 491.642 30.696 476.32 20.4258C463.656 11.9367 468.593 -23.4684 453.998 -19.076C430.704 -12.066 433.43 28.523 411.881 39.8183Z" fill="#FF6600"/>
        </g>
        <defs>
        <filter id="filter0_f_3495_69801" x="0" y="-303.452" width="814" height="782" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="142" result="effect1_foregroundBlur_3495_69801"/>
        </filter>
        </defs>
        </svg>
      </div>
      <div className="relative z-[2] max-w-[1165px] mx-auto flex flex-col md:flex-row gap-[44px] md:gap-[64px] lg:gap-[162px] items-center">
        
        {/* Left Side - Text */}
        <div className="w-full md:w-[63.3%] flex flex-col gap-6 md:gap-10">
          {data.title && (
            <h2 className="max-w-[563px] font-Roboto text-white font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]">
              {data.title}
            </h2>
          )}
 
          {data.description && (
            <div className="space-y-4 solution-right-content-real leading-relaxed">
              <PortableText value={data.description} />
            </div>
          )}
        </div>
 
        {/* Right Side - Image */}
        {data.rightImage?.url && (
          <div className="w-full md:w-[37.7%] flex flex-col relative z-[2]">
            <img
              src={data.rightImage.url}
              alt={data.title || "Real Life Example"}
              className="max-w-[378px] h-auto object-cover relative z-[3]"
            />
            <div className="absolute z-[1]  bottom-[0px] right-[-55px] md:right-[-37.5px]">
              <img src={RealLifeImg} alt="real_life-img-bg" className="w-[421px] h-[271px]" />
          </div>
          <div className="opacity-25 absolute z-[4] w-full h-[75px]  bottom-[-2px] left-[0px] bg-[linear-gradient(187deg,rgba(9,16,25,0)_6.26%,#091019_95.69%)]">
             
          </div>
          </div>
        )}
      </div>
    </section>
  );
};
 
export default SolutionRealLife;