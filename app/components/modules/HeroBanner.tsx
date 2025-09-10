// ./components/modules/HeroBanner.tsx
import React from 'react';

type HeroBannerProps = {
  data: {
    title: string;
    subtitle?: string;
    ctaText?: string;
    ctaUrl?: string | null;
    background?: {
      asset?: {url?: string};
    } | null;
  };
};

export default function HeroBanner({data}: HeroBannerProps) {
  const bgUrl = data.background?.asset?.url;

  return (
    <section
      className="relative flex flex-col items-center justify-center py-20 text-center"
      style={{
        background: bgUrl
          ? `url(${bgUrl}) center/cover no-repeat`
          : 'linear-gradient(to right, #f9fafb, #f3f4f6)',
      }}
    >
      <div className="max-w-3xl px-4">
        <h1 className="text-4xl font-bold md:text-5xl">{data.title}</h1>
        {data.subtitle && (
          <p className="mt-4 text-lg text-gray-600 md:text-xl">{data.subtitle}</p>
        )}
        {data.ctaText && (
          <div className="mt-6 flex justify-center">
            <a
              href={data.ctaUrl ?? '#'}
              className="rounded-full bg-black px-6 py-3 text-white hover:bg-gray-800"
            >
              {data.ctaText}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
