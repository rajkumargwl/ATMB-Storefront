
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

import type { SanityTrustedByBusiness } from "~/lib/sanity";
import spanBg from "~/components/media/span-bg.svg";
import TrustedBg from "~/components/media/Trusted-bg.png";

// Static star icons
import star1 from "~/components/media/Star1.svg";
import star2 from "~/components/media/Star2.svg";
import star3 from "~/components/media/Star3.svg";
import star4 from "~/components/media/Star4.svg";

type Props = {
  data: SanityTrustedByBusiness;
};

export default function Homedata({ data }: Props) {
  if (!data) return null;

  return (
    <section className="relative bg-PrimaryBlack text-white py-[40px] md:py-[60px] px-5">
      {/* Background */}
      <div className="absolute z-[1] bottom-[0px] right-[0px]">
        <img
          src={TrustedBg}
          alt="bg"
          className="w-[490px] h-[315px]"
        />
      </div>

      <div className="relative z-[2] max-w-[1240px] mx-auto overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-8 lg:gap-0">

          {/* Left */}
          <div className="flex flex-col text-center lg:text-left w-full lg:w-1/2 gap-3">
            <h2 className="font-Roboto text-white font-semibold leading-[28px] md:leading-[31.2px] tracking-[-0.3px] md:tracking-[-0.12px] text-[20px] md:text-[24px]">
              {data.heading}
            </h2>

     <p className="flex align-center items-center justify-center lg:justify-start gap-2 font-Roboto text-LightWhite font-normal leading-[21px] text-[14px] text-center lg:text-left">
  {/* Highlight only the value */}
  <span className="font-Roboto text-DarkOrange font-semibold leading-[28px] tracking-[-0.3px] text-[20px] relative">
    {data.highlight?.value}
    <span className="absolute bottom-[-4px] left-[11px]">
      <img
        src={spanBg}
        alt="highlight-bg"
        className="w-[64px] md:w-[64px] h-[6px] md:h-[6px]"
      />
    </span>
  </span>

  {/* Normal label */}
  <span className="font-Roboto text-LightWhite font-normal leading-[21px] text-[14px] tracking-[0px]">
    {data.highlight?.label}
  </span>
</p>

          </div>

          {/* Ratings */}
          <div className="flex flex-row justify-center lg:justify-end items-center gap-4 md:gap-[26px] w-full lg:w-1/2">
            {data.ratings?.map((rating, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white text-PrimaryBlack px-3 py-2 rounded-[12px]"
              >
                {/* Rating Logo */}
                {rating.logo?.url && (
                  <img
                    src={rating.logo.url}
                    alt={rating.logo.altText || rating.platform}
                    className="w-6 md:w-10 h-6 md:h-10"
                  />
                )}

                {/* Rating Content */}
                <div className="flex flex-col gap-0 md:gap-1">
                  <div className="flex">
                    {/* Static stars */}
                    <img src={star1} alt="star" className="w-5 h-5" />
                    <img src={star1} alt="star" className="w-5 h-5 hidden md:inline" />
                    <img src={star1} alt="star" className="w-5 h-5 hidden md:inline" />
                    <img src={star1} alt="star" className="w-5 h-5 hidden md:inline" />
                    <img
                      src={index === 0 ? star2 : star3}
                      alt="star"
                      className="w-5 h-5 hidden md:inline"
                    />
                    <span className="font-Roboto text-PrimaryBlack font-medium leading-[21px] text-[14px] tracking-[0px] inline md:hidden">
                      {rating.score}
                    </span>
                  </div>
                  <p className="font-Roboto text-PrimaryBlack font-normal leading-[18px] text-[12px] tracking-[0px]">
                    <span className="hidden md:inline">{rating.score} </span>
                    {rating.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logos (Swiper for mobile, flex-wrap for desktop) */}
        <div className="mt-9">
          <div className="block lg:hidden">
            <Swiper
              modules={[FreeMode]}
              freeMode={true}
              slidesPerView={"auto"}
              spaceBetween={32}
              className="!overflow-visible"
            >
              {data.logos?.map((item, index) => (
                <SwiperSlide key={index} className="!w-auto">
                  <img
                    src={item.logo?.url || ""}
                    alt={item.alt || item.logo?.altText || "logo"}
                    className="w-[139px]"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Desktop (no swipe, same design) */}
          <div className="hidden lg:flex flex-wrap justify-start items-center gap-[8px] lg:gap-[40px] xl:gap-[57px]">
            {data.logos?.map((item, index) => (
              <img
                key={index}
                src={item.logo?.url || ""}
                alt={item.alt || item.logo?.altText || "logo"}
                className="w-[139px] md:w-[156px]"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
