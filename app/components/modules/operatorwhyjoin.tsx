import WhyJoinBg from "~/components/media/why-join-bg.png";
import WhyJoinBgMobile from "~/components/media/why-join-bg-mobile.png";
 
interface OperatorWhyJoinProps {
  module: {
    heading?: string;
    features?: Array<{
      _key: string;
      text: string;
    }>;
  };
}
 
export function OperatorWhyJoin({module}: OperatorWhyJoinProps) {
  const {heading, features} = module;
 
  return (
    <section className="bg-PrimaryBlack w-full px-5 py-10 relative z-[2] overflow-hidden">
       <div className="absolute hidden md:block z-[1] md:top-[0px] right-[0px] md:right-[0px]">
        <img src={WhyJoinBg} alt="Background" className="w-[550px] h-[196px] lg:h-[151px]"/>
        </div>
          <div className="absolute block md:hidden z-[1] bottom-[0px] right-[0px]">
        <img src={WhyJoinBgMobile} alt="Background" className="w-[393px] h-[272px]"/>
        </div>
      <div className="max-w-[1240px] mx-auto relative z-[2]">
        
        {heading && (
          <h2 className="mb-5 md:mb-4 font-Roboto text-white font-medium leading-[28px] md:leading-[28px] text-[20px] md:text-[20px] tracking-[0px]">
            {heading}
          </h2>
        )}
        
        {features && features.length > 0 && (
          <div className="flex flex-col md:flex-row flex-wrap items-start md:items-center justify-start md:justify-start gap-[15px] md:gap-6">
            {features.map((feature) => (
              <div
                key={feature._key}
                className="flex items-center gap-3"
              >
                <span className=""><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.154 4.31288C20.4202 4.50788 20.4802 4.88288 20.2852 5.15288L9.78523 19.5529C9.68023 19.6954 9.52273 19.7854 9.34648 19.7966C9.17023 19.8079 9.00148 19.7479 8.87398 19.6241L3.77398 14.5241C3.54148 14.2916 3.54148 13.9091 3.77398 13.6766C4.00648 13.4441 4.38898 13.4441 4.62148 13.6766L9.22648 18.2816L19.314 4.44788C19.509 4.18163 19.884 4.12163 20.154 4.31663V4.31288Z" fill="#FFFFFF"></path></svg></span>
                
                <p className="font-Roboto text-white font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px]">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}