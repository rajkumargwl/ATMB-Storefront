import {json, type LoaderFunctionArgs} from "@shopify/remix-oxygen";
import {useLoaderData,Link} from "@remix-run/react";
import {PortableText, type PortableTextComponents} from "@portabletext/react";
 
// Custom renderers for PortableText content
const components: PortableTextComponents = {
  types: {
    image: ({value}) => (
      <img
        src={value?.url}
        alt={value?.alt || "Case Study Image"}
        className="rounded-lg my-6"
      />
    ),
  },
  block: {
    h2: ({children}) => (
      <h2 className="text-2xl font-semibold mt-6 mb-2">{children}</h2>
    ),
    h3: ({children}) => (
      <h3 className="text-xl font-semibold mt-4 mb-2">{children}</h3>
    ),
    normal: ({children}) => (
      <p className="mt-2 leading-relaxed text-gray-700">{children}</p>
    ),
  },
  list: {
    bullet: ({children}) => (
      <ul className="list-disc list-inside space-y-1 mt-2">{children}</ul>
    ),
    number: ({children}) => (
      <ol className="list-decimal list-inside space-y-1 mt-2">{children}</ol>
    ),
  },
  marks: {
    strong: ({children}) => <strong className="font-bold">{children}</strong>,
    em: ({children}) => <em className="italic">{children}</em>,
    link: ({value, children}) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        {children}
      </a>
    ),
  },
};
 
export async function loader({params, context}: LoaderFunctionArgs) {
  const {slug} = params;
 
  const caseStudy = await context.sanity.query({
    query: `*[_type == "caseStudy" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      date,
      heroImage {
        alt,
        "url": asset->url
      },
      cta {
        text,
        file {
          asset->{
            url
          }
        }
      },
      content[]{
        ...,
        _type == "image" => {
          ...,
          "url": asset->url
        }
      },
      byTheNumbers {
        heading,
        stats[] {
          value,
          label
        }
      },
      testimonial {
        quote,
        author
      },
      relatedCaseStudies[]-> {
        _id,
        title,
        "slug": slug.current
      },
        virtualMailSection {
        heading,
        buttonText,
        buttonUrl
      }
    }`,
    params: { slug },
  });
  return json({ caseStudy });
}
 
