interface OperatorYourCompetitorsProps {
  module: {
    label?: string;
    heading?: string;
    description?: string;
    ctaText?: string;
    ctaUrl?: string;
    image?: any;
  };
}

export function OperatorYourCompetitors({module}: OperatorYourCompetitorsProps) {
  const {label, heading, description, ctaText, ctaUrl, image} = module;

  console.log('🎯 OperatorYourCompetitors COMPONENT CALLED!');
  console.log('📝 Module data:', module);

  return (
    <section className="bg-gray-900 text-white py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Content */}
          <div className="lg:w-1/2">
            {label && (
              <span className="inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
                {label}
              </span>
            )}
            
            {heading && (
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                {heading}
              </h2>
            )}
            
            {description && (
              <p className="text-gray-300 text-lg mb-8 leading-relaxed whitespace-pre-line">
                {description}
              </p>
            )}
            
            {ctaText && ctaUrl && (
              <a
                href={ctaUrl}
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg transition duration-300 transform hover:scale-105"
              >
                {ctaText}
              </a>
            )}
          </div>

          {/* Right Image */}
          {image?.asset?.url && (
            <div className="lg:w-1/2">
              <img
                src={image.asset.url}
                alt={image.alt || 'Competitive Analysis'}
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}