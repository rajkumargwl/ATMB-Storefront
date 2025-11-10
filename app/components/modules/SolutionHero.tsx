import { Link } from "@remix-run/react";
import RightArrowWhite from '~/components/icons/RightArrowWhite';
 
type Overlay = {
  icon?: { url: string };
  title: string;
  subtitle?: string | null;
};
 
type TrustSection = {
  avatars: { url: string }[];
  licensedIcon: { url: string };
  licensedText: string;
  text: string;
};
 
type SolutionHeroModule = {
  heading: string;
  highlightText?: string;
  description: string;
  cta: {
    label: string;
    url?: string | null;
    variant?: "primary" | "secondary";
  };
  overlayOne: Overlay;
  overlayTwo: Overlay;
  rightImage: { url: string };
  trustSection: TrustSection;
};
 
type Props = {
  data: SolutionHeroModule;
};
 
export default function SolutionHero({ data }: Props) {
  return (
    <section className="px-5 py-[40px] md:py-[60px] lg:py-[95px]">
      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row gap-[45px] md:gap-[65px] items-center">
        {/* Left Content */}
        <div className="w-full md:w-[54.25%] flex flex-col relative">
          <div className="hidden md:flex absolute top-[-45px] md:right-[-70px] lg:right-[-30px] xl:right-[-15px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="99" height="75" viewBox="0 0 99 75" fill="none">
              <path d="M4.47631 39.5072C6.96495 30.7943 17.6932 15.1923 27.5687 16.0174C37.4441 16.8425 27.1674 34.3068 20.7947 42.9358C37.4685 28.3242 75.4756 9.62835 94.1139 51.7378" stroke="#091019" stroke-width="2"/>
              <path d="M74.6407 43.931C79.246 44.304 89.6604 46.6578 94.4756 53.0887C92.8059 48.0662 89.8945 35.2998 91.6069 24.4139" stroke="#091019" stroke-width="2"/>
            </svg>
          </div>
          <h1 className="max-w-[523px] mb-5 font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]">
            {data?.heading?.split(data.highlightText || "").map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className="text-DarkOrange">{data.highlightText}</span>
                )}
              </span>
            ))}
          </h1>
 
          <p className="max-w-[526px] mb-[20px] md:mb-[40px] font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px]">
            {data?.description}
          </p>
 
          {data?.cta?.label && (
            <Link to={data?.cta?.url || "/PDP/virtual-phone-number"} className="group relative overflow-hidden flex items-center justify-center w-full md:w-[207px] bg-DarkOrange text-white font-Roboto font-medium leading-[16px] text-[16px] tracking-[0.08px] h-[52px] px-[16px] py-[12px] rounded-[100px] transition-all  hover:bg-[#DF5D07] hover:text-white">
              
                <span className="relative flex items-center transition-all duration-300">{data.cta.label}  <span className="relative right-0 opacity-0 translate-x-[12px] hidden group-hover:opacity-100 group-hover:block group-hover:translate-x-[12px] transition-all duration-300">
              <RightArrowWhite />
            </span></span>            
            </Link>
          )}
 
          {/* Trust Section */}
          <div className="flex flex-wrap items-center gap-4 md:gap-5 pt-5">
            <div className="flex items-center flex-row gap-3">
              <div className="flex -space-x-[10px]">
                {data?.trustSection?.avatars?.map((avatar, idx) => (
                  <img
                    key={idx}
                    src={avatar.url}
                    alt="avatar"
                    className="w-[35px] md:w-10 h-[34px] md:h-10 rounded-full"
                  />
                ))}
              </div>
              <p className="font-Roboto text-PrimaryBlack font-medium leading-[21px] md:leading-[24px] text-[14px] md:text-[16px] tracking-[0px]">
                {data?.trustSection?.text}
              </p>
            </div>
            <span className="hidden md:flex w-[1px] h-[21px] bg-LightWhite"></span>
            <div className="flex items-center gap-2">
              <img
                src={data?.trustSection?.licensedIcon?.url}
                alt="licensed icon"
                className="w-8 h-8"
              />
              <span className="font-Roboto text-PrimaryBlack font-medium leading-[21px] md:leading-[24px] text-[14px] md:text-[16px] tracking-[0px]">
                {data?.trustSection?.licensedText}
              </span>
            </div>
          </div>
        </div>
 
        {/* Right Image with overlays */}
        <div className="w-full md:w-[45.75%] relative w-full flex justify-center">
          <img
            src={data?.rightImage?.url}
            alt="Hero Illustration"
            className="w-full max-w-[538px] h-[231px] md:h-auto rounded-[20px] object-cover"
          />
 
          {/* Overlay One */}
          <div className="flex items-center gap-3 absolute bottom-[-16px] md:bottom-[-32px] left-[0px] md:left-[53px] max-w-[242px] p-4 rounded-[12px] border border-[#DCDCDC] bg-[rgba(255,255,255,0.70)] backdrop-blur-[12px]">
            {data?.overlayOne?.icon?.url && (
              <img src={data.overlayOne.icon.url} alt="" className="w-6 h-6" />
            )}
            <span className="font-Roboto text-PrimaryBlack font-medium leading-[21px] text-[14px] tracking-[0px]">
              {data?.overlayOne?.title}
            </span>
          </div>
 
          {/* Overlay Two */}
          <div className="flex items-center gap-3 absolute top-[-14px]  md:top-[45px] lg:top-[45px] right-[-7px] md:right-[-20px] xl:right-[-37px] max-w-[242px] p-4 rounded-[12px] border border-[#DCDCDC] bg-[rgba(255,255,255,0.70)] backdrop-blur-[12px]">
            {data?.overlayTwo?.icon?.url && (
              <img src={data.overlayTwo.icon.url} alt="" className="w-6 h-6" />
            )}
            <span className="font-Roboto text-PrimaryBlack font-medium leading-[21px] text-[14px] tracking-[0px]">
              {data?.overlayTwo?.title}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}