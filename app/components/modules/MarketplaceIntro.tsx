import { useState } from "react";
import type { SanityMarketPlaceIntro } from "~/lib/sanity";

type Props = {
  data: SanityMarketPlaceIntro;
};

export default function MarketplaceCategories({ data }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  // console.log("marketplace intro:", data);
  return (
    <section className="bg-[#F6F6F6] text-gray-900 py-14">
      <div className="max-w-[1240px] mx-auto  max-1265px:px-4 max-1265px:gap-2 grid md:grid-cols-2 items-center">
        {/* Left: Text Content */}
        <div>
          {data?.label && (
            <h1 className="font-Roboto text-[#4D4E4F] font-medium leading-[28px] text-[20px]">{data?.label}</h1>
          )}
          <h2 className="mt-5 font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] tracking-[-0.36px] text-[24px] md:text-[36px] md:leading-[43.2px] md:tracking-[-0.54px]">{data?.heading}</h2>
          
        </div>

        {/* Right: Image */}
        {data?.image?.url && (
          <div className="flex justify-center md:justify-end">
            <img
              src={data?.image.url}
              alt={data?.image.alt || "FAQ image"}
              className="rounded-xl shadow-md w-full h-auto lg:max-w-[611px] lg:h-[400px] object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
