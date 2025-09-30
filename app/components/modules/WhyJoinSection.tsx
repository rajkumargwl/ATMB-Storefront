import React from "react";
import { Check } from "lucide-react"; // icon for checkmark

type WhyJoinSectionProps = {
  heading?: string;
  features?: { text: string }[];
};

export default function WhyJoinSection({ heading, features }: WhyJoinSectionProps) {
  return (
    <section
      className="w-full py-8 px-6"
      style={{ background: "var(--Background-Black, #091019)" }}
    >
      <div className="max-w-6xl mx-auto">
        {heading && (
          <h2 className="text-lg md:text-xl font-semibold mb-6 text-[#FFFFFF]">
            {heading}
          </h2>
        )}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          {features?.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <Check size={18} className="text-green-400 shrink-0" />
              <span className="text-sm md:text-base text-[#FFFFFF]">
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
