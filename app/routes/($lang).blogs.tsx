
import {json, type LoaderFunctionArgs, defer} from '@shopify/remix-oxygen';
import {useLoaderData, useFetcher} from '@remix-run/react';
import {notFound} from '~/lib/utils';
import {WPPost} from '../../shopify-hydrogen/schemaTypes/wpPost';
import {useState, useEffect} from 'react';

const FIRST_PAGE_SIZE = 11;
const NEXT_PAGE_SIZE = 12;

export async function loader({context, request}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const offset = Number(url.searchParams.get('offset') || 0);
  const pageSize = offset === 0 ? FIRST_PAGE_SIZE : NEXT_PAGE_SIZE;

  const posts: WPPost[] = await context.sanity.query({
    query: `*[_type == "wpPost"] | order(date desc) [${offset}...${offset + pageSize}] {
      _id,
      title,
      slug,
      content,
      date,
      "mainImage": mainImage.asset->url,
      authorName,
      link
    }`,
  });

  if (!posts) throw notFound();

  return defer({posts, offset});
}
function portableTextToPlainText(blocks: any[]): string {
  if (!Array.isArray(blocks)) return "";
  return blocks
    .map((block) => {
      if (block._type === "block" && Array.isArray(block.children)) {
        return block.children.map((child) => child.text).join("");
      }
      return "";
    })
    .join("\n");
}

