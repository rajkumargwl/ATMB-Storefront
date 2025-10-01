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
      // 🟠 Virtual Mail Section
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
  console.log(JSON.stringify(caseStudy.virtualMailSection, null, 2));
  if (!caseStudy) {
    return (
      <div className="px-5 py-10 max-w-[1240px] mx-auto">
        <h1 className="text-2xl font-bold">Case Study not found</h1>
      </div>
    );
  }

  return (
    <div className="px-5 py-10 max-w-[1240px] mx-auto">
        {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-6">
        <ol className="flex items-center space-x-2">
          <li>
            
            <Link to="/case-studies" className="hover:underline">
              Case Studies
            </Link>
          </li>
          <li className="text-gray-400">›</li>
          <li className="text-gray-700 font-medium">
            Case Study Detail
          </li>
        </ol>
      </nav>
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {caseStudy?.title ?? "Untitled Case Study"}
          </h1>
          <p className="text-gray-500 text-sm mb-4">
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
              className="px-5 py-2 bg-orange-500 text-white rounded-full text-sm font-medium"
            >
              {caseStudy.cta.text}
            </a>
          )}
        </div>

        {/* Hero Image */}
        {caseStudy?.heroImage?.url && (
          <img
            src={caseStudy.heroImage.url}
            alt={
              caseStudy.heroImage?.alt ??
              caseStudy?.title ??
              "Case Study Image"
            }
            className="w-full rounded-lg"
          />
        )}
      </div>

      {/* Content + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
        {/* Left: Content */}
        <div className="lg:col-span-2 prose max-w-none">
          {caseStudy?.content && (
            <PortableText value={caseStudy.content} components={components} />
          )}
        </div>

        {/* Right: Sidebar */}
        <div className="space-y-6">
          {/* By The Numbers */}
          {caseStudy?.byTheNumbers?.stats?.length > 0 && (
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">
                {caseStudy.byTheNumbers.heading || "By The Numbers"}
              </h3>
              <div className="space-y-3">
                {caseStudy.byTheNumbers.stats.map(
                  (stat: {value: string; label: string}, idx: number) => (
                    <div
                      key={idx}
                      className="p-3 bg-white rounded-md border text-center"
                    >
                      <p className="font-bold text-xl">{stat?.value ?? "-"}</p>
                      <p className="text-gray-600 text-sm">{stat?.label ?? "-"}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Testimonial */}
          {caseStudy?.testimonial && (
            <div className="bg-orange-100 p-5 rounded-lg italic text-gray-800">
              <p className="mb-2">“{caseStudy.testimonial?.quote ?? ""}”</p>
              <p className="mt-2 font-semibold text-right not-italic">
                {caseStudy.testimonial?.author ?? "Anonymous"}
              </p>
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
      {caseStudy?.virtualMailSection && (
        <div className="mt-16 bg-orange-500 text-center text-white rounded-lg py-12 px-6">
          <h2 className="text-2xl font-bold mb-6">
            {caseStudy.virtualMailSection.heading}
          </h2>
          {caseStudy.virtualMailSection?.buttonText && (
            <a
              href={caseStudy.virtualMailSection?.buttonUrl ?? "#"}
              className="inline-block bg-white text-black px-6 py-3 rounded-full font-medium shadow hover:opacity-90"
            >
              {caseStudy.virtualMailSection.buttonText}
            </a>
          )}
        </div>
      )}
    </div>
  );
}