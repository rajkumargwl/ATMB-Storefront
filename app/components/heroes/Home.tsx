import clsx from 'clsx';
import type { SanityHeroHome } from '~/lib/sanity';
import SearchIconBanner from '~/components/icons/SearchIconBanner';
import AmLogo from '~/components/icons/AmLogo';
import RightArrowWhite from '~/components/icons/RightArrowWhite';
import { useNavigate, useLocation } from "@remix-run/react";
import { useState, useEffect } from "react";
import SearchBox from "~/components/SearchBox";
type Props = {
  hero: SanityHeroHome;
  homeSearchResults: any[];  
  searchQuery: string;   
};
 
export default function HomeHero({ hero, homeSearchResults, searchQuery }: Props) {
  if (!hero) return null;
  const [qresults, setQresults] = useState(homeSearchResults || []);
  const [searchquery, setSearchquery] = useState("");
 
  const navigate = useNavigate();
  const location = useLocation();
  const [skipSearchQSync, setSkipSearchQSync] = useState(false);
  
  useEffect(() => {
    setSearchquery(searchQuery || "");
    setQresults(homeSearchResults || []);
  }, [searchQuery, homeSearchResults]);
 
  // Sync search input to URL
  useEffect(() => {
    if (skipSearchQSync) return;
 
    const params = new URLSearchParams(location.search);
 
    if (!searchquery.trim()) {
     // params.delete("p");
      navigate(`?${params.toString()}`, { replace: true });
      setQresults([]);
      return;
    }
 
    const timeout = setTimeout(() => {
      params.set("p", searchquery);
      navigate(`?${params.toString()}`, { replace: true });
    }, 500);
 
    return () => clearTimeout(timeout);
  }, [searchquery, navigate, location.search, skipSearchQSync]);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newQuery = params.get("p") || "";
 
    setSearchquery(newQuery);
    setQresults(homeSearchResults || []);
  }, [location.search, homeSearchResults]);
 
  return (
    <section className="bg-white pt-[40px] md:pt-[69px] pb-[40px] md:pb-[79px] px-5 overflow-hidden">
      <div className="max-w-[1240px] mx-auto">
        <div className="flex flex-col md:flex-row gap-[43px] items-start">
          {/* Left Content */}
          <div className="w-full md:w-[55.8%] relative">
            <div className="absolute top-[25px] xl:top-[35px] right-[-10px] hidden md:flex ">
              <AmLogo />
            </div>
 
            {hero.smallheading && (
              <p className="font-Roboto text-PrimaryBlack font-medium leading-[21px] md:leading-[27px] text-[14px] md:text-[18px] italic">
                <span className="text-DarkOrange">//</span>{' '}
                {hero.smallheading.replace('//', '').trim()}
              </p>
            )}
 
            <h1 className="mt-4 md:mt-6 md:max-w-[523px] font-Roboto text-PrimaryBlack font-semibold leading-[43.2px] md:leading-[70.4px] text-[36px] md:text-[64px] tracking-[-0.54px] md:tracking-[-1.28px]">
              {hero.title?.split(hero.highlightedWord || '')[0]}{' '}
              <span className="text-DarkOrange">{hero.highlightedWord}</span>{' '}
              <br />
              {hero.title?.split(hero.highlightedWord || '')[1]}
            </h1>
 
            {hero.subtitle && (
              <p className="mt-4 md:mt-5 md:max-w-[526px] font-Roboto text-PrimaryBlack font-normal md:font-medium leading-[21px] md:leading-[27px] text-[14px] md:text-[18px] tracking-[0px]">
                {hero.subtitle}
              </p>
            )}
 
<SearchBox
  placeholder={hero.searchPlaceholder || "Address and zip"}
  buttonText={hero.searchButtonText}
  initialQuery={searchQuery}
  results={homeSearchResults}
  onResultClick={(item) => { 
     // const queryParam = item.displayName || item.city;
      navigate(`/sublocations?q=${encodeURIComponent(item.addressLine1 || '')}`);
    
  }}
/>

            {/* Trusted Section */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-[10px]">
                {hero.trustedAvatars?.map((avatar, i) => (
                  <img
                    key={i}
                    src={avatar.asset.url}
                    alt="trusted avatar"
                    className="w-10 h-10 rounded-full"
                  />
                ))}
              </div>
              {hero.trustedText && (
                <p className="font-Roboto tracking-[0px] text-PrimaryBlack font-medium text-[14px] md:text-[16px] leading-[21px] md:leading-[24px]">
                  {hero.trustedText}
                </p>
              )}
            </div>
 
            {/* Features */}
            <div className="flex flex-col md:flex-row flex-wrap gap-x-5 gap-y-[18px] md:gap-y-4 pt-[56px] lg:pt-[130px] text-sm text-gray-700">
              {hero.features?.map((feature, i) => (
                <div
                  key={i}
                  className={clsx(
                    'flex items-center gap-3 md:gap-2 min-w-[260px] xl:min-w-[195px]',
                    i !== hero.features.length - 1 &&
                      'relative after:content-[""] after:hidden md:after:block md:after:right-0 md:after:absolute md:after:w-[1px] md:after:h-[20px] md:after:bg-LightWhite'
                  )}
                >
                  {feature.icon?.asset?.url && (
                    <img
                      src={feature.icon.asset.url}
                      alt={feature.title}
                      className="w-6 h-6 object-contain"
                      title={feature.tooltipTitle || ''}
                    />
                  )}
                  <span className="font-Roboto tracking-[0] font-normal text-PrimaryBlack text-[16px] leading-[24px]">
                    {feature.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
 
          {/* Right Images (separate divs for image 1 and 2) */}
          <div className="w-full md:w-[44.2%] hidden md:flex gap-4 justify-center">
            <div className="md:flex gap-4 justify-center">
              {/* Image 1 */}
              {hero.rightImage1?.image?.asset?.url && (
                <div className="relative">
                  <img
                    src={hero.rightImage1.image.asset.url}
                    alt="right image 1"
                    className="w-full h-[603px] object-cover rounded-[124px_124px_124px_0]"
                  />
                  <div className="flex items-center gap-2 absolute bottom-[85px] lg:bottom-[75px] left-[-40px] lg:left-[-85px] max-w-[242px] p-4 rounded-[12px] border border-[#DCDCDC] bg-[rgba(255,255,255,0.70)] backdrop-blur-[12px]">
                    {hero.rightImage1.icon?.asset?.url && (
                      <img
                        src={hero.rightImage1.icon.asset.url}
                        alt="icon 1"
                        className="w-6 h-6 object-cover"
                      />
                    )}
                    <span className="font-Roboto text-PrimaryBlack font-medium leading-[21px] text-[14px]">
                      {hero.rightImage1.overlayText}
                    </span>
                  </div>
                </div>
              )}
 
              {/* Image 2 */}
              {hero.rightImage2?.image?.asset?.url && (
                <div className="relative">
                 
                  <img
                    src={hero.rightImage2.image.asset.url}
                    alt="right image 2"
                    className="w-full h-[603px] object-cover rounded-[0_124px_124px_124px]"
                  />
                  
                  <div className="flex items-center gap-2 absolute bottom-[210px] lg:bottom-[205px] right-[-20px] xl:right-[-52px] max-w-[242px] p-4 rounded-[12px] border border-[#DCDCDC] bg-[rgba(255,255,255,0.70)] backdrop-blur-[12px]">
                    {hero.rightImage2.icon?.asset?.url && (
                      <img
                        src={hero.rightImage2.icon.asset.url}
                        alt="icon 2"
                        className="w-6 h-6 object-cover"
                      />
                    )}
                    <span className="font-Roboto text-PrimaryBlack font-medium leading-[21px] text-[14px]">
                      {hero.rightImage2.overlayText}
                    </span>
                  </div>
                </div>
              )}
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