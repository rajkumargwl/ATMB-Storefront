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
import { ANYTIME_PHONE_PAGE_QUERY } from '~/queries/sanity/fragments/pages/anytimePhonepage';
import { fetchBundleProducts } from '~/lib/bundle.server';
import { fetchIndividualProducts } from '~/lib/individualProduct.server';
// -----------------
// SEO
// -----------------
const seo: SeoHandleFunction = ({ data }) => ({
  title:
    data?.page?.seo?.title || 'Anytime Phone - Anytime Mailbox',
  description:
    data?.page?.seo?.description ||
    'Explore the Anytime Phone solutions powered by Sanity and Hydrogen.',
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

  // Fetch the page data from Sanity
  /*const page = await context.sanity.query({
    query: ANYTIME_PHONE_PAGE_QUERY,
    params: { language  }
  });*/
  const cache = context.storefront.CacheCustom({
    mode: "public",
    maxAge: 60,
    staleWhileRevalidate: 60,
  });
  const [page, bundles,individualProducts] = await Promise.all([
    context.sanity.query({
      query: ANYTIME_PHONE_PAGE_QUERY,
      params: { language },
      cache,
    }),
    fetchBundleProducts(context), 
    fetchIndividualProducts(context), // Fetch individual products
  ]);
  if (!page) throw notFound();

  const gids = fetchGids({ page, context });

  return defer({
    page,
    bundles,
    individualProducts,
    gids,
    analytics: { pageType: AnalyticsPageType.page },
  });
}

// -----------------
// Component
// -----------------
export default function AnytimePhonePage() {
  const { page, gids,bundles,individualProducts } = useLoaderData<typeof loader>();

  return (
    <SanityPreview data={page} query={ANYTIME_PHONE_PAGE_QUERY}>
      {(page) => (
        <Suspense>
          <Await resolve={gids}>
            {page?.modules && page.modules.length > 0 && (
              <div className={clsx('mb-0 mt-0 px-0', 'md:px-0')}>
                <ModuleGrid items={page.modules}  bundles={bundles} individualProducts={individualProducts}/>
              </div>
            )}
          </Await>
        </Suspense>
      )}
    </SanityPreview>
  );
}
