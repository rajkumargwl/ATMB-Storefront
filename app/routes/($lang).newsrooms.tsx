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
    <div className="min-h-screen">
      <main className="">
        <div className="">
          {/* Header */}
          <header className="bg-white py-[40px] md:py-[60px] px-5">
            <div className="max-w-[1240px] mx-auto flex items-center justify-between">
            <h1 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[61.6px] text-[24px] md:text-[56px] tracking-[-0.36px] md:tracking-[-1.12px]">Newsroom</h1>
              <a
                href="/media-kit"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center font-Roboto text-DarkOrange font-normal leading-[16px] text-[16px] tracking-[0.08px] px-4 py-3 h-[44px] md:h-[52px] min-w-[130px]"
              >
                Media Kit
              </a>
            </div>
          </header>
 
          {/* News grouped by year */}
          <div className="bg-[#F6F6F6] pt-[40px] pb-[40px] md:pb-[60px] lg:pb-[100px] px-5">
            <div className="max-w-[1240px] mx-auto ">
          <div className="space-y-8">
            {visibleGroups.map(({ year, cards }) => (
              <section key={year}>
                <h2 className="font-Roboto text-LightGray font-normal leading-[27px] text-[18px] tracking-[0px] mb-[32px]">
                  {year}
                </h2>
 
                <div className="max-w-[1212px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 items-stretch">
                  
                  {cards.map((card, idx) => (
                    <Link
                            to={card.externalLink}
                            className="flex md:min-h-[358px]"
                          >
                    <article
                      key={idx}
                      className="bg-white group border border-LightWhite rounded-[20px] p-6 hover:border-PrimaryBlack relative overflow-hidden"
                    >
                        <div className='absolute right-[20px] top-[20px] flex items-center justify-center gap-2 w-[48px] h-[48px] rounded-full bg-DarkOrange transition-all opacity-0 group-hover:opacity-100'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 25 24" fill="none">
                                          <path d="M19.0989 4.80005C19.4289 4.80005 19.6989 5.07005 19.6989 5.40005V15C19.6989 15.33 19.4289 15.6 19.0989 15.6C18.7689 15.6 18.4989 15.33 18.4989 15V6.84755L6.32266 19.0238C6.09016 19.2563 5.70766 19.2563 5.47516 19.0238C5.24266 18.7913 5.24266 18.4088 5.47516 18.1763L17.6514 6.00005H9.49891C9.16891 6.00005 8.89891 5.73005 8.89891 5.40005C8.89891 5.07005 9.16891 4.80005 9.49891 4.80005H19.0989Z" fill="white"/>
                                        </svg>
                        </div>
                      <div className="flex flex-col items-start gap-6 mb-2">
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
                              className="!w-[89px] h-[46px] object-contain"
                            />
                          </div>
                        )}
 
                        <div className="flex items-center gap-1">
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
                          {card.date && (
                            <time dateTime={card.date} className="font-Roboto text-LightGray font-normal leading-[21px] text-[14px] tracking-[0px]">
                              {formatDate(card.date)}
                            </time>
                          )}
                        </div>
                      </div>
 
                      <div>
                        <h3 className="mb-2 font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[31.2px] text-[24px] md:text-[24px] tracking-[-0.36px] md:tracking-[-0.36px]">
                          
                            {card.heading}
                          
                        </h3>
 
                        {card.description && (
                          <div className="newsroom-text font-Roboto text-LightGray font-normal leading-[24px] text-[16px] tracking-[0px] line-clamp-2">
                            <PortableText
                              value={card.description}
                              components={{
                                block: { normal: ({ children }) => <p className="font-Roboto text-LightGray font-normal leading-[24px] text-[16px] tracking-[0px]">{children}</p> },
                              }}
                            />
                          </div>
                        )}
 
                        <Link
                          to={card.externalLink}
                          className="hidden inline-block text-blue-600 font-medium hover:text-blue-700 transition-colors"
                        >
                          Read More →
                        </Link>
                      </div>
                    </article>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
 
          {hasMore && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                className="flex items-center justify-center w-[151px] h-[44px] md:h-[52px] rounded-[100px] font-normal leading-[16px] tracking-[0.08px] text-[16px] text-PrimaryBlack border border-[#091019] px-4 py-[12px]"
              >
                Load More
              </button>
            </div>
          )}
        </div>
        </div>
        </div>
      </main>
    </div>
  );
}
 