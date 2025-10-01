import { Await, useLoaderData } from '@remix-run/react';
import FounderBg from "~/components/media/Founder-bg.png";
import FounderBgMobile from "~/components/media/our-founder-bg-mobile.png";
import { Link } from 'react-router-dom';
 
import {
  AnalyticsPageType,
  type SeoHandleFunction,
} from '@shopify/hydrogen';
import {
  defer,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import { Suspense } from 'react';
import { SanityPreview } from 'hydrogen-sanity';
 
import { fetchGids, validateLocale } from '~/lib/utils';
import { FOUNDER_DETAIL_PAGE_QUERY } from '~/queries/sanity/fragments/pages/founderdetailpage';
 
// -----------------
// SEO
// -----------------
const seo: SeoHandleFunction = ({ data }) => ({
  title: data?.founder?.seo?.title || data?.founder?.title || 'Founder Details',
  description:
    data?.founder?.seo?.description ||
    (data?.founder?.title ? `Learn more about ${data.founder.title}` : 'Learn more about our founder'),
});
export const handle = { seo };
 
// -----------------
// Loader
// -----------------
export async function loader({ context, params }: LoaderFunctionArgs) {
  validateLocale({ context, params });
 
  // 👇 if slug not provided, return gracefully
  if (!params?.slug) {
    return defer({
      founder: null,
      gids: null,
      analytics: { pageType: AnalyticsPageType.page },
    });
  }
 
  const founder = await context.sanity.query({
    query: FOUNDER_DETAIL_PAGE_QUERY,
    params: { slug: params.slug },
  });
 
  if (!founder) {
    return defer({
      founder: null,
      gids: null,
      analytics: { pageType: AnalyticsPageType.page },
    });
  }
 
  const gids = fetchGids({ page: founder, context });
 
  return defer({
    founder,
    gids,
    analytics: { pageType: AnalyticsPageType.page },
  });
}
 
// -----------------
// Component
// -----------------
export default function FounderDetails() {
  const { founder, gids } = useLoaderData<typeof loader>();
 
  // fallback UI when slug missing or founder not found
  if (!founder) {
    return (
      <div className="px-5 pt-[40px] pb-[40px] md:pb-[60px] lg:pb-[100px] bg-white">
           <nav className="flex items-center flex-row gap-[7px]" aria-label="Breadcrumb">
              <ol className="flex items-center flex-row gap-[7px]">
                <li><Link to={`/about-us`}><span className="font-Roboto text-LightGray font-normal leading-[14px] md:leading-[14px] text-[14px] md:text-[14px] tracking-[0.07px]">About</span> </Link></li>
                <li> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10.6813 7.71732C10.8362 7.87232 10.8362 8.12732 10.6813 8.28232L6.68125 12.2823C6.52625 12.4373 6.27125 12.4373 6.11625 12.2823C5.96125 12.1273 5.96125 11.8723 6.11625 11.7173L9.83375 7.99982L6.11625 4.28232C5.96125 4.12732 5.96125 3.87232 6.11625 3.71732C6.27125 3.56232 6.52625 3.56232 6.68125 3.71732L10.6813 7.71732Z" fill="#091019"/>
                  </svg></li>
                <li> <span aria-current="page" className="font-Roboto text-PrimaryBlack font-normal leading-[14px] md:leading-[14px] text-[14px] md:text-[14px] tracking-[0.07px]">Our founder</span> </li>
              </ol>  
          </nav>
          <p className="font-Roboto text-LightGray font-normal leading-[24px] text-[16px]">
            Founder details are not available at the moment.
          </p>
      </div>
    );
  }
 
  // unwrap the data
  const founderData = founder?.modules?.[0]?.founders;
 
  return (
    <SanityPreview data={founder} query={FOUNDER_DETAIL_PAGE_QUERY}>
      {(founder) => (
        <Suspense>
          <Await resolve={gids}>
            <div className="relative z-[2] px-5 pt-[40px] pb-[40px] md:pb-[60px] lg:pb-[100px] bg-white">
              <div className="absolute hidden md:flex z-[1] bottom-[0px] right-[0px]">
              <img src={FounderBg} alt="Background" className="w-[473px] h-[468px]"/>
              </div>
              <div className='max-w-[1240px] mx-auto '>
                <div className='flex flex-col mb-[44px] md:mb-[64px]'>
                    <nav className="flex items-center flex-row gap-[7px]" aria-label="Breadcrumb">
                      <ol className="flex items-center flex-row gap-[7px]">
                        <li><Link to={`/about-us`}><span className="font-Roboto text-LightGray font-normal leading-[14px] md:leading-[14px] text-[14px] md:text-[14px] tracking-[0.07px]">About</span> </Link></li>
                        <li> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M10.6813 7.71732C10.8362 7.87232 10.8362 8.12732 10.6813 8.28232L6.68125 12.2823C6.52625 12.4373 6.27125 12.4373 6.11625 12.2823C5.96125 12.1273 5.96125 11.8723 6.11625 11.7173L9.83375 7.99982L6.11625 4.28232C5.96125 4.12732 5.96125 3.87232 6.11625 3.71732C6.27125 3.56232 6.52625 3.56232 6.68125 3.71732L10.6813 7.71732Z" fill="#091019"/>
                          </svg></li>
                        <li> <span aria-current="page" className="font-Roboto text-PrimaryBlack font-normal leading-[14px] md:leading-[14px] text-[14px] md:text-[14px] tracking-[0.07px]">Our founder</span> </li>
                      </ol>  
                  </nav>
                </div>
              <div className="flex flex-col md:flex-row gap-[44px] md:gap-[44px] lg:gap-[72px]">
                {/* Profile Image */}
                {founderData?.profileImage?.url && (
                  <div className="w-full md:w-[35%] lg:w-[27.7%] flex items-start justify-start md:justify-center">
                    <div className='w-full"'>
                      <img
                        src={founderData.profileImage.url}
                        alt={founderData?.name}
                        className="rounded-[20px] object-cover w-[324px] h-auto bg-DarkOrange"
                      />
                    </div>
                  </div>
                )}
 
                {/* Content */}
                <div className='relative z-[2] w-full md:w-[65%] lg:w-[72.3%]'>
                  <div className="absolute flex md:hidden z-[1] top-[-377px] right-[0px]">
                   <img src={FounderBgMobile} alt="Background" className="w-[393px] h-[736px]"/>
                   
                  </div>
                  <div className='pb-[24px] md:pb-[40px] flex flex-col md:flex-row gap-4 items-start justify-between'>
                  <div className='flex flex-col gap-3 items-start'>
                    <h1 className="font-Roboto text-PrimaryBlack font-normal leading-[38.4px] md:leading-[52.8px] text-[32px] md:text-[48px] tracking-[-0.48px] md:tracking-[-0.96px]">
                      {founderData?.name}
                    </h1>
                    <p className="font-Roboto text-PrimaryBlack font-medium leading-[24px] md:leading-[28px] text-[16px] md:text-[20px] tracking-[0px] opacity-70">
                      {founderData?.role}
                    </p>
                  </div>
                  {/* LinkedIn or other socials */}
                  {founderData?.socialLinks && (
                    <div className="hidden md:flex flex-row gap-4 items-start">
                      <a
                        href={founderData.socialLinks}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-transparent border border-LightWhite
                        font-Roboto text-PrimaryBlack text-[16px] md:text-base leading-[16px] tracking-[0.08px] px-3 py-3 rounded-full flex
                        items-center gap-3  transition-all"
                      >
                        {/* LinkedIn SVG */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
                          <g clip-path="url(#clip0_3218_20231)">
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                          <path d="M18.6009 5.2998C18.9309 5.2998 19.2009 5.5698 19.2009 5.8998V15.4998C19.2009 15.8298 18.9309 16.0998 18.6009 16.0998C18.2709 16.0998 18.0009 15.8298 18.0009 15.4998V7.34731L5.82461 19.5236C5.59211 19.7561 5.20961 19.7561 4.97711 19.5236C4.74461 19.2911 4.74461 18.9086 4.97711 18.6761L17.1534 6.4998H9.00086C8.67086 6.4998 8.40086 6.2298 8.40086 5.8998C8.40086 5.5698 8.67086 5.2998 9.00086 5.2998H18.6009Z" fill="#091019"/>
                        </svg>
                      </a>
                    </div>
                  )}
                  </div>
                  {/* Long Bio */}
                  <div className="space-y-4">
                    {founderData?.longBio?.map((block: any) => (
                      <p key={block._key} className='font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[24px] text-[14px] md:text-[16px] tracking-[0px]'>
                        {block.children
                          ?.map((child: any) => child.text)
                          .join('')}
                      </p>
                    ))}
                  </div>
                  {/* LinkedIn or other socials */}
                  {founderData?.socialLinks && (
                    <div className="flex md:hidden flex-row gap-4 items-start mt-6">
                      <a
                        href={founderData.socialLinks}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-transparent border border-LightWhite
                        font-Roboto text-PrimaryBlack text-[16px] md:text-base leading-[16px] tracking-[0.08px] px-3 py-3 rounded-full flex
                        items-center gap-3  transition-all"
                      >
                        {/* LinkedIn SVG */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
                          <g clip-path="url(#clip0_3218_20231)">
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                          <path d="M18.6009 5.2998C18.9309 5.2998 19.2009 5.5698 19.2009 5.8998V15.4998C19.2009 15.8298 18.9309 16.0998 18.6009 16.0998C18.2709 16.0998 18.0009 15.8298 18.0009 15.4998V7.34731L5.82461 19.5236C5.59211 19.7561 5.20961 19.7561 4.97711 19.5236C4.74461 19.2911 4.74461 18.9086 4.97711 18.6761L17.1534 6.4998H9.00086C8.67086 6.4998 8.40086 6.2298 8.40086 5.8998C8.40086 5.5698 8.67086 5.2998 9.00086 5.2998H18.6009Z" fill="#091019"/>
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </div>
              </div>
            </div>
          </Await>
        </Suspense>
      )}
    </SanityPreview>
  );
}