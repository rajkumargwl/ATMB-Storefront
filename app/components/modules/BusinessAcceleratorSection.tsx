import { PortableText } from '@portabletext/react';

type BusinessAcceleratorSectionProps = {
  data: {
    _key?: string;
    _type?: string;
    title?: string;
    description?: string;
    image?: { url?: string };
    cta?: { label?: string; url?: string | null };
    [key: string]: any;
  };
};

export default function BusinessAcceleratorSection({ data }: BusinessAcceleratorSectionProps) {
  // if (!data) return null; // safety check
console.log('troggggededd');
  console.log('BusinessAcceleratorSection data:', data);

  return (
    <section
      className=" text-black py-20"
      aria-labelledby="business-accelerator-title"
      role="region"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-10 items-center">
        {/* Text Content */}
        <div className="space-y-6">
          {data.title && (
            <h2
              id="business-accelerator-title"
              className="font-Roboto text-PrimaryBlack font-bold text-[24px] leading-[31.2px] tracking-[-0.36px] lg:text-[36px] lg:leading-[43.2px] lg:tracking-[-0.54px] max-w-[523px]"
            >
              {data.title}
            </h2>
          )}

          {data.description && (
            <p className="text-[18px] text-[#091019] font-[400] leading-[27px] max-w-[480px]">
              {data.description}
            </p>
          )}

          {data.cta?.label && (
            <a
              href={data.cta.url ?? '#'}
              className="inline-block bg-[#FF5A1F] text-white text-[16px] font-semibold px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A1F] hover:bg-[#e24e1c] transition-colors duration-200"
              aria-label={data.cta.label}
            >
              {data.cta.label}
            </a>
          )}
        </div>

        {/* Image */}
        {data.image?.url && (
          <div className="w-full h-full">
            <img
              src={data.image.url}
              alt={data.title ?? 'Business growth presentation'}
              className="rounded-lg shadow-md object-cover w-full h-auto"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </section>
  );
}
