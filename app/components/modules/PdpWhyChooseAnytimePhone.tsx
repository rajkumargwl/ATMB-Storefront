import React from "react";
 
const PdpWhyChooseAnytimePhone = ({ data }) => {
  if (!data) return null;
 
  const { title, subtitle, features, mainImage } = data;
 
  return (
    <section
      className="bg-DarkOrange px-5 py-[40px] md:py-[60px] lg:py-[100px]"
      aria-labelledby="why-choose-anytime-phone"
    >
      <div className="max-w-[1240px] mx-auto flex flex-col">
        <div className="flex flex-col md:items-center justify-center gap-5 md:gap-5 mb-[44px] md:mb-[64px]">
            <h2
            id="why-choose-anytime-phone"
            className="text-center font-Roboto text-white font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]"
          >
            {title}
          </h2>
          <p className="text-center font-Roboto text-white font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px]">
            {subtitle}
          </p>
 
        </div>
        {/* Left Content */}
        <div className="flex flex-col md:flex-row gap-[44px] lg:gap-[178px]">
        <div className="w-full md:w-[43.9%] flex flex-col">
         
 
          {/* Features List */}
          <ul className="flex flex-col gap-[28px] md:gap-12">
            {features?.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-4 md:gap-8">
                <div className="flex-shrink-0 bg-white rounded-full w-[44px] md:w-[64px] h-[44px] md:h-[64px] flex items-center justify-center">
                  <img
                    src={feature.icon?.url}
                    alt=""
                    className="w-[18px] md:w-[26px] h-[18px] md:h-[26px]"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex flex-col gap-3 md:gap-4">
                  <h3 className="font-Roboto text-white font-semibold leading-[28px] md:leading-[31.2px] text-[20px] md:text-[24px] tracking-[-0.3px] md:tracking-[-0.36px]">
                    {feature.heading}
                  </h3>
                  <p className="font-Roboto text-white font-normal leading-[21px] md:leading-[27px] text-[14px] md:text-[18px] tracking-[0px]">
                    {feature.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
 
        {/* Right Image */}
        <div className="w-full md:w-[56.1%] bg-[#F5F2EF] rounded-[20px] ">
          <img
            src={mainImage?.url}
            alt=""
            className="w-full lg:min-h-[437px] rounded-[20px] object-cover"
          />
        </div>
        </div>
      </div>
    </section>
  );
};
 
export default PdpWhyChooseAnytimePhone;