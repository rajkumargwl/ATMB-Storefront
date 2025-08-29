import React, { useState } from "react";

const NavBar = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  if (!data) return null;

  return (
    <header className="bg-white border-b border-gray-200">
      {/* Top Info Bar */}
      <div className="bg-gray-100 text-sm py-2 px-4 flex flex-wrap justify-between items-center">
        <span className="text-gray-700">{data.welcomeText}</span>
        <div className="flex space-x-6">
          {data.email && (
            <a href={`mailto:${data.email.trim()}`} className="text-gray-600 hover:text-[#7ab730]">
              📧 {data.email.trim()}
            </a>
          )}
          {data.phoneNumber && (
            <a href={`tel:${data.phoneNumber.trim()}`} className="text-gray-600 hover:text-[#7ab730]">
              📞 {data.phoneNumber.trim()}
            </a>
          )}
          {data.workingHours && (
            <span className="text-gray-600">🕒 {data.workingHours}</span>
          )}
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto py-3 px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="p-[6px]">
          {data.logoUrl ? (
            <img src={data.logoUrl} alt="Logo" className="h-12" />
          ) : (
            <span className="text-4xl font-bold first-letter:text-[#7ab730]">
              {data.siteTitle || "Health Center"}
            </span>
          )}
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
  <ul className="flex space-x-4">
    {data.menuLinks?.map((link) => (
      <li key={link._key}>
        <a
          href={link.url || "#"}
          className="text-gray-700 font-medium hover:text-[#7ab730]"
        >
          {link.title || "Menu"}
        </a>
      </li>
    ))}
  </ul>
          {data.appointmentButton && (
            <a
              href={data.appointmentButton.link}
              className="bg-[#7ab730] text-white px-6 py-3 rounded-xl hover:bg-[#6ca024]"
            >
              {data.appointmentButton.text}
            </a>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={toggleMenu} className="md:hidden text-gray-700">
          ☰
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-50 py-3 px-4 space-y-3">
          <ul className="flex flex-col space-y-2">
            {data.menuLinks?.map((link) => (
              <li key={link._key}>
                <a
                  href={link.url || "#"}
                  className="block text-gray-700 hover:text-[#7ab730]"
                >
                  {link.text || "Menu"}
                </a>
              </li>
            ))}
          </ul>
          {data.appointmentButton && (
            <a
              href={data.appointmentButton.link}
              className="block w-full text-center bg-[#7ab730] text-white px-6 py-2 rounded-full hover:bg-[#6ca024]"
            >
              {data.appointmentButton.text}
            </a>
          )}
        </div>
      )}
    </header>
  );
};

export default NavBar;
