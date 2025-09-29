import React from 'react';

const HowItWorks = ({ data }) => {
  if (!data) {
    return <div className="text-center p-8">Loading how it works data...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Header Section */}
      <div className="text-center mb-16">
        {data.badge && (
          <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-1 rounded-full mb-4">
            {data.badge}
          </span>
        )}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          {data.heading}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {data.subheading}
        </p>
      </div>

      {/* Steps Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Connecting line for desktop */}
        <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-blue-200 -translate-y-1/2 z-0"></div>
        
        {data.steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center relative z-10">
            
            
            {/* Step Icon */}
            {step.icon && step.icon.asset && (
              <div className="mb-4">
                <img 
                  src={step.icon.asset.url} 
                  alt={step.title} 
                  className="w-16 h-16 object-contain mx-auto"
                  title={step.tooltipTitle} // Browser tooltip
                />
              </div>
            )}
            
            {/* Step Content */}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;