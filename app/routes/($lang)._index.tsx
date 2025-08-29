<<<<<<< HEAD
import {Await, useLoaderData} from '@remix-run/react';
=======
import {
  Await,
  useLoaderData,
  useNavigate,
  useLocation,
} from '@remix-run/react';
>>>>>>> 3097ce2e79576a54ef13bd1a5712ec165470d926
import {AnalyticsPageType, type SeoHandleFunction} from '@shopify/hydrogen';
import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import clsx from 'clsx';
import {SanityPreview} from 'hydrogen-sanity';
<<<<<<< HEAD
import {Suspense} from 'react';
import Swiper from '~/components/Swiper';
import HealthCenterHero from '~/components/HealthCenterHero';
import Map from '~/components/Map';
import Appointment from '~/components/Appointment';
import LatestNews from '~/components/LatestNews';
import DoctorCard from '~/components/DoctorCard';
import {LAYOUT_QUERY} from '~/queries/sanity/layout'; 
import ModuleGrid from '~/components/modules/ModuleGrid';
import type {SanityHomePage} from '~/lib/sanity';
import Footer from '~/components/global/Footer';
import Navbar from '~/components/global/Navbar';

=======
import {Suspense, useState, useEffect} from 'react';
import Search from '~/components/Search';
import HomeHero from '~/components/heroes/Home';
import ModuleGrid from '~/components/modules/ModuleGrid';
import type {SanityHomePage} from '~/lib/sanity';
>>>>>>> 3097ce2e79576a54ef13bd1a5712ec165470d926
import {fetchGids, notFound, validateLocale} from '~/lib/utils';
import {HOME_PAGE_QUERY} from '~/queries/sanity/home';

const seo: SeoHandleFunction = ({data}) => ({
  title: data?.page?.seo?.title || 'Sanity x Hydrogen',
  description:
    data?.page?.seo?.description ||
    'A custom storefront powered by Hydrogen and Sanity',
});

<<<<<<< HEAD
export const handle = {
  seo,
};

