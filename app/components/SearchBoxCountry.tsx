import {useState, useEffect} from "react";
import {useNavigate, useLocation} from "@remix-run/react";
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

  // 🔍 Filter results locally
  useEffect(() => {
    if (!searchquery.trim()) {
      setQresults([]);
      return;
    }

    const query = searchquery.toLowerCase();
    const filtered = results.filter((item) =>
      [item.name, item.city, item.postalCode]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(query))
    );

    setQresults(filtered);
  }, [searchquery, results]);

//   // Optional: keep query in URL
//   useEffect(() => {
//     if (skipSearchQSync) return;

//     const params = new URLSearchParams(location.search);
    
//   //   if (searchquery.trim()) {
//   //     params.set("p", searchquery);
//   //   } else {
//   //     params.delete("p");
//   //   }
//   //   navigate(`?${params.toString()}`, { replace: true });
//   // }, [searchquery, navigate, location.search, skipSearchQSync]);
//   if (!searchquery.trim()) {
//      params.delete("p");
//      navigate(`?${params.toString()}`, { replace: true });
//      setQresults([]);
//      return;
//    }

//    const timeout = setTimeout(() => {
//      params.set("p", searchquery);
//      navigate(`?${params.toString()}`, { replace: true });
//    }, 500);

//    return () => clearTimeout(timeout);
//  }, [searchquery, navigate, location.search, skipSearchQSync]);

  return (
    <div className="mt-[28px] md:mt-[16px] mb-4 md:mb-5 w-full max-w-[546px]">
      {/* Input + Button */}
      <div className="flex items-center gap-[10px] pt-[8px] md:pt-[6px] pr-[8px] md:pr-[6px] pb-[8px] md:pb-[6px] pl-[16px] md:pl-[20px] bg-white border border-LightGray rounded-full shadow-sm overflow-hidden">
        <SearchIconBanner />
        <input
          type="text"
          value={searchquery}
          onChange={(e) => setSearchquery(e.target.value)}
          placeholder={placeholder}
          className="font-Roboto text-PrimaryBlack placeholder:text-PrimaryBlack font-normal leading-[24px] text-[16px] tracking-[0.08px] flex-1 py-[5px] md:py-[13px] focus:outline-none"
        />
        <button
          className="group bg-DarkOrange md:w-[109px] w-[83px] text-center justify-center text-white px-[12px] md:px-[16px] py-[8px] md:py-[12px] font-normal leading-[14px] md:leading-[22px] text-[14px] md:text-[16px] tracking-[0.08px] rounded-full overflow-hidden transition-all hover:scale-[1.01] hover:bg-[#DD5827]"
          aria-label="Search location"
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
      {searchquery && (
        <div className="md:pt-2">
          <div className="bg-white border-t md:border border-LightWhite md:rounded-[20px] shadow-md w-full p-5">
            <ul className="max-h-72 overflow-y-auto space-y-6">
              {qresults.length > 0 ? (
                qresults.map((item) => (
                  <li
                    key={item._id}
                    className="cursor-pointer font-Roboto leading-[27px] text-[18px] tracking-[0px] hover:text-[#ff6600]"
                    // onClick={() => {
                    //   setSkipSearchQSync(true);
                    //   setSearchquery("");
                    //   setQresults([]);
                    //   onResultClick(item);
                    // }}
                    onMouseDown={(e) => e.preventDefault()} // prevent blur
                    onClick={() => {
                    setSkipSearchQSync(true);
                    onResultClick(item);

                    // delay clearing to allow navigation
                    setTimeout(() => {
                        setSearchquery("");
                        setQresults([]);
                    }, 200);
                    }}
                  >
                    <span className="mr-2 font-medium text-PrimaryBlack hover:text-[#ff6600]">{item.name}</span>
                    <span className="text-LightGray font-normal hover:text-[#ff6600]">
                      {item.city}, {item.postalCode}
                    </span>
                  </li>
                ))
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
