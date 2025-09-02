import type {SanityTrustedByBusiness} from '~/lib/sanity';

type Props = {
  data: SanityTrustedByBusiness;
};

export default function Homedata({ data }: Props) {
  return (
     <section className="bg-[#F2F5F7] py-12 border-t border-b border-[#C6CBCD]">
         <div className="max-w-6xl mx-auto text-center px-4">
           {/* Title */}
           <h2 className="text-lg font-semibold text-gray-900">
            {data?.heading || 'Trusted by Businesses Around the World'}
           </h2>
   
           {/* Stats Row */}
           <div className="flex flex-wrap justify-center gap-4 mt-6">
            {data?.icons?.map((item, idx) => (
                <div
                key={idx}
                className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg shadow-sm"
                >
                {/* Render the SVG code */}
                <span
                    className="w-5 h-5"
                    dangerouslySetInnerHTML={{ __html: item?.icon?.svgCode }}
                />

                {/* Render the label */}
                <span className="text-sm text-gray-800">
                    {item.label}
                </span>
                </div>
            ))}
            </div>

   
           {/* Logos Row */}
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 mt-10">
            {data?.images?.map((item, idx) => {
                // handle both "upload" and "upload1"
                const assetRef = item.image;

                return (
                <div
                    key={idx}
                    className="w-full h-20 bg-gray-200 rounded-lg flex items-center justify-center"
                >
                    {assetRef ? (
                    <img
                        src={assetRef.url}
                        alt={item.altText || `Logo ${idx + 1}`}
                        className="max-h-full max-w-full object-contain"
                    />
                    ) : (
                    <span className="text-gray-500 text-sm">Logo {idx + 1}</span>
                    )}
                </div>
                );
            })}
            </div>

         </div>
       </section>
  );
}
