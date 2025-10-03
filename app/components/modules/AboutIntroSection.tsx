// ~/components/modules/AboutIntroSection.tsx
import {PortableText} from '@portabletext/react';
 
type Props = {
  label?: string;
  heading: string;
  description?: any;
  highlightedText?: string;
  buttonText?: string;
  buttonLink?: string; // keep for backward compatibility
  video?: {
    thumbnail?: { url?: string; alt?: string };
    url?: string;
  };
};
 
export default function AboutIntroSection({
  label,
  heading,
  description,
  highlightedText,
  buttonText,
  buttonLink,
  video,
}: Props) {
  return (
    <section className="px-5 py-[40px] md:py-[54px] bg-white">
      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row gap-[44px] lg:gap-[62px] items-center">
        {/* Left content */}
        <div className="w-full md:w-[48.1%] space-y-4 md:space-y-5">
          {label && (
            <p className="font-Roboto text-LightGray font-medium leading-[27px] md:leading-[28px] text-[18px] md:text-[20px] tracking-[0px]">
              {label}
            </p>
          )}
 
          <h1 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.39px] md:tracking-[-0.54px]">
            {heading}
          </h1>
 
          {description && (
            <div className="prose prose-lg text-gray-700">
              <PortableText value={description} />
            </div>
          )}
 
          {highlightedText && (
            <p className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.39px] md:tracking-[-0.54px]">
              {highlightedText}
            </p>
          )}
        </div>
 
        {/* Right video thumbnail (same as image) */}
        {video?.thumbnail?.url && (
          <div className="w-full md:w-[51.9%] relative">
            <img
              src={video.thumbnail.url} // ✅ now using thumbnail
              alt={video.thumbnail.alt || ''}
              className="rounded-[20px] w-full max-h-[400px] object-cover"
            />
            {buttonText && (
              <a
                href={video.url ?? buttonLink ?? '#'} // ✅ button links to video url if present
                target="_blank"
                rel="noopener noreferrer"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-PrimaryBlack
                font-Roboto text-PrimaryBlack font-normal text-[16px] md:text-[16px] leading-[16px] tracking-[0.08px] px-4 py-3 rounded-full flex
                items-center gap-3  transition-all min-w-[205px] lg:min-w-[204px] h-[44px] md:h-[52px]"
              >
                {buttonText}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5.53578 3.80986C5.08203 4.07986 4.80078 4.57111 4.80078 5.09986V18.8999C4.80078 19.4286 5.08203 19.9199 5.53578 20.1899C5.98953 20.4599 6.55578 20.4711 7.02078 20.2161L19.6208 13.3161C20.1008 13.0536 20.4008 12.5474 20.4008 11.9999C20.4008 11.4524 20.1008 10.9461 19.6208 10.6836L7.02078 3.78361C6.55578 3.52861 5.99328 3.53986 5.53578 3.80986ZM6.44328 4.83736L19.0433 11.7374C19.1408 11.7899 19.2008 11.8911 19.2008 11.9999C19.2008 12.1086 19.1408 12.2099 19.0433 12.2624L6.44328 19.1624C6.34953 19.2149 6.23703 19.2111 6.14703 19.1586C6.05703 19.1061 6.00078 19.0049 6.00078 18.8999V5.09986C6.00078 4.99486 6.05703 4.89736 6.14703 4.84111C6.23703 4.78486 6.34953 4.78486 6.44328 4.83736Z"
                    fill="black"
                  />
                </svg>
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
 