import React from "react";

type BenefitCard = {
  stat: string;
  title: string;
  testimonial: string;
  customerName: string;
  customerRole: string;
  icon: {
    url: string;
  };
};

type Props = {
  heading: string;
  subHeading: string;
  benefitCards: BenefitCard[];
};

const BusinessBenefitsSection: React.FC<Props> = ({
  heading,
  subHeading,
  benefitCards,
}) => {
  return (
    <section className="py-16 bg-[#0A0F17] text-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">{heading}</h2>
        <p className="text-gray-300 text-lg md:text-xl mb-12">{subHeading}</p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefitCards?.map((card, idx) => (
            <div
              key={idx}
              className="bg-white text-black rounded-2xl p-6 shadow-md hover:shadow-lg transition flex flex-col"
            >
              <div className="w-10 h-10 bg-[#FF6600]/10 rounded-full flex items-center justify-center mb-4">
                <img
                  src={card.icon.url}
                  alt={card.title}
                  className="w-5 h-5 object-contain"
                />
              </div>

              <h3 className="text-lg md:text-xl font-semibold mb-2 leading-snug">
                {card.stat}
              </h3>
              <p className="text-gray-700 mb-6">{card.title}</p>

              <div className="bg-gray-50 border border-[#FF6600]/30 rounded-md p-4 text-left mt-auto">
                <p className="italic text-gray-700 mb-3">{card.testimonial}</p>
                <p className="text-sm font-semibold text-gray-900">
                  {card.customerName}
                </p>
                <p className="text-xs text-gray-600">{card.customerRole}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessBenefitsSection;
