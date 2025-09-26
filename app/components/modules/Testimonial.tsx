// import { useRef } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import ArrowRightIcon from "~/components/icons/ArrowRightIcon";
// import ArrowLeftIcon from "~/components/icons/ArrowLeftIcon";
// import Testimonial from "~/components/icons/Testimonial";
// import type { SanityTestimonial } from "~/lib/sanity";

// type Props = {
//   data: SanityTestimonial;
// };

// export default function Testimonials({ data }: Props) {
//   const prevRef = useRef<HTMLButtonElement>(null);
//   const nextRef = useRef<HTMLButtonElement>(null);

//   return (
//      <section className="py-[40px] md:py-[60px] lg:py-[100px] bg-white px-5">
//        <div className="max-w-[1240px] mx-auto flex flex-col gap-11 md:gap-14">
//         {/* Badge */}
//         {/* <div className="flex items-center gap-2 mb-4 bg-[#FFE5D8] px-3 py-2 rounded-full w-max">
//           <span className="w-2 h-2 bg-[#EE6D2D] rounded-full" />
//           <span className="text-sm font-medium text-gray-700">
//             {data?.headline}
//           </span>
//         </div> */}

//         {/* Heading + Arrows */}
//         <div className="flex flex-col md:flex-row justify-between items-end">
//           <h2 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[26px] md:text-[36px] tracking-[-0.39px] md:tracking-[-0.54px] text-center md:text-left">
//             {data?.subheadline}
//           </h2>
//           <div className="hidden md:flex justify-end gap-5">
//             <button
//               ref={prevRef}
//               className="w-14 h-14 flex items-center justify-center rounded-full bg-orange-500 text-white"
//             >
//               <ArrowLeftIcon />
//             </button>
//             <button
//               ref={nextRef}
//               className="w-14 h-14 flex items-center justify-center rounded-full bg-orange-500 text-white"
//             >
//               <ArrowRightIcon />
//             </button>
//           </div>
//         </div>

//         {/* Slider */}
//         <div className="relative">
//           <Swiper
//             modules={[Navigation]}
//             spaceBetween={24}
//             slidesPerView={1}
//             breakpoints={{
//               768: { slidesPerView: 2 },
//               1024: { slidesPerView: 3 },
//             }}
//             navigation={{
//               prevEl: prevRef.current,
//               nextEl: nextRef.current,
//             }}
//             onBeforeInit={(swiper) => {
//               // @ts-ignore
//               swiper.params.navigation.prevEl = prevRef.current;
//               // @ts-ignore
//               swiper.params.navigation.nextEl = nextRef.current;
//             }}
//           >
//              {data?.testimonials?.map((item, idx) =>
//             item.type === "quote" ? (
//               <SwiperSlide key={idx}  className="!h-auto !flex-shrink-0">
//                 <div className="bg-white rounded-[20px] border border-LightWhite p-6 flex flex-col justify-between">
//                   {/* Top: Quote + Rating */}
//                   <div className="flex items-center justify-between">
//                     {item.authorImage && (
//                       <img
//                         src={item.authorImage?.url}
//                         alt={item.authorName}
//                         className="w-16 h-16 rounded-full object-cover"
//                       />
//                     )}
//                     <div className="flex items-center gap-2 border border-LightWhite text-base font-normal leading-[24px] bg-gray-100 px-4 py-3 rounded-full">
//                       <span className="text-black">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 23 22" fill="none">
//                           <path d="M12.5299 0.773351C12.3091 0.300748 11.8425 0 11.33 0C10.8176 0 10.3551 0.300748 10.1301 0.773351L7.45126 6.45748L1.46857 7.36832C0.968625 7.44565 0.552003 7.80655 0.397853 8.30063C0.243703 8.79472 0.368689 9.34036 0.726984 9.70555L5.06819 14.1351L4.0433 20.395C3.95997 20.9106 4.16828 21.4347 4.58074 21.7398C4.99319 22.0448 5.53897 22.0835 5.98892 21.8386L11.3342 18.8955L16.6794 21.8386C17.1294 22.0835 17.6752 22.0491 18.0876 21.7398C18.5001 21.4304 18.7084 20.9106 18.6251 20.395L17.596 14.1351L21.9372 9.70555C22.2955 9.34036 22.4247 8.79472 22.2663 8.30063C22.108 7.80655 21.6956 7.44565 21.1956 7.36832L15.2088 6.45748L12.5299 0.773351Z" fill="#74A038"/>
//                         </svg>
//                       </span>
//                       <span className="font-Roboto text-base font-normal leading-[24px]">{item.rating || "4.5"}</span>
//                     </div>
//                   </div>
//                   <span className="mt-[28px] mb-[22px]"><Testimonial /></span>
//                   {/* Quote */}
//                   <p className="font-Roboto text-PrimaryBlack font-normal leading-[27px] md:leading-[27px] text-[18px]  md:text-[18px] tracking-[0px]">
//                     {item.quote}
//                   </p>
//                   <a href="#" className="font-Roboto text-DarkOrange text-[14px] leading-[14px] tracking-[0.07px] font-normal mt-4 inline-block">Read More</a>

