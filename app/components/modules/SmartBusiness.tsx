import React from 'react';
 
type Testimonial = {
  quote: string;
  author: string;
  designation: string;
  authorImage: {
    url: string;
    alt?: string | null;
  };
};
 
type Props = {
  title: string;
  subtitle: string;
  featureTitle: string;
  features: string[];
  benefitIcons: { url: string }[];
  benefitLabels: string[];
  testimonials: Testimonial[];
};
 
const SmartBusiness: React.FC<Props> = ({
  title,
  subtitle,
  featureTitle,
  features,
  benefitIcons,
  benefitLabels,
  testimonials,
}) => {
  return (
    <section id = "benefits" className="bg-white px-5 py-[40px] md:py-[60px] lg:py-[100px]">
      <div className="max-w-[1170px] mx-auto">
        {/* Header */}
 
        <div className="flex flex-col md:items-center justify-center gap-4 md:gap-4 mb-[40px] md:mb-[65px]">
          <h2 className="text-center font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]">
            {title}
          </h2>
          <p className="max-w-[870px] mx-auto text-center font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px]">
            {subtitle}
          </p>
        </div>
 
        {/* Content Section */}
        <div className="flex flex-col md:flex-row items-start gap-[40px] lg:gap-[80px]">
          {/* Left Column */}
          <div className='w-full md:w-[43%] flex flex-col'>
            <h3 className="font-Roboto text-PrimaryBlack font-semibold leading-[28px] md:leading-[31.2px] text-[20px] md:text-[24px] tracking-[-0.3px] md:racking-[-0.36px] mb-7">
              {featureTitle}
            </h3>
 
            <ul className="flex flex-col gap-4 mb-7">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px]"
                >
                  <span className="flex items-center justify-center w-6 h-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
                      <path d="M17.1559 0.812879C17.4222 1.00788 17.4822 1.38288 17.2872 1.65288L6.78719 16.0529C6.68219 16.1954 6.52469 16.2854 6.34844 16.2966C6.17219 16.3079 6.00344 16.2479 5.87594 16.1241L0.775937 11.0241C0.543437 10.7916 0.543437 10.4091 0.775937 10.1766C1.00844 9.94413 1.39094 9.94413 1.62344 10.1766L6.22844 14.7816L16.3159 0.947879C16.5109 0.681629 16.8859 0.621629 17.1559 0.816629V0.812879Z" fill="#FF6600"/>
                    </svg>
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
 
            {/* Benefits */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-[24px] md:gap-[18px] items-start">
              {benefitIcons.map((icon, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center gap-2"
                >
                  <div className='w-[44px] md:w-[44px] h-[44px] md:h-[44px] rounded-full bg-DarkOrange flex items-center justify-center'>
                    <img
                      src={icon.url}
                      alt={benefitLabels[idx]}
                      className="w-6 h-6"
                    />
                  </div>
                  <p className="text-center font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">
                    {benefitLabels[idx]}
                  </p>
                </div>
              ))}
            </div>
          </div>
 
          {/* Right Column - Testimonials */}
          <div className="w-full md:w-[57%] flex flex-col gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="border border-LightWhite rounded-[12px] p-6 md:p-6"
              >
                <p className="font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px] mb-4">
                  {testimonial.quote}
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.authorImage.url}
                    alt={testimonial.author}
                    className="w-11 h-11 rounded-full"
                  />
                  <div>
                    <p className="font-Roboto text-PrimaryBlack font-medium leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">
                      {testimonial.author}
                    </p>
                    <p className="font-Roboto text-LightGray font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px]">
                      {testimonial.designation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
 
export default SmartBusiness;