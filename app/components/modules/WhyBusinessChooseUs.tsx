
import type { SanityWhyBusinessesChooseUs } from '~/lib/sanity';
import whyChooseBg from "~/components/media/why-choose-bg.png";

type Props = {
  data: SanityWhyBusinessesChooseUs;
};

export default function WhyBusinessesChooseUs({ data }: Props) {
  return (
    <section className="relative overflow-hidden bg-PrimaryBlack text-white py-[40px] md:py-[60px] lg:py-[100px] px-5 bg-no-repeat bg-bottom-left">
      {/* Background Image */}
      <div className="absolute z-1 bottom-[-250px] left-0">
        <img
          src={whyChooseBg}
          alt="Background"
          className="w-[530px] h-[782px]"
        />
      </div>

      <div className="relative z-2 max-w-[1240px] mx-auto flex justify-between flex-col md:flex-row gap-11 md:gap-5">
        {/* Left section */}
        <div className="max-w-[379px] flex flex-col gap-5">
          <h2 className="font-Roboto text-white font-semibold leading-[31.2px] md:leading-[43.2px] tracking-[-0.39px] md:tracking-[-0.54px] text-[26px] md:text-[36px]">
            {data?.heading }
          </h2>
          <p className="font-Roboto text-LightWhite font-normal leading-[21px] md:leading-[27px] text-[14px] md:text-[18px] tracking-[0px]">
            {data?.description }
          </p>
        </div>

        {/* Right section */}
        <div className="max-w-[683px]">
          <div className="grid grid-cols-2 gap-x-4 md:gap-x-10 gap-y-[44px] md:gap-y-[72px]">
            {data?.features?.map((feature) => (
              <div
                key={feature._key}
                className="flex flex-col items-start gap-5 md:gap-6"
              >
                {/* Icon (Dynamic with fallback) */}
                <div>
                  {feature.icon?.upload?.url ? (
                    <img
                      src={feature.icon.upload.url}
                      alt={feature.icon.upload.altText || feature.title}
                      className="w-8 md:w-10 h-8 md:h-10 object-contain"
                      title={feature.icon?.tooltipTitle} // Browser tooltip
                    />
                  ) : feature.icon?.svgCode ? (
                    <div
                      className="w-8 md:w-10 h-8 md:h-10 text-orange-500"
                      dangerouslySetInnerHTML={{ __html: feature.icon.svgCode }}
                      title={feature.icon?.tooltipTitle} // Browser tooltip
                    />
                  ) : (
                    // Static fallback icon (your Lucide grid)
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-layout-grid w-8 md:w-10 h-8 md:h-10 text-orange-500"
                      aria-hidden="true"
                      title={feature.icon?.tooltipTitle} // Browser tooltip
                    >
                      <rect width="7" height="7" x="3" y="3" rx="1"></rect>
                      <rect width="7" height="7" x="14" y="3" rx="1"></rect>
                      <rect width="7" height="7" x="14" y="14" rx="1"></rect>
                      <rect width="7" height="7" x="3" y="14" rx="1"></rect>
                    </svg>
                  )}
                </div>

                {/* Title + Description */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-Roboto text-white font-medium leading-[27px] text-[18px] tracking-[0px]">
                    {feature.title}
                  </h3>
                  {feature.description && (
                    <p className="font-Roboto text-LightWhite font-normal leading-[21px] text-[14px] tracking-[0px]">
                      {feature.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
