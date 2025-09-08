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
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Badge */}
        <div className="flex items-center gap-2 mb-4 bg-[#FFE5D8] px-3 py-2 rounded-full w-max">
          <span className="w-2 h-2 bg-[#EE6D2D] rounded-full" />
          <span className="text-sm font-medium text-gray-700">
            {data?.headline}
          </span>
        </div>

        {/* Heading + Arrows */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[36px] xs:text-lg font-semibold text-[#091019]">
            {data?.subheadline}
          </h2>
          <div className="flex gap-3">
            <button
              ref={prevRef}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#091019] text-white"
            >
              <ArrowLeftIcon />
            </button>
            <button
              ref={nextRef}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#091019] text-white"
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
            {data?.testimonials?.map((item, idx) => (
              <SwiperSlide key={idx}  className="!h-auto !flex-shrink-0">
                <div className="bg-[#F9F9F9] border border-[#DCDCDC] rounded-[15px] shadow-sm p-6 min-h-[467px] flex flex-col justify-between">
                  {/* Top: Quote + Rating */}
                  <div className="flex items-start justify-between mb-4">
                    {item.authorImage && (
                      <img
                        src={item.authorImage?.url}
                        alt={item.authorName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <div className="flex items-center gap-1 bg-white border border-[#DCDCDC] rounded-full px-3 py-1 text-sm text-gray-700 shadow-sm">
                      <span className="text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 23 22" fill="none">
                          <path d="M12.5299 0.773351C12.3091 0.300748 11.8425 0 11.33 0C10.8176 0 10.3551 0.300748 10.1301 0.773351L7.45126 6.45748L1.46857 7.36832C0.968625 7.44565 0.552003 7.80655 0.397853 8.30063C0.243703 8.79472 0.368689 9.34036 0.726984 9.70555L5.06819 14.1351L4.0433 20.395C3.95997 20.9106 4.16828 21.4347 4.58074 21.7398C4.99319 22.0448 5.53897 22.0835 5.98892 21.8386L11.3342 18.8955L16.6794 21.8386C17.1294 22.0835 17.6752 22.0491 18.0876 21.7398C18.5001 21.4304 18.7084 20.9106 18.6251 20.395L17.596 14.1351L21.9372 9.70555C22.2955 9.34036 22.4247 8.79472 22.2663 8.30063C22.108 7.80655 21.6956 7.44565 21.1956 7.36832L15.2088 6.45748L12.5299 0.773351Z" fill="#091019"/>
                        </svg>
                      </span>
                      <span className="font-medium">{item.rating || "4.5"}</span>
                    </div>
                  </div>
                  <span className="mt-5 mb-5"><Testimonial /></span>
                  {/* Quote */}
                  <p className="text-[#091019] text-[18px] leading-[27px] mb-6 font-normal letter-spacing-[-0.18px]">
                    {item.quote}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="border-l border-[#DCDCDC] pl-3">
                      <p className="font-semibold text-[#091019] text-[16px] mb-1">
                        {item.authorName}
                      </p>
                      <p className="text-[14px] text-[#5A5D60]">{item.authorTitle}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
