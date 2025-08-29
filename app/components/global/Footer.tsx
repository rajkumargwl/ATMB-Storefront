import React from "react";

const Footer = ({ data }) => {
  if (!data) return null;

  const {
    links = [],
    text = "",
    contactInfo,
    latestNews = [],
    openingHours = [],
      copyright = "",
    socialLinks = {},
  } = data;

  // Convert socialLinks object into an array
  const socialLinksArray = Object.entries(socialLinks).map(([label, url]) => ({
    label,
    url,
    icon: null, // If you have icons, replace this with actual icon paths
  }));

  return (
    <footer className="bg-gray-50 relative font-sans mr-auto">
      <div className="max-w-[90rem] mx-auto px-4">
        <div className="flex flex-wrap gap-8 pt-10">
          {/* Contact Info */}
          {contactInfo && (
            <div className="flex-1 sm:basis-1/2 lg:basis-1/4 mb-5">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Contact Info</h3>
              {contactInfo.description && (
                <p className="text-sm text-gray-600 mb-4">{contactInfo.description}</p>
              )}
              {contactInfo.phone && (
                <p className="flex items-center text-gray-700 text-sm mb-2">
                  <a href={`tel:${contactInfo.phone}`} className="hover:text-blue-600">
                    {contactInfo.phone}
                  </a>
                </p>
              )}
              {contactInfo.email && (
                <p className="flex items-center text-gray-700 text-sm mb-2">
                  <a href={`mailto:${contactInfo.email}`} className="hover:text-blue-600">
                    {contactInfo.email}
                  </a>
                </p>
              )}
            </div>
          )}

          {/* Latest News */}
          {latestNews.length > 0 && (
            <div className="flex-1 basis-full sm:basis-1/2 lg:basis-1/4 mb-5">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Latest News</h3>
              {latestNews.map((item, idx) => (
                <div className="flex items-center mb-4" key={idx}>
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-20 h-20 rounded-full object-contain mr-4"
                    />
                  )}
                  <div>
                    <p className="text-base font-bold text-gray-800 m-0">{item.title}</p>
                    {item.date && (
                      <p className="text-sm text-gray-500 mt-1">{item.date}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Opening Hours + Social Links */}
          {(openingHours.length > 0 || socialLinksArray.length > 0) && (
            <div className="flex-1 basis-full sm:basis-1/2 lg:basis-1/4 mb-5">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Opening Hours</h3>
              {openingHours.map((hour, idx) => (
                <p key={idx} className="text-sm text-gray-600 mb-2 flex justify-between">
                  {hour.day}{" "}
                  <span className="font-normal text-gray-800">{hour.time}</span>
                </p>
              ))}
              <div className="mt-5 flex gap-4">
                {socialLinksArray.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    aria-label={link.label}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:fill-blue-600"
                  >
                    {/* If you have icons, render them here */}
                    <span className="capitalize">{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-50 py-5 border-t border-gray-200 text-sm text-gray-600 w-full">
        <div className="max-w-[90rem] mx-auto px-4 flex flex-col md:flex-row justify-between items-center flex-wrap gap-4 md:gap-0">
          <div className="text-center md:text-left">{text}</div>
          <ul className="list-none p-0 m-0 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-sm">
            {links.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  className="hover:text-[#7ab730] text-gray-600 no-underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* Copyright */}
        {copyright && (
          <div className="mt-4 text-center text-xs text-gray-500">
            {copyright}
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
