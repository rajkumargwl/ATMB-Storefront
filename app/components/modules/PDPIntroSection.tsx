import {PortableText} from '@portabletext/react';

type Feature = {
  text?: string;
  icon?: {
    url?: string;
  };
};

type Testimonial = {
  quote?: string;
  author?: string;
  role?: string;
  authorImage?: {
    url?: string;
  };
};

type Props = {
  heading?: string;
  description?: string;
  features?: Feature[];
  testimonial?: Testimonial;
  rightImage?: {
    url?: string;
  };
};

export default function PDPIntroSection({
  heading,
  description,
  features,
  testimonial,
  rightImage,
}: Props) {
  return (
    <section className="px-5 py-[40px] md:py-[60px] lg:py-[100px] bg-[#F6F6F6]">
      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row gap-[44px] lg:gap-[120px] items-center">
        
        {/* Left side content */}
        <div className="w-full md:w-[55%] space-y-6 order-2 md:order-1">
          {/* Heading */}
          {heading && (
            <h1 className="font-Roboto text-PrimaryBlack font-semibold leading-[38px] md:leading-[52px] text-[28px] md:text-[44px] tracking-tight">
              {heading}
            </h1>
          )}

          {/* Description */}
          {description && (
            <p className="text-[#4B4B4B] text-[16px] md:text-[18px] leading-[26px] md:leading-[28px]">
              {description}
            </p>
          )}

          {/* Features List */}
          {features && features.length > 0 && (
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  {feature.icon?.url && (
                    <img
                      src={feature.icon.url}
                      alt=""
                      className="w-6 h-6 object-contain"
                    />
                  )}
                  <span className="text-[16px] text-[#333]">{feature.text}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Testimonial */}
          {testimonial?.quote && (
            <div className="mt-8 p-5 rounded-[12px] bg-white shadow-md flex items-start gap-4">
              {testimonial.authorImage?.url && (
                <img
                  src={testimonial.authorImage.url}
                  alt={testimonial.author || ''}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <p className="italic text-[#555] mb-2">“{testimonial.quote}”</p>
                <p className="text-[14px] font-semibold text-[#111]">
                  {testimonial.author}
                </p>
                <p className="text-[13px] text-[#777]">{testimonial.role}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right image */}
        {rightImage?.url && (
          <div className="w-full md:w-[45%] relative order-1 md:order-2">
            <img
              src={rightImage.url}
              alt=""
              className="rounded-[20px] w-full object-cover shadow-md"
            />
          </div>
        )}
      </div>
    </section>
  );
}
