import { Await, useLoaderData } from '@remix-run/react';
import {
  AnalyticsPageType,
  type SeoHandleFunction,
} from '@shopify/hydrogen';
import {
  defer,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import clsx from 'clsx';
import { SanityPreview } from 'hydrogen-sanity';
import { Suspense } from 'react';
import RightArrowWhite from '~/components/icons/RightArrowWhite';
import SearchIconBanner from '~/components/icons/SearchIconBanner';
import ArrowRightCountries from "~/components/icons/ArrowRightCountries";
import ModuleGrid from '~/components/modules/ModuleGrid';
import { fetchGids, notFound, validateLocale } from '~/lib/utils';

// 👇 import your FAQ Page query
import { FAQ_MAILBOX_RENTER_PAGE } from '~/queries/sanity/fragments/pages/faqmailboxrenter';

// -----------------
// SEO
// -----------------
const seo: SeoHandleFunction = ({ data }) => ({
//   title: data?.page?.seo?.title || 'Countries',
title: 'Countries',
  description:
    data?.page?.seo?.description ||
    'Find answers to common questions about Anytime Mailbox services.',
});
export const handle = { seo };

// -----------------
// Loader
// -----------------
export async function loader({ context, params }: LoaderFunctionArgs) {
  validateLocale({ context, params });

  const page = await context.sanity.query({
    query: FAQ_MAILBOX_RENTER_PAGE,
  });

  if (!page) throw notFound();
 
  const gids = fetchGids({ page, context });

  return defer({
    page,
    gids,
    analytics: { pageType: AnalyticsPageType.page },
  });
}

// -----------------
// Component
// -----------------
export default function FAQ() {
  const { page, gids } = useLoaderData<typeof loader>();

  return (
    <>


    </>
  );
}
