// app/routes/business-accelerator.tsx

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

import { BUSINESS_ACCELERATOR_PAGE_QUERY } from '~/queries/sanity/fragments/pages/businessAcceleratorPageQuery';
import { fetchBundleProducts } from '~/lib/bundle.server';

// -----------------
// SEO
// -----------------
const seo: SeoHandleFunction = ({ data }) => ({
  title:
    data?.page?.seo?.title || 'Business Accelerator - Anytime | Mailbox',
  description:
    data?.page?.seo?.description ||
    'Explore our Business Accelerator program and resources.',
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
   
  // const page = await context.sanity.query({
  //   query: BUSINESS_ACCELERATOR_PAGE_QUERY,
  //   params: { language  }
  // });
  const cache = context.storefront.CacheCustom({
    mode: "public",
    maxAge: 60,
    staleWhileRevalidate: 60,
  });
  const [page, bundles] = await Promise.all([
    context.sanity.query({
      query: BUSINESS_ACCELERATOR_PAGE_QUERY,
      params: { language },
      cache,
    }),
    fetchBundleProducts(context), 
  ]);
  // if (!page) throw notFound();


  const gids = fetchGids({ page, context });

  return defer({
    page,
    bundles,
    gids,
    analytics: { pageType: AnalyticsPageType.page },
  });
}

// -----------------
// Component
// -----------------
export default function BusinessAccelerator() {
  const { page, gids,bundles } = useLoaderData<typeof loader>();

  return (
    <SanityPreview data={page} query={BUSINESS_ACCELERATOR_PAGE_QUERY}>
      {(page) => (
        <Suspense>
          <Await resolve={gids}>
            {page?.modules && page.modules.length > 0 && (
             <div className={clsx('mb-0 mt-0 px-0', 'md:px-0')}>
                <ModuleGrid items={page.modules} bundles={bundles}/>
              </div>
            )}
          </Await>
        </Suspense>
      )}
    </SanityPreview>
  );
}
