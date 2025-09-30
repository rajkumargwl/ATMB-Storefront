import React from "react";

type AffiliateProgramSectionProps = {
  label?: string;
  heading?: string;
  description?: string | null;
  ctaText?: string;
  ctaUrl?: string | null;
  image?: {
    url?: string;
    alt?: string;
  };
};

export default function AffiliateProgramSection({
  label,
  heading,
  description,
  ctaText,
  ctaUrl,
  image,
}: AffiliateProgramSectionProps) {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-8 py-12 px-6 md:px-12 bg-white">
      {/* Left Side */}
      <div className="flex-1 max-w-xl">
        {label && (
          <p className="text-sm font-medium text-gray-500 mb-2">{label}</p>
        )}
        {heading && (
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
            {heading}
          </h2>
        )}
        {description && (
          <p className="text-base text-gray-600 mb-6">{description}</p>
        )}
        {ctaText && (
          <a
            href={ctaUrl ?? "#"}
            className="inline-block px-6 py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
          >
            {ctaText}
          </a>
        )}
      </div>

      {/* Right Side (Image) */}
      {image?.url && (
        <div className="flex-1">
          <img
            src={image.url}
            alt={image.alt || "Affiliate Program"}
            className="rounded-lg shadow-lg w-full object-cover"
          />
        </div>
      )}
    </section>
  );
}
