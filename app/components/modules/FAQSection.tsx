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
      <div className="max-w-[1240px] mx-auto  max-1265px:px-4 max-1265px:gap-2 grid md:grid-cols-2 items-center">
        {/* Left: Text Content */}
        <div>
          {label && (
            <p className="font-Roboto text-[#4D4E4F] font-medium leading-[28px] text-[20px]">{label}</p>
          )}
          <h1 className="mt-5 font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] tracking-[-0.36px] text-[24px] md:text-[36px] md:leading-[43.2px] md:tracking-[-0.54px]">{title}</h1>
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
              className="rounded-xl shadow-md w-full h-auto lg:max-w-[611px] lg:h-[400px] object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
