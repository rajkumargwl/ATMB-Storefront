
import { Link } from '@remix-run/react';
 
interface HowItWorksHeroProps {
  data: {
    _type: 'uspsForm1583Guide';
    title?: string;
    description?: string;
    image?: {
      url: string;
      alt?: string;
    };
  };
}
 
export function HowItWorksHero({ data }: HowItWorksHeroProps) {
  return (
    <section className="w-full bg-[#F6F6F6] py-[40px] md:py-[60px] lg:py-[100px] px-5">
      <div className="max-w-[1240px] mx-auto">
        <div className="flex flex-col md:flex-row gap-[44px] lg:gap-[110px] items-start">
          
          {data.image?.url && (
            <div className="w-full md:w-[54.35%] flex flex-col relative order-2 md:order-1">
              <img
                src={data.image.url}
                alt={data.image.alt || "virtual mailbox image"}
                className="w-full md:max-h-[393px] object-cover"
              />
            </div>
          )}
 
          <div className='w-full md:w-[45.65%] flex flex-col relative gap-4 order-1 md:order-2'>
            <h2 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]">
              {data.title}
            </h2>
            <p className="font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[24px] text-[14px] md:text-[16px] tracking-[0px]">
              {data.description}
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}
 