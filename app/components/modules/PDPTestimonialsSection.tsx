import React from "react";
import { Star } from "lucide-react";

type Video = {
  thumbnail?: { url?: string; alt?: string };
  url?: string;
};

type Testimonial = {
  rating?: number;
  quote?: string;
  authorName?: string;
  authorRole?: string;
  authorImage?: { url?: string; alt?: string };
  video?: Video;
  readMoreLink?: string;
};

type Props = {
  heading?: string;
  testimonials?: Testimonial[];
};

export default function PDPTestimonialsSection({ heading, testimonials }: Props) {
  return (
    <section className="px-5 py-[60px] md:py-[80px] lg:py-[100px] bg-[#F6F6F6]">
      <div className="max-w-[1200px] mx-auto text-center">
        {/* Section Heading */}
        {heading && (
          <h2 className="text-[28px] md:text-[40px] font-semibold text-PrimaryBlack leading-tight mb-12">
            {heading}
          </h2>
        )}

        {/* Testimonials Grid */}
        {testimonials && testimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px] md:gap-[40px]">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[16px] shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col text-left"
              >
                {/* Rating */}
                {t.rating && (
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={
                          i < Math.round(t.rating)
                            ? "text-[#FFD700] fill-[#FFD700]"
                            : "text-[#E0E0E0]"
                        }
                      />
                    ))}
                    <span className="ml-2 text-[#666] text-sm">
                      {t.rating.toFixed(1)}
                    </span>
                  </div>
                )}

                {/* Quote */}
                {t.quote && (
                  <p className="text-[#333] text-[16px] leading-relaxed mb-4 line-clamp-5">
                    “{t.quote}”
                  </p>
                )}

                {/* Optional Video */}
                {t.video?.thumbnail?.url && (
                  <a
                    href={t.video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block group mb-4"
                  >
                    <img
                      src={t.video.thumbnail.url}
                      alt={t.video.thumbnail.alt || ""}
                      className="w-full h-[180px] object-cover rounded-[12px] group-hover:opacity-90 transition"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-[50px] h-[50px] bg-white/90 rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6 text-[#0071E3]"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </a>
                )}

                {/* Author Info */}
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
                  {t.authorImage?.url && (
                    <img
                      src={t.authorImage.url}
                      alt={t.authorImage.alt || ""}
                      className="w-[48px] h-[48px] rounded-full object-cover"
                    />
                  )}
                  <div>
                    {t.authorName && (
                      <h4 className="text-[16px] font-semibold text-[#111]">
                        {t.authorName}
                      </h4>
                    )}
                    {t.authorRole && (
                      <p className="text-[#777] text-[14px]">{t.authorRole}</p>
                    )}
                  </div>
                </div>

                {/* Optional Read More Link */}
                {t.readMoreLink && (
                  <a
                    href={t.readMoreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 text-[#0071E3] text-[14px] font-medium hover:underline"
                  >
                    Read More →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
