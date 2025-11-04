
import type { SanityLocations } from '~/lib/sanity';
import whiteArrow from "~/components/media/white-arrow.svg";
import RightArrowWhite from '~/components/icons/RightArrowWhite';

type Props = {
  data: SanityLocations;
};

export default function Locations({ data }: Props) {
  const locations = data?.locations || [];

  return (
    <section className="bg-white text-white py-[40px] md:py-[60px] lg:py-[100px] px-5">
      <div className="max-w-[1240px] mx-auto">
        {/* Heading */}
        <div className="max-w-[744px] mx-auto pb-[44px] md:pb-[64px] flex flex-col align-center justify-center gap-4 md:gap-5">
          <h2 className="font-Roboto text-PrimaryBlack font-semibold leading-[33.8px] md:leading-[43.2px] text-[26px] md:text-[36px] tracking-[-0.39px] md:tracking-[-0.54px] text-center">
            {data?.heading || "Find a Virtual Mailbox Near You"}
          </h2>
          <p className="font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[27px] text-[14px] md:text-[18px] tracking-[0px] text-center">
            {data?.description ||
              "Search by city, browse all available locations, or choose from our most popular spots with the highest number of operators."}
          </p>
        </div>

        {/* Locations Grid */}
        <div className="transition-all grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[1088px] mx-auto">
          {locations.map((loc, i) => (
            <div
              key={i}
              className="relative p-2 md:p-3 flex flex-row gap-2 md:gap-3 items-start 
             rounded-[12px] border border-LightWhite bg-white 
             transition-all duration-500 ease-in-out hover:bg-PrimaryBlack group">
              {/* Image */}
              <img
                src={loc.image?.url || ""}
                alt={loc.image?.altText || loc.city}
                className="w-11 md:w-16 h-11 md:h-16 object-cover rounded-[10px] md:rounded-[12px] transition-all duration-500 ease-in-out"
              />

              {/* Operators + City */}
              <div className="flex flex-col gap-[2px]">
                <span className="transition-all duration-500 ease-in-out text-sm font-Roboto text-LightGray font-normal leading-[18px] md:leading-[21px] text-[12px] md:text-[14px] tracking-[0px] group-hover:text-white">
                  <span className="transition-all duration-500 ease-in-out text-DarkOrange w-1 h-1 inline-block group-hover:text-white">•</span>{" "}
                  {loc.operatorCount} Operators
                </span>

                {/* City + State */}
                <h3 className="transition-all duration-500 ease-in-out font-Roboto text-PrimaryBlack font-medium leading-[24px] md:leading-[28px] text-[16px] md:text-[20px] tracking-[0px] group-hover:text-white line-clamp-1">
                  {loc.city},{" "}
                  <span className="transition-all duration-500 ease-in-out inline font-Roboto text-LightGray font-medium leading-[24px] md:leading-[28px] text-[16px] md:text-[16px] tracking-[0px] group-hover:text-white">
                    {loc.state}
                  </span>
                </h3>

                {/* Hover Arrow */}
                <div>
                    <img
                      src={whiteArrow}
                      alt="arrow"
                      className="
                        w-6 md:w-6 h-6 md:h-6 
                        absolute right-3 top-3
                        opacity-0 translate-x-[-10px] translate-y-[10px]
                        transition-all duration-500 ease-in-out
                        group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0
                      "
                    />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="mt-11 md:mt-8 text-center">
          <a
            href={data?.browseAllUrl || "/country-location"}
            className="group flex items-center justify-center w-full md:w-auto max-w-[386px] mx-auto min-h-[44px] md:min-h-auto bg-DarkOrange text-white font-Roboto font-medium leading-[16px] text-[16px] tracking-[0.08px] py-[12px] md:py-[18px] px-[16px] md:px-[117px] rounded-[100px] inline-block overflow-hidden transition-all hover:scale-[1.01] hover:bg-[#DD5827]">
            
             <span className="relative flex items-center"> {data?.browseAllText }   <span className="absolute right-0 opacity-0 translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-[35px] transition-all duration-300">
              <RightArrowWhite />
            </span></span>
          </a>
        </div>
      </div>
    </section>
  );
}
