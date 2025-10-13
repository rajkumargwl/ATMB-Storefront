import React from "react";

type JoinCtaBannerSectionProps = {
  heading: string;
  subText?: string;
  cta: {
    label: string;
    url?: string | null;
  };
  notification?: {
    avatar?: { url?: string };
    text?: string;
  };
  sideImage?: {
    url?: string;
  };
};

const JoinCtaBannerSection: React.FC<JoinCtaBannerSectionProps> = ({
  heading,
  subText,
  cta,
  notification,
  sideImage,
}) => {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between bg-[#FF6900] text-white overflow-hidden rounded-2xl md:px-10 px-5 py-10 md:py-20">
      {/* Left Section */}
      <div className="flex flex-col justify-center w-full md:w-1/2 z-10 space-y-5">
        <h2 className="text-[32px] md:text-[56px] font-semibold leading-tight md:leading-[64px] max-w-[600px]">
          {heading}
        </h2>
        {subText && (
          <p className="text-white text-[16px] md:text-[18px] font-normal">
            {subText}
          </p>
        )}

        {cta?.label && (
          <a
            href={cta.url ?? "#"}
            className="mt-4 inline-flex items-center justify-center bg-white text-[#1A1A1A] rounded-full font-medium text-[16px] px-8 py-3 w-fit hover:opacity-90 transition-all"
          >
            {cta.label}
          </a>
        )}

        {notification?.text && (
          <div className="flex items-center gap-2 mt-6">
            {notification?.avatar?.url && (
              <img
                src={notification.avatar.url}
                alt="User"
                className="w-8 h-8 rounded-full"
              />
            )}
            <p className="text-sm text-white">{notification.text}</p>
          </div>
        )}
      </div>

      {/* Right Image */}
      {sideImage?.url && (
        <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-10 md:mt-0">
          <img
            src={sideImage.url}
            alt="Join CTA"
            className="w-[300px] md:w-[400px] h-auto object-contain"
          />
        </div>
      )}
    </section>
  );
};

export default JoinCtaBannerSection;
