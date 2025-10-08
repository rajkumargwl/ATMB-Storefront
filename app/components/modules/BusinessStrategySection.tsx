import { PortableText } from '@portabletext/react';

type BusinessStrategySectionProps = {
  label?: string;
  title: string;
  description: any; // Sanity rich text (Portable Text)
  videoLink?: string | null;
  videoThumbnail?: { url?: string };
};

export default function BusinessStrategySection({
  label,
  title,
  description,
  videoLink,
  videoThumbnail,
}: BusinessStrategySectionProps) {
  return (
    <section className="px-5 py-[40px] md:py-[60px] lg:py-[100px] bg-gradient-to-b from-[#FFFFFF] to-[#F6F6F6]">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left: Image/Thumbnail */}
        <div className="relative w-full">
          {videoThumbnail?.url && (
            <img
              src={videoThumbnail.url}
              alt="video thumbnail"
              className="rounded-[20px] w-full object-cover"
            />
          )}

          {/* Play Button / Label */}
          {label && (
            <div className="absolute inset-0 flex items-center justify-center">
              <a
                href={videoLink || '#'}
                target={videoLink ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white px-5 py-2 rounded-full shadow-md font-Roboto text-[#0A0F1A] text-[16px] font-medium hover:scale-105 transition"
              >
                {label}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-play-circle"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10 8 16 12 10 16 10 8" />
                </svg>
              </a>
            </div>
          )}
        </div>

        {/* Right: Text Content */}
        <div>
          <h2 className="font-Roboto text-[#0A0F1A] font-semibold text-[24px] md:text-[32px] leading-[32px] md:leading-[42px] mb-5">
            {title}
          </h2>

          <div className="font-Roboto text-[#091019] text-[16px] leading-[28px] opacity-90">
            <PortableText value={description} />
          </div>
        </div>
      </div>
    </section>
  );
}
