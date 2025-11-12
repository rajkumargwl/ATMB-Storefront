import { Link } from "@remix-run/react";
import OurFounderBg from "~/components/media/our-founder-bg.png";

interface Founder {
  _key: string;
  name: string;
  role: string;
  bio: string;
  image?: {
    url: string;
  };
  linkedin?: string;
}

interface AboutFoundersSectionProps {
  title: string;
  subtitle?: string;
  founders: Founder[];
}

// 👉 Function to convert name into slug
function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumeric with -
    .replace(/^-+|-+$/g, ""); // trim - from start/end
}

export default function AboutFoundersSection({
  title,
  subtitle,
  founders,
}: AboutFoundersSectionProps) {
  return (
    <section className="relative z-[2] px-5 py-[40px] md:py-[60px] lg:py-[100px] bg-PrimaryBlack">
      <div className="absolute z-[1] top-[0px] left-0">
        <img src={OurFounderBg} alt="Background" className="w-[490px] h-[478px]" />
      </div>
      <div className="max-w-[1240px] mx-auto">
        {/* Section Title */}
        <div className="mb-11 md:mb-[64px] flex items-center flex-col gap-5">
          <h2 className="font-Roboto text-white font-semibold text-[24px] md:text-[36px] text-center">
            {title}
          </h2>
          {subtitle && (
            <p className="font-Roboto text-white text-[16px] md:text-[18px] text-center">
              {subtitle}
            </p>
          )}
        </div>

        {/* Founders Grid */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-[44px] md:gap-[56px]">
          {founders.map((founder) => {
            const slug = slugify(founder.name);
            return (
              <Link
                key={founder._key || founder.name}
                to={`/founderdetails/${slug}`}
                prefetch="intent"
                aria-label={`View profile of ${founder.name}`}
                className="group relative flex flex-col items-start gap-4 hover:scale-[1.02] transition-transform"
              >
                {/* Founder Image */}
                {founder.image?.url && (
                  <div className="flex rounded-[20px] bg-white overflow-hidden">
                    <img
                      src={founder.image.url}
                        alt={`Portrait of ${founder.name}`}
                      className="w-[206px] h-full object-cover"
                    />
                  </div>
                )}

                {/* Founder Content */}
                <div className="flex flex-col gap-1 relative w-full">
                  <h3 className="font-Roboto text-white font-semibold text-[24px]">
                    {founder.name}
                  </h3>
                  <p className="font-Roboto text-white text-[16px]">{founder.role}</p>
                  <p className="text-white opacity-70 leading-relaxed">{founder.bio}</p>
                  <span className="absolute top-[12px] right-0 hidden group-hover:flex items-center justify-center bg-DarkOrange w-9 h-9 rounded-full transition-all">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                    >
                      <path
                        d="M16.0004 4.5C16.2754 4.5 16.5004 4.725 16.5004 5V13C16.5004 13.275 16.2754 13.5 16.0004 13.5C15.7254 13.5 15.5004 13.275 15.5004 13V6.20625L5.35352 16.3531C5.15977 16.5469 4.84102 16.5469 4.64727 16.3531C4.45352 16.1594 4.45352 15.8406 4.64727 15.6469L14.7941 5.5H8.00039C7.72539 5.5 7.50039 5.275 7.50039 5C7.50039 4.725 7.72539 4.5 8.00039 4.5H16.0004Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
