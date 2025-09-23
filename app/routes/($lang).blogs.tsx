
import {json, type LoaderFunctionArgs, defer} from '@shopify/remix-oxygen';
import {useLoaderData, useFetcher} from '@remix-run/react';
import {notFound} from '~/lib/utils';
import {WPPost} from '../../shopify-hydrogen/schemaTypes/wpPost';
import {useState, useEffect} from 'react';

const FIRST_PAGE_SIZE = 11;
const NEXT_PAGE_SIZE = 12;

export async function loader({context, request}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const offset = Number(url.searchParams.get('offset') || 0);
  const pageSize = offset === 0 ? FIRST_PAGE_SIZE : NEXT_PAGE_SIZE;

  const posts: WPPost[] = await context.sanity.query({
    query: `*[_type == "wpPost"] | order(date desc) [${offset}...${offset + pageSize}] {
      _id,
      title,
      slug,
      content,
      date,
      "mainImage": mainImage.asset->url,
      authorName,
      link
    }`,
  });

  if (!posts) throw notFound();
  
  // const slugData = await context.sanity.query({
  //   query: `*[_type == "wpPost"]{slug}`
  // });
  // console.log('All slugs in Sanity:', slugData);
  
  
  return defer({posts, offset});
}

export default function BlogIndex() {
  const {posts: initialPosts, offset: initialOffset} = useLoaderData<typeof loader>();
  const [posts, setPosts] = useState<WPPost[]>(initialPosts);
  const [offset, setOffset] = useState(initialOffset);
  const [loading, setLoading] = useState(false);

  const fetcher = useFetcher();

  const loadMore = () => {
    setLoading(true);
    const currentPageSize = offset === 0 ? FIRST_PAGE_SIZE : NEXT_PAGE_SIZE;
    const nextOffset = offset + currentPageSize;
    fetcher.load(`/blogs?offset=${nextOffset}`);
  };

  useEffect(() => {
    if (fetcher.data?.posts) {
      const currentPageSize = offset === 0 ? FIRST_PAGE_SIZE : NEXT_PAGE_SIZE;
      setPosts((prev) => [...prev, ...fetcher.data.posts]);
      setOffset((prev) => prev + currentPageSize);
      setLoading(false);
    }
  }, [fetcher.data]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Featured Blogs</h1>

      {/* First row: only first 2 posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        {posts.slice(0, 2).map((post) => (
          <div key={post._id} className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            {post.mainImage && <img src={post.mainImage} alt={post.title} className="w-full h-48 object-cover"/>}
            <div className="p-4">
              <p className="text-gray-500 text-sm mb-2">
                By {post.authorName || 'Unknown'} | {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
              <a href={`/blog/${post.slug.current}`}>
                <h2 className="font-semibold text-lg mb-1">{post.title}</h2>
              </a>
              <p className="text-gray-600 text-sm">{post.content.slice(0, 120)}...</p>
            </div>
          </div>
        ))}
      </div>

      {/* Rest of posts: 3 per row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.slice(2).map((post) => (
          <div key={post._id} className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            {post.mainImage && <img src={post.mainImage} alt={post.title} className="w-full h-48 object-cover"/>}
            <div className="p-4">
              <p className="text-gray-500 text-sm mb-2">
                By {post.author || 'Unknown'} | {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
              <a href={`/blog/${post.slug.current}`}>
                <h2 className="font-semibold text-lg mb-1">{post.title}</h2>
              </a>
              <p className="text-gray-600 text-sm">{post.content.slice(0, 120)}...</p>
            </div>
          </div>
        ))}
      </div>

      {/* Load more button */}
      <div className="text-center mt-8">
        <button
          onClick={loadMore}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
}
