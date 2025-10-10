import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from '@remix-run/react';

interface OperatorThousandProps {
  module: {
    _key: string;
    _type: 'testimonial';
    headline?: string;
    subheadline?: string;
    testimonials?: Array<{
      _key: string;
      type: 'quote' | 'video';
      rating?: number;
      starIcon?: {
        asset?: {
          _id: string;
          url: string;
        };
      };
      quote?: string;
      readMoreText?: string;
      readMoreUrl?: string;
      videoUrl?: string;
      videoThumbnail?: {
        asset?: {
          _id: string;
          url: string;
        };
      };
      playIcon?: {
        asset?: {
          _id: string;
          url: string;
        };
      };
      authorName?: string;
      authorTitle?: string;
      authorImage?: {
        asset?: {
          _id: string;
          url: string;
        };
      };
    }>;
  };
}

export function OperatorThousand({ module }: OperatorThousandProps) {
  const { headline, subheadline, testimonials } = module;
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  console.log('🎯 OperatorThousand COMPONENT CALLED!');
  console.log('📝 Module data:', module);

  const openVideo = (url: string) => {
    if (!url) return;

    let embedUrl = url;

    // Convert YouTube watch link to embed link
    if (url.includes("youtube.com/watch")) {
      const videoId = url.split("v=")[1].split("&")[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }

    // Handle youtu.be short links
    if (url.includes("youtu.be")) {
      const videoId = url.split("youtu.be/")[1];
      embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }

    setActiveVideo(embedUrl);
    setIsOpen(true);
  };

  const closeVideo = () => {
    setActiveVideo(null);
    setIsOpen(false);
  };

  // Simple arrow icons as fallback
  const ArrowLeftIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );

  const ArrowRightIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );

  const TestimonialIcon = () => (
    <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
    </svg>
  );

  return (
    <section className="py-[40px] md:py-[60px] lg:py-[100px] bg-white px-5">
      <div className="max-w-[1240px] mx-auto flex flex-col gap-11 md:gap-14">

        {/* Heading + Arrows */}
        <div className="flex flex-col md:flex-row justify-between items-end">
          <h2 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[26px] md:text-[36px] tracking-[-0.39px] md:tracking-[-0.54px] text-center md:text-left">
            {headline || subheadline}
          </h2>
          <div className="hidden md:flex justify-end gap-5">
            <button
              ref={prevRef}
              className={`w-14 h-14 flex items-center justify-center rounded-full text-white ${
                isBeginning ? "bg-[#D3D3D3]" : "bg-orange-500"
              }`}
            >
              <ArrowLeftIcon />
            </button>
            <button
              ref={nextRef}
              className={`w-14 h-14 flex items-center justify-center rounded-full text-white ${
                isEnd ? "bg-[#D3D3D3]" : "bg-orange-500"
              }`}
            >
              <ArrowRightIcon />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onInit={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
          >
            {testimonials?.map((item) =>
              item.type === "quote" ? (
                <SwiperSlide key={item._key} className="!h-auto !flex-shrink-0">
                  <div className="transition-all duration-500 ease-in-out group bg-white rounded-[20px] border border-gray-200 p-6 flex flex-col justify-between hover:bg-gray-900">

                    {/* Top: Quote + Rating */}
                    <div className="flex items-center justify-between">
                      {item.authorImage?.asset?.url && (
                        <img
                          src={item.authorImage.asset.url}
                          alt={item.authorName || 'Author'}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      )}
                      <div className="flex items-center gap-2 border border-gray-200 text-base font-normal leading-[24px] bg-gray-100 px-4 py-3 rounded-full">
                        {item.starIcon?.asset?.url ? (
                          <img src={item.starIcon.asset.url} alt="Star Icon" className="w-5 h-5" />
                        ) : (
                          // Fallback star SVG
                          <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        )}
                        <span className="transition-all duration-500 ease-in-out font-Roboto text-base font-normal leading-[24px] group-hover:text-white">
                          {item.rating || "4.5"}
                        </span>
                      </div>
                    </div>

                    <span className="mt-[28px] mb-[22px]"><TestimonialIcon /></span>

                    {/* Quote */}
                    {item.quote && (
                      <p className="transition-all duration-500 ease-in-out font-Roboto text-gray-900 font-normal leading-[27px] md:leading-[27px] text-[18px] md:text-[18px] tracking-[0px] group-hover:text-white">
                        {item.quote}
                      </p>
                    )}

                    {/* Read More */}
                    {item.readMoreText && item.readMoreUrl && (
                      <Link
                        to={item.readMoreUrl}
                        className="font-Roboto text-orange-500 text-[14px] leading-[14px] tracking-[0.07px] font-normal mt-4 inline-block"
                      >
                        <span className="sr-only">(click to Read Full Article written by {item.authorName})</span>
                        {item.readMoreText}
                      </Link>
                    )}

                    {/* Author */}
                    <div className="mt-[72px] pl-4 border-l border-gray-200 flex flex-col gap-1">
                      {item.authorName && (
                        <p className="transition-all duration-500 ease-in-out font-Roboto text-gray-900 text-[16px] leading-[24px] font-medium tracking-[0px] group-hover:text-white">
                          {item.authorName}
                        </p>
                      )}
                      {item.authorTitle && (
                        <p className="transition-all duration-500 ease-in-out font-Roboto text-gray-600 text-[14px] leading-[21px] font-normal tracking-[0px] group-hover:text-white">
                          {item.authorTitle}
                        </p>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              ) : (
                <SwiperSlide key={item._key} className="!h-auto !flex-shrink-0">
                  <div className="transition-all duration-500 ease-in-out group bg-white rounded-[20px] border border-gray-200 p-6 flex flex-col justify-between hover:bg-gray-900">

                    {/* Top: Author */}
                    <div className="flex items-center justify-between">
                      {item.authorImage?.asset?.url && (
                        <img
                          src={item.authorImage.asset.url}
                          alt={item.authorName || 'Author'}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      )}
                      <div className="flex items-center gap-2 border border-gray-200 text-base font-normal leading-[24px] bg-gray-100 px-4 py-3 rounded-full">
                        {item.starIcon?.asset?.url ? (
                          <img src={item.starIcon.asset.url} alt="Star Icon" className="w-5 h-5" />
                        ) : (
                          // Fallback star SVG
                          <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        )}
                        <span className="transition-all duration-500 ease-in-out font-Roboto text-base font-normal leading-[24px] group-hover:text-white">
                          {item.rating || "4.5"}
                        </span>
                      </div>
                    </div>

                    {/* Video */}
                    {item.videoThumbnail?.asset?.url && (
                      <div className="relative mt-6">
                        <img
                          src={item.videoThumbnail.asset.url}
                          alt="Video Thumbnail"
                          className="w-full h-[250px] object-cover rounded-lg"
                        />
                        {item.playIcon?.asset?.url && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <button
                              onClick={() => openVideo(item.videoUrl || "")}
                              className="cursor-pointer"
                            >
                              <div className="bg-[#FFFFFFB2] rounded-full p-2 shadow-lg flex items-center justify-center">
                                <img src={item.playIcon.asset.url} alt="Play Icon" className="w-10 h-10" />
                              </div>
                              <span className="sr-only">(click to play video of {item.authorName})</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Author */}
                    <div className="mt-[62px] pl-4 border-l border-gray-200 flex flex-col gap-1">
                      {item.authorName && (
                        <p className="transition-all duration-500 ease-in-out font-Roboto text-gray-900 text-[16px] leading-[24px] font-medium group-hover:text-white">
                          {item.authorName}
                        </p>
                      )}
                      {item.authorTitle && (
                        <p className="transition-all duration-500 ease-in-out font-Roboto text-gray-600 text-[14px] leading-[21px] font-normal group-hover:text-white">
                          {item.authorTitle}
                        </p>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              )
            )}
          </Swiper>
        </div>
      </div>

      {/* Video Popup */}
      {isOpen && activeVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative w-[90%] md:w-[70%] lg:w-[60%]">
            <button
              onClick={closeVideo}
              className="absolute top-[-20px] right-[-10px] text-white text-2xl"
            >
              ✕
            </button>
            <iframe
              src={activeVideo}
              title="Video Player"
              className="w-full h-[400px] md:h-[500px] rounded-lg"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
}