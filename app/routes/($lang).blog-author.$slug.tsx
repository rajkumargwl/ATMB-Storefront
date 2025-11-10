import { PortableText } from '@portabletext/react';
import { Await, useLoaderData, Link } from '@remix-run/react';
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
import { Suspense, useState } from 'react';
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
  // ✅ Validate locale and slug
  validateLocale({ context, params });
  const slug = params.slug;
  if (!slug) throw notFound();

  // ✅ Fetch Sanity author data
  const author = await context.sanity.query({
    query: AUTHOR_DETAIL_QUERY,
    params: { slug },
  });
  if (!author) throw notFound();
  console.log("aaaaaaa",JSON.stringify(author,null,2));
  // ✅ Fetch author's blogs from Sanity
  const authorBlogs = await context.sanity.query({
    query: `*[
      _type == "wpPost" && 
      authorName == $authorName
    ] | order(date desc) {
      _id,
      title,
      slug,
      mainImage{
        asset->{
          url
        },
        alt
      },
      content,
      date,
      authorName,
      categories,
      link
    }`,
    params: { authorName: author.name }
  });

  console.log("📝 Fetched author blogs from Sanity:", authorBlogs?.length || 0);

  // ✅ (Optional) Include gids if needed
  const gids = fetchGids ? fetchGids({ page: author, context }) : null;

  // ✅ Return deferred data
  return defer({
    author,
    authorBlogs: authorBlogs || [],
    gids,
    analytics: { pageType: AnalyticsPageType.page },
  });
}

// RightArrowWhite component
const RightArrowWhite = () => (
   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 25" fill="none">
    <path d="M18.6009 5.2998C18.9309 5.2998 19.2009 5.5698 19.2009 5.8998V15.4998C19.2009 15.8298 18.9309 16.0998 18.6009 16.0998C18.2709 16.0998 18.0009 15.8298 18.0009 15.4998V7.34731L5.82461 19.5236C5.59211 19.7561 5.20961 19.7561 4.97711 19.5236C4.74461 19.2911 4.74461 18.9086 4.97711 18.6761L17.1534 6.4998H9.00086C8.67086 6.4998 8.40086 6.2298 8.40086 5.8998C8.40086 5.5698 8.67086 5.2998 9.00086 5.2998H18.6009Z" fill="white"/>
  </svg>
);

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Helper function to get featured image (updated for Sanity)
const getFeaturedImage = (post: any) => {
  return post?.mainImage?.asset?.url || 
         "https://cdn.sanity.io/images/m5xb8z9y/production/cf4b0089bde90959a583d927b62f031739542b4b-1600x900.webp";
};

// Helper function to get excerpt (updated for Sanity)
const getExcerpt = (post: any) => {
  if (!post?.content) {
    return "Running an eCommerce business involves more than just selling products online. From packing";
  }
  
  // Extract text from PortableText blocks
  const extractText = (blocks: any[]): string => {
    return blocks
      .map(block => {
        if (block._type === 'block' && block.children) {
          return block.children.map((child: any) => child.text || '').join('');
        }
        return '';
      })
      .join(' ')
      .replace(/<[^>]*>/g, '') // Remove any HTML tags
      .substring(0, 150) + '...';
  };

  return extractText(post.content);
};

// Helper function to get latest post
const getLatestPost = (posts: any[]) => {
  if (!posts || posts.length === 0) return null;
  
  // Sort posts by date in descending order (newest first)
  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
  
  return sortedPosts[0];
};

