interface OperatorAdvantageProps {
  module: {
    heading?: string;
    description?: string;
    features?: Array<{
      _key: string;
      title?: string;
      description?: string;
      icon?: {
        upload?: any;
        svgCode?: string;
        tooltipTitle?: string;
      };
    }>;
  };
}

export function OperatorAdvantage({module}: OperatorAdvantageProps) {
  const {heading, description, features} = module;

  console.log('🎯 OperatorAdvantage COMPONENT CALLED!');
  console.log('📝 Module data:', module);

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {heading && (
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-4">
            {heading}
          </h2>
        )}
        
        {description && (
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            {description}
          </p>
        )}
        
        {features && features.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature._key}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon?.upload?.asset?.url && (
                    <img
                      src={feature.icon.upload.asset.url}
                      alt={feature.title || 'Feature icon'}
                      className="w-6 h-6"
                    />
                  )}
                </div>
                
                {feature.title && (
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                )}
                
                {feature.description && (
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}