import { Await, useLoaderData } from '@remix-run/react';
import { AnalyticsPageType, type SeoHandleFunction } from '@shopify/hydrogen';
import { defer, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import clsx from 'clsx';
import { SanityPreview } from 'hydrogen-sanity';
import { Suspense } from 'react';
 
import USPSForm1583Module from '~/components/modules/USPSForm1583'; // 👈 Import directly
import { fetchGids, notFound, validateLocale } from '~/lib/utils';
import { USPS_FORM_1583_PAGE_QUERY } from '~/queries/sanity/fragments/pages/uspsForm1583';
 
// --- SEO ---
const seo: SeoHandleFunction = ({ data }) => ({
  title: data?.page?.seo?.title || 'USPS Form 1583',
  description: data?.page?.seo?.description || 'Download and learn how to fill out USPS Form 1583.',
});
export const handle = { seo };
 
// --- Loader ---
export async function loader({ context, params }: LoaderFunctionArgs) {
  validateLocale({ context, params });
  let language = params.lang || 'en';
  if(language !== 'en-es'){
    language = 'en';
  }

 
  const page = await context.sanity.query({
    query: USPS_FORM_1583_PAGE_QUERY,
    params: { language  }
  });
 
 
  
  const pageData = page && page.length > 0 ? page[0] : null;
 
  if (!pageData) {
    console.log('❌ Page not found for slug: usps-form-1583');
    throw notFound();
  }
 
  const gids = fetchGids({ page: pageData, context });
 
  return defer({
    page: pageData,
    gids,
    analytics: { pageType: AnalyticsPageType.page },
  });
}
 
// --- Component ---
export default function USPSForm1583Page() {
  const { page, gids } = useLoaderData<typeof loader>();
 
  return (
    <SanityPreview data={page} query={USPS_FORM_1583_PAGE_QUERY}>
      {(page) => (
        <Suspense>
          <Await resolve={gids}>
            <div className={clsx('mb-0', 'md:px-0')}>
              {/* Render USPS modules directly */}
              {page?.modules?.map((module: any) => {
                if (module._type === 'uspsForm1583') {
                  return <USPSForm1583Module key={module._key} module={module} />;
                }
                return null;
              })}
              
              {/* Show message if no modules found */}
              {(!page?.modules || page.modules.length === 0) && (
                <div className="text-center py-16">
                  <h1 className="text-2xl font-bold mb-4">No modules found on this page.</h1>
                  <p className="text-gray-600">Page title: {page?.title || 'Unknown'}</p>
                </div>
              )}
            </div>
          </Await>
        </Suspense>
      )}
    </SanityPreview>
  );
}