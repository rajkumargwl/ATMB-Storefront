import { Link, useNavigate, useLocation } from "@remix-run/react";
import { useState, useEffect } from "react";
import CloseIcon from "~/components/icons/CloseIcon";
import CartIcon from "~/components/icons/CartIcon";
import SearchIcon from "~/components/icons/SearchIcon";
import Logo from "~/components/media/logo.png";
import ArrowRightIcon from "~/components/icons/ArrowRightIcon";
import MenuIcon from "~/components/icons/MenuIcon"; // you’ll need to create/import hamburger icon
import ArrowDownIcon from '~/components/icons/ArrowDownIcon';
import LeftArrowBlack from '~/components/icons/LeftArrowBlack';
import CloseIconBlack from '~/components/icons/CloseIconBlack';
import LeftChevron from '~/components/icons/LeftChevron';


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
  searchResults: any[];   // 👈 new
  searchQuery: string;    // 👈 new
  isLoggedIn: boolean;    // 👈 new
  customer?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;               // 👈 new
};


export default function Header({ data, searchResults, searchQuery, isLoggedIn, customer }: HeaderProps) {
  if (!data) return null;

  const { logo, menu, icon1, icon2, loginButton, getStartedButton } = data;
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const [results, setResults] = useState(searchResults || []);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const [skipSearchSync, setSkipSearchSync] = useState(false);
   useEffect(() => {
    setQuery(searchQuery || "");
    setResults(searchResults || []);
  }, [searchQuery, searchResults]);

  // Sync search input to URL
  useEffect(() => {
    if (skipSearchSync) return;

    const params = new URLSearchParams(location.search);

    if (!query.trim()) {
      params.delete("q");
      navigate(`?${params.toString()}`, { replace: true });
      setResults([]);
      return;
    }

    const timeout = setTimeout(() => {
      params.set("q", query);
      navigate(`?${params.toString()}`, { replace: true });
    }, 500);

    return () => clearTimeout(timeout);
  }, [query, navigate, location.search, skipSearchSync]);
    const handleResultClick = (item: any) => {
    setSkipSearchSync(true);
    setQuery("");
    setResults([]);
    setIsSearchOpen(false);

    if (item.type === "product") {
      navigate(`/products/${item.handle}`);
    } else if (item.type === "location") {
      const queryParam = item.name || item.city;
      navigate(`/sublocations?q=${encodeURIComponent(queryParam)}`);
    }
  };
  
  useEffect(() => {
  const params = new URLSearchParams(location.search);
  const newQuery = params.get("q") || "";

  setQuery(newQuery);
  setResults(searchResults || []); // new results from loader
}, [location.search, searchResults]);

useEffect(() => {
  function handleMessage(event: MessageEvent) {
    // Only accept from your domain
    if (event.origin !== "https://shopifystage.anytimehq.co") return;

    if (event.data?.token) {
      console.log("Received token:", event.data.token);

      // Redirect parent window with token in URL
      window.location.href = `/account/login?token=${event.data.token}`;
    }
  }

  window.addEventListener("message", handleMessage);
  return () => window.removeEventListener("message", handleMessage);
}, []);




  return (
    <header className="w-full bg-white px-5 border-b border-LightWhite lg:border-none">
      <div className="max-w-[1240px] mx-auto flex items-center justify-between py-5">
        <div className="flex items-center  gap-5 xl:gap-10">
          {/* Logo */}
          <div className="flex items-center">
            {logo?.url && (
              <Link to="/">
                <img
                  src={logo.url}
                  alt="Anytime Mailbox"
                
                  className="w-[80px] md:w-[101px] object-contain"
                />
              </Link>
            )}
          </div>


          {/* Menu (Desktop only) */}
          <nav className="hidden lg:flex space-x-2 xl:space-x-3">
            {menu?.map((item, idx) => (
              <div key={idx} className="relative group p-2">
                 <Link
                  to={item.label === "Solutions"
        ? "/solutions"
        : item.label === "Locations"
        ? "/locations"
          : item.label === "Blog"
          ? "/blogs"
        : item.url ?? "#"}
                  className="text-PrimaryBlack hover:text-PrimaryBlack font-normal flex items-center gap-[6px] text-[14px] md:text-[14px] xl:text-[16px] leading-[24px] tracking-[0px]"
                >
                  {item.label} 
                  {item.hasSubmenu && (
                  <ArrowDownIcon />
                  )}
                </Link> 


                {/* Dropdown submenu */}
                {item.hasSubmenu && item.subMenu && (
                  <div className="absolute z-[2] left-0 mt-2 bg-white border border-LightWhite shadow-md rounded-[6px] hidden group-hover:block min-w-[100px]">
                    <ul className="py-2">
                      {item.subMenu.map((sub, i) => (
                        <li key={i}>
                          <Link
                            to={sub.url ?? "#"}
                            className="block px-4 py-[6px] text-PrimaryBlack hover:text-PrimaryBlack font-normal text-[14px] md:text-[14px] xl:text-[16px] leading-[24px] tracking-[0px]"
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
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-6 lg:space-x-4 xl:space-x-7">
          {/* Search */}
          {icon1?.url && (
            <button onClick={() => setIsSearchOpen(true)}>
              <img
                src={icon1.url}
                alt="Search"
                title="Search"
                className="h-6 w-6 object-contain"
              />
            </button>
          )}

          {/* Cart */}
          {icon2?.url && (
            <button>
              <img
                src={icon2.url}
                alt="Cart"
                title="Cart"
                className="h-6 w-6 object-contain"
              />
            </button>
          )}

          {/* Login / Get Started (Desktop only) */}
          <div className="hidden lg:flex items-center space-x-4">
            {isLoggedIn ? (
               <Link
               to="/account"
               className="text-base font-medium text-PrimaryBlack hover:underline cursor-pointer"
             >
               Welcome, {customer?.firstName || "User"}
             </Link>
            ) : (
              loginButton && (
                // <Link
                //   to={loginButton.link ?? "/account/login"}
                //   className="rounded-[100px] font-normal leading-[16px] tracking-[0.08px] text-base text-PrimaryBlack border border-[#091019] px-9 py-[15px] transition-all hover:scale-[1.02] hover:bg-[#F3F3F3]"
                // >
                //   {loginButton.label}
                // </Link>
                <button
                className="w-fit rounded-[100px] font-normal leading-[16px] tracking-[0.08px] text-base text-PrimaryBlack border border-[#091019] px-9 py-[11px] md:py-[15px]"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  const ssoUrl = "https://store.xecurify.com/moas/broker/login/shopify/0dv7ud-pz.myshopify.com/account?idpname=custom_openidconnect_Okf";
                  // const ssoUrl = "http://localhost:3000/auth/callback?token=a0de2720bf15cbb431ba1441bebf4ea5"; // TODO: replace with your SSO URL
                  const width = 800;
                  const height = 600;
                  const left = (window.screen.width - width) / 2;
                  const top = (window.screen.height - height) / 2;
                  window.open(
                    ssoUrl,
                    "SSO Login",
                    `width=${width},height=${height},top=${top},left=${left},resizable,scrollbars=yes,status=1`
                  );
                }}
              >
                {loginButton.label}
              </button>
              )
            )}
            {!isLoggedIn && getStartedButton && (
              <Link
                to="create-account"
                className="rounded-[100px] bg-[#F60] font-Roboto text-white px-5 py-4 font-normal leading-[16px] tracking-[0.08px] text-base flex items-center gap-2 transition-all hover:scale-[1.02] hover:bg-[#DD5827]"
              >
                {getStartedButton.label} 
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden"
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
            <nav className="flex flex-col space-y-4 overflow-auto">
              {menu?.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.label === "Solutions" ? "/solutions": item.label === "Locations"? "/locations": item.url ?? "#"}
                  className="text-PrimaryBlack hover:text-PrimaryBlack font-normal text-base leading-[24px]"
                  onClick={() => setIsMobileMenuOpen(false)} // auto close on link click
                >
                  {item.label}
                </Link>
              ))}

              {loginButton && (
                <Link
                  to={loginButton.link ?? "#"}
                  className="w-fit rounded-[100px] font-normal leading-[16px] tracking-[0.08px] text-base text-PrimaryBlack border border-[#091019] px-9 py-[11px]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {loginButton.label}
                </Link>
              )}

              {getStartedButton && (
                <Link
                  to="create-account"
                  className="w-fit rounded-[100px] bg-[#F60] font-Roboto text-white px-5 py-3 font-normal leading-[16px] tracking-[0.08px] text-base flex items-center gap-2 transition-all hover:scale-[1.02] hover:bg-[#DD5827]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {getStartedButton.label} 
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}

     {/* Search Popup Modal */}
{/* Search Popup Modal */}
{isSearchOpen && (
  <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 md:px-5">
    <div className="h-[100vh] md:h-auto bg-white md:bg-[#F6F6F6] md:rounded-[20px] shadow-lg w-full max-w-[1010px] md:mt-5 md:px-4 md:pt-4 md:pb-6">
      
      {/* Header Row */}
      <div className="relative flex flex-row flex-wrap items-center justify-betwee gap-[10px] rounded-[100px] bg-white m-5 ml-[60px] md:m-[0px] px-5 py-3 md:py-2 md:pl-5 md:pr-2 border border-LightWhite">
        {/* Logo */}
        {/* <div className="flex items-center">
          <img
            src={Logo}
            alt="Logo"
            className="h-13 w-auto"
          />
        </div> */}

        {/* Search Input */}
        <button className="flex md:hidden absolute left-[-40px]">
            <LeftChevron />
          </button>
        <div className="flex-1 gap-[10px] relative flex items-center justify-center">
          <button className="hidden md:flex">
            <LeftArrowBlack />
          </button>
          <button className="flex md:hidden">
            <SearchIcon />
          </button>

          <input
            type="text"
            value={query}
            onChange={(e) => {
              const newValue = e.target.value;
              setQuery(newValue);

              const params = new URLSearchParams(location.search);
              if (newValue.trim()) {
                params.set("q", newValue);
              } else {
                params.delete("q");
              }

              navigate(`?${params.toString()}`, { replace: true });
            }}
            placeholder="Enter location, product, or keyword"
            className="w-full md:py-[11px] font-Roboto text-PrimaryBlack font-normal leading-[24px] text-[16px] tracking-[0px] placeholder:text-PrimaryBlack rounded-xl focus:outline-none placeholder:font-Roboto placeholder:font-normal placeholder:leading-[24px] placeholder:text-[16px] placeholder:tracking-[0px]"
          />

          {/* Close Icon inside input */}
          {/* {query && (
            <button
              onClick={() => {
                setQuery("");
                setIsSearchOpen(false);
                const params = new URLSearchParams(location.search);
                params.delete("q");
                navigate(`?${params.toString()}`, { replace: true });
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <CloseIcon />
            </button>
          )} */}
        </div>

        {/* Right Buttons */}
        <div className="flex items-center space-x-[10px] w-auto justify-center mt-[0px]">
          
          <button onClick={() => {
                setQuery("");
                setIsSearchOpen(false);
                const params = new URLSearchParams(location.search);
                params.delete("q");
                navigate(`?${params.toString()}`, { replace: true });
              }}>
            <CloseIconBlack />
          </button>
          {/* <Link
            to={loginButton?.link ?? "/account/login"}
            className="rounded-[100px] font-normal leading-[16px] tracking-[0.08px] text-base text-PrimaryBlack border border-[#091019] px-9 py-[15px]"
          >
            {loginButton?.label || "Login"}
          </Link> */}
          <Link
            to={getStartedButton?.link ?? "/account/register"}
            className="hidden md:flex rounded-[100px] bg-[#F60] font-Roboto text-white px-5 py-4 font-normal leading-[16px] tracking-[0.08px] text-base flex items-center gap-2 transition-all hover:scale-[1.02] hover:bg-[#DD5827]"
          >
            {getStartedButton?.label || "Get Started"} 
          </Link>
        </div>
      </div>

      {/* Results List */}
      {query && (
        <div className="md:pt-2">
          <div className="bg-white border-t md:border border-LightWhite md:rounded-[20px] shadow-md w-full p-5">
            <ul className="max-h-72 overflow-y-auto space-y-6">
              {results.length > 0 ? (
                results.map((item) => (
                  <li
                    key={item._id}
                    className="cursor-pointer font-Roboto leading-[27px] text-[18px] tracking-[0px]"
                    onClick={() => handleResultClick(item)}
                  >
                    {item.type === "location" ? (
                      <>
                        <span className="mr-2 font-medium text-PrimaryBlack">{item.name}</span>
                        <span className="text-LightGray font-normal">
                          {item.city}, {item.postalCode}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="mr-2 font-medium text-PrimaryBlack">{item.title}</span>
                        <span className="text-LightGray font-normal">(Product)</span>
                      </>
                    )}
                  </li>
                ))
              ) : (
                <li className="px-4 py-3 font-Roboto text-PrimaryBlack font-normal leading-[24px] text-[16px] tracking-[0px]">No results found</li>
              )}
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
