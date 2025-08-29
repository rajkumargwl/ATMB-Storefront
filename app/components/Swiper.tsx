import React from 'react';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const Swiper = ({ slider }) => {
  const slides = slider?.slides || [];
  console.log("Slides array:", slides);

  if (!slides.length) {
    return null; // Nothing to show
  }

  return (
    <section className="h-[50vh] sm:h-[70vh] md:h-[70vh] relative flex justify-center items-center w-full font-inter overflow-hidden">
      <SwiperComponent
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        navigation={{
          prevEl: '.swiper-button-prev-custom',
          nextEl: '.swiper-button-next-custom',
        }}
        className="w-full h-full overflow-hidden"
      >
        {slides.map((slide, index) => {
          const imageUrl = slide?.image?.asset?.url || '/assets/fallback.jpg';
          console.log(`Slide ${index + 1} Image URL:`, imageUrl);

          return (
            <SwiperSlide key={index} className="flex justify-center items-center relative text-center">
              <div className="slide-cont w-full h-full">
                <img
                  src={imageUrl}
                  alt={slide?.title || 'Slide Image'}
                  className="w-full h-full object-cover brightness-50 absolute inset-0 -z-10"
                  onError={(e) => {
                    e.target.src = '/assets/fallback.jpg';
                  }}
                />
                <div className="slider-content absolute text-left z-50 text-white bg-black bg-opacity-65 inset-0 flex items-start justify-center flex-col px-20 md:px-40">
                  {slide?.subtitle && (
                    <p className="text-base md:text-xl mb-2.5">
                      {slide.subtitle}{" "}
                      <span className="text-amber-400">
                        {String(index + 1).padStart(2, '0')}/{String(slides.length).padStart(2, '0')}
                      </span>
                    </p>
                  )}
                  {slide?.title && (
                    <h1 className="text-3xl md:text-6xl mt-0 mb-5">
                      {slide.title}
                    </h1>
                  )}
                  {slide?.buttonText && (
                    <a
                      href={slide?.buttonLink || '#'}
                      className="bg-red-600 text-white border-none py-2 px-3 text-xs md:py-5 md:px-12 md:text-base cursor-pointer rounded-full transition-colors duration-300 font-extrabold hover:bg-red-400"
                    >
                      {slide.buttonText}
                    </a>
                  )}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </SwiperComponent>

      {/* Custom Navigation Buttons */}
      <div className="swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 z-[999] cursor-pointer w-12 h-12 bg-black bg-opacity-75 rounded-full flex justify-center items-center transition-colors duration-300 shadow-md left-5 hover:bg-black hover:bg-opacity-90">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-white w-8 h-8">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </div>

      <div className="swiper-button-next-custom absolute top-1/2 -translate-y-1/2 z-[999] cursor-pointer w-12 h-12 bg-black bg-opacity-75 rounded-full flex justify-center items-center transition-colors duration-300 shadow-md right-5 hover:bg-black hover:bg-opacity-90">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-white w-8 h-8">
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
        </svg>
      </div>
    </section>
  );
};

export default Swiper;
