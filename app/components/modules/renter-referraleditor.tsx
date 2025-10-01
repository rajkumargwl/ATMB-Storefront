import { PortableText } from '@portabletext/react';

interface RenterReferralEditorProps {
  data: any;
}

export function RenterReferralEditor({ data }: RenterReferralEditorProps) {
  const { title, terms } = data;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {title && (
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center">
              {title}
            </h2>
          )}

          {terms && terms.length > 0 && (
            <div className="prose prose-lg max-w-none">
              <PortableText value={terms} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}