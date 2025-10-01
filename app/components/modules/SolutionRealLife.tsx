import React from "react";
import { PortableText } from "@portabletext/react";

type SolutionRealLifeProps = {
  title?: string;
  description?: any[];
  rightImage?: { url: string };
};

const SolutionRealLife: React.FC<{ data: SolutionRealLifeProps }> = ({ data }) => {
  return (
    <section className="bg-[#0C0F14] text-white py-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center md:gap-12 px-6">
        
        {/* Left Side - Text */}
        <div className="flex-1 space-y-6">
          {data.title && (
            <h2 className="text-2xl md:text-3xl font-semibold">
              {data.title}
            </h2>
          )}

          {data.description && (
            <div className="space-y-4 text-base leading-relaxed text-gray-300">
              <PortableText value={data.description} />
            </div>
          )}
        </div>

        {/* Right Side - Image */}
        {data.rightImage?.url && (
          <div className="flex-1 flex justify-center mt-8 md:mt-0">
            <img
              src={data.rightImage.url}
              alt={data.title || "Real Life Example"}
              className="max-w-[350px] h-auto object-contain"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default SolutionRealLife;
