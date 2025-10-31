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
  console.log("featureeeeeee",JSON.stringify(services,null,2));
 
  return (
    <div className="px-5 pt-[24px] md:pt-[32px] pb-[24px] md:pb-[40px] relative z-[2] bg-white">
      <div className="max-w-[1240px] mx-auto">
        <nav className="flex items-center flex-row gap-[7px] mb-6" aria-label="Breadcrumb">
                <ol className="flex items-center flex-row gap-[7px]">
                  <li><Link to={`#`}><span className="font-Roboto text-LightGray font-normal leading-[14px] md:leading-[14px] text-[14px] md:text-[14px] tracking-[0.07px]">Virtual Mailbox</span> </Link></li>
                  <li className='flex items-center flex-row gap-[7px]'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M10.6813 7.71732C10.8362 7.87232 10.8362 8.12732 10.6813 8.28232L6.68125 12.2823C6.52625 12.4373 6.27125 12.4373 6.11625 12.2823C5.96125 12.1273 5.96125 11.8723 6.11625 11.7173L9.83375 7.99982L6.11625 4.28232C5.96125 4.12732 5.96125 3.87232 6.11625 3.71732C6.27125 3.56232 6.52625 3.56232 6.68125 3.71732L10.6813 7.71732Z" fill="#091019"/>
                    </svg>
                    <Link to={`/sublocations`}><span className="font-Roboto text-LightGray font-normal leading-[14px] md:leading-[14px] text-[14px] md:text-[14px] tracking-[0.07px]">Locations</span> </Link></li>
                  <li className="flex items-center flex-row gap-[7px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M10.6813 7.71732C10.8362 7.87232 10.8362 8.12732 10.6813 8.28232L6.68125 12.2823C6.52625 12.4373 6.27125 12.4373 6.11625 12.2823C5.96125 12.1273 5.96125 11.8723 6.11625 11.7173L9.83375 7.99982L6.11625 4.28232C5.96125 4.12732 5.96125 3.87232 6.11625 3.71732C6.27125 3.56232 6.52625 3.56232 6.68125 3.71732L10.6813 7.71732Z" fill="#091019"/>
                    </svg>
                      <Link to={`#`} aria-current="page"><span className="font-Roboto text-PrimaryBlack font-normal leading-[14px] md:leading-[14px] text-[14px] md:text-[14px] tracking-[0.07px]"> {location?.displayName}</span> </Link></li>
                </ol>  
        </nav>
      </div>  
      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row gap-[16px] md:gap-[40px]">
        {/* Left: Location Title and Features */}
        <div className="w-full md:w-[60.14%] flex flex-col">
          <h1 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[38.4px] text-[24px] md:text-[32px] tracking-[-0.36px] md:tracking-[-0.48px]">
            {location?.displayName}
          </h1>
 
          <div className="flex flex-wrap gap-4 mt-3 mb-4 md:mb-6">
            {isTopRated && (
              <>
              <div className="flex items-center gap-2">
                <img src={Toprated} alt="Top Rated" className="w-4 h-4"/>
                <span className="uppercase font-Roboto text-LightGray font-medium leading-[12px] md:leading-[12px] text-[12px] md:text-[12px] tracking-[0.36px]">TOP RATED</span>
              </div>
               <span className="w-[1px] h-[13px] text-LightWhite">|</span>
          </>
            )}
           
            <div className="flex items-center gap-2">
              <img src={Premium} alt="Premium Address" className="w-4 h-4" />
              <span className="uppercase font-Roboto text-LightGray font-medium leading-[12px] md:leading-[12px] text-[12px] md:text-[12px] tracking-[0.36px]">PREMIUM ADDRESS</span>
            </div>
          </div>
 
          {/* Features */}
          <div className="flex flex-col flex-wrap rounded-[12px] bg-[#F6F6F6] px-6 py-5 gap-4">
            <h3 className="font-Roboto text-LightGray font-medium leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px]">Services</h3>
            <div className="flex flex-col md:flex-row md:items-center gap-x-6 gap-y-4 flex-wrap">
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
                      className="flex items-center gap-2"
                    >
                      <img
                        src={matchedService?.icon || defaultIcon}
                        alt={feature.label}
                        className="w-[18px] h-[18px]"
                      />
                      <span className="font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">{feature.label}</span>
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
                className="flex items-center gap-2"
              >
                <img
                  src={matchedService?.icon ||defaultIcon}
                  alt={feature}
                  className="w-[18px] h-[18px]"
                />
                <span className="font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">{feature}</span>
              </div>
            );
          })
        ) : (
          <p className="font-Roboto text-LightGray font-medium leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px]">No services available</p>
        )}
  

            </div>
          </div>
        </div>
 
        {/* Right: Address Preview */}
        <div className="w-full md:w-[39.86%] rounded-[20px] border border-dashed border-[#091019] bg-[rgba(255,255,255,0.6)] backdrop-blur-[6.5px] px-[24px] md:px-[40px] py-[34px]">
          <h3 className="capitalize font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px] mb-5">
            Your Real Street Address Preview
          </h3>
          <p className="mb-1 font-Roboto text-PrimaryBlack font-medium leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">Your Name</p>
          <p className="mb-1 font-Roboto text-PrimaryBlack font-medium leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">
            Your Company Name
          </p>
          <p className="font-Roboto text-LightGray font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">{location?.addressLine1}</p>
          <p className="font-Roboto text-LightGray font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">
            Ste #<span className="text-PrimaryBlack">MAILBOX</span>
          </p>
          <p className="font-Roboto text-LightGray font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">
            {location?.city}, {location?.state} {location?.postalCode}
          </p>
          <p className="font-Roboto text-LightGray font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">{location?.country}</p>
        </div>
      </div>
    </div>
  );
}
 