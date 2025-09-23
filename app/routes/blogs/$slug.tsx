'use client';

import { useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/node';

const blogs = [
  { slug: 'myfirst', title: 'My First Blog', content: 'This is the first blog post content.' },
  { slug: 'second-post', title: 'Second Post', content: 'This is the second blog post content.' },
  { slug: 'remix-tips', title: 'Top Remix Tips', content: 'Some useful Remix tips and tricks.' },
];

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    throw new Response('Not Found', { status: 404 });
  }

  return blog;
};

export default function BlogPost() {
  const blog = useLoaderData<typeof loader>();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{blog.title}</h1>
      <p className="mt-2">{blog.content}</p>
    </div>
  );
}