export default function BlogAuthorDetailPage() {
  const { author, authorBlogs } = useLoaderData<typeof loader>();
  const [visibleBlogs, setVisibleBlogs] = useState(6);
  
  // Function to load more blogs
  const loadMoreBlogs = () => {
    setVisibleBlogs(prev => prev + 6);
  };

  // Get the blogs to display (first 6, then more when load more is clicked)
  const displayedBlogs = authorBlogs.slice(0, visibleBlogs);
  
  // Get the latest post
  const latestPost = getLatestPost(authorBlogs);
  
  return (
    <div className="">
        <div className="px-5 pt-[40px] pb-[40px] md:pb-[60px] lg:pb-[100px] bg-white relative z-[2]">
            <div className="hidden md:flex absolute z-[1] top-[481px] md:top-[581px] right-[0px] md:right-[0]">
                <svg xmlns="http://www.w3.org/2000/svg" width="473" height="736" viewBox="0 0 473 736" fill="none">
                    <g filter="url(#filter0_f_3141_47262)">
                        <path d="M384.849 330.53C376.346 334.967 371.138 316.209 361.904 313.599C352.494 310.94 342.29 313.126 332.898 315.849C321.464 319.164 309.308 322.721 301.029 331.25C292.629 339.905 278.479 354.687 286.258 363.9C299.742 379.869 331.488 367.997 345.303 383.683C352.837 392.238 331.907 402.874 330.535 414.174C328.983 426.968 324.149 453.218 337.017 451.956C357.006 449.995 361.225 419.055 378.84 409.436C384.609 406.286 389.685 416.561 395.151 420.21C407.682 428.576 419.063 452.25 432.371 445.175C445.047 438.436 429.333 417.068 427.848 402.827C427.141 396.044 425.1 389.42 425.851 382.642C426.477 376.997 428.049 371.08 431.838 366.838C445.889 351.101 476.412 345.279 477.973 324.272C479.047 309.819 447.75 323.368 435.667 315.306C425.68 308.641 429.574 280.847 418.063 284.295C399.693 289.798 401.843 321.662 384.849 330.53Z" fill="#FF6600"/>
                    </g>
                    <defs>
                        <filter id="filter0_f_3141_47262" x="0" y="0" width="762" height="736" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                        <feGaussianBlur stdDeviation="142" result="effect1_foregroundBlur_3141_47262"/>
                        </filter>
                    </defs>
                </svg>
            </div>
            <div className="flex md:hidden absolute z-[1] top-[100px]  right-[0px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="393" height="736" viewBox="0 0 393 736" fill="none">
                    <g filter="url(#filter0_f_3141_48172)">
                        <path d="M304.849 330.53C296.346 334.967 291.138 316.209 281.904 313.599C272.494 310.94 262.29 313.126 252.898 315.849C241.464 319.164 229.308 322.721 221.029 331.25C212.629 339.905 198.479 354.687 206.258 363.9C219.742 379.869 251.488 367.997 265.303 383.683C272.837 392.238 251.907 402.874 250.535 414.174C248.983 426.968 244.149 453.218 257.017 451.956C277.006 449.995 281.225 419.055 298.84 409.436C304.609 406.286 309.685 416.561 315.151 420.21C327.682 428.576 339.063 452.25 352.371 445.175C365.047 438.436 349.333 417.068 347.848 402.827C347.141 396.044 345.1 389.42 345.851 382.642C346.477 376.997 348.049 371.08 351.838 366.838C365.889 351.101 396.412 345.279 397.973 324.272C399.047 309.819 367.75 323.368 355.667 315.306C345.68 308.641 349.574 280.847 338.063 284.295C319.693 289.798 321.843 321.662 304.849 330.53Z" fill="#FF6600"/>
                    </g>
                    <defs>
                        <filter id="filter0_f_3141_48172" x="-80" y="0" width="762" height="736" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                        <feGaussianBlur stdDeviation="142" result="effect1_foregroundBlur_3141_48172"/>
                        </filter>
                    </defs>
                </svg>
            </div>
            <div className="max-w-[1240px] mx-auto relative z-[2]">
                <nav className="flex items-center flex-row gap-[7px] mb-[44px] md:mb-[64px]" aria-label="Breadcrumb">
                    <ol className="flex items-center flex-row gap-[7px]">
                        <li><Link to={`/about-us`}><span className="font-Roboto text-LightGray font-normal leading-[14px] md:leading-[14px] text-[14px] md:text-[14px] tracking-[0.07px]">About us</span> </Link></li>
                        <li className="flex items-center flex-row gap-[7px]"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M10.6813 7.71732C10.8362 7.87232 10.8362 8.12732 10.6813 8.28232L6.68125 12.2823C6.52625 12.4373 6.27125 12.4373 6.11625 12.2823C5.96125 12.1273 5.96125 11.8723 6.11625 11.7173L9.83375 7.99982L6.11625 4.28232C5.96125 4.12732 5.96125 3.87232 6.11625 3.71732C6.27125 3.56232 6.52625 3.56232 6.68125 3.71732L10.6813 7.71732Z" fill="#091019"/>
                        </svg>
                        <Link to={`#`} aria-current="page"><span className="font-Roboto text-PrimaryBlack font-normal leading-[14px] md:leading-[14px] text-[14px] md:text-[14px] tracking-[0.07px]">Author detail</span> </Link></li>
                    </ol>  
                </nav>
            </div>
            <div className="max-w-[1240px] mx-auto relative z-[2]">
                <div className="flex flex-col lg:flex-row gap-11">
                    <div className="w-full lg:w-[63.5%]">
                        <div className="flex flex-col md:flex-row gap-11">
                            <div className="w-full md:w-[31.25%]">
                                <div className='bg-DarkOrange rounded-[12px] max-w-[324px]'> 
                                    <img 
                                        src={author?.image?.asset?.url || "https://cdn.sanity.io/images/m5xb8z9y/production/e02bf6c26e001c21cb6ef53771a99b8af3ca48eb-1600x900.webp"} 
                                        alt={author?.image?.alt || author?.name || "Author"} 
                                        className="w-full h-full rounded-[12px] object-cover"
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-[68.75%]">
                                <h1 className="mb-3 font-Roboto text-PrimaryBlack font-normal leading-[38.4px] md:leading-[48.4px] text-[32px] md:text-[44px] tracking-[-0.48px] md:tracking-[-0.88px]">
                                    {author?.name || "Sabrina Jeongco"}
                                </h1>
                                <p className="mb-6 md:mb-10 font-Roboto text-PrimaryBlack font-normal md:font-medium leading-[24px] md:leading-[28px] text-[16px] md:text-[20px] tracking-[0px] opacity-70">
                                    Author
                                </p>
                                
                                {author?.introduction && (
                                    <div className="mb-6 md:mb-10">
                                        <PortableText value={author.introduction} />
                                    </div>
                                )}
                                
                                {author?.linkedinUrl && (
                                    <div className="flex flex-row gap-4 items-start">
                                        <a
                                            href={author.linkedinUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-transparent border border-LightWhite
                                            font-Roboto text-PrimaryBlack font-normal text-[16px] md:text-base leading-[16px] tracking-[0.08px] px-3 py-3 rounded-full flex
                                            items-center gap-3  transition-all"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 33" fill="none">
                                                <g clipPath="url(#clip0_3218_20231)">
                                                    <path d="M16 32.5C24.8366 32.5 32 25.3366 32 16.5C32 7.66344 24.8366 0.5 16 0.5C7.16344 0.5 0 7.66344 0 16.5C0 25.3366 7.16344 32.5 16 32.5Z" fill="#0B69C7"/>
                                                    <path d="M12.4213 10.6832C12.4217 11.1155 12.2939 11.5383 12.0539 11.898C11.8139 12.2577 11.4727 12.5381 11.0733 12.7038C10.6739 12.8694 10.2343 12.9129 9.81024 12.8286C9.38614 12.7444 8.99657 12.5362 8.69083 12.2305C8.38509 11.9247 8.17692 11.5352 8.09267 11.1111C8.00842 10.687 8.05187 10.2474 8.21753 9.84803C8.38319 9.44864 8.6636 9.10737 9.02329 8.86741C9.38298 8.62745 9.80577 8.49958 10.2382 8.5C10.817 8.50056 11.372 8.73075 11.7813 9.14005C12.1906 9.54935 12.4208 10.1043 12.4213 10.6832Z" fill="white"/>
                                                    <path d="M11.3869 13.7812H9.08793C8.78911 13.7812 8.54688 14.0235 8.54688 14.3223V23.9623C8.54688 24.2611 8.78911 24.5034 9.08793 24.5034H11.3869C11.6857 24.5034 11.9279 24.2611 11.9279 23.9623V14.3223C11.9279 14.0235 11.6857 13.7812 11.3869 13.7812Z" fill="white"/>
                                                    <path d="M23.948 19.333V24.0003C23.948 24.1321 23.8957 24.2585 23.8025 24.3517C23.7093 24.4448 23.5829 24.4972 23.4512 24.4972H20.9838C20.852 24.4972 20.7257 24.4448 20.6325 24.3517C20.5393 24.2585 20.487 24.1321 20.487 24.0003V19.4782C20.487 18.8025 20.6828 16.5309 18.7228 16.5309C17.2028 16.5309 16.8933 18.093 16.828 18.794V24.0109C16.8253 24.1401 16.7723 24.2631 16.6803 24.3539C16.5884 24.4447 16.4646 24.4961 16.3354 24.4972H13.948C13.8827 24.4975 13.818 24.4848 13.7576 24.4599C13.6972 24.4351 13.6423 24.3985 13.5961 24.3523C13.5499 24.3061 13.5133 24.2512 13.4884 24.1908C13.4636 24.1304 13.4509 24.0657 13.4512 24.0003V14.274C13.4509 14.2086 13.4635 14.1438 13.4884 14.0833C13.5132 14.0227 13.5498 13.9677 13.596 13.9213C13.6421 13.875 13.697 13.8382 13.7574 13.8131C13.8178 13.788 13.8826 13.7751 13.948 13.7751H16.3354C16.4016 13.774 16.4674 13.786 16.5289 13.8106C16.5904 13.8352 16.6464 13.8718 16.6937 13.9182C16.7409 13.9647 16.7784 14.02 16.804 14.0811C16.8296 14.1422 16.8428 14.2078 16.8428 14.274V15.1161C17.407 14.274 18.2449 13.6172 20.028 13.6172C23.9712 13.6151 23.948 17.3056 23.948 19.333Z" fill="white"/>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_3218_20231">
                                                    <rect width="32" height="32" fill="white" transform="translate(0 0.5)"/>
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            View Profile
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 25" fill="none">
                                                <path d="M18.6009 5.2998C18.9309 5.2998 19.2009 5.5698 19.2009 5.8998V15.4998C19.2009 15.8298 18.9309 16.0998 18.6009 16.0998C18.2709 16.0998 18.0009 15.8298 18.0009 15.4998V7.34731L5.82461 19.5236C5.59211 19.7561 5.20961 19.7561 4.97711 19.5236C4.74461 19.2911 4.74461 18.9086 4.97711 18.6761L17.1534 6.4998H9.00086C8.67086 6.4998 8.40086 6.2298 8.40086 5.8998C8.40086 5.5698 8.67086 5.2998 9.00086 5.2998H18.6009Z" fill="#091019"/>
                                            </svg>
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='w-full lg:w-[36.5%] md:sticky md:top-0 h-fit z-10'>
                        <div className='flex flex-col gap-6 md:gap-8 border border-[#F6F6F6] rounded-[20px] p-5 md:p-6 bg-[#F6F6F6] h-fit'>
                            <h2 className="line-clamp-2 font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[31.2px] text-[24px] md:text-[24px] tracking-[-0.36px] md:tracking-[-0.36px]">Latest Article</h2>
                            
                            {/* Dynamic Latest Article */}
                            {latestPost ? (
                                <div className="flex items-start gap-5">
                                    <img 
                                        src={getFeaturedImage(latestPost)} 
                                        alt={latestPost.mainImage?.alt || latestPost.title || "Latest article"} 
                                        className="w-[90px] md:w-[123px] h-[76px] md:h-[103px] rounded-[12px] object-cover"
                                    />
                                
                                    <div className="flex gap-3 flex-col">
                                        <p className="flex items-center gap-1">
                                            <span className="flex items-center gap-1 flex font-Roboto text-LightGray font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px]">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 21" fill="none" className="hidden md:flex">
                                                    <path
                                                    d="M14.8781 15.5188C14.4406 13.7844 12.8719 12.5 11 12.5H9C7.12813 12.5 5.55937 13.7844 5.12187 15.5188C3.8125 14.2469 3 12.4688 3 10.5C3 6.63438 6.13438 3.5 10 3.5C13.8656 3.5 17 6.63438 17 10.5C17 12.4688 16.1875 14.2469 14.8781 15.5188ZM13.9875 16.25C12.8594 17.0375 11.4812 17.5 10 17.5C8.51875 17.5 7.14062 17.0375 6.00938 16.2531C6.13438 14.7125 7.425 13.5 9 13.5H11C12.575 13.5 13.8625 14.7125 13.9906 16.2531L13.9875 16.25ZM10 18.5C14.4187 18.5 18 14.9187 18 10.5C18 6.08125 14.4187 2.5 10 2.5C5.58125 2.5 2 6.08125 2 10.5C2 14.9187 5.58125 18.5 10 18.5ZM10 10C9.17188 10 8.5 9.32812 8.5 8.5C8.5 7.67188 9.17188 7 10 7C10.8281 7 11.5 7.67188 11.5 8.5C11.5 9.32812 10.8281 10 10 10Z"
                                                    fill="#4D4E4F"
                                                    />
                                                </svg>
                                                {latestPost.authorName || author?.name || "Sabrina Jeongco"}
                                            </span>
                                            <span className="w-[1px] h-[9px] bg-LightWhite"></span>
                                            <span className="min-w-[82px] md:min-w-[105px] flex items-center gap-1 flex gap-1 font-Roboto text-LightGray font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px]">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 21" fill="none" className="hidden md:flex">
                                                    <path
                                                    d="M6.5 2.5C6.775 2.5 7 2.725 7 3V4.5H13V3C13 2.725 13.225 2.5 13.5 2.5C13.775 2.5 14 2.725 14 3V4.5H15C16.1031 4.5 17 5.39687 17 6.5V15.5C17 16.6031 16.1031 17.5 15 17.5H5C3.89688 17.5 3 16.6031 3 15.5V6.5C3 5.39687 3.89688 4.5 5 4.5H6V3C6 2.725 6.225 2.5 6.5 2.5ZM15 5.5H5C4.44687 5.5 4 5.94688 4 6.5V7.5H16V6.5C16 5.94688 15.5531 5.5 15 5.5ZM16 8.5H4V15.5C4 16.0531 4.44687 16.5 5 16.5H15C15.5531 16.5 16 16.0531 16 15.5V8.5Z"
                                                    fill="#4D4E4F"
                                                    />
                                                </svg>
                                                {formatDate(latestPost.date)}
                                            </span>
                                        </p>
                                        
                                        <Link to={`/blog/${latestPost.slug.current}`}>
                                            <h3 className="line-clamp-2 font-Roboto text-PrimaryBlack font-medium md:font-semibold leading-[27px] md:leading-[28px] text-[18px] md:text-[20px] tracking-[-0.3px] md:tracking-[-0.3px]">
                                                {latestPost.title || "3 Essential Steps to Creating a Practical and Affordable Virtual Office"}
                                            </h3>
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                // Fallback if no posts found
                                <div className="flex items-start gap-5">
                                    <img src="https://cdn.sanity.io/images/m5xb8z9y/production/e02bf6c26e001c21cb6ef53771a99b8af3ca48eb-1600x900.webp" alt="The Ultimate 2025 Guide to Virtual Mailboxes for E-Commerce Businesses" className="w-[90px] md:w-[123px] h-[76px] md:h-[103px] rounded-[12px] object-cover"/>
                                
                                    <div className="flex gap-3 flex-col">
                                        <p className="flex items-center gap-1">
                                            <span className="flex items-center gap-1 flex font-Roboto text-LightGray font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px]">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 21" fill="none" className="hidden md:flex">
                                                    <path
                                                    d="M14.8781 15.5188C14.4406 13.7844 12.8719 12.5 11 12.5H9C7.12813 12.5 5.55937 13.7844 5.12187 15.5188C3.8125 14.2469 3 12.4688 3 10.5C3 6.63438 6.13438 3.5 10 3.5C13.8656 3.5 17 6.63438 17 10.5C17 12.4688 16.1875 14.2469 14.8781 15.5188ZM13.9875 16.25C12.8594 17.0375 11.4812 17.5 10 17.5C8.51875 17.5 7.14062 17.0375 6.00938 16.2531C6.13438 14.7125 7.425 13.5 9 13.5H11C12.575 13.5 13.8625 14.7125 13.9906 16.2531L13.9875 16.25ZM10 18.5C14.4187 18.5 18 14.9187 18 10.5C18 6.08125 14.4187 2.5 10 2.5C5.58125 2.5 2 6.08125 2 10.5C2 14.9187 5.58125 18.5 10 18.5ZM10 10C9.17188 10 8.5 9.32812 8.5 8.5C8.5 7.67188 9.17188 7 10 7C10.8281 7 11.5 7.67188 11.5 8.5C11.5 9.32812 10.8281 10 10 10Z"
                                                    fill="#4D4E4F"
                                                    />
                                                </svg>
                                                {author?.name || "Sabrina Jeongco"}
                                            </span>
                                            <span className="w-[1px] h-[9px] bg-LightWhite"></span>
                                            <span className="min-w-[82px] md:min-w-[105px] flex items-center gap-1 flex gap-1 font-Roboto text-LightGray font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px]">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 21" fill="none" className="hidden md:flex">
                                                    <path
                                                    d="M6.5 2.5C6.775 2.5 7 2.725 7 3V4.5H13V3C13 2.725 13.225 2.5 13.5 2.5C13.775 2.5 14 2.725 14 3V4.5H15C16.1031 4.5 17 5.39687 17 6.5V15.5C17 16.6031 16.1031 17.5 15 17.5H5C3.89688 17.5 3 16.6031 3 15.5V6.5C3 5.39687 3.89688 4.5 5 4.5H6V3C6 2.725 6.225 2.5 6.5 2.5ZM15 5.5H5C4.44687 5.5 4 5.94688 4 6.5V7.5H16V6.5C16 5.94688 15.5531 5.5 15 5.5ZM16 8.5H4V15.5C4 16.0531 4.44687 16.5 5 16.5H15C15.5531 16.5 16 16.0531 16 15.5V8.5Z"
                                                    fill="#4D4E4F"
                                                    />
                                                </svg>
                                                Dec 26, 2023 
                                            </span>
                                        </p>
                                        
                                        <Link to={`#`}>
                                            <h3 className="line-clamp-2 font-Roboto text-PrimaryBlack font-medium md:font-semibold leading-[27px] md:leading-[28px] text-[18px] md:text-[20px] tracking-[-0.3px] md:tracking-[-0.3px]">3 Essential Steps to Creating a Practical and Affordable Virtual Office</h3>
                                        </Link>
                                    </div>
                                </div>
                            )}
                            
                            <div className="flex flex-col gap-6 p-6 border border-LightWhite rounded-[24px] bg-PrimaryBlack ">
                                <div className="flex gap-1 flex-col">
                                    <span className="font-Roboto text-white font-semibold leading-[43.2px] md:leading-[61.6px] text-[36px] md:text-[56px] tracking-[-0.54px] md:tracking-[-1.12px]">1000+</span>
                                    <p className="font-Roboto text-white font-medium leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px]">Rely on Virtual Mailbox for a professional address, business line, and growth tools — all in one.</p>
                                </div>
                                <Link to={`/create-account`} className="group relative flex items-center justify-center w-full bg-DarkOrange text-white font-medium font-Roboto leading-[16px] text-[16px] tracking-[0.08px] py-[12px]  px-4 rounded-full h-[52px] overflow-hidden transition-all hover:bg-[#DF5D07] hover:text-white">
                                    <span className="relative flex items-center transition-all duration-300">Get Started Today  <span className="relative right-0 opacity-0 translate-x-[12px] hidden group-hover:opacity-100 group-hover:block group-hover:translate-x-[12px] transition-all duration-300">
                                        <RightArrowWhite />
                                    </span></span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="px-5 py-[40px] md:py-[60px] lg:py-[100px] bg-[#F6F6F6]">
            <div className="max-w-[1240px] mx-auto">   
                {/* Other Related Posts */}
               
                <div className="">
                    <div className="flex flex-col gap-3 mb-11 md:mb-11">
                        <h2 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[61.6px] text-[24px] md:text-[56px] tracking-[-0.36px] md:tracking-[-1.12px]">Blogs by {author?.name || "Sabrina Jeongco"}</h2>
                    </div>
                    
                    {/* Dynamic Blog Cards */}
                    {displayedBlogs.length > 0 ? (
                        <>
                            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-11 md:gap-x-6 md:gap-y-11">
                                {displayedBlogs.map((post: any, index: number) => (
                                    <Link to={`/blog/${post.slug.current}`} key={post._id || index}>
                                        <li className="group relative border border-LightWhite hover:border-PrimaryBlack rounded-[20px] overflow-hidden bg-white transition">
                                            <img 
                                                src={getFeaturedImage(post)} 
                                                alt={post.mainImage?.alt || post.title || "Blog post"} 
                                                className="w-full rounded-t-[20px] h-[249px] object-cover"
                                            />
                                           
                                            <div className='absolute right-[24px] top-[24px] flex items-center justify-center gap-2 w-[48px] h-[48px] rounded-full bg-DarkOrange transition-all opacity-0 group-hover:opacity-100'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                                <path d="M19.0989 4.80005C19.4289 4.80005 19.6989 5.07005 19.6989 5.40005V15C19.6989 15.33 19.4289 15.6 19.0989 15.6C18.7689 15.6 18.4989 15.33 18.4989 15V6.84755L6.32266 19.0238C6.09016 19.2563 5.70766 19.2563 5.47516 19.0238C5.24266 18.7913 5.24266 18.4088 5.47516 18.6761L17.1534 6.00005H9.49891C9.16891 6.00005 8.89891 5.73005 8.89891 5.40005C8.89891 5.07005 9.16891 4.80005 9.49891 4.80005H19.0989Z" fill="white"/>
                                                </svg>
                                            </div>
                                            <div className="p-6">
                                                <p className="flex items-center gap-2">
                                                    <span className="flex items-center gap-1 flex gap-1 font-Roboto text-LightGray font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px]">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 21" fill="none">
                                                        <path
                                                        d="M14.8781 15.5188C14.4406 13.7844 12.8719 12.5 11 12.5H9C7.12813 12.5 5.55937 13.7844 5.12187 15.5188C3.8125 14.2469 3 12.4688 3 10.5C3 6.63438 6.13438 3.5 10 3.5C13.8656 3.5 17 6.63438 17 10.5C17 12.4688 16.1875 14.2469 14.8781 15.5188ZM13.9875 16.25C12.8594 17.0375 11.4812 17.5 10 17.5C8.51875 17.5 7.14062 17.0375 6.00938 16.2531C6.13438 14.7125 7.425 13.5 9 13.5H11C12.575 13.5 13.8625 14.7125 13.9906 16.2531L13.9875 16.25ZM10 18.5C14.4187 18.5 18 14.9187 18 10.5C18 6.08125 14.4187 2.5 10 2.5C5.58125 2.5 2 6.08125 2 10.5C2 14.9187 5.58125 18.5 10 18.5ZM10 10C9.17188 10 8.5 9.32812 8.5 8.5C8.5 7.67188 9.17188 7 10 7C10.8281 7 11.5 7.67188 11.5 8.5C11.5 9.32812 10.8281 10 10 10Z"
                                                        fill="#4D4E4F"
                                                        />
                                                    </svg>
                                                    {post.authorName || author?.name || "Sabrina Jeongco"}
                                                    </span>
                                                    <span className="w-[1px] h-[9px] bg-LightWhite"></span>
                                                    <span className="flex items-center gap-1 flex gap-1 font-Roboto text-LightGray font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px]">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 21" fill="none">
                                                        <path
                                                        d="M6.5 2.5C6.775 2.5 7 2.725 7 3V4.5H13V3C13 2.725 13.225 2.5 13.5 2.5C13.775 2.5 14 2.725 14 3V4.5H15C16.1031 4.5 17 5.39687 17 6.5V15.5C17 16.6031 16.1031 17.5 15 17.5H5C3.89688 17.5 3 16.6031 3 15.5V6.5C3 5.39687 3.89688 4.5 5 4.5H6V3C6 2.725 6.225 2.5 6.5 2.5ZM15 5.5H5C4.44687 5.5 4 5.94688 4 6.5V7.5H16V6.5C16 5.94688 15.5531 5.5 15 5.5ZM16 8.5H4V15.5C4 16.0531 4.44687 16.5 5 16.5H15C15.5531 16.5 16 16.0531 16 15.5V8.5Z"
                                                        fill="#4D4E4F"
                                                        />
                                                    </svg>
                                                    {formatDate(post.date)}
                                                    </span>
                                                </p>
                                        
                                            
                                                <h3 className="mt-4 line-clamp-2 font-Roboto text-PrimaryBlack font-semibold leading-[28px] md:leading-[31.2px] text-[20px] md:text-[24px] tracking-[-0.3px] md:tracking-[-0.36px]">
                                                    {post.title || "Untitled Post"}
                                                </h3>
                                            
                                            <p className="line-clamp-2 mt-2 font-Roboto text-LightGray font-normal leading-[21px] md:leading-[24px] text-[14px] md:text-[16px] tracking-[0px]">
                                                {getExcerpt(post)}
                                            </p>
                                            </div>
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                            
                            {/* Load More Button - Only show if there are more blogs to load */}
                            {authorBlogs.length > visibleBlogs && (
                                <div className="flex justify-center mt-11">
                                    <button                            
                                        className="flex items-center justify-center w-[151px] h-[44px] md:h-[52px] rounded-[100px] font-normal leading-[16px] tracking-[0.08px] text-[16px] text-PrimaryBlack border border-[#091019] px-4 py-[12px] bg-white transition-all  hover:bg-PrimaryBlack hover:text-white"
                                        onClick={loadMoreBlogs}
                                    >
                                        Load More
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-11">
                            <p className="font-Roboto text-LightGray font-normal leading-[24px] text-[16px]">
                                No blog posts found for {author?.name || "this author"}.
                            </p>
                        </div>
                    )}
                </div>
               
            </div> 
        </div> 
    </div>
  );
}