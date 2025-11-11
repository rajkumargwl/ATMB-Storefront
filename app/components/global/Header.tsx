import { Link, useNavigate, useLocation } from "@remix-run/react";
import { useState, useEffect, useRef } from "react";
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
import {DEFAULT_LOCALE, usePrefixPathWithLocale} from '~/lib/utils';
import GlobeIcon from '~/components/media/Globe.svg';
import { useRootLoaderData } from "~/root";

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
  cartCount: number;    // 👈 new
};


export default function Header({ data, searchResults, searchQuery, isLoggedIn, customer, currentLanguage, cartCount }: HeaderProps) {
  if (!data) return null;

  const { logo, menu, icon1, icon2,icon3, loginButton, getStartedButton } = data;
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [results, setResults] = useState<any[]>(searchResults || []);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const [skipSearchSync, setSkipSearchSync] = useState(false);
  useEffect(() => {
    setQuery(searchQuery || "");
    setResults(searchResults || []);
  }, [searchQuery, searchResults]);

  /** 🧹 Enhanced local filtering: country, state, city, product
      -> IMPORTANT: annotate each item with `matchType` so UI / navigation know
         whether item was categorized as country/state/city/address/product. */
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase().replace(/\s*,\s*/g, ",").trim();

    // Step 1: filter broadly for matches
    const filtered = (searchResults || []).filter((item) => {
      // product type quick match
      if (item.type === "product" && (item.title || "").toLowerCase().includes(q)) return true;

      const fields = [
        item.addressLine1,
        item.city,
        item.state,
        item.country,
        item.postalCode,
        item.name,
        item.title,
      ]
        .filter(Boolean)
        .map((f: string) => f.toLowerCase());

      const directMatch = fields.some((f: string) => f.includes(q));
      if (directMatch) return true;

      const full = fields.join(", ");
      return full.includes(q);
    });

    // Step 2: split into categories (priority preserved)
    const countryMatches = filtered.filter((i) => i.country?.toLowerCase().includes(q));
    const stateMatches = filtered.filter(
      (i) =>
        i.state?.toLowerCase().includes(q) &&
        !countryMatches.includes(i)
    );
    const cityMatches = filtered.filter(
      (i) =>
        i.city?.toLowerCase().includes(q) &&
        !countryMatches.includes(i) &&
        !stateMatches.includes(i)
    );
    // everything else (addresses, misc) go to addressMatches
    const addressMatches = filtered.filter(
      (i) =>
        !countryMatches.includes(i) &&
        !stateMatches.includes(i) &&
        !cityMatches.includes(i)
    );

    // Step 3: build global unique key for every item
    const makeKey = (i: any) =>
      [
        i.country?.toLowerCase?.() ?? "",
        i.state?.toLowerCase?.() ?? "",
        i.city?.toLowerCase?.() ?? "",
        (i.addressLine1 || "").toLowerCase?.() ?? "",
        i.postalCode ?? "",
        (i.title || "").toLowerCase?.() ?? "",
        i._id ?? "",
      ]
        .filter(Boolean)
        .join("|");

    // Step 4: deduplicate per category and tag matchType
    const uniqueWithType = (arr: any[], type: string) =>
      Array.from(
        new Map(
          arr.map((i) => {
            const k = makeKey(i);
            // create copy and attach matchType (do not mutate original)
            return [k, { ...i, matchType: type }];
          })
        ).values()
      );

    const uniqueCountries = uniqueWithType(countryMatches, "country");
    const uniqueStates = uniqueWithType(stateMatches, "state");
    const uniqueCities = uniqueWithType(cityMatches, "city");
    const uniqueAddresses = uniqueWithType(addressMatches, "address");

    // Step 5: combine in priority order and dedupe globally again (cross-category)
    const combined = [
      ...uniqueCountries,
      ...uniqueStates,
      ...uniqueCities,
      ...uniqueAddresses,
    ];

    const uniqueAllMap = new Map<string, any>();
    for (const item of combined) {
      const key = makeKey(item);
      // if we already have the key, keep the one that appears earlier (priority preserved),
      // but we also prefer to keep the existing matchType (already set)
      if (!uniqueAllMap.has(key)) {
        uniqueAllMap.set(key, item);
      }
    }
    const uniqueAll = Array.from(uniqueAllMap.values());

    // Optional Step 6: sort alphabetically by reasonable display field
    const sorted = uniqueAll.sort((a, b) => {
      const aKey = (
        a.matchType === "country" ? a.country :
        a.matchType === "state" ? `${a.state} ${a.country}` :
        a.matchType === "city" ? `${a.city} ${a.state} ${a.country}` :
        a.matchType === "address" ? `${a.addressLine1} ${a.city} ${a.state}` :
        a.title || ""
      ).toString().toLowerCase();

      const bKey = (
        b.matchType === "country" ? b.country :
        b.matchType === "state" ? `${b.state} ${b.country}` :
        b.matchType === "city" ? `${b.city} ${b.state} ${b.country}` :
        b.matchType === "address" ? `${b.addressLine1} ${b.city} ${b.state}` :
        b.title || ""
      ).toString().toLowerCase();

      return aKey.localeCompare(bKey);
    });

    setResults(sorted);
  }, [query, searchResults]);

  /** 🔗 URL sync (with debounce) */
  useEffect(() => {
    if (skipSearchSync) return;
    const params = new URLSearchParams(location.search);

    if (!query.trim()) {
      params.delete("q");
      navigate(`?${params.toString()}`, { replace: true });
      return;
    }

    const t = setTimeout(() => {
      params.set("q", query);
      navigate(`?${params.toString()}`, { replace: true });
    }, 500);

    return () => clearTimeout(t);
  }, [query, navigate, location.search, skipSearchSync]);

  /** 🧭 Handle result click using matchType (reliable) */
  const handleResultClick = (item: any) => {
    setSkipSearchSync(true);
    setQuery("");
    setResults([]);
    setIsSearchOpen(false);

    const matchType = item.matchType || "address"; // fallback

    if (item.type === "product") {
      navigate(`/products/${item.handle}`);
      return;
    }

    switch (matchType) {
      case "country":
        navigate(`/l/country/${encodeURIComponent(item.country)}`);
        break;
      case "state":
        navigate(
          `/l/${encodeURIComponent(item.country)}/${encodeURIComponent(item.state)}`
        );
        break;
      case "city":
        navigate(`/sublocations?q=${encodeURIComponent(item.city)}`);
        break;
      case "address":
      default:
        // address should navigate to sublocations with addressLine1 (or city fallback)
        navigate(`/sublocations?q=${encodeURIComponent(item.addressLine1 || item.city || "")}`);
        break;
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

 const buildLocalizedUrl = usePrefixPathWithLocale2(); 
 const [openItem, setOpenItem] = useState<string | null>(null);
 const navRef = useRef(null);

 useEffect(() => {
   function handleClickOutside(e) {
     if (navRef.current && !navRef.current.contains(e.target)) {
       // Hide all open submenus if clicked outside
       document.querySelectorAll(".submenu").forEach((submenu) => {
         submenu.classList.add("hidden");
       });
     }
   }
   document.addEventListener("mousedown", handleClickOutside);
   return () => document.removeEventListener("mousedown", handleClickOutside);
 }, []);

  return (
    <header className=" relative z-[99] w-full bg-white px-5 border-b border-LightWhite lg:border-none">
      <div className="max-w-[1240px] mx-auto flex items-center justify-between py-5">
        <div className="flex items-center  gap-5 xl:gap-10">
          {/* Logo */}
          <div className="flex items-center">
            {logo?.url && (
              <Link to={buildLocalizedUrl('/')} >
                <img
                  src={logo.url}
                  alt="Anytime Mailbox"
                  className="w-[80px] md:w-[101px] object-contain"
                />
              </Link>
            )}
          </div>

          {/* Menu (Desktop only) */}
          <nav
      ref={navRef}
      className={`hidden lg:flex ${
        currentLanguage === "en-es" ? "" : "space-x-2 xl:space-x-3"
      }`}
    >
      {menu?.map((item, idx) => (
        <div key={idx} className="relative group p-2">
         <Link
            to={buildLocalizedUrl(
              item.label === "Solutions"
                ? "/solutionsvm"
                : item.label === "Locations"
                ? "/sublocations"
                : item.label === "Blog"
                ? "/blogs"
                : item.label === "About Us"
                ? "/about-us"
                : item.label === "Contact Us"
                ? "/contact"
                : item.url ?? "#"
            )}
            className={`text-PrimaryBlack transition-all hover:text-DarkOrange font-normal flex items-center gap-[6px] text-[14px] md:text-[14px] ${
              currentLanguage === "en-es" ? "xl:text-[15px]" : "xl:text-[16px]"
            } leading-[24px] tracking-[0px]`}
            aria-haspopup={item.hasSubmenu ? "true" : undefined}
            aria-expanded="false"
            onKeyDown={(e) => {
              const submenu = e.currentTarget.parentElement?.querySelector(".submenu");
              if (!submenu) return;

              // Open or close menu with Enter or Space
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                const isHidden = submenu.classList.contains("hidden");
                submenu.classList.toggle("hidden");
                e.currentTarget.setAttribute("aria-expanded", String(isHidden));

                if (!isHidden) return; // Only add listeners when menu is open

                // Add key listener for ESC and TAB navigation
                const handleKey = (ev: KeyboardEvent) => {
                  if (ev.key === "Escape") {
                    submenu.classList.add("hidden");
                    e.currentTarget.setAttribute("aria-expanded", "false");
                    e.currentTarget.focus();
                    document.removeEventListener("keydown", handleKey);
                  }

                  if (ev.key === "Tab") {
                    // Delay check after focus changes
                    requestAnimationFrame(() => {
                      if (!submenu.contains(document.activeElement)) {
                        submenu.classList.add("hidden");
                        e.currentTarget.setAttribute("aria-expanded", "false");
                        document.removeEventListener("keydown", handleKey);
                      }
                    });
                  }
                };

                document.addEventListener("keydown", handleKey);
              }

              // Also close if ESC pressed while trigger is focused
              if (e.key === "Escape") {
                submenu.classList.add("hidden");
                e.currentTarget.setAttribute("aria-expanded", "false");
                e.currentTarget.focus();
              }
            }}
            onBlur={(e) => {
              const parent = e.currentTarget.parentElement;
              setTimeout(() => {
                if (!parent?.contains(document.activeElement)) {
                  parent?.querySelector(".submenu")?.classList.add("hidden");
                  e.currentTarget.setAttribute("aria-expanded", "false");
                }
              }, 100);
            }}
          >
            {item.label}
            {item.hasSubmenu && (
              <span className="group-hover:transform group-hover:rotate-180 transition-all duration-500 ease-in-out">
                <ArrowDownIcon />
              </span>
            )}
          </Link>


          {/* Mega Menu */}
          {item?.hasSubmenu &&
            item?.submenuType === "mega" &&
            item?.megaMenu?.length > 0 && (
              <div className="submenu absolute z-[2] left-0 pt-[15px] hidden group-hover:block min-w-[100px]">
                <div className="min-w-[812px] p-6 rounded-[20px] border border-[#cccccc] bg-white shadow-[0_4px_14px_0_rgba(0,0,0,0.05)] grid md:grid-cols-2">
                  {item?.megaMenu.map((group, gIdx) => (
                    <div
                      key={gIdx}
                      className={`${
                        gIdx % 2 === 0
                          ? "pr-8 border-r border-LightWhite"
                          : "pl-8"
                      } ${gIdx > 1 ? "mt-[15px]" : ""}`}
                    >
                      <p className="mb-5 font-Roboto text-PrimaryBlack font-medium leading-[28px] text-[20px] tracking-[0px]">
                        {group.title}
                      </p>
                      <ul className="flex flex-col gap-4">
                        {group.links?.map((link, lIdx) => (
                          <li key={lIdx}>
                            <Link
                              to={buildLocalizedUrl(link.url ?? "#")}
                              aria-label={link.label}
                              title={link.label}
                              className="font-Roboto text-LightGray font-normal leading-[24px] text-[16px] tracking-[0px] transition-all hover:text-DarkOrange"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Regular Submenu */}
          {item?.hasSubmenu &&
            item?.submenuType === "regular" &&
            item?.subMenu?.length > 0 && (
              <div className="submenu min-w-[130px] absolute z-[2] left-0 mt-2 bg-white border border-LightWhite shadow-md rounded-[6px] hidden group-hover:block">
                <ul className="py-2">
                  {item?.subMenu.map((sub, i) => {
                    const localizedUrl = buildLocalizedUrl(sub?.url) ?? "#";
                    return (
                      <li key={i}>
                        <Link
                          to={localizedUrl}
                          className="block px-4 py-[6px] text-PrimaryBlack transition-all hover:text-DarkOrange font-normal text-[14px] md:text-[14px] xl:text-[16px] leading-[24px] tracking-[0px]"
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
              to={buildLocalizedUrl('/cart')}
              className="relative flex items-center"
            >
              <img
                src={icon2.url}
                alt="Cart"
                title="Cart"
                className="h-6 w-6 object-contain"
              />

              {cartCount > 0 && (
                <span
                  className="
                    absolute -top-1.5 -right-2
                    flex items-center justify-center
                    h-4 min-w-[16px]
                    px-1.5
                    rounded-full
                    bg-[#FF6600]
                    text-[10px] font-semibold text-white
                    leading-none
                    shadow-md
                  "
                >
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>
          )}

          <LanguageCurrencyMenu  iconUrl={GlobeIcon} />

          <div className="hidden lg:flex items-center space-x-4">
            {isLoggedIn ? (
               <Link
               to={buildLocalizedUrl('/account')}
               className="text-base font-medium text-PrimaryBlack hover:underline cursor-pointer"
             >
               Welcome, {customer?.firstName || "User"}
             </Link>
            ) : (
              loginButton && (
                <button
                className="w-fit rounded-[100px] font-normal leading-[16px] tracking-[0.08px] text-base text-PrimaryBlack border border-[#091019] px-9 py-[11px] md:py-[15px] transition-all  hover:bg-PrimaryBlack hover:text-white"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  const ssoUrl = "https://store.xecurify.com/moas/broker/login/shopify/0dv7ud-pz.myshopify.com/account?idpname=custom_openidconnect_Okf";
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
                to={buildLocalizedUrl(getStartedButton?.link ?? "#")}
                className="rounded-[100px] bg-[#F60] font-Roboto text-white px-5 py-4 font-normal leading-[16px] tracking-[0.08px] text-base flex items-center gap-2 transition-all hover:scale-[1.02] hover:bg-[#DD5827]"
              >
                {getStartedButton?.label} 
              </Link>
            )}
          </div>
      

          {/* Mobile menu button */}
          {/* <button
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <MenuIcon />
          </button> */}
            <button
    aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
    title={isMobileMenuOpen ? "Close menu" : "Open menu"} // tooltip for browsers
    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
    className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F60] lg:hidden"
  >
    <MenuIcon aria-hidden="true" />

  </button>

  {/* Custom tooltip (visible on hover or focus) */}
  <span
    role="tooltip"
    className="
      absolute left-1/2 -translate-x-1/2 top-full mt-1
      text-xs text-white bg-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 group-focus-within:opacity-100
      transition-opacity duration-200
    "
  >
    {isMobileMenuOpen ? "Close menu" : "Open menu"}
  </span>
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
              {menu?.map((item, idx) => {
                const isOpen = openItem === item.label;
                return (
                  <div key={idx} className="pb-3">
                    {/* Main item */}
                    <button
                      className="w-full flex justify-between items-center text-left text-PrimaryBlack font-normal text-base leading-[24px]"
                      onClick={() => {
                        if (item.hasSubmenu) {
                          setOpenItem(isOpen ? null : item.label);
                        } else {
                          setIsMobileMenuOpen(false);
                          navigate(
                            buildLocalizedUrl(
                              item.label === "Solutions"
                                ? "/solutionsvm"
                                : item.label === "Locations"
                                ? "/sublocations"
                                : item.url ?? "#"
                            )
                          );
                        }
                      }}
                    >
                      {item.label}
                      {item.hasSubmenu && (
                        <span
                          className={`transform transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        >
                          <ArrowDownIcon />
                        </span>
                      )}
                    </button>

                    {/* Regular Submenu */}
                    {item.hasSubmenu &&
                      item.submenuType === "regular" &&
                      isOpen &&
                      item.subMenu?.length > 0 && (
                        <ul className="mt-2 pl-4 flex flex-col gap-2">
                          {item.subMenu.map((sub, sIdx) => (
                            <li key={sIdx}>
                              <Link
                                to={buildLocalizedUrl(sub.url ?? "#")}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-LightGray text-sm"
                              >
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}

                    {/* Mega Menu */}
                    {item.hasSubmenu &&
                      item.submenuType === "mega" &&
                      isOpen &&
                      item.megaMenu?.length > 0 && (
                        <div className="mt-2 pl-4 flex flex-col gap-4">
                          {item.megaMenu.map((group, gIdx) => (
                            <div key={gIdx}>
                              <p className="text-PrimaryBlack font-medium mb-2">
                                {group.title}
                              </p>
                              <ul className="flex flex-col gap-2">
                                {group.links.map((link, lIdx) => (
                                  <li key={lIdx}>
                                    <Link
                                      to={buildLocalizedUrl(link.url ?? "#")}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="text-LightGray text-sm"
                                    >
                                      {link.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                );
              })}

               {isLoggedIn ? (
               <Link
               to={buildLocalizedUrl('/account')}
               className="text-base font-medium text-PrimaryBlack hover:underline cursor-pointer"
             >
               Welcome, {customer?.firstName || "User"}
             </Link>
                ) : (
                  loginButton && (
                    <button
                    className="w-fit rounded-[100px] font-normal leading-[16px] tracking-[0.08px] text-base text-PrimaryBlack border border-[#091019] px-9 py-[11px] transition-all  hover:bg-PrimaryBlack hover:text-white"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      const ssoUrl = "https://store.xecurify.com/moas/broker/login/shopify/0dv7ud-pz.myshopify.com/account?idpname=custom_openidconnect_Okf";
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
                  // to={buildLocalizedUrl('create-account')}
                  to={buildLocalizedUrl(getStartedButton?.link ?? '#')}
                  className="w-fit rounded-[100px] bg-[#F60] font-Roboto text-white px-5 py-3 font-normal leading-[16px] tracking-[0.08px] text-base flex items-center gap-2 transition-all hover:scale-[1.02] hover:bg-[#DD5827]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {getStartedButton?.label} 
                </Link>
                )}
            </nav>
          </div>
        </div>
      )}

      {/* Search Popup Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 md:px-5">
          <div className="h-[100vh] md:h-auto bg-white md:bg-[#F6F6F6] md:rounded-[20px] shadow-lg w-full max-w-[1010px] md:mt-5 md:px-4 md:pt-4 md:pb-6">
            
            {/* Header Row */}
            <div className="relative flex flex-row flex-wrap items-center justify-betwee gap-[10px] rounded-[100px] bg-white m-5 ml-[60px] md:m-[0px] px-5 py-3 md:py-2 md:pl-5 md:pr-2 border border-LightWhite">
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
              </div>

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

                <Link
                  to={buildLocalizedUrl(getStartedButton?.link ?? '#')}
                  className="hidden md:flex rounded-[100px] bg-[#F60] font-Roboto text-white px-5 py-4 font-normal leading-[16px] tracking-[0.08px] text-base flex items-center gap-2 transition-all hover:scale-[1.02] hover:bg-[#DD5827]"
                >
                  {getStartedButton?.label || "Get Started"} 
                </Link>
              </div>
            </div>

            {/* Results List */}
            {query.length >= 2 && (
              <div className="md:pt-2">
                <div className="bg-white border-t md:border border-LightWhite md:rounded-[20px] shadow-md w-full p-5">
                  <ul className="max-h-72 overflow-y-auto space-y-4">
                    {results.length > 0 ? (
                      results.map((item) => {
                        const lower = query.toLowerCase();
                        // Prefer using matchType assigned earlier:
                        const mt = item.matchType || (
                          item.type === "product" ? "product" :
                          item.city ? "city" :
                          item.state ? "state" :
                          item.country ? "country" : "address"
                        );

                        const isProduct = mt === "product";
                        const isCountry = mt === "country";
                        const isState = mt === "state";
                        const isCity = mt === "city";
                        const isAddress = mt === "address";

                        return (
                          <li
                            key={`${item._id || item.state || item.country || item.addressLine1}`}
                            className="cursor-pointer font-Roboto text-[16px] md:text-[18px] leading-[26px] hover:text-[#ff6600]"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => handleResultClick(item)}
                          >
                            {isProduct && (
                              <span>
                                {item.title}{" "}
                                <span className="text-LightGray">(Product)</span>
                              </span>
                            )}
                            {isCountry && <span>{item.country}</span>}
                            {isState && (
                              <span>
                                {item.state},{" "}
                                <span className="text-LightGray">{item.country}</span>
                              </span>
                            )}
                            {isCity && (
                              <span>
                                {item.city},{" "}
                                <span className="text-LightGray">
                                  {item.state}, {item.country}
                                </span>
                              </span>
                            )}
                            {isAddress && (
                              <span>
                                {item.addressLine1},{" "}
                                <span className="text-LightGray">
                                  {item.city}, {item.state}, {item.country},{" "}
                                  {item.postalCode}
                                </span>
                              </span>
                            )}
                          </li>
                        );
                      })
                    ) : (
                      <li className="px-4 py-3 text-PrimaryBlack text-[16px]">
                        No results found
                      </li>
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

export function usePrefixPathWithLocale2() {
  const selectedLocale = useRootLoaderData()?.selectedLocale ?? DEFAULT_LOCALE;

  return (path?: string | null) => {
    if (!path) return selectedLocale.pathPrefix || '/';
    return `${selectedLocale.pathPrefix}${path.startsWith('/') ? path : '/' + path}`;
  };
}
