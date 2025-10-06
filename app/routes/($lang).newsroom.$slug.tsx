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

            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <PortableText value={mainBlocks} components={ptComponents} />
            </div>
          </div>

          {/* Sidebar / Aside */}
          <div className="lg:col-span-1 mt-12 lg:mt-0">
            <div className="sticky top-12 bg-neutral-50 p-6 rounded-xl border border-gray-200 shadow-md">
              <div className="prose text-gray-600 text-sm">
                <PortableText value={asideBlocks} components={ptComponents} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
