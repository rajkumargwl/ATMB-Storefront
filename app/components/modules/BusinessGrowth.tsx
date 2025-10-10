import React from "react";
import circleOrange from "~/components/media/circle-orange.svg";
 
interface Icon {
  url: string;
}
 
interface Feature {
  title: string;
  description: string;
  icon: Icon;
}
 
interface SideImage {
  url: string;
}
 
interface BusinessGrowthToolkitProps {
  title: string;
  subtitle: string;
  sideImage: SideImage;
  features: Feature[];
}
 
const BusinessGrowth: React.FC<{ data: BusinessGrowthToolkitProps }> = ({ data }) => {
  const { title, subtitle, sideImage, features } = data;
 
  return (
    <section className="bg-white py-[40px] md:py-[60px] lg:py-[100px] px-5">
      <div className="max-w-[1203px] mx-auto flex flex-col gap-[44px] md:gap-[64px]">
        <div className="flex flex-col items-center justify-center gap-5">
            <h2 className="text-center font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]">
              {title}
            </h2>
            <p className=" max-w-[718px] mx-auto text-center font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px]">
              {subtitle}
            </p>
          </div>
        {/* Left Section */}
 
 
        <div className="flex flex-col md:flex-row items-center gap-[80px] md:gap-[44px] lg:gap-[80px]">
          {/* Heading */}
          
 
          {/* Features */}
          <div className="w-full md:w-[39.25%] flex flex-col gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-8">
                <div className="flex-shrink-0">
                  <img
                    src={feature.icon.url}
                    alt={feature.title}
                    className="w-11 h-11 object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="font-Roboto text-PrimaryBlack font-medium leading-[28px] md:leading-[28px] text-[20px] md:text-[20px] tracking-[0px]">
                    {feature.title}
                  </h4>
                  <p className="font-Roboto text-LightGray font-normal text-[14px] leading-[21px] tracking-[0px]">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
       
 
        {/* Right Section (Image) */}
        <div className="w-full md:w-[60.75%] flex flex-col relative z-[2]">
          <img
            src={sideImage.url}
            alt="Business Growth Toolkit"
            className="max-w-[682px] h-auto  relative z-[2]"
          />
           <div className="absolute z-[1] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
               <img
              src={circleOrange}
              alt="Circle Orange"
              className="max-w-[224px] md:max-w-[325px] lg:max-w-[459px] mt-[-20px] md:mt-[-38px]"
            />
            </div>
        </div>
        </div>
      </div>
    </section>
  );
};
 
export default BusinessGrowth;