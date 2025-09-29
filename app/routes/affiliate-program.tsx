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

// 👇 import the Affiliate PAGE query
import { AFFILIATE_PAGE_QUERY } from '~/queries/sanity/fragments/pages/affiliatedprogrampage';

// -----------------
// SEO
// -----------------
const seo: SeoHandleFunction = ({ data }) => ({
  title: data?.page?.seo?.title || 'Affiliate Program - Sanity x Hydrogen',
  description:
    data?.page?.seo?.description ||
    'Join our affiliate program and start earning today.',
});
export const handle = { seo };

// -----------------
// Loader
// -----------------
export async function loader({ context, params }: LoaderFunctionArgs) {
  validateLocale({ context, params });

  const page = await context.sanity.query({
    query: AFFILIATE_PAGE_QUERY,
  });

   console.log("Sanity page:", JSON.stringify(page, null, 2));

  // if (!page) {
  //   throw notFound(); // fallback if page doesn't exist
  // }

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
export default function AffiliateProgram() {
  const { page, gids } = useLoaderData<typeof loader>();

  return (
    <SanityPreview data={page} query={AFFILIATE_PAGE_QUERY}>
      {(page) => (
        <Suspense>
          <Await resolve={gids}>
            {page?.modules && page.modules.length > 0 && (
              <div className={clsx('mb-32 mt-24 px-4', 'md:px-8')}>
                <ModuleGrid items={page.modules} />
              </div>
            )}
          </Await>
        </Suspense>
      )}
    </SanityPreview>
  );
}
