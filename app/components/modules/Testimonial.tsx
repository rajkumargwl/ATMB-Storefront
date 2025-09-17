import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
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

  return (
     <section className="py-[40px] md:py-[100px] bg-white px-5">
       <div className="max-w-[1240px] mx-auto flex flex-col gap-11 md:gap-14">
        {/* Badge */}
        {/* <div className="flex items-center gap-2 mb-4 bg-[#FFE5D8] px-3 py-2 rounded-full w-max">
          <span className="w-2 h-2 bg-[#EE6D2D] rounded-full" />
          <span className="text-sm font-medium text-gray-700">
            {data?.headline}
          </span>
        </div> */}

        {/* Heading + Arrows */}
        <div className="flex flex-col md:flex-row justify-between items-end">
          <h2 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[26px] md:text-[36px] tracking-[-0.39px] md:tracking-[-0.54px] text-center md:text-left">
            {data?.subheadline}
          </h2>
          <div className="hidden md:flex justify-end gap-5">
            <button
              ref={prevRef}
              className="w-14 h-14 flex items-center justify-center rounded-full bg-orange-500 text-white"
            >
              <ArrowLeftIcon />
            </button>
            <button
              ref={nextRef}
              className="w-14 h-14 flex items-center justify-center rounded-full bg-orange-500 text-white"
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
          >
             {data?.testimonials?.map((item, idx) =>
            item.type === "quote" ? (
              <SwiperSlide key={idx}  className="!h-auto !flex-shrink-0">
                <div className="bg-white rounded-[20px] border border-LightWhite p-6 flex flex-col justify-between">
                  {/* Top: Quote + Rating */}
                  <div className="flex items-center justify-between">
                    {item.authorImage && (
                      <img
                        src={item.authorImage?.url}
                        alt={item.authorName}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    )}
                    <div className="flex items-center gap-2 border border-LightWhite text-base font-normal leading-[24px] bg-gray-100 px-4 py-3 rounded-full">
                      <span className="text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 23 22" fill="none">
                          <path d="M12.5299 0.773351C12.3091 0.300748 11.8425 0 11.33 0C10.8176 0 10.3551 0.300748 10.1301 0.773351L7.45126 6.45748L1.46857 7.36832C0.968625 7.44565 0.552003 7.80655 0.397853 8.30063C0.243703 8.79472 0.368689 9.34036 0.726984 9.70555L5.06819 14.1351L4.0433 20.395C3.95997 20.9106 4.16828 21.4347 4.58074 21.7398C4.99319 22.0448 5.53897 22.0835 5.98892 21.8386L11.3342 18.8955L16.6794 21.8386C17.1294 22.0835 17.6752 22.0491 18.0876 21.7398C18.5001 21.4304 18.7084 20.9106 18.6251 20.395L17.596 14.1351L21.9372 9.70555C22.2955 9.34036 22.4247 8.79472 22.2663 8.30063C22.108 7.80655 21.6956 7.44565 21.1956 7.36832L15.2088 6.45748L12.5299 0.773351Z" fill="#74A038"/>
                        </svg>
                      </span>
                      <span className="font-Roboto text-base font-normal leading-[24px]">{item.rating || "4.5"}</span>
                    </div>
                  </div>
                  <span className="mt-[28px] mb-[22px]"><Testimonial /></span>
                  {/* Quote */}
                  <p className="font-Roboto text-PrimaryBlack font-normal leading-[27px] md:leading-[27px] text-[18px] md:text-[18px]">
                    {item.quote}
                  </p>
                  <a href="#" className="font-Roboto text-DarkOrange text-[14px] leading-[14px] tracking-[0.07px] font-normal mt-4 inline-block">Read More</a>

                  {/* Author */}
                    <div className="mt-[72px] pl-4 border-l border-LightWhite flex flex-col gap-1">
                      <p className="font-Roboto text-PrimaryBlack text-[16px] leading-[24px] font-medium">
                        {item.authorName}
                      </p>
                      <p className="font-Roboto text-LightGray text-[14px] leading-[21px] font-normal">{item.authorTitle}</p>
                    </div>
                </div>
              </SwiperSlide>
               ) : (
                <SwiperSlide key={idx}  className="!h-auto !flex-shrink-0">
                <div className="bg-white rounded-[20px] border border-LightWhite p-6 flex flex-col justify-between">
                  {/* Top: Quote + Rating */}
                  <div className="flex items-center justify-between">
                    {item.authorImage && (
                      <img
                        src={item.authorImage?.url}
                        alt={item.authorName}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    )}
                    <div className="flex items-center gap-2 border border-LightWhite text-base font-normal leading-[24px] bg-gray-100 px-4 py-3 rounded-full">
                      <span className="text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 23 22" fill="none">
                          <path d="M12.5299 0.773351C12.3091 0.300748 11.8425 0 11.33 0C10.8176 0 10.3551 0.300748 10.1301 0.773351L7.45126 6.45748L1.46857 7.36832C0.968625 7.44565 0.552003 7.80655 0.397853 8.30063C0.243703 8.79472 0.368689 9.34036 0.726984 9.70555L5.06819 14.1351L4.0433 20.395C3.95997 20.9106 4.16828 21.4347 4.58074 21.7398C4.99319 22.0448 5.53897 22.0835 5.98892 21.8386L11.3342 18.8955L16.6794 21.8386C17.1294 22.0835 17.6752 22.0491 18.0876 21.7398C18.5001 21.4304 18.7084 20.9106 18.6251 20.395L17.596 14.1351L21.9372 9.70555C22.2955 9.34036 22.4247 8.79472 22.2663 8.30063C22.108 7.80655 21.6956 7.44565 21.1956 7.36832L15.2088 6.45748L12.5299 0.773351Z" fill="#74A038"/>
                        </svg>
                      </span>
                      <span className="font-Roboto text-base font-normal leading-[24px]">{item.rating || "4.5"}</span>
                    </div>
                  </div>
                  {/* <span className="mt-[28px] mb-[22px]"><Testimonial /></span> */}
                  {/* Video */}
                  <div className="relative mt-6">
                    <img
                     src={item?.playIcon?.playSvgFile?.url} 
                      className="w-full h-[250px] object-cover"
                    />
                    {/* Play Icon Overlay */}
                    {item?.playIcon?.playSvgFile && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <a
                          href={item?.videoUrl} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer"
                        >
                          <div className="bg-[#FFFFFFB2] rounded-full p-2 shadow-lg flex items-center justify-center">
                            {/* Rounded Play Icon */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="40"
                              height="40"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="text-black w-10 h-10"
                            >
                              <path d="M9 6.5v11c0 .6.6.9 1.1.6l8.2-5.5c.5-.3.5-1 0-1.3L10.1 5.8c-.5-.3-1.1 0-1.1.7z" />
                            </svg>
                          </div>
                        </a>
                      </div>
                    )}
                  </div>


                  {/* Author */}
           
                    <div className="mt-[62px] pl-4 border-l border-LightWhite flex flex-col gap-1">
                      <p className="font-Roboto text-PrimaryBlack text-[16px] leading-[24px] font-medium">
                        {item.authorName}
                      </p>
                      <p className="font-Roboto text-LightGray text-[14px] leading-[21px] font-normal">{item.authorTitle}</p>
                    </div>
                  </div>
            
              </SwiperSlide>
              )
            )}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
