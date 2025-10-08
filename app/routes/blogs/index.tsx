// app/routes/blogs/index.tsx
import {json, type LoaderFunctionArgs, defer} from '@shopify/remix-oxygen';
import {useLoaderData, useFetcher} from '@remix-run/react';
import {notFound} from '~/lib/utils';
import {WPPost} from '../../../shopify-hydrogen/schemaTypes/wpPost';
import {useState,useEffect} from 'react';

const PAGE_SIZE = 12;

export async function loader({context, request}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const offset = Number(url.searchParams.get('offset') || 0);

  const posts: WPPost[] = await context.sanity.query({
    query: `*[_type == "wpPost"] | order(date desc) [${offset}...${offset + PAGE_SIZE}] {
      _id,
      title,
      slug,
      content,
      date,
      "mainImage": mainImage.asset->url,
      "author": author->name, 
      link
    }`,
  });

  if (!posts) throw notFound();

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
    fetcher.load(`/blogs?offset=${offset + PAGE_SIZE}`);
  };

  useEffect(() => {
    if (fetcher.data?.posts) {
      setPosts((prev) => [...prev, ...fetcher.data.posts]);
      setOffset((prev) => prev + PAGE_SIZE);
      setLoading(false);
      console.log("offset", offset, "posts", posts.length,'page size', PAGE_SIZE);
    }
  }, [fetcher.data]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post._id} className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            {post.mainImage && <img src={post.mainImage} alt={post.title} className="w-full h-48 object-cover"/>}
            {/* <div className="p-4">
              <a href={`/blogs/${post.slug.current}`}>
                <h2 className="font-semibold text-lg mb-2">{post.title}</h2>
              </a>
              <p className="text-gray-600 text-sm">{post.content.slice(0, 120)}...</p>
            </div> */}
            <div className="p-4">
            
            <p className="text-gray-500 text-sm mb-2">
              By {post.author || 'Unknown'} | {new Date(post.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>

            <a href={`/blogs/${post.slug.current}`}>
              <h2 className="font-semibold text-lg mb-1">{post.title}</h2>
            </a>
            <p className="text-gray-600 text-sm">{post.content.slice(0, 120)}...</p>
          </div>

          </div>
        ))}
      </div>

      {posts.length % PAGE_SIZE === 0 && (
        <div className="text-center mt-8">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}


