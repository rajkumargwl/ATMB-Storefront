import React from "react";
 
interface Benefit {
  icon: { url: string };
  text: string;
}
 
interface Faq {
  question: string;
  answer: string;
}
 
interface SolutionMailboxBenefitFaqProps {
  data: {
    title: string;
    subtitle: string;
    benefits: Benefit[];
    faqs: Faq[];
    rightImage: { url: string };
  };
}
 
const SolutionMailboxBenefitFaq: React.FC<SolutionMailboxBenefitFaqProps> = ({ data }) => {
  return (
    <section className="bg-PrimaryBlack text-white py-[40px] md:py-[60px] lg:py-[100px] px-5">
      <div className="max-w-[1240px] mx-auto">
        {/* Title + Subtitle */}
        <div className="flex flex-col items-center justify-center gap-4 md:gap-5 mb-[44px] md:mb-[56px]">
          <h2 className="font-Roboto text-white font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]">{data.title}</h2>
          <p className="text-center font-Roboto text-white font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px]">{data.subtitle}</p>
        </div>
 
        {/* Main Grid */}
        <div className="flex flex-col md:flex-row gap-8 items-stretch items-center max-w-[1192px] mx-auto">
          {/* Benefits */}
          <div className="w-full md:w-[67.57%] grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-y-6 gap-x-8">
            {data.benefits.map((benefit, index) => (
              <div
                key={index}
                className="md:min-h-[218px] bg-white rounded-[20px] border border-LightWhite p-6 flex flex-col items-start space-y-6"
              >
                <div className="w-11 h-11 bg-DarkOrange rounded-full flex items-center justify-center">
                  <img
                    src={benefit.icon.url}
                    alt="Benefit Icon"
                    className="w-6 h-6 flex-shrink-0"
                  />
                </div>
                <p className="font-Roboto text-PrimaryBlack font-medium leading-[28px] md:leading-[33.6px] text-[20px] md:text-[24px] tracking-[0px]">{benefit.text}</p>
              </div>
            ))}
          </div>
 
          {/* Right Image */}
          <div className="w-full md:w-[32.43%] flex justify-center">
            <div className="flex items-end w-full h-full bg-DarkOrange rounded-[20px] px-6 pb-6 pt-[74px] flex justify-center">
              <img
                src={data.rightImage.url}
                alt="Virtual Mailbox Preview"
                className="max-w-[302px] w-full mb-[-24px]"
              />
            </div>
          </div>
        </div>
 
        {/* FAQs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-[64px]">
          {data.faqs.map((faq, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 bg-[#F6F6F6] md:bg-white rounded-[12px] border border-LightWhite p-6 text-left"
            >
              <h3 className="font-Roboto text-PrimaryBlack font-medium leading-[28px] md:leading-[28px] text-[20px] md:text-[20px] tracking-[0px]">{faq.question}</h3>
              <p className="font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
 
export default SolutionMailboxBenefitFaq;