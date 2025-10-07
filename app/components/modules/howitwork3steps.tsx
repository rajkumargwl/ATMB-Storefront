import { Link } from '@remix-run/react';

interface HowItWork3StepsProps {
  data: {
    _type: 'howitworks3steps';
    heading?: string;
    description?: string;
    features?: Array<{
      icon?: {
        upload?: {
          url: string;
        };
        svgCode?: string;
      };
      tooltip?: string;
      title?: string;
      description?: string;
    }>;
    buttonPrimary?: {
      label?: string;
      url?: string;
    };
    buttonSecondary?: {
      label?: string;
      url?: string;
    };
  };
}

export function HowItWork3Steps({ data }: HowItWork3StepsProps) {
  return (
    <section className="bg-orange-500 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {data.heading }
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {data.description }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 relative">
          {data.features?.map((feature, index) => (
            <div key={index} className="text-center relative">
              
              {/* Step Icon and Arrow Container */}
              <div className="relative mb-6">
                {/* Arrow Connector for Steps 1 and 2 */}
                {index < (data.features?.length || 0) - 1 && (
                  <div className="hidden lg:block absolute left-[calc(50%+40px)] top-1/2 w-[calc(100%-80px)] border-t-2 border-dashed border-white/50 transform -translate-y-1/2">
                    <svg className="absolute top-1/2 -right-2 h-4 w-4 transform -translate-y-1/2 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </div>
                )}

                {/* Icon Circle */}
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200 shadow-md">
                  {feature.icon?.upload?.url ? (
                    <img
                      src={feature.icon.upload.url}
                      alt={feature.title || `Step ${index + 1}`}
                      className="h-10 w-10 text-orange-600"
                      width={40}
                      height={40}
                    />
                  ) : feature.icon?.svgCode ? (
                    <div 
                      dangerouslySetInnerHTML={{ __html: feature.icon.svgCode }}
                      className="h-10 w-10 [&>svg]:w-full [&>svg]:h-full [&>svg]:text-orange-600"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-orange-600">
                      {index + 1}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Title and Description */}
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-white/80 max-w-xs mx-auto">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center space-x-4">
          {data.buttonPrimary && (
            <Link
              to={data.buttonPrimary.url || '#'}
              className="inline-block bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors shadow-lg"
            >
              {data.buttonPrimary.label }
            </Link>
          )}
          {data.buttonSecondary && (
            <Link
              to={data.buttonSecondary.url || '#'}
              className="inline-block bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg border border-transparent"
            >
              {data.buttonSecondary.label }
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}