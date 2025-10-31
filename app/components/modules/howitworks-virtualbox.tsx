import { Link } from '@remix-run/react';
import RightArrowWhite from '~/components/icons/RightArrowWhite';
 
interface HowItWorksVirtualboxProps {
  data: {
    _type: 'howitworksVirtualbox';
    title?: string;
    description?: string;
    links?: Array<{
      label?: string;
      url?: string;
    }>;
    ctaButton?: {
      label?: string;
      url?: string;
    };
    image?: {
      url: string;
      alt?: string;
    };
  };
}
 
export function HowItWorksVirtualbox({ data }: HowItWorksVirtualboxProps) {
  return (
    <section className="px-5 py-[40px] md:py-[54px] bg-white">
      <div className="max-w-[1240px] mx-auto">
        <div className=" flex flex-col md:flex-row gap-[44px] lg:gap-[62px] items-center">
          
          <div className='w-full md:w-[48.1%] space-y-5 md:space-y-5'>
            <h1 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.39px] md:tracking-[-0.54px]">
              {data.title}
            </h1>
            <p className="max-w-[567px] font-Roboto text-LightGray font-medium leading-[27px] md:leading-[28px] text-[18px] md:text-[20px] tracking-[0px]">
              {data.description}
            </p>
            
            {data.links && data.links.length > 0 && (
              <div className="flex flex-wrap gap-5">
                {data.links.map((link, index) => (
                  <Link
                    key={index}
                    to={link.url || '#'}
                    className="group relative  font-Roboto text-DarkOrange font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px] md:tracking-[0px]
                      underline decoration-solid decoration-skip-ink-auto decoration-auto underline-offset-auto  border-r border-LightWhite pr-[20px] last:border-none overflow-hidden transition-all hover:scale-[1.01] hover:bg-[#DD5827]"
                  >
                   
                     <span className="relative flex items-center"> {link.label} <span className="absolute right-0 opacity-0 translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-[35px] transition-all duration-300">
              <RightArrowWhite />
            </span></span>
                  </Link>
                ))}
              </div>
            )}
            
            {data.ctaButton && (
              <Link
                to={data.ctaButton.url || '#'}
                className="group relative flex items-center justify-center w-full md:w-[192px] bg-DarkOrange text-white font-Roboto font-normal leading-[16px] text-[16px] tracking-[0.08px] h-[52px] px-[16px] py-[12px] rounded-[100px] overflow-hidden transition-all hover:scale-[1.01] hover:bg-[#DD5827]"
              >
                
                  <span className="relative flex items-center">{data.ctaButton.label} <span className="absolute right-0 opacity-0 translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-[35px] transition-all duration-300">
              <RightArrowWhite />
            </span></span>
              </Link>
            )}
          </div>
          
          {data.image?.url && (
            <div className="w-full md:w-[51.9%] relative">
              <img
                src={data.image.url}
                alt={data.image.alt || "hero image"}
                className="rounded-[20px] w-full max-h-[400px] object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}