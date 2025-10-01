import React from "react";

interface Card {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string | null;
  image?: { url?: string };
}

interface SolutionMailboxLocationHowItWorksProps {
  data?: {
    title?: string;
    subtitle?: string;
    cards?: Card[];
  };
}

const SolutionMailboxLocationHowItWorks: React.FC<SolutionMailboxLocationHowItWorksProps> = ({
  data,
}) => {
  return (
    <section className="w-full bg-[#0B0E12] text-white py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Title + Subtitle */}
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          {data?.title || ""}
        </h2>
        <p className="text-gray-300 mb-12">{data?.subtitle || ""}</p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data?.cards?.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden text-left flex flex-col"
            >
              {/* Image */}
              {card?.image?.url && (
                <img
                  src={card.image.url}
                  alt={card?.title || "Card image"}
                  className="w-full h-48 object-cover"
                />
              )}

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-black text-xl font-semibold mb-2">
                  {card?.title || ""}
                </h3>
                <p className="text-black text-sm mb-6 flex-1">
                  {card?.description || ""}
                </p>

                {/* Button */}
                {card?.buttonText && (
                  <div>
                    <a
                      href={card?.buttonLink || "#"}
                      className="block w-full text-center bg-orange-500 text-white font-medium rounded-full py-2 px-4 hover:bg-orange-600 transition"
                    >
                      {card.buttonText}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )) || null}
        </div>
      </div>
    </section>
  );
};

export default SolutionMailboxLocationHowItWorks;
