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
    <section className="w-full py-16 bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-2 items-center">
        {/* Left side: text content */}
        <div className="space-y-6">
          {smallHeading && (
            <p className="font-Roboto text-[#4D4E4F] font-medium leading-[28px] text-[20px]">
              {smallHeading}
            </p>
          )}

          {mainHeading && (
            <h2 className="mt-6 font-Roboto text-PrimaryBlack font-semibold text-[28px] leading-[36px] tracking-[-0.4px]  sm:text-[32px] sm:leading-[42px] sm:tracking-[-0.48px]  max-w-[523px]">
              {mainHeading.split(" ").map((word, idx) => {
                const isHighlighted = highlightedWords?.includes(word);
                return (
                  <span
                    key={idx}
                    className={isHighlighted ? "text-[#FF6600]" : ""}
                  >
                    {word}{" "}
                  </span>
                );
              })}
            </h2>
          )}

          {buttonText && (
            <div>
              <a
                href={buttonLink || "#"}
                target="_blank"
                className="font-Roboto inline-block rounded-full bg-[#FF6600] text-[20px] leading-[16px] px-6 py-3 text-white font-normal hover:bg-orange-600 transition-colors"
              >
                {buttonText}
              </a>
            </div>
          )}
        </div>

        {/* Right side: image */}
        {image?.url && (
          <div className="flex justify-center">
            <img
              src={image.url}
              alt="Career promotion"
              className="rounded-lg shadow-md object-cover max-h-[400px] w-full"
            />
          </div>
        )}
      </div>
    </section>
  );
}
