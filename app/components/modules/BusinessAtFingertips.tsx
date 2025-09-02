import type {SanityBusinessAtFingerips} from '~/lib/sanity';

type Props = {
  data: SanityBusinessAtFingerips;
};

export default function BusinessAtFingerips({data}: Props) {
  return (
    <section className="py-16 px-6 lg:px-20 bg-white mb-10">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h3 className="text-sm font-bold text-gray-500">
        {data?.heading || 'Your Business at Your Fingertips — On Mobile and Desktop'}
        </h3>
        <p className="text-[30px] font-extralight text-[#1F2937] mt-2">
        {data?.description || "Whether you're on a flight, at a café, or in your home office, our mobile app and desktop portal keep you connected, in control, and ready to act instantly." }
        </p>
      </div>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center mt-12">
        {/* Left Section - Illustration + Personas */}
        <div className="relative flex justify-center">
          <div className="w-60 h-96 bg-[#C6CBCE] rounded-xl flex items-center justify-center">
            <span className="text-gray-500"> <img
                src={data?.phoneImage?.url}
                className=""
              /></span>
          </div>

          {/* Floating Cards */}
          {data?.personas?.map((persona, index) => (
          <div
            key={index}
            className="absolute border border-[#E5E5E5] bg-white shadow-md rounded-lg p-3 flex items-center gap-2 w-52"
            style={{
              top:
                index === 0
                  ? "106px"
                  : index === 1
                  ? "1.5rem"
                  : index === 2
                  ? "auto"
                  : "auto",
              left:
                index === 0
                  ? "37px"
                  : index === 2
                  ? "74px"
                  : "auto",
              right:
                index === 1
                  ? "90px"
                  : index === 3
                  ? "128px"
                  : "auto",
              bottom:
                index === 2
                  ? "2.5rem"
                  : index === 3
                  ? "-1.5rem"
                  : "auto",
            }}
          >
            {/* Image or Emoji */}
            {persona?.authorImage?.url ? (
              <img
                src={persona?.authorImage?.url}
                alt={persona?.role}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <span className="text-2xl">👤</span>
            )}

            {/* Texts */}
            <div>
              <p className="font-semibold text-[14px]">{persona?.role}</p>
              <p className="text-[10px] text-[#525252]">{persona?.quote}</p>
            </div>
          </div>
        ))}

        </div>

        {/* Right Section - Text + Features */}
        <div>

          <div className="grid grid-cols-2 gap-6 mt-8">
            {data?.features?.map((feature) => (
            <div className="flex items-start gap-3">
              <div
                className="w-28 h-[52px] bg-[#E5E5E5] flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: feature?.icon?.iconCode || '' }}
              />
              <div>
                <h4 className="font-semibold text-[#171717] text-[16px]">{feature?.title}</h4>
                <p className="text-sm text-[#525252] mt-2">{feature?.description}</p>
              </div>
            </div>
            ))}
            
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex gap-4">
          {data?.appButtons?.map((btn) => (
            <a
              key={btn?.label}
              href={btn?.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-5 py-3 rounded-lg flex items-center gap-2`}
              style={{
                backgroundColor: btn?.icon?.bgColor || "black",
                color: btn?.icon?.textColor || "white",
              }}
            >
              {/* If iconFile exists, show image, else use iconCode (SVG string) */}
              {btn?.icon?.iconFile?.asset?.url ? (
                <img
                  src={btn.icon.iconFile.asset.url}
                  alt={btn.label}
                  className="h-5 w-5"
                />
              ) : btn?.icon?.iconCode ? (
                <span
                  dangerouslySetInnerHTML={{ __html: btn.icon.iconCode }}
                  className="h-5 w-5"
                />
              ) : null}

              {btn?.label}
            </a>
          ))}
        </div>


        <p className="text-sm text-gray-500 mt-6 flex items-center gap-1">
          {/* Render stars dynamically */}
          {Array.from({ length: data?.socialProof?.rating || 0 }).map((_, i) => (
            data?.socialProof?.starIcon?.svgFile?.asset?.url ? (
              <img
                key={i}
                src={socialProof.starIcon.svgFile.asset.url}
                alt="star"
                className="w-4 h-4"
              />
            ) : (
              <span
                key={i}
                dangerouslySetInnerHTML={{ __html: data?.socialProof?.starIcon?.svgCode || '' }}
                className="w-4 h-4 inline-block"
              />
            )
          ))}

          {/* Text */}
          <span className="ml-2">{data?.socialProof?.text}</span>
        </p>

        </div>
      </div>
    </section>
  );
}
