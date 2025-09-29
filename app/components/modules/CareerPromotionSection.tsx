import React from "react";

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
    <section className="max-w-[1240px] mx-auto px-6 md:px-0 items-center justify-between py-16 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center">
        {/* Left side: text content */}
        <div className="space-y-5">
          {smallHeading && (
            <p className="font-Roboto text-[#4D4E4F] font-medium leading-[28px] text-[20px]">
              {smallHeading}
            </p>
          )}

          {mainHeading && (
            <h1 className="mt-5 font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] tracking-[-0.36px] text-[24px] lg:text-[36px] lg:leading-[43.2px] lg:tracking-[-0.54px] max-w-[529px]">
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
            <div>
              <a
                href={buttonLink || "#"}
                target="_blank"
                className="font-Roboto inline-block rounded-full bg-[#FF6600] text-[16px] leading-[16px] px-4 py-3 text-white font-normal hover:bg-orange-600 transition-colors"
              >
                {buttonText}
              </a>
            </div>
          )}
        </div>

        {/* Right side: image */}
        {image?.url && (
          <div className="flex justify-center lg:justify-end">
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
