import { Link } from '@remix-run/react';

interface HowItWorks2Props {
  data: {
    _type: 'howitworks2';
    sectionTitle?: string;
    sectionSubtitle?: string;
    features?: Array<{
      steps?: string;
      title?: string;
      description?: string;
      icon?: {
        url: string;
      };
    }>;
    button?: {
      text?: string;
      url?: string;
    };
  };
}

export function HowItWorks2({ data }: HowItWorks2Props) {
  return (
    <section className="bg-gray-900 py-20 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 w-96 h-96 -translate-x-1/2 bg-orange-800 opacity-10 blur-3xl rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
            {data.sectionTitle}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {data.sectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {data.features?.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white text-left p-8 rounded-xl shadow-2xl transition-all duration-300"
            >
              {feature.steps && (
                <div className="text-sm font-semibold text-orange-600 mb-4">
                  {feature.steps}
                </div>
              )}
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
              
              {feature.icon?.url && (
                <div className="mt-6 border border-gray-200 rounded-lg overflow-hidden p-4">
                  <img
                    src={feature.icon.url}
                    alt={feature.title || `Feature ${index + 1}`}
                    className="w-full h-auto object-cover rounded"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {data.button && (
          <div className="text-center">
            <Link
              to={data.button.url || '#'}
              className="inline-block bg-orange-600 text-white px-10 py-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors shadow-lg hover:shadow-xl text-lg"
            >
              {data.button.text}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}