import { PortableText } from '@portabletext/react';

type Feature = {
  text: string;
};

type NoOfficeSectionProps = {
  title: string;
  description: any;
  features: Feature[];
  image?: string;
};

export default function NoOfficeSection({
  title,
  description,
  features,
  image,
}: NoOfficeSectionProps) {
  return (
    <section className="w-full bg-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 px-6">
        {/* Left: Text Content */}
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {title}
          </h2>

          <div className="text-gray-700 leading-relaxed mb-6">
            <PortableText value={description} />
          </div>

          <ul className="space-y-3">
            {features?.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-gray-800">
                <span className="text-orange-500 mt-1">✓</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Image */}
        {image && (
          <div className="flex-1 flex justify-center">
            <img
              src={image}
              alt={title}
              className="w-[357px] h-auto object-contain rounded-lg"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </section>
  );
}
