import { useState } from 'react';
import type {SanityWhoWeHelp} from '~/lib/sanity';

type Props = {
  data: SanityWhoWeHelp;
};


export default function HomeHero({ data }: Props) {
    const [activeTab, setActiveTab] = useState(
      data?.tabs?.[0]?.label || ""
    );
    // Find active tab data
    const activeData = data?.tabs?.find(
    (t) => t.label === activeTab
    );
  return (
    <section className="bg-[#F2F5F7] py-12 border-t border-b border-[#C6CBCD]">
         <div className="max-w-8xl mx-auto px-4">
    {/* Heading */}
    <div className="text-center">
      <p className="text-sm text-gray-500 uppercase tracking-wide">{data?.title || 'Who We Help'}</p>
      <h2 className="text-2xl font-normal text-gray-900 mt-2">
        {data?.subtitle1 || 'From solo professionals to scaling businesses'} <br />
        <span className="font-bold text-black">{data?.subtitle2 || 'we’ve got you covered'}</span>
      </h2>
    </div>

    {/* Tabs */}
    <div className="mt-8 flex flex-wrap justify-center gap-4 border-b border-[#C6CBCD]">
    {data?.tabs?.map((tab, i) => (
    <button
        key={i}
        onClick={() => setActiveTab(tab.label)}
        className={`px-4 py-2 text-sm font-medium ${
        activeTab === tab.label
            ? "border-b-2 border-black text-black"
            : "text-gray-500 hover:text-black"
        }`}
    >
        {tab.label}
    </button>
    ))}
</div>

    {/* Tab content */}
   {/* Tab content */}
   {activeData && (
    <div className="mt-15 grid md:grid-cols-2 gap-10 max-w-6xl mx-auto items-center">
        {/* Left content */}
        <div className="flex flex-col justify-center">
        {/* Description */}
        {activeData?.description && (
            <p className="text-gray-700">{activeData?.description}</p>
        )}

        {/* Key Needs */}
        {activeData?.keyNeeds?.length > 0 && (
            <div className="mt-6">
            <p className="font-bold text-gray-900">Key Needs:</p>
            <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                {activeData?.keyNeeds.map((need, i) => (
                <li key={i}>{need}</li>
                ))}
            </ul>
            </div>
        )}

        {/* Services */}
        {activeData?.services?.length > 0 && (
            <div className="mt-8">
            <p className="font-bold text-gray-900">Relevant Services:</p>
            <div className="flex gap-4 mt-3 flex-wrap justify-center">
                {activeData?.services.map((service, i) => (
                <div
                    key={i}
                    className="flex-1 p-4 text-center border rounded-lg shadow-sm bg-white min-w-[120px]"
                >
                    {service?.title}
                </div>
                ))}
            </div>
            </div>
        )}

        {/* Button */}
        {activeData?.button?.label && (
            <button className="mt-6 bg-black text-white px-6 py-2 rounded-md self-center md:self-start">
            {activeData?.button?.label}
            </button>
        )}
        </div>

        {/* Right content */}
        {(activeData?.quote || activeData?.image) && (
        <div className="relative flex items-center justify-center rounded-2xl min-h-[300px]">
            <div className="w-[420px] h-[400px] bg-[#E1E4E5] flex items-center justify-center rounded-xl">
            {activeData?.image ? (
                    <img
                        src={activeData.image.url}
                        alt={activeData.image.altText || "Service image"}
                        width={activeData.image.width}
                        height={activeData.image.height}
                        className="object-contain rounded-xl bg-E1E4E5"
                    />
            ) : (
                <span className="text-gray-400"></span>
            )}
            </div>
            {activeData?.quote && (
            <div className="absolute bottom-6 left-6 bg-white p-4 rounded-md shadow-md max-w-[250px]">
                <p className="text-sm italic text-gray-600">{activeData?.quote}</p>
            </div>
            )}
        </div>
        )}
    </div>
    )}


    </div>
  </section>
  );
}
