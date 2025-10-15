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
    <div className="min-h-screen">
      <main className="">
        <div className="bg-white px-5  pt-[40px] md:pt-[40px]  pb-10 md:pb-[60px] lg:pb-[100px]">
          <div className="max-w-[1240px] mx-auto">
        <nav className="flex items-center flex-row gap-[7px] mb-6" aria-label="Breadcrumb">
                    <ol className="flex items-center flex-row gap-[7px]">
                      <li><Link to={`/Newsrooms`}><span className="font-Roboto text-LightGray font-normal leading-[14px] md:leading-[14px] text-[14px] md:text-[14px] tracking-[0.07px]">Newsroom</span> </Link></li>
                      <li className="flex items-center gap-[7px]"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M10.6813 7.71732C10.8362 7.87232 10.8362 8.12732 10.6813 8.28232L6.68125 12.2823C6.52625 12.4373 6.27125 12.4373 6.11625 12.2823C5.96125 12.1273 5.96125 11.8723 6.11625 11.7173L9.83375 7.99982L6.11625 4.28232C5.96125 4.12732 5.96125 3.87232 6.11625 3.71732C6.27125 3.56232 6.52625 3.56232 6.68125 3.71732L10.6813 7.71732Z" fill="#091019"/>
                        </svg>
                         <span aria-current="page" className="font-Roboto text-PrimaryBlack font-normal leading-[14px] md:leading-[14px] text-[14px] md:text-[14px] tracking-[0.07px]">Newsroom detail</span> </li>
                    </ol>  
        </nav>
        <div className="flex flex-col lg:flex-row gap-11">
 
        
             {/* Main content */}
              <div className="w-full lg:w-[67.2%]">
                {/* Title */}
                 <div className="flex flex-col gap-5 mb-7">
                <h1 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[50.4px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]">{newsItem.title}</h1>
 
                {/* Date + Logo */}
                <div className="flex justify-between items-center">
                  {/* Date top-left */}
                  <p className="flex items-center">
                    <span className="min-w-[82px] md:min-w-[105px] flex items-center gap-2 flex gap-1 font-Roboto text-LightGray font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px]">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 21" fill="none" className="">
                            <path
                              d="M6.5 2.5C6.775 2.5 7 2.725 7 3V4.5H13V3C13 2.725 13.225 2.5 13.5 2.5C13.775 2.5 14 2.725 14 3V4.5H15C16.1031 4.5 17 5.39687 17 6.5V15.5C17 16.6031 16.1031 17.5 15 17.5H5C3.89688 17.5 3 16.6031 3 15.5V6.5C3 5.39687 3.89688 4.5 5 4.5H6V3C6 2.725 6.225 2.5 6.5 2.5ZM15 5.5H5C4.44687 5.5 4 5.94688 4 6.5V7.5H16V6.5C16 5.94688 15.5531 5.5 15 5.5ZM16 8.5H4V15.5C4 16.0531 4.44687 16.5 5 16.5H15C15.5531 16.5 16 16.0531 16 15.5V8.5Z"
                              fill="#091019"
                            />
                          </svg>
                           {new Date(newsItem.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                    </span>
                  
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
                      className="!w-[82px] !h-[39px] object-contain rounded-full"
                      sizes="64px"
                    />
                  )}
                </div>
                </div>
 
                {/* Featured image */}
                {newsItem.featuredImage?.asset?.url && (
                  <div className="relative mb-[28px]">
                    <Image
                      data={{
                        id: newsItem.featuredImage.asset._id,
                        url: newsItem.featuredImage.asset.url,
                        altText: newsItem.featuredImage.alt || newsItem.title,
                        width: newsItem.featuredImage.asset.metadata?.dimensions?.width,
                        height: newsItem.featuredImage.asset.metadata?.dimensions?.height,
                      }}
                      className="w-full  object-cover rounded-[20px]"
                      sizes="(max-width: 1024px) 100vw, 1024px"
                    />
                  </div>
                )}
 
                {/* Description */}
                <div className="news-detail prose prose-lg max-w-none  space-y-[28px]">
                  <PortableText value={mainBlocks} components={ptComponents} />
                </div>
              </div>
 
      
            {/* Sidebar / Aside */}
            {asideBlocks.length > 0 && (
              <div className="w-full lg:w-[32.8%] xl:min-w-[436px] xl:mr-[-44px] md:sticky md:top-0 h-fit z-10">
                <div className="flex flex-col gap-6 md:gap-8 border border-[#F6F6F6] rounded-[20px] p-5 md:p-6 bg-[#F6F6F6] h-fit">
                  <div className="prose news-detail-sidebar">
                    <PortableText value={asideBlocks} components={ptComponents} />
                  </div>
                </div>
              </div>
            )}
          </div>
          </div>
          </div>
 
              {/* Related News Section */}
        <div className="px-5 py-10 md:py-[60px] lg:py-[100px] bg-[#F6F6F6]">
              <div className="max-w-[1240px] mx-auto">
              {relatedNews?.length > 0 && (
            <div className="flex flex-col gap-11 max-w-[1212px]">
              <h2 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[61.6px] text-[24px] md:text-[56px] tracking-[-0.36px] md:tracking-[-1.12px]">
                Related Newsrooms
              </h2>
          <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-6 md:gap-6">
            {relatedNews.map((item) => {
              const textDescription = extractText(item.description);
              const truncatedDescription = truncateText(textDescription);
 
                return (
                  <Link
                    key={item._id}
                    to={`/newsroom/${item.slug}`}
                    className="flex md:min-h-[358px]"
                  >
                    <div className="bg-white group border border-LightWhite rounded-[20px] p-6 hover:border-PrimaryBlack relative overflow-hidden">
                     <div className='absolute right-[20px] top-[20px] flex items-center justify-center gap-2 w-[48px] h-[48px] rounded-full bg-DarkOrange transition-all opacity-0 group-hover:opacity-100'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 25 24" fill="none">
                            <path d="M19.0989 4.80005C19.4289 4.80005 19.6989 5.07005 19.6989 5.40005V15C19.6989 15.33 19.4289 15.6 19.0989 15.6C18.7689 15.6 18.4989 15.33 18.4989 15V6.84755L6.32266 19.0238C6.09016 19.2563 5.70766 19.2563 5.47516 19.0238C5.24266 18.7913 5.24266 18.4088 5.47516 18.1763L17.6514 6.00005H9.49891C9.16891 6.00005 8.89891 5.73005 8.89891 5.40005C8.89891 5.07005 9.16891 4.80005 9.49891 4.80005H19.0989Z" fill="white"/>
                          </svg>
                    </div>
                    {/* Logo + Date */}
                    {item.logoImage?.asset?.url && (
                      <div className="flex flex-col items-start gap-6 mb-2">
                        <Image
                          data={{
                            id: item.logoImage.asset._id,
                            url: item.logoImage.asset.url,
                            altText: item.logoImage.alt || item.title,
                            width: item.logoImage.asset.metadata?.dimensions?.width,
                            height: item.logoImage.asset.metadata?.dimensions?.height,
                          }}
                          className="!w-[89px] h-[46px] object-contain"
                          sizes="48px"
                        />
                        <div className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 21" fill="none">
                            <path d="M6.5 2.5C6.775 2.5 7 2.725 7 3V4.5H13V3C13 2.725 13.225 2.5 13.5 2.5C13.775 2.5 14 2.725 14 3V4.5H15C16.1031 4.5 17 5.39687 17 6.5V15.5C17 16.6031 16.1031 17.5 15 17.5H5C3.89688 17.5 3 16.6031 3 15.5V6.5C3 5.39687 3.89688 4.5 5 4.5H6V3C6 2.725 6.225 2.5 6.5 2.5ZM15 5.5H5C4.44687 5.5 4 5.94688 4 6.5V7.5H16V6.5C16 5.94688 15.5531 5.5 15 5.5ZM16 8.5H4V15.5C4 16.0531 4.44687 16.5 5 16.5H15C15.5531 16.5 16 16.0531 16 15.5V8.5Z" fill="#091019"/>
                          </svg>
                        <p className="font-Roboto text-LightGray font-normal leading-[21px] text-[14px] tracking-[0px]">
                          {new Date(item.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                        </div>
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
                    <div className="flex flex-col gap-2">
                      <h3 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[31.2px] text-[24px] md:text-[24px] tracking-[-0.36px] md:tracking-[-0.36px]">
                        {item.title}
                      </h3>
                      {truncatedDescription && (
                        <p className="font-Roboto text-LightGray font-normal leading-[24px] text-[16px] tracking-[0px] line-clamp-2">{truncatedDescription}</p>
                      )}
                    </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
        </div>
      </div>
      </main>
    </div>
  )
}