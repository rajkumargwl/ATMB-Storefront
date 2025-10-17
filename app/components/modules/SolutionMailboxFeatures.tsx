import React from "react";
import circleOrange from "~/components/media/circle-orange.svg";
 
 
interface Feature {
  featureTitle: string;
  featureDescription: string;
  icon: { url: string };
}
 
interface SolutionMailboxFeaturesProps {
  data: {
    title: string;
    subtitle: string;
    features: Feature[];
    rightImage: { url: string };
    bottomHeading: string;
  };
}
 
const SolutionMailboxFeatures: React.FC<SolutionMailboxFeaturesProps> = ({ data }) => {
  return (
    <section className="bg-white py-[40px] md:py-[60px] lg:py-[100px] px-5">
      <div className="max-w-[1003px] mx-auto flex flex-col gap-[44px] md:gap-[64px]">
        <div className="flex flex-col items-center justify-center max-w-[718px] mx-auto gap-5">
          <h2 className="text-center font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]">
            {data.title}
          </h2>
          <p className="text-center font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px]">{data.subtitle}</p>
 
        </div>
        <div className="flex flex-col md:flex-row items-center gap-[80px]">
        {/* Left Content */}
          <div className="w-full md:w-[50.3%] flex flex-col">         
            <div className="space-y-[44px]">
              {data.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-6 md:gap-8">
                  <img
                    src={feature.icon.url}
                    alt={feature.featureTitle}
                    className="w-11 h-11 flex-shrink-0"
                  />
                  <div className="flex flex-col gap-2">
                    <h3 className="font-Roboto text-PrimaryBlack font-medium leading-[28px] md:leading-[28px] text-[20px] md:text-[20px] tracking-[0px]">
                      {feature.featureTitle}
                    </h3>
                    <p className="font-Roboto text-LightGray font-normal text-[14px] leading-[21px] tracking-[0px]">
                      {feature.featureDescription}
                    </p>
                  </div>
                </div>
              ))}
            </div>
 
            
          </div>
 
          {/* Right Image */}
          <div className="w-full md:w-[49.7%] flex flex-col relative z-[2]">
            <div className="absolute z-[1] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
               <img
              src={circleOrange}
              alt="Circle Orange"
              className="max-w-[325px] lg:max-w-[459px]"
            />
            </div>
            <img
              src={data.rightImage.url}
              alt="Mailbox feature illustration"
              className="max-w-[459px] w-full relative z-[2]"
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          {/* Bottom Heading */}
            <p className="text-center font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[24px] text-[14px] md:text-[16px] tracking-[0px]">{data.bottomHeading}</p>
        </div>
      </div>
    </section>
  );
};
 
export default SolutionMailboxFeatures;