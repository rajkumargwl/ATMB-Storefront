import React from 'react';

interface Button {
  icon: {
    url: string;
  };
  link?: string | null;
}

interface DownloadMailboxRenterAppsProps {
  title: string;
  description: string;
  mockupImage: {
    url: string;
  };
  appStoreIcon: {
    url: string;
  };
  googlePlayIcon: {
    url: string;
  };
  appStoreLink?: string | null;
  googlePlayLink?: string | null;
}

const DownloadMailboxRenterApps: React.FC<DownloadMailboxRenterAppsProps> = ({
  title,
  description,
  mockupImage,
  appStoreIcon,
  googlePlayIcon,
  appStoreLink,
  googlePlayLink,
}) => {
  return (
    <section className="download-mailbox-renter-apps py-12 px-4 bg-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Mockup Image */}
        <div className="mockup w-full md:w-1/2 flex justify-center">
          <img
            src={mockupImage?.url}
            alt="App Mockup"
            className="rounded-lg shadow-lg max-w-xs md:max-w-sm lg:max-w-md"
          />
        </div>

        {/* Content */}
        <div className="content w-full md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-gray-700 mb-6">{description}</p>

          <div className="flex gap-4">
            {appStoreIcon?.url && (
              <a
                href={appStoreLink || '#'}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={appStoreIcon.url}
                  alt="Download on the App Store"
                  className="h-12 hover:scale-105 transition-transform"
                />
              </a>
            )}

            {googlePlayIcon?.url && (
              <a
                href={googlePlayLink || '#'}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={googlePlayIcon.url}
                  alt="Get it on Google Play"
                  className="h-12 hover:scale-105 transition-transform"
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadMailboxRenterApps;
