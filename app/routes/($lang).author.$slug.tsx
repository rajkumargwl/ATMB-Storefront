import { PortableText } from '@portabletext/react';
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

// -----------------
// GROQ QUERY
// -----------------
const AUTHOR_DETAIL_QUERY = `
*[_type == "author" && slug.current == $slug][0]{
  _id,
  name,
  "slug": slug.current,
  image{
    asset->{
      url
    },
    alt
  },
  introduction[]{
    ...,
  },
  linkedinUrl,
  seo{
    title,
    description,
    image{
      asset->{
        url
      }
    }
  }
}
`;

// -----------------
// SEO
// -----------------
const seo: SeoHandleFunction = ({ data }) => ({
  title: data?.author?.seo?.title || data?.author?.name || 'Author',
  description:
    data?.author?.seo?.description ||
    'Meet our author and discover their work and insights.',
  image: data?.author?.seo?.image?.asset?.url,
});
export const handle = { seo };

// -----------------
// Loader
// -----------------
export async function loader({ context, params }: LoaderFunctionArgs) {
  validateLocale({ context, params });

  let language = params.lang || 'en';
  if (language !== 'en-es') {
    language = 'en';
  }

  const slug = params.slug;

  if (!slug) throw notFound();

  const author = await context.sanity.query({
    query: AUTHOR_DETAIL_QUERY,
    params: { slug },
  });

//   if (!author) throw notFound();

  const gids = fetchGids({ page: author, context });
   console.log("aaaaaaaaaa",author);
  return defer({
    author,
    gids,
    analytics: { pageType: AnalyticsPageType.page },
  });
}

// -----------------
// Component
// -----------------
export default function AuthorDetailPage() {
  const { author, gids } = useLoaderData<typeof loader>();

  return (
    <SanityPreview data={author} query={AUTHOR_DETAIL_QUERY}>
      {(author) => (
        <Suspense>
          <Await resolve={gids}>
            <div className={clsx('container mx-auto px-4 py-8')}>
              <div className="grid md:grid-cols-3 gap-8 items-start">
                {/* Author Image */}
                {author?.image?.asset?.url && (
                  <div className="md:col-span-1">
                    <img
                      src={author.image.asset.url}
                      alt={author.image.alt || author.name}
                      className="rounded-2xl w-full object-cover"
                    />
                  </div>
                )}

                {/* Author Details */}
                <div className="md:col-span-2">
                  <h1 className="text-3xl font-bold mb-2">{author?.name}</h1>

                  {author?.introduction && (
                    <div className="prose max-w-none mb-6">
                      {/* Render Portable Text here */}
                      {/* Replace with your PortableText component if using hydrogen-sanity */}
                      {/* <pre>{JSON.stringify(author.introduction, null, 2)}</pre> */}
                      <PortableText data= {author.introduction} />
                    </div>
                  )}

                  {author?.linkedinUrl && (
                    <a
                      href={author.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 font-semibold hover:underline"
                    >
                      View LinkedIn Profile →
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Await>
        </Suspense>
      )}
    </SanityPreview>
  );
}
