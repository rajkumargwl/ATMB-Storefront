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
    <section className="bg-[#F6F6F6] text-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="mb-6 font-Roboto text-PrimaryBlack font-bold text-[24px] leading-[31.2px] tracking-[-0.36px]  lg:text-[36px] lg:leading-[43.2px] lg:tracking-[-0.54px] ">{title}</h2>
          {subtitle && (
            <p className="font-[400] text-[18px] leading-[27px]">{subtitle}</p>
          )}
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {values?.map((value, idx) => (
            <div
              key={idx}
              className="flex flex-col p-6 bg-white border border-[#DCDCDC] rounded-lg shadow-sm hover:shadow-md transition"
            >
              {/* Icon + Title */}
              <div className="items-center mb-4">
                {value.icon?.url && (
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 mr-3">
                    <img
                      src={value.icon.url}
                      alt="icon"
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                )}
                <h3 className="mt-6 text-[24px] font-[500] leading-[33.6px]">{value.title}</h3>
              </div>

              {/* Description */}
              <p className="text-[#4D4E4F] text-[14px] font-[400] leading-[21px]">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
