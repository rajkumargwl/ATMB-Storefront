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

import { SMALL_BUSINESS_OWNER_PAGE_QUERY } from '~/queries/sanity/fragments/pages/smallBusinessOwnerPage';

// -----------------
// SEO
// -----------------
const seo: SeoHandleFunction = ({ data }) => ({
  title:
    data?.page?.seo?.title ||
    'Small Business Owner - Anytime Mailbox',
  description:
    data?.page?.seo?.description ||
    'Run your business anywhere without the hassle — explore features built for small business owners.',
});
export const handle = { seo };

// -----------------
// Loader
// -----------------
export async function loader({ context, params }: LoaderFunctionArgs) {
  validateLocale({ context, params });

  // ✅ Fetch Sanity data for "Small Business Owner" page
  const page = await context.sanity.query({
    query: SMALL_BUSINESS_OWNER_PAGE_QUERY,
  });

  if (!page) throw notFound();

  // Optional: Access specific module type
  const smallBusinessOwnerModule = page?.modules?.find(
    (mod: any) => mod._type === 'smallBusinessOwnerSection'
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
export default function SmallBusinessOwnerPage() {
  const { page, gids } = useLoaderData<typeof loader>();

  return (
    <SanityPreview data={page} query={SMALL_BUSINESS_OWNER_PAGE_QUERY}>
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
