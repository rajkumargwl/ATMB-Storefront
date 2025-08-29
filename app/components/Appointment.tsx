import React from 'react';

const Appointment = ({ appointment }) => {
  if (!appointment) return null;

  return (
    <section className="bg-white py-4 mt-4 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Right Side Image */}
          <div className="w-full flex justify-center items-center rounded-lg ">
            
              <img
               src={appointment?.image?.asset?.url}
                alt={appointment.heading || 'Appointment Image'}
                className="w-full h-full object-cover rounded-lg"
              />
            
          </div>

          {/* Form */}
          <div className="w-full bg-white p-8 rounded-lg">
            {appointment.heading && (
              <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4 text-center lg:text-left leading-tight">
                {appointment.heading}
              </h2>
            )}
            {appointment.subheading && (
              <p className="mb-8 text-gray-600 text-center lg:text-left">
                {appointment.subheading}
              </p>
            )}

            <form action="#" method="post" className="flex flex-wrap -mx-3 mb-6">
              
              {/* Name */}
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {appointment.nameLabel}
                </label>
                <input
                  type="text"
                  placeholder={appointment.namePlaceholder}
                  required
                  className="appearance-none block w-full bg-gray-100 text-gray-800 border border-gray-300 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 transition duration-300 ease-in-out"
                />
              </div>

              {/* Email */}
              <div className="w-full md:w-1/2 px-3">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {appointment.emailLabel}
                </label>
                <input
                  type="email"
                  placeholder={appointment.emailPlaceholder}
                  required
                  className="appearance-none block w-full bg-gray-100 text-gray-800 border border-gray-300 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 transition duration-300 ease-in-out"
                />
              </div>

              {/* Date */}
              <div className="w-full md:w-1/2 px-3 mt-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {appointment.dateLabel}
                </label>
                <input
                  type="date"
                  required
                  className="appearance-none block w-full bg-gray-100 text-gray-800 border border-gray-300 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 transition duration-300 ease-in-out shadow-sm"
                />
              </div>

              {/* Department */}
              <div className="w-full md:w-1/2 px-3 mt-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {appointment.departmentLabel}
                </label>
                <div className="relative">
                  <select
                    required
                    className="block appearance-none w-full bg-gray-100 border border-gray-300 text-gray-800 py-3 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-blue-500 transition duration-300 ease-in-out shadow-sm"
                  >
                    <option value="">{appointment.departmentPlaceholder}</option>
                    <option value="cardiology">Cardiology</option>
                    <option value="pregnancy">Pregnancy</option>
                    <option value="dental">Dental</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="w-full px-3 mt-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {appointment.phoneLabel}
                </label>
                <input
                  type="tel"
                  placeholder={appointment.phonePlaceholder}
                  required
                  className="appearance-none block w-full bg-gray-100 text-gray-800 border border-gray-300 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 transition duration-300 ease-in-out shadow-sm"
                />
              </div>

              {/* Message */}
              <div className="w-full px-3 mt-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {appointment.messageLabel}
                </label>
                <textarea
                  rows="4"
                  placeholder={appointment.messagePlaceholder}
                  className="appearance-none block w-full bg-gray-100 text-gray-800 border border-gray-300 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 transition duration-300 ease-in-out shadow-sm resize-y"
                ></textarea>
              </div>

              {/* Button */}
              <div className="w-full px-3 mt-8">
                <button
                  type="submit"
                  className="w-full bg-[#7ab730] text-white font-bold py-3 px-6 rounded-md"
                >
                  {appointment.buttonText}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
