
// app/components/BusinessBanner.tsx
import React from "react";
 
type BusinessBannerProps = {
  title: string;
  titleline2?: string; 
  cta: {
    label: string;
    url?: string | null;
  };
  image: {
    url: string;
  };
};

const BusinessBanner: React.FC<BusinessBannerProps> = ({ title, titleline2, cta, image }) => {
  
  return (
    <section className="bg-DarkOrange relative flex flex-col  items-center justify-between text-white md:px-5  overflow-hidden rounded-2xl">
      {/* Left Content */}
      <div className="relative z-[3] max-w-[1240px] mx-auto w-full flex flex-col md:flex-row gap-6 md:gap-[46px]">
      <div className="relative z-[4] w-full md:w-[66.8%] pb-[0] py-[40px] md:py-[60px] lg:py-[80px] flex flex-col justify-center px-5 md:px-[0]">
        <h2 className="mb-[32px] max-w-[772px] font-Roboto text-white font-semibold leading-[38.4px] md:leading-[61.6px] text-[32px] md:text-[56px] tracking-[-0.48px] md:tracking-[-1.12px]">{title}{titleline2 && (
              <>
                <br />
                <span className="block text-white">
                  {titleline2}
                </span>
              </>
            )}</h2>
        
        
        {cta?.label && (
          <a
            href={cta.url ?? "/PDP/business-accelerator"}
            className="flex items-center justify-center w-full md:w-[248px] h-[52px] md:h-[52px] rounded-[100px] font-medium leading-[16px] tracking-[0.08px] text-[16px] text-PrimaryBlack bg-white px-4 py-[12px] transition-all  hover:bg-PrimaryBlack hover:text-white"
          >
            {cta.label}
          </a>
        )}
      </div>
 
      {/* Right Image */}
      <div className="w-full md:w-[33.2%] relative z-[4]">
        <img
          src={image.url}
          alt={title}
          className="w-full md:w-[398px] h-full md:max-h-[403px] object-contain"
        />
      </div>
      
      {/* Background Gradient Overlay (optional for depth) */}
      <div className="hidden md:flex absolute z-[2] right-[0px] top-[0px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="834" height="403" viewBox="0 0 834 403" fill="none">
            <g filter="url(#filter0_f_4864_27756)">
              <path d="M422.278 119.255C410.619 125.383 403.478 99.4787 390.817 95.8752C377.914 92.203 363.923 95.2215 351.045 98.9822C335.369 103.56 318.7 108.472 307.349 120.25C295.831 132.202 276.43 152.616 287.096 165.338C305.585 187.391 349.112 170.996 368.054 192.658C378.384 204.472 349.686 219.16 347.806 234.765C345.677 252.431 339.05 288.682 356.693 286.939C384.101 284.232 389.886 241.505 414.038 228.222C421.948 223.871 428.908 238.06 436.403 243.1C453.585 254.653 469.189 287.345 487.437 277.575C504.816 268.269 483.271 238.76 481.235 219.094C480.266 209.728 477.467 200.58 478.497 191.22C479.355 183.425 481.511 175.254 486.706 169.395C505.972 147.664 547.823 139.624 549.963 110.613C551.436 90.6554 508.523 109.366 491.956 98.2316C478.262 89.0285 483.601 50.6454 467.819 55.4073C442.631 63.0069 445.578 107.01 422.278 119.255Z" fill="white"/>
            </g>
            <defs>
              <filter id="filter0_f_4864_27756" x="0" y="-229" width="834" height="800" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="142" result="effect1_foregroundBlur_4864_27756"/>
              </filter>
            </defs>
          </svg>
      </div>
      <div className="flex md:hidden absolute z-[2] left-[-223px] top-[0px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="327" height="628" viewBox="0 0 327 628" fill="none">
          <g filter="url(#filter0_f_5144_24434)">
            <path d="M-84.722 342.564C-96.381 348.691 -103.522 322.787 -116.183 319.184C-129.086 315.512 -143.077 318.53 -155.955 322.291C-171.631 326.869 -188.3 331.78 -199.651 343.559C-211.169 355.51 -230.57 375.924 -219.904 388.647C-201.415 410.7 -157.888 394.305 -138.946 415.966C-128.616 427.78 -157.314 442.468 -159.194 458.073C-161.323 475.74 -167.95 511.991 -150.307 510.248C-122.899 507.54 -117.114 464.814 -92.9623 451.53C-85.0516 447.179 -78.0917 461.369 -70.5974 466.408C-53.4152 477.961 -37.8107 510.654 -19.5634 500.883C-2.18361 491.577 -23.7289 462.069 -25.7648 442.403C-26.7344 433.037 -29.5334 423.888 -28.5032 414.529C-27.6451 406.733 -25.489 398.562 -20.2944 392.703C-1.02784 370.972 40.8225 362.932 42.963 333.922C44.4356 313.964 1.52342 332.674 -15.0437 321.54C-28.7376 312.337 -23.3992 273.954 -39.1815 278.716C-64.3689 286.316 -61.4217 330.318 -84.722 342.564Z" fill="white"/>
          </g>
          <defs>
            <filter id="filter0_f_5144_24434" x="-507" y="-5.69141" width="834" height="800" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="142" result="effect1_foregroundBlur_5144_24434"/>
            </filter>
          </defs>
        </svg>
      </div>
      </div>
    
    </section>
  );
};
 
export default BusinessBanner;
 