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
    <section className="bg-gray-50 text-gray-900 py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          {subtitle && (
            <p className="text-lg text-gray-600">{subtitle}</p>
          )}
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {values?.map((value, idx) => (
            <div
              key={idx}
              className="flex flex-col p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition"
            >
              {/* Icon + Title */}
              <div className="flex items-center mb-4">
                {value.icon?.url && (
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-500 mr-3">
                    <img
                      src={value.icon.url}
                      alt="icon"
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                )}
                <h3 className="text-xl font-semibold">{value.title}</h3>
              </div>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
