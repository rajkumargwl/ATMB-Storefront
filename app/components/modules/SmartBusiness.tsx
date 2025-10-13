import React from 'react';

type Testimonial = {
  quote: string;
  author: string;
  designation: string;
  authorImage: {
    url: string;
    alt?: string | null;
  };
};

type Props = {
  title: string;
  subtitle: string;
  featureTitle: string;
  features: string[];
  benefitIcons: { url: string }[];
  benefitLabels: string[];
  testimonials: Testimonial[];
};

const SmartBusiness: React.FC<Props> = ({
  title,
  subtitle,
  featureTitle,
  features,
  benefitIcons,
  benefitLabels,
  testimonials,
}) => {
  return (
    <section className="w-full bg-white py-16 px-5 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">
            {title}
          </h2>
          <p className="text-gray-600 mt-3 text-base md:text-lg">
            {subtitle}
          </p>
        </div>

        {/* Content Section */}
        <div className="grid md:grid-cols-2 gap-10 mt-10 items-start">
          {/* Left Column */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-[#1A1A1A] mb-5">
              {featureTitle}
            </h3>

            <ul className="flex flex-col gap-3 mb-8">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-gray-700 text-base"
                >
                  <span className="text-[#FF6B35] text-lg mt-[2px]">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            {/* Benefits */}
            <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-start gap-6 mt-6">
              {benefitIcons.map((icon, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center gap-2"
                >
                  <img
                    src={icon.url}
                    alt={benefitLabels[idx]}
                    className="w-8 h-8"
                  />
                  <p className="text-sm text-gray-700 text-center font-medium">
                    {benefitLabels[idx]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Testimonials */}
          <div className="flex flex-col gap-5">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-5 md:p-6"
              >
                <p className="text-gray-700 text-sm md:text-base mb-4">
                  {testimonial.quote}
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.authorImage.url}
                    alt={testimonial.author}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-[#1A1A1A] text-sm">
                      {testimonial.author}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {testimonial.designation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartBusiness;
