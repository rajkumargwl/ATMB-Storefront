import React from 'react';

type FeatureCategory = {
  categoryTitle: string;
  icon: string;
  points: string[];
};

type FeaturesModuleProps = {
  title?: string;
  subtitle?: string;
  featureCategories?: FeatureCategory[];
};

export default function AnytimeFeaturesModule({
  title,
  subtitle,
  featureCategories = [],
}: FeaturesModuleProps) {
  return (
    <section className="w-full bg-white py-12 md:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          {title && (
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-2 text-gray-600 text-sm md:text-base">
              {subtitle}
            </p>
          )}
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCategories.map((category, index) => (
            <div
              key={index}
              className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0 bg-orange-100 p-3 rounded-full">
                  <img
                    src={category.icon}
                    alt={category.categoryTitle}
                    className="w-5 h-5"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {category.categoryTitle}
                </h3>
              </div>

              {/* Points */}
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                {category.points.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
