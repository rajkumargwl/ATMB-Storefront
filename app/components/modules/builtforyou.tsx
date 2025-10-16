import { useState } from 'react';
import { PortableText } from '@portabletext/react';
 
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
      sideText?: any;
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
 
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!data.tabs) return;
 
    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        const nextIndex = (index + 1) % data.tabs.length;
        setActiveTab(nextIndex);
        break;
      
      case 'ArrowLeft':
        event.preventDefault();
        const prevIndex = (index - 1 + data.tabs.length) % data.tabs.length;
        setActiveTab(prevIndex);
        break;
      
      case 'Home':
        event.preventDefault();
        setActiveTab(0);
        break;
      
      case 'End':
        event.preventDefault();
        const lastIndex = data.tabs.length - 1;
        setActiveTab(lastIndex);
        break;
      
      default:
        break;
    }
  };
 
  return (
    <section className="bg-white px-5 py-[40px] md:py-[60px] lg:py-[100px]">
      <div className="max-w-[1214px] mx-auto">
        <div className="flex flex-col md:items-center justify-center gap-4 md:gap-4 mb-[44px] md:mb-[56px]">
          <h2 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]">
            {data.title}
          </h2>
          <p className="max-w-[800px] mx-auto md:text-center font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[27px] text-[14px] md:text-[18px] tracking-[0px]">
            {data.subtitle}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h3 className="pb-4 md:pb-8 md:text-center font-Roboto text-PrimaryBlack font-medium leading-[27px] md:leading-[28px] text-[18px] md:text-[20px] tracking-[0px]">
            {data.heading}
          </h3>
        </div>
 
        <div className="mb-[-16px] md:mb-[0px]">
          <div className="flex flex-col md:flex-row items-start gap-[44px] lg:gap-[100px]">
            
            {/* Left Column for Tabs */}
            <div className='w-full md:w-[37.8%] flex flex-col'>
              <div
                role="tablist"
                aria-label="Work features"
                className="flex flex-col"
              >
                {data.tabs?.map((tab, index) => (
                  <div key={index}>
                    <button
                      role="tab"
                      aria-selected={activeTab === index}
                      aria-controls={`tabpanel-${index}`}
                      id={`tab-${index}`}
                      tabIndex={0}
                      onClick={() => setActiveTab(index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className={`w-full text-left px-[16px] py-[18px] md:p-[18px] ${
                        activeTab === index
                          ? 'bg-PrimaryBlack rounded-[8px]'
                          : 'bg-white mb-4 md:mb-[0px] border md:border-b border-LightWhite rounded-[8px] md:rounded-[0px]'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {tab.icon?.url && (
                          <img
                            src={tab.icon.url}
                            alt={tab.label || `Tab ${index + 1}`}
                            className={`h-6 md:h-8 w-6 md:w-8 ${activeTab === index ? 'invert' : ''}`}
                            title={tab.tooltip || ''}
                          />
                        )}
                        <span className={`font-Roboto font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]
                          ${activeTab === index ? 'text-white' : 'text-PrimaryBlack'}`}>
                          {tab.label}
                        </span>
                      </div>
                    </button>
                    
                    {/* Mobile content */}
                    {activeTab === index && (
                      <div
                        role="tabpanel"
                        id={`tabpanel-${activeTab}`}
                        aria-labelledby={`tab-${activeTab}`}
                        className="w-full flex flex-col mt-4 mb-8 md:hidden"
                      >
                        {data.tabs?.[activeTab].avatars && (
                          <div className="mb-6 flex flex-col md:flex-row gap-4">
                            <div className="flex -space-x-[10px] min-w-[100px]">
                              {data.tabs[activeTab].avatars.map((avatar, avatarIndex) => (
                                <img
                                  key={avatarIndex}
                                  src={avatar.url}
                                  alt={`Avatar ${avatarIndex + 1}`}
                                  className="h-10 w-10 rounded-full"
                                />
                              ))}
                            </div>
                            {data.tabs[activeTab].sideText && (
                              <div className="max-w-[577px] font-Roboto font-normal leading-[21px] md:leading-[24px] text-[14px] md:text-[16px] tracking-[0px] text-PrimaryBlack">
                                <PortableText value={data.tabs[activeTab].sideText} />
                              </div>
                            )}
                          </div>
                        )}
                        <h3 className="pb-3 font-Roboto text-PrimaryBlack font-medium leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px]">
                          {data.tabs[activeTab].detailsHeading}
                        </h3>
                        <div className="">
                          {data.tabs[activeTab].features?.map((feature, featureIndex) => (
                            <div
                              key={featureIndex}
                              className="flex items-start p-4 md:p-5 border-b border-LightWhite bg-[#F6F6F6] gap-3 last:border-b-0 first:rounded-t-[12px] last:rounded-b-[12px]"
                            >
                              {feature.icon?.url && (
                                <img
                                  src={feature.icon.url}
                                  alt={feature.tooltip || `Feature ${featureIndex + 1}`}
                                  className="h-[28px] w-[28px]"
                                  title={feature.tooltip || ''}
                                />
                              )}
                              <p className="font-Roboto font-normal leading-[21px] md:leading-[24px] text-[14px] md:text-[16px] tracking-[0px] text-PrimaryBlack">
                                {feature.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
 
            {/* Desktop content */}
            {data.tabs?.[activeTab] && (
              <div
                role="tabpanel"
                id={`tabpanel-${activeTab}`}
                aria-labelledby={`tab-${activeTab}`}
                className="hidden md:flex w-full md:w-[62.2%] flex-col"
              >
                <div className="mb-6 flex flex-col md:flex-row gap-4">
                  {data.tabs[activeTab].avatars && (
                    <div className="flex -space-x-[10px] min-w-[100px]">
                      {data.tabs[activeTab].avatars.map((avatar, index) => (
                        <img
                          key={index}
                          src={avatar.url}
                          alt={`Avatar ${index + 1}`}
                          className="h-10 w-10 rounded-full"
                        />
                      ))}
                    </div>
                  )}
                  {data.tabs[activeTab].sideText && (
                    <div className="max-w-[577px] font-Roboto font-normal leading-[21px] md:leading-[24px] text-[14px] md:text-[16px] tracking-[0px] text-PrimaryBlack">
                      <PortableText value={data.tabs[activeTab].sideText} />
                    </div>
                  )}
                </div>
 
                <h3 className="pb-3 font-Roboto text-PrimaryBlack font-medium leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px]">
                  {data.tabs[activeTab].detailsHeading}
                </h3>
 
                <div className="">
                  {data.tabs[activeTab].features?.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start p-4 md:p-5 border-b border-LightWhite bg-[#F6F6F6] gap-3 last:border-b-0 first:rounded-t-[12px] last:rounded-b-[12px]"
                    >
                      {feature.icon?.url && (
                        <img
                          src={feature.icon.url}
                          alt={feature.tooltip || `Feature ${index + 1}`}
                          className="h-[28px] w-[28px]"
                          title={feature.tooltip || ''}
                        />
                      )}
                      <p className="font-Roboto font-normal leading-[21px] md:leading-[24px] text-[14px] md:text-[16px] tracking-[0px] text-PrimaryBlack">
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