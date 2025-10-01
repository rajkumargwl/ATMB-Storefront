import {PortableText} from '@portabletext/react';

type Props = {
  data: {
    title: string;
    description: any;
    desktopImage?: {url: string};
    mobileImage?: {url: string};
  };
};

export default function SolutionVirtualMailbox({data}: Props) {
  return (
    <section className="w-full bg-white py-10 md:py-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-10 px-4 md:px-8">
        
        {/* Left side - Images */}
        {/* Left side - Images */}
<div className="flex-1 flex justify-center gap-6">
  {data.desktopImage?.url && (
    <img
      src={data.desktopImage.url}
      alt={data.title || "Virtual Mailbox Desktop"}
      className="max-w-[420px] w-full h-auto"
    />
  )}

  {data.mobileImage?.url && (
    <img
      src={data.mobileImage.url}
      alt={data.title || "Virtual Mailbox Mobile"}
      className="max-w-[160px] w-full h-auto"
    />
  )}
</div>

        {/* Right side - Text */}
        <div className="flex-1">
          {data.title && (
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              {data.title}
            </h2>
          )}

          {data.description && (
            <div className="text-gray-700 leading-relaxed">
              <PortableText value={data.description} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
