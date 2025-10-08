import { json, type LoaderFunctionArgs } from "@shopify/remix-oxygen";
import { useLoaderData, Link } from "@remix-run/react";
import { Image } from '@shopify/hydrogen';
import { PortableText } from '@portabletext/react';

// Helper to extract text content from PortableText blocks
const extractText = (blocks: any[]) => {
  if (!blocks || !Array.isArray(blocks)) return "";
  let text = "";

  for (const block of blocks) {
    if (!block || !block.children) continue;
    for (const child of block.children) {
      if (typeof child.text === "string") {
        text += child.text;
      }
    }
  }

  return text;
};

// Truncate text to 120 chars
const truncateText = (text: string, maxLength = 120) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

export async function loader({ params, context }: LoaderFunctionArgs) {
  const { slug } = params;

  // Fetch the current news item
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

  // Convert current news date to a year range
  const newsDate = new Date(newsItem.date);
  const startOfYear = new Date(Date.UTC(newsDate.getFullYear(), 0, 1, 0, 0, 0)); // Jan 1, 00:00 UTC
  const endOfYear = new Date(Date.UTC(newsDate.getFullYear(), 11, 31, 23, 59, 59)); // Dec 31, 23:59 UTC

  // Fetch related news from the same year
  let relatedNews = await context.sanity.query({
    query: `*[_type == "news" && date >= $start && date <= $end && slug.current != $slug]
            | order(date desc)[0...3] {
      _id,
      title,
      "slug": slug.current,
      description,
      date,
      logoImage { asset->{_id,url,metadata{dimensions{width,height}}}, alt },
      featuredImage { asset->{_id,url,metadata{dimensions{width,height}}}, alt }
    }`,
    params: { start: startOfYear.toISOString(), end: endOfYear.toISOString(), slug },
  });

  // Fallback: if no related news in the same year, show recent 3
  if (!relatedNews?.length) {
    relatedNews = await context.sanity.query({
      query: `*[_type == "news" && slug.current != $slug] | order(date desc)[0...3] {
        _id,
        title,
        "slug": slug.current,
        description,
        date,
        logoImage { asset->{_id,url,metadata{dimensions{width,height}}}, alt },
        featuredImage { asset->{_id,url,metadata{dimensions{width,height}}}, alt }
      }`,
      params: { slug },
    });
  }

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
// Separate first and second strong spans
const splitContent = (blocks: any[]) => {
  let strongCount = 0
  const mainBlocks: any[] = []
  const asideBlocks: any[] = []

  for (const block of blocks) {
    if (block._type === 'block' && block.children) {
      const hasStrong = block.children.some((c: any) => c.marks?.includes('strong'))
      if (hasStrong) strongCount += 1
    }

    if (strongCount === 2) {
      asideBlocks.push(block)
    } else {
      mainBlocks.push(block)
    }
  }

  return { mainBlocks, asideBlocks }
}

export default function NewsroomDetailPage() {
  const { newsItem, relatedNews } = useLoaderData<typeof loader>()

  const { mainBlocks, asideBlocks } = splitContent(newsItem.description || [])

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8 lg:py-12 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-12">

        
             {/* Main content */}
              <div className="lg:col-span-3">
                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{newsItem.title}</h1>

                {/* Date + Logo */}
                <div className="flex justify-between items-center mb-6">
                  {/* Date top-left */}
                  <p className="text-sm text-gray-500">
                    {new Date(newsItem.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>

                  {/* Logo top-right */}
                  {newsItem.logoImage?.asset?.url && (
                    <Image
                      data={{
                        id: newsItem.logoImage.asset._id,
                        url: newsItem.logoImage.asset.url,
                        altText: newsItem.logoImage.alt || newsItem.title,
                        width: newsItem.logoImage.asset.metadata?.dimensions?.width,
                        height: newsItem.logoImage.asset.metadata?.dimensions?.height,
                      }}
                      className="w-16 h-16 object-contain rounded-full"
                      sizes="64px"
                    />
                  )}
                </div>

                {/* Featured image */}
                {newsItem.featuredImage?.asset?.url && (
                  <div className="relative mb-6 rounded-xl overflow-hidden shadow-2xl">
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

                {/* Description */}
                <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                  <PortableText value={mainBlocks} components={ptComponents} />
                </div>
              </div>

      
            {/* Sidebar / Aside */}
            {asideBlocks.length > 0 && (
              <div className="lg:col-span-1 mt-12 lg:mt-0">
                <div className="sticky top-12 bg-neutral-50 p-6 rounded-xl border border-gray-200 shadow-md">
                  <div className="prose text-gray-600 text-sm">
                    <PortableText value={asideBlocks} components={ptComponents} />
                  </div>
                </div>
              </div>
            )}
          </div>

              {/* Related News Section */}
              {relatedNews?.length > 0 && (
            <div className="mt-16 border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Related News
              </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedNews.map((item) => {
              const textDescription = extractText(item.description);
              const truncatedDescription = truncateText(textDescription);

                return (
                  <Link
                    key={item._id}
                    to={`/newsroom/${item.slug}`}
                    className="block group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* Logo + Date */}
                    {item.logoImage?.asset?.url && (
                      <div className="p-4 flex items-center space-x-3">
                        <Image
                          data={{
                            id: item.logoImage.asset._id,
                            url: item.logoImage.asset.url,
                            altText: item.logoImage.alt || item.title,
                            width: item.logoImage.asset.metadata?.dimensions?.width,
                            height: item.logoImage.asset.metadata?.dimensions?.height,
                          }}
                          className="w-12 h-12 object-contain rounded-full"
                          sizes="48px"
                        />
                        <p className="text-sm text-gray-500">
                          {new Date(item.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    )}

                    {/* Featured image 
                      {item.featuredImage?.asset?.url && (
                        <Image
                          data={{
                            id: item.featuredImage.asset._id,
                            url: item.featuredImage.asset.url,
                            altText: item.featuredImage.alt || item.title,
                            width: item.featuredImage.asset.metadata?.dimensions?.width,
                            height: item.featuredImage.asset.metadata?.dimensions?.height,
                          }}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      )}
                       */}
                    {/* Title + truncated description */}
                    <div className="p-4 space-y-2">
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      {truncatedDescription && (
                        <p className="text-gray-600 text-sm">{truncatedDescription}</p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
