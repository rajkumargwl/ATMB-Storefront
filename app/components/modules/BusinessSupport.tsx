import React from "react";
import { PortableText } from "@portabletext/react";

interface Cta {
  label: string;
  url?: string | null;
}

interface ImageType {
  url: string;
}

interface DescriptionBlock {
  _key: string;
  _type: string;
  children: {
    _key: string;
    _type: string;
    marks: string[];
    text: string;
  }[];
  markDefs: any[];
  style: string;
}

interface BusinessSupportProps {
  title: string;
  description: DescriptionBlock[];
  cta: Cta;
  sideImage: ImageType;
}

const BusinessSupport: React.FC<{ data: BusinessSupportProps }> = ({ data }) => {
  const { title, description, cta, sideImage } = data;

  return (
    <section className="bg-[#0b0f17] text-white py-20 px-6 lg:px-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Content */}
        <div className="flex-1 max-w-xl">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">{title}</h2>
          <div className="text-gray-300 space-y-4 leading-relaxed mb-8">
            <PortableText value={description} />
          </div>
          {cta?.label && (
            <a
              href={cta?.url || "#"}
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-6 py-3 rounded-full transition-all"
            >
              {cta.label}
            </a>
          )}
        </div>

        {/* Right Image */}
        <div className="relative flex-1 flex justify-center lg:justify-end">
          <div className="absolute top-1/2 -translate-y-1/2 right-12 w-40 h-40 bg-orange-500 rounded-lg rotate-12 opacity-90"></div>
          <img
            src={sideImage?.url}
            alt="Business Support"
            className="relative z-10 max-w-[340px] h-auto rounded-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default BusinessSupport;
