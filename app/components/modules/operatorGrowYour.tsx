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
      <section className="px-5 py-[40px] md:py-[60px] lg:py-[95px]">
      <div className="max-w-[1249px] mx-auto flex flex-col md:flex-row gap-8 lg:gap-[62px] items-center">
        
        {/* Left Content: Text and CTA */}
        <div className="w-full md:w-[50%] lg:w-[45%] flex flex-col justify-center space-y-4">
          
          {label && (
            <p className="font-sans text-black/80 font-normal leading-normal text-[16px] md:text-[18px]">
              {label}
            </p>
          )}
          
         {heading && (
            <h2 className="max-w-full font-sans text-PrimaryBlack font-bold leading-[36px] md:leading-[48px] text-[30px] md:text-[42px] tracking-tight">
              {heading}
            </h2>
          )}
        
          {description && (
            <p className="font-sans text-PrimaryBlack font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px] mt-4">
              {description}
            </p>
          )}
          
          {ctaText && (
            <Link 
              to={ctaUrl || "#"} 
              className="flex items-center justify-center w-full md:w-[249px] h-[44px] md:h-[52px] rounded-full bg-DarkOrange px-4 py-3 text-white font-Roboto font-normal text-[16px] md:text-[16px] leading-[16px] tracking-[0.08px] transition-all hover:scale-[1.01] hover:bg-[#DD5827]"
            >
              {ctaText}
            </Link>
          )}
        </div>
{image?.asset?.url && (
  <div className="w-full md:w-[50%] flex justify-center">
    <img
      src={image.asset.url}
      alt={image.alt || 'Affiliate Program Image'}
      className="w-full max-w-[538px] rounded-[20px] object-cover"
      loading="lazy"
    />
  </div>
)}

      </div>
    </section>
  );
}
