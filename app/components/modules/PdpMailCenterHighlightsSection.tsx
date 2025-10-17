import React from "react";
import { Check } from "lucide-react";

type PartnerLogo = {
  url: string;
};

type Icon = {
  url: string;
};

type Props = {
  companyName: string;
  designation: string;
  highlightsTitle: string;
  highlights: string[];
  partnerLogos: PartnerLogo[];
  icon: Icon;
  isVerified: boolean;
};

const PdpMailCenterHighlightsSection: React.FC<Props> = ({
  companyName,
  designation,
  highlightsTitle,
  highlights,
  partnerLogos,
  icon,
  isVerified,
}) => {
  return (
    <section className="w-full bg-[#0b0f17] text-white px-10 py-6 rounded-xl flex flex-col md:flex-row justify-between items-start gap-10">
      {/* Left Section */}
      <div className="flex flex-col gap-3 w-full md:w-1/3">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">{companyName}</h2>
          {isVerified && (
            <img src={icon?.url} alt="verified" className="w-4 h-4" />
          )}
        </div>
        <p className="text-sm text-gray-300">{designation}</p>

        <div className="flex flex-wrap items-center gap-4 mt-3">
          {partnerLogos?.map((logo, index) => (
            <img
              key={index}
              src={logo.url}
              alt={`partner-${index}`}
              className="h-6 object-contain bg-white p-1 rounded-md"
            />
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-2/3">
        <h3 className="text-base font-semibold mb-3">
          {highlightsTitle || "Key Highlights"}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-2">
          {highlights?.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PdpMailCenterHighlightsSection;
