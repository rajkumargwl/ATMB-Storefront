import {PortableText} from '@portabletext/react';
import RightArrowWhite from '~/components/icons/RightArrowWhite';
 
interface OperatorYourCompetitorsProps {
  module: {
    heading?: string;
    description?: any[]; // ← now array of blocks
    ctaText?: string;
    ctaUrl?: string;
    image?: {
      asset?: {
        url: string;
        _id?: string;
      };
      alt?: string;
    };
  };
  imageAspectClassName?: string;
}
 
export function OperatorYourCompetitors({module, imageAspectClassName}: OperatorYourCompetitorsProps) {
  const {heading, description, ctaText, ctaUrl, image} = module;
 
  return (
    <section className="bg-[#F6F6F6] py-[40px] md:py-[60px] lg:py-[100px] px-5">
      <div className="max-w-[1240px] mx-auto">
        <div className="flex flex-col md:flex-row gap-[44px] md:gap-[62px] lg:gap-[108px] items-center">
          {image?.asset?.url ? (
            <div className="w-full md:w-[48.75%] order-2 md:order-1">
              <img
                src={image.asset.url}
                alt={image.alt || 'Competitive Analysis'}
                className={`rounded-[20px] w-full min-h-[300px] md:min-h-[506px] ${imageAspectClassName || 'object-cover'}`}
              />
            </div>
          ) : (
            <div className="w-full md:w-[48.75%] bg-gray-100 rounded-2xl shadow-xl h-96 flex items-center justify-center">
              <span className="text-gray-500">Image placeholder</span>
            </div>
          )}
 
          <div className="w-full md:w-[51.25%] relative flex flex-col gap-4 order-1 md:order-2">
            {heading && (
              <h2 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]">
                {heading}
              </h2>
            )}
 
            {description && (
              <div className="font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[24px] text-[14px] md:text-[16px] tracking-[0px] flex flex-col gap-5">
                <PortableText value={description} />
              </div>
            )}
 
            {ctaText && ctaUrl && (
              <a
                href={ctaUrl}
                className="flex items-center justify-center bg-DarkOrange text-white font-normal font-Roboto leading-[16px] text-[16px] tracking-[0.08px] py-[12px] px-4 rounded-full w-full md:w-[227px] h-[44px] md:h-[52px]"
              >
                {ctaText}
              </a>
            )}
            {ctaText && !ctaUrl && (
              <button className="group relative overflow-hidden  flex items-center justify-center bg-DarkOrange text-white font-normal font-Roboto leading-[16px] text-[16px] tracking-[0.08px] py-[12px] px-4 rounded-full w-full md:w-[227px] h-[44px] md:h-[52px] transition-all  hover:bg-[#DF5D07] hover:text-white hover:md:w-[257px]">
                
                   <span className="relative flex items-center transition-all duration-300">{ctaText}<span className="relative right-0 opacity-0 translate-x-[12px] hidden group-hover:opacity-100 group-hover:block group-hover:translate-x-[12px] transition-all duration-300">
              <RightArrowWhite />
            </span></span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
 