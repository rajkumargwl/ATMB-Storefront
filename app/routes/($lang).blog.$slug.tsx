import { json, type LoaderFunctionArgs } from "@shopify/remix-oxygen";
import { useLoaderData } from "@remix-run/react";
import { notFound } from "~/lib/utils";
import { WPPost } from "../../shopify-hydrogen/schemaTypes/wpPost";
import { toHTML } from '@portabletext/to-html';
import type { PortableTextBlock } from '@portabletext/types';
import { Link } from 'react-router-dom';
import {AnalyticsPageType, type SeoHandleFunction} from '@shopify/hydrogen';
import RightArrowWhite from '~/components/icons/RightArrowWhite';
import { usePrefixPathWithLocale } from '~/lib/utils';

const seo: SeoHandleFunction = ({ data }) => ({
  title: data?.post?.title
    ? `${data.post.title} | Anytime Mailbox`
    : 'How Digital Nomads Keep One U.S. Address for Taxes & Banking | Anytime Mailbox',
  description: data?.post?.content
    ? getPlainText(data.post.content).slice(0, 160) // optional: first 160 chars as description
    : 'Find out how digital nomads can keep one U.S. address for taxes and banking...'
});
 
export const handle = { seo };
export async function loader({ context, params }: LoaderFunctionArgs) {
  let language = params.lang || 'en';
  if(language !== 'en-es'){
    language = 'en';
  }

  const { slug } = params;
  if (!slug) throw notFound();
 
  const projectId = context.env.SANITY_PROJECT_ID;
  const dataset = context.env.SANITY_DATASET;
 
  const post = await context.sanity.query<WPPost>({
    query: `*[_type == "wpPost" && slug.current == $slug && (language == $language || !defined(language))][0]{
      _id,
      title,
      slug,
      content,
      date,
      "mainImage": mainImage.asset->url,
      authorName,
      link,
      categories
    }`,
    params: { slug, language },
  });
 
  if (!post) throw notFound();
 
  const catIds = Array.isArray(post.categories) ? post.categories : [];
  const relatedPosts = await context.sanity.query<WPPost[]>({
    query: `*[_type == "wpPost" && count(categories[@ in $catIds]) > 0 && slug.current != $slug][0...4]{
      _id,
      title,
      slug,
      date,
      content,
      authorName,
      "mainImage": mainImage.asset->url
    }`,
    params: { catIds, slug },
  });
 
  return json({ post, relatedPosts, projectId, dataset });
}
 
 
function getPlainText(content: PortableTextBlock[] | undefined): string {
  if (!Array.isArray(content)) return "";
  return content
    .map(block =>
      block._type === "block" && Array.isArray(block.children)
        ? block.children.map(c => c.text).join("")
        : ""
    )
    .join(" ");
}
 
// To render author + date
const renderAuthorDate = (author: string | undefined, date: string | undefined) => (
  <p className="flex items-center gap-2">
    {/* Author */}
    <span className="flex items-center gap-1 flex gap-1 font-Roboto text-LightGray font-normal leading-[21px] md:leading-[24px] text-[14px] md:text-[16px] tracking-[0px]">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 21" fill="none">
        <path
          d="M14.8781 15.5188C14.4406 13.7844 12.8719 12.5 11 12.5H9C7.12813 12.5 5.55937 13.7844 5.12187 15.5188C3.8125 14.2469 3 12.4688 3 10.5C3 6.63438 6.13438 3.5 10 3.5C13.8656 3.5 17 6.63438 17 10.5C17 12.4688 16.1875 14.2469 14.8781 15.5188ZM13.9875 16.25C12.8594 17.0375 11.4812 17.5 10 17.5C8.51875 17.5 7.14062 17.0375 6.00938 16.2531C6.13438 14.7125 7.425 13.5 9 13.5H11C12.575 13.5 13.8625 14.7125 13.9906 16.2531L13.9875 16.25ZM10 18.5C14.4187 18.5 18 14.9187 18 10.5C18 6.08125 14.4187 2.5 10 2.5C5.58125 2.5 2 6.08125 2 10.5C2 14.9187 5.58125 18.5 10 18.5ZM10 10C9.17188 10 8.5 9.32812 8.5 8.5C8.5 7.67188 9.17188 7 10 7C10.8281 7 11.5 7.67188 11.5 8.5C11.5 9.32812 10.8281 10 10 10Z"
          fill="#4D4E4F"
        />
      </svg>
      {author || "Unknown"}
    </span>
    <span className="w-[1px] h-[9px] bg-LightWhite"></span>
    {/* Date */}
    <span className="flex items-center gap-1 flex gap-1 font-Roboto text-LightGray font-normal leading-[21px] md:leading-[24px] text-[14px] md:text-[16px] tracking-[0px]">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 21" fill="none">
        <path
          d="M6.5 2.5C6.775 2.5 7 2.725 7 3V4.5H13V3C13 2.725 13.225 2.5 13.5 2.5C13.775 2.5 14 2.725 14 3V4.5H15C16.1031 4.5 17 5.39687 17 6.5V15.5C17 16.6031 16.1031 17.5 15 17.5H5C3.89688 17.5 3 16.6031 3 15.5V6.5C3 5.39687 3.89688 4.5 5 4.5H6V3C6 2.725 6.225 2.5 6.5 2.5ZM15 5.5H5C4.44687 5.5 4 5.94688 4 6.5V7.5H16V6.5C16 5.94688 15.5531 5.5 15 5.5ZM16 8.5H4V15.5C4 16.0531 4.44687 16.5 5 16.5H15C15.5531 16.5 16 16.0531 16 15.5V8.5Z"
          fill="#4D4E4F"
        />
      </svg>
      {date ? new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
    </span>
  </p>
);
 
 
// To render author + date
const renderAuthorDateRelated = (author: string | undefined, date: string | undefined) => (
  <p className="flex items-center gap-2">
    {/* Author */}
    <span className="flex items-center gap-1 flex gap-1 font-Roboto text-LightGray font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px]">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 21" fill="none">
        <path
          d="M14.8781 15.5188C14.4406 13.7844 12.8719 12.5 11 12.5H9C7.12813 12.5 5.55937 13.7844 5.12187 15.5188C3.8125 14.2469 3 12.4688 3 10.5C3 6.63438 6.13438 3.5 10 3.5C13.8656 3.5 17 6.63438 17 10.5C17 12.4688 16.1875 14.2469 14.8781 15.5188ZM13.9875 16.25C12.8594 17.0375 11.4812 17.5 10 17.5C8.51875 17.5 7.14062 17.0375 6.00938 16.2531C6.13438 14.7125 7.425 13.5 9 13.5H11C12.575 13.5 13.8625 14.7125 13.9906 16.2531L13.9875 16.25ZM10 18.5C14.4187 18.5 18 14.9187 18 10.5C18 6.08125 14.4187 2.5 10 2.5C5.58125 2.5 2 6.08125 2 10.5C2 14.9187 5.58125 18.5 10 18.5ZM10 10C9.17188 10 8.5 9.32812 8.5 8.5C8.5 7.67188 9.17188 7 10 7C10.8281 7 11.5 7.67188 11.5 8.5C11.5 9.32812 10.8281 10 10 10Z"
          fill="#4D4E4F"
        />
      </svg>
      {author || "Unknown"}
    </span>
    <span className="w-[1px] h-[9px] bg-LightWhite"></span>
    {/* Date */}
    <span className="flex items-center gap-1 flex gap-1 font-Roboto text-LightGray font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px]">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 21" fill="none">
        <path
          d="M6.5 2.5C6.775 2.5 7 2.725 7 3V4.5H13V3C13 2.725 13.225 2.5 13.5 2.5C13.775 2.5 14 2.725 14 3V4.5H15C16.1031 4.5 17 5.39687 17 6.5V15.5C17 16.6031 16.1031 17.5 15 17.5H5C3.89688 17.5 3 16.6031 3 15.5V6.5C3 5.39687 3.89688 4.5 5 4.5H6V3C6 2.725 6.225 2.5 6.5 2.5ZM15 5.5H5C4.44687 5.5 4 5.94688 4 6.5V7.5H16V6.5C16 5.94688 15.5531 5.5 15 5.5ZM16 8.5H4V15.5C4 16.0531 4.44687 16.5 5 16.5H15C15.5531 16.5 16 16.0531 16 15.5V8.5Z"
          fill="#4D4E4F"
        />
      </svg>
      {date ? new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
    </span>
  </p>
);
 
 
// To render author + date
const renderAuthorDateRelatedRight = (author: string | undefined, date: string | undefined) => (
  <p className="flex items-center gap-1">
    {/* Author */}
    <span className="flex items-center gap-1 flex font-Roboto text-LightGray font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px]">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 21" fill="none" className="hidden md:flex">
        <path
          d="M14.8781 15.5188C14.4406 13.7844 12.8719 12.5 11 12.5H9C7.12813 12.5 5.55937 13.7844 5.12187 15.5188C3.8125 14.2469 3 12.4688 3 10.5C3 6.63438 6.13438 3.5 10 3.5C13.8656 3.5 17 6.63438 17 10.5C17 12.4688 16.1875 14.2469 14.8781 15.5188ZM13.9875 16.25C12.8594 17.0375 11.4812 17.5 10 17.5C8.51875 17.5 7.14062 17.0375 6.00938 16.2531C6.13438 14.7125 7.425 13.5 9 13.5H11C12.575 13.5 13.8625 14.7125 13.9906 16.2531L13.9875 16.25ZM10 18.5C14.4187 18.5 18 14.9187 18 10.5C18 6.08125 14.4187 2.5 10 2.5C5.58125 2.5 2 6.08125 2 10.5C2 14.9187 5.58125 18.5 10 18.5ZM10 10C9.17188 10 8.5 9.32812 8.5 8.5C8.5 7.67188 9.17188 7 10 7C10.8281 7 11.5 7.67188 11.5 8.5C11.5 9.32812 10.8281 10 10 10Z"
          fill="#4D4E4F"
        />
      </svg>
      {author || "Unknown"}
    </span>
    <span className="w-[1px] h-[9px] bg-LightWhite"></span>
    {/* Date */}
    <span className="min-w-[82px] md:min-w-[105px] flex items-center gap-1 flex gap-1 font-Roboto text-LightGray font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px]">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 21" fill="none" className="hidden md:flex">
        <path
          d="M6.5 2.5C6.775 2.5 7 2.725 7 3V4.5H13V3C13 2.725 13.225 2.5 13.5 2.5C13.775 2.5 14 2.725 14 3V4.5H15C16.1031 4.5 17 5.39687 17 6.5V15.5C17 16.6031 16.1031 17.5 15 17.5H5C3.89688 17.5 3 16.6031 3 15.5V6.5C3 5.39687 3.89688 4.5 5 4.5H6V3C6 2.725 6.225 2.5 6.5 2.5ZM15 5.5H5C4.44687 5.5 4 5.94688 4 6.5V7.5H16V6.5C16 5.94688 15.5531 5.5 15 5.5ZM16 8.5H4V15.5C4 16.0531 4.44687 16.5 5 16.5H15C15.5531 16.5 16 16.0531 16 15.5V8.5Z"
          fill="#4D4E4F"
        />
      </svg>
      {date ? new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
    </span>
  </p>
);
export default function BlogPost() {
  const { post, relatedPosts, projectId, dataset } = useLoaderData<typeof loader>();
  const [featured, ...others] = relatedPosts || [];
 
  const htmlContent = post.content
    ? toHTML(post.content as PortableTextBlock[], {
      components: {
        types: {
          image: ({ value }) => {
            const ref = value?.asset?._ref;
            const src = ref
              ? `https://cdn.sanity.io/images/${projectId}/${dataset}/${ref
                  .replace('image-', '')
                  .replace(/-(jpg|jpeg|png|webp)$/, '.$1')}`
              : '';
            const alt = value?.alt || '';
            return `<img src="${src}" alt="${alt}" class="mb-7 rounded-[20px] w-full" />`;
          },
        },
        block: {
          h1: ({ children }) =>
            `<h1 class="text-4xl font-bold my-6">${children ?? ''}</h1>`,
          h2: ({ children }) =>
            `<h2 class="text-3xl font-semibold my-5">${children ?? ''}</h2>`,
          h3: ({ children }) =>
            `<h3 class="text-2xl font-semibold my-4">${children ?? ''}</h3>`,
          normal: ({ children }) =>
            `<p class="mb-4">${children ?? ''}</p>`,
        },
        marks: {
          strong: ({ children }) => `<strong>${children ?? ''}</strong>`,
          em: ({ children }) => `<em>${children ?? ''}</em>`,
          link: ({ children, value }) =>
            `<a href="${value?.href ?? '#'}" target="_blank" rel="noopener noreferrer">${children ?? ''}</a>`,
        },
      }
      
      })
    : '<p>No content available</p>';
 
  return (
    <div className="">
      <div className="px-5  pt-[40px] md:pt-[40px]  pb-10 md:pb-[60px] lg:pb-[100px]">
        <div className="max-w-[1240px] mx-auto">
          <nav className="flex items-center flex-row gap-[7px] mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center flex-row gap-[7px]">
              <li><Link to={usePrefixPathWithLocale(`/blogs`)}><span className="font-Roboto text-LightGray font-normal leading-[14px] md:leading-[14px] text-[14px] md:text-[14px] tracking-[0.07px]">Blog</span> </Link></li>
              <li className="flex items-center flex-row gap-[7px]"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10.6813 7.71732C10.8362 7.87232 10.8362 8.12732 10.6813 8.28232L6.68125 12.2823C6.52625 12.4373 6.27125 12.4373 6.11625 12.2823C5.96125 12.1273 5.96125 11.8723 6.11625 11.7173L9.83375 7.99982L6.11625 4.28232C5.96125 4.12732 5.96125 3.87232 6.11625 3.71732C6.27125 3.56232 6.52625 3.56232 6.68125 3.71732L10.6813 7.71732Z" fill="#091019"/>
                </svg>
                 <Link to={`#`} aria-current="page"><span className="font-Roboto text-PrimaryBlack font-normal leading-[14px] md:leading-[14px] text-[14px] md:text-[14px] tracking-[0.07px]">Blog detail</span> </Link></li>
            </ol>  
          </nav>
        </div>
        <div className="max-w-[1240px] mx-auto">
          {/* Main Post */}     
          
          <div className="flex flex-col lg:flex-row gap-11">
            {/* Blog Content */}
            <div className="w-full lg:w-[67.2%]">
            <div className="flex flex-col gap-5 mb-7">
              <h1 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[50.4px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]">{post.title}</h1>
              {renderAuthorDate(post.authorName, post.date)}
            </div>
            
            {post.mainImage && (
              <img src={post.mainImage} alt={post.title} className="w-full h-auto object-cover mb-7 rounded-[20px]" />
            )}
            <div className="detail-content prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </div>
            {/* Featured Related Post */}
            <div className="w-full lg:w-[32.8%] xl:min-w-[436px] xl:mr-[-44px] md:sticky md:top-0 h-fit z-10">
              {featured && (
                <aside className="flex flex-col gap-6 md:gap-8 border border-[#F6F6F6] rounded-[20px] p-5 md:p-6 bg-[#F6F6F6] h-fit">
                   <h2 className="line-clamp-2 font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[31.2px] text-[24px] md:text-[24px] tracking-[-0.36px] md:tracking-[-0.36px]">Related Article</h2>
                  <div className="flex items-start gap-5">
                  
                  {featured.mainImage && <img src={featured.mainImage} alt={featured.title} className="w-[90px] md:w-[123px] h-[76px] md:h-[103px] rounded-[12px] object-cover " />}
                  <div className="flex gap-3 flex-col">
                    {renderAuthorDateRelatedRight(featured.authorName, featured.date)}
                    
                    <Link to={usePrefixPathWithLocale(`/blog/${featured.slug.current}`)}>
                      <h3 className="line-clamp-2 font-Roboto text-PrimaryBlack font-medium md:font-semibold leading-[27px] md:leading-[28px] text-[18px] md:text-[20px] tracking-[-0.3px] md:tracking-[-0.3px]">{featured.title}</h3>
                    </Link>
                  </div>
                  </div>
                  <div className="flex flex-col gap-6 p-6 border border-LightWhite rounded-[24px] bg-PrimaryBlack ">
                    <div className="flex gap-1 flex-col">
                        <span className="font-Roboto text-white font-semibold leading-[43.2px] md:leading-[61.6px] text-[36px] md:text-[56px] tracking-[-0.54px] md:tracking-[-1.12px]">1000+</span>
                        <p className="font-Roboto text-white font-medium leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px]">Rely on Virtual Mailbox for a professional address, business line, and growth tools — all in one.</p>
                    </div>
                   <Link to={usePrefixPathWithLocale(`/country-location`)} className="group relative  flex items-center justify-center w-full bg-DarkOrange text-white font-medium font-Roboto leading-[16px] text-[16px] tracking-[0.08px] py-[12px]  px-4 rounded-full h-[52px] overflow-hidden transition-all hover:scale-[1.01] hover:bg-[#DD5827]">
                     <span className="relative flex items-center">Get Started Today <span className="absolute right-0 opacity-0 translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-[35px] transition-all duration-300">
                        <RightArrowWhite />
                      </span></span>
                   </Link>
                  </div>
                </aside>            
              )}
            </div>
          </div>
          </div>
      </div>
        <div className="px-5 py-11 md:py-[60px] lg:py-[100px] bg-[#F6F6F6]">
          <div className="max-w-[1240px] mx-auto">   
          {/* Other Related Posts */}
          {others.length > 0 && (
            <div className="">
              <div className="flex flex-col gap-3 mb-11 md:mb-11">
                <h2 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[61.6px] text-[24px] md:text-[56px] tracking-[-0.36px] md:tracking-[-1.12px]">Related Articles</h2>
                <p className="font-Roboto text-LightGray font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">Discover practical tips, industry insights, and success stories on virtual mail.</p>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-11 md:gap-6">
                {others.map((rp) => (
                  <Link to={usePrefixPathWithLocale(`/blog/${rp.slug.current}`)}>
                  <li key={rp._id} className="group relative border border-LightWhite hover:border-PrimaryBlack rounded-[20px] overflow-hidden bg-white transition">
                   
                    {rp.mainImage && <img src={rp.mainImage} alt={rp.title} className="w-full rounded-t-[20px] h-[249px] object-cover" />}
                    <div className='absolute right-[24px] top-[24px] flex items-center justify-center gap-2 w-[48px] h-[48px] rounded-full bg-DarkOrange transition-all opacity-0 group-hover:opacity-100'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                        <path d="M19.0989 4.80005C19.4289 4.80005 19.6989 5.07005 19.6989 5.40005V15C19.6989 15.33 19.4289 15.6 19.0989 15.6C18.7689 15.6 18.4989 15.33 18.4989 15V6.84755L6.32266 19.0238C6.09016 19.2563 5.70766 19.2563 5.47516 19.0238C5.24266 18.7913 5.24266 18.4088 5.47516 18.1763L17.6514 6.00005H9.49891C9.16891 6.00005 8.89891 5.73005 8.89891 5.40005C8.89891 5.07005 9.16891 4.80005 9.49891 4.80005H19.0989Z" fill="white"/>
                      </svg>
                    </div>
                    <div className="p-6">
                    {renderAuthorDateRelated(rp.authorName, rp.date)}
              
                    
                      <h3 className="mt-4 line-clamp-2 font-Roboto text-PrimaryBlack font-semibold leading-[28px] md:leading-[31.2px] text-[20px] md:text-[24px] tracking-[-0.3px] md:tracking-[-0.36px]">{rp.title}</h3>
                   
                    <p className="line-clamp-2 mt-2 font-Roboto text-LightGray font-normal leading-[21px] md:leading-[24px] text-[14px] md:text-[16px] tracking-[0px]">
                    
                      {getPlainText(rp.content).slice(0, 120)}...
                    </p>
                    </div>
                    
                  </li>
                   </Link>
                ))}
              </ul>
            </div>
          )}
          </div>
        </div>
      
    </div>
  );
}