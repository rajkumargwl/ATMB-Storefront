import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination"; // Make sure this is imported
import ArrowRightIcon from "~/components/icons/ArrowRightIcon";
import ArrowLeftIcon from "~/components/icons/ArrowLeftIcon";
import Testimonial from "~/components/icons/Testimonial";
import type { SanityTestimonial } from "~/lib/sanity";
 
type Props = {
  data: SanityTestimonial;
};
 
export default function Testimonials({ data }: Props) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
 
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
 
  const showNavigation = (data?.testimonials?.length || 0) > 3;
 
  return (
    <section className="py-[40px] md:py-[60px] lg:py-[100px] bg-white px-5">
      <div className="max-w-[1240px] mx-auto flex flex-col gap-11 md:gap-14">
 
        {/* Heading + Arrows */}
        <div className="flex flex-col md:flex-row justify-between md:items-end">
          <h2 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[26px] md:text-[36px] tracking-[-0.39px] md:tracking-[-0.54px] text-center md:text-left">
            {data?.subheadline || data?.headline}
          </h2>
          {showNavigation && (
            <div className="hidden md:flex justify-end gap-5">
              <button
                ref={prevRef}
                 title="Previous Slide"
                className={`w-14 h-14 flex items-center justify-center rounded-full text-white ${
                  isBeginning ? "bg-[#D3D3D3]" : "bg-DarkOrange"
                }`}
              >
                <ArrowLeftIcon />
              </button>
               {/* Tooltip */}
      <div
        role="tooltip"
        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-[#091019] text-white text-sm rounded-md px-3 py-1 opacity-0 pointer-events-none whitespace-nowrap transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
      >
        Previous Slide
      </div>
              
              <button
                ref={nextRef}
                title="Next Slide"
                className={`w-14 h-14 flex items-center justify-center rounded-full text-white ${
                  isEnd ? "bg-[#D3D3D3]" : "bg-DarkOrange"
                }`}
              >
                <ArrowRightIcon />
              </button>
               {/* Tooltip */}
      <div
        role="tooltip"
        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-[#091019] text-white text-sm rounded-md px-3 py-1 opacity-0 pointer-events-none whitespace-nowrap transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
      >
        Next Slide
      </div>
            </div>
          )}
        </div>
 
        {/* Slider with gradient fade and scroll indicators */}
        <div className="relative">
          {/* Gradient fade overlay for content indication */}
          {!isBeginning && (
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none hidden md:block" />
          )}
          {!isEnd && (
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none hidden md:block" />
          )}
          
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation={
              showNavigation
                ? {
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  }
                : false
            }
            pagination={{
              clickable: true,
              dynamicBullets: true, // This helps with visibility
            }}
            onBeforeInit={(swiper) => {
              if (showNavigation) {
                // @ts-ignore
                swiper.params.navigation.prevEl = prevRef.current;
                // @ts-ignore
                swiper.params.navigation.nextEl = nextRef.current;
              }
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
            {data?.testimonials?.map((item, idx) =>
              item.type === "quote" ? (
                <SwiperSlide key={item._key} className="!h-auto !flex-shrink-0">
                  <div className="transition-all duration-500 ease-in-out group bg-white rounded-[20px] border border-LightWhite p-6 flex flex-col justify-between hover:bg-PrimaryBlack">
 
                    {/* Top: Quote + Rating */}
                    <div className="flex items-center justify-between">
                      {item.authorImage && (
                        <img
                          src={item.authorImage.url}
                          alt={item.authorImage.altText || item.authorName}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      )}
                      <div className="flex items-center gap-2 border border-LightWhite text-base font-normal leading-[24px] bg-gray-100 px-4 py-3 rounded-full">
                        {item.starIcon?.url && (
                          <img src={item.starIcon.url} alt="Star Icon" className="w-5 h-5" />
                        )}
                        <span className="transition-all duration-500 ease-in-out font-Roboto text-base font-normal leading-[24px] group-hover:text-white">
                          {item.rating || "4.5"}
                        </span>
                      </div>
                    </div>
 
                    <span className="mt-[28px] mb-[22px]"><Testimonial /></span>
 
                    {/* Quote */}
                    <p
                      className="transition-all duration-500 ease-in-out font-Roboto text-PrimaryBlack font-normal leading-[27px] md:leading-[27px] text-[18px] md:text-[18px] tracking-[0px] group-hover:text-white overflow-hidden text-ellipsis line-clamp-6"
                    >
                      {item?.quote}
                    </p>
                    {item.readMoreText && (
                      <a
                        href={item.readMoreUrl || "#"}
                        className="font-Roboto text-DarkOrange text-[14px] leading-[14px] tracking-[0.07px] font-normal mt-4 inline-block"
                      >
                         <span className="sr-only">(click to  Read Full Article written by {item.authorName})</span>
                        {item.readMoreText}
                      </a>
                    )}
 
                    {/* Author */}
                    <div className="mt-[72px] pl-4 border-l border-LightWhite flex flex-col gap-1">
                      <p className="transition-all duration-500 ease-in-out font-Roboto text-PrimaryBlack text-[16px] leading-[24px] font-medium tracking-[0px] group-hover:text-white">
                        {item.authorName}
                      </p>
                      <p className="transition-all duration-500 ease-in-out font-Roboto text-LightGray text-[14px] leading-[21px] font-normal tracking-[0px] group-hover:text-white">
                        {item.authorTitle}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ) : (
                <SwiperSlide key={item._key} className="!h-auto !flex-shrink-0">
                  <div className="transition-all duration-500 ease-in-out group bg-white rounded-[20px] border border-LightWhite p-6 flex flex-col justify-between hover:bg-PrimaryBlack">
 
                    {/* Top: Author */}
                    <div className="flex items-center justify-between">
                      {item.authorImage && (
                        <img
                          src={item.authorImage.url}
                          alt={item.authorImage.altText || item.authorName}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      )}
                      <div className="flex items-center gap-2 border border-LightWhite text-base font-normal leading-[24px] bg-gray-100 px-4 py-3 rounded-full">
                        {item.starIcon?.url && (
                          <img src={item.starIcon.url} alt="Star Icon" className="w-5 h-5" />
                        )}
                        <span className="transition-all duration-500 ease-in-out font-Roboto text-base font-normal leading-[24px] group-hover:text-white">
                          {item.rating || "4.5"}
                        </span>
                      </div>
                    </div>
 
                    {/* Video */}
                    {item.videoThumbnail?.url && (
                      <div className="relative mt-6">
                        <img
                          src={item.videoThumbnail.url}
                          alt={item.videoThumbnail.altText || "Video Thumbnail"}
                          className="w-full h-[250px] object-cover"
                        />
                        {item.playIcon?.url && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <button
                              onClick={() => openVideo(item.videoUrl || "")}
                              className="cursor-pointer"
                            >
                              <div className="bg-[#FFFFFFB2] rounded-full p-2 shadow-lg flex items-center justify-center">
                                <img src={item.playIcon.url} alt="Play Icon" className="w-10 h-10" />
                              </div>
                               <span className="sr-only">(click to play video of {item.authorName})</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
 
                    {/* Author */}
                    <div className="mt-[62px] pl-4 border-l border-LightWhite flex flex-col gap-1">
                      <p className="transition-all duration-500 ease-in-out font-Roboto text-PrimaryBlack text-[16px] leading-[24px] font-medium group-hover:text-white">
                        {item.authorName}
                      </p>
                      <p className="transition-all duration-500 ease-in-out font-Roboto text-LightGray text-[14px] leading-[21px] font-normal group-hover:text-white">
                        {item.authorTitle}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              )
            )}
          </Swiper>
        </div>
 
        {/* Mobile navigation arrows (always visible on mobile) */}
        {/* {(data?.testimonials?.length || 0) > 1 && (
          // <div className="flex md:hidden justify-center gap-5 mt-4">
          //   <button
          //     ref={prevRef}
          //     className={`w-12 h-12 flex items-center justify-center rounded-full text-white ${
          //       isBeginning ? "bg-[#D3D3D3]" : "bg-DarkOrange"
          //     }`}
          //   >
          //     <ArrowLeftIcon />
          //   </button>
          //   <button
          //     ref={nextRef}
          //     className={`w-12 h-12 flex items-center justify-center rounded-full text-white ${
          //       isEnd ? "bg-[#D3D3D3]" : "bg-DarkOrange"
          //     }`}
          //   >
          //     <ArrowRightIcon />
          //   </button>
          // </div>
        )} */}
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
 
      {/* Custom CSS for pagination bullets */}
      <style jsx global>{`
      @media (min-width: 767px) {
        .swiper-pagination  {
            display:none;
        }
      }
        .swiper-pagination {
          position: relative;
          margin-top: 16px;
          text-align: center;
          width: 100%!important;
        }
      
        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background-color: #DCDCDC;
          opacity: 1;
          margin: 0 6px !important;
          transition: all 0.3s ease;
          display: inline-block;
          border-radius: 12px;
        }
      
        .swiper-pagination-bullet-active {
          background-color: #091019;
        
        }
`}</style>
 
    </section>
  );
}