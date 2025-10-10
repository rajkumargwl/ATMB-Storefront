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
    <section className="px-5 py-[40px] md:py-[60px] lg:py-[100px] bg-PrimaryBlack">
      <div className="max-w-[1240px] mx-auto">
        {/* Heading */}
        <div className="max-w-[880px] mx-auto pb-[44px] md:pb-[56px] flex flex-col align-center justify-center gap-5 md:gap-5 text-center">
          <h2 className="max-w-[299px] md:max-w-full mx-auto font-Roboto text-white font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]">
            {title}
          </h2>
          {subtitle && (
            <p className="font-Roboto text-white font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px] opacity-90">
              {subtitle}
            </p>
          )}
        </div>
 
        {/* Cards Grid */}
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-6">
          {cards?.map((card, idx) => (
            <div
              key={idx}
              className="flex flex-col p-5 md:p-6 bg-white rounded-[20px] border border-LightWhite"
            >
              {/* Icon */}
            {card.icon?.url && (
          <div className="mb-6 w-11 h-11 bg-DarkOrange rounded-full flex items-center justify-center">
            <img
              src={card.icon.url}
              alt="icon"
              className="w-6 h-6 object-contain"
            />
          </div>
        )}
 
 
              {/* Title */}
               <h3 className="font-Roboto text-PrimaryBlack font-medium leading-[28px] md:leading-[33.6px] text-[20px] md:text-[24px] tracking-[0px] mb-4 md:mb-2">
                {card.heading}
              </h3>
 
              {/* Description */}
             <p className="font-Roboto text-LightGray font-normal text-[14px] leading-[21px] tracking-[0px]">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}