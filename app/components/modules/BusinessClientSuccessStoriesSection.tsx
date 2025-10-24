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
  const isLastSlide = currentIndex === testimonials.length - 1;
  const nextTestimonial = !isLastSlide ? testimonials[(currentIndex + 1) % testimonials.length] : null;
 
  return (
    <section className="bg-white px-5 py-[40px] md:py-[60px] lg:py-[100px]">
      <div className="max-w-[1240px] mx-auto">
        {/* Heading and Navigation */}
        <div className="flex justify-between items-end mb-[44px] md:mb-[56px]">
          <h2 className="max-w-[734px] font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]">
            {heading}
          </h2>
          
          {/* Navigation - Top Right */}
          <div className="hidden md:flex gap-5">
            <button
              onClick={handlePrev}
              className={`w-[56px] h-[56px] rounded-full border flex items-center justify-center transition-all ${
                currentIndex === 0
                  ? "border-[#DCDCDC] bg-white cursor-not-allowed"
                  : "border-[#DCDCDC] bg-DarkOrange hover:bg-DarkOrange cursor-pointer"
              }`}
              aria-label="Previous testimonial"
              disabled={currentIndex === 0}
            >
              {currentIndex === 0 ? (
                // 🔸 Disabled state icon
                  <svg
                width="24"
                height="24"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.52637 5.73987C9.56361 5.70263 9.62975 5.70263 9.66699 5.73987C9.70382 5.77706 9.70383 5.84233 9.66699 5.87952L3.2373 12.3092H20.9961C21.05 12.3092 21.0967 12.3559 21.0967 12.4098C21.0966 12.4636 21.0499 12.5094 20.9961 12.5094H3.2373L9.66699 18.9391C9.70416 18.9763 9.70403 19.0424 9.66699 19.0797C9.62975 19.1169 9.56361 19.1169 9.52637 19.0797L2.92676 12.4801C2.88952 12.4429 2.88952 12.3767 2.92676 12.3395L9.52637 5.73987Z"
                  fill="#091019"
                  stroke="#091019"
                />
              </svg>
              ) : (
                // 🔸 Active state icon
                  <svg
                width="24"
                height="24"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.52637 5.73987C9.56361 5.70263 9.62975 5.70263 9.66699 5.73987C9.70382 5.77706 9.70383 5.84233 9.66699 5.87952L3.2373 12.3092H20.9961C21.05 12.3092 21.0967 12.3559 21.0967 12.4098C21.0966 12.4636 21.0499 12.5094 20.9961 12.5094H3.2373L9.66699 18.9391C9.70416 18.9763 9.70403 19.0424 9.66699 19.0797C9.62975 19.1169 9.56361 19.1169 9.52637 19.0797L2.92676 12.4801C2.88952 12.4429 2.88952 12.3767 2.92676 12.3395L9.52637 5.73987Z"
                  fill="white"
                  stroke="white"
                />
              </svg>
              )}
              
            </button>
            <button
              onClick={handleNext}
              className={`w-[56px] h-[56px] rounded-full border flex items-center justify-center transition-all ${
                currentIndex === testimonials.length - 1
                  ? "bg-white cursor-not-allowed border-[#DCDCDC]"
                  : "bg-DarkOrange hover:bg-bg-DarkOrange border-DarkOrange cursor-pointer"
              }`}
              aria-label="Next testimonial"
              disabled={currentIndex === testimonials.length - 1}
            >
              {currentIndex === 0 ? (
                // 🔸 Disabled state icon
                  <svg
                      width="24"
                      height="24"
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
              ) : (
                // 🔸 Active state icon
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.3281 5.73987C14.3654 5.70263 14.4315 5.70263 14.4688 5.73987L21.0684 12.3395C21.1056 12.3767 21.1056 12.4429 21.0684 12.4801L14.4688 19.0797C14.4315 19.1169 14.3654 19.1169 14.3281 19.0797C14.291 19.0424 14.2909 18.9763 14.3281 18.9391L20.7578 12.5094H2.99805C2.9444 12.5092 2.8985 12.4635 2.89844 12.4098C2.89844 12.3561 2.94436 12.3094 2.99805 12.3092H20.7578L14.3281 5.87952C14.2912 5.84232 14.2912 5.77707 14.3281 5.73987Z"
                      fill="#091019"
                      stroke="#091019"
                    />
                  </svg>
              )}
            
            </button>
          </div>
        </div>

            {/* Testimonial Carousel */}
        <div className="relative">
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {/* Main Content - Current Testimonial */}
            <div className={`flex flex-col lg:flex-row gap-3 overflow-hidden border border-LightWhite rounded-[20px] ${
              isLastSlide ? 'w-full' : 'w-full lg:w-[73.8%]'
            }`}>
              {/* Left Card - Testimonial */}
              <div className="relative z-[2] bg-PrimaryBlack p-6 rounded-[20px] w-full lg:w-[50%] flex flex-col justify-between md:min-h-[450px]">
                <div className="absolute z-[1] overflow-hidden bottom-[0px] right-[0px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="432" height="450" viewBox="0 0 432 450" fill="none">
                    <g filter="url(#filter0_f_4557_67011)">
                      <path d="M317.207 261.961C307.914 266.821 302.223 246.276 292.132 243.418C281.849 240.506 270.698 242.9 260.434 245.882C247.94 249.513 234.656 253.409 225.609 262.75C216.43 272.229 200.967 288.419 209.467 298.509C224.203 316 258.894 302.997 273.99 320.177C282.224 329.546 259.352 341.195 257.853 353.572C256.156 367.583 250.874 396.334 264.936 394.952C286.78 392.804 291.39 358.918 310.639 348.383C316.944 344.932 322.491 356.186 328.464 360.182C342.158 369.345 354.595 395.274 369.137 387.525C382.989 380.144 365.818 356.741 364.195 341.143C363.422 333.715 361.191 326.46 362.012 319.037C362.696 312.854 364.415 306.374 368.555 301.727C383.91 284.492 417.265 278.115 418.971 255.107C420.144 239.278 385.943 254.118 372.74 245.287C361.826 237.988 366.08 207.546 353.502 211.323C333.428 217.35 335.777 252.249 317.207 261.961Z" fill="#FF6600"/>
                    </g>
                    <defs>
                      <filter id="filter0_f_4557_67011" x="-77" y="-73" width="780" height="752" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                        <feGaussianBlur stdDeviation="142" result="effect1_foregroundBlur_4557_67011"/>
                      </filter>
                    </defs>
                  </svg>
                </div>
                <div className="relative z-[2]">
                  <div className="flex items-center gap-4 mb-6 md:mb-10">
                    <img
                      src={testimonial.profileImage.url}
                      alt={testimonial.name}
                      className="w-[52px] md:w-[72px] h-[52px] md:h-[72px] rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-Roboto text-white font-medium leading-[28px] md:leading-[33.6px] text-[20px] md:text-[24px] tracking-[0px]">{testimonial.name}</h3>
                      {testimonial.designation && (
                        <p className="font-Roboto text-white font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px] mt-[2px]">
                          {testimonial.designation}
                        </p>
                      )}
                    </div>
                  </div>
 
                  <div className="mb-6">
                    <img
                      src={testimonial.quoteIcon.url}
                      alt="Quote"
                      className="w-[22px] h-[22px] mb-4 md:mb-6"
                    />
                    <p className="font-Roboto text-white font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px]">
                      {testimonial.quote}
                    </p>
                  </div>
                </div>
 
                <div className="relative z-[2]  bg-[#FFF1EA] font-Roboto text-PrimaryBlack leading-[21px] text-[14px] font-medium rounded-[12px] py-3 px-4 md:min-h-[45px] flex alitem-center justify-start">
                  {testimonial.result}
                </div>
              </div>
 
              {/* Right Card - Before/After */}
              <div className="bg-white p-6 w-full lg:w-[50%] md:min-h-[400px] flex flex-col">
                {testimonial.beforeAfter.roleTag && (
                  <span className="inline bg-[#F6F6F6] w-fit rounded-[8px] py-2 px-3 font-Roboto text-LightGray text-[12px] leading-[16px] font-medium">
                    {testimonial.beforeAfter.roleTag}
                  </span>
                )}
 
                <div className="space-y-5 md:space-y-6 flex-grow flex flex-col justify-start mt-5 md:mt-6">
                  <div>
                    <h4 className="font-Roboto text-[#D4183D] font-medium leading-[27px] md:leading-[27px] text-[18px] md:text-[18px] tracking-[0px] mb-3">
                      {testimonial.beforeAfter.beforeTitle}
                    </h4>
                    {testimonial.beforeAfter.beforeDescription && (
                      <p className="font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[24px] text-[14px] md:text-[16px] tracking-[0px]">
                        {testimonial.beforeAfter.beforeDescription}
                      </p>
                    )}
                  </div>
 
                  <hr className="border-LightWhite" />
 
                  <div>
                     <h4 className="font-Roboto text-[#00A63E] font-medium leading-[27px] md:leading-[27px] text-[18px] md:text-[18px] tracking-[0px] mb-3">
                      {testimonial.beforeAfter.afterTitle}
                    </h4>
                    {testimonial.beforeAfter.afterDescription && (
                       <p className="font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[24px] text-[14px] md:text-[16px] tracking-[0px]">
                        {testimonial.beforeAfter.afterDescription}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
 
            {/* Next Testimonial Preview - 1/4th width - Only show if not last slide */}
            {!isLastSlide && nextTestimonial && (
              <div className="hidden lg:block w-full lg:w-[28.2%] overflow-hidden">
                <div
                  className="relative z-[2] bg-PrimaryBlack p-6 rounded-[20px] w-full lg:w-[100%] flex flex-col justify-between md:min-h-[450px] md:min-w-[430px]"
                  onClick={handleNext}
                >
                  <div className="absolute z-[1] overflow-hidden bottom-[0px] right-[0px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="432" height="450" viewBox="0 0 432 450" fill="none">
                    <g filter="url(#filter0_f_4557_67011)">
                      <path d="M317.207 261.961C307.914 266.821 302.223 246.276 292.132 243.418C281.849 240.506 270.698 242.9 260.434 245.882C247.94 249.513 234.656 253.409 225.609 262.75C216.43 272.229 200.967 288.419 209.467 298.509C224.203 316 258.894 302.997 273.99 320.177C282.224 329.546 259.352 341.195 257.853 353.572C256.156 367.583 250.874 396.334 264.936 394.952C286.78 392.804 291.39 358.918 310.639 348.383C316.944 344.932 322.491 356.186 328.464 360.182C342.158 369.345 354.595 395.274 369.137 387.525C382.989 380.144 365.818 356.741 364.195 341.143C363.422 333.715 361.191 326.46 362.012 319.037C362.696 312.854 364.415 306.374 368.555 301.727C383.91 284.492 417.265 278.115 418.971 255.107C420.144 239.278 385.943 254.118 372.74 245.287C361.826 237.988 366.08 207.546 353.502 211.323C333.428 217.35 335.777 252.249 317.207 261.961Z" fill="#FF6600"/>
                    </g>
                    <defs>
                      <filter id="filter0_f_4557_67011" x="-77" y="-73" width="780" height="752" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                        <feGaussianBlur stdDeviation="142" result="effect1_foregroundBlur_4557_67011"/>
                      </filter>
                    </defs>
                  </svg>
                </div>
                  <div className="relative z-[2]">
                    <div className="flex items-center gap-4 mb-6 md:mb-10">
                      <img
                        src={nextTestimonial.profileImage.url}
                        alt={nextTestimonial.name}
                        className="w-[52px] md:w-[72px] h-[52px] md:h-[72px] rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-Roboto text-white font-medium leading-[28px] md:leading-[33.6px] text-[20px] md:text-[24px] tracking-[0px]">{nextTestimonial.name}</h3>
                        {nextTestimonial.designation && (
                          <p className="font-Roboto text-white font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px] mt-[2px]">
                            {nextTestimonial.designation}
                          </p>
                        )}
                      </div>
                    </div>
 
                    <div className="mb-6">
                      <img
                        src={nextTestimonial.quoteIcon.url}
                        alt="Quote"
                        className="w-[22px] h-[22px] mb-4 md:mb-6"
                      />
                      <p className="font-Roboto text-white font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px]">
                        {nextTestimonial.quote}
                      </p>
                    </div>
                  </div>
 
                  <div className="relative z-[2]  bg-[#FFF1EA] font-Roboto text-PrimaryBlack text-[14px] leading-[21px] font-medium rounded-[12px] py-3 px-4 min-h-[45px] flex alitem-center justify-start">
                    {nextTestimonial.result}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
 
        {/* Mobile Indicators */}
        <div className="flex justify-center mt-4 lg:hidden">
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? "bg-PrimaryBlack" : "bg-LightWhite"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
 
export default BusinessClientSuccessStoriesSection;