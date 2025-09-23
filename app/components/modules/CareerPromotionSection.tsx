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
            <p className="text-sm font-medium text-gray-600">
              {smallHeading}
            </p>
          )}

          {mainHeading && (
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl leading-snug">
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
                className="inline-block rounded-full bg-[#FF6600] px-6 py-3 text-white font-semibold hover:bg-orange-600 transition-colors"
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
