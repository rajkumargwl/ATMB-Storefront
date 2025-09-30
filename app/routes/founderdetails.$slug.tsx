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

import { fetchGids, notFound, validateLocale } from '~/lib/utils';

// import your Founder query
import { FOUNDER_DETAIL_PAGE_QUERY } from '~/queries/sanity/fragments/pages/founderdetailpage';

// -----------------
// SEO
// -----------------
const seo: SeoHandleFunction = ({ data }) => ({
  title: data?.founder?.seo?.title || data?.founder?.title || 'Founder Details',
  description:
    data?.founder?.seo?.description ||
    `Learn more about ${data?.founder?.title}`,
});
export const handle = { seo };

// -----------------
// Loader
// -----------------
export async function loader({ context, params }: LoaderFunctionArgs) {
  validateLocale({ context, params });

  if (!params.slug) throw notFound();

  const founder = await context.sanity.query({
    query: FOUNDER_DETAIL_PAGE_QUERY,
    params: { slug: params.slug },
  });

  if (!founder) throw notFound();

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

  // unwrap the data from your response
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
                      src={founderData?.profileImage.url}
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M19 0h-14c-2.761... (linkedin svg path)" />
                        </svg>
                        View Profile
                      </a>
                    </div>
                  )}

                  {/* Long Bio */}
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    {founderData?.longBio?.map((block: any) => (
                      <p key={block._key}>
                        {block.children?.map((child: any) => child.text).join('')}
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
