import React from 'react';

type Challenge = {
  title: string;
  description: string;
  quote: string;
  author: {
    name: string;
    designation: string;
  };
  icon: {
    url: string;
    alt?: string | null;
  };
};

type Props = {
  title: string;
  subtitle: string;
  challenges: Challenge[];
};

const SmallBusinessChallanges : React.FC<Props> = ({ title, subtitle, challenges }) => {
  return (
    <section className="py-16 bg-gradient-to-b from-black/80 to-black text-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">{title}</h2>
        <p className="text-lg md:text-xl text-gray-300 mb-12">{subtitle}</p>

        <div className="grid gap-8 md:grid-cols-3">
          {challenges.map((challenge) => (
            <div key={challenge.title} className="bg-white text-black rounded-lg p-6 flex flex-col items-start shadow-md hover:shadow-lg transition">
              <img
                src={challenge.icon.url}
                alt={challenge.icon.alt || challenge.title}
                className="w-6 h-6 mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{challenge.title}</h3>
              <p className="text-gray-700 mb-4">{challenge.description}</p>
              <blockquote className="text-sm italic text-gray-500 mb-2">{challenge.quote}</blockquote>
              <p className="text-gray-600 font-medium">
                — {challenge.author.name}, {challenge.author.designation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SmallBusinessChallanges;
