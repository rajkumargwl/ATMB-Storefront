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
         <svg
  xmlns="http://www.w3.org/2000/svg"
  width="32"
  height="32"
  viewBox="0 0 32 32"
  fill="none"
  className="w-8 h-8"
>
  <mask id="path-1-inside-1_1345_36055" fill="white">
    <path d="M15.2154 4.45996L6.42539 9.53996L16.0154 15.075L25.6104 9.53996L16.8154 4.45996C16.3204 4.17496 15.7104 4.17496 15.2154 4.45996ZM5.62539 10.925V21.075C5.62539 21.645 5.93039 22.175 6.42539 22.46L15.2154 27.535V16.46L5.62539 10.92V10.925ZM16.8154 27.54L25.6104 22.46C26.1054 22.175 26.4104 21.645 26.4104 21.075V10.925L16.8204 16.465V27.54H16.8154ZM14.4154 3.07496C15.4054 2.50496 16.6254 2.50496 17.6154 3.07496L26.4104 8.14996C27.4004 8.71996 28.0104 9.77996 28.0104 10.92V21.07C28.0104 22.215 27.4004 23.27 26.4104 23.84L17.6154 28.925C16.6254 29.495 15.4054 29.495 14.4154 28.925L5.62539 23.85C4.63539 23.28 4.02539 22.22 4.02539 21.08V10.93C4.02539 9.78496 4.63539 8.72996 5.62539 8.15996L14.4154 3.07496Z"/>
  </mask>
  <path
    d="M15.2154 4.45996L6.42539 9.53996L16.0154 15.075L25.6104 9.53996L16.8154 4.45996C16.3204 4.17496 15.7104 4.17496 15.2154 4.45996ZM5.62539 10.925V21.075C5.62539 21.645 5.93039 22.175 6.42539 22.46L15.2154 27.535V16.46L5.62539 10.92V10.925ZM16.8154 27.54L25.6104 22.46C26.1054 22.175 26.4104 21.645 26.4104 21.075V10.925L16.8204 16.465V27.54H16.8154ZM14.4154 3.07496C15.4054 2.50496 16.6254 2.50496 17.6154 3.07496L26.4104 8.14996C27.4004 8.71996 28.0104 9.77996 28.0104 10.92V21.07C28.0104 22.215 27.4004 23.27 26.4104 23.84L17.6154 28.925C16.6254 29.495 15.4054 29.495 14.4154 28.925L5.62539 23.85C4.63539 23.28 4.02539 22.22 4.02539 21.08V10.93C4.02539 9.78496 4.63539 8.72996 5.62539 8.15996L14.4154 3.07496Z"
    fill="black"
  />
</svg>

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
 