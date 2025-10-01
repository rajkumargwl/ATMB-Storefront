interface RenterReferralHeroProps {
  data: any;
}

export function RenterReferralHero({ data }: RenterReferralHeroProps) {
  const { label, heading, highlightedText, description, image, buttonText, buttonLink } = data;

  console.log('Hero data received:', data); // Debug log

  const renderHeading = () => {
    if (!heading) return null;
    
    if (!highlightedText?.length) return heading;
    
    let processedHeading = heading;
    highlightedText.forEach((word: string) => {
      processedHeading = processedHeading.replace(
        word, 
        `<span class="text-primary">${word}</span>`
      );
    });
    
    return <div dangerouslySetInnerHTML={{ __html: processedHeading }} />;
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {label && (
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                {label}
              </span>
            )}
            
            {heading && (
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {renderHeading()}
              </h1>
            )}
            
            {description && (
              <p className="text-lg text-gray-600 leading-relaxed">
                {description}
              </p>
            )}
            
            {buttonText && (
              <a
                href={buttonLink || '#'}
                className="inline-flex items-center px-6 py-3 bg-primary text-white  bg-orange-600 font-semibold rounded-lg hover:bg-primary-dark transition-colors"
              >
                {buttonText}
              </a>
            )}
          </div>

          {image?.asset?.url && (
            <div className="relative">
              <img
                src={image.asset.url}
                alt={heading || 'Renter Referral Hero'}
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}