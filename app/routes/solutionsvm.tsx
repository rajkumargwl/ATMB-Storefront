// app/routes/solutions.tsx

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

import { SOLUTIONS_PAGE_QUERY } from '~/queries/sanity/fragments/pages/solutionpage';

// -----------------
// SEO
// -----------------
const seo: SeoHandleFunction = ({ data }) => ({
  title: data?.page?.seo?.title || 'Solutions - Sanity x Hydrogen',
  description:
    data?.page?.seo?.description ||
    'Explore our virtual mailbox solutions and benefits.',
});
export const handle = { seo };
// -----------------
// Loader
// -----------------
export async function loader({ context, params }: LoaderFunctionArgs) {
  validateLocale({ context, params });

  const page = await context.sanity.query({
    query: SOLUTIONS_PAGE_QUERY, // ✅ use Solutions query
  });
   
  // Optionally: pick specific solution module
//   const solutionPageModule = page?.modules?.find(
//     (mod: any) => mod._type === 'solutionPageModule'
//   );

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
export default function SolutionsPage() {
  const { page, gids } = useLoaderData<typeof loader>();

  return (
    <SanityPreview data={page} query={SOLUTIONS_PAGE_QUERY}>
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
