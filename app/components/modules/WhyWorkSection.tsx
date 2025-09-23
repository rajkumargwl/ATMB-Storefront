type WhyWorkSectionProps = {
  title: string;
  subtitle?: string;
  features: {
    icon?: { url?: string };
    title: string;
    description: string;
  }[];
};

export default function WhyWorkSection({
  title,
  subtitle,
  features,
}: WhyWorkSectionProps) {
  return (
    <section className="bg-[#0D0D0D] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-12">
        {/* Left side */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-gray-300">{subtitle}</p>}
        </div>

        {/* Right side */}
        <div className="grid sm:grid-cols-2 gap-8">
          {features?.map((item, idx) => (
            <div key={idx} className="flex flex-col">
              {item.icon?.url && (
                <img
                  src={item.icon.url}
                  alt={item.title}
                  className="mb-4 w-10 h-10 object-contain"
                />
              )}
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
