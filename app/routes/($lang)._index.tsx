import {Await, useLoaderData} from '@remix-run/react';
import {AnalyticsPageType, type SeoHandleFunction} from '@shopify/hydrogen';
import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import clsx from 'clsx';
import {SanityPreview} from 'hydrogen-sanity';
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

import {fetchGids, notFound, validateLocale} from '~/lib/utils';
import {HOME_PAGE_QUERY} from '~/queries/sanity/home';

const seo: SeoHandleFunction = ({data}) => ({
  title: data?.page?.seo?.title || 'Sanity x Hydrogen',
  description:
    data?.page?.seo?.description ||
    'A custom storefront powered by Hydrogen and Sanity',
});

export const handle = {
  seo,
};

export async function loader({context, params}: LoaderFunctionArgs) {
  validateLocale({context, params});

  const cache = context.storefront.CacheCustom({
    mode: 'public',
    maxAge: 60,
    staleWhileRevalidate: 60,
  });

  const page = await context.sanity.query<SanityHomePage>({
    query: HOME_PAGE_QUERY,
    cache,
  });
  
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
  });
}


export default function Index() {
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
