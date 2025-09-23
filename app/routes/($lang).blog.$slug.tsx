import { json, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData } from '@remix-run/react';
import { notFound } from '~/lib/utils';
import { WPPost } from '../../shopify-hydrogen/schemaTypes/wpPost';

export async function loader({ context, params }: LoaderFunctionArgs) {
  const { slug } = params;
  if (!slug) throw notFound();

  const [post] = await context.sanity.query<WPPost[]>({
    query: `*[_type == "wpPost" && slug.current == $slug]{
      _id,
      title,
      slug,
      content,
      date,
      "mainImage": mainImage.asset->url,
      authorName,
      link
    }`,
    params: { slug },
  });

  if (!post) throw notFound();

  return json({ post });
}

export default function BlogPost() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-2">{post.title}</h1>

      {/* Author and Date */}
      <p className="text-gray-700 mb-6 font-semibold">
        By {post.authorName || 'Unknown'} |{' '}
        {new Date(post.date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}
      </p>

      {/* Main Image */}
      {post.mainImage && (
        <img
          src={post.mainImage}
          alt={post.title}
          className="w-full h-auto object-cover mb-6 rounded-md"
        />
      )}

      {/* Content */}
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}