export default function CaseStudyPage() {
  const {caseStudy} = useLoaderData<typeof loader>();
 
  if (!caseStudy) {
    return (
      <div className="px-5 py-10 max-w-[1240px] mx-auto">
        <h1 className="text-2xl font-bold">Case Study not found</h1>
      </div>
    );
  }
 
  return (
    <div>
    <div className="px-5 py-[40px] md:py-[54px] bg-[#F9F9F9]">
      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row gap-[44px] lg:gap-[62px] items-center">
        {/* Breadcrumbs */}
        <div className="w-full md:w-[48.1%]">            
            <nav className="flex items-center flex-row gap-[7px] mb-5" aria-label="Breadcrumb">
              <ol className="flex items-center flex-row gap-[7px]">
                <li><Link to={`/case-studies`}><span className="font-Roboto text-LightGray font-normal leading-[14px] md:leading-[14px] text-[14px] md:text-[14px] tracking-[0.07px]">Case Studies</span> </Link></li>
                <li> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10.6813 7.71732C10.8362 7.87232 10.8362 8.12732 10.6813 8.28232L6.68125 12.2823C6.52625 12.4373 6.27125 12.4373 6.11625 12.2823C5.96125 12.1273 5.96125 11.8723 6.11625 11.7173L9.83375 7.99982L6.11625 4.28232C5.96125 4.12732 5.96125 3.87232 6.11625 3.71732C6.27125 3.56232 6.52625 3.56232 6.68125 3.71732L10.6813 7.71732Z" fill="#091019"/>
                  </svg></li>
                <li> <span aria-current="page" className="font-Roboto text-PrimaryBlack font-normal leading-[14px] md:leading-[14px] text-[14px] md:text-[14px] tracking-[0.07px]">Case Study Detail</span> </li>
              </ol>  
            </nav>
            <div>
              <h1 className="max-w-[464px] mb-5 font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[24px] md:text-[36px] tracking-[-0.36px] md:tracking-[-0.54px]">
                {caseStudy?.title ?? "Untitled Case Study"}
              </h1>
              <p className="flex items-center gap-1 font-Roboto text-LightGray font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M7.80156 2.3999C8.13156 2.3999 8.40156 2.6699 8.40156 2.9999V4.7999H15.6016V2.9999C15.6016 2.6699 15.8716 2.3999 16.2016 2.3999C16.5316 2.3999 16.8016 2.6699 16.8016 2.9999V4.7999H18.0016C19.3253 4.7999 20.4016 5.87615 20.4016 7.1999V17.9999C20.4016 19.3237 19.3253 20.3999 18.0016 20.3999H6.00156C4.67781 20.3999 3.60156 19.3237 3.60156 17.9999V7.1999C3.60156 5.87615 4.67781 4.7999 6.00156 4.7999H7.20156V2.9999C7.20156 2.6699 7.47156 2.3999 7.80156 2.3999ZM18.0016 5.9999H6.00156C5.33781 5.9999 4.80156 6.53615 4.80156 7.1999V8.3999H19.2016V7.1999C19.2016 6.53615 18.6653 5.9999 18.0016 5.9999ZM19.2016 9.5999H4.80156V17.9999C4.80156 18.6637 5.33781 19.1999 6.00156 19.1999H18.0016C18.6653 19.1999 19.2016 18.6637 19.2016 17.9999V9.5999Z" fill="#4D4E4F"/>
                </svg>
                {new Date(caseStudy.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
 
              {caseStudy?.cta?.text && caseStudy?.cta?.file?.asset?.url && (
                <a
                  href={caseStudy.cta.file.asset.url}
                  download
                  className="mt-5 flex items-center justify-center bg-DarkOrange text-white font-normal font-Roboto leading-[16px] text-[16px] tracking-[0.08px] py-[12px]  px-4 rounded-full w-[193px] h-[52px]"
                >
                  {caseStudy.cta.text}
                </a>
              )}
            </div>
        </div>
      {/* Header */}
      <div className="w-full md:w-[51.9%] relative">
        
 
        {/* Hero Image */}
        {caseStudy?.heroImage?.url && (
          <img
            src={caseStudy.heroImage.url}
            alt={
              caseStudy.heroImage?.alt ??
              caseStudy?.title ??
              "Case Study Image"
            }
            className="rounded-[20px] w-full h-auto md:h-[400px] object-cover"
          />
        )}
      </div>
      </div>
      </div>
 
      {/* Content + Sidebar */}
      <div className="px-5 pt-[40px] md:pt-[40px] pb-10 md:pb-[60px] lg:pb-[100px] bg-white">
      <div className="max-w-[1240px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-11">
        {/* Left: Content */}
        <div className="w-full lg:w-[67.2%] prose max-w-none case-study-content order-2 md:order-1">
          {caseStudy?.content && (
            <PortableText value={caseStudy.content} components={components} />
          )}
        </div>
 
        {/* Right: Sidebar */}
        <div className="w-full lg:w-[32.8%] xl:min-w-[436px] xl:mr-[-44px] md:sticky md:top-0 h-fit z-10 order-1 md:order-2">
          {/* By The Numbers */}
          {caseStudy?.byTheNumbers?.stats?.length > 0 && (
            <div className="border border-[#F6F6F6] rounded-[20px] p-6 md:p-6 bg-[#F6F6F6] flex flex-col gap-6 md:gap-8">
              <h3 className="line-clamp-2 font-Roboto text-PrimaryBlack font-semibold leading-[28px] md:leading-[31.2px] text-[20px] md:text-[24px] tracking-[-0.3px] md:tracking-[-0.36px]">
                {caseStudy.byTheNumbers.heading || "By The Numbers"}
              </h3>
              <div className="space-y-3">
                {caseStudy.byTheNumbers.stats.map(
                  (stat: {value: string; label: string}, idx: number) => (
                    <div
                      key={idx}
                      className="p-6 bg-white rounded-[12px] border border-LightWhite flex flex-col gap-2 "
                    >
                      <p className="font-Roboto text-PrimaryBlack font-semibold leading-[38.4px] md:leading-[38.4px] text-[32px] md:text-[32px] tracking-[-0.48px] md:tracking-[-0.48px]">{stat?.value ?? "-"}</p>
                      <p className="font-Roboto text-LightGray font-medium leading-[27px] md:leading-[27px] text-[18px] md:text-[18px] tracking-[0px]">{stat?.label ?? "-"}</p>
                    </div>
                  )
                )}
              </div>
               {/* Testimonial */}
                  {caseStudy?.testimonial && (
                    <div className="bg-DarkOrange p-6 rounded-[24px] border border-LightWhite flex flex-col gap-6">
                      <p className="font-Roboto text-white font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px] md:tracking-[0px]">“{caseStudy.testimonial?.quote ?? ""}”</p>
                      <p className="font-Roboto text-white font-medium leading-[27px] md:leading-[27px] text-[18px] md:text-[18px] tracking-[0px] md:tracking-[0px]">
                        {caseStudy.testimonial?.author ?? "Anonymous"}
                      </p>
                    </div>
                  )}
 
 
            </div>
          )}
 
         
          {/* Related Case Studies */}
          {caseStudy?.relatedCaseStudies?.length > 0 && (
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">
                Related Case Study
              </h3>
              <ul className="space-y-2">
                {caseStudy.relatedCaseStudies.map((related: any) => (
                  <li key={related?._id}>
                    <a
                      href={`/case-studies/${related?.slug ?? ""}`}
                      className="text-blue-600 underline text-sm"
                    >
                      {related?.title ?? "Untitled"}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      </div>
      </div>
      {caseStudy?.virtualMailSection && (
        <div className="bg-DarkOrange py-[40px] md:py-[60px] lg:py-[80px] px-5">
           <div className="max-w-[1240px] mx-auto flex flex-col gap-8 items-center ">
              <h2 className="max-w-[856px] mx-auto text-center font-Roboto text-white font-semibold leading-[38.4px] md:leading-[61.6px] text-[32px] md:text-[56px] tracking-[-0.48px] md:tracking-[-1.12px]">
                {caseStudy.virtualMailSection.heading}
              </h2>
              {caseStudy.virtualMailSection?.buttonText && (
                <a
                  href={caseStudy.virtualMailSection?.buttonUrl ?? "#"}
                  className="flex items-center justify-center bg-white text-PrimaryBlack font-normal font-Roboto leading-[16px] text-[16px] tracking-[0.08px] py-[12px]  px-4 rounded-full w-[193px] h-[52px]"
                >
                  {caseStudy.virtualMailSection.buttonText}
                </a>
              )}
            </div>
        </div>
      )}
    
    </div>
  );
}
 