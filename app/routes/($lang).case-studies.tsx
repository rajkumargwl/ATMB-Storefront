// app/routes/case-studies.tsx

import {json, type LoaderFunctionArgs} from "@shopify/remix-oxygen";
import {useLoaderData, Link} from "@remix-run/react";

export async function loader({context}: LoaderFunctionArgs) {

  const caseStudies = await context.sanity.query({
    query: `*[_type == "caseStudy"] | order(date desc) {
      _id,
      title,
      "slug": slug.current,
      heroImage {
      
        "url": asset->url
      }
    }`,
  });

 
  return json({caseStudies});
}

export default function CaseStudies() {
  const {caseStudies} = useLoaderData<typeof loader>();

  return (
    <div className="px-5 py-[60px] lg:py-[100px]">
      <div className="max-w-[1240px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-start gap-3 mb-[44px] md:mb-[60px] lg:mb-[64px]">
          <p className="font-Roboto text-LightGray text-[14px] md:text-[16px]">
            Case Studies
          </p>
          <h1 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[61.6px] text-[24px] md:text-[56px] tracking-[-0.36px] md:tracking-[-1.12px]">
            Real life success stories
          </h1>
          <p className="font-Roboto text-LightGray text-[16px] leading-[24px]">
            Learn how two operators in different verticals have leveraged virtual
            mailboxes with Anytime Mailbox to create a new growing and recurring
            revenue stream. The two success stories highlight the power of offering
            a private label digital mail solution.
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {caseStudies?.map((study: any) => (
            <div key={study?._id || Math.random()} className="flex flex-col">
              {/* Image */}
              {study?.heroImage?.url ? (
                <img
                  src={study?.heroImage?.url}
                  alt={study?.heroImage?.alt || study?.title || "Case Study Image"}
                  className="w-full h-[320px] object-cover rounded-[20px]"
                />
              ) : (
                <div className="w-full h-[320px] bg-gray-200 rounded-[20px] flex items-center justify-center text-gray-500">
                  No Image Available
                </div>
              )}

              {/* Title */}
              <h2 className="mt-6 font-Roboto text-PrimaryBlack font-semibold text-[20px] md:text-[24px] leading-[28px] md:leading-[31.2px]">
                {study?.title || "Untitled Case Study"}
              </h2>

              {/* Button */}
              {study?.slug ? (
                <Link 
                  to={`/case-study/${study.slug}`}
                  className="mt-4 inline-block font-Roboto text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors"
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