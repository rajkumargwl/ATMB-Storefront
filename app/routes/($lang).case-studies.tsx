// app/routes/case-studies.tsx

import {json, type LoaderFunctionArgs} from "@shopify/remix-oxygen";
import {useLoaderData, Link} from "@remix-run/react";
import { usePrefixPathWithLocale } from '~/lib/utils';

 import {AnalyticsPageType, type SeoHandleFunction} from '@shopify/hydrogen';
 const seo: SeoHandleFunction = ({data}) => ({
  title: data?.page?.seo?.title || 'Case Studies | Anytime Mailbox',
  description:
    data?.page?.seo?.description ||
    'Why partner with Anytime Mailbox? Because a virtual mailbox offering generates new revenue and profit. These case studies show you how.',
});
export const handle = { seo };
 
export async function loader({ context, params }: LoaderFunctionArgs) {
  let language = params.lang || 'en';
  if(language !== 'en-es'){
    language = 'en';
  }

  const caseStudies = await context.sanity.query({
    query: `*[_type == "caseStudy" && (language == $language || !defined(language))] | order(date desc) {
      _id,
      title,
      "slug": slug.current,
      language,
      heroImage { "url": asset->url }
    }`,
    params: { language }, 
  })

  // Deduplicate by slug (keep latest per slug)
  const uniqueCaseStudies = Object.values(
    caseStudies.reduce((acc, curr) => {
      if (!acc[curr.slug]) {
        acc[curr.slug] = curr
      }
      return acc
    }, {})
  )

  return json({ caseStudies: uniqueCaseStudies })
}

 
export default function CaseStudies() {
  const {caseStudies} = useLoaderData<typeof loader>();
 
  return (
    <div className="px-5 pb-[40px] md:pb-[60px] lg:pb-[100px] pt-[40px] md:pt-[44px]">
      <div className="max-w-[1240px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-start gap-4 md:gap-5 mb-[44px] md:mb-[60px] lg:mb-[64px]">
          <p className="font-Roboto text-LightGray font-medium leading-[27px] md:leading-[28px] text-[18px] md:text-[20px] tracking-[0px]">
            Case Studies
          </p>
          <h1 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]">
            Real life success stories
          </h1>
          <p className="max-w-[803px] font-Roboto text-PrimaryBlack  font-normal text-[14px] md:text-[16px] leading-[21px] md:leading-[24px]  tracking-[0px]">
            Learn how two operators in different verticals have leveraged virtual
            mailboxes with Anytime Mailbox to create a new growing and recurring
            revenue stream. The two success stories highlight the power of offering
            a private label digital mail solution.
          </p>
        </div>
 
        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-9 md:gap-6">
          {caseStudies?.map((study: any) => (
            <div key={study?._id || Math.random()} className="flex flex-col">
              {/* Image */}
              {study?.heroImage?.url ? (
                <img
                  src={study?.heroImage?.url}
                  alt={study?.heroImage?.alt || study?.title || "Case Study Image"}
                  className="w-full h-[342px] object-cover rounded-[20px]"
                />
              ) : (
                <div className="w-full h-[342px] bg-gray-200 rounded-[20px] flex items-center justify-center text-PrimaryBlack">
                  No Image Available
                </div>
              )}
 
              {/* Title */}
              <h2 className="mt-5 md:mt-6 font-Roboto text-PrimaryBlack font-semibold leading-[28px] md:leading-[43.2px] text-[20px] md:text-[36px] tracking-[-0.3px] md:tracking-[-0.54px]">
                {study?.title || "Untitled Case Study"}
              </h2>
 
              {/* Button */}
              {study?.slug ? (
                <Link
                  to={usePrefixPathWithLocale(`/case-study/${study.slug}`)}
                  className="mt-5 md:mt-6 w-[193px] h-[44px] md:h-[52px] flex items-center justify-center px-4 py-3 rounded-full border border-PrimaryBlack font-Roboto text-PrimaryBlack font-normal text-[16px] md:text-[16px] leading-[16px] tracking-[0.08px]"
                >
                  View Case Study
                </Link>
              ) : (
                <p className="mt-4 text-gray-400">No link available</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}