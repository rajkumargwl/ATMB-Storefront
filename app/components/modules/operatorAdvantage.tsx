
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
    <section className="bg-white  py-[40px] md:py-[60px] lg:py-[100px] px-5 ">
      <div className="mx-auto max-w-[1240px]">
        {heading && (
          <h2 className="mb-[44px] md:mb-[56px] text-center font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]">
            {heading}
          </h2>
        )}
        
        {description && (
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            {description}
          </p>
        )}
        
        {features && features.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature._key}
                className="bg-white rounded-[20px] p-6 border border-LightWhite md:min-h-[242px]"
              >
                <div className="mb-[21px] md:mb-6 w-[44px] md:w-[44px] h-[44px] md:h-[44px] rounded-full bg-DarkOrange flex items-center justify-center">
                  {feature.icon?.upload?.asset?.url && (
                    <img
                      src={feature.icon.upload.asset.url}
                      alt={feature.title || 'Feature icon'}
                      className="w-6 h-6"
                    />
                  )}
                </div>
                
                {feature.title && (
                  <h3 className="mb-2 font-Roboto text-PrimaryBlack font-medium leading-[33.6px] md:leading-[33.6px] text-[24px] md:text-[24px] tracking-[0px]">
                    {feature.title}
                  </h3>
                )}
                
                {feature.description && (
                  <p className="font-Roboto text-LightGray font-normal text-[14px] leading-[21px] tracking-[0px]">
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
 