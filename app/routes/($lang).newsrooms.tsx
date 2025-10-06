import { json, type LoaderFunctionArgs } from "@shopify/remix-oxygen";
import { useLoaderData, Link } from "@remix-run/react";
import { Image } from "@shopify/hydrogen";
import { useState } from "react";
import { PortableText } from "@portabletext/react";

export async function loader({ context }: LoaderFunctionArgs) {
  const newsItems = await context.sanity.query({
    query: `*[_type == "news"] | order(date desc) {
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
  });

  if (!newsItems || newsItems.length === 0) {
    return json({ allCards: [] });
  }

  const allCards = newsItems.map((item: any) => ({
    heading: item.title,
    description: item.description,
    date: item.date,
    logo: item.logoImage,
    externalLink: `/newsroom/${item.slug}`,
  }));

  return json({ allCards });
}

export default function Newsroom() {
  const { allCards } = useLoaderData<typeof loader>();
  const [visibleCount, setVisibleCount] = useState(6);

  // Group all cards by year
  const groupedByYear: Record<string, any[]> = {};
  allCards.forEach((card) => {
    const year = new Date(card.date).getFullYear().toString();
    if (!groupedByYear[year]) groupedByYear[year] = [];
    groupedByYear[year].push(card);
  });

  // Convert grouped object to sorted array
  const groupedArray = Object.entries(groupedByYear)
    .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
    .map(([year, cards]) => ({ year, cards }));

  // Slice first N (visibleCount) items while keeping year grouping
  const visibleGroups: typeof groupedArray = [];
  let count = 0;

  for (const group of groupedArray) {
    if (count >= visibleCount) break;

    const remaining = visibleCount - count;
    const slicedCards = group.cards.slice(0, remaining);
    visibleGroups.push({ year: group.year, cards: slicedCards });

    count += slicedCards.length;
  }

  const hasMore = allCards.length > visibleCount;

  const handleLoadMore = () => setVisibleCount((prev) => prev + 6);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8 lg:py-12 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="flex justify-between items-center mb-12 pb-6 border-b border-gray-200">
            <h1 className="text-4xl font-bold text-gray-900">Newsroom</h1>
            <a
              href="/media-kit"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Media Kit
            </a>
          </header>

          {/* News grouped by year */}
          <div className="space-y-12">
            {visibleGroups.map(({ year, cards }) => (
              <section key={year}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                  {year}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cards.map((card, idx) => (
                    <article
                      key={idx}
                      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-4">
                        {card.logo && (
                          <div className="flex-shrink-0">
                            <Image
                              data={{
                                id: card.logo.asset._id,
                                url: card.logo.asset.url,
                                altText: card.logo.alt || card.heading,
                                width: card.logo.asset.metadata?.dimensions?.width,
                                height: card.logo.asset.metadata?.dimensions?.height,
                              }}
                              className="h-10 w-auto max-w-[120px] object-contain"
                            />
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-500"
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
                          {card.date && (
                            <time dateTime={card.date} className="whitespace-nowrap">
                              {formatDate(card.date)}
                            </time>
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
                          <Link
                            to={card.externalLink}
                            className="hover:text-blue-600 transition-colors block"
                          >
                            {card.heading}
                          </Link>
                        </h3>

                        {card.description && (
                          <div className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                            <PortableText
                              value={card.description}
                              components={{
                                block: { normal: ({ children }) => <p>{children}</p> },
                              }}
                            />
                          </div>
                        )}

                        <Link
                          to={card.externalLink}
                          className="inline-block text-blue-600 font-medium hover:text-blue-700 transition-colors"
                        >
                          Read More →
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-12 pt-8 border-t border-gray-200">
              <button
                onClick={handleLoadMore}
                className="bg-gray-600  px-8 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
