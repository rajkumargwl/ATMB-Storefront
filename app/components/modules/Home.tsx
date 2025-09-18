import clsx from 'clsx';
import type {SanityHeroHome} from '~/lib/sanity';
import Banner1 from "~/components/media/banner1.png";
import Banner2 from "~/components/media/banner2.png";
import Amlogo from "~/components/media/AmLogo.png";
import bannerimg1 from "~/components/media/bannerimg1.png";
import bannerimg2 from "~/components/media/bannerimg2.png";
import bannerimg3 from "~/components/media/bannerimg3.png";

import BannerIcon1 from '~/components/icons/BannerIcon1';
import BannerIcon2 from '~/components/icons/BannerIcon2';
import BannerIcon3 from '~/components/icons/BannerIcon3';
import BannerIcon4 from '~/components/icons/BannerIcon4';
import BannerIcon5 from '~/components/icons/BannerIcon5';
import BannerIcon6 from '~/components/icons/BannerIcon6';
import SearchIconBanner from '~/components/icons/SearchIconBanner';
import AmLogo from '~/components/icons/AmLogo';

type Props = {
  hero: SanityHeroHome;
};

export default function HomeHero({ hero }: Props) {
  return (
    // <section className="bg-[#F2F5F7]">
    //   <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2 md:px-10 md:py-24">
    //     {/* Left: text + CTA */}
    //     <div className="max-w-xl">
    //       {hero?.title && (
    //         <h2 className="mb-3 text-[24px] font-semibold text-slate-700">
    //           {hero?.title}
    //         </h2>
    //       )}

    //       <h1 className={clsx('text-[54px] text-slate-900')}>
    //           {hero?.heading || 'Run Your Business From Anywhere.'}
    //       </h1>

    //       <p className="mt-6 text-[22px] font-medium">
    //          {hero?.description || 'From your first business idea to scaling globally, we handle the essentials so you can focus on what matters most.'}
    //       </p>

    //       <div className="mt-8">
    //           <a href={hero?.buttonLink || '#'} className="rounded-lg bg-slate-900 px-6 py-3 font-medium text-white shadow hover:bg-slate-800">
    //             {typeof hero?.buttonText === 'object' ? hero.buttonText.label : hero?.buttonText || 'Get Started'}
    //           </a>
    //       </div>
    //     </div>

    //     {/* Right: two big background pills + small image tiles + labels */}
    //     <div className="relative h-[520px] w-full">
    //       {/* Back/right big pill */}
    //       <div className="absolute right-0 top-8 h-[460px] w-[270px] rounded-[150px] bg-[#E1E4E5]" />

    //       {/* Front/left big pill */}
    //       <div className="absolute left-0 top-0 h-[520px] w-[280px] rounded-[140px] bg-[#E1E4E5]" />

    //       {/* Small image tile on front/left pill (centered) */}
    //       <div className="absolute left-[146px] top-1/2 -translate-x-1/2 -translate-y-1/2">
    //         <Tile />
    //       </div>

    //       {/* Small image tile on back/right pill */}
    //       <div className="absolute right-[84px] top-[230px]">
    //         <Tile />
    //       </div>

    //       {/* Floating label: top-right */}
    //       <div className="absolute right-4 top-16 w-[280px] rounded-full bg-white px-5 py-4 shadow-md">
    //         <p className="text-sm font-semibold text-slate-900">{hero?.card?.title1 || 'Aspiring Entrepreneur'}</p>
    //         <p className="mt-1 text-xs leading-5 text-slate-500">
    //         {hero?.card?.subtitle1 || 'Start strong with all essentials handled from day one.'}
    //         </p>
    //       </div>

    //       {/* Floating label: bottom-left */}
    //       <div className="absolute bottom-8 left-0 w-[300px] rounded-full bg-white px-5 py-4 shadow-md">
    //         <p className="text-sm font-semibold text-slate-900">{hero?.card?.title2 || 'Small Business Owner'}</p>
    //         <p className="mt-1 text-xs leading-5 text-slate-500">
    //         {hero?.card?.subtitle2 || 'Manage your mail, calls, and growth without missing a beat.'}
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </section>

   <section className="bg-white pt-[40px] md:pt-[60px] lg:pt-[69px] pb-[40px] md:pb-[60px] lg:pb-[79px] px-5">
    <div className="max-w-[1240px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-[43px]">
        {/* Left Content */}
        <div className="w-full lg:w-[55.8%] relative">
          <div className='absolute top-[0px] xl:top-[35px] right-[-10px] hidden md:flex '>
             <AmLogo />
          </div>
          <p className="font-Roboto text-PrimaryBlack font-medium leading-[21px] md:leading-[27px] text-[14px] md:text-[18px] tracking-[0px] italic">
            <span className="text-DarkOrange">//</span> Mail. Calls. Growth — All in One Place.
          </p>

          <h1 className="mt-4 md:mt-6 md:max-w-[523px] font-Roboto text-PrimaryBlack font-semibold leading-[43.2px] md:leading-[70.4px] text-[36px] md:text-[64px] tracking-[-0.54px] md:tracking-[-1.28px]">
            Run Your <span className="text-DarkOrange">Business</span> <br /> 
            From Anywhere.
          </h1>

          <p className="mt-4 md:mt-5 md:max-w-[526px] font-Roboto text-PrimaryBlack font-normal md:font-medium leading-[21px] md:leading-[27px] text-[14px] md:text-[18px] tracking-[0px]">
            Anytime Mailbox makes it easy to stay connected and in control. 
            No matter where you are, we’ve got your essentials covered.
          </p>

          {/* Search Box */}
          <div className="mt-[40px] md:mt-[64px] mb-4 md:mb-5 flex items-center gap-[10px] w-full max-w-[546px] pt-[8px] md:pt-[6px] pr-[8px] md:pr-[6px] pb-[8px] md:pb-[6px] pl-[16px] md:pl-[20px] bg-white border border-LightGray rounded-full shadow-sm overflow-hidden">
            <SearchIconBanner /> 
            <input
              type="text"
              placeholder="Address, City or Zip Code..."
              className="font-Roboto text-PrimaryBlack placeholder:text-PrimaryBlack font-normal leading-[24px] text-[16px] tracking-[0.08px] flex-1 py-[5px] md:py-[13px] focus:outline-none"
            />
            <button className="bg-DarkOrange text-white px-[20px] md:px-[35.5px] py-[11px] md:py-[15px] font-normal leading-[14px] md:leading-[22px] text-[14px] md:text-[16px] tracking-[0.08px] rounded-full">
              Search
            </button>
          </div>

          {/* Trusted Section */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-[10px]">
              <img
                src={bannerimg1}
                alt="user"
                className="w-10 h-10 rounded-full"
              />
              <img
                src={bannerimg2}
                alt="user"
                className="w-10 h-10 rounded-full"
              />
              <img
                src={bannerimg3}
                alt="user"
                className="w-10 h-10 rounded-full"
              />
            </div>
            <p className="font-Roboto text-PrimaryBlack font-medium leading-[21px] md:leading-[24px] text-[14px] md:text-[16px] tracking-[0px]">
              Trusted by over 10,000+ professionals
            </p>
          </div>

          {/* Features */}
          <div className="flex flex-col md:flex-row flex-wrap gap-x-5 gap-y-[18px] md:gap-y-4 pt-[56px] lg:pt-[130px] text-sm text-gray-700">
            <div className="flex items-center gap-3 md:gap-2 min-w-[195px] relative after:content-[''] after:hidden md:after:block md:after:right-0 md:after:absolute md:after:w-[1px] md:after:h-[20px] md:after:bg-LightWhite">
      
            <BannerIcon1 />
              <span className="font-Roboto text-PrimaryBlack font-normal leading-[24px] text-[16px] tracking-[0px]">  Real Street Addresses     
            </span> 
            </div>
            <div className="flex items-center gap-3 md:gap-2 min-w-[195px] relative after:content-[''] after:hidden md:after:block md:after:right-0 md:after:absolute md:after:w-[1px] md:after:h-[20px] md:after:bg-LightWhite">
        
                <BannerIcon2 />
                <span className="font-Roboto text-PrimaryBlack font-normal leading-[24px] text-[16px] tracking-[0px]">Open & Scan Mail</span>               
            </div>
            <div className="flex items-center gap-3 md:gap-2 min-w-[195px]">
              
                   <BannerIcon3 />
                <span className="font-Roboto text-PrimaryBlack font-normal leading-[24px] text-[16px] tracking-[0px]">Mail & Package Forwarding  </span>
            </div>
            <div className="flex items-center gap-3 md:gap-2 min-w-[195px] relative after:content-[''] after:hidden md:after:block md:after:right-0 md:after:absolute md:after:w-[1px] md:after:h-[20px] md:after:bg-LightWhite">
              
                    <BannerIcon4 />
                <span className="font-Roboto text-PrimaryBlack font-normal leading-[24px] text-[16px] tracking-[0px]">Free Online Storage   </span>
            </div>
            <div className="flex items-center gap-3 md:gap-2 min-w-[195px] relative after:content-[''] after:hidden md:after:block md:after:right-0 md:after:absolute md:after:w-[1px] md:after:h-[20px] md:after:bg-LightWhite">
       
                <BannerIcon5 />
                <span className="font-Roboto text-PrimaryBlack font-normal leading-[24px] text-[16px] tracking-[0px]"> Check Deposit   </span>
            </div>
            <div className="flex items-center gap-3 md:gap-2 min-w-[195px]">
             
           <BannerIcon6 />
                <span className="font-Roboto text-PrimaryBlack font-normal leading-[24px] text-[16px] tracking-[0px]"> Global Network  </span>
            </div>
          </div>
        </div>

        {/* Right Images */}
        <div className="w-full lg:w-[44.2%] hidden md:flex gap-4 justify-center">
          <div className="">
          <div className="relative">
            <img
              src={Banner1}
              alt="woman"
              className="w-full h-[603px] object-cover"
            />
            {/* Notification Badge */}
            <div className="flex items-center gap-2 absolute bottom-[85px] left-[-85px] max-w-[242px] p-4 rounded-[12px] border border-[#DCDCDC] bg-[rgba(255,255,255,0.70)] backdrop-blur-[12px]">
                 <img
              src={Amlogo}
              alt="amlogo"
              className="w-6 h-6 object-cover"
            />
               <span className='font-Roboto text-PrimaryBlack font-medium leading-[21px] text-[14px] tracking-[0px]'> Your Cheque is cleared successfully </span>
            </div>
          </div>
          </div>

          <div className="">
             <div className="relative">
            <img
              src={Banner2}
              alt="man"
              className="w-full h-[603px] object-cover"
            />
            {/* Notification Badge */}
            <div className="flex items-center gap-2 absolute bottom-[216px] right-[-20px] xl:right-[-58px] max-w-[240px] p-4 rounded-[12px] border border-[#DCDCDC] bg-[rgba(255,255,255,0.70)] backdrop-blur-[12px]">
                  <img
              src={Amlogo}
              alt="amlogo"
              className="w-6 h-6 object-cover"
            />
               
               <span className='font-Roboto text-PrimaryBlack font-medium leading-[21px] text-[14px] tracking-[0px]'>Your Forwarding request has been submitted </span>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}

/** Small image placeholder tile */
function Tile() {
  return (
    <div className="flex h-20 w-20 items-center justify-center rounded-md border border-slate-400 bg-white">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-8 w-8 text-slate-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M8 13l2.5-3 3.5 4 2-2 3 4" />
        <circle cx="9" cy="9" r="1.2" />
      </svg>
    </div>
  );
}