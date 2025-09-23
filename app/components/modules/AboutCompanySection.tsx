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
    <section className="bg-white text-gray-900 py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          {subtitle && (
            <p className="text-lg text-gray-600">{subtitle}</p>
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
                  className="mb-4 w-10 h-10 object-contain"
                />
              )}
              <p className="text-gray-700 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
