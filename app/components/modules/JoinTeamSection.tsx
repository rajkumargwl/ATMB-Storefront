type JoinTeamSectionProps = {
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string | null;
  backgroundColor?: string;
  textColor?: string;
};

export default function JoinTeamSection({
  title,
  subtitle,
  buttonText,
  buttonLink,
  backgroundColor = "#FF6600",
  textColor = "#FFFFFF",
}: JoinTeamSectionProps) {
  return (
    <section
      className="py-16 text-center"
      style={{ backgroundColor, color: textColor }}
    >
      <div className="max-w-3xl mx-auto px-4">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-lg mb-8 opacity-90">{subtitle}</p>
        )}

        {/* Button */}
        {buttonText && (
          <a
            href={buttonLink || "#"}
            className="inline-block bg-white text-black px-6 py-3 rounded-full font-medium shadow hover:shadow-md transition"
          >
            {buttonText}
          </a>
        )}
      </div>
    </section>
  );
}
