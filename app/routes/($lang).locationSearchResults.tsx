import { json, type LoaderFunctionArgs, defer } from "@shopify/remix-oxygen";
import { useLoaderData, useLocation, useNavigate } from "@remix-run/react";
import { validateLocale } from "~/lib/utils";
import { type SeoHandleFunction } from "@shopify/hydrogen";

const seo: SeoHandleFunction = () => ({
  title: "Search Results | Anytime Mailbox",
  description:
    "Browse locations matching your search query and find your perfect virtual address.",
});
export const handle = { seo };

export async function loader({ context, request, params }: LoaderFunctionArgs) {
  validateLocale({ context, params });

  let language = params.lang || "en";
  if (language !== "en-es") {
    language = "en";
  }

  const url = new URL(request.url);
  const q = url.searchParams.get("q");

  let results = { locations: [] };

  if (q) {
    const searchParam = `${q}*`;
    try {
      results = await context.sanity.query({
        query: `{
          "locations": *[_type == "location" && (
             displayName match $search ||
             city match $search ||
             postalCode match $search ||
             addressLine1 match $search ||
             country match $search ||
             state match $search
           )]{
            _id,
            locationId,
            displayName,
            country,
            state,
            city,
            addressLine1,
            postalCode
          }
        }`,
        params: { search: searchParam },
      });
    } catch (error) {
      console.error("Sanity query failed:", error);
    }
  }

  return defer({ locations: results.locations, q });
}

export default function LocationSearchResultsPage() {
  const { locations, q } = useLoaderData<typeof loader>();
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Prefer passed results from SearchBox if available
  const passedResults = (location.state as { results?: any[] })?.results;
  const rawResults = passedResults?.length ? passedResults : locations;
  const query = (q || "").toLowerCase().trim();

  // ✅ Deduplicate & categorize (same logic as SearchBoxCountry)
  const filtered = rawResults.filter((item) => {
    const fields = [
      item.addressLine1,
      item.city,
      item.state,
      item.country,
      item.postalCode,
    ]
      .filter(Boolean)
      .map((f) => f.toLowerCase());

    const fullAddress = fields.join(", ");
    return fields.some((f) => f.includes(query)) || fullAddress.includes(query);
  });

  const countryMatches = filtered.filter((i) =>
    i.country?.toLowerCase().includes(query)
  );
  const stateMatches = filtered.filter(
    (i) =>
      !countryMatches.includes(i) && i.state?.toLowerCase().includes(query)
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

  const uniqueCountries = Array.from(
    new Map(countryMatches.map((i) => [i.country?.toLowerCase(), i])).values()
  );

  const uniqueStates = Array.from(
    new Map(
      stateMatches.map((i) => [
        `${i.country?.toLowerCase()}-${i.state?.toLowerCase()}`,
        i,
      ])
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

  const displayResults = [
    ...uniqueCountries,
    ...uniqueStates,
    ...uniqueCities,
    ...uniqueAddresses,
  ];

  return (
    <div className="max-w-3xl mx-auto mt-10 mb-20 p-6 bg-white rounded-[20px] shadow-md">
      <h1 className="text-2xl font-semibold mb-6 text-PrimaryBlack">
        Search Results for “{q}”
      </h1>

      {displayResults.length > 0 ? (
        <ul className="space-y-4">
          {displayResults.map((item) => {
            const lowerQuery = query;
            const isCountry = item.country?.toLowerCase().includes(lowerQuery);
            const isState = item.state?.toLowerCase().includes(lowerQuery);
            const isCity = item.city?.toLowerCase().includes(lowerQuery);
            const isAddress = !isCountry && !isState && !isCity;

            const handleClick = () => {
              if (isCountry) {
                navigate(`/l/country/${encodeURIComponent(item.country)}`);
              } else if (isState) {
                navigate(
                  `/l/${encodeURIComponent(item.country)}/${encodeURIComponent(
                    item.state
                  )}`
                );
              } else if (isCity) {
                navigate(`/sublocations?q=${encodeURIComponent(item.city)}`);
              } else {
                navigate(
                  `/sublocations?q=${encodeURIComponent(item.addressLine1)}`
                );
              }
            };

            return (
              <li
                key={`${item._id || item.state || item.country}`}
                className="cursor-pointer font-Roboto text-[16px] md:text-[18px] leading-[26px] hover:text-[#ff6600]"
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleClick}
              >
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
          })}
        </ul>
      ) : (
        <p className="text-[16px] text-PrimaryBlack">No results found</p>
      )}
    </div>
  );
}
