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
      className="w-full py-16"
      style={{ backgroundColor: backgroundColor || "#fff" }}
    >
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 text-center">
        {features.map((feature, idx) => (
          <div
            key={feature._key || idx}
            className="flex flex-col items-center justify-center space-y-3"
          >
            {feature.icon?.url && (
              <img
                src={feature.icon.url}
                alt={feature.title}
                className="w-10 h-10"
     title={feature.tooltipTitle} 
              />
            )}
            <h3 className="font-semibold text-white text-lg">
              {feature.title}
            </h3>
            <p className="text-sm text-white">{feature.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
