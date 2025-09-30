type CoreValuesSectionProps = {
  title: string;
  subtitle?: string;
  values: {
    icon?: { url?: string };
    title: string;
    description: string;
  }[];
};
 
export default function CoreValuesSection({
  title,
  subtitle,
  values,
}: CoreValuesSectionProps) {
  return (
    <section className="px-5 py-[40px] md:py-[60px] lg:py-[100px] bg-[#F6F6F6]">
      <div className="max-w-[1240px] mx-auto">
        {/* Heading */}
        <div className="max-w-[880px] mx-auto pb-[44px] md:pb-[56px] flex flex-col align-center justify-center gap-5 md:gap-5">
          <h2 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px] text-center">{title}</h2>
          {subtitle && (
            <p className="font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px] text-center">{subtitle}</p>
          )}
        </div>
 
        {/* Values Grid */}
        <div className="max-w-[1192px] mx-auto grid md:grid-cols-2 gap-x-8 gap-y-4 md:gap-y-6">
          {values?.map((value, idx) => (
            <div
              key={idx}
              className="flex flex-col p-6 bg-white border border-[#DCDCDC] rounded-[20px] transition"
            >
              {/* Icon + Title */}
              <div className="items-center mb-2">
                {value.icon?.url && (
                  <div className="flex items-center justify-center w-11 h-11 rounded-full bg-DarkOrange">
                    <img
                      src={value.icon.url}
                      alt="icon"
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                )}
                <h3 className="mt-6 font-Roboto text-PrimaryBlack font-medium text-[20px] md:text-[24px] leading-[28px] md:leading-[33.6px] tracking-[0px]">{value.title}</h3>
              </div>
 
              {/* Description */}
              <p className="font-Roboto text-LightGray font-normal text-[14px] leading-[21px] tracking-[0px]">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}