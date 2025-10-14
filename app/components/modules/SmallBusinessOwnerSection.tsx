import React from 'react';

type BrandLogo = {
  alt: string;
  url: string;
};

type CTA = {
  label: string;
  url?: string | null;
};

type Props = {
  title: string;
  description: string;
  trustedByText: string;
  ownerImage: { url: string };
  brandLogos?: BrandLogo[];
  primaryCta?: CTA;
  secondaryCta?: CTA;
};

export default function SmallBusinessOwnerSection({
  title,
  description,
  trustedByText,
  ownerImage,
  brandLogos = [],
  primaryCta,
  secondaryCta,
}: Props) {
  return (
    <section className="w-full bg-[#F9FAFB] py-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12">
        {/* LEFT CONTENT */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            {title}
          </h1>
          <p className="text-lg text-gray-600">{description}</p>

          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            {primaryCta?.label && (
              <a
                href={primaryCta.url || '#'}
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-base font-semibold rounded-lg text-center"
              >
                {primaryCta.label}
              </a>
            )}
            {secondaryCta?.label && (
              <a
                href={secondaryCta.url || '#'}
                className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 text-base font-semibold rounded-lg text-center"
              >
                {secondaryCta.label}
              </a>
            )}
          </div>

          {/* TRUSTED TEXT */}
          <p className="text-sm text-gray-500 mt-6">{trustedByText}</p>

          {/* BRAND LOGOS */}
          {brandLogos.length > 0 && (
            <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-4">
              {brandLogos.map((logo, index) => (
                <img
                  key={index}
                  src={logo.url}
                  alt={logo.alt}
                  className="h-8 object-contain opacity-80 hover:opacity-100 transition"
                />
              ))}
            </div>
          )}
        </div>

        {/* RIGHT IMAGE */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src={ownerImage.url}
            alt="Small business owner"
            className="max-w-md w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
