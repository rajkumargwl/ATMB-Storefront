import React from 'react';

export default function HealthCenterHero({ data }) {
  return (
   <section className="bg-[#F6F6F6] py-12 md:py-2">

      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left Content */}
        <div className="w-full md:w-1/2 lg:w-2/3 space-y-6 text-center md:text-left">
          {data?.heading && (
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
              {data.heading}
            </h1>
          )}

          {data?.text && (
            <p className="text-lg text-gray-600">{data.text}</p>
          )}

          {/* Doctor Info */}
          <div className="flex items-center justify-center md:justify-start space-x-4 pt-4">
            <img
              src={data?.image?.asset?.url }
              alt={data?.heading || 'Health Center'}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <p className="text-xl font-semibold text-gray-800">{data?.doctorName}</p>
              <p className="text-md text-gray-500">{data?.doctorTitle}</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 lg:w-1/3 mt-8 md:mt-0 flex justify-center">
          <img
            src={data?.image?.asset?.url}
            alt={data?.heading || 'Health Center'}
            className="rounded-lg max-w-full h-auto"
          />
        </div>

      </div>
    </section>
  );
}