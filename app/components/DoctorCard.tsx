import React from 'react';

const DoctorCard = ({ doctors }) => {
  return (
    <section className="py-6 bg-gray-50 px-8 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
        <h2 className="text-5xl font-bold text-gray-800 mb-10 mt-4 md:text-5xl md:pl-6">Our Doctors</h2>
        
        <div className="flex flex-wrap justify-center gap-10">
          {doctors?.map((doctor, index) => (
            <div
              key={index}
              className="bg-white rounded-xl flex flex-col shadow flex-1 max-w-md" 
            >
              <div className="relative w-full pt-[75%]"> 
                <img
                  src={doctor.photo?.asset?.url || "https://placehold.co/400x300/CCCCCC/333333?text=Doctor+Image"}
                  alt={`Dr. ${doctor.name}`}
                  className="absolute inset-0 w-full h-full object-cover rounded-t-xl"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/400x300/CCCCCC/333333?text=Image+Error";
                  }}
                />
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {doctor.name}
                </h3>
                <p className="text-lg text-gray-600 mb-5">
                  {doctor.specialty}
                </p>
                
                <div className="mt-auto border-t border-gray-200 pt-4">
                  <p className="text-base text-gray-700 mb-1">
                    <a href={`tel:${doctor.phone?.trim()}`}>
                      {doctor.phone?.trim()}
                    </a>
                  </p>
                  <p className="text-base text-gray-700">
                    <a href={`mailto:${doctor.email?.trim()}`}>
                      {doctor.email?.trim()}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorCard;