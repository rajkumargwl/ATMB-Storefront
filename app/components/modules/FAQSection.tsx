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
    <section className="bg-[#F6F6F6] text-gray-900 py-14">
      <div className="max-w-6xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-8 items-center">
        {/* Left: Text Content */}
        <div>
          {label && (
            <p className="font-Roboto text-[#4D4E4F] font-medium leading-[28px] text-[20px]">{label}</p>
          )}
          <h2 className="mt-6 font-Roboto text-PrimaryBlack font-semibold text-[28px] leading-[36px] tracking-[-0.4px]  sm:text-[32px] sm:leading-[42px] sm:tracking-[-0.48px]  max-w-[523px]">{title}</h2>
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
