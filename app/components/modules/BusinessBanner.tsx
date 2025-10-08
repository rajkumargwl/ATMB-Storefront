// app/components/BusinessBanner.tsx
import React from "react";

type BusinessBannerProps = {
  title: string;
  cta: {
    label: string;
    url?: string | null;
  };
  image: {
    url: string;
  };
};

const BusinessBanner: React.FC<BusinessBannerProps> = ({ title, cta, image }) => {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 md:px-12 py-12 md:py-20 overflow-hidden rounded-2xl">
      {/* Left Content */}
      <div className="flex-1 text-center md:text-left space-y-6 max-w-xl z-10">
        <h2 className="text-3xl md:text-5xl font-bold leading-tight">{title}</h2>
        {cta?.label && (
          <a
            href={cta.url ?? "#"}
            className="inline-block bg-white text-black font-medium px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition"
          >
            {cta.label}
          </a>
        )}
      </div>

      {/* Right Image */}
      <div className="flex-1 flex justify-center md:justify-end mt-8 md:mt-0 z-10">
        <img
          src={image.url}
          alt={title}
          className="w-60 md:w-80 object-contain drop-shadow-xl"
        />
      </div>

      {/* Background Gradient Overlay (optional for depth) */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 opacity-90 -z-10" />
    </section>
  );
};

export default BusinessBanner;
