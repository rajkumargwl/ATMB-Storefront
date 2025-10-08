import React from "react";

interface Icon {
  url: string;
}

interface Feature {
  title: string;
  description: string;
  icon: Icon;
}

interface SideImage {
  url: string;
}

interface BusinessGrowthToolkitProps {
  title: string;
  subtitle: string;
  sideImage: SideImage;
  features: Feature[];
}

const BusinessGrowth: React.FC<{ data: BusinessGrowthToolkitProps }> = ({ data }) => {
  const { title, subtitle, sideImage, features } = data;

  return (
    <section className="bg-white py-20 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        {/* Left Section */}
        <div className="flex-1 space-y-6">
          {/* Heading */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            <p className="text-gray-600 text-base max-w-2xl mx-auto lg:mx-0">
              {subtitle}
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <img
                    src={feature.icon.url}
                    alt={feature.title}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section (Image) */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <img
            src={sideImage.url}
            alt="Business Growth Toolkit"
            className="rounded-xl shadow-lg max-w-[480px] h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default BusinessGrowth;
