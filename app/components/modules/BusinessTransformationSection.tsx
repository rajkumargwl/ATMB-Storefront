type BusinessTransformationSectionProps = {
  title: string;
  subtitle?: string;
  cards: {
    icon?: { url?: string };
    heading: string; // ✅ changed from title to heading
    description: string;
  }[];
};


export default function BusinessTransformationSection({
  title,
  subtitle,
  cards,
}: BusinessTransformationSectionProps) {
  return (
    <section className="px-5 py-[40px] md:py-[60px] lg:py-[100px] bg-[#0A0F1A]">
      <div className="max-w-[1240px] mx-auto">
        {/* Heading */}
        <div className="max-w-[880px] mx-auto pb-[44px] md:pb-[56px] flex flex-col align-center justify-center gap-5 md:gap-5 text-center">
          <h2 className="font-Roboto text-white font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]">
            {title}
          </h2>
          {subtitle && (
            <p className="font-Roboto text-white font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px] opacity-90">
              {subtitle}
            </p>
          )}
        </div>

        {/* Cards Grid */}
        <div className="max-w-[1192px] mx-auto grid md:grid-cols-3 gap-x-8 gap-y-6">
          {cards?.map((card, idx) => (
            <div
              key={idx}
              className="flex flex-col p-8 bg-white rounded-[20px] transition shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
            >
              {/* Icon */}
            {card.icon?.url && (
  <div className="mb-6 flex justify-center bg-DarkOrange">
    <img
      src={card.icon.url}
      alt="icon"
      className="w-8 h-8 object-contain"
    />
  </div>
)}


              {/* Title */}
              <h3 className="font-Roboto text-[#FF6B35] font-semibold text-[20px] md:text-[22px] leading-[28px] md:leading-[32px] tracking-[0px] mb-3">
                {card.heading}
              </h3>

              {/* Description */}
              <p className="font-Roboto text-[#091019] font-normal text-[16px] leading-[24px] tracking-[0px] opacity-80">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}