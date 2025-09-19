// import type {SanityTrustedByBusiness} from '~/lib/sanity';
// import gmailLogo from "~/components/media/gmail.svg";
// import star1 from "~/components/media/Star1.svg";
// import star2 from "~/components/media/Star2.svg";
// import star3 from "~/components/media/Star3.svg";
// import star4 from "~/components/media/Star4.svg";
// import logo1 from "~/components/media/logo1.svg";
// import logo2 from "~/components/media/logo2.svg";
// import logo3 from "~/components/media/logo3.svg";
// import logo4 from "~/components/media/logo4.svg";
// import logo5 from "~/components/media/logo5.svg";
// import logo6 from "~/components/media/logo6.svg";
// import spanBg from "~/components/media/span-bg.svg";
// import TrustedBg from "~/components/media/Trusted-bg.png";

// type Props = {
//   data: SanityTrustedByBusiness;
// };

// export default function Homedata({ data }: Props) {
//   return (
//     <section className="relative bg-PrimaryBlack text-white py-[40px] md:py-[60px] px-5">
//          <div className="absolute z-[1] bottom-[0px] right-[0px]">
//             <img
//            src={TrustedBg}
//            alt="user"
//            className="w-[490px] h-[315px]"
//            />
//             </div>
//          <div className="relative z-[2] max-w-[1240px] mx-auto">
//             <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-8 lg:gap-0">
                
//                 {/* Left Content */}
//                 <div className="flex flex-col text-center lg:text-left w-full lg:w-1/2 gap-3">
//                     <h2 className="font-Roboto text-white font-semibold leading-[28px] md:leading-[31.2px] tracking-[-0.3px] md:tracking-[-0.12px] text-[20px] md:text-[24px]">
//                         {data.heading}
//                     </h2>
//                     <p className="flex align-center items-center justify-center lg:justify-start gap-2 font-Roboto text-LightWhite font-normal leading-[21px] text-[14px] text-center lg:text-left">
//                         <span className="font-Roboto text-DarkOrange font-semibold leading-[28px] tracking-[-0.3px] text-[20px] relative">{data.highlight?.value} {data.highlight?.label}
//                             <span className=' absolute bottom-[-4px] left-[11px]'> <img
//                     src={spanBg}
//                     alt="bg"
//                     className="w-[64px] md:w-[64px] h-[6px] md:h-[6px]"/></span></span>
//                         <span className="font-Roboto text-LightWhite font-normal leading-[21px] text-[14px] tracking-[0px]">{data.heading}</span>
//                     </p>
//                 </div>

//                 {/* Ratings */}
//                 <div className="flex flex-row justify-center lg:justify-end items-center gap-4 md:gap-[26px] w-full lg:w-1/2">
//                 {/* Google Review */}
//                 <div className="flex items-center gap-3 md:gap-3 bg-white text-PrimaryBlack px-3 py-2 rounded-[12px]">
//                     <img
//                     src={gmailLogo}
//                     alt="Google"
//                     className="w-6 md:w-10 h-6 md:h-10"
//                     />
//                     <div className="flex flex-col gap-0 md:gap-1">
//                     <div className="flex">
//                         <img
//                             src={star1}
//                             alt="star"
//                             className="w-5 h-5"
//                         />
//                         <img
//                             src={star1}
//                             alt="star"
//                             className="w-5 h-5 hidden md:inline"
//                         />    
//                         <img
//                             src={star1}
//                             alt="star"
//                             className="w-5 h-5 hidden md:inline"
//                         />    
//                         <img
//                             src={star1}
//                             alt="star"
//                             className="w-5 h-5 hidden md:inline"
//                         />    
//                         <img
//                             src={star2}
//                             alt="star"
//                             className="w-5 h-5 hidden md:inline"
//                         />
//                         <span className='font-Roboto text-PrimaryBlack font-medium leading-[21px] text-[14px] tracking-[0px] inline md:hidden'>4.5/5</span>
//                     </div>
//                     <p className="font-Roboto text-PrimaryBlack font-normal leading-[18px] text-[12px] tracking-[0px]"><span className="hidden md:inline">4.5/5 on </span> <span className='font-Roboto text-PrimaryBlack font-normal leading-[18px] text-[12px] tracking-[0px]'>Google Review</span></p>
//                     </div>
//                 </div>

//                 {/* Shopper Approved */}
//                 <div className="flex items-center gap-3 bg-white text-PrimaryBlack px-3 py-2 rounded-[12px]">
//                     <img
//                     src={star4}
//                     alt="Google"
//                     className="w-6 md:w-10 h-6 md:h-10"
//                     />
//                     <div className="flex flex-col gap-0 md:gap-1 ">
//                     <div className="flex">
//                         <img
//                             src={star1}
//                             alt="star"
//                             className="w-5 h-5"
//                         />
//                         <img
//                             src={star1}
//                             alt="star"
//                             className="w-5 h-5 hidden md:inline"
//                         />    
//                         <img
//                             src={star1}
//                             alt="star"
//                             className="w-5 h-5 hidden md:inline"
//                         />    
//                         <img
//                             src={star1}
//                             alt="star"
//                             className="w-5 h-5 hidden md:inline"
//                         />    
//                         <img
//                             src={star3}
//                             alt="star"
//                             className="w-5 h-5 hidden md:inline"
//                         />
//                          <span className='font-Roboto text-PrimaryBlack font-medium leading-[21px] text-[14px] tracking-[0px] inline md:hidden'>4/5</span>
//                     </div>
//                     <p className="font-Roboto text-PrimaryBlack font-normal leading-[18px] text-[12px] tracking-[0px]"><span className="hidden md:inline">4/5 on </span> Shopper Approved</p>
//                     </div>
//                 </div>
              
//                 </div>
//             </div>

//             {/* Logos */}
//             <div className="mt-9 flex flex-wrap justify-center md:justify-start items-center gap-[8px] xl:gap-[57px]">
//                 <img
//                  src={logo1}
//                 alt="Davinci"
//                 className="w-[139px] md:w-[156px]"
//                 />
//                 <img
//                 src={logo2}
//                 alt="Annex Brands"
//                 className="w-[139px] md:w-[156px]"
//                 />
//                 <img
//                 src={logo3}
//                 alt="PostNet"
//                 className="w-[139px] md:w-[156px]"
//                 />
//                 <img
//                 src={logo4}
//                 alt="gcuc"
//                 className="w-[139px] md:w-[156px]"
//                 />
//                 <img
//                 src={logo5}
//                 alt="gwa"
//                 className="w-[139px] md:w-[156px]"
//                 />
//                 <img
//                 src={logo6}
//                 alt="Executive Centre"
//                 className="w-[139px] md:w-[156px]"
//                 />
//             </div>
//         </div>
//     </section>

//   );
// }
import { useRef } from "react";
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
  const logosRef = useRef<HTMLDivElement>(null);

  // handle swipe (touch drag)
  const handleTouchStart = (e: React.TouchEvent) => {
    const container = logosRef.current;
    if (!container) return;

    container.dataset.startX = e.touches[0].pageX.toString();
    container.dataset.scrollLeft = container.scrollLeft.toString();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const container = logosRef.current;
    if (!container || !container.dataset.startX || !container.dataset.scrollLeft) return;

    const startX = parseInt(container.dataset.startX, 10);
    const scrollLeft = parseInt(container.dataset.scrollLeft, 10);
    const x = e.touches[0].pageX;
    const walk = startX - x;

    container.scrollLeft = scrollLeft + walk;
  };

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

      <div className="relative z-[2] max-w-[1240px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-8 lg:gap-0">

          {/* Left */}
          <div className="flex flex-col text-center lg:text-left w-full lg:w-1/2 gap-3">
            <h2 className="font-Roboto text-white font-semibold leading-[28px] md:leading-[31.2px] tracking-[-0.3px] md:tracking-[-0.12px] text-[20px] md:text-[24px]">
              {data.heading}
            </h2>

            <p className="flex align-center items-center justify-center lg:justify-start gap-2 font-Roboto text-LightWhite font-normal leading-[21px] text-[14px] text-center lg:text-left">
              <span className="font-Roboto text-DarkOrange font-semibold leading-[28px] tracking-[-0.3px] text-[20px] relative">
                {data.highlight?.value} {data.highlight?.label}
                <span className="absolute bottom-[-4px] left-[11px]">
                  <img
                    src={spanBg}
                    alt="highlight-bg"
                    className="w-[64px] md:w-[64px] h-[6px] md:h-[6px]"
                  />
                </span>
              </span>
              <span className="font-Roboto text-LightWhite font-normal leading-[21px] text-[14px] tracking-[0px]">
                {data.heading}
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

        {/* Logos (swipeable on mobile, no global css) */}
        <div className="mt-9">
          <div
            ref={logosRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            className="
              flex gap-2 md:gap-2 xl:gap-[57px] lg:flex-wrap 
              overflow-x-auto lg:overflow-x-visible 
              lg:space-x-0
              snap-x snap-mandatory
              lg:justify-start 
              justify-start 
              items-center
              [&::-webkit-scrollbar]:hidden
              [-ms-overflow-style:none] 
              [scrollbar-width:none]
            "
          >
            {data.logos?.map((item, index) => (
              <div key={index} className="flex-shrink-0 snap-start">
                <img
                  src={item.logo?.url || ""}
                  alt={item.alt || item.logo?.altText || "logo"}
                  className="w-[139px] md:w-[156px]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
