type FAQSectionProps = {
  label?: string;
  title: string;
  subtitle?: string;
  image?: { url?: string; alt?: string };
};

export default function FAQSection({
  label,
  title,
  subtitle,
  image,
}: FAQSectionProps) {
  return (
    <section className="bg-[#F6F6F6] text-gray-900 py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-8 items-center">
        {/* Left: Text Content */}
        <div>
          {label && (
            <p className="text-sm text-gray-500 mb-2">{label}</p>
          )}
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
          {subtitle && (
            <p className="text-lg text-gray-600">{subtitle}</p>
          )}
        </div>

        {/* Right: Image */}
        {image?.url && (
          <div className="flex justify-center md:justify-end">
            <img
              src={image.url}
              alt={image.alt || "FAQ image"}
              className="rounded-lg shadow-md max-w-full h-auto"
            />
          </div>
        )}
      </div>
    </section>
  );
}
