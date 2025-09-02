import type {SanityWhyBusinessesChooseUs} from '~/lib/sanity';

type Props = {
  data: SanityWhyBusinessesChooseUs;
};

export default function WhyBusinessesChooseUs({data}: Props) {
  return (
    <section className="bg-[#F2F5F7] py-16 px-6 md:px-12 lg:px-24">
      <div className="text-center max-w-7xl mx-auto mb-12">
        <h3 className="text-md font-bold text-[#525252] tracking-wide">
          {data?.heading || '"Why Businesses Choose Us"'}
        </h3>
        <p className="text-xl md:text-2xl text-[#171717] mt-4">
        {data?.description || 'Trusted by entrepreneurs, digital nomads, and small businesses worldwide for <br />reliability, flexibility, and growth support.'}
        </p>
      </div>

      <div className="grid grid-cols-1 max-w-7xl mx-auto lg:grid-cols-2 items-center">
        {/* Left side image placeholder */}
        <div className="w-[430px] h-[390px] bg-[#C6CBCE] rounded-2xl flex items-center justify-center">
        {data?.image?.url ? (
          <img
            src={data.image.url}
            alt="Feature"
            className="h-12 w-12 object-contain"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 7l9 9m0 0l9-9m-9 9V3"
            />
          </svg>
        )}

        </div>

        {/* Right side content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {/* <div>
            <h3 className="font-semibold text-md text-[#171717]">All-in-One Platform</h3>
            <p className="text-[#525252] text-sm mt-2">
              Manage mail, calls, and growth tools from one dashboard — no juggling multiple providers.
            </p>
          </div> */}

          {data?.features?.map((feature) => (
            <div>
              <h3 className="font-semibold text-md text-[#171717]">
                {feature.title}
              </h3>
              {feature.description && (
                <p className="text-[#525252] text-sm mt-2">
                  {feature.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
