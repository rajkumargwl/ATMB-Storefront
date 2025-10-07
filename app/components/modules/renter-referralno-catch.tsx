interface RenterReferralNoCatchProps {
  data: any;
}

export function RenterReferralNoCatch({ data }: RenterReferralNoCatchProps) {
  const { heading, buttonText, buttonLink, image, description } = data;

  // Debug log
  console.log('No Catch section data:', data);

  return (
    <section className="py-16 bg-primary text-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center lg:text-left">
            {heading && (
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                {heading}
              </h2>
            )}
            
            {description && (
              <p className="text-xl opacity-90 mb-6">
                {description}
              </p>
            )}
            
            {buttonText && (
              <a
                href={buttonLink || '#'}
                className="inline-flex items-center px-6 py-3 text-white  bg-orange-600 text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                {buttonText}
              </a>
            )}
          </div>

          {image?.asset?.url && (
            <div className="relative">
              <img
                src={image.asset.url}
                alt={heading || 'No Catch Section'}
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}