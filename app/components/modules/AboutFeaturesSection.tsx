type Feature = {
  _key?: string;
  title: string;
  subtitle: string;
  icon?: {
    url?: string;
  };
  tooltipTitle?: string; // ADD THIS
};
 
type Props = {
  backgroundColor?: string;
  features: Feature[];
};
 
export default function AboutFeaturesSection({ backgroundColor, features }: Props) {
  if (!features || features.length === 0) return null;
 
  return (
    <section
      className="w-full py-16px-5 py-[40px] md:py-[60px] lg:py-[100px] bg-DarkOrange"
      style={{ backgroundColor: backgroundColor || "#fff" }}
    >
      <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center items-start">
        {features.map((feature, idx) => (
          <div
            key={feature._key || idx}
            className="flex flex-col items-center self-start"
          >
            {feature.icon?.url && (
             <span className="bg-white rounded-full p-[18px] md:p-6"> 
             <img
                src={feature.icon.url}
                alt={feature.title}
                className=" w-6 md:w-8 h-6 md:h-8 object-cover"
              title={feature.tooltipTitle}
              />
              </span>
            )}
            <h3 className="text-center mt-5 md:mt-8 font-Roboto text-white font-semibold leading-[28px] md:leading-[31.2px] text-[20px] md:text-[24px] tracking-[-0.3px] md:tracking-[-0.36px]">
              {feature.title}
            </h3>
            <p className="text-center mt-2 md:mt-3 font-Roboto text-white font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px]">{feature.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
 