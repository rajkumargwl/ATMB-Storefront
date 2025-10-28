import { PortableText } from '@portabletext/react';
 
interface RenterReferralEditorProps {
  data: any;
}
 
export function RenterReferralEditor({ data }: RenterReferralEditorProps) {
  const { title, terms } = data;
 
  return (
    <section className="px-5 py-[64px] md:py-[64px] lg:py-[100px] bg-white">
      <div className="max-w-[1240px] mx-auto ">
        <div className="">
          {title && (
            <h2 className="mb-6 md:mb-4 font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[26px] md:text-[36px] tracking-[0.39px] md:tracking-[-0.54px]">
              {title}
            </h2>
          )}
 
          {terms && terms.length > 0 && (
            <div className="prose prose-lg rental-text">
              <PortableText value={terms} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}