//                   {/* Author */}
//                     <div className="mt-[72px] pl-4 border-l border-LightWhite flex flex-col gap-1">
//                       <p className="font-Roboto text-PrimaryBlack text-[16px] leading-[24px] font-medium tracking-[0px]">
//                         {item.authorName}
//                       </p>
//                       <p className="font-Roboto text-LightGray text-[14px] leading-[21px] font-normal tracking-[0px]">{item.authorTitle}</p>
//                     </div>
//                 </div>
//               </SwiperSlide>
//                ) : (
//                 <SwiperSlide key={idx}  className="!h-auto !flex-shrink-0">
//                 <div className="bg-white rounded-[20px] border border-LightWhite p-6 flex flex-col justify-between">
//                   {/* Top: Quote + Rating */}
//                   <div className="flex items-center justify-between">
//                     {item.authorImage && (
//                       <img
//                         src={item.authorImage?.url}
//                         alt={item.authorName}
//                         className="w-16 h-16 rounded-full object-cover"
//                       />
//                     )}
//                     <div className="flex items-center gap-2 border border-LightWhite text-base font-normal leading-[24px] bg-gray-100 px-4 py-3 rounded-full">
//                       <span className="text-black">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 23 22" fill="none">
//                           <path d="M12.5299 0.773351C12.3091 0.300748 11.8425 0 11.33 0C10.8176 0 10.3551 0.300748 10.1301 0.773351L7.45126 6.45748L1.46857 7.36832C0.968625 7.44565 0.552003 7.80655 0.397853 8.30063C0.243703 8.79472 0.368689 9.34036 0.726984 9.70555L5.06819 14.1351L4.0433 20.395C3.95997 20.9106 4.16828 21.4347 4.58074 21.7398C4.99319 22.0448 5.53897 22.0835 5.98892 21.8386L11.3342 18.8955L16.6794 21.8386C17.1294 22.0835 17.6752 22.0491 18.0876 21.7398C18.5001 21.4304 18.7084 20.9106 18.6251 20.395L17.596 14.1351L21.9372 9.70555C22.2955 9.34036 22.4247 8.79472 22.2663 8.30063C22.108 7.80655 21.6956 7.44565 21.1956 7.36832L15.2088 6.45748L12.5299 0.773351Z" fill="#74A038"/>
//                         </svg>
//                       </span>
//                       <span className="font-Roboto text-base font-normal leading-[24px]">{item.rating || "4.5"}</span>
//                     </div>
//                   </div>
//                   {/* <span className="mt-[28px] mb-[22px]"><Testimonial /></span> */}
//                   {/* Video */}
//                   <div className="relative mt-6">
//                     <img
//                      src={item?.playIcon?.playSvgFile?.url} 
//                       className="w-full h-[250px] object-cover"
//                     />
//                     {/* Play Icon Overlay */}
//                     {item?.playIcon?.playSvgFile && (
//                       <div className="absolute inset-0 flex items-center justify-center">
//                         <a
//                           href={item?.videoUrl} 
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="cursor-pointer"
//                         >
//                           <div className="bg-[#FFFFFFB2] rounded-full p-2 shadow-lg flex items-center justify-center">
//                             {/* Rounded Play Icon */}
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               width="40"
//                               height="40"
//                               viewBox="0 0 24 24"
//                               fill="currentColor"
//                               className="text-black w-10 h-10"
//                             >
//                               <path d="M9 6.5v11c0 .6.6.9 1.1.6l8.2-5.5c.5-.3.5-1 0-1.3L10.1 5.8c-.5-.3-1.1 0-1.1.7z" />
//                             </svg>
//                           </div>
//                         </a>
//                       </div>
//                     )}
//                   </div>


//                   {/* Author */}
           
//                     <div className="mt-[62px] pl-4 border-l border-LightWhite flex flex-col gap-1">
//                       <p className="font-Roboto text-PrimaryBlack text-[16px] leading-[24px] font-medium">
//                         {item.authorName}
//                       </p>
//                       <p className="font-Roboto text-LightGray text-[14px] leading-[21px] font-normal">{item.authorTitle}</p>
//                     </div>
//                   </div>
            
//               </SwiperSlide>
//               )
//             )}
//           </Swiper>
//         </div>
//       </div>
//     </section>
//   );
// }
import { useRef, useState, useEffect } from "react";
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

  return (
    <section className="py-[40px] md:py-[60px] lg:py-[100px] bg-white px-5">
      <div className="max-w-[1240px] mx-auto flex flex-col gap-11 md:gap-14">

        {/* Heading + Arrows */}
        <div className="flex flex-col md:flex-row justify-between items-end">
          <h2 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[26px] md:text-[36px] tracking-[-0.39px] md:tracking-[-0.54px] text-center md:text-left">
            {data?.subheadline || data?.headline}
          </h2>
          <div className="hidden md:flex justify-end gap-5">
            <button
              ref={prevRef}
              className={`w-14 h-14 flex items-center justify-center rounded-full text-white ${
                isBeginning ? "bg-[#D3D3D3]" : "bg-DarkOrange"
              }`}
            >
              <ArrowLeftIcon />
            </button>
            <button
              ref={nextRef}
              className={`w-14 h-14 flex items-center justify-center rounded-full text-white ${
                isEnd ? "bg-[#D3D3D3]" : "bg-DarkOrange"
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
                    <p className="transition-all duration-500 ease-in-out font-Roboto text-PrimaryBlack font-normal leading-[27px] md:leading-[27px] text-[18px] md:text-[18px] tracking-[0px] group-hover:text-white">
                      {item.quote}
                    </p>
                    {item.readMoreText && (
                      <a
                        href={item.readMoreUrl || "#"}
                        className="font-Roboto text-DarkOrange text-[14px] leading-[14px] tracking-[0.07px] font-normal mt-4 inline-block"
                      >
                         <span className="sr-only">(click to Read Full Article)</span>
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
                               <span className="sr-only">(click to play video)</span>
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