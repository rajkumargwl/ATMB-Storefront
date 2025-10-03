import {json, type LoaderFunctionArgs} from "@shopify/remix-oxygen";
import {useLoaderData, Link} from "@remix-run/react";
import {Image} from '@shopify/hydrogen';
import { useState } from 'react';

export async function loader({context}: LoaderFunctionArgs) {
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
          metadata {
            dimensions {
              width,
              height
            }
          }
        },
        alt
      }
    }`,
  });

  // Group news items by year
  const groupedByYear = newsItems.reduce((acc: any, item: any) => {
    const year = new Date(item.date).getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    
    acc[year].push({
      heading: item.title,
      description: item.description,
      date: item.date,
      logo: item.logoImage,
      externalLink: `/newsroom/${item.slug}`
    });
    
    return acc;
  }, {});

  // Convert to array format and sort years descending
  const years = Object.entries(groupedByYear)
    .map(([year, cards]: [string, any]) => ({
      year,
      cards: cards.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }))
    .sort((a, b) => parseInt(b.year) - parseInt(a.year));

  return json({years});
}

export default function Newsroom() {
  const {years} = useLoaderData<typeof loader>();
  const [visibleYears, setVisibleYears] = useState(2);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleLoadMore = () => {
    setVisibleYears(prev => prev + 2);
  };

  const visibleData = years.slice(0, visibleYears);
  const hasMore = visibleYears < years.length;

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

          {/* Years List */}
          <div className="space-y-12">
            {visibleData.map((yearBlock: any) => (
              <section key={yearBlock.year}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                  {yearBlock.year}
                </h2>

                {/* Change grid-cols-2 to grid-cols-3 here */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
                  {yearBlock.cards.map((card: any, index: number) => (
                    <article key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
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
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 10h.01M16 13h.01M9 17h.01M15 17h.01M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
                          <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                            {card.description}
                          </p>
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
                className="bg-gray-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
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