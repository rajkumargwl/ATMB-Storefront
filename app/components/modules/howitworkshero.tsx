import { Link } from '@remix-run/react';

interface HowItWorksHeroProps {
  data: {
    _type: 'uspsForm1583Guide';
    title?: string;
    description?: string;
    image?: {
      url: string;
      alt?: string;
    };
  };
}

export function HowItWorksHero({ data }: HowItWorksHeroProps) {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {data.image?.url && (
            <div className="relative">
              <img
                src={data.image.url}
                alt={data.image.alt}
                className="rounded-xl shadow-2xl w-full"
                width={600}
                height={400}
              />
            </div>
          )}

          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {data.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {data.description}
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}