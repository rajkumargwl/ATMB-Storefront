
import {
  Await,
  useLoaderData,
  useNavigate,
  useLocation,
} from '@remix-run/react';
import {AnalyticsPageType, type SeoHandleFunction} from '@shopify/hydrogen';
import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import clsx from 'clsx';
import {SanityPreview} from 'hydrogen-sanity';
import {Suspense, useState, useEffect} from 'react';
// import Search from '~/components/Search';
import ModuleGrid from '~/components/modules/ModuleGrid';
import type {SanityHomePage} from '~/lib/sanity';
import {fetchGids, notFound, validateLocale} from '~/lib/utils';
import {HOME_PAGE_QUERY} from '~/queries/sanity/home';
import {HEADER_QUERY} from '~/queries/sanity/header';
import {FOOTER_QUERY} from '~/queries/sanity/footer';
const seo: SeoHandleFunction = ({data}) => ({
  title: data?.page?.seo?.title || 'Anytime Mailbox',
  description:
    data?.page?.seo?.description ||
    'A custom storefront powered by Hydrogen and Sanity',
});

export const handle = { seo };


export async function loader({ context, params, request }: LoaderFunctionArgs) {
  validateLocale({ context, params });

  const cache = context.storefront.CacheCustom({
    mode: 'public',
    maxAge: 60,
    staleWhileRevalidate: 60,
  });

  

  // Fetch all at once
  const [page, header, footer] = await Promise.all([
    context.sanity.query({ query: HOME_PAGE_QUERY, cache }),
    context.sanity.query({ query: HEADER_QUERY, cache }),
    context.sanity.query({ query: FOOTER_QUERY, cache }),
  ]);
  console.log("trustedby", page.modules[1]);
  if (!page) throw notFound();
 

  
  const gids = fetchGids({ page, context });
  // 🔹 Handle home search param
    const url = new URL(request.url);
   const p = url.searchParams.get('p') || '';
  
   let mergedSearchResults: any[] = [];
   if (p) {
     try {
       const searchParam = `${p}*`;
       const searchresults = await context.sanity.query({
         query: `{
           "locations": *[_type == "location" && (
             name match $search ||
             city match $search ||
             postalCode match $search
           )][0...5]{
             _id,
             _type,
             name,
             city,
             postalCode,
             "slug": slug.current
           }
         }`,
         params: {search: searchParam},
       });
       mergedSearchResults = [
         ...(searchresults.locations || []).map((item: any) => ({
           ...item,
           type: 'location',
         }))
       ];
     } catch (err) {
       console.error('Search error:', err);
     }
   }

  return defer({
    page,                           
    header,
    footer,
    gids,
    p,
    homeSearchResults: mergedSearchResults, 
    analytics: { pageType: AnalyticsPageType.home },
  });
}


export default function Index() {
  //const { page, gids,  header, footer, mergedResults, q } = useLoaderData<typeof loader>();
   const { page, gids, p, homeSearchResults} = useLoaderData<typeof loader>();

  console.log("homeSearchResults in index", homeSearchResults);
  return (
    <>
     {/* <Header data={header} searchResults={mergedResults} searchQuery={q} /> */}


      <SanityPreview data={page} query={HOME_PAGE_QUERY}>
        {(page) => (
          
          <Suspense>
            <Await resolve={gids}>
              {/* Unified search box - Now mergedResults is available immediately */}
              {/* <div className="flex flex-col items-center my-24">
                <h2 className="text-lg font-semibold mb-4">Search Locations & Products</h2> */}
                {/* <Search initialResults={mergedResults} initialQuery={q} /> */}
              {/* </div> */}

              {/* Page hero */}
              {/* {page?.modules.hero && <HomeHero hero={page.hero} />} */}

              {/* Page modules */}
              {page?.modules && (
                // <div className={clsx('mb-32 mt-24 px-4', 'md:px-8')}>
                  <ModuleGrid items={page.modules} searchQuery={p} homeSearchResults={homeSearchResults}  />
                // </div>
              )}
            </Await>
          </Suspense>
        )}
      </SanityPreview>
      {/* <Footer data={footer} /> */}
    </>
  );
}