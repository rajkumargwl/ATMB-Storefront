import React from "react";

type Award = {
  icon: { url: string };
  title: string;
  subTitle: string;
};

type MediaCoverage = {
  link?: string | null;
  logo: { url: string };
};

type IndustryPartner = {
  link?: string | null;
  logo: { url: string };
  name: string;
};

type Props = {
  heading: string;
  awards: Award[];
  mediaCoverage: MediaCoverage[];
  industryPartners: IndustryPartner[];
};

const BusinessIndustryRecognitionSection: React.FC<Props> = ({
  heading,
  awards,
  mediaCoverage,
  industryPartners,
}) => {
  return (
    <section className="bg-[#0B0E17] text-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
          {heading}
        </h2>

        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-800 gap-10">
          {/* Awards & Certificates */}
          <div className="flex flex-col items-start md:items-center gap-6 px-6">
            <h3 className="text-lg font-semibold mb-2">
              Awards & Certificates
            </h3>
            <div className="flex flex-col gap-5">
              {awards.map((award, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 text-left md:text-center"
                >
                  <img
                    src={award.icon.url}
                    alt="Award Icon"
                    className="w-8 h-8 flex-shrink-0"
                  />
                  <div>
                    <p className="font-medium text-white text-base">
                      {award.title}
                    </p>
                    <p className="text-sm text-gray-400">{award.subTitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Media & Press Coverage */}
          <div className="flex flex-col items-start md:items-center gap-6 px-6">
            <h3 className="text-lg font-semibold mb-2">
              Media & Press Coverage
            </h3>
            <div className="flex flex-col items-center gap-6">
              {mediaCoverage.map((media, idx) => (
                <div key={idx} className="flex justify-center">
                  <img
                    src={media.logo.url}
                    alt="Media logo"
                    className="max-h-10 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Industry Partnerships */}
          <div className="flex flex-col items-start md:items-center gap-6 px-6">
            <h3 className="text-lg font-semibold mb-2">
              Industry Partnerships
            </h3>
            <div className="flex flex-col items-center gap-6">
              {industryPartners.map((partner, idx) => (
                <div key={idx} className="flex justify-center">
                  <img
                    src={partner.logo.url}
                    alt={partner.name}
                    className="max-h-10 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessIndustryRecognitionSection;
