import React from 'react';
 
type Service = {
  icon?: { url?: string };
  serviceName?: string;
};
 
type Tag = {
  icon?: { url?: string };
  label?: string;
};
 
type AddressBlock = {
  _key: string;
  _type: string;
  children: { _key: string; _type: string; text: string }[];
  style: string;
};
 
type AddressPreview = {
  sectionTitle?: string;
  yourCompanyLabel?: string;
  yourNameLabel?: string;
  address?: AddressBlock[];
};
 
type LocationModule = {
  locationTitle?: string;
  services?: Service[];
  tags?: Tag[];
  addressPreview?: AddressPreview;
};
 
type Props = {
  module?: LocationModule;
};
 
const VirtualMailboxLocationCard: React.FC<LocationModule> = ({
  locationTitle = 'Untitled Location',
  services = [],
  tags = [],
  addressPreview = {},
}) => {
  const {
    sectionTitle = 'Address Preview',
    yourCompanyLabel = '',
    yourNameLabel = '',
    address = [],
  } = addressPreview;
 
  // Safely build address text
  const addressText = Array.isArray(address)
    ? address
        .map((block) =>
          block.children?.map((child) => child.text).join('') || ''
        )
        .join('\n')
    : '';
 
  return (
    <div className="px-5 py-[24px] md:py-[40px]">
      <div className='max-w-[1240px] mx-auto flex flex-col md:flex-row gap-[16px] md:gap-[40px]'>
      {/* Location Header */}
      <div className='w-full md:w-[60.14%] flex flex-col'>
        <h2 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[38.4px] text-[24px] md:text-[32px] tracking-[-0.36px] md:tracking-[-0.48px]">{locationTitle}</h2>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-3 mb-4 md:mb-6">
            {tags.map((tag) => (
              <div
                key={tag.label || Math.random()}
                className="flex items-center gap-2"
              >
                {tag.icon?.url && (
                  <img
                    src={tag.icon.url}
                    alt={tag.label || 'tag'}
                    className="w-4 h-4"
                  />
                )}
                <span className='uppercase font-Roboto text-LightGray font-medium leading-[12px] md:leading-[12px] text-[12px] md:text-[12px] tracking-[0.36px] '>{tag.label}</span>
              </div>
            ))}
          </div>
        )}
      
 
      {/* Services */}
      {services.length > 0 && (
        <div className="flex flex-col md:flex-row flex-wrap rounded-[12px] bg-[#F6F6F6] px-6 py-5 gap-y-4 gap-x-6">
          {services.map((service) => (
            <div
              key={service.serviceName || Math.random()}
              className="flex items-center gap-2"
            >
              {service.icon?.url && (
                <img
                  src={service.icon.url}
                  alt={service.serviceName || 'service'}
                  className="w-[18px] h-[18px]"
                />
              )}
              <span className='font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px] '>{service.serviceName}</span>
            </div>
          ))}
        </div>
      )}
      </div>
 
      {/* Address Preview */}
      <div className="w-full md:w-[39.86%] rounded-[20px] border border-dashed border-[#091019] bg-[rgba(255,255,255,0.6)] backdrop-blur-[6.5px] px-[24px] md:px-[40px] py-[34px]">
        <h3 className="capitalize font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px] mb-5">{sectionTitle}</h3>
        <p className="font-Roboto text-LightGray font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">
          {yourNameLabel && (
            <>
              <strong className='font-Roboto text-PrimaryBlack font-medium leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]'>{yourNameLabel}</strong>
              <br />
            </>
          )}
          {yourCompanyLabel && (
            <>
              <strong className='font-Roboto text-PrimaryBlack font-medium leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]'>{yourCompanyLabel}</strong>
              <br />
            </>
          )}
          {addressText
            ? addressText.split('\n').map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  <br />
                </React.Fragment>
              ))
            : 'No address available'}
        </p>
      </div>
      </div>
    </div>
  );
};
 
export default VirtualMailboxLocationCard;