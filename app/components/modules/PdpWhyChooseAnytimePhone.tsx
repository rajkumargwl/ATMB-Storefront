import React from "react";

const PdpWhyChooseAnytimePhone = ({ data }) => {
  if (!data) return null;

  const { title, subtitle, features, mainImage } = data;

  return (
    <section
      className="bg-[#FF6600] text-white py-16 px-6 md:px-12"
      aria-labelledby="why-choose-anytime-phone"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Content */}
        <div className="flex-1 max-w-xl">
          <h2
            id="why-choose-anytime-phone"
            className="text-2xl md:text-3xl font-semibold mb-3 text-center lg:text-left"
          >
            {title}
          </h2>
          <p className="text-sm md:text-base text-center lg:text-left text-white/90 mb-8">
            {subtitle}
          </p>

          {/* Features List */}
          <ul className="flex flex-col gap-8">
            {features?.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-white rounded-full w-10 h-10 flex items-center justify-center">
                  <img
                    src={feature.icon?.url}
                    alt=""
                    className="w-5 h-5"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-base md:text-lg text-white">
                    {feature.heading}
                  </h3>
                  <p className="text-sm md:text-[15px] text-white/90 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={mainImage?.url}
            alt=""
            className="w-full max-w-md rounded-[12px] object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default PdpWhyChooseAnytimePhone;
