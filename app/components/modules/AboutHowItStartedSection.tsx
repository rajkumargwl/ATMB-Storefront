// ~/components/modules/AboutHowItStartedSection.tsx
import {PortableText} from '@portabletext/react';
 
type Props = {
  heading: string;
  content: any[];
  image?: {
    url?: string;
    alt?: string;
  };
};
 
export default function AboutHowItStartedSection({heading, content, image}: Props) {
  return (
    <section className="px-5 py-[40px] md:py-[60px] lg:py-[100px] bg-[#F6F6F6]">
      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row gap-[44px] lg:gap-[142px] items-center">
        
        {/* Left image */}
        {image?.url && (
          <div className="w-full md:w-[50.1%] relative order-2 md:order-1">
            <img
              src={image.url}
              alt={image.alt || ''}
              className="rounded-[20px] w-full object-cover"
            />
          </div>
        )}
 
        {/* Right content */}
        <div className="w-full md:w-[49.9%] space-y-4 md:space-y-4 order-1 md:order-2">
          <h2 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]">{heading}</h2>
          
          {content?.length > 0 && (
            <div className="prose prose-lg how-started">
              <PortableText value={content} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}