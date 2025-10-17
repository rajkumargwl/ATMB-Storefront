import React from 'react';
 
type Challenge = {
  title: string;
  description: string;
  quote: string;
  author: {
    name: string;
    designation: string;
  };
  icon: {
    url: string;
    alt?: string | null;
  };
};
 
type Props = {
  title: string;
  subtitle: string;
  challenges: Challenge[];
};
 
const SmallBusinessChallanges : React.FC<Props> = ({ title, subtitle, challenges }) => {
  return (
    <section className="px-5 py-[40px] md:py-[60px] lg:py-[100px] bg-PrimaryBlack">
      <div className="max-w-[1240px] mx-auto">
        <div className='flex flex-col items-center justify-center gap-5 md:gap-5 mb-[40px] md:mb-[64px]'>
          <h2 className="text-center font-Roboto text-white font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]">{title}</h2>
          <p className="text-center font-Roboto text-white font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px]">{subtitle}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {challenges.map((challenge) => (
            <div key={challenge.title} className="md:min-h-[463px] bg-white rounded-[24px] p-6 flex flex-col items-start justify-between  border border-LightWhite">
              <div>
                <div className='w-11 h-11 mb-5 bg-DarkOrange rounded-full flex items-center justify-center'>
                  <img
                    src={challenge.icon.url}
                    alt={challenge.icon.alt || challenge.title}
                    className="w-6 h-6"
                  />
                </div>
                <h3 className="font-Roboto text-PrimaryBlack font-semibold leading-[28px] md:leading-[31.2px] text-[20px] md:text-[24px] tracking-[-0.3px] md:racking-[-0.36px] mb-5 md:mb-5">{challenge.title}</h3>
                <p className="font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[24px] text-[14px] md:text-[16px] tracking-[0px] mb-6 md:mb-2">{challenge.description}</p>
              </div>
              <div className="p-5 min-h-[166px] flex flex-col gap-4 md:gap-[0] justify-between rounded-[12px] border-l-[2px] border-l-DarkOrange bg-[#F6F6F6]">
                <blockquote className="italic font-Roboto text-PrimaryBlack font-normal leading-[20.8px] md:leading-[20.8px] text-[16px] md:text-[16px] tracking-[0px]">{challenge.quote}</blockquote>
                <p className="flex flex-col gap-[2px]">
                   <span className='font-Roboto text-PrimaryBlack font-medium leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]'>{challenge.author.name}</span>
                   <span className='font-Roboto text-LightGray font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px]'>{challenge.author.designation}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
 
export default SmallBusinessChallanges;