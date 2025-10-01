import React from "react";

interface Feature {
  featureTitle: string;
  featureDescription: string;
  icon: { url: string };
}

interface SolutionMailboxFeaturesProps {
  data: {
    title: string;
    subtitle: string;
    features: Feature[];
    rightImage: { url: string };
    bottomHeading: string;
  };
}

const SolutionMailboxFeatures: React.FC<SolutionMailboxFeaturesProps> = ({ data }) => {
  return (
    <section className="w-full bg-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {data.title}
          </h2>
          <p className="text-gray-600 mb-8">{data.subtitle}</p>

          <div className="space-y-6">
            {data.features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <img
                  src={feature.icon.url}
                  alt={feature.featureTitle}
                  className="w-8 h-8 flex-shrink-0"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {feature.featureTitle}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.featureDescription}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Heading */}
          <p className="text-xs text-gray-500 mt-10">{data.bottomHeading}</p>
        </div>

        {/* Right Image */}
        <div className="flex justify-center lg:justify-end">
          <img
            src={data.rightImage.url}
            alt="Mailbox feature illustration"
            className="max-w-sm lg:max-w-md"
          />
        </div>
      </div>
    </section>
  );
};

export default SolutionMailboxFeatures;
