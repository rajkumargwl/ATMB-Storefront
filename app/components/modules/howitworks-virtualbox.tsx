import { Link } from '@remix-run/react';

interface HowItWorksVirtualboxProps {
  data: {
    _type: 'howitworksVirtualbox';
    title?: string;
    description?: string;
    links?: Array<{
      label?: string;
      url?: string;
    }>;
    ctaButton?: {
      label?: string;
      url?: string;
    };
    image?: {
      url: string;
      alt?: string;
    };
  };
}

export function HowItWorksVirtualbox({ data }: HowItWorksVirtualboxProps) {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {data.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {data.description}
            </p>
            
            {data.links && data.links.length > 0 && (
              <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
                {data.links.map((link, index) => (
                  <Link
                    key={index}
                    to={link.url || '#'}
                    className="text-sm text-orange-600 hover:text-orange-800 font-medium border-b border-orange-600 hover:border-orange-800"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
            
            {data.ctaButton && (
              <Link
                to={data.ctaButton.url || '#'}
                className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl"
              >
                {data.ctaButton.label}
              </Link>
            )}
          </div>
          
          {data.image?.url && (
            <div className="relative">
              <img
                src={data.image.url}
                alt={data.image.alt}
                className="rounded-xl shadow-2xl w-full"
                width={600}
                height={500}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}