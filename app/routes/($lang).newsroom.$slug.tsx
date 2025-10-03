import { json, type LoaderFunctionArgs } from "@shopify/remix-oxygen";
import { useLoaderData, Link } from "@remix-run/react";
import { Image } from '@shopify/hydrogen';
import { PortableText } from '@portabletext/react';

export async function loader({ params, context }: LoaderFunctionArgs) {
  const { slug } = params;

  const newsItem = await context.sanity.query({
    query: `*[_type == "news" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      description,
      date,
      featuredImage {
        asset->{
          _id,
          url,
          metadata { dimensions { width, height } }
        },
        alt
      },
      logoImage {
        asset->{
          _id,
          url,
          metadata { dimensions { width, height } }
        },
        alt
      }
    }`,
    params: { slug },
  });

  if (!newsItem) throw new Response(null, { status: 404 });

  // Use the exact date (YYYY-MM-DD) for matching related news
  const newsDate = new Date(newsItem.date).toISOString().split('T')[0]; 

  const relatedNews = await context.sanity.query({
    query: `*[_type == "news" && date match $date && slug.current != $slug] | order(date desc)[0...3] {
      _id,
      title,
      "slug": slug.current,
      description,
      date,
      logoImage {
        asset->{
          _id,
          url,
          metadata { dimensions { width, height } }
        },
        alt
      }
    }`,
    params: { date: `${newsDate}*`, slug } 
  });

  return json({ newsItem, relatedNews });
}


// PortableText components
const ptComponents = {
  block: {
    normal: ({ children }: any) => <p>{children}</p>,
  },
  marks: {},
  types: {},
};

// Format date helper
const formatDate = (dateString: string) => {
  if (!dateString) return "Date N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Component
export default function NewsroomDetailPage() {
  const { newsItem, relatedNews } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8 lg:py-12 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Breadcrumbs */}
          <div className="flex justify-between items-end border-b border-gray-100 pb-3 mb-6">
            <div className="flex items-center text-sm font-medium text-gray-500">
              <Link to="/newsroom" className="hover:text-gray-700 transition">Newsroom</Link>
              <span className="mx-2 text-gray-400">&gt;</span>
              <span className="text-gray-900 font-semibold">Newsroom Detail</span>
            </div>
            <div className="flex-shrink-0 text-gray-700 font-semibold text-sm">
              {newsItem.logoImage ? (
                <Image
                  data={{
                    id: newsItem.logoImage.asset._id,
                    url: newsItem.logoImage.asset.url,
                    altText: newsItem.logoImage.alt || "Logo",
                    width: newsItem.logoImage.asset.metadata?.dimensions?.width,
                    height: newsItem.logoImage.asset.metadata?.dimensions?.height,
                  }}
                  className="h-6 w-auto object-contain"
                  sizes="(max-width: 1024px) 100vw, 150px"
                />
              ) : (
                <span className="text-base text-gray-900">ANYTIME MAILBOX</span>
              )}
            </div>
          </div>

          {/* Main Title and Date */}
          <div className="mb-10">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3 leading-tight">
              {newsItem.title}
            </h1>
            <div className="flex items-center gap-2 text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 10h.01M16 13h.01M9 17h.01M15 17h.01M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <time className="text-base font-medium" dateTime={newsItem.date}>
                {formatDate(newsItem.date)}
              </time>
            </div>
          </div>

       
          <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-12">
            <div className="lg:col-span-3">
              {newsItem.featuredImage && (
                <div className="relative mb-12 rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    data={{
                      id: newsItem.featuredImage.asset._id,
                      url: newsItem.featuredImage.asset.url,
                      altText: newsItem.featuredImage.alt || newsItem.title,
                      width: newsItem.featuredImage.asset.metadata?.dimensions?.width,
                      height: newsItem.featuredImage.asset.metadata?.dimensions?.height,
                    }}
                    className="w-full h-96 object-cover"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                  />
                </div>
              )}

              {/* Article Content */}
              <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                <PortableText value={newsItem.description || []} components={ptComponents} />
              </div>

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 mt-12 lg:mt-0">
              <div className="sticky top-12 bg-neutral-50 p-6 rounded-xl border border-gray-200 shadow-md">
                <div className="prose text-gray-600 text-sm">
                  <p>For media inquiries, please contact our press team.</p>
                </div>
              </div>
            </div>
          </div>

         {/* Related News */}
        {relatedNews.length > 0 && (
          <div className="mt-20 pt-12 border-t border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Related Newsrooms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedNews.map((item) => (
                <article
                  key={item._id}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow group"
                >
                  {/* Logo */}
                  {item.logoImage && (
                    <Image
                      data={{
                        id: item.logoImage.asset._id,
                        url: item.logoImage.asset.url,
                        altText: item.logoImage.alt || item.title,
                        width: item.logoImage.asset.metadata?.dimensions?.width,
                        height: item.logoImage.asset.metadata?.dimensions?.height,
                      }}
                      className="h-8 w-auto max-w-[100px] object-contain mb-4"
                      sizes="(max-width: 1024px) 50vw, 100px"
                    />
                  )}

                  {/* Date */}
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7V3m8 4V3m-9 10h.01M16 13h.01M9 17h.01M15 17h.01M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <time className="text-sm font-medium" dateTime={item.date}>
                      {formatDate(item.date)}
                    </time>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
                    <Link to={`/newsroom/${item.slug}`}>{item.title}</Link>
                  </h3>

                  <p className="text-gray-600 text-sm">
                    {item.description
                      ? item.description[0]?.children[0]?.text.slice(0, 120) + (item.description[0]?.children[0]?.text.length > 120 ? '...' : '')
                      : ''}
                  </p>
                </article>
              ))}
            </div>
          </div>
        )}


        </div>
      </main>
    </div>
  );
}
