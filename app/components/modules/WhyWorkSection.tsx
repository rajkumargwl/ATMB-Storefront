type WhyWorkSectionProps = {
  title: string;
  subtitle?: string;
  features: {
    icon?: { url?: string };
    title: string;
    description: string;
  }[];
};
import whyChooseBg from "~/components/media/why-choose-bg.png";

export default function WhyWorkSection({
  title,
  subtitle,
  features,
}: WhyWorkSectionProps) {
  return (
    <section className="relative overflow-hidden bg-PrimaryBlack text-white py-[40px] md:py-[60px] lg:py-[100px] px-5 bg-no-repeat bg-bottom-left">
      <div className="absolute z-1 bottom-[-250px] left-0">
        <img
          src={whyChooseBg}
          alt="Background"
          className="w-[530px] h-[782px]"
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-1">
        {/* Left side */}
        <div className="max-w-[361px]">
          <h2 className="text-[36px] leading-[43.2px] tracking-[-0.54px] font-Roboto font-semibold mb-4">{title}</h2>
          {subtitle && <p className="font-Roboto text-[18px] text-[#DCDCDC] leading-[27px]">{subtitle}</p>}
        </div>

        {/* Right side */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 gap-y-15 mt-10 md:mt-0">
          {features?.map((item, idx) => (
            <div key={idx} className="flex flex-col">
              {item.icon?.url && (
                <img
                  src={item.icon.url}
                  alt={item.title}
                  className="mb-6 w-10 h-10 object-contain"
                />
              )}
              <h3 className="text-[18px] font-[500] leading-[27px] mb-2">{item.title}</h3>
              <p className="text-[14px] text-[#DCDCDC] font-[400] leading-[21px] mb-2">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
