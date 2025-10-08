import { Link } from '@remix-run/react';
 
interface HowItWorks2Props {
  data: {
    _type: 'howitworks2';
    sectionTitle?: string;
    sectionSubtitle?: string;
    features?: Array<{
      steps?: string;
      title?: string;
      description?: string;
      icon?: {
        url: string;
      };
    }>;
    button?: {
      text?: string;
      url?: string;
    };
  };
}
 
export function HowItWorks2({ data }: HowItWorks2Props) {
  return (
    <section className="bg-PrimaryBlack py-[40px] md:py-[60px] lg:py-[100px] px-5 relative z-[2] overflow-hidden">
      <div className="absolute z-[1] top-[-13px] right-[-20px] lg:right-[-23px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="507" height="486" viewBox="0 0 507 486" fill="none">
            <g filter="url(#filter0_f_1664_59555)">
              <path d="M411.881 46.6449C401.099 52.2969 394.495 28.4027 382.786 25.0789C370.853 21.6916 357.913 24.4759 346.004 27.9448C331.506 32.1676 316.091 36.6981 305.594 47.5629C294.942 58.5867 276.999 77.417 286.863 89.1524C303.962 109.494 344.216 94.3713 361.734 114.352C371.288 125.25 344.748 138.798 343.008 153.192C341.04 169.488 334.911 202.927 351.227 201.319C376.574 198.821 381.924 159.41 404.26 147.157C411.576 143.144 418.013 156.232 424.944 160.881C440.834 171.538 455.265 201.694 472.141 192.681C488.214 184.097 468.288 156.878 466.405 138.738C465.509 130.098 462.92 121.66 463.873 113.027C464.667 105.836 466.661 98.2987 471.465 92.8942C489.283 72.8494 527.986 65.4332 529.966 38.6735C531.328 20.264 491.642 37.5227 476.32 27.2524C463.656 18.7633 468.593 -16.6418 453.998 -12.2493C430.704 -5.23929 433.43 35.3496 411.881 46.6449Z" fill="#FF6600"/>
            </g>
            <defs>
              <filter id="filter0_f_1664_59555" x="0" y="-296.625" width="814" height="782" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="142" result="effect1_foregroundBlur_1664_59555"/>
              </filter>
            </defs>
          </svg>
      </div>
      
      <div className="max-w-[1236px] mx-auto">
        <div className="flex flex-col items-center justify-center gap-4 md:gap-4 mb-[44px] md:mb-[64px]">
          <h2 className="font-Roboto text-white font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]">
            {data.sectionTitle}
          </h2>
          <p className="text-center font-Roboto text-white font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px]">
            {data.sectionSubtitle}
          </p>
        </div>
 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-[44px] md:mb-[64px]">
          {data.features?.map((feature, index) => (
            <div
              key={index}
              className="bg-white text-left p-6 rounded-[12px] flex flex-col gap-10"
            >
              <div className='flex flex-col'>
                {feature.steps && (
                  <div className="font-Roboto text-DarkOrange font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px] md:tracking-[0px] mb-2">
                    {feature.steps}
                  </div>
                )}
                
                <h3 className="font-Roboto text-PrimaryBlack font-medium leading-[28px] md:leading-[33.6px] text-[20px] md:text-[24px] tracking-[0px] mb-4">
                  {feature.title}
                </h3>
                <p className="font-Roboto text-PrimaryBlack font-normal text-[14px] leading-[21px] tracking-[0px]">
                  {feature.description}
                </p>
              </div>
              
              {feature.icon?.url && (
                <div className="flex items-center justify-center">
                  <img
                    src={feature.icon.url}
                    alt={feature.title || `Feature ${index + 1}`}
                    className="w-auto h-auto  object-cover mb-[-24px]"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
 
        {data.button && (
          <div className="flex items-center justify-center">
            <Link
              to={data.button.url || '#'}
              className="flex items-center justify-center w-full md:w-[312px] bg-DarkOrange text-white font-Roboto font-normal leading-[16px] text-[16px] tracking-[0.08px] h-[52px] px-[16px] py-[12px] rounded-[100px]"
            >
              {data.button.text}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}