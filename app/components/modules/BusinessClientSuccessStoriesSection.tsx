import React, { useState } from "react";

type BeforeAfter = {
  beforeTitle: string;
  beforeDescription: string | null;
  afterTitle: string;
  afterDescription: string | null;
  roleTag: string | null;
};

type Testimonial = {
  name: string;
  designation: string | null;
  profileImage: { url: string };
  quoteIcon: { url: string };
  quote: string;
  result: string;
  beforeAfter: BeforeAfter;
};

type Props = {
  heading: string;
  testimonials: Testimonial[];
};

const BusinessClientSuccessStoriesSection: React.FC<Props> = ({
  heading,
  testimonials,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const testimonial = testimonials[currentIndex];

  return (
    <section className="bg-[#FAFAFA] py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading and Navigation */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            {heading}
          </h2>
          
          {/* Navigation - Top Right */}
          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                currentIndex === 0
                  ? "border-[#CC5500] bg-white cursor-not-allowed opacity-50"
                  : "border-[#CC5500] bg-white hover:bg-gray-50 cursor-pointer"
              }`}
              aria-label="Previous testimonial"
              disabled={currentIndex === 0}
            >
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.52637 5.73987C9.56361 5.70263 9.62975 5.70263 9.66699 5.73987C9.70382 5.77706 9.70383 5.84233 9.66699 5.87952L3.2373 12.3092H20.9961C21.05 12.3092 21.0967 12.3559 21.0967 12.4098C21.0966 12.4636 21.0499 12.5094 20.9961 12.5094H3.2373L9.66699 18.9391C9.70416 18.9763 9.70403 19.0424 9.66699 19.0797C9.62975 19.1169 9.56361 19.1169 9.52637 19.0797L2.92676 12.4801C2.88952 12.4429 2.88952 12.3767 2.92676 12.3395L9.52637 5.73987Z"
                  fill="#CC5500"
                  stroke="#CC5500"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                currentIndex === testimonials.length - 1
                  ? "bg-[#CC5500] cursor-not-allowed opacity-50"
                  : "bg-[#CC5500] hover:bg-[#b34a00] cursor-pointer"
              }`}
              aria-label="Next testimonial"
              disabled={currentIndex === testimonials.length - 1}
            >
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.3281 5.73987C14.3654 5.70263 14.4315 5.70263 14.4688 5.73987L21.0684 12.3395C21.1056 12.3767 21.1056 12.4429 21.0684 12.4801L14.4688 19.0797C14.4315 19.1169 14.3654 19.1169 14.3281 19.0797C14.291 19.0424 14.2909 18.9763 14.3281 18.9391L20.7578 12.5094H2.99805C2.9444 12.5092 2.8985 12.4635 2.89844 12.4098C2.89844 12.3561 2.94436 12.3094 2.99805 12.3092H20.7578L14.3281 5.87952C14.2912 5.84232 14.2912 5.77707 14.3281 5.73987Z"
                  fill="white"
                  stroke="white"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <div className="flex flex-col lg:flex-row gap-6 items-stretch">
            {/* Left Card - Testimonial */}
            <div className="bg-gradient-to-b from-[#121418] to-[#1A1C1F] text-white rounded-3xl p-8 w-full lg:w-[45%] flex flex-col justify-between min-h-[400px]">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.profileImage.url}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white"
                  />
                  <div>
                    <h3 className="font-bold text-xl">{testimonial.name}</h3>
                    {testimonial.designation && (
                      <p className="text-sm text-gray-300 mt-1">
                        {testimonial.designation}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <img
                    src={testimonial.quoteIcon.url}
                    alt="Quote"
                    className="w-6 h-6 mb-4"
                  />
                  <p className="text-lg text-gray-200 leading-relaxed">
                    {testimonial.quote}
                  </p>
                </div>
              </div>

              <div className="bg-[#FDF1E6] text-[#1A1C1F] text-base font-semibold rounded-2xl py-3 px-6 inline-block self-start">
                {testimonial.result}
              </div>
            </div>

            {/* Right Card - Before/After */}
            <div className="bg-white rounded-3xl border border-gray-200 p-8 w-full lg:w-[55%] min-h-[400px] flex flex-col">
              {testimonial.beforeAfter.roleTag && (
                <span className="inline-block bg-gray-100 text-gray-700 text-sm font-medium px-4 py-2 rounded-full mb-6 self-start">
                  {testimonial.beforeAfter.roleTag}
                </span>
              )}

              <div className="space-y-8 flex-grow flex flex-col justify-center">
                <div>
                  <h4 className="text-red-500 font-bold text-lg mb-3">
                    {testimonial.beforeAfter.beforeTitle}
                  </h4>
                  {testimonial.beforeAfter.beforeDescription && (
                    <p className="text-gray-700 text-base leading-relaxed">
                      {testimonial.beforeAfter.beforeDescription}
                    </p>
                  )}
                </div>

                <hr className="border-gray-300" />

                <div>
                  <h4 className="text-green-500 font-bold text-lg mb-3">
                    {testimonial.beforeAfter.afterTitle}
                  </h4>
                  {testimonial.beforeAfter.afterDescription && (
                    <p className="text-gray-700 text-base leading-relaxed">
                      {testimonial.beforeAfter.afterDescription}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessClientSuccessStoriesSection;