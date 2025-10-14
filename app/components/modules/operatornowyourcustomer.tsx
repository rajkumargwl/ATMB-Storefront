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
    <section className="px-5 py-[40px] md:py-[60px] lg:py-[100px] bg-PrimaryBlack">
      <div className="max-w-[1240px] mx-auto ">
        <div className="flex flex-col items-center justify-center gap-5 md:gap-5 mb-[44px] md:mb-[64px]">
        {heading && (
          <h2 className="max-w-[680px] mx-auto text-center font-Roboto text-white font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]">
            {heading}
          </h2>
        )}
        
        {description && (
          <p className="text-center font-Roboto text-white font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px]">
            {description}
          </p>
        )}
      </div>
        
        {features && features.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-10">
            {features.map((feature, index) => (
              <div
                key={feature._key}
                className="relative flex flex-col items-center text-center"
              >
                <div className= "w-[60px] md:w-[80px] h-[60px] md:h-[80px] rounded-full bg-DarkOrange flex items-center justify-center mb-5 md:mb-8">
                  {feature.icon?.upload?.asset?.url ? (
                    <img
                      src={feature.icon.upload.asset.url}
                      alt={feature.title || 'Feature icon'}
                      className="w-6 md:w-8 h-6 md:h-8"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-blue-600">
                      {index + 1}
                    </span>
                  )}
                </div>
                
                {feature.title && (
                  <h3 className="font-Roboto text-white font-semibold leading-[27px] md:leading-[28px] text-[18px] md:text-[20px] tracking-[-0.3px] md:tracking-[-0.3px]">
                    {feature.title}
                  </h3>
                )}
                
                {feature.description && (
                  <p className="max-w-[280px] mx-auto md:max-w-full mt-3 md:mt-4 text-center font-Roboto text-white font-normal leading-[21px] md:leading-[24px] text-[14px] md:text-[16px] tracking-[0px]">
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