import { PortableText } from "@portabletext/react";

type Feature = {
  _key?: string;
  title: string;
  subtitle: string;
  icon?: {
    url?: string;
  };
};

type Props = {
  heading: string;
  description?: any[];
  features: Feature[];
  rightImage?: {
    url?: string;
    alt?: string;
  };
  backgroundColor?: string;
};

export default function AboutDetailedFeaturesSection({
  heading,
  description = [],
  features,
  rightImage,
  backgroundColor,
}: Props) {
  return (
    <section
      className="w-full py-16"
      style={{ backgroundColor: backgroundColor || "#fff" }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-2 items-center">
        {/* Left side: text + features */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            {heading}
          </h2>

          {description?.length > 0 && (
            <div className="prose prose-lg text-gray-700">
              <PortableText value={description} />
            </div>
          )}

          <div className="rounded-xl overflow-hidden bg-gray-50 divide-y divide-gray-200">
            {features?.map((feature, idx) => (
              <div
                key={feature._key || idx}
                className="flex items-center gap-4 p-5"
              >
                {feature.icon?.url && (
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-[#FF6600]">
                    <img
                      src={feature.icon.url}
                      alt={feature.title}
                      className="w-5 h-5"
                    />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side: image */}
        {rightImage?.url && (
          <div className="flex justify-center">
            <img
              src={rightImage.url}
              alt={rightImage.alt || ""}
              className="rounded-lg shadow-md object-contain max-h-[500px]"
            />
          </div>
        )}
      </div>
    </section>
  );
}
