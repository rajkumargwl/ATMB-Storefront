import { PortableText } from '@portabletext/react';
import RightArrowWhite from '~/components/icons/RightArrowWhite';
 
type BusinessAcceleratorSectionProps = {
  data: {
    _key?: string;
    _type?: string;
    title?: string;
    description?: string;
     highlightedText?: string;
    image?: { url?: string };
    cta?: { label?: string; url?: string | null };
    [key: string]: any;
  };
};
 
export default function BusinessAcceleratorSection({ data }: BusinessAcceleratorSectionProps) {
  // if (!data) return null; // safety check
const getHighlightedTitle = (title: string, highlightedText?: string) => {
    if (!highlightedText) return title;
    const parts = title.split(new RegExp(`(${highlightedText})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === highlightedText.toLowerCase() ? (
        <span key={index} className="text-DarkOrange">
          {part}
        </span>
      ) : (
        part
      )
    );
  };
 
  return (
    <section
      className="px-5 py-[40px] md:py-[54px] bg-white"
      aria-labelledby="business-accelerator-title"
      role="region"
    >
 
      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row gap-[62px] lg:gap-[135px] items-center">
        {/* Text Content */}
        <div className="w-full md:w-[51.4%] space-y-5 md:space-y-5">
          {data.title && (
             <h2
              id="business-accelerator-title"
              className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]"
            >
              {getHighlightedTitle(data.title, data.highlightedText)}
            </h2>
          )}
 
          {data.description && (
            <p className="font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px]">
              {data.description}
            </p>
          )}
 
          {data.cta?.label && (
            <a
              href={data.cta.url ?? '/PDP/business-accelerator'}
              className="group relative overflow-hidden flex items-center justify-center bg-DarkOrange text-white font-normal font-Roboto leading-[16px] text-[16px] tracking-[0.08px] py-[12px]  px-4 rounded-full w-full md:w-[209px] h-[52px] transition-all hover:scale-[1.01] hover:bg-[#DF5D07]"
              aria-label={data.cta.label}
            >
             <span className="relative flex items-center">{data.cta.label} <span className="absolute right-0 opacity-0 translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-[30px] transition-all duration-300">
              <RightArrowWhite />
            </span></span>
            </a>
          )}
        </div>
 
        {/* Image */}
        {data.image?.url && (
          <div className="w-full md:w-[48.6%] relative">
            <img
              src={data.image.url}
              alt={data.title ?? 'Business growth presentation'}
              className="rounded-[20px] w-full max-h-[400px] object-cover"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </section>
  );
}