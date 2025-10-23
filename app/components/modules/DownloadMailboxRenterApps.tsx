import React from 'react';
 
interface Button {
  icon: {
    url: string;
  };
  link?: string | null;
}
 
interface DownloadMailboxRenterAppsProps {
  title: string;
  description: string;
  mockupImage: {
    url: string;
  };
  appStoreIcon: {
    url: string;
  };
  googlePlayIcon: {
    url: string;
  };
  appStoreLink?: string | null;
  googlePlayLink?: string | null;
}
 
const DownloadMailboxRenterApps: React.FC<DownloadMailboxRenterAppsProps> = ({
  title,
  description,
  mockupImage,
  appStoreIcon,
  googlePlayIcon,
  appStoreLink,
  googlePlayLink,
}) => {
  return (
    <section className="download-mailbox-renter-apps px-5 py-[40px] md:py-[60px] lg:py-[80px] bg-PrimaryBlack relative z-[2] overflow-hidden">
      <div className="absolute hidden md:flex z-[1] top-[0px] left-[0px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="809" height="603" viewBox="0 0 809 603" fill="none">
          <g filter="url(#filter0_f_4278_51637)">
            <path d="M397.278 152.255C385.619 158.383 378.478 132.479 365.817 128.875C352.914 125.203 338.923 128.222 326.045 131.982C310.369 136.56 293.7 141.472 282.349 153.25C270.831 165.202 251.43 185.616 262.096 198.338C280.585 220.391 324.112 203.996 343.054 225.658C353.384 237.472 324.686 252.16 322.806 267.765C320.677 285.431 314.05 321.682 331.693 319.939C359.101 317.232 364.886 274.505 389.038 261.222C396.948 256.871 403.908 271.06 411.403 276.1C428.585 287.653 444.189 320.345 462.437 310.575C479.816 301.269 458.271 271.76 456.235 252.094C455.266 242.728 452.467 233.58 453.497 224.22C454.355 216.425 456.511 208.254 461.706 202.395C480.972 180.664 522.823 172.624 524.963 143.613C526.436 123.655 483.523 142.366 466.956 131.232C453.262 122.028 458.601 83.6454 442.819 88.4073C417.631 96.0069 420.578 140.01 397.278 152.255Z" fill="#FF6600"/>
          </g>
          <defs>
            <filter id="filter0_f_4278_51637" x="-25" y="-196" width="834" height="800" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="142" result="effect1_foregroundBlur_4278_51637"/>
            </filter>
          </defs>
        </svg>
      </div>
      <div className="absolute flex md:hidden z-[1] bottom-[0px] right-[0px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="393" height="583" viewBox="0 0 393 583" fill="none">
          <g filter="url(#filter0_f_4278_53304)">
            <path d="M221.278 348.255C209.619 354.383 202.478 328.479 189.817 324.875C176.914 321.203 162.923 324.222 150.045 327.982C134.369 332.56 117.7 337.472 106.349 349.25C94.8314 361.202 75.4298 381.616 86.096 394.338C104.585 416.391 148.112 399.996 167.054 421.658C177.384 433.472 148.686 448.16 146.806 463.765C144.677 481.431 138.05 517.682 155.693 515.939C183.101 513.232 188.886 470.505 213.038 457.222C220.948 452.871 227.908 467.06 235.403 472.1C252.585 483.653 268.189 516.345 286.437 506.575C303.816 497.269 282.271 467.76 280.235 448.094C279.266 438.728 276.467 429.58 277.497 420.22C278.355 412.425 280.511 404.254 285.706 398.395C304.972 376.664 346.823 368.624 348.963 339.613C350.436 319.655 307.523 338.366 290.956 327.232C277.262 318.028 282.601 279.645 266.819 284.407C241.631 292.007 244.578 336.01 221.278 348.255Z" fill="#FF6600"/>
          </g>
          <defs>
            <filter id="filter0_f_4278_53304" x="-201" y="0" width="834" height="800" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="142" result="effect1_foregroundBlur_4278_53304"/>
            </filter>
          </defs>
        </svg>
      </div>
      <div className="max-w-[1240px] mx-auto relative z-[2] flex flex-col md:flex-row gap-[40px] lg:gap-[215px]">
        {/* Mockup Image */}
        <div className="mockup w-full md:w-[38.6%] flex flex-col  items-center md:items-left order-2 md:order-1">
          <img
            src={mockupImage?.url}
            alt="App Mockup"
            className="max-w-[220px] md:max-w-[394px] h-auto object-cover mb-[-40px] md:mb-[-80px]"
          />
        </div>
 
        {/* Content */}
        <div className="content w-full md:w-[61.4%] flex flex-col justify-center order-1 md:order-2">
          <h1 className="mb-[12px] max-w-[609px] font-Roboto text-white font-semibold leading-[38.4px] md:leading-[51.6px] lg:leading-[61.6px] text-[32px] md:text-[42px] lg:text-[56px] tracking-[-0.48px] md:tracking-[-1.12px]">{title}</h1>
          <p className="max-w-[610px] font-Roboto text-white font-normal leading-[21px] md:leading-[24px] text-[14px] md:text-[16px] tracking-[0px] mb-8">{description}</p>
 
          <div className="flex gap-6">
            {appStoreIcon?.url && (
              <a
                href={appStoreLink || '#'}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={appStoreIcon.url}
                  alt="Download on the App Store"
                  className="w-full object-cover"
                />
              </a>
            )}
 
            {googlePlayIcon?.url && (
              <a
                href={googlePlayLink || '#'}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={googlePlayIcon.url}
                  alt="Get it on Google Play"
                  className="w-full object-cover"
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
 
export default DownloadMailboxRenterApps;