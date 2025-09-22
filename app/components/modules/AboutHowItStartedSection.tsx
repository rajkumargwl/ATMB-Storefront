// ~/components/modules/AboutHowItStartedSection.tsx
import {PortableText} from '@portabletext/react';

type Props = {
  heading: string;
  content: any[];
  image?: {
    url?: string;
    alt?: string;
  };
};

export default function AboutHowItStartedSection({heading, content, image}: Props) {
  return (
    <section className="w-full py-16 bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
        
        {/* Left image */}
        {image?.url && (
          <div className="flex justify-center">
            <img
              src={image.url}
              alt={image.alt || ''}
              className="rounded-lg shadow-md object-cover max-h-[400px]"
            />
          </div>
        )}

        {/* Right content */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">{heading}</h2>
          
          {content?.length > 0 && (
            <div className="prose prose-lg text-gray-700">
              <PortableText value={content} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
