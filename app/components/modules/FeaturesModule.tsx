import React from "react";

interface Feature {
  title: string;
  description: string;
  icon?: {
    asset?: {
      url: string;
    };
  };
  tooltipTitle?: string; // ADD THIS
}

interface FeaturesModuleProps {
  label?: string;
  title: string;
  features: Feature[];
}

const FeaturesModule: React.FC<FeaturesModuleProps> = ({ label, title, features }) => {
  return (
    <section className="w-full py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Label */}
        {label && (
          <p className="inline-block text-sm font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-full mb-4">
            {label}
          </p>
        )}

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-10">
          {title}
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
  <div
    key={feature.title}
    className={`p-6 rounded-xl border transition ${
      index === 1
        ? "bg-black text-white"  // ✅ highlight second card
        : "bg-white text-black hover:shadow-lg"
    }`}
  >
    <img src={feature.icon.asset.url} alt={feature.title} className="w-8 h-8 mb-3"  title={feature.tooltipTitle}/>
    <h3 className="font-semibold">{feature.title}</h3>
    <p className="text-sm">{feature.description}</p>
  </div>
))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesModule;
