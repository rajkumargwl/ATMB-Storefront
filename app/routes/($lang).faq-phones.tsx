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

import { FAQ_PHONES_PAGE } from '~/queries/sanity/fragments/pages/faqphones';

// -----------------
// SEO
// -----------------
const seo: SeoHandleFunction = ({ data }) => ({
  title: data?.page?.seo?.title || 'FAQ - Anytime Mailbox',
  description:
    data?.page?.seo?.description ||
    'Find answers to common questions about Anytime Mailbox services.',
});
export const handle = { seo };

// -----------------
// Loader
// -----------------
export async function loader({ context, params }: LoaderFunctionArgs) {
  validateLocale({ context, params });

  const page = await context.sanity.query({
    query: FAQ_PHONES_PAGE,
  });

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
export default function FAQ() {
  const { page, gids } = useLoaderData<typeof loader>();

  return (
    <SanityPreview data={page} query={FAQ_PHONES_PAGE}>
      {(page) => (
        <Suspense>
          <Await resolve={gids}>
            {page?.modules && page.modules.length > 0 && (
              <div className={clsx('')}>
                <ModuleGrid items={page.modules} />
              </div>
            )}
          </Await>
        </Suspense>
      )}
    </SanityPreview>
  );
}
