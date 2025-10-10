interface OperatorWhyJoinProps {
  module: {
    heading?: string;
    features?: Array<{
      _key: string;
      text: string;
    }>;
  };
}

export function OperatorWhyJoin({module}: OperatorWhyJoinProps) {
  const {heading, features} = module;

  return (
    <section className="bg-black py-[40px] px-5">
      <div className="max-w-[1249px] mx-auto">
        
        {heading && (
          <h2 className="text-3xl font-bold text-white mb-8 md:mb-12">
            {heading}
          </h2>
        )}
        
        {features && features.length > 0 && (
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            {features.map((feature) => (
              <div
                key={feature._key}
                className="flex items-center"
              >
                <span className="text-white text-xl font-bold mr-2">✓</span>
                
                <p className="text-white text-[16px] md:text-[18px] font-normal whitespace-nowrap">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}