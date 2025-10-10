interface OperatorMailCenterProps {
  module: {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonLink?: string;
    backgroundColor?: string;
    textColor?: string;
  };
}

export function OperatorMailCenter({module}: OperatorMailCenterProps) {
  const {title, subtitle, buttonText, buttonLink, backgroundColor = '#FF6600', textColor = '#FFFFFF'} = module;

  console.log('🎯 OperatorMailCenter COMPONENT CALLED!');
  console.log('📝 Module data:', module);

  return (
    <section 
      className="py-16 px-4 rounded-2xl mx-4 my-8"
      style={{backgroundColor, color: textColor}}
    >
      <div className="container mx-auto max-w-4xl text-center">
        {title && (
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            {title}
          </h2>
        )}
        
        {subtitle && (
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        
        {buttonText && buttonLink && (
          <a
            href={buttonLink}
            className="inline-block bg-white text-orange-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition duration-300 transform hover:scale-105"
            style={{color: backgroundColor}}
          >
            {buttonText}
          </a>
        )}
      </div>
    </section>
  );
}