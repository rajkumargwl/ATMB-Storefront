import { Link } from '@remix-run/react';
 
interface OperatorGrowYourProps {
  module: {
    _type: 'affiliateProgramSection';
    label?: string;
    heading?: string;
    description?: string;
    ctaText?: string;
    ctaUrl?: string;
    image?: {
      asset?: {
        _id: string;
        url: string;
        metadata?: {
          dimensions?: {
            width: number;
            height: number;
          };
        };
      };
      alt?: string;
    };
  };
}
 
export function OperatorGrowYour({ module }: OperatorGrowYourProps) {
  const { label, heading, description, ctaText, ctaUrl, image } = module;
 
  console.log('🎯 OperatorGrowYour COMPONENT CALLED!');
  console.log('📸 Image data:', image);
  console.log('🔗 Image URL:', image?.asset?.url);
 
  return (
      <section className="bg-white px-5 py-[40px] md:py-[54px] lg:py-[54px]">
      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row gap-[62px] lg:gap-[62px] items-center">
        
        {/* Left Content: Text and CTA */}
        <div className="w-full md:w-[48.1%] space-y-5 md:space-y-5">
          
          {label && (
            <p className="font-Roboto text-LightGray font-medium leading-[27px] md:leading-[28px] text-[18px] md:text-[20px] tracking-[0px]">
              {label}
            </p>
          )}
          
         {heading && (
            <h1 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]">
              {heading}
            </h1>
          )}
        
          {description && (
            <p className="font-Roboto text-LightGray font-medium leading-[27px] md:leading-[28px] text-[18px] md:text-[20px] tracking-[0px]">
              {description}
            </p>
          )}
          
          {ctaText && (
            <Link
              to={ctaUrl || "#"}
              className="flex items-center justify-center bg-DarkOrange text-white font-normal font-Roboto leading-[16px] text-[16px] tracking-[0.08px] py-[12px]  px-4 rounded-full w-full md:w-[193px] h-[52px]"
            >
              {ctaText}
            </Link>
          )}
        </div>
          {image?.asset?.url && (
            <div className="w-full md:w-[51.9%] relative">
              <img
                src={image.asset.url}
                alt={image.alt || 'Affiliate Program Image'}
                className="rounded-[20px] w-full max-h-[400px] object-cover"
                loading="lazy"
              />
            </div>
          )}
 
      </div>
    </section>
  );
}
 