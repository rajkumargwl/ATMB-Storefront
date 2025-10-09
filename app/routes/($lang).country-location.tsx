import {useLoaderData, useNavigate} from '@remix-run/react';
import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import SearchBox from '~/components/SearchBox';
import SearchIconBanner from '~/components/icons/SearchIconBanner';
import ArrowRightCountries from "~/components/icons/ArrowRightCountries";
import RightArrowWhite from '~/components/icons/RightArrowWhite';

// Loader
export async function loader({context}: LoaderFunctionArgs) {
  const cache = context.storefront.CacheCustom({
    mode: 'public',
    maxAge: 60,
    staleWhileRevalidate: 60,
  });

  const [locations] = await Promise.all([
    context.sanity.query({
      query: /* groq */ `
        *[_type == "location" && defined(country) && country != "" ]{
          country,
          state,
          country_code,
          name,
          city,
          postalCode,
          type,
          _id
        }
      `,
      cache,
    }),
  
  ]);

  const usMap: Record<string, number> = {};
  const countryMap: Record<string, number> = {};

  locations.forEach((loc: any) => {
    const name = loc.country;
    if (!countryMap[name]) countryMap[name] = 0;
    countryMap[name] += 1;

    if (loc.country === 'United States') {
      const state = loc.state || 'Unknown';
      if (!usMap[state]) usMap[state] = 0;
      usMap[state] += 1;
    }
  });

  const countries = Object.entries(countryMap)
    .map(([name, count]) => ({ name, count, type: 'country' }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const usLocations = Object.entries(usMap)
    .map(([state, count]) => ({ name: state, count, type: 'state',country:"United States" }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return defer({ countries, usLocations,locations });
}

// Component
export default function CountryLocationsPage() {
  const { countries, usLocations,locations } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    // <div className="flex flex-col min-h-screen bg-white">
    //   <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
    //     <h1 className="text-2xl font-bold mb-6">Search Locations</h1>
    //     <SearchBox
    //       placeholder="Enter address or zip code..."
    //       buttonText="Search"
    //       initialQuery=""
    //       results={locations || []}
    //       onResultClick={(item) => {
    //         navigate(`/sublocations?q=${encodeURIComponent(item.name || item.city || '')}`);
    //       }}
    //     />


    //     {/* US Section */}
    //     <h2 className="text-2xl font-bold mt-12 mb-6">United States</h2>
    //     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    //       {usLocations.map((c, idx) => (
    //         <div
    //           key={idx}
    //           className="flex justify-between items-center text-gray-700 hover:text-orange-600 cursor-pointer py-2"
    //           onClick={() => navigate(`/${encodeURIComponent(c.country)}/${encodeURIComponent(c.name)}`)}
    //         >
    //           <span>{c.name}</span>
    //           <span className="bg-gray-100 rounded-full px-2 py-0.5 text-sm">
    //             {c.count}
    //           </span>
    //         </div>
    //       ))}
    //     </div>

    //     {/* International Section */}
    //     <h2 className="text-2xl font-bold mt-12 mb-6">International</h2>
    //     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    //       {countries.map((c, idx) => (
    //         <div
    //           key={idx}
    //           className="flex justify-between items-center text-gray-700 hover:text-orange-600 cursor-pointer py-2"
    //           onClick={() => navigate(`/country/${encodeURIComponent(c.name)}`)}
    //         >
    //           <span>{c.name}</span>
    //           <span className="bg-gray-100 rounded-full px-2 py-0.5 text-sm">
    //             {c.count}
    //           </span>
    //         </div>
    //       ))}
    //     </div>
    //   </main>
    // </div>
    <>
    <section className="bg-[#F6F6F6] text-gray-900 py-14 sm:py-10 px-[20px]">
      <div className="bg-[#F6F6F6]  max-w-[1240px] mx-auto  max-1265px:px-4 max-1265px:gap-2 grid md:grid-cols-2 items-center">
        {/* Left: Text Content */}
        <div >
            <h1 className="text-center md:text-left font-Roboto text-PrimaryBlack font-semibold leading-[38.4px] tracking-[-0.48px] text-[32px] md:text-[36px] md:leading-[43.2px] md:tracking-[-0.54px]">Virtual Mailbox Locations Across the United States and Worldwide</h1>
            <p className="text-center md:text-left mt-[16px] md:text-[18px] text-[14px] text-[#4D4E4F] font-[400] leading-[21px] md:leading-[27px]">Choose from 2500+ locations and get your digital mailbox today!</p>
           {/*  <div className="mt-[40px] md:mt-[16px] mb-4 md:mb-5 flex items-center gap-[10px] w-full max-w-[546px] pt-[8px] md:pt-[6px] pr-[8px] md:pr-[6px] pb-[8px] md:pb-[6px] pl-[16px] md:pl-[20px] bg-white border border-LightGray rounded-full shadow-sm overflow-hidden">
              <SearchIconBanner />
              <input
                type="text"
                value=""
                name="search"
                id="mainContent" 
                placeholder="Address, City or Zip Code..."
                className="font-Roboto text-PrimaryBlack placeholder:text-PrimaryBlack font-normal leading-[24px] text-[16px] tracking-[0.08px] flex-1 py-[5px] md:py-[13px] focus:outline-none"
              />
              <button 
                className="group bg-DarkOrange text-white px-[20px] md:px-[35.5px] py-[11px] md:py-[15px] font-normal leading-[14px] md:leading-[22px] text-[14px] md:text-[16px] tracking-[0.08px] rounded-full overflow-hidden transition-all hover:scale-[1.01] hover:bg-[#DD5827]" 
                aria-label="You can search location"
              >
                <span className="sr-only">(You can search location)</span>
                <span className="relative flex items-center">
                    Search
                  <span className="absolute right-0 opacity-0 translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-[25px] transition-all duration-300">
                    <RightArrowWhite />
                  </span>
                </span>
              </button> 
               </div> */} 
                <SearchBox
          placeholder="Enter address or zip code..."
          buttonText="Search"
          initialQuery=""
          results={locations || []}
          onResultClick={(item) => {
            navigate(`/sublocations?q=${encodeURIComponent(item.name || item.city || '')}`);
          }}
        />

         
        </div>

        {/* Right: Image */}
          <div className="flex justify-center md:justify-end">
            <img
              src={require('~/components/media/countries.png')}
              alt="Countries"
              className="rounded-xl shadow-md w-full h-auto lg:max-w-[611px] lg:h-[400px] object-cover"
            />
          </div>
      </div>
    </section>
    
    <section className="md:px-[100px] md:pt-[40px] md:pb-[60px] px-[20px] py-[40px]">
    <div className="max-w-[1240px] mx-auto px-4">

        {/* United States Section */}
        <div className="">
        <h2 className="text-[24px] md:text-[32px] font-[600] text-[#091019] mb-[44px] leading-[31.2px] md:leading-[38.4px] tracking-[-0.36px] md:tracking-[-0.48px]">
            United States
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 md:gap-x-6 md:gap-y-5 gap-x-4 gap-y-8">
        {usLocations.map((state, index) => {
            return (
                <div
                key={index}
                className="group flex items-center gap-2 text-[18px] font-[500] text-[#091019] cursor-pointer transition-all duration-200"
                onClick={() => navigate(`/${encodeURIComponent(state.country)}/${encodeURIComponent(state.name)}`)}
              >
                <span className="group-hover:text-[#F15A24]">{state.name}</span>
                {state && (
                  <>
                    <span className="text-[12px] bg-[#0000001a] font-[400] leading-[18px] text-[#091019] rounded-full w-6 h-6 items-center justify-center flex">
                      {state.count}
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 translate-x-[-6px] group-hover:translate-x-[0] transition-all duration-300 bg-[#F15A24] rounded-full w-6 h-6 flex items-center justify-center">
                      <ArrowRightCountries />
                    </span>
                  </>
                )}
              </div>
            );
            })}
        </div>
        </div>
        </div>
    </section>

    <section className="md:px-[100px] md:pt-[40px] md:pb-[60px] px-[20px] py-[40px] bg-[#F6F6F6]">
    <div className="max-w-[1240px] mx-auto px-4">

        {/* International Section */}
        <div className=''>
        <h2 className="text-[24px] md:text-[32px] font-[600] text-[#091019] mb-[44px] leading-[31.2px] md:leading-[38.4px] tracking-[-0.36px] md:tracking-[-0.48px]">
            International
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 md:gap-x-6 md:gap-y-5 gap-x-4 gap-y-8">
        {countries.map((country, index) => {
            return (
                <div key={index} className="group flex items-center gap-2 text-[18px] font-[500] text-[#091019] cursor-pointer transition-all duration-200"
                onClick={() => navigate(`/country/${encodeURIComponent(country.name)}`)}
                >
                <span className="group-hover:text-[#F15A24]">{country.name.trim()}</span>
                {country.count && (
                    <>
                    <span className="text-[12px] bg-[#0000001a] font-[400] leading-[18px] text-[#091019] rounded-full w-6 h-6 items-center justify-center flex">
                      {country.count}
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 translate-x-[-6px] group-hover:translate-x-[0] transition-all duration-300 bg-[#F15A24] rounded-full w-6 h-6 flex items-center justify-center">
                      <ArrowRightCountries />
                    </span>
                  </>
                )}
                </div>
            );
            })}
        </div>
        </div>

    </div>
    </section>
    </>
  );
}
