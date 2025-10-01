import { Link } from "@remix-run/react";

type Overlay = {
  icon?: { url: string };
  title: string;
  subtitle?: string | null;
};

type TrustSection = {
  avatars: { url: string }[];
  licensedIcon: { url: string };
  licensedText: string;
  text: string;
};

type SolutionHeroModule = {
  heading: string;
  highlightText?: string;
  description: string;
  cta: {
    label: string;
    url?: string | null;
    variant?: "primary" | "secondary";
  };
  overlayOne: Overlay;
  overlayTwo: Overlay;
  rightImage: { url: string };
  trustSection: TrustSection;
};

type Props = {
  data: SolutionHeroModule;
};

export default function SolutionHero({ data }: Props) {
  return (
    <section className="px-5 py-[40px] md:py-[60px] lg:py-[100px]">
      <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div className="flex flex-col gap-6">
          <h1 className="font-Roboto text-PrimaryBlack font-semibold leading-[40px] md:leading-[48px] text-[32px] md:text-[40px] tracking-[-0.6px]">
            {data?.heading?.split(data.highlightText || "").map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className="text-DarkOrange">{data.highlightText}</span>
                )}
              </span>
            ))}
          </h1>

          <p className="font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px]">
            {data?.description}
          </p>

          {data?.cta?.label && (
            <Link to={data?.cta?.url || "#"}>
              <button className="group bg-DarkOrange text-white font-Roboto font-medium leading-[16px] text-[16px] tracking-[0.08px] h-[48px] px-6 rounded-[100px] overflow-hidden transition-all hover:scale-[1.01] hover:bg-[#DD5827]">
                {data.cta.label}
              </button>
            </Link>
          )}

          {/* Trust Section */}
          <div className="flex items-center gap-6 pt-6">
            <div className="flex -space-x-2">
              {data?.trustSection?.avatars?.map((avatar, idx) => (
                <img
                  key={idx}
                  src={avatar.url}
                  alt="avatar"
                  className="w-8 h-8 rounded-full border border-white"
                />
              ))}
            </div>
            <p className="font-Roboto text-PrimaryBlack text-[14px] md:text-[16px]">
              {data?.trustSection?.text}
            </p>
            <div className="flex items-center gap-2">
              <img
                src={data?.trustSection?.licensedIcon?.url}
                alt="licensed icon"
                className="w-6 h-6"
              />
              <span className="font-Roboto text-PrimaryBlack text-[14px] md:text-[16px]">
                {data?.trustSection?.licensedText}
              </span>
            </div>
          </div>
        </div>

        {/* Right Image with overlays */}
        <div className="relative w-full flex justify-center">
          <img
            src={data?.rightImage?.url}
            alt="Hero Illustration"
            className="w-full max-w-[500px] rounded-lg"
          />

          {/* Overlay One */}
          <div className="absolute bottom-[-20px] left-[10%] bg-white shadow-md rounded-lg px-4 py-2 flex items-center gap-2">
            {data?.overlayOne?.icon?.url && (
              <img src={data.overlayOne.icon.url} alt="" className="w-5 h-5" />
            )}
            <span className="text-sm font-Roboto text-PrimaryBlack">
              {data?.overlayOne?.title}
            </span>
          </div>

          {/* Overlay Two */}
          <div className="absolute top-[10%] right-[-20px] bg-white shadow-md rounded-lg px-4 py-2 flex items-center gap-2">
            {data?.overlayTwo?.icon?.url && (
              <img src={data.overlayTwo.icon.url} alt="" className="w-5 h-5" />
            )}
            <span className="text-sm font-Roboto text-PrimaryBlack">
              {data?.overlayTwo?.title}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
