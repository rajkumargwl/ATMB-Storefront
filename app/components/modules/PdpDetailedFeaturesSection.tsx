import React from "react";

type Icon = {
  url: string;
  alt?: string | null;
};

type TopFeature = {
  title: string;
  description: string;
  icon: Icon;
};

type StorageItem = {
  title: string;
  description: string;
};

type PhysicalStorage = {
  title: string;
  storageItems: StorageItem[];
};

type Props = {
  title: string;
  topFeatures: TopFeature[];
  physicalStorage: PhysicalStorage;
};

const PdpDetailedFeaturesSection: React.FC<Props> = ({
  title,
  topFeatures,
  physicalStorage,
}) => {
  return (
    <section className="w-full bg-white py-10 px-5 md:px-12 rounded-xl">
      {/* Section Title */}
      <h2 className="text-2xl font-semibold text-center mb-10">{title}</h2>

      {/* Top Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-10">
        {topFeatures?.map((feature, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-2xl flex flex-col items-center justify-center p-5 text-center shadow-sm hover:shadow-md transition-all bg-white"
          >
            <img
              src={feature.icon?.url}
              alt={feature.icon?.alt || feature.title}
              className="w-8 h-8 mb-3 object-contain"
            />
            <h3 className="font-medium text-gray-800">{feature.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Physical Storage Section */}
      <div className="border border-gray-200 rounded-xl shadow-sm bg-white">
        <div className="flex items-center gap-2 px-6 py-3 border-b border-gray-200 bg-gray-50 rounded-t-xl">
          <img
            src="https://cdn.sanity.io/images/m5xb8z9y/production/b9f041f621501cd44bcdfba6359e4e23036d3fd6-32x32.svg"
            alt="storage icon"
            className="w-5 h-5"
          />
          <h3 className="font-semibold text-gray-800 text-sm">
            {physicalStorage.title}
          </h3>
        </div>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-6 py-5 gap-y-6 gap-x-6">
          {physicalStorage?.storageItems?.map((item, index) => (
            <div key={index} className="border-b border-gray-100 pb-3">
              <h4 className="font-medium text-gray-800 text-sm">
                {item.title}
              </h4>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PdpDetailedFeaturesSection;
