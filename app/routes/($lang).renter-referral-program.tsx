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

import ModuleGrid from '~/components/modules/ModuleGrid';
import { fetchGids, notFound, validateLocale } from '~/lib/utils';

import { RENTER_PAGE_QUERY } from '~/queries/sanity/fragments/pages/renterPage'; 

// -----------------
// SEO and Handle
// -----------------
const seo: SeoHandleFunction = ({ data }) => ({
  title: data?.page?.seo?.title || 'Renter Referral Program | Anytime Mailbox',
  description: data?.page?.seo?.description || 'Refer friends and earn rewards.',
});
export const handle = { seo };

// -----------------
// Loader - SLUG-Only Fetch
// -----------------
export async function loader({ context, params }: LoaderFunctionArgs) {
  validateLocale({ context, params });
  let language = params.lang || 'en';
  if(language !== 'en-es'){
    language = 'en';
  }



  try {
  
    const pageResults = await context.sanity.query({
      query: RENTER_PAGE_QUERY,
      params: { language  }
    });
    
    // Extract the single page object
    const page = pageResults?.[0];

    if (!page) {
 
      throw notFound();
    }
    

    
    const gids = fetchGids({ page, context });

    return defer({
      page,
      gids,
      analytics: { pageType: AnalyticsPageType.page },
    });
  } catch (error) {

    throw notFound();
  }
}

// -----------------
// Component (No Change)
// -----------------
export default function RenterReferralProgram() {
  const { page, gids } = useLoaderData<typeof loader>();



  return (
    <SanityPreview data={page} query={RENTER_PAGE_QUERY}> 
      {(page) => (
        <Suspense>
          <Await resolve={gids}>
            <div className={clsx('mb-0 mt-0 px-0', 'md:px-0')}>
              {page?.modules && page.modules.length > 0 ? (
                <ModuleGrid items={page.modules} />
              ) : page ? (
                <div className="text-center py-16">
                  <h1 className="text-2xl font-bold mb-4">{page.title || 'Renter Referral Program'}</h1>
                  <p className="text-gray-600">Page found but no modules configured.</p>
                  <pre className="mt-4 text-left bg-gray-100 p-4 rounded">
                    {JSON.stringify(page, null, 2)}
                  </pre>
                </div>
              ) : (
                <div className="text-center py-16">
                  <h1 className="text-2xl font-bold mb-4">Renter Referral Program</h1>
                  <p className="text-gray-600">Page not found in Sanity.</p>
                </div>
              )}
            </div>
          </Await>
        </Suspense>
      )}
    </SanityPreview>
  );
}