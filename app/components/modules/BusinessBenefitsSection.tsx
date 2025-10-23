import React from "react";
 
type BenefitCard = {
  stat: string;
  title: string;
  testimonial: string;
  customerName: string;
  customerRole: string;
  icon: {
    url: string;
  };
};
 
type Props = {
  heading: string;
  subHeading: string;
  benefitCards: BenefitCard[];
};
 
const BusinessBenefitsSection: React.FC<Props> = ({
  heading,
  subHeading,
  benefitCards,
}) => {
  return (
    <section className="px-5 py-[40px] md:py-[60px] lg:py-[100px] bg-PrimaryBlack">
      <div className="max-w-[1240px] mx-auto">
        {/* Heading */}
        <div className='flex flex-col items-center justify-center gap-5 md:gap-5 mb-[44px] md:mb-[64px]'>
          <h2 className="text-center font-Roboto text-white font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]">{heading}</h2>
          <p className="text-center font-Roboto text-white font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px]">{subHeading}</p>
        </div>
 
        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {benefitCards?.map((card, idx) => (
            <div
              key={idx}
              className="md:min-h-[434px] bg-white rounded-[24px] p-6 flex flex-col items-start justify-start  border border-LightWhite"
            >
              <div>
                <div className='w-11 h-11 mb-5 bg-DarkOrange rounded-full flex items-center justify-center'>
                  <img
                    src={card.icon.url}
                    alt={card.title}
                    className="w-6 h-6 object-contain"
                  />
                </div>
 
                <h3 className="font-Roboto text-PrimaryBlack font-semibold leading-[28px] md:leading-[31.2px] text-[20px] md:text-[24px] tracking-[-0.3px] md:tracking-[-0.36px] mb-5 md:mb-5">
                  {card.stat}
                </h3>
                <p className="md:max-w-[226px] font-Roboto text-PrimaryBlack font-normal leading-[27px] md:leading-[27px] text-[18px] md:text-[18px] tracking-[0px] mb-5 md:mb-5">{card.title}</p>
 
              </div>
              <div className="p-5 flex flex-col gap-4 md:gap-[16px] justify-between rounded-[12px] border-l-[2px] border-l-DarkOrange bg-[#F6F6F6]">
                <p className="italic font-Roboto text-PrimaryBlack font-normal leading-[20.8px] md:leading-[20.8px] text-[16px] md:text-[16px] tracking-[0px]">{card.testimonial}</p>
                <div className="flex flex-col gap-[2px]">
                  <p className="font-Roboto text-PrimaryBlack font-medium leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">
                    {card.customerName} </p>
                  <p className="font-Roboto text-LightGray font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px]">{card.customerRole}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
 
export default BusinessBenefitsSection;