import type {SanityBundles} from '~/lib/sanity';

type Props = {
  data: SanityBundles;
};

export default function Pricing({data}: Props) {
    return (
      <section className="py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="text-md font-bold text-gray-600 tracking-wide">
        {data?.eyebrow || 'Bundle & Save'}
        </h3>
        <p className="mt-6 text-[30px] font-thin text-[#1F2937]">
        {data?.description || 'Get our most popular services together and save up to 25% compared to buying individually.'}
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
        {data?.plans?.map((plan, idx) => (
          <div key={idx} className="border border-[#E5E7EB] rounded-xl p-6 shadow-sm flex flex-col justify-center items-center">
            <div className="text-center">
              <span className="inline-block bg-[#F2F5F7] border border-[#C6CBCE] text-gray-700 text-xs font-medium px-3 py-1 rounded-full mb-3">
                {plan?.badgeText}
              </span>
              <h3 className="text-lg font-semibold mt-5">{plan?.title}</h3>
              <p className="text-gray-500 text-sm mt-2 mb-4">{plan?.subtitle}</p>
  
              <p className="text-[#4B5563] text-[14px] mt-6">{plan?.startingFrom}</p>
              <div className="mb-4 flex items-center justify-center gap-2">
                <span className="line-through text-[#A1A6AA] text-[25px]">${plan?.oldPrice}</span>
                <span className="text-[40px] font-semibold text-[#1F2937">${plan?.price}</span><span className="text-[15px] font-normal text-[#4B5563]">{plan?.priceUnit}</span>
              </div>
  
              {/* Features */}
              <div className="mb-4 mt-10">
                {plan?.services?.map((f, i) => (
                  <div key={i} className="flex items-start justify-between border-b border-[#E7E7E7] py-2 mb-2">
                    <div>
                      <p className="text-[16px] font-medium text-left">{f?.name}</p>
                      <p className="text-[14px] text-[#8F98A5] mt-2">{f?.description}</p>
                    </div>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                      {f?.tier}
                    </span>
                  </div>
                ))}
              </div>

  
              {/* Points */}
              <ul className="space-y-2 text-sm text-gray-600 mb-6 mt-9">
                {plan?.features?.map((p, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-green-500">✔</span> {p}
                  </li>
                ))}
              </ul>
            </div>
  
            <button className="py-2 px-4 rounded-md bg-[#374151] text-white font-medium mt-8 mb-10">
              {plan?.ctaText}
            </button>
          </div>
        ))}
      </div>
      </section>
    );
  }
  