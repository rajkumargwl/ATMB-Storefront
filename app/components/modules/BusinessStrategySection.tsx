import { PortableText } from '@portabletext/react';
 
type BusinessStrategySectionProps = {
  label?: string;
  title: string;
  description: any; // Sanity rich text (Portable Text)
  videoLink?: string | null;
  videoThumbnail?: { url?: string };
};
 
export default function BusinessStrategySection({
  label,
  title,
  description,
  videoLink,
  videoThumbnail,
}: BusinessStrategySectionProps) {
  return (
    <section className="px-5 py-[40px] md:py-[60px] lg:py-[100px] bg-white relative z-[2] overflow-hidden">
      <div className="absolute z-[1] top-[-225px] left-[0px] hidden md:flex">
        <svg xmlns="http://www.w3.org/2000/svg" width="530" height="782" viewBox="0 0 530 782" fill="none">
          <g filter="url(#filter0_f_4900_31671)">
            <path d="M127.881 343.27C117.099 348.922 110.495 325.028 98.7856 321.704C86.8528 318.317 73.9135 321.101 62.0041 324.57C47.5064 328.793 32.0914 333.323 21.5935 344.188C10.9419 355.212 -7.00099 374.042 2.86325 385.777C19.9619 406.119 60.2163 390.996 77.7342 410.977C87.2879 421.875 60.7475 435.423 59.0085 449.817C57.0397 466.113 50.9105 499.552 67.2274 497.944C92.5744 495.446 97.9243 456.035 120.26 443.782C127.576 439.769 134.013 452.857 140.944 457.506C156.834 468.163 171.265 498.319 188.141 489.306C204.214 480.722 184.288 453.503 182.405 435.363C181.509 426.723 178.92 418.285 179.873 409.652C180.667 402.461 182.661 394.924 187.465 389.519C205.283 369.474 243.986 362.058 245.966 335.299C247.328 316.889 207.642 334.148 192.32 323.877C179.656 315.388 184.593 279.983 169.998 284.376C146.704 291.386 149.43 331.975 127.881 343.27Z" fill="#FF6600"/>
          </g>
          <defs>
            <filter id="filter0_f_4900_31671" x="-284" y="0" width="814" height="782" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="142" result="effect1_foregroundBlur_4900_31671"/>
            </filter>
          </defs>
        </svg>
      </div>
       <div className="absolute z-[1] top-[-70px] left-[0px] flex md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" width="393" height="454" viewBox="0 0 393 454" fill="none">
          <g filter="url(#filter0_f_5144_23882)">
            <path d="M106.611 54.1337C98.6341 58.333 93.7483 40.5799 85.0853 38.1103C76.257 35.5936 66.684 37.6623 57.873 40.2396C47.147 43.3771 35.7424 46.7433 27.9757 54.8157C20.0952 63.0063 6.8204 76.9971 14.1183 85.7163C26.7686 100.83 56.5502 89.5939 69.5107 104.44C76.5789 112.536 56.9433 122.603 55.6567 133.298C54.2001 145.405 49.6655 170.25 61.7374 169.055C80.49 167.199 84.448 137.917 100.973 128.813C106.386 125.831 111.148 135.556 116.275 139.01C128.032 146.928 138.709 169.333 151.193 162.637C163.085 156.259 148.343 136.036 146.95 122.558C146.287 116.139 144.372 109.869 145.077 103.455C145.664 98.1118 147.139 92.5119 150.693 88.4965C163.876 73.6034 192.51 68.0932 193.975 48.211C194.982 34.5329 165.621 47.3559 154.286 39.7252C144.916 33.4179 148.569 7.11225 137.771 10.3758C120.537 15.5842 122.554 45.7414 106.611 54.1337Z" fill="#FF6600"/>
          </g>
          <defs>
            <filter id="filter0_f_5144_23882" x="-272" y="-273.903" width="750" height="727" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="142" result="effect1_foregroundBlur_5144_23882"/>
            </filter>
          </defs>
        </svg>
      </div>
      <div className="relative z-[2] max-w-[1240px] mx-auto flex flex-col md:flex-row gap-[44px] md:gap-[64px] items-center">
        {/* Left: Image/Thumbnail */}
        <div className="relative w-full md:w-[52%]">
          {videoThumbnail?.url && (
            <img
              src={videoThumbnail.url}
              alt="video thumbnail"
              className="rounded-[20px] w-full object-cover"
            />
          )}
 
          {/* Play Button / Label */}
          {label && (
            <div className="absolute inset-0 flex items-center justify-center">
              <a
                href={videoLink || '#'}
                target={videoLink ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-PrimaryBlack
                font-Roboto text-PrimaryBlack font-normal text-[16px] md:text-[16px] leading-[16px] tracking-[0.08px] px-4 py-3 rounded-full flex
                items-center gap-3  transition-all min-w-[205px] lg:min-w-[204px] h-[44px] md:h-[52px]"
              >
                {label}
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5.53188 3.8101C5.07813 4.0801 4.79688 4.57135 4.79688 5.1001V18.9001C4.79688 19.4289 5.07813 19.9201 5.53188 20.1901C5.98563 20.4601 6.55187 20.4714 7.01688 20.2164L19.6169 13.3164C20.0969 13.0539 20.3969 12.5476 20.3969 12.0001C20.3969 11.4526 20.0969 10.9464 19.6169 10.6839L7.01688 3.78385C6.55187 3.52885 5.98938 3.5401 5.53188 3.8101ZM6.43938 4.8376L19.0394 11.7376C19.1369 11.7901 19.1969 11.8914 19.1969 12.0001C19.1969 12.1089 19.1369 12.2101 19.0394 12.2626L6.43938 19.1626C6.34563 19.2151 6.23312 19.2114 6.14312 19.1589C6.05312 19.1064 5.99688 19.0051 5.99688 18.9001V5.1001C5.99688 4.9951 6.05312 4.8976 6.14312 4.84135C6.23312 4.7851 6.34563 4.7851 6.43938 4.8376Z" fill="black"/>
                </svg>
              </a>
            </div>
          )}
        </div>
 
        {/* Right: Text Content */}
        <div className='w-full md:w-[48%]'>
          <h2 className="max-w-[515px] font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px] mb-4">
            {title}
          </h2>
 
          <div className="business-desc max-w-[515px] font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">
            <PortableText value={description} />
          </div>
        </div>
      </div>
    </section>
  );
}