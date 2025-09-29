type AboutCompanySectionProps = {
  title: string;
  subtitle?: string;
  items: {
    icon?: { url?: string };
    description: string;
    tooltipTitle?: string; // ADD THIS
  }[];
};

export default function AboutCompanySection({
  title,
  subtitle,
  items,
}: AboutCompanySectionProps) {
  return (
    <section className="bg-white text-gray-900 py-25">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Heading */}
        <div className="max-w-3xl mb-16">
          <h2 className="mb-6 font-Roboto text-PrimaryBlack font-bold text-[36px] leading-[43.2px] tracking-[-0.54px]  sm:text-[32px] sm:leading-[42px] sm:tracking-[-0.48px]  max-w-[523px]">{title}</h2>
          {subtitle && (
            <p className="text-[18px] text-[#091019] font-[400] leading-[27px]">{subtitle}</p>
          )}
        </div>

        {/* Items */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-12">
          {items?.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-row md:flex-col items-start text-left gap-[22px] md:gap-0 relative after:content-[''] after:absolute after:top-[44px] after:left-[16px] after:w-[1px] after:h-[calc(100%-44px)] after:bg-LightWhite md:after:content-none last:after:content-none 
               before:content-none md:before:content-[''] before:absolute before:top-[22px] before:left-[60px] before:w-[calc(100%-28px)] before:h-[1px] before:bg-LightWhite  last:before:content-none"
            >
             
              {item.icon?.url && (
                 <div className="md:mb-6 flex flex-col md:flex-row items-center gap-5 min-w-[32px] w-[32px] min-h-[32px] md:w-full">
                  <img
                    src={item.icon.url}
                    alt="icon"
                    className="w-8 md:w-10 h-8 md:h-10 object-contain"
                    title={item.tooltipTitle} 
                  />
                  <span className="hidden w-[1px] md:w-full h-full md:h-[1px] bg-LightWhite flex"></span>
                 </div>
              )}
              <p className="text-[16px] text[#091019] leading-[24px] font-[500]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}