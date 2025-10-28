import React from "react";
import { Link } from "react-router-dom";
import Toprated from "~/components/icons/Badge.png";
import Premium from "~/components/icons/Crown.png";
import defaultIcon from "~/components/icons/default.png";

type LocationInfoProps = {
  location: any;
  services: { name: string; icon: string }[];
  servicesIcons: { name: string; icon: string }[];
};

export default function LocationInfo({ location, services, servicesIcons }: LocationInfoProps) {
  const isTopRated = location?.ratingList?.some(
    (r: any) => r.type === "TOPRATED"
  );

  return (
    <div className="max-w-[1240px] mx-auto mt-12 px-5 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left: Location Title and Features */}
        <div>
          <h2 className="text-[28px] font-bold text-PrimaryBlack mb-2">
            {location?.displayName}
          </h2>

          <div className="flex items-center gap-3 mb-4">
            {isTopRated && (
              <>
              <div className="flex items-center gap-1 text-[#FF7A00] font-medium text-sm">
                <img src={Toprated} alt="Top Rated" className="w-4 h-4"/>
                <span>TOP RATED</span>
              </div>
               <span className="text-gray-400">|</span>
          </>
            )}
           
            <div className="flex items-center gap-1 text-[#0070F3] font-medium text-sm">
              <img src={Premium} alt="Premium Address" className="w-4 h-4" />
              <span>PREMIUM ADDRESS</span>
            </div>
          </div>

          {/* Features */}
          <div className="bg-[#F8F8F8] border border-[#EAEAEA] rounded-[12px] p-6">
            <h3 className="text-gray-700 font-semibold mb-3">Services</h3>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {/* {location?.featureList?.length > 0 ? (
                location.featureList.map((feature: any) => {
                  const matchedService = services.find(
                    (service) =>
                      service.name.toLowerCase() ===
                      feature.label.toLowerCase()
                  );
                  return (
                    <div
                      key={feature._key}
                      className="flex items-center gap-2 text-[16px] text-gray-800"
                    >
                      <img
                        src={matchedService?.icon || defaultIcon}
                        alt={feature.label}
                        className="w-5 h-5"
                      />
                      <span>{feature.label}</span>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500 text-sm">No services available</p>
              )} */}
              {services.length > 0 ? (
          services.map((feature) => {
            const matchedService = servicesIcons.find(
              (service) =>
                service.name.toLowerCase() === feature.toLowerCase()
            );

            return (
              <div
                key={feature._key}
                className="flex items-center gap-2 text-[16px] text-gray-800"
              >
                <img
                  src={matchedService?.icon ||defaultIcon}
                  alt={feature}
                  className="w-5 h-5"
                />
                <span>{feature}</span>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-sm">No services available</p>
        )}
            </div>
          </div>
        </div>

        {/* Right: Address Preview */}
        <div className="border border-dashed border-gray-400 rounded-[12px] p-6">
          <h3 className="text-gray-600 font-medium mb-4">
            Your Real Street Address Preview
          </h3>
          <p className="text-PrimaryBlack font-semibold">Your Name</p>
          <p className="text-PrimaryBlack font-semibold mb-2">
            Your Company Name
          </p>
          <p>{location?.addressLine1}</p>
          <p>
            Ste #<span className="font-semibold">MAILBOX</span>
          </p>
          <p>
            {location?.city}, {location?.state} {location?.postalCode}
          </p>
          <p>{location?.country}</p>
        </div>
      </div>
    </div>
  );
}
