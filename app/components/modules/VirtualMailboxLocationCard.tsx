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
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      {/* Location Header */}
      <div>
        <h2 className="text-xl font-semibold">{locationTitle}</h2>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <div
                key={tag.label || Math.random()}
                className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full text-sm"
              >
                {tag.icon?.url && (
                  <img
                    src={tag.icon.url}
                    alt={tag.label || 'tag'}
                    className="w-4 h-4"
                  />
                )}
                <span>{tag.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Services */}
      {services.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {services.map((service) => (
            <div
              key={service.serviceName || Math.random()}
              className="flex items-center space-x-1 bg-gray-50 px-3 py-1 rounded-full text-sm"
            >
              {service.icon?.url && (
                <img
                  src={service.icon.url}
                  alt={service.serviceName || 'service'}
                  className="w-4 h-4"
                />
              )}
              <span>{service.serviceName}</span>
            </div>
          ))}
        </div>
      )}

      {/* Address Preview */}
      <div className="border-dashed border-2 border-gray-300 rounded-md p-4">
        <h3 className="text-gray-500 text-sm mb-2">{sectionTitle}</h3>
        <p className="text-sm">
          {yourNameLabel && (
            <>
              <strong>{yourNameLabel}</strong>
              <br />
            </>
          )}
          {yourCompanyLabel && (
            <>
              <strong>{yourCompanyLabel}</strong>
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
  );
};

export default VirtualMailboxLocationCard;
