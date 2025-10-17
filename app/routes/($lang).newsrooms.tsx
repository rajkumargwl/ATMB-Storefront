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
                <div className=" mb-[32px] flex flex-row items-center gap-[29px]">
                  <h2 className="font-Roboto text-LightGray font-normal leading-[27px] text-[18px] tracking-[0px]">
                    {year}
                  </h2>
                  <span className="flex bg-LightWhite w-full h-[1px]"></span>
                </div>
 
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
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 21" fill="none">
                            <path d="M6.5 2.5C6.775 2.5 7 2.725 7 3V4.5H13V3C13 2.725 13.225 2.5 13.5 2.5C13.775 2.5 14 2.725 14 3V4.5H15C16.1031 4.5 17 5.39687 17 6.5V15.5C17 16.6031 16.1031 17.5 15 17.5H5C3.89688 17.5 3 16.6031 3 15.5V6.5C3 5.39687 3.89688 4.5 5 4.5H6V3C6 2.725 6.225 2.5 6.5 2.5ZM15 5.5H5C4.44687 5.5 4 5.94688 4 6.5V7.5H16V6.5C16 5.94688 15.5531 5.5 15 5.5ZM16 8.5H4V15.5C4 16.0531 4.44687 16.5 5 16.5H15C15.5531 16.5 16 16.0531 16 15.5V8.5Z" fill="#091019"/>
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
                className="flex items-center justify-center w-[151px] h-[44px] md:h-[52px] rounded-[100px] font-normal leading-[16px] tracking-[0.08px] text-[16px] text-PrimaryBlack border border-[#091019] px-4 py-[12px] bg-white"
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
 