import type {SanityTrustedByBusiness} from '~/lib/sanity';
import gmailLogo from "~/components/media/gmail.svg";
import star1 from "~/components/media/Star1.svg";
import star2 from "~/components/media/Star2.svg";
import star3 from "~/components/media/Star3.svg";
import star4 from "~/components/media/Star4.svg";
import logo1 from "~/components/media/logo1.svg";
import logo2 from "~/components/media/logo2.svg";
import logo3 from "~/components/media/logo3.svg";
import logo4 from "~/components/media/logo4.svg";
import logo5 from "~/components/media/logo5.svg";
import logo6 from "~/components/media/logo6.svg";
import spanBg from "~/components/media/span-bg.svg";
import TrustedBg from "~/components/media/Trusted-bg.png";

type Props = {
  data: SanityTrustedByBusiness;
};

export default function Homedata({ data }: Props) {
  return (
    //  <section className="bg-[#F2F5F7] py-12 border-t border-b border-[#C6CBCD]">
    //      <div className="max-w-6xl mx-auto text-center px-4">
    //        {/* Title */}
    //        <h2 className="text-lg font-semibold text-gray-900">
    //         {data?.heading || 'Trusted by Businesses Around the World'}
    //        </h2>
   
    //        {/* Stats Row */}
    //        <div className="flex flex-wrap justify-center gap-4 mt-6">
    //         {data?.icons?.map((item, idx) => (
    //             <div
    //             key={idx}
    //             className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg shadow-sm"
    //             >
    //             {/* Render the SVG code */}
    //             <span
    //                 className="w-5 h-5"
    //                 dangerouslySetInnerHTML={{ __html: item?.icon?.svgCode }}
    //             />

    //             {/* Render the label */}
    //             <span className="text-sm text-gray-800">
    //                 {item.label}
    //             </span>
    //             </div>
    //         ))}
    //         </div>

   
    //        {/* Logos Row */}
    //        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 mt-10">
    //         {data?.images?.map((item, idx) => {
    //             // handle both "upload" and "upload1"
    //             const assetRef = item.image;

    //             return (
    //             <div
    //                 key={idx}
    //                 className="w-full h-20 bg-gray-200 rounded-lg flex items-center justify-center"
    //             >
    //                 {assetRef ? (
    //                 <img
    //                     src={assetRef.url}
    //                     alt={item.altText || `Logo ${idx + 1}`}
    //                     className="max-h-full max-w-full object-contain"
    //                 />
    //                 ) : (
    //                 <span className="text-gray-500 text-sm">Logo {idx + 1}</span>
    //                 )}
    //             </div>
    //             );
    //         })}
    //         </div>

    //      </div>
    //    </section>


    <section className="bg-PrimaryBlack text-white py-[40px] md:py-[60px] px-5 bg-no-repeat bg-right"  style={{ backgroundImage: `url(${TrustedBg})` }}>
         <div className="max-w-[1240px] mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-8 lg:gap-0">
                
                {/* Left Content */}
                <div className="flex flex-col text-center lg:text-left w-full lg:w-1/2 gap-3">
                    <h2 className="font-Roboto text-white font-semibold leading-[28px] md:leading-[31.2px] tracking-[-0.3px] md:tracking-[-0.12px] text-[20px] md:text-[24px]">
                        Trusted by Businesses Around the World
                    </h2>
                    <p className="flex align-center justify-center lg:justify-start gap-2 font-Roboto text-LightWhite font-normal leading-[21px] text-[14px] text-center lg:text-left">
                        <span className="font-Roboto text-DarkOrange font-semibold leading-[28px] tracking-[-0.3px] text-[20px] relative">15+ Years 
                            <span className=' absolute bottom-[-4px] left-[11px]'> <img
                    src={spanBg}
                    alt="bg"
                    className="w-[64px] md:w-[64px] h-[6px] md:h-[6px]"/></span></span>
                        <span className="font-Roboto text-LightWhite font-normal leading-[21px] text-[14px]">powering virtual operations</span>
                    </p>
                </div>

                {/* Ratings */}
                <div className="flex flex-row justify-center lg:justify-end items-center gap-4 md:gap-[26px] w-full lg:w-1/2">
                {/* Google Review */}
                <div className="flex items-center gap-3 md:gap-3 bg-white text-PrimaryBlack px-3 py-2 rounded-[12px]">
                    <img
                    src={gmailLogo}
                    alt="Google"
                    className="w-6 md:w-10 h-6 md:h-10"
                    />
                    <div className="flex flex-col gap-0 md:gap-1">
                    <div className="flex">
                        <img
                            src={star1}
                            alt="star"
                            className="w-5 h-5"
                        />
                        <img
                            src={star1}
                            alt="star"
                            className="w-5 h-5 hidden md:inline"
                        />    
                        <img
                            src={star1}
                            alt="star"
                            className="w-5 h-5 hidden md:inline"
                        />    
                        <img
                            src={star1}
                            alt="star"
                            className="w-5 h-5 hidden md:inline"
                        />    
                        <img
                            src={star2}
                            alt="star"
                            className="w-5 h-5 hidden md:inline"
                        />
                        <span className='font-Roboto text-PrimaryBlack font-medium leading-[21px] text-[14px] inline md:hidden'>4.5/5</span>
                    </div>
                    <p className="font-Roboto text-PrimaryBlack font-normal leading-[18px] text-[12px]"><span className="hidden md:inline">4.5/5 on </span> <span>Google Review</span></p>
                    </div>
                </div>

                {/* Shopper Approved */}
                <div className="flex items-center gap-3 bg-white text-PrimaryBlack px-3 py-2 rounded-[12px]">
                    <img
                    src={star4}
                    alt="Google"
                    className="w-6 md:w-10 h-6 md:h-10"
                    />
                    <div className="flex flex-col gap-0 md:gap-1 ">
                    <div className="flex">
                        <img
                            src={star1}
                            alt="star"
                            className="w-5 h-5"
                        />
                        <img
                            src={star1}
                            alt="star"
                            className="w-5 h-5 hidden md:inline"
                        />    
                        <img
                            src={star1}
                            alt="star"
                            className="w-5 h-5 hidden md:inline"
                        />    
                        <img
                            src={star1}
                            alt="star"
                            className="w-5 h-5 hidden md:inline"
                        />    
                        <img
                            src={star3}
                            alt="star"
                            className="w-5 h-5 hidden md:inline"
                        />
                         <span className='font-Roboto text-PrimaryBlack font-medium leading-[21px] text-[14px] inline md:hidden'>4/5</span>
                    </div>
                    <p className="font-Roboto text-PrimaryBlack font-normal leading-[18px] text-[12px]"><span className="hidden md:inline">4/5 on </span> Shopper Approved</p>
                    </div>
                </div>
              
                </div>
            </div>

            {/* Logos */}
            <div className="mt-9 flex flex-wrap justify-center md:justify-start items-center gap-[8px] xl:gap-[57px]">
                <img
                 src={logo1}
                alt="Davinci"
                className="w-[139px] md:w-[156px]"
                />
                <img
                src={logo2}
                alt="Annex Brands"
                className="w-[139px] md:w-[156px]"
                />
                <img
                src={logo3}
                alt="PostNet"
                className="w-[139px] md:w-[156px]"
                />
                <img
                src={logo4}
                alt="gcuc"
                className="w-[139px] md:w-[156px]"
                />
                <img
                src={logo5}
                alt="gwa"
                className="w-[139px] md:w-[156px]"
                />
                <img
                src={logo6}
                alt="Executive Centre"
                className="w-[139px] md:w-[156px]"
                />
            </div>
        </div>
    </section>

  );
}