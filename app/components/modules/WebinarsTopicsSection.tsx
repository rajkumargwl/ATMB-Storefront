// app/components/modules/WebinarsTopicsSection.tsx
import React from 'react';

type Topic = {
  heading: string;
  icon: { url: string };
  points: string[];
};

type WebinarsTopicsSectionProps = {
  title: string;
  description: string;
  topics: Topic[];
};

const WebinarsTopicsSection: React.FC<{ data: WebinarsTopicsSectionProps }> = ({ data }) => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">{data.title}</h2>
        <p className="mt-2 text-gray-600">{data.description}</p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.topics.map((topic) => (
            <div
              key={topic.heading}
              className="border rounded-lg p-6 text-left flex flex-col gap-4"
            >
              <div className="flex items-center gap-2">
                <img src={topic.icon.url} alt={topic.heading} className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-gray-900">{topic.heading}</h3>
              </div>
              <ul className="list-disc list-inside text-gray-700">
                {topic.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebinarsTopicsSection;
