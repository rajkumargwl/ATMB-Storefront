import { Await, useLoaderData } from '@remix-run/react';
import {
  AnalyticsPageType,
  type SeoHandleFunction,
} from '@shopify/hydrogen';
import {
  defer,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import clsx from 'clsx';
import { SanityPreview } from 'hydrogen-sanity';
import { Suspense } from 'react';
import RightArrowWhite from '~/components/icons/RightArrowWhite';
import SearchIconBanner from '~/components/icons/SearchIconBanner';
import ArrowRightCountries from "~/components/icons/ArrowRightCountries";
import ModuleGrid from '~/components/modules/ModuleGrid';
import { fetchGids, notFound, validateLocale } from '~/lib/utils';

// 👇 import your FAQ Page query
import { FAQ_PAGE } from '~/queries/sanity/fragments/pages/faqpage';

// -----------------
// SEO
// -----------------
const seo: SeoHandleFunction = ({ data }) => ({
//   title: data?.page?.seo?.title || 'Countries',
title: 'Countries',
  description:
    data?.page?.seo?.description ||
    'Find answers to common questions about Anytime Mailbox services.',
});
export const handle = { seo };

// -----------------
// Loader
// -----------------
export async function loader({ context, params }: LoaderFunctionArgs) {
  validateLocale({ context, params });

  const page = await context.sanity.query({
    query: FAQ_PAGE,
  });

  if (!page) throw notFound();
 
  const gids = fetchGids({ page, context });

  return defer({
    page,
    gids,
    analytics: { pageType: AnalyticsPageType.page },
  });
}

// -----------------
// Component
// -----------------
export default function FAQ() {
  const { page, gids } = useLoaderData<typeof loader>();

  return (
    // <SanityPreview data={page} query={FAQ_PAGE}>
    //   {(page) => (
    //     <Suspense>
    //       <Await resolve={gids}>
    //         {page?.modules && page.modules.length > 0 && (
    //           <div className={clsx('')}>
    //             <ModuleGrid items={page.modules} />
    //           </div>
    //         )}
    //       </Await>
    //     </Suspense>
    //   )}
    // </SanityPreview>
    <>
    <section className="bg-[#F6F6F6] text-gray-900 py-14 sm:py-10 px-[20px]">
      <div className="bg-[#F6F6F6]  max-w-[1240px] mx-auto  max-1265px:px-4 max-1265px:gap-2 grid md:grid-cols-2 items-center">
        {/* Left: Text Content */}
        <div >
            <h1 className="text-center md:text-left font-Roboto text-PrimaryBlack font-semibold leading-[38.4px] tracking-[-0.48px] text-[32px] md:text-[36px] md:leading-[43.2px] md:tracking-[-0.54px]">Virtual Mailbox Locations Across the United States and Worldwide</h1>
            <p className="text-center md:text-left mt-[16px] md:text-[18px] text-[14px] text-[#4D4E4F] font-[400] leading-[21px] md:leading-[27px]">Choose from 2500+ locations and get your digital mailbox today!</p>
            <div className="mt-[40px] md:mt-[16px] mb-4 md:mb-5 flex items-center gap-[10px] w-full max-w-[546px] pt-[8px] md:pt-[6px] pr-[8px] md:pr-[6px] pb-[8px] md:pb-[6px] pl-[16px] md:pl-[20px] bg-white border border-LightGray rounded-full shadow-sm overflow-hidden">
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
            </div>
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
    {/* United States & International Locations Section */}
    <section className="md:px-[100px] md:pt-[60px] md:pb-[40px] px-[20px] py-[40px]">
    <div className="max-w-[1240px] mx-auto px-4">

        {/* United States Section */}
        <div className="mb-12">
        <h2 className="text-[24px] md:text-[32px] font-[600] text-[#091019] mb-[44px] leading-[31.2px] md:leading-[38.4px] tracking-[-0.36px] md:tracking-[-0.48px]">
            United States
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 md:gap-x-6 md:gap-y-5 gap-x-4 gap-y-8">
            {[
            "Alabama (12)", "Alaska (3)", "Arizona (35)", "Arkansas (11)",
            "California (87)", "Colorado (41)", "Connecticut (13)", "DC (4)",
            "Delaware (11)", "Florida (23)", "Georgia (39)", "Hawaii (3)",
            "Idaho (6)", "Illinois (46)", "Indiana (16)", "Iowa (8)",
            "Kansas (7)", "Kentucky (7)", "Louisiana (28)", "Maine (4)",
            "Maryland (6)", "Massachusetts (24)", "Michigan (46)", "Minnesota (9)",
            "Mississippi (6)", "Missouri (14)", "Montana (9)", "Nebraska (3)",
            "Nevada (4)", "New Hampshire (5)", "New Jersey (48)", "New Mexico (4)",
            "New York (39)", "North Carolina (36)", "North Dakota (2)", "Ohio (32)",
            "Oklahoma (15)", "Oregon (12)", "Pennsylvania (36)", "Texas (27)",
            "Utah (9)", "Vermont (2)", "Virginia (36)", "Washington (45)",
            "West Virginia (2)", "Wisconsin (22)", "Wyoming (4)", "Puerto Rico (2)",
            "South Carolina (3)", "South Dakota (3)", "Tennessee (5)"
            ].map((state, index) => {
            const [name, count] = state.split("(");
            return (
                <div
                key={index}
                className="group flex items-center gap-2 text-[18px] font-[500] text-[#091019] cursor-pointer transition-all duration-200"
              >
                <span className="group-hover:text-[#F15A24]">{name.trim()}</span>
                {count && (
                  <>
                    <span className="text-[12px] bg-[#0000001a] font-[400] leading-[18px] text-[#091019] rounded-full px-[6px] py-[4px]">
                      {count.replace(")", "")}
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

    <section className="md:px-[100px] md:pt-[60px] md:pb-[40px] px-[20px] py-[40px] bg-[#F6F6F6]">
    <div className="max-w-[1240px] mx-auto px-4">

        {/* International Section */}
        <div className='mb-12'>
        <h2 className="text-[24px] md:text-[32px] font-[600] text-[#091019] mb-[44px] leading-[31.2px] md:leading-[38.4px] tracking-[-0.36px] md:tracking-[-0.48px]">
            International
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 md:gap-x-6 md:gap-y-5 gap-x-4 gap-y-8">
            {[
            "Australia (34)", "Austria", "Belgium", "Brazil (6)", "Bulgaria (4)",
            "Canada (39)", "Caribbean (3)", "China (5)", "Colombia", "Croatia (4)",
            "Cyprus", "Czech Republic (2)", "Denmark", "Egypt", "France (3)", "Greece (2)",
            "Hong Kong (6)", "Hungary", "India", "Indonesia (3)", "Ireland (3)", "Italy",
            "Kenya", "Lithuania", "Malaysia (2)", "Malta", "Mexico (35)", "Mauritius",
            "Netherlands", "Nigeria (2)", "Oman", "Pakistan", "Philippines (2)", "Portugal (3)",
            "Romania (2)", "Singapore (3)", "Slovakia", "Slovenia", "South Africa (3)",
            "Spain (3)", "Sweden", "Switzerland (4)", "Taiwan", "Thailand", "Ukraine (2)",
            "United Arab Emirates", "United Kingdom (3)", "Zambia"
            ].map((country, index) => {
            const [name, count] = country.split("(");
            return (
                <div key={index} className="flex items-center gap-2 text-[18px] font-[500] text-[#091019]">
                <span>{name.trim()}</span>
                {count && (
                    <span className="text-[12px] bg-[#0000001a] font-[400] leading-18px] text-[#091019] rounded-full px-[6px] py-[4px]">
                    {count.replace(")", "")}
                    </span>
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
