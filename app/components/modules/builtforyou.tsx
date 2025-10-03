import { useState } from 'react';

interface BuiltForYouProps {
  data: {
    _type: 'builtForHowYouWorkToday';
    title?: string;
    subtitle?: string;
    heading?: string;
    tabs?: Array<{
      icon?: {
        url: string;
      };
      tooltip?: string;
      label?: string;
      avatars?: Array<{
        url: string;
      }>;
      sideText?: string;
      detailsHeading?: string;
      features?: Array<{
        icon?: {
          url: string;
        };
        tooltip?: string;
        description?: string;
      }>;
    }>;
  };
}

export function BuiltForYou({ data }: BuiltForYouProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {data.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                {data.heading}
              </h3>
              <div className="space-y-1">
                {data.tabs?.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`w-full text-left p-4 rounded-lg transition-colors ${
                      activeTab === index
                        ? 'bg-gray-900 text-black'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {tab.icon?.url && (
                        <img
                          src={tab.icon.url}
                          alt={tab.label || `Tab ${index + 1}`}
                          className={`h-6 w-6 ${activeTab === index ? 'filter ' : ''}`}
                          width={24}
                          height={24}
                        />
                      )}
                      <span className="font-medium">
                        {tab.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {data.tabs?.[activeTab] && (
              <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-100">
                
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {data.tabs[activeTab].avatars && (
                        <div className="flex -space-x-2">
                            {data.tabs[activeTab].avatars.map((avatar, index) => (
                                <img
                                    key={index}
                                    src={avatar.url}
                                    alt={`Avatar ${index + 1}`}
                                    className="h-8 w-8 rounded-full border-2 border-white ring-2 ring-gray-200"
                                    width={32}
                                    height={32}
                                />
                            ))}
                        </div>
                    )}
                    {data.tabs[activeTab].sideText && (
                        <p className="text-sm text-gray-700 max-w-sm">
                            {data.tabs[activeTab].sideText}
                        </p>
                    )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {data.tabs[activeTab].detailsHeading}
                </h3>

                <div className="space-y-4">
                  {data.tabs[activeTab].features?.map((feature, index) => (
                    <div 
                      key={index} 
                      className="flex items-start p-4 border border-gray-100 rounded-lg bg-gray-50"
                    >
                      {feature.icon?.url && (
                        <img
                          src={feature.icon.url}
                          alt={feature.tooltip || `Feature ${index + 1}`}
                          className="h-6 w-6 mt-0.5 flex-shrink-0 text-blue-600"
                          width={24}
                          height={24}
                        />
                      )}
                      <p className="ml-4 text-gray-700 font-medium">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}