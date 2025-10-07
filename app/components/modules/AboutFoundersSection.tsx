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
 
export default function AboutFoundersSection({
  title,
  subtitle,
  founders,
}: AboutFoundersSectionProps) {
  return (
    <section className="relative z-[2] px-5 py-[40px] md:py-[60px] lg:py-[100px] bg-PrimaryBlack">
      <div className="absolute z-[1] top-[0px] left-0">
        <img src={OurFounderBg} alt="Background" className="w-[490px] h-[478px]"/>
        </div>
      <div className="max-w-[1240px] mx-auto">
        {/* Section Title */}
        <div className="mb-11 md:mb-[64px] flex items-center flex-col gap-5">
          <h2 className="font-Roboto text-white font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px] text-center">
            {title}
          </h2>
          {subtitle && (
            <p className="font-Roboto text-white font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px] text-center">{subtitle}</p>
          )}
          
        </div>
 
        {/* Founders Grid */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-[44px] md:gap-[56px]">
          {founders.map((founder) => (
            <div
              key={founder._key || founder.name}
              className="group relative flex flex-col items-start gap-4"
            >
              {/* Founder Image */}
              {founder.image?.url && (
                <div className="flex rounded-[20px] bg-white">
                  <img
                    src={founder.image.url}
                    alt={founder.name}
                    className="w-[206px] h-full object-cover"
                  />
                </div>
              )}
 
              {/* Founder Content */}
              <div className="flex flex-col gap-1 relative w-full">
                <h3 className="font-Roboto text-white font-semibold leading-[31.2px] md:leading-[31.2px] text-[24px] md:text-[24px] tracking-[-0.36px] md:tracking-[-0.36px]">
                  {founder.name}
                </h3>
                <p className="font-Roboto text-white font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">{founder.role}</p>
                <p className="text-black leading-relaxed">{founder.bio}</p>
                <span className="absolute top-[12px] right-0 hidden group-hover:flex items-center justify-center bg-DarkOrange w-9 h-9 rounded-full transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                    <path d="M16.0004 4.5C16.2754 4.5 16.5004 4.725 16.5004 5V13C16.5004 13.275 16.2754 13.5 16.0004 13.5C15.7254 13.5 15.5004 13.275 15.5004 13V6.20625L5.35352 16.3531C5.15977 16.5469 4.84102 16.5469 4.64727 16.3531C4.45352 16.1594 4.45352 15.8406 4.64727 15.6469L14.7941 5.5H8.00039C7.72539 5.5 7.50039 5.275 7.50039 5C7.50039 4.725 7.72539 4.5 8.00039 4.5H16.0004Z" fill="white"/>
                  </svg>
                </span>
 
                {founder.linkedin && (
                  <Link
                    to={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700 transition"
                  >
                    {/* LinkedIn Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19 0h-14c-2.76 0-5 2.24-5
                      5v14c0 2.76 2.24 5 5 5h14c2.76
                      0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.75
                      20h-3v-11h3v11zm-1.5-12.25c-.97
                      0-1.75-.79-1.75-1.75s.78-1.75
                      1.75-1.75 1.75.79
                      1.75 1.75-.78 1.75-1.75
                      1.75zm13.25 12.25h-3v-5.5c0-1.1-.9-2-2-2s-2
                      .9-2 2v5.5h-3v-11h3v1.56c.69-.9
                      1.77-1.56 3-1.56 2.21
                      0 4 1.79 4 4v7z" />
                    </svg>
                    View Profile
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
 