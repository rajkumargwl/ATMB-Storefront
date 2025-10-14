import React from 'react';
 
type FeatureCategory = {
  categoryTitle: string;
  icon: string;
  points: string[];
};
 
type FeaturesModuleProps = {
  title?: string;
  subtitle?: string;
  featureCategories?: FeatureCategory[];
};
 
export default function AnytimeFeaturesModule({
  title,
  subtitle,
  featureCategories = [],
}: FeaturesModuleProps) {
  return (
    <section className="bg-white  py-[40px] md:py-[60px] lg:py-[100px] px-5">
      <div className="max-w-[1240px] mx-auto ">
        {/* Title */}
        <div className="flex flex-col items-center justify-center gap-5 md:gap-5 mb-[32px] md:mb-[64px]">
          {title && (
            <h2 className="text-center font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className=" max-w-[514px] mx-auto text-center font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px]">
              {subtitle}
            </p>
          )}
        </div>
 
        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white border border-LightWhite rounded-[12px] p-6 flex flex-col gap-4 md:min-h-[474px]"
            >
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 min-w-[36px] bg-DarkOrange rounded-full flex items-center justify-center">
                  <img
                    src={category.icon}
                    alt={category.categoryTitle}
                    className="w-4 h-4"
                  />
                </div>
                <h3 className="font-Roboto text-PrimaryBlack font-medium md:font-semibold leading-[18px] md:leading-[28px] text-[18px] md:text-[20px] tracking-[0.09px] md:tracking-[-0.3px]">
                  {category.categoryTitle}
                </h3>
              </div>
 
              {/* Points */}
              <ul className="list-disc list-inside flex flex-col gap-4">
                {category.points.map((point, idx) => (
                  <li key={idx} className='font-Roboto text-PrimaryBlack font-normal leading-[14px] md:leading-[14px] text-[14px] md:text-[14px] tracking-[0.07px]'>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}