export default function BlogIndex() {
  const {posts: initialPosts, offset: initialOffset} = useLoaderData<typeof loader>();
  const [posts, setPosts] = useState<WPPost[]>(initialPosts);
  const [offset, setOffset] = useState(initialOffset);
  const [loading, setLoading] = useState(false);

  const fetcher = useFetcher();

  const loadMore = () => {
    setLoading(true);
    const currentPageSize = offset === 0 ? FIRST_PAGE_SIZE : NEXT_PAGE_SIZE;
    const nextOffset = offset + currentPageSize;
    fetcher.load(`/blogs?offset=${nextOffset}`);
  };

  useEffect(() => {
    if (fetcher.data?.posts) {
      const currentPageSize = offset === 0 ? FIRST_PAGE_SIZE : NEXT_PAGE_SIZE;
      setPosts((prev) => [...prev, ...fetcher.data.posts]);
      setOffset((prev) => prev + currentPageSize);
      setLoading(false);
    }
  }, [fetcher.data]);

  return (
    <div className="">
      <div className="px-5  pt-[40px] md:pt-[44px]  pb-10 md:pb-[60px] lg:pb-[100px]">
        <div className="max-w-[1240px] mx-auto">
            <div className="flex flex-col items-start gap-3 mb-[44px] md:mb-[60px] lg:mb-[64px]">
              <h1 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[61.6px] text-[24px] md:text-[56px] tracking-[-0.36px] md:tracking-[-1.12px]">Featured Blogs</h1>
              <p className='font-Roboto text-LightGray font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]'>Discover practical tips, industry insights, and success stories on virtual mail.</p>
            </div>
          {/* First row: only first 2 posts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-11 md:gap-6">
            {posts.slice(0, 2).map((post) => (
              <div key={post._id} className="overflow-hidden relative">
                {post.mainImage && <img src={post.mainImage} alt={post.title} className="w-full rounded-[20px] h-[342px] object-cover"/>}
                <div className='absolute right-[20px] top-[20px] flex gap-2 p-2 rounded-full bg-[#FEFAED] border border-[#FFC107] font-Roboto text-PrimaryBlack font-normal text-[12px] leading-[18px] tracking-[0px]'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <g clip-path="url(#clip0_3242_680)">
                      <path d="M17.9531 6.55308C17.8955 6.37471 17.7867 6.21722 17.6403 6.10025C17.4938 5.98328 17.3162 5.912 17.1295 5.89529L11.9342 5.42352L9.87985 0.615077C9.72832 0.262697 9.38336 0.034668 9.00008 0.034668C8.6168 0.034668 8.2718 0.262732 8.12034 0.615956L6.06597 5.42355L0.86985 5.89529C0.683382 5.91237 0.506027 5.98381 0.359775 6.10074C0.213523 6.21766 0.104806 6.37495 0.0471024 6.55308C-0.0714123 6.91759 0.0380319 7.31736 0.326848 7.56937L4.2539 11.0134L3.09589 16.1143C3.01117 16.4894 3.15672 16.8771 3.46793 17.102C3.63517 17.2229 3.83089 17.2844 4.02823 17.2844C4.19839 17.2844 4.36714 17.2385 4.51867 17.1479L9.00008 14.4695L13.4799 17.1479C13.8077 17.3451 14.2209 17.3271 14.5314 17.102C14.6834 16.992 14.7997 16.8397 14.8659 16.6641C14.932 16.4885 14.9451 16.2973 14.9035 16.1143L13.7455 11.0134L17.6725 7.57007C17.8138 7.44669 17.9157 7.28453 17.9655 7.10372C18.0154 6.92292 18.0111 6.73144 17.9531 6.55308Z" fill="#FFC107"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_3242_680">
                        <rect width="18" height="18" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                  Featured
                </div>
                <div className="mt-6">
                  <p className="flex gap-2 mb-5 font-Roboto text-LightGray font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px]">
                  <span className='flex gap-1 font-Roboto text-LightGray font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px]'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                      <path d="M14.8781 15.5188C14.4406 13.7844 12.8719 12.5 11 12.5H9C7.12813 12.5 5.55937 13.7844 5.12187 15.5188C3.8125 14.2469 3 12.4688 3 10.5C3 6.63438 6.13438 3.5 10 3.5C13.8656 3.5 17 6.63438 17 10.5C17 12.4688 16.1875 14.2469 14.8781 15.5188ZM13.9875 16.25C12.8594 17.0375 11.4812 17.5 10 17.5C8.51875 17.5 7.14062 17.0375 6.00938 16.2531C6.13438 14.7125 7.425 13.5 9 13.5H11C12.575 13.5 13.8625 14.7125 13.9906 16.2531L13.9875 16.25ZM10 18.5C14.4187 18.5 18 14.9187 18 10.5C18 6.08125 14.4187 2.5 10 2.5C5.58125 2.5 2 6.08125 2 10.5C2 14.9187 5.58125 18.5 10 18.5ZM10 10C9.17188 10 8.5 9.32812 8.5 8.5C8.5 7.67188 9.17188 7 10 7C10.8281 7 11.5 7.67188 11.5 8.5C11.5 9.32812 10.8281 10 10 10ZM7.5 8.5C7.5 9.88125 8.61875 11 10 11C11.3813 11 12.5 9.88125 12.5 8.5C12.5 7.11875 11.3813 6 10 6C8.61875 6 7.5 7.11875 7.5 8.5Z" fill="#4D4E4F"/>
                    </svg>
                    By {post.authorName || 'Unknown'} 
                  </span>
                  | 
                  <span className='flex gap-1 font-Roboto text-LightGray font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px]'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                      <path d="M6.5 2.5C6.775 2.5 7 2.725 7 3V4.5H13V3C13 2.725 13.225 2.5 13.5 2.5C13.775 2.5 14 2.725 14 3V4.5H15C16.1031 4.5 17 5.39687 17 6.5V15.5C17 16.6031 16.1031 17.5 15 17.5H5C3.89688 17.5 3 16.6031 3 15.5V6.5C3 5.39687 3.89688 4.5 5 4.5H6V3C6 2.725 6.225 2.5 6.5 2.5ZM15 5.5H5C4.44687 5.5 4 5.94688 4 6.5V7.5H16V6.5C16 5.94688 15.5531 5.5 15 5.5ZM16 8.5H4V15.5C4 16.0531 4.44687 16.5 5 16.5H15C15.5531 16.5 16 16.0531 16 15.5V8.5Z" fill="#4D4E4F"/>
                    </svg>
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  </p>
                  <a href={`/blog/${post.slug.current}`}>
                    <h2 className="line-clamp-2 font-Roboto text-PrimaryBlack font-semibold leading-[28px] md:leading-[43.2px] text-[20px] md:text-[36px] tracking-[-0.3px] md:tracking-[-0.54px]">{post.title}</h2>
                  </a>
                  <p className="line-clamp-2 mt-3 font-Roboto text-LightGray font-normal leading-[21px] md:leading-[27px] text-[14px] md:text-[18px] tracking-[0px]">{portableTextToPlainText(post.content).slice(0, 120)}...</p>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
        <div className="px-5 bg-[#F6F6F6] py-[40px] md:py-[60px] lg:py-[100px]">
        <div className="max-w-[1240px] mx-auto">
            {/* Rest of posts: 3 per row */}
            <div className="mb-6 md:mb-11 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 md:gap-y-11">
              {posts.slice(2).map((post) => (
                <div key={post._id} className="group relative border border-LightWhite hover:border-PrimaryBlack rounded-[20px] overflow-hidden bg-white transition">
                  {post.mainImage && <img src={post.mainImage} alt={post.title} className="w-full rounded-t-[20px] h-[249px] object-cover"/>}
                  <div className='absolute right-[24px] top-[24px] flex items-center justify-center gap-2 w-[48px] h-[45px] rounded-full bg-DarkOrange transition-all opacity-0 group-hover:opacity-100'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                    <path d="M19.0989 4.80005C19.4289 4.80005 19.6989 5.07005 19.6989 5.40005V15C19.6989 15.33 19.4289 15.6 19.0989 15.6C18.7689 15.6 18.4989 15.33 18.4989 15V6.84755L6.32266 19.0238C6.09016 19.2563 5.70766 19.2563 5.47516 19.0238C5.24266 18.7913 5.24266 18.4088 5.47516 18.1763L17.6514 6.00005H9.49891C9.16891 6.00005 8.89891 5.73005 8.89891 5.40005C8.89891 5.07005 9.16891 4.80005 9.49891 4.80005H19.0989Z" fill="white"/>
                  </svg>
                </div>
                  
                  <div className="p-6 md:px-6 md:pt-6 md:pb-[29px]">
                    <p className="flex gap-2 mb-4 font-Roboto text-LightGray font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px]">
                  <span className='flex gap-1 font-Roboto text-LightGray font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px]'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                      <path d="M14.8781 15.5188C14.4406 13.7844 12.8719 12.5 11 12.5H9C7.12813 12.5 5.55937 13.7844 5.12187 15.5188C3.8125 14.2469 3 12.4688 3 10.5C3 6.63438 6.13438 3.5 10 3.5C13.8656 3.5 17 6.63438 17 10.5C17 12.4688 16.1875 14.2469 14.8781 15.5188ZM13.9875 16.25C12.8594 17.0375 11.4812 17.5 10 17.5C8.51875 17.5 7.14062 17.0375 6.00938 16.2531C6.13438 14.7125 7.425 13.5 9 13.5H11C12.575 13.5 13.8625 14.7125 13.9906 16.2531L13.9875 16.25ZM10 18.5C14.4187 18.5 18 14.9187 18 10.5C18 6.08125 14.4187 2.5 10 2.5C5.58125 2.5 2 6.08125 2 10.5C2 14.9187 5.58125 18.5 10 18.5ZM10 10C9.17188 10 8.5 9.32812 8.5 8.5C8.5 7.67188 9.17188 7 10 7C10.8281 7 11.5 7.67188 11.5 8.5C11.5 9.32812 10.8281 10 10 10ZM7.5 8.5C7.5 9.88125 8.61875 11 10 11C11.3813 11 12.5 9.88125 12.5 8.5C12.5 7.11875 11.3813 6 10 6C8.61875 6 7.5 7.11875 7.5 8.5Z" fill="#4D4E4F"/>
                    </svg>
                    By {post.authorName || 'Unknown'} 
                  </span>
                  | 
                  <span className='flex gap-1 font-Roboto text-LightGray font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px]'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                      <path d="M6.5 2.5C6.775 2.5 7 2.725 7 3V4.5H13V3C13 2.725 13.225 2.5 13.5 2.5C13.775 2.5 14 2.725 14 3V4.5H15C16.1031 4.5 17 5.39687 17 6.5V15.5C17 16.6031 16.1031 17.5 15 17.5H5C3.89688 17.5 3 16.6031 3 15.5V6.5C3 5.39687 3.89688 4.5 5 4.5H6V3C6 2.725 6.225 2.5 6.5 2.5ZM15 5.5H5C4.44687 5.5 4 5.94688 4 6.5V7.5H16V6.5C16 5.94688 15.5531 5.5 15 5.5ZM16 8.5H4V15.5C4 16.0531 4.44687 16.5 5 16.5H15C15.5531 16.5 16 16.0531 16 15.5V8.5Z" fill="#4D4E4F"/>
                    </svg>
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  </p>
                    <a href={`/blog/${post.slug.current}`}>
                      <h2 className="line-clamp-2 font-Roboto text-PrimaryBlack font-semibold leading-[28px] md:leading-[31.2px] text-[20px] md:text-[24px] tracking-[-0.3px] md:tracking-[-0.36px]">{post.title}</h2>
                    </a>
                    <p className="line-clamp-2 mt-2 font-Roboto text-LightGray font-normal leading-[21px] md:leading-[24px] text-[14px] md:text-[16px] tracking-[0px]">{portableTextToPlainText(post.content).slice(0, 120)}...</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Load more button */}
            <div className="flex justify-center items-center">
              <button
                onClick={loadMore}
                disabled={loading}
                className="flex items-center justify-center w-[151px] h-11 md:h-[52px] px-4 py-3 border border-PrimaryBlack rounded-full font-Roboto font-normal leading-[16px] tracking-[0.08px] text-base text-PrimaryBlack"
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
        </div>
        </div>
     
    </div>
  );
}