import React from "react";

type Icon = {
  url: string;
  alt?: string | null;
};

type Feature = {
  icon?: Icon;
  text: string;
};

type Testimonial = {
  authorImage?: Icon;
  authorName: string;
  authorTitle?: string;
  quote: string;
};

type MainImage = {
  url: string;
  alt?: string;
};

type Props = {
  title: string;
  description: string;
  features: Feature[];
  mainImage?: MainImage;
  testimonial?: Testimonial;
  breadcrumb?: string; // optional, if you want to pass custom breadcrumb text
};

const PdpAnytimePhoneSection: React.FC<Props> = ({
  title,
  description,
  features = [],
  mainImage,
  testimonial,
  breadcrumb = "Home > Anytime Phone",
}) => {
  return (
    <section
      className="max-w-6xl mx-auto py-12 px-6 md:px-8"
      aria-labelledby="anytime-phone-section"
    >
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* ---------- Left Content ---------- */}
        <div>
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="mb-3">
            <p className="text-sm text-gray-500">{breadcrumb}</p>
          </nav>

          {/* Title */}
          <h2
            id="anytime-phone-section"
            className="text-3xl font-semibold text-gray-900 mb-4"
          >
            {title}
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>

          {/* Features */}
          {features?.length > 0 && (
            <ul className="flex flex-wrap gap-6 mb-8">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center text-gray-700 text-sm md:text-base"
                >
                  {feature.icon?.url && (
                    <img
                      src={feature.icon.url}
                      alt={feature.icon.alt || ""}
                      className="w-6 h-6 mr-2 object-contain"
                      aria-hidden={!feature.icon?.alt}
                    />
                  )}
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Testimonial */}
          {testimonial && (
            <blockquote className="border-t border-gray-200 pt-6">
              <span
                aria-hidden="true"
                className="text-orange-500 text-3xl font-serif leading-none mb-2 block"
              >
                “
              </span>
              <p className="text-gray-700 italic mb-5">{testimonial.quote}</p>
              <footer className="flex items-center gap-3">
                {testimonial.authorImage?.url && (
                  <img
                    src={testimonial.authorImage.url}
                    alt={testimonial.authorName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-semibold text-gray-800">
                    {testimonial.authorName}
                  </p>
                  {testimonial.authorTitle && (
                    <p className="text-sm text-gray-500">
                      {testimonial.authorTitle}
                    </p>
                  )}
                </div>
              </footer>
            </blockquote>
          )}
        </div>

        {/* ---------- Right Image ---------- */}
        {mainImage?.url && (
          <div className="flex justify-center">
            <img
              src={mainImage.url}
              alt={mainImage.alt || title}
              className="rounded-2xl shadow-md max-w-full h-auto"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default PdpAnytimePhoneSection;
