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
      className="py-25 text-center"
      style={{ backgroundColor, color: textColor }}
    >
      <div className="max-w-5xl mx-auto px-4">
        {/* Title */}
        <h2 className="text-[56px] font-[600] leading-[61.6px] tracking-[-1.12px] mb-4">{title}</h2>
 
        {/* Subtitle */}
        {subtitle && (
          <p className="text-[18px] font-[400] leading-[27px] mb-8 opacity-90">{subtitle}</p>
        )}
 
        {/* Button */}
        {buttonText && (
          <a
            href={buttonLink || "#"}
            target="_blank"
            className="flex mx-auto items-center justify-center w-full md:w-[221px] h-[52px] md:h-[52px] rounded-[100px] font-medium leading-[16px] tracking-[0.08px] text-[16px] text-PrimaryBlack bg-white px-4 py-[12px] transition-all  hover:bg-PrimaryBlack hover:text-white"
          >
            {buttonText}
          </a>
        )}
      </div>
    </section>
  );
}