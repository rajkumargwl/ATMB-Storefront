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
import { HOW_IT_WORKS_PAGE_QUERY } from '~/queries/sanity/fragments/pages/howitworkspage';

// -----------------
// SEO
// -----------------
const seo: SeoHandleFunction = ({ data }) => ({
  title: data?.page?.seo?.title || 'How It Works - Virtual Mailbox',
  description:
    data?.page?.seo?.description ||
    'Learn how our virtual mailbox service works and manage your mail online from anywhere.',
});
export const handle = { seo };

// -----------------
// Loader
// -----------------
export async function loader({ context, params }: LoaderFunctionArgs) {
  validateLocale({ context, params });
  let language = params.lang || 'en';
  if(language !== 'en-es'){
    language = 'en';
  }

  const page = await context.sanity.query({
    query: HOW_IT_WORKS_PAGE_QUERY,
    params: { language },
  });

  if (!page) throw notFound();

  const gids = fetchGids({ page, context });
  console.log("howwwwwwwwww",JSON.stringify(page,null,2));
  return defer({
    page,
    gids,
    analytics: { pageType: AnalyticsPageType.page },
  });
}

// -----------------
// Component
// -----------------
export default function HowItWorks() {
  const { page, gids } = useLoaderData<typeof loader>();

  return (
    <SanityPreview data={page} query={HOW_IT_WORKS_PAGE_QUERY}>
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