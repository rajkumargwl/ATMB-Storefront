import { Link } from "@remix-run/react";
import { useState } from "react";
import CloseIcon from "~/components/icons/CloseIcon";
import CartIcon from "~/components/icons/CartIcon";
import SearchIcon from "~/components/icons/SearchIcon";
import Logo from "~/components/media/logo.png";
import ArrowRightIcon from "~/components/icons/ArrowRightIcon";
import MenuIcon from "~/components/icons/MenuIcon"; // you’ll need to create/import hamburger icon
import ArrowDownIcon from '~/components/icons/ArrowDownIcon';

type HeaderProps = {
  data: {
    logo?: { url: string };
    menu: {
      hasSubmenu: boolean;
      label: string;
      url?: string | null;
      subMenu?: { label: string; url?: string | null }[] | null;
    }[];
    icon1?: { url: string };
    icon2?: { url: string };
    loginButton?: { label: string; link?: string | null };
    getStartedButton?: { label: string; link?: string | null };
  };
};

export default function Header({ data }: HeaderProps) {
  if (!data) return null;

  const { logo, menu, icon1, icon2, loginButton, getStartedButton } = data;
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <header className="w-full bg-white shadow-sm border-b border-[#DCDCDC]">
      <div className="max-w-[1240px] mx-auto flex items-center justify-between px-4 md:px-6 py-4">
        {/* Logo */}
        <div className="flex items-center">
          {logo?.url && (
            <Link to="/">
              <img
                src={logo.url}
                alt="Logo"
                className="h-10 w-auto object-contain"
              />
            </Link>
          )}
        </div>

        {/* Menu (Desktop only) */}
        <nav className="hidden md:flex space-x-6">
          {menu?.map((item, idx) => (
            <div key={idx} className="relative group">
              <Link
                to={item.label === "Solutions"
      ? "/solutions"
      : item.label === "Locations"
      ? "/locations"
      : item.url ?? "#"}
                className="text-gray-700 hover:text-gray-900 font-medium flex items-center gap-1"
              >
                {item.label}
                {item.hasSubmenu && (
                 <ArrowDownIcon />
                )}
              </Link>

              {/* Dropdown submenu */}
              {item.hasSubmenu && item.subMenu && (
                <div className="absolute left-0 mt-2 bg-white border shadow-md rounded-lg hidden group-hover:block">
                  <ul className="py-2">
                    {item.subMenu.map((sub, i) => (
                      <li key={i}>
                        <Link
                          to={sub.url ?? "#"}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          {icon1?.url && (
            <button onClick={() => setIsSearchOpen(true)}>
              <img
                src={icon1.url}
                alt="Search"
                className="h-5 w-5 object-contain"
              />
            </button>
          )}

          {/* Cart */}
          {icon2?.url && (
            <button>
              <img
                src={icon2.url}
                alt="Cart"
                className="h-5 w-5 object-contain"
              />
            </button>
          )}

          {/* Login / Get Started (Desktop only) */}
          <div className="hidden md:flex items-center space-x-4">
            {loginButton && (
              <Link
                to={loginButton.link ?? "#"}
                className="text-gray-700 font-medium hover:text-gray-900 border border-gray-400 px-7 py-3.5 rounded-md"
              >
                {loginButton.label}
              </Link>
            )}
            {getStartedButton && (
              <Link
                to={getStartedButton.link ?? "#"}
                className="bg-[#EE6D2D] text-white px-4 py-3 rounded-md font-medium flex items-center gap-2"
              >
                {getStartedButton.label} <ArrowRightIcon />
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {/* Mobile menu (Side Drawer) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Side Drawer */}
          <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-lg flex flex-col p-6">
            {/* Close Icon */}
            <button
              className="self-end mb-6"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <CloseIcon className="h-6 w-6 text-gray-700" />
            </button>

            {/* Navigation */}
            <nav className="flex flex-col space-y-4">
              {menu?.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.label === "Solutions" ? "/solutions": item.label === "Locations"? "/locations": item.url ?? "#"}
                  className="text-gray-700 hover:text-gray-900 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)} // auto close on link click
                >
                  {item.label}
                </Link>
              ))}

              {loginButton && (
                <Link
                  to={loginButton.link ?? "#"}
                  className="text-gray-700 font-medium hover:text-gray-900"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {loginButton.label}
                </Link>
              )}

              {getStartedButton && (
                <Link
                  to={getStartedButton.link ?? "#"}
                  className="bg-[#EE6D2D] text-white px-4 py-2 rounded-md font-medium flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {getStartedButton.label} <ArrowRightIcon />
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}


      {/* Search Popup Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50">
          <div className="bg-[#F9F9F9] rounded-md shadow-lg w-full max-w-[1208px] mt-5">
            
            {/* Header Row */}
            <div className="flex items-center justify-between px-6 py-4">
              {/* Logo */}
              <div className="flex items-center">
                <img
                  src={Logo}
                  alt="Logo"
                  className="h-13 w-auto"
                />
              </div>

              {/* Search Input */}
              <div className="flex-1 mx-6 relative">
                {/* Search Icon inside input */}
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <SearchIcon />
                </span>

                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter location, product, or keyword"
                  className="w-full pl-9 pr-9 py-4 text-sm text-gray-700 placeholder-gray-500 border border-[#DCDCDC] rounded-xl focus:outline-none"
                />

                {/* Close Icon inside input */}
                {query && (
                  <button
                    onClick={() => {
                      setQuery("");        // optional: clear search
                      setIsSearchOpen(false); // ✅ close popup
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <CloseIcon />
                  </button>
                )}
              </div>

              {/* Right Buttons */}
              <div className="flex items-center space-x-4">
                <button>
                  <CartIcon />
                  {/* <img src="cart-icon.svg" alt="Cart" className="h-5 w-5" /> */}
                </button>
                <button className="text-[#091019] font-medium px-6 py-3 text-[16px] rounded-sm border border-[#091019]">
                  Login
                </button>
                <button className="bg-[#EE6D2D] text-white px-4 py-3.5 text-[16px] rounded-md font-medium flex items-center gap-2">
                  Get Started <ArrowRightIcon />
                </button>
              </div>
            </div>

            {/* Outer Results Container (full width, background same as popup) */}
            {query && (
              <div className="ml-[151px] max-w-[718px] pb-4">
                <div className="bg-white border border-[#DCDCDC] rounded-lg shadow-md w-full">
                  <ul className="max-h-72 overflow-y-auto">
                    {[
                      "Anaheim, California, United States",
                      "Anaheim Resort, Anaheim California, United States",
                      "Anaheim Hills, Anaheim California, United States",
                      "Anaheim Colony, Anaheim California, United States",
                      "Anaheim Canyon Business Center, Anaheim California, United States",
                    ].map((item, idx) => (
                      <li
                        key={idx}
                        className="px-4 py-3 cursor-pointer hover:bg-gray-100 text-sm"
                      >
                        <span className="font-medium text-black">
                          {item.split(",")[0]}
                        </span>
                        <span className="ml-1 text-gray-600">
                          {item.replace(item.split(",")[0], "")}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
