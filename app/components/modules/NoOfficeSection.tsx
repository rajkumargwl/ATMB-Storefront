import { PortableText } from '@portabletext/react';
import real_life_bg3 from "~/components/media/real_life-img-bg3.png";
 
type Feature = {
  text: string;
};
 
type NoOfficeSectionProps = {
  title: string;
  description: any;
  features: Feature[];
  image?: string;
};
 
export default function NoOfficeSection({
  title,
  description,
  features,
  image,
}: NoOfficeSectionProps) {
  return (
    <section className="bg-PrimaryBlack md:bg-white  py-[40px] md:py-[60px] lg:py-[100px] px-5 relative z-[2] overflow-hidden">
      <div className="hidden md:flex absolute z-[1] top-[-20px] right-[0px] md:right-[0]">
        <svg xmlns="http://www.w3.org/2000/svg" width="530" height="478" viewBox="0 0 530 478" fill="none">
          <g filter="url(#filter0_f_4072_31800)">
            <path d="M411.881 39.2699C401.099 44.9219 394.495 21.0277 382.786 17.7039C370.853 14.3166 357.913 17.1009 346.004 20.5698C331.506 24.7926 316.091 29.3231 305.594 40.1879C294.942 51.2117 276.999 70.042 286.863 81.7774C303.962 102.119 344.216 86.9963 361.734 106.977C371.288 117.875 344.748 131.423 343.008 145.817C341.04 162.113 334.911 195.552 351.227 193.944C376.574 191.446 381.924 152.035 404.26 139.782C411.576 135.769 418.013 148.857 424.944 153.506C440.834 164.163 455.265 194.319 472.141 185.306C488.214 176.722 468.288 149.503 466.405 131.363C465.509 122.723 462.92 114.285 463.873 105.652C464.667 98.4606 466.661 90.9237 471.465 85.5192C489.283 65.4744 527.986 58.0582 529.966 31.2985C531.328 12.889 491.642 30.1477 476.32 19.8774C463.656 11.3883 468.593 -24.0168 453.998 -19.6243C430.704 -12.6143 433.43 27.9746 411.881 39.2699Z" fill="#FF6600"/>
          </g>
          <defs>
            <filter id="filter0_f_4072_31800" x="0" y="-304" width="814" height="782" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="142" result="effect1_foregroundBlur_4072_31800"/>
            </filter>
          </defs>
        </svg>
      </div>
       <div className="flex md:hidden absolute z-[1] bottom-[134px] right-[-16px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="393" height="633" viewBox="0 0 393 633" fill="none">
          <g filter="url(#filter0_f_4084_23775)">
            <path d="M290.881 343.367C280.099 349.019 273.495 325.124 261.786 321.801C249.853 318.413 236.913 321.198 225.004 324.666C210.506 328.889 195.091 333.42 184.594 344.285C173.942 355.308 155.999 374.139 165.863 385.874C182.962 406.216 223.216 391.093 240.734 411.074C250.288 421.971 223.748 435.52 222.008 449.914C220.04 466.21 213.911 499.649 230.227 498.041C255.574 495.543 260.924 456.132 283.26 443.879C290.576 439.865 297.013 452.954 303.944 457.602C319.834 468.259 334.265 498.415 351.141 489.403C367.214 480.819 347.288 453.6 345.405 435.459C344.509 426.82 341.92 418.382 342.873 409.748C343.667 402.557 345.661 395.02 350.465 389.616C368.283 369.571 406.986 362.155 408.966 335.395C410.328 316.986 370.642 334.244 355.32 323.974C342.656 315.485 347.593 280.08 332.998 284.472C309.704 291.482 312.43 332.071 290.881 343.367Z" fill="#FF6600"/>
          </g>
          <defs>
            <filter id="filter0_f_4084_23775" x="-121" y="0.0966797" width="814" height="782" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="142" result="effect1_foregroundBlur_4084_23775"/>
            </filter>
          </defs>
        </svg>
      </div>
      <div className="relative z-[2] max-w-[1165px] mx-auto flex flex-col md:flex-row items-center gap-[44px] md:gap-[64px] lg:gap-[184px]">
        {/* Left: Text Content */}
        <div className="w-full md:w-[63.7%] flex flex-col">
          <h2 className="mb-8 font-Roboto text-white md:text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]">
            {title}
          </h2>
 
          <div className="no-office-sec leading-relaxed mb-6">
            <PortableText value={description} />
          </div>
 
          <ul className="space-y-4">
            {features?.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="hidden md:flex">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.154 4.31288C20.4202 4.50788 20.4802 4.88288 20.2852 5.15288L9.78523 19.5529C9.68023 19.6954 9.52273 19.7854 9.34648 19.7966C9.17023 19.8079 9.00148 19.7479 8.87398 19.6241L3.77398 14.5241C3.54148 14.2916 3.54148 13.9091 3.77398 13.6766C4.00648 13.4441 4.38898 13.4441 4.62148 13.6766L9.22648 18.2816L19.314 4.44788C19.509 4.18163 19.884 4.12163 20.154 4.31663V4.31288Z" fill="#FF6600"></path></svg>
                </span>
                <span className="flex md:hidden">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.154 4.31288C20.4202 4.50788 20.4802 4.88288 20.2852 5.15288L9.78523 19.5529C9.68023 19.6954 9.52273 19.7854 9.34648 19.7966C9.17023 19.8079 9.00148 19.7479 8.87398 19.6241L3.77398 14.5241C3.54148 14.2916 3.54148 13.9091 3.77398 13.6766C4.00648 13.4441 4.38898 13.4441 4.62148 13.6766L9.22648 18.2816L19.314 4.44788C19.509 4.18163 19.884 4.12163 20.154 4.31663V4.31288Z" fill="#FFFFFF"></path></svg>
                </span>
                <span className='font-Roboto text-white md:text-PrimaryBlack font-normal text-[18px] leading-[27px] tracking-[0px]'>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
 
        {/* Right: Image */}
        {image && (
          <div className="w-full md:w-[36.3%] flex flex-col relative z-[3]">
            <div className="absolute z-[2]  bottom-[14px] md:bottom-[14x] right-[-10px] md:right-[-10px]">
              <img src={real_life_bg3} alt="real_life-img-bg" className="w-[431px] h-[230px]" />
            </div>
            <img
              src={image}
              alt={title}
              className="w-[356px] h-auto object-contain relative z-[4]"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </section>
  );
}