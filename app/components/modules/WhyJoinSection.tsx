import React from "react";
import { Check } from "lucide-react"; // icon for checkmark
import CheckArrowWhite from "~/components/icons/CheckArrowWhite";
import WhyJoinBg from "~/components/media/why-join-bg.png";
import WhyJoinBgMobile from "~/components/media/why-join-bg-mobile.png";
 
 
type WhyJoinSectionProps = {
  heading?: string;
  features?: { text: string }[];
};
 
export default function WhyJoinSection({ heading, features }: WhyJoinSectionProps) {
  return (
    <section
      className="w-full px-5 py-10 relative z-[2] overflow-hidden"
      style={{ background: "var(--Background-Black, #091019)" }}
    >
       <div className="absolute hidden md:block z-[1] md:top-[0px] right-[0px] md:right-[0px]">
        <img src={WhyJoinBg} alt="Background" className="w-[550px] h-[196px] lg:h-[151px]"/>
        </div>
          <div className="absolute block md:hidden z-[1] bottom-[0px] right-[0px]">
        <img src={WhyJoinBgMobile} alt="Background" className="w-[393px] h-[272px]"/>
        </div>
      <div className="max-w-[1240px] mx-auto relative z-[2]">
        {heading && (
          <h2 className="mb-4 md:mb-4 font-Roboto text-white font-medium leading-[28px] md:leading-[28px] text-[20px] md:text-[20px] tracking-[0px]">
            {heading}
          </h2>
        )}
        <div className="flex flex-col md:flex-row flex-wrap items-start md:items-center justify-start md:justify-start gap-[16px] md:gap-6">
          {features?.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <CheckArrowWhite size={24} />
              <span className="font-Roboto text-white font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}