import { useLoaderData, Link } from '@remix-run/react';
import {
  defer,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import { validateLocale } from '~/lib/utils';

// -----------------
// SEO (optional)
// -----------------
export const handle = {
  seo: ({ data }) => ({
    title: data?.authorData?.name
      ? `${data.authorData.name} - Anytime Mailbox`
      : 'Author - Anytime Mailbox',
    description:
      data?.authorData?.bio ||
      'Explore exciting career opportunities at Anytime Mailbox and grow with us.',
  }),
};

// -----------------
// Loader
// -----------------
export async function loader({ context, params }: LoaderFunctionArgs) {
  validateLocale({ context, params });

  let language = params.lang || 'en';
  if (language !== 'en-es') language = 'en';

  return defer({
    authorData: {
      name: 'Sabrina Jeongco',
      bio: 'A passionate writer exploring virtual mail trends.',
      image: { url: 'https://placekitten.com/300/300' },
    },
  });
}
