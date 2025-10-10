// app/components/modules/WebinarsTopicsSection.tsx
import React from 'react';
 
type Topic = {
  heading: string;
  icon: { url: string };
  points: string[];
};
 
type WebinarsTopicsSectionProps = {
  title: string;
  description: string;
  topics: Topic[];
};
 
const WebinarsTopicsSection: React.FC<{ data: WebinarsTopicsSectionProps }> = ({ data }) => {
  return (
    <section className="bg-white  py-[40px] md:py-[60px] lg:py-[100px] px-5">
      <div className="max-w-[1240px] mx-auto ">
        <div className='flex flex-col items-center justify-center gap-4 md:gap-5 mb-[44px] md:mb-[56px]'>
          <h2 className="text-center font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]">{data.title}</h2>
          <p className=" max-w-[514px] mx-auto text-center font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px]">{data.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.topics.map((topic) => (
            <div
              key={topic.heading}
              className="border border-LightWhite rounded-[20px] p-6 flex flex-col gap-4"
            >
              <div className="flex items-start gap-3">
                <div className='w-9 h-9 min-w-[36px] bg-DarkOrange rounded-full flex items-center justify-center'>
                  <img src={topic.icon.url} alt={topic.heading} className="w-5 h-5" />
                </div>
                <h3 className="font-Roboto text-PrimaryBlack font-medium leading-[28px] md:leading-[33.6px] text-[20px] md:text-[24px] tracking-[0px]">{topic.heading}</h3>
              </div>
              <ul className="list-disc list-inside flex flex-col gap-3">
                {topic.points.map((point) => (
                  <li key={point} className='font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]'>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
 
export default WebinarsTopicsSection;
 