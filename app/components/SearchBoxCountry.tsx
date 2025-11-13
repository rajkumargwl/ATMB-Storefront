import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "@remix-run/react";
import SearchIconBanner from "~/components/icons/SearchIconBanner";
import RightArrowWhite from "~/components/icons/RightArrowWhite";

type SearchBoxProps = {
  placeholder?: string;
  buttonText?: string;
  initialQuery?: string;
  results: any[];
  onResultClick: (item: any) => void;
};

export default function SearchBoxCountry({
  placeholder = "Search...",
  buttonText = "Search",
  initialQuery = "",
  results = [],
  onResultClick,
}: SearchBoxProps) {
  const [searchquery, setSearchquery] = useState(initialQuery);
  const [qresults, setQresults] = useState(results || []);
  const [skipSearchQSync, setSkipSearchQSync] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Sync props → state
  useEffect(() => {
    setSearchquery(initialQuery);
    setQresults(results || []);
  }, [initialQuery, results]);

  // 🔍 Smart filtering, sorting + deduplication + auto-navigation logic
  useEffect(() => {
    if (!searchquery.trim()) {
      setQresults([]);
      return;
    }

    const query = searchquery.toLowerCase().replace(/\s*,\s*/g, ",").trim();

    // Match if query appears in any field
    const filtered = results.filter((item) => {
      const fields = [
        item.addressLine1,
        item.city,
        item.state,
        item.country,
        item.postalCode,
      ]
        .filter(Boolean)
        .map((f) => f.toLowerCase());

      const directMatch = fields.some((f) => f.includes(query));
      if (directMatch) return true;

      const fullAddress = fields.join(", ").replace(/\s*,\s*/g, ",");
      return fullAddress.includes(query);
    });

    // Categorize
    const countryMatches = filtered.filter(
      (i) => i.country?.toLowerCase().includes(query)
    );
    const stateMatches = filtered.filter(
      (i) =>
        !countryMatches.includes(i) &&
        i.state?.toLowerCase().includes(query)
    );
    const cityMatches = filtered.filter(
      (i) =>
        !countryMatches.includes(i) &&
        !stateMatches.includes(i) &&
        i.city?.toLowerCase().includes(query)
    );
    const addressMatches = filtered.filter(
      (i) =>
        !countryMatches.includes(i) &&
        !stateMatches.includes(i) &&
        !cityMatches.includes(i)
    );

    // 🧹 Deduplicate each category
    const uniqueCountries = Array.from(
      new Map(countryMatches.map((i) => [i.country?.toLowerCase(), i])).values()
    );

    const uniqueStates = Array.from(
      new Map(
        stateMatches.map((i) => [`${i.country?.toLowerCase()}-${i.state?.toLowerCase()}`, i])
      ).values()
    );

    const uniqueCities = Array.from(
      new Map(
        cityMatches.map((i) => [
          `${i.country?.toLowerCase()}-${i.state?.toLowerCase()}-${i.city?.toLowerCase()}`,
          i,
        ])
      ).values()
    );

    const uniqueAddresses = Array.from(
      new Map(addressMatches.map((i) => [i._id, i])).values()
    );

    const sorted = [
      ...uniqueCountries,
      ...uniqueStates,
      ...uniqueCities,
      ...uniqueAddresses,
    ];

    setQresults(sorted);

    const exactCountry = uniqueCountries.find(
      (i) => i.country?.toLowerCase() === query
    );
    const exactState = uniqueStates.find(
      (i) => i.state?.toLowerCase() === query
    );

    if (exactCountry) {
      navigate(`/l/country/${encodeURIComponent(exactCountry.country)}`);
      setSearchquery("");
      setQresults([]);
    } else if (exactState) {
      navigate(
        `/l/${encodeURIComponent(exactState.country)}/${encodeURIComponent(
          exactState.state
        )}`
      );
      setSearchquery("");
      setQresults([]);
    }
  }, [searchquery, results, navigate]);
  const handleSearchClick = () => {
    const trimmedQuery = searchquery.trim();
    if (trimmedQuery.length >= 2) {
      navigate(`/locationsearchResults?q=${encodeURIComponent(trimmedQuery)}`, {
        state: { results: qresults }, // ✅ Pass filtered results
      });
      setSearchquery("");
      setQresults([]);
    }
  };
  

  return (
    <div className="mt-[28px] md:mt-[16px] mb-4 md:mb-5 w-full max-w-[546px]">
      {/* Input + Button */}
      <div className="flex items-center gap-[10px] pt-[8px] md:pt-[6px] pr-[8px] md:pr-[6px] pb-[8px] md:pb-[6px] pl-[16px] md:pl-[20px] bg-white border border-LightGray rounded-full shadow-sm overflow-hidden">
        <SearchIconBanner />
        <label
          htmlFor="address"
          className="sr-only font-medium text-sm text-[#091019]"
        >
          Enter address or zip code
        </label>
        <input
          id="address"
          type="text"
          value={searchquery}
          onChange={(e) => setSearchquery(e.target.value)}
          placeholder={placeholder}
          className="font-Roboto text-PrimaryBlack placeholder:text-PrimaryBlack font-normal leading-[24px] text-[16px] tracking-[0.08px] flex-1 py-[5px] md:py-[13px] focus:outline-none"
        />
        <button
          className="group bg-DarkOrange md:w-[109px] w-[83px] text-center justify-center text-white px-[12px] md:px-[16px] py-[8px] md:py-[12px] font-normal leading-[14px] md:leading-[22px] text-[14px] md:text-[16px] tracking-[0.08px] rounded-full overflow-hidden transition-all hover:scale-[1.01] hover:bg-[#DD5827]"
          aria-label="Search location"
          onClick={handleSearchClick}
        >
          <span className="relative items-center">
            {buttonText}
            <span className="absolute right-0 opacity-0 translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-[25px] text-[10px] transition-all duration-300">
              <RightArrowWhite />
            </span>
          </span>
        </button>
      </div>

      {/* Results */}
      {searchquery.length >= 2 && (
        <div className="md:pt-2">
          <div className="bg-white border-t md:border border-LightWhite md:rounded-[20px] shadow-md w-full p-5">
            <ul className="max-h-72 overflow-y-auto space-y-4">
              {qresults.length > 0 ? (
                qresults.map((item) => {
                  const lowerQuery = searchquery.toLowerCase();
                  const isCountry = item.country?.toLowerCase().includes(lowerQuery);
                  const isState = item.state?.toLowerCase().includes(lowerQuery);
                  const isCity = item.city?.toLowerCase().includes(lowerQuery);
                  const isAddress = !isCountry && !isState && !isCity;

                  const handleClick = () => {
                    setSkipSearchQSync(true);

                    if (isCountry) {
                      navigate(`/l/country/${encodeURIComponent(item.country)}`);
                    } else if (isState) {
                      navigate(
                        `/l/${encodeURIComponent(item.country)}/${encodeURIComponent(
                          item.state
                        )}`
                      );
                    } else if (isCity) {
                      navigate(
                        `/sublocations?q=${encodeURIComponent(
                          item.city
                        )}`
                      );
                    } else {
                      onResultClick(item); // address click logic
                    }

                    setTimeout(() => {
                      setSearchquery("");
                      setQresults([]);
                    }, 200);
                  };

                  return (
                    <li
                      key={`${item._id || item.state || item.country}`}
                      className="cursor-pointer font-Roboto text-[16px] md:text-[18px] leading-[26px] hover:text-[#ff6600]"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={handleClick}
                    >
                      {isCountry && (
                          <span className="text-PrimaryBlack">
                           {item.country}
                         
                        </span>
                      )}
                      {isState && (
                        <span className="text-PrimaryBlack">
                          {item.state},{" "}
                          <span className="text-LightGray">{item.country}</span>
                        </span>
                      )}
                      {isCity && (
                        <span className="text-PrimaryBlack">
                          {item.city},{" "}
                          <span className="text-LightGray">
                            {item.state}, {item.country}
                          </span>
                        </span>
                      )}
                      {isAddress && (
                        <span className="text-PrimaryBlack">
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
  );
}
