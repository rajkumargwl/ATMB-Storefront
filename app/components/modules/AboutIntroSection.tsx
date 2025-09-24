// ~/components/modules/AboutIntroSection.tsx
import {PortableText} from '@portabletext/react';

type Props = {
  label?: string;
  heading: string;
  description?: any;
  highlightedText?: string;
  buttonText?: string;
  buttonLink?: string;
  image?: { url?: string; alt?: string };
};


export default function AboutIntroSection({
  label,
  heading,
  description,
  highlightedText,
  buttonText,
  buttonLink,
  image,
}: Props) {
  return (
    <section className="w-full py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
        {/* Left content */}
        <div className="space-y-4">
          {label && (
            <p className="text-sm font-medium uppercase tracking-wide text-gray-600">
              {label}
            </p>
          )}

          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            {heading}
          </h2>

          {description && (
            <div className="prose prose-lg text-gray-700">
              <PortableText value={description} />
            </div>
          )}

          {highlightedText && (
            <p className="text-lg font-semibold text-orange-600">
              {highlightedText}
            </p>
          )}

          {buttonText && (
            <a
              href={buttonLink ?? '#'}
              className="inline-block rounded-full border border-gray-900 px-5 py-2 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white transition"
            >
              {buttonText}
            </a>
          )}
        </div>

        {/* Right image */}
       {image?.url && (
  <div className="flex justify-center">
    <img
      src={image.url}            // Uses the direct URL from Sanity
      alt={image.alt || ''}      // Defaults to empty string if alt is missing
      className="rounded-lg shadow-md max-h-[400px] object-cover"
    />
  </div>
)}
      </div>
    </section>
  );
}
