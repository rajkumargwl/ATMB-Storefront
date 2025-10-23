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

import { ANYTIME_MOBILE_APP_PAGE_QUERY } from '~/queries/sanity/fragments/pages/anytimemobilepage';

// -----------------
// SEO
// -----------------
const seo: SeoHandleFunction = ({ data }) => ({
  title:
    data?.page?.seo?.title ||
    'Anytime Mobile App - Manage Your Business Anywhere',
  description:
    data?.page?.seo?.description ||
    'Download the Anytime mobile apps for small business owners and mailbox renters to manage everything on the go.',
});
export const handle = { seo };

// -----------------
// Loader
// -----------------
export async function loader({ context, params }: LoaderFunctionArgs) {
  validateLocale({ context, params });

  // Fetch the Anytime Mobile App page data
  const page = await context.sanity.query({
    query: ANYTIME_MOBILE_APP_PAGE_QUERY,
  });

 
  if (!page) throw notFound();

 const anytimemobile = page?.modules?.find(
    (mod: any) => mod._type === 'anytimemobile'
  );


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
export default function AnytimeMobileApp() {
  const { page, gids } = useLoaderData<typeof loader>();

 return (
     <SanityPreview data={page} query={ANYTIME_MOBILE_APP_PAGE_QUERY}>
       {(page) => (
         <Suspense>
           <Await resolve={gids}>
             {page?.modules && page.modules.length > 0 && (
              <div className={clsx('mb-0 mt-0 px-0', 'md:px-0')}>
                 <ModuleGrid items={page.modules} />
               </div>
             )}
           </Await>
         </Suspense>
       )}
     </SanityPreview>
   );
}
