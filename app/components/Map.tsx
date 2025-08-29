import React from 'react';

const MapSection = ({ map }) => {
  if (!map) return null; // handle no data case

  return (
    <section className="w-full bg-white">
      <h2 className="text-2xl font-bold mb-2">{map.heading}</h2>
      <p className="mb-4">{map.subheading}</p>
      <iframe
        src={map.embedUrl}
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        referrerPolicy="no-referrer-when-downgrade"
        className="block"
        title={`Google Map of ${map.heading}`}
      ></iframe>
      <address className="mt-4 not-italic">{map.address}</address>
    </section>
  );
};

export default MapSection;
