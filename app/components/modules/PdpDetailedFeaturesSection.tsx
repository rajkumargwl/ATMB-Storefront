import React from "react";
 
type Icon = {
  url: string;
  alt?: string | null;
};
 
type TopFeature = {
  title: string;
  description: string;
  icon: Icon;
};
 
type StorageItem = {
  title: string;
  description: string;
};
 
type PhysicalStorage = {
  title: string;
  storageItems: StorageItem[];
};
 
type Props = {
  title: string;
  topFeatures: TopFeature[];
  physicalStorage: PhysicalStorage;
};
 
const PdpDetailedFeaturesSection: React.FC<Props> = ({
  title,
  topFeatures,
  physicalStorage,
}) => {
  return (
    <section className="px-5 py-[40px] md:py-[60px] lg:py-[100px] bg-[#F6F6F6]">
      <div className="max-w-[1240px] mx-auto relative z-[2]">
      {/* Section Title */}
      <h2 className="text-center font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[0.12px] md:tracking-[-0.54px] mb-[32px] md:mb-[64px]">{title}</h2>
 
      {/* Top Features */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-6">
        {topFeatures?.map((feature, index) => (
          <div
            key={index}
            className={`border border-LightWhite rounded-[20px] md:ounded-[24px] flex flex-col p-5 md:p-6 bg-white
              ${ index === topFeatures.length - 1 ? "col-span-2 md:col-span-1" : ""}`}
          >
            <img
              src={feature.icon?.url}
              alt={feature.icon?.alt || feature.title}
              className="w-8 h-8 mb-5 object-contain"
            />
            <h3 className="font-Roboto text-PrimaryBlack font-medium leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px]">{feature.title}</h3>
            <p className="font-Roboto text-LightGray font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px] mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
 
      {/* Physical Storage Section */}
      <div className="border border-LightWhite rounded-[24px] flex flex-col p-5 md:p-6 bg-white gap-[24px] md:gap-[28px]">
        <div className="flex items-center gap-4">
          <img
            src="https://cdn.sanity.io/images/m5xb8z9y/production/b9f041f621501cd44bcdfba6359e4e23036d3fd6-32x32.svg"
            alt="storage icon"
            className="w-8 h-8 object-contain"
          />
          <h3 className="font-Roboto text-PrimaryBlack font-medium leading-[27px] md:leading-[27px] text-[18px] md:text-[18px] tracking-[0px]">
            {physicalStorage.title}
          </h3>
        </div>
 
        <div className="grid  grid-cols-1  md:grid-cols-3 gap-y-4 md:gap-y-6 gap-x-8 ">
          {physicalStorage?.storageItems?.map((item, index) => (
            <div
                key={index}
                className={`flex flex-col gap-1 pb-4 md:pb-6 border-b border-LightWhite last:border-b-0 last:pb-0 md:last:pb-6
                  ${index === 6 || index === 7 || index === 8 ? "md:border-b-0" : ""} `}
              >
              <h4 className="font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px] ">
                {item.title}
              </h4>
              <p className="font-Roboto text-LightGray font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px] ">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
};
 
export default PdpDetailedFeaturesSection;
 