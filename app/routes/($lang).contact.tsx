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

// 👇 import the CONTACT US PAGE query
import { CONTACT_US_PAGE_QUERY } from '~/queries/sanity/fragments/pages/contactus';

// -----------------
// SEO
// -----------------
const seo: SeoHandleFunction = ({ data }) => ({
  title: data?.page?.seo?.title || 'Contact Us - Sanity x Hydrogen',
  description:
    data?.page?.seo?.description ||
    'Get in touch with our team via phone, email, or support.',
});
export const handle = { seo };

// -----------------
// Loader
// -----------------
export async function loader({ context, params }: LoaderFunctionArgs) {
  validateLocale({ context, params });

  const page = await context.sanity.query({
    query: CONTACT_US_PAGE_QUERY,
  });
 

  // If no page found in Sanity
  if (!page) throw notFound();

  // 🔍 If you want to extract a specific module (like you did for AboutUs):
  // const contactModule = page?.modules?.find(
  //   (mod: any) => mod._type === 'contactUsModule'
  // );

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
export default function ContactUs() {
  const { page, gids } = useLoaderData<typeof loader>();

  return (
    <SanityPreview data={page} query={CONTACT_US_PAGE_QUERY}>
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
