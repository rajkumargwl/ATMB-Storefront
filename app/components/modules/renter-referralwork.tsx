interface RenterReferralWorkProps {
  data: any;
}

export function RenterReferralWork({ data }: RenterReferralWorkProps) {
  const { heading, description, features } = data;

  // Debug log to see actual feature structure
  console.log('Work section data:', data);
  console.log('Features:', features);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          {heading && (
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {heading}
            </h2>
          )}
          {description && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {features && features.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature: any, index: number) => {
              console.log('Feature:', feature); // Debug each feature
              return (
                <div
                  key={feature._key || index}
                  className="bg-black p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center"
                >
                  <div className="mb-4 flex justify-center">
                    {/* Try multiple icon sources */}
                    {feature.icon?.upload?.asset?.url ? (
                      <img
                        src={feature.icon.upload.asset.url}
                        alt={feature.title || 'Feature icon'}
                        className="h-12 w-12"
                      />
                    ) : feature.icon?.svgCode ? (
                      <div 
                        className="h-12 w-12 text-primary"
                        dangerouslySetInnerHTML={{ __html: feature.icon.svgCode }}
                      />
                    ) : feature.icon?.asset?.url ? (
                      <img
                        src={feature.icon.asset.url}
                        alt={feature.title || 'Feature icon'}
                        className="h-12 w-12"
                      />
                    ) : (
                      <div className="h-12 w-12 bg-primary rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {index + 1}
                        </span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title || `Step ${index + 1}`}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description || 'No description available'}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}