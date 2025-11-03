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
import {CountrySelector} from '~/components/global/CountrySelector';
import LanguageSwitcher from "./LanguageSwitcher";
import LanguageCurrencyMenu from '~/components/global/LanguageCurrencyMenu';
import {usePrefixPathWithLocale} from '~/lib/utils';
import GlobeIcon from '~/components/media/Globe.svg';

type HeaderProps = {
  data: {
    logo?: { url: string };
    menu: {
      label: string;
      url?: string | null;
      hasSubmenu: boolean;
      submenuType?: 'regular' | 'mega' | null;
      subMenu?: {
        label: string;
        url?: string | null;
      }[] | null;
      megaMenu?: {
        title: string;
        links: {
          label: string;
          url?: string | null;
        }[];
      }[] | null;
    }[];
    icon1?: { url: string };
    icon2?: { url: string };
    icon3?: { url: string };
    loginButton?: { label: string; link?: string | null };
    getStartedButton?: { label: string; link?: string | null };
  };
  searchResults: any[];   // 👈 new
  searchQuery: string;    // 👈 new
  isLoggedIn: boolean;    // 👈 new
  currentLanguage: string; // 👈 new
  customer?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;               // 👈 new
};


export default function Header({ data, searchResults, searchQuery, isLoggedIn, customer, currentLanguage }: HeaderProps) {
  if (!data) return null;

  const { logo, menu, icon1, icon2,icon3, loginButton, getStartedButton } = data;
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
  // useEffect(() => {
  //   if (skipSearchSync) return;

  //   const params = new URLSearchParams(location.search);

  //   // if (!query.trim()) {
  //   //   params.delete("q");
  //   //   navigate(`?${params.toString()}`, { replace: true });
  //   //   setResults([]);
  //   //   return;
  //   // }

  //   // const timeout = setTimeout(() => {
  //   //   params.set("q", query);
  //   //   navigate(`?${params.toString()}`, { replace: true });
  //   // }, 500);

  //   //return () => clearTimeout(timeout);
  // }, [query, navigate, location.search, skipSearchSync]);
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

useEffect(() => {
  if (isMobileMenuOpen) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }
}, [isMobileMenuOpen]);

  return (
    <header className=" relative z-[99] w-full bg-white px-5 border-b border-LightWhite lg:border-none">
      <div className="max-w-[1240px] mx-auto flex items-center justify-between py-5">
        <div className="flex items-center  gap-5 xl:gap-10">
          {/* Logo */}
          <div className="flex items-center">
            {logo?.url && (
              <Link to={usePrefixPathWithLocale('/')} >
                <img
                  src={logo.url}
                  alt="Anytime Mailbox"
                
                  className="w-[80px] md:w-[101px] object-contain"
                />
              </Link>
            )}
          </div>


          {/* Menu (Desktop only) */}
          <nav className={`hidden lg:flex ${currentLanguage === 'en-es' ? '' : 'space-x-2 xl:space-x-3' }`}>
            {menu?.map((item, idx) => (
              <div key={idx} className="relative group p-2">
                 <Link
                  to={
                    usePrefixPathWithLocale(item.label === "Solutions"
        ? "/solutionsvm"
        : item.label === "Locations"
        ? "/sublocations"
          : item.label === "Blog"
          ? "/blogs"
          : item.label === "About Us"
          ? "/about-us"
          : item.label === "Contact Us"
          ? "/contact"
        : item.url ?? "#")}
                  className={`text-PrimaryBlack hover:text-PrimaryBlack font-normal flex items-center gap-[6px] text-[14px] md:text-[14px] ${currentLanguage === 'en-es' ? 'xl:text-[15px]' : 'xl:text-[16px]' } leading-[24px] tracking-[0px]`}
                >
                  {item.label} 
                  {item.hasSubmenu && (
                 <span className="group-hover:transform group-hover:rotate-180 transition-all duration-500 ease-in-out"> <ArrowDownIcon /></span>
                  )}
                </Link> 


                {/* Dropdown submenu */}
                {item?.hasSubmenu && item?.submenuType === "mega" && item?.megaMenu?.length > 0 && (
                    <div className="absolute z-[2] left-0 pt-[15px] hidden group-hover:block min-w-[100px]">
                      <div className="min-w-[812px] p-6 rounded-[20px] border border-[#cccccc] bg-white shadow-[0_4px_14px_0_rgba(0,0,0,0.05)] grid md:grid-cols-2">
                        {/* {item?.subMenu.map((sub, i) => {
                          const localizedUrl = usePrefixPathWithLocale(sub?.url) ?? "#";

                          return (
                            <li key={i}>
                              <Link
                                to={localizedUrl}
                                className="block px-4 py-[6px] text-PrimaryBlack hover:text-PrimaryBlack font-normal text-[14px] md:text-[14px] xl:text-[16px] leading-[24px] tracking-[0px]"
                              >
                                {sub?.label}
                              </Link>
                            </li>
                          );
                        })} */}
                         {item?.megaMenu.map((group: any, gIdx: number) => (
                          <div
                            key={gIdx}
                            className={`${gIdx % 2 === 0 ? "pr-8 border-r border-LightWhite" : "pl-8"} ${
                              gIdx > 1 ? "mt-[15px]" : ""
                            }`}
                          >
                            <p className="mb-5 font-Roboto text-PrimaryBlack font-medium leading-[28px] md:leading-[28px] text-[20px] md:text-[20px] tracking-[0px]">
                              {group.title}
                            </p>
                            <ul className="flex flex-col gap-4">
                              {group.links?.map((link: any, lIdx: number) => (
                                <li key={lIdx}>
                                  <Link
                                    to={usePrefixPathWithLocale(link.url ?? "#")}
                                    aria-label={link.label}
                                    title={link.label}
                                    className="font-Roboto text-LightGray font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]"
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        {/* <div className="pr-8 border-r border-LightWhite">
                          <p className="mb-5 font-Roboto text-PrimaryBlack font-medium leading-[28px] md:leading-[28px] text-[20px] md:text-[20px] tracking-[0px]">Top US States</p>
                          <ul className="flex flex-col gap-4">
                            <li><Link to={`#`} className="font-Roboto text-LightGray font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">California</Link></li>
                            <li><Link to={`#`} className="font-Roboto text-LightGray font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">Florida</Link></li>
                            <li><Link to={`#`} className="font-Roboto text-LightGray font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">Texas</Link></li>
                            <li><Link to={`#`} className="font-Roboto text-LightGray font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">Georgia</Link></li>
                            <li><Link to={`#`} className="font-Roboto text-LightGray font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">New York</Link></li>
                            <li><Link to={`#`} className="font-Roboto text-LightGray font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">North Carolina</Link></li>
                            <li><Link to={`#`} className="font-Roboto text-LightGray font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">Wyoming</Link></li>
                            <li><Link to={`#`} className="font-Roboto text-LightGray font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">Delaware</Link></li>
                            <li><Link to={`#`} className="font-Roboto text-LightGray font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">Illinois</Link></li>
                            <li><Link to={`#`} className="font-Roboto text-LightGray font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">Colorado</Link></li>
                            <li><Link to="/country-location" className="font-Roboto text-LightGray font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">See All Locations</Link></li>
                          </ul>
                        </div>
                        <div className="pl-8">
                          <p className="mb-5 font-Roboto text-PrimaryBlack font-medium leading-[28px] md:leading-[28px] text-[20px] md:text-[20px] tracking-[0px]">Top Countries</p>
                          <ul className="flex flex-col gap-4">
                            <li><Link to={`#`} className="font-Roboto text-LightGray font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">United States</Link></li>
                            <li><Link to={`#`} className="font-Roboto text-LightGray font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">Canada</Link></li>
                            <li><Link to={`#`} className="font-Roboto text-LightGray font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">United Kingdom</Link></li>
                            <li><Link to={`#`} className="font-Roboto text-LightGray font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">Australia </Link></li>
                            <li><Link to={`#`} className="font-Roboto text-LightGray font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">Hong Kong </Link></li>
                            <li><Link to={`#`} className="font-Roboto text-LightGray font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">China</Link></li>
                            <li><Link to={`#`} className="font-Roboto text-LightGray font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">Ireland </Link></li>
                            <li><Link to={`#`} className="font-Roboto text-LightGray font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">Taiwan</Link></li>
                            <li><Link to={`#`} className="font-Roboto text-LightGray font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">Indonesia </Link></li>
                            <li><Link to={`#`} className="font-Roboto text-LightGray font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">Singapore </Link></li>                                                                                                                                          
                            <li><Link  to="/country-location" className="font-Roboto text-LightGray font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">See All Locations</Link></li>
                          </ul>
                        </div> */}
                      </div>
                    </div>
                  )}

                {item?.hasSubmenu && item?.submenuType === "regular" && item?.subMenu?.length > 0 && (
                   <div className="min-w-[130px] absolute z-[2] left-0 mt-2 bg-white border border-LightWhite shadow-md rounded-[6px] hidden group-hover:block min-w-[100px]">
                   <ul className="py-2">
                     {item?.subMenu.map((sub, i) => {
                       const localizedUrl = usePrefixPathWithLocale(sub?.url) ?? "#";
                       return (
                         <li key={i}>
                           <Link
                             to={localizedUrl}
                             className="block px-4 py-[6px] text-PrimaryBlack hover:text-PrimaryBlack font-normal text-[14px] md:text-[14px] xl:text-[16px] leading-[24px] tracking-[0px]"
                           >
                             {sub?.label}
                           </Link>
                         </li>
                       );
                     })}
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
             <Link
               to={usePrefixPathWithLocale('/cart')}>
              <img
                src={icon2.url}
                alt="Cart"
                title="Cart"
                className="h-6 w-6 object-contain"
              />
            </Link>
          )}
           {/* {icon3?.url && ( */}
            <>
            {/* <Link
               to="#">
              <img
                src={icon3.url}
                alt="Language"
                title="Language"
                className="h-6 w-6 object-contain hidden md:inline-block"
              />
            </Link> */}
            <LanguageCurrencyMenu  iconUrl={GlobeIcon} />
            </>
          {/* )} */}

          {/* Login / Get Started (Desktop only) */}
          <div className="hidden lg:flex items-center space-x-4">
            {isLoggedIn ? (
               <Link
               to={usePrefixPathWithLocale('/account')}
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
                // to={usePrefixPathWithLocale('create-account')}
                to="#"
                className="rounded-[100px] bg-[#F60] font-Roboto text-white px-5 py-4 font-normal leading-[16px] tracking-[0.08px] text-base flex items-center gap-2 transition-all hover:scale-[1.02] hover:bg-[#DD5827]"
              >
                {getStartedButton.label} 
              </Link>
            )}
          </div>
           {/* <LanguageSwitcher currentLanguage="en" /> */}
          {/* <CountrySelector align="left" /> */}

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
                  // to={usePrefixPathWithLocale('create-account')}
                  to="#"
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
            // to={usePrefixPathWithLocale('create-account')}
            to="#"
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