export async function loader({context, params}: LoaderFunctionArgs) {
  validateLocale({context, params});
=======
export const handle = { seo };

export async function loader({ context, params, request }: LoaderFunctionArgs) {
  validateLocale({ context, params });
>>>>>>> 3097ce2e79576a54ef13bd1a5712ec165470d926

  const cache = context.storefront.CacheCustom({
    mode: 'public',
    maxAge: 60,
    staleWhileRevalidate: 60,
  });

<<<<<<< HEAD
=======
  const url = new URL(request.url);
  const q = url.searchParams.get('q') || '';

>>>>>>> 3097ce2e79576a54ef13bd1a5712ec165470d926
  const page = await context.sanity.query<SanityHomePage>({
    query: HOME_PAGE_QUERY,
    cache,
  });
<<<<<<< HEAD
  
  if (!page) {
    throw notFound();
  }
const layout = await context.sanity.query({
    query: LAYOUT_QUERY,
    cache,
  });
  // Resolve any references to products on the Storefront API
  const gids = fetchGids({page, context});
  return defer({
    page,
    layout,
    gids,
    analytics: {
      pageType: AnalyticsPageType.home,
    },
=======

  if (!page) throw notFound();

  let results = { locations: [], products: [] };

  if (q) {
    // Prepare search string with wildcard for each field
    const searchParam = `${q}*`;
    
    console.log('Searching for:', q, 'with param:', searchParam);
    
    try {
      results = await context.sanity.query({
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
          },
          "products": *[_type == "product" && (
            title match $search ||
            description match $search ||
            store.title match $search
          )][0...5]{
            _id,
            _type,
          "title": store.title, 
            "handle": select(store.slug.current != null => store.slug.current, "")
          }
        }`,
        params: { search: searchParam },
      });
      
   
    } catch (error) {
      console.error('Search error:', error);
    }
  }
  
  // Merge both arrays and add type field for consistency
  const mergedResults = [
    ...(results.locations || []).map(item => ({ ...item, type: 'location' })),
    ...(results.products || []).map(item => ({ ...item, type: 'product' }))
  ];
  
  const gids = fetchGids({ page, context });

  return defer({
    page,
    gids,
    mergedResults, // This is now synchronous data
    q,
    analytics: { pageType: AnalyticsPageType.home },
>>>>>>> 3097ce2e79576a54ef13bd1a5712ec165470d926
  });
}


export default function Index() {
<<<<<<< HEAD
  const {page, gids,layout} = useLoaderData<typeof loader>();
   
 console.log("pageeeeeeeeeeee", JSON.stringify(page.modules, null, 2));

  return (
    
    // <SanityPreview data={page} query={HOME_PAGE_QUERY}>
    //   {(page) => (
    //     <Suspense>
    //       <Await resolve={gids}>
    //         {/* <Header/> */}
    //         <Navbar data={layout.menu} />
    //         {/* Page hero */}
 
    //        {page?.slider && <Swiper slider={page.slider} />}


    //       {page?.welcome && <HealthCenterHero data={page.welcome} />}
    //       {/* Doctors list */}
       
    //    {page?.doctors && <DoctorCard doctors={page.doctors} />}
    //     {page?.latestNews && <LatestNews latestNews={page.latestNews} />}
    //   {page?.appointment && <Appointment appointment={page.appointment} />}
    //   {page?.map && <Map map={page.map} />}
     
    //         {/* {page?.modules && (
    //           <div className={clsx('mb-32 mt-24 px-4', 'md:px-8')}>
    //             <ModuleGrid items={page.modules} />
    //           </div>
    //         )} */}

 
    //          <Footer data={layout.footer} />
    //       </Await>
    //     </Suspense>
    //   )}
    // </SanityPreview>
    <SanityPreview data={page} query={HOME_PAGE_QUERY}>
  {(page) => (
    <Suspense>
      <Await resolve={gids}>
        <Navbar data={layout.menu} />

        {/* Render modules dynamically */}
        {page?.modules && (
          <div className={clsx('mb-32 mt-24 px-4', 'md:px-8')}>
            {page.modules.map((module, index) => {
              switch (module._type) {
                case 'slider':
                  return <Swiper key={index} slider={module} />;
                case 'welcomeSection':
                  return <HealthCenterHero key={index} data={module} />;
                case 'doctorSection':
                  return <DoctorCard key={index} doctors={module.doctors} />;
                case 'latestNewsSection':
                  return <LatestNews key={index} latestNews={module.latestNews} />;
                case 'appointmentSection':
                  return <Appointment key={index} appointment={module} />;
                case 'mapSection':
                  return <Map key={index} map={module} />;
                case 'seo':
                  return null; // SEO handled in handle function, no UI
                case 'grid':
                  return <ModuleGrid key={index} items={module.items} />;
                default:
                  return null;
              }
            })}
          </div>
        )}

        <Footer data={layout.footer} />
      </Await>
    </Suspense>
  )}
</SanityPreview>
  );
}
=======
  const { page, gids, mergedResults, q } = useLoaderData<typeof loader>();

  return (
    <>
      <SanityPreview data={page} query={HOME_PAGE_QUERY}>
        {(page) => (
          <Suspense>
            <Await resolve={gids}>
              {/* Unified search box - Now mergedResults is available immediately */}
              <div className="flex flex-col items-center my-24">
                <h2 className="text-lg font-semibold mb-4">Search Locations & Products</h2>
                <Search initialResults={mergedResults} initialQuery={q} />
              </div>

              {/* Page hero */}
              {page?.hero && <HomeHero hero={page.hero} />}

              {/* Page modules */}
              {page?.modules && (
                <div className={clsx('mb-32 mt-24 px-4', 'md:px-8')}>
                  <ModuleGrid items={page.modules} />
                </div>
              )}
            </Await>
          </Suspense>
        )}
      </SanityPreview>
    </>
  );
}
>>>>>>> 3097ce2e79576a54ef13bd1a5712ec165470d926
