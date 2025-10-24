
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
import Header from '~/components/global/Header';
const seo: SeoHandleFunction = ({data}) => ({
  title: data?.page?.seo?.title || 'Anytime Mailbox',
  description:
    data?.page?.seo?.description ||
    'A custom storefront powered by Hydrogen and Sanity',
});
import { fetchBundleProducts } from '~/lib/bundle.server';
import { is } from 'date-fns/locale';

export const handle = { seo };


export async function loader({ context, params, request }: LoaderFunctionArgs) {
  validateLocale({ context, params });
  const language = params.lang || 'en';

  const cache = context.storefront.CacheCustom({
    mode: 'public',
    maxAge: 60,
    staleWhileRevalidate: 60,
  });

  const customerAccessToken = await context.session.get('customerAccessToken');
  let customer;
  if (customerAccessToken) {
    try {
      customer = await context.storefront.query<{
        customer: { id: string };
      }>(
        `#graphql
          query customer($customerAccessToken: String!) {
            customer(customerAccessToken: $customerAccessToken) {
              id
              firstName
              lastName
              email
            }
          }
        `,
        {
          variables: {
            customerAccessToken,
          },
        }
      );
  
      // If the token is invalid, remove it from the session
      // if (!customer) {
      //   context.session.unset('customerAccessToken');
      // }
    } catch (error) {
      console.error("Error fetching customer:", error);
    }
  }
 
  const isAuthenticated = Boolean(customerAccessToken);

  

  // Fetch all at once
  const [page, header, footer,bundles] = await Promise.all([
    context.sanity.query({ query: HOME_PAGE_QUERY,  params: { language },cache }),
    context.sanity.query({ query: HEADER_QUERY,  params: { language },cache }),
    context.sanity.query({ query: FOOTER_QUERY, params: { language }, cache }),
    fetchBundleProducts(context), // Fetch bundle products
  ]);
 
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
    language,
    bundles, // Pass bundles to the frontend 
    analytics: { pageType: AnalyticsPageType.home },
    isLoggedIn: isAuthenticated,
    customer: customer?.customer || null,
  });
}


export default function Index() {
  //const { page, gids,  header, footer, mergedResults, q } = useLoaderData<typeof loader>();
   const { page, gids, p, homeSearchResults,bundles,q, header, isLoggedIn, customer, language} = useLoaderData<typeof loader>();

  return (
    <>
     {/* <Header data={header} searchQuery={q} searchResults={homeSearchResults} isLoggedIn={isLoggedIn} customer={customer} currentLanguage={language} /> */}


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
                  <ModuleGrid items={page.modules} searchQuery={p} homeSearchResults={homeSearchResults}  bundles={bundles}  />
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