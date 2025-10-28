import { useState } from "react";
import { useLocation, useNavigate } from "@remix-run/react";
import { X } from "lucide-react";

export default function LanguageCurrencyModal({ iconUrl }: { iconUrl: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"language" | "currency">("language");

  const location = useLocation();
  const navigate = useNavigate();

  const languages = [
    { id: "en", name: "English (US)", country: "United States", flag: "🇺🇸" },
    { id: "en-es", name: "Spanish", country: "Spain", flag: "🇪🇸" },
  ];

  const currencies = [
    { code: "usd", name: "USD - $", country: "United States Dollar", symbol: "💵" },
    { code: "aud", name: "AUD - $", country: "Australian Dollar", symbol: "💲" },
    { code: "gbp", name: "GBP - £", country: "Great British Pound", symbol: "💷" },
  ];

  // current language from URL
  const getBasePath = (pathname: string) => {
    const parts = pathname.split("/").filter(Boolean);
    if (languages.some((lang) => lang.id === parts[0])) {
      return `/${parts.slice(1).join("/")}` || "/";
    }
    return pathname;
  };

  const basePath = getBasePath(location.pathname);
  const currentLanguage =
    languages.find((lang) => location.pathname.startsWith(`/${lang.id}`))?.id || "en";

  // selected (temporary before apply)
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);
  const [selectedCurrency, setSelectedCurrency] = useState("USD - $");

  const handleApply = () => {
    // Navigate to new language URL only on Apply
    if (selectedLanguage !== currentLanguage) {
      if (selectedLanguage === "en") {
        navigate(basePath);
      } else {
        navigate(`/${selectedLanguage}${basePath}`);
      }
    }
    setIsOpen(false);
  };

  const handleReset = () => {
    setSelectedLanguage("en");
    setSelectedCurrency("USD - $");
    navigate(basePath);
  };

  return (
    <>
      {/* Language Icon Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center"
        title="Change Language or Currency"
      >
        {iconUrl && (
          <img
            src={iconUrl}
            alt="Language"
            className="h-6 w-6 object-contain hidden md:inline-block"
          />
        )}
      </button>

      {/* Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 !ml-0 xl:space-x-0">
          <div className="bg-white w-full max-w-[878px] h-[509px] md:rounded-2xl shadow-lg relative mx-4 md:mx-0 flex flex-col">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="p-6 pb-0">
              <h2 className="text-xl font-semibold mb-6">Change Language / Currency</h2>

              {/* Tabs */}
              <div className="flex border-b mb-4">
                <button
                  onClick={() => setActiveTab("language")}
                  className={`flex-1 py-2 font-medium text-center border-b-2 ${
                    activeTab === "language"
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-500"
                  }`}
                >
                  Language
                </button>
                <button
                  onClick={() => setActiveTab("currency")}
                  className={`flex-1 py-2 font-medium text-center border-b-2 ${
                    activeTab === "currency"
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-500"
                  }`}
                >
                  Currency
                </button>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-6 space-y-3">
              {activeTab === "language"
                ? languages.map((lang) => (
                    <div
                      key={lang.id}
                      onClick={() => setSelectedLanguage(lang.id)}
                      className={`flex items-center justify-between border rounded-xl px-4 py-3 cursor-pointer ${
                        selectedLanguage === lang.id
                          ? "border-orange-500 bg-orange-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{lang.flag}</span>
                        <div>
                          <p className="font-medium">{lang.name}</p>
                          <p className="text-sm text-gray-500">{lang.country}</p>
                        </div>
                      </div>
                      {selectedLanguage === lang.id && (
                        <span className="text-orange-500 text-lg">●</span>
                      )}
                    </div>
                  ))
                : currencies.map((cur) => (
                    <div
                      key={cur.code}
                      onClick={() => setSelectedCurrency(cur.name)}
                      className={`flex items-center justify-between border rounded-xl px-4 py-3 cursor-pointer ${
                        selectedCurrency === cur.name
                          ? "border-orange-500 bg-orange-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{cur.symbol}</span>
                        <div>
                          <p className="font-medium">{cur.name}</p>
                          <p className="text-sm text-gray-500">{cur.country}</p>
                        </div>
                      </div>
                      {selectedCurrency === cur.name && (
                        <span className="text-orange-500 text-lg">●</span>
                      )}
                    </div>
                  ))}
            </div>

            {/* Fixed bottom buttons */}
            <div className="sticky bottom-0 bg-white border-t flex justify-end gap-3 p-4 mt-auto">
              <button
                onClick={handleReset}
                className="border border-gray-300 rounded-lg px-6 py-2 text-gray-700 hover:bg-gray-100"
              >
                Reset
              </button>
              <button
                onClick={handleApply}
                className="bg-orange-500 text-white rounded-lg px-6 py-2 hover:bg-orange-600"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}



function getCountryUrlPath({
  countryLocale,
  defaultLocalePrefix,
  pathWithoutLocale,
}: {
  countryLocale: Locale;
  pathWithoutLocale: string;
  defaultLocalePrefix: string;
}) {
  let countryPrefixPath = "";
  const countryLocalePrefix = `${countryLocale.language}-${countryLocale.country}`;
  if (countryLocalePrefix !== defaultLocalePrefix) {
    countryPrefixPath = `/${countryLocalePrefix.toLowerCase()}`;
  }
  return `${countryPrefixPath}${pathWithoutLocale}`;
}

