import { Link } from "@remix-run/react";

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

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
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

        {/* Menu */}
        <nav className="hidden md:flex space-x-6">
          {menu?.map((item, idx) => (
            <div key={idx} className="relative group">
              <Link
                to={item.url ?? "#"}
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                {item.label}
                {item.hasSubmenu && (
                  <svg
                    className="w-3 h-3 inline-block ml-1 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 10 6"
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
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
          {icon1?.url && (
            <button>
              <img
                src={icon1.url}
                alt="Search"
                className="h-5 w-5 object-contain"
              />
            </button>
          )}
          {icon2?.url && (
            <button>
              <img
                src={icon2.url}
                alt="Cart"
                className="h-5 w-5 object-contain"
              />
            </button>
          )}
          {loginButton && (
            <Link
              to={loginButton.link ?? "#"}
              className="text-gray-700 font-medium hover:text-gray-900"
            >
              {loginButton.label}
            </Link>
          )}
          {getStartedButton && (
            <Link
              to={getStartedButton.link ?? "#"}
              className="bg-gray-900 text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-800"
            >
              {getStartedButton.label}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
