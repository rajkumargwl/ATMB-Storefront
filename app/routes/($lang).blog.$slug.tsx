import { json, type LoaderFunctionArgs } from "@shopify/remix-oxygen";
import { useLoaderData } from "@remix-run/react";
import { notFound } from "~/lib/utils";
import { WPPost } from "../../shopify-hydrogen/schemaTypes/wpPost";

export async function loader({ context, params }: LoaderFunctionArgs) {
  const { slug } = params;
  if (!slug) throw notFound();

  const post = await context.sanity.query<WPPost>({
    query: `*[_type == "wpPost" && slug.current == $slug][0]{
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
    params: { slug },
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

  return json({ post, relatedPosts });
}

function stripHtml(html: string) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "");
}

// To render author + date 
const renderAuthorDate = (author: string | undefined, date: string | undefined) => (
  <p className="flex gap-4 mb-4 text-gray-500 text-sm">
    {/* Author */}
    <span className="flex items-center gap-1">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 21" fill="none">
        <path
          d="M14.8781 15.5188C14.4406 13.7844 12.8719 12.5 11 12.5H9C7.12813 12.5 5.55937 13.7844 5.12187 15.5188C3.8125 14.2469 3 12.4688 3 10.5C3 6.63438 6.13438 3.5 10 3.5C13.8656 3.5 17 6.63438 17 10.5C17 12.4688 16.1875 14.2469 14.8781 15.5188ZM13.9875 16.25C12.8594 17.0375 11.4812 17.5 10 17.5C8.51875 17.5 7.14062 17.0375 6.00938 16.2531C6.13438 14.7125 7.425 13.5 9 13.5H11C12.575 13.5 13.8625 14.7125 13.9906 16.2531L13.9875 16.25ZM10 18.5C14.4187 18.5 18 14.9187 18 10.5C18 6.08125 14.4187 2.5 10 2.5C5.58125 2.5 2 6.08125 2 10.5C2 14.9187 5.58125 18.5 10 18.5ZM10 10C9.17188 10 8.5 9.32812 8.5 8.5C8.5 7.67188 9.17188 7 10 7C10.8281 7 11.5 7.67188 11.5 8.5C11.5 9.32812 10.8281 10 10 10Z"
          fill="#4D4E4F"
        />
      </svg>
      {author || "Unknown"}
    </span>

    {/* Date */}
    <span className="flex items-center gap-1">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 21" fill="none">
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
  const { post, relatedPosts } = useLoaderData<typeof loader>();
  const [featured, ...others] = relatedPosts || [];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Main Post */}
      {renderAuthorDate(post.authorName, post.date)}
      <h1 className="text-4xl font-bold mb-2">{post.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Blog Content */}
        <div className="md:col-span-2">
          {post.mainImage && (
            <img src={post.mainImage} alt={post.title} className="w-full h-auto object-cover mb-6 rounded-md" />
          )}
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Featured Related Post */}
        {featured && (
          <aside className="border rounded-lg p-4 bg-gray-50 h-fit">
            {featured.mainImage && <img src={featured.mainImage} alt={featured.title} className="mb-3 rounded-md" />}
            {renderAuthorDate(featured.authorName, featured.date)}
            <a href={`/blog/${featured.slug.current}`}>
              <h3 className="text-lg font-semibold">{featured.title}</h3>
            </a>
          </aside>
        )}
      </div>

      {/* Other Related Posts */}
      {others.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {others.map((rp) => (
              <li key={rp._id} className="border rounded-lg p-4">
                {rp.mainImage && <img src={rp.mainImage} alt={rp.title} className="mb-2 rounded-md" />}
                {renderAuthorDate(rp.authorName, rp.date)}
                <a href={`/blog/${rp.slug.current}`}>
                  <h3 className="text-lg font-semibold">{rp.title}</h3>
                </a>
                <p className="line-clamp-2 mt-3 font-Roboto text-LightGray font-normal leading-[21px] md:leading-[27px] text-[14px] md:text-[18px] tracking-[0px]">
                  {rp.content ? stripHtml(rp.content).slice(0, 120) : ""}...
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
