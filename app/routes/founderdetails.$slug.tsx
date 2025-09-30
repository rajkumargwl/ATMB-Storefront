import { Await, useLoaderData } from '@remix-run/react';
import {
  AnalyticsPageType,
  type SeoHandleFunction,
} from '@shopify/hydrogen';
import {
  defer,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import { Suspense } from 'react';
import { SanityPreview } from 'hydrogen-sanity';

import { fetchGids, validateLocale } from '~/lib/utils';
import { FOUNDER_DETAIL_PAGE_QUERY } from '~/queries/sanity/fragments/pages/founderdetailpage';

// -----------------
// SEO
// -----------------
const seo: SeoHandleFunction = ({ data }) => ({
  title: data?.founder?.seo?.title || data?.founder?.title || 'Founder Details',
  description:
    data?.founder?.seo?.description ||
    (data?.founder?.title ? `Learn more about ${data.founder.title}` : 'Learn more about our founder'),
});
export const handle = { seo };

// -----------------
// Loader
// -----------------
export async function loader({ context, params }: LoaderFunctionArgs) {
  validateLocale({ context, params });

  // 👇 if slug not provided, return gracefully
  if (!params?.slug) {
    return defer({
      founder: null,
      gids: null,
      analytics: { pageType: AnalyticsPageType.page },
    });
  }

  const founder = await context.sanity.query({
    query: FOUNDER_DETAIL_PAGE_QUERY,
    params: { slug: params.slug },
  });

  if (!founder) {
    return defer({
      founder: null,
      gids: null,
      analytics: { pageType: AnalyticsPageType.page },
    });
  }

  const gids = fetchGids({ page: founder, context });

  return defer({
    founder,
    gids,
    analytics: { pageType: AnalyticsPageType.page },
  });
}

// -----------------
// Component
// -----------------
export default function FounderDetails() {
  const { founder, gids } = useLoaderData<typeof loader>();

  // fallback UI when slug missing or founder not found
  if (!founder) {
    return (
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        <h2 className="text-sm text-gray-500 mb-4">
          About us &gt; Our founder
        </h2>
        <p className="text-gray-600">
          Founder details are not available at the moment.
        </p>
      </div>
    );
  }

  // unwrap the data
  const founderData = founder?.modules?.[0]?.founders;

  return (
    <SanityPreview data={founder} query={FOUNDER_DETAIL_PAGE_QUERY}>
      {(founder) => (
        <Suspense>
          <Await resolve={gids}>
            <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
              <h2 className="text-sm text-gray-500 mb-4">
                About us &gt; Our founder
              </h2>

              <div className="grid md:grid-cols-2 gap-10 items-start">
                {/* Profile Image */}
                {founderData?.profileImage?.url && (
                  <div className="flex justify-center">
                    <img
                      src={founderData.profileImage.url}
                      alt={founderData?.name}
                      className="rounded-2xl object-cover w-[300px] h-[350px]"
                    />
                  </div>
                )}

                {/* Content */}
                <div>
                  <h1 className="text-4xl font-bold mb-2">
                    {founderData?.name}
                  </h1>
                  <p className="text-lg text-gray-600 mb-6">
                    {founderData?.role}
                  </p>

                  {/* LinkedIn or other socials */}
                  {founderData?.socialLinks && (
                    <div className="mb-6">
                      <a
                        href={founderData.socialLinks}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100"
                      >
                        {/* LinkedIn SVG */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 
                          5v14c0 2.761 2.239 5 5 
                          5h14c2.761 0 5-2.239 
                          5-5v-14c0-2.761-2.239-5-5-5zm-11 
                          19h-3v-10h3v10zm-1.5-11.268c-.966 
                          0-1.75-.79-1.75-1.764s.784-1.764 
                          1.75-1.764 1.75.79 
                          1.75 1.764-.784 1.764-1.75 
                          1.764zm13.5 
                          11.268h-3v-5.604c0-1.337-.027-3.061-1.865-3.061-1.868 
                          0-2.154 1.46-2.154 
                          2.966v5.699h-3v-10h2.879v1.367h.041c.401-.761 
                          1.379-1.562 2.839-1.562 3.037 0 
                          3.6 2.001 3.6 
                          4.601v5.594z" />
                        </svg>
                        View Profile
                      </a>
                    </div>
                  )}

                  {/* Long Bio */}
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    {founderData?.longBio?.map((block: any) => (
                      <p key={block._key}>
                        {block.children
                          ?.map((child: any) => child.text)
                          .join('')}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Await>
        </Suspense>
      )}
    </SanityPreview>
  );
}
