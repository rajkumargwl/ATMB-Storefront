interface OperatorYourBusinessProps {
  module: {
    headline?: string;
    subheadline?: string;
    phoneImage?: any;
    features?: Array<{
      _key: string;
      title?: string;
      description?: string;
      highlight?: boolean;
      icon?: {
        iconFile?: any;
        iconCode?: string;
        tooltipTitle?: string;
      };
    }>;
  };
}

export function OperatorYourBusiness({module}: OperatorYourBusinessProps) {
  const {headline, subheadline, phoneImage, features} = module;

  console.log('🎯 OperatorYourBusiness COMPONENT CALLED!');
  console.log('📝 Module data:', module);

  return (
    <section className="bg-white py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Content */}
          <div className="lg:w-1/2">
            {headline && (
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                {headline}
              </h2>
            )}
            
            {subheadline && (
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {subheadline}
              </p>
            )}
            
            {features && features.length > 0 && (
              <div className="space-y-6">
                {features.map((feature) => (
                  <div
                    key={feature._key}
                    className={`flex items-start gap-4 p-4 rounded-lg ${
                      feature.highlight ? 'bg-orange-50 border-l-4 border-orange-500' : ''
                    }`}
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      {feature.icon?.iconFile?.asset?.url && (
                        <img
                          src={feature.icon.iconFile.asset.url}
                          alt={feature.title || 'Feature icon'}
                          className="w-6 h-6"
                        />
                      )}
                    </div>
                    <div>
                      {feature.title && (
                        <h3 className={`font-semibold ${
                          feature.highlight ? 'text-orange-700' : 'text-gray-900'
                        }`}>
                          {feature.title}
                        </h3>
                      )}
                      {feature.description && (
                        <p className="text-gray-600 mt-1">{feature.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Phone Image */}
          {phoneImage?.asset?.url && (
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative">
                <img
                  src={phoneImage.asset.url}
                  alt="Mobile App"
                  className="max-w-sm"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}