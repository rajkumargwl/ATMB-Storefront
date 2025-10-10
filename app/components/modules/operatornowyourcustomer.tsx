interface OperatorNowYourCustomerProps {
  module: {
    heading?: string;
    description?: string;
    features?: Array<{
      _key: string;
      title?: string;
      description?: string;
      tooltip?: string;
      icon?: {
        upload?: any;
        svgCode?: string;
      };
    }>;
  };
}

export function OperatorNowYourCustomer({module}: OperatorNowYourCustomerProps) {
  const {heading, description, features} = module;

  console.log('🎯 OperatorNowYourCustomer COMPONENT CALLED!');
  console.log('📝 Module data:', module);

  return (
    <section className="bg-white py-16 px-4">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature._key}
                className="text-center p-6 rounded-xl hover:shadow-lg transition duration-300"
              >
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  {feature.icon?.upload?.asset?.url ? (
                    <img
                      src={feature.icon.upload.asset.url}
                      alt={feature.title || 'Feature icon'}
                      className="w-10 h-10"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-blue-600">
                      {index + 1}
                    </span>
                  )}
                </div>
                
                {feature.title && (
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
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