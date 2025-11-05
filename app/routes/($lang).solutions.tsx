// app/routes/solutions.tsx
import { WPPost } from "../../shopify-hydrogen/schemaTypes/wpPost";
import { Await, useLoaderData } from '@remix-run/react';
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
import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import ModuleGrid from '~/components/modules/ModuleGrid';
import { fetchGids, notFound, validateLocale } from '~/lib/utils';
import type { PortableTextBlock } from '@portabletext/types';
import { SOLUTIONS_PAGE_QUERY } from '~/queries/sanity/fragments/pages/solutionpage';

// -----------------
// SEO
// -----------------
const seo: SeoHandleFunction = ({ data }) => ({
  title: data?.page?.seo?.title || 'Solutions | Anytime Mailbox',
  description:
    data?.page?.seo?.description ||
    'Explore our virtual mailbox solutions and benefits.',
});
export const handle = { seo };
// -----------------
// Loader
// -----------------
export async function loader({ context, params }: LoaderFunctionArgs) {
  validateLocale({ context, params });
  let language = params.lang || 'en';
  if(language !== 'en-es'){
    language = 'en';
  }

  const page = await context.sanity.query({
    query: SOLUTIONS_PAGE_QUERY, // ✅ use Solutions query
    params: { language  }
  });
   
    const relatedPosts = await context.sanity.query<WPPost[]>({
      query: `*[_type == "wpPost"] | order(date desc) [0...3] {
    _id,
    title,
    slug,
    date,
    content,
    authorName,
    "mainImage": mainImage.asset->url
  }`,
  params: {},
});
    


  // Optionally: pick specific solution module
//   const solutionPageModule = page?.modules?.find(
//     (mod: any) => mod._type === 'solutionPageModule'
//   );

  if (!page) throw notFound();

  const gids = fetchGids({ page, context });

   console.log("soultion page data",JSON.stringify(page,null,2));
  return defer({
    page,
    relatedPosts,
    gids,
    analytics: { pageType: AnalyticsPageType.page },
  });
}

// -----------------
// Component
// -----------------
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
 
 




export default function SolutionsPage() {
  const { page,relatedPosts, gids } = useLoaderData<typeof loader>();
    
  return (
    <SanityPreview data={page} query={SOLUTIONS_PAGE_QUERY}>
      {(page) => (
        <Suspense>
          <Await resolve={gids}>
            {page?.modules && page.modules.length > 0 && (
              <div className={clsx('mb-0 mt-0 px-0', 'md:px-0')}>
                <ModuleGrid items={page.modules} />
              </div>
              
            )}
             <div className="px-5 py-11 md:py-[60px] lg:py-[100px] bg-[#F6F6F6]">
                      <div className="max-w-[1240px] mx-auto">   
                      {/* Other Related Posts */}
                      {relatedPosts.length > 0 && (
                        <div className="">
                          <div className="flex flex-col gap-3 mb-11 md:mb-11">
                            <h2 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[61.6px] text-[24px] md:text-[56px] tracking-[-0.36px] md:tracking-[-1.12px]">Helpful Resources</h2>
                            <p className="font-Roboto text-LightGray font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">Discover practical tips, industry insights, and success stories on virtual mail.</p>
                          </div>
                          <ul className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-11 md:gap-6">
                            {relatedPosts.map((rp) => (
                              <Link to={`/blog/${rp.slug.current}`}>
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
          </Await>
        </Suspense>
      )}
      
    </SanityPreview>
    
  );
}
