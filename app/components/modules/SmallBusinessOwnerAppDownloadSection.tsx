import React from "react";

interface AppButton {
  icon: {
    url: string;
  };
  link?: string | null;
}

interface SmallBusinessOwnerAppDownloadSectionProps {
  title: string;
  description: string;
  image: {
    url: string;
  };
  buttons: AppButton[];
}

const SmallBusinessOwnerAppDownloadSection: React.FC<SmallBusinessOwnerAppDownloadSectionProps> = ({
  title,
  description,
  image,
  buttons,
}) => {
  return (
    <section className="w-full bg-gradient-to-r from-orange-500 to-orange-600 py-16 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between text-white rounded-2xl overflow-hidden">
      {/* Left Content */}
      <div className="md:w-1/2 flex flex-col justify-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
          {title}
        </h2>
        <p className="text-sm md:text-base text-orange-100">{description}</p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          {buttons?.map((btn, index) => (
            <a
              key={index}
              href={btn.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={btn.icon?.url}
                alt={`Download button ${index + 1}`}
                className="h-12 md:h-14 w-auto hover:scale-105 transition-transform"
              />
            </a>
          ))}
        </div>
      </div>

      {/* Right Image */}
      <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
        <img
          src={image?.url}
          alt="App preview"
          className="max-w-xs md:max-w-sm lg:max-w-md drop-shadow-2xl"
        />
      </div>
    </section>
  );
};

export default SmallBusinessOwnerAppDownloadSection;
