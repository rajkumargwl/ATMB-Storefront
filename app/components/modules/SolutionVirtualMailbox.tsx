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
    <section className="w-full bg-[#F6F6F6] py-[40px] md:py-[60px] lg:py-[100px] px-5">
      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row gap-[44px] md:gap-[64px] items-center">
        
        {/* Left side - Images */}
        <div className="w-full md:w-[56.25%] flex flex-col relative order-2 md:order-1">
          {data.desktopImage?.url && (
            <img
              src={data.desktopImage.url}
              alt={data.title || "Virtual Mailbox Desktop"}
              className="max-w-[662px] w-full h-auto"
            />
          )}
 
          {data.mobileImage?.url && (
            <img
              src={data.mobileImage.url}
              alt={data.title || "Virtual Mailbox Mobile"}
              className="max-w-[153px] w-full h-auto absolute bottom-[0px] right-[0px]"
            />
          )}
        </div>
 
        {/* Right side - Text */}
        <div className="w-full md:w-[43.75%] flex flex-col relative gap-4 order-1 md:order-2">
          {data.title && (
            <h2 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]">
              {data.title}
            </h2>
          )}
 
         {Array.isArray(data.description) &&
 data.description[0]?._type === "block" && (
  <PortableText value={data.description} />
)}

        </div>
      </div>
    </section>
  );
}
 