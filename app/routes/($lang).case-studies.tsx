// app/routes/case-studies.tsx
import { json, type LoaderFunctionArgs } from "@shopify/remix-oxygen";
import { useLoaderData, Link } from "@remix-run/react";
import groq from "groq";
import { usePrefixPathWithLocale } from "~/lib/utils";
import { AnalyticsPageType, type SeoHandleFunction } from "@shopify/hydrogen";
import { SEO } from "~/queries/sanity/fragments/seo";





const CASE_STUDIES_QUERY = groq`
  *[_type == "caseStudy" && (language == $language || !defined(language))] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    language,
    heroImage { "url": asset->url },
    ${SEO}
  }
`;

export async function loader({ context, params }: LoaderFunctionArgs) {
  let language = params.lang || "en";
  if (language !== "en-es") {
    language = "en";
  }

  const caseStudies = await context.sanity.query({
    query: CASE_STUDIES_QUERY,
    params: { language },
  });

  const uniqueCaseStudies = Object.values(
    caseStudies.reduce((acc, curr) => {
      if (!acc[curr.slug]) {
        acc[curr.slug] = curr;
      }
      return acc;
    }, {})
  );

  return json({ caseStudies: uniqueCaseStudies });
}
const seo: SeoHandleFunction = ({ data }) => ({
  title:
    data?.page?.seo?.title || 'Business Accelerator - Anytime | Mailbox',
  description:
    data?.page?.seo?.description ||
    'Explore our Business Accelerator program and resources.',
});
export const handle = { seo };
export default function CaseStudies() {
  const { caseStudies } = useLoaderData<typeof loader>();

  return (
    <div className="px-5 pb-[40px] md:pb-[60px] lg:pb-[100px] pt-[40px] md:pt-[44px]">
      <div className="max-w-[1240px] mx-auto">
        <div className="flex flex-col items-start gap-4 md:gap-5 mb-[44px] md:mb-[60px] lg:mb-[64px]">
          <p className="font-Roboto text-LightGray font-medium text-[18px] md:text-[20px]">
            Case Studies
          </p>
          <h1 className="font-Roboto text-PrimaryBlack font-semibold text-[24px] md:text-[36px]">
            Real life success stories
          </h1>
          <p className="max-w-[803px] font-Roboto text-PrimaryBlack font-normal text-[14px] md:text-[16px]">
            Learn how two operators in different verticals have leveraged virtual
            mailboxes with Anytime Mailbox to create a new growing and recurring
            revenue stream. The two success stories highlight the power of offering
            a private label digital mail solution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-9 md:gap-6">
          {caseStudies?.map((study: any) => (
            <div key={study?._id} className="flex flex-col">
              {study?.heroImage?.url ? (
                <img
                  src={study.heroImage.url}
                  alt={study?.title || "Case Study Image"}
                  className="w-full h-[342px] object-cover rounded-[20px]"
                />
              ) : (
                <div className="w-full h-[342px] bg-gray-200 rounded-[20px] flex items-center justify-center text-PrimaryBlack">
                  No Image Available
                </div>
              )}

              <h2 className="mt-5 md:mt-6 font-Roboto text-PrimaryBlack font-semibold text-[20px] md:text-[36px]">
                {study?.title || "Untitled Case Study"}
              </h2>

              {study?.slug ? (
                <Link
                  to={usePrefixPathWithLocale(`/case-study/${study.slug}`)}
                  className="mt-5 md:mt-6 w-[193px] h-[44px] md:h-[52px] flex items-center justify-center rounded-full border border-PrimaryBlack text-[16px]"
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
