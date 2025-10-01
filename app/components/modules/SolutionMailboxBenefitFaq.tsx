import React from "react";

interface Benefit {
  icon: { url: string };
  text: string;
}

interface Faq {
  question: string;
  answer: string;
}

interface SolutionMailboxBenefitFaqProps {
  data: {
    title: string;
    subtitle: string;
    benefits: Benefit[];
    faqs: Faq[];
    rightImage: { url: string };
  };
}

const SolutionMailboxBenefitFaq: React.FC<SolutionMailboxBenefitFaqProps> = ({ data }) => {
  return (
    <section className="w-full bg-[#0B0E12] text-white py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Title + Subtitle */}
        <h2 className="text-3xl md:text-4xl font-bold mb-3">{data.title}</h2>
        <p className="text-white mb-12">{data.subtitle}</p>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {data.benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-DarkOrange rounded-lg shadow p-6 flex items-start space-x-3"
              >
                <img
                  src={benefit.icon.url}
                  alt="Benefit Icon"
                  className="w-6 h-6 flex-shrink-0"
                />
                <p className="text-black text-sm font-medium">{benefit.text}</p>
              </div>
            ))}
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <div className="bg-DarkOrange rounded-2xl p-4 flex justify-center">
              <img
                src={data.rightImage.url}
                alt="Virtual Mailbox Preview"
                className="max-w-[280px] md:max-w-sm"
              />
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          {data.faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 text-left shadow"
            >
              <h3 className="text-black font-semibold mb-2">{faq.question}</h3>
              <p className="text-black text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionMailboxBenefitFaq;
