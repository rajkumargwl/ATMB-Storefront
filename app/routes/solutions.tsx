// ./app/routes/solution.tsx
import {
  Await,
  useLoaderData,
} from '@remix-run/react';
import {AnalyticsPageType, type SeoHandleFunction} from '@shopify/hydrogen';
import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {SanityPreview} from 'hydrogen-sanity';
import {Suspense} from 'react';
import Header from '~/components/global/Header';
import Footer from '~/components/global/Footer';
import ModuleGrid from '~/components/modules/ModuleGrid';
import {validateLocale, notFound, fetchGids} from '~/lib/utils';

// Queries
import {SOLUTION_PAGE} from '~/queries/sanity/fragments/pages/solutions';
import {HEADER_QUERY} from '~/queries/sanity/header';
import {FOOTER_QUERY} from '~/queries/sanity/footer';

// const seo: SeoHandleFunction = ({data}) => ({
//   title: data?.page?.seo?.title || 'Solutions - Anytime Phones',
//   description:
//     data?.page?.seo?.description ||
//     'Explore solutions powered by Anytime Phones',
// });

// export const handle = {seo};

export async function loader({context, params}: LoaderFunctionArgs) {
  validateLocale({context, params});
  const cache = context.storefront.CacheCustom({
    mode: 'public',
    maxAge: 60,
    staleWhileRevalidate: 60,
  });
   
  // Fetch all data in parallel
  const [page, header, footer] = await Promise.all([
    context.sanity.query({query: SOLUTION_PAGE, cache}),
    context.sanity.query({query: HEADER_QUERY, cache}),
    context.sanity.query({query: FOOTER_QUERY, cache}),
  ]);
// console.log('Page JSON:', JSON.stringify(page, null, 2));
  if (!page) throw notFound();

  const gids = fetchGids({page, context});

  return defer({
    page,
    header,
    footer,
    gids,
    analytics: {pageType: AnalyticsPageType.page}, // pageType "page" since this is solutions
  });
}

export default function Solution() {
  const {page, header, footer, gids} = useLoaderData<typeof loader>();

  return (
    <>
      <Header data={header} />
      <SanityPreview data={page} query={SOLUTION_PAGE}>
        {(page) => (
          <Suspense>
            <Await resolve={gids}>
              {/* Modules */}
              {page?.modules && <ModuleGrid items={page.modules} />}
            </Await>
          </Suspense>
        )}
      </SanityPreview>
      <Footer data={footer} />
    </>
  );
}
