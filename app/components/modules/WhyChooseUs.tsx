import React from 'react';

const WhyChooseUs = ({ data }) => {
  if (!data) {
    return <div className="text-center p-8">Loading why choose us data...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Text Content */}
        <div className="md:w-1/2">
          {data.badge && (
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-1 rounded-full mb-4">
              {data.badge}
            </span>
          )}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            {data.heading}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            We combine flexibility, security, and convenience to give you more than just a mailbox.
          </p>

          {/* Features List */}
          <div className="space-y-6">
            {data.features.map((feature, index) => (
              <div key={index} className="flex items-start">
                {feature.icon && feature.icon.asset && (
                  <div className="flex-shrink-0 mr-4">
                    <img 
                      src={feature.icon.asset.url} 
                      alt={feature.title} 
                      className="w-12 h-12 object-contain"
                      title={feature.tooltipTitle} // Browser tooltip
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="md:w-1/2">
          {data.image && data.image.asset && (
            <img 
              src={data.image.asset.url} 
              alt="Why choose us" 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;