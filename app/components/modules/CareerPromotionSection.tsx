import React from "react";
import RightArrowWhite from '~/components/icons/RightArrowWhite';
 
type Props = {
  smallHeading?: string;
  mainHeading?: string;
  highlightedWords?: string[];
  buttonText?: string;
  buttonLink?: string | null;
  image?: {
    url?: string;
  };
};
 
export default function CareerPromotionSection({
  smallHeading,
  mainHeading,
  highlightedWords = [],
  buttonText,
  buttonLink,
  image,
}: Props) {
  return (
    <section className="max-w-[1240px] mx-auto px-6 max-1265px:px-4 max-1265px:gap-2 items-center justify-between py-16 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center">
        {/* Left side: text content */}
        <div className="md:space-y-5">
          {smallHeading && (
            <p className="font-Roboto text-[#4D4E4F] font-medium leading-[28px] text-[20px]">
              {smallHeading}
            </p>
          )}
 
          {mainHeading && (
            <h1 className="mt-5 mb-4 md:mb-0 font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] tracking-[-0.36px] text-[24px] md:text-[36px] md:leading-[43.2px] md:tracking-[-0.54px] max-w-[529px]">
             {mainHeading.split(/(\s+)/).map((chunk, idx) => {
              if (chunk.trim() === "") {
                return chunk; // preserve spaces
              }
 
              const cleanWord = chunk.replace(/[.,!?—]/g, "");
              const isHighlighted = highlightedWords?.some(
                (w) => w.toLowerCase() === cleanWord.toLowerCase()
              );
 
              return isHighlighted ? (
                <span key={idx} className="text-[#FF6600]">
                  {chunk}
                </span>
              ) : (
                chunk
              );
            })}
 
            </h1>
          )}
 
          {buttonText && (
            <div className="max-1265px:mb-4">
              <a
                href={buttonLink || "#"}
                target="_blank"
                className="group flex items-center justify-center bg-DarkOrange text-white font-normal font-Roboto leading-[16px] text-[16px] tracking-[0.08px] py-[12px]  px-4 rounded-full w-full md:w-[230px] h-[44px]  overflow-hidden transition-all hover:scale-[1.01] hover:bg-[#DF5D07]"
              >
                {buttonText}
                 {/* <span className="relative flex items-center">{buttonText} <span className="absolute right-0 opacity-0 translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-[25px] transition-all duration-300">
              <RightArrowWhite />
            </span></span> */}
              </a>
            </div>
          )}
        </div>
 
        {/* Right side: image */}
        {image?.url && (
          <div className="flex justify-center md:justify-end">
            <img
              src={image.url}
              alt="Career promotion"
               className="rounded-xl shadow-md w-full h-auto lg:w-[611px] lg:h-[443px] object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}