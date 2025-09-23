type AboutCompanySectionProps = {
  title: string;
  subtitle?: string;
  items: {
    icon?: { url?: string };
    description: string;
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
        <div className="grid md:grid-cols-3 gap-12">
          {items?.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-start text-left"
            >
              {item.icon?.url && (
                <img
                  src={item.icon.url}
                  alt="icon"
                  className="mb-6 w-10 h-10 object-contain"
                />
              )}
              <p className="text-[16px] text[#091019] leading-[24px] font-[500]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
