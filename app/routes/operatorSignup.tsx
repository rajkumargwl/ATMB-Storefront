import { Await, useLoaderData, useRouteError, isRouteErrorResponse } from '@remix-run/react';
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

import ModuleGrid from '~/components/modules/ModuleGrid';
import { fetchGids, notFound, validateLocale } from '~/lib/utils';
import { OPERATOR_SIGNUP_PAGE } from '~/queries/sanity/fragments/pages/operatorsignupPage';

const seo: SeoHandleFunction<typeof loader> = ({ data }) => ({
  title: data?.page?.seo?.title || 'Operator Signup - Anytime Mailbox',
  description:
    data?.page?.seo?.description ||
    'Become an Anytime Mailbox operator and grow your business with virtual mailbox services.',
});

export const handle = { seo };

export async function loader({ context, params }: LoaderFunctionArgs) {
  validateLocale({ context, params });

  try {
    const page = await context.sanity.query({
      query: OPERATOR_SIGNUP_PAGE,
    });

  
    if (!page) {
      console.log('❌ Page not found');
      throw notFound();
    }
    // console.log(JSON.stringify(page , null ,2));

    // Fix: Type assertion for fetchGids
    const gids = fetchGids({ page, context });

    return defer({
      page,
      gids,
      analytics: { pageType: AnalyticsPageType.page },
    });
  } catch (error) {
    console.error('❌ Loader error:', error);
    throw error;
  }
}

export default function OperatorSignup() {
  const { page, gids } = useLoaderData<typeof loader>();

 

  return (
    <SanityPreview data={page} query={OPERATOR_SIGNUP_PAGE}>
      {(page: any) => (
        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={gids}>
            {(resolvedGids) => {
             
              
              if (!page?.modules || page.modules.length === 0) {
                return (
                  <div className="p-8 text-center">
                    <h2>No modules found</h2>
                    <p>Please add modules to this page in Sanity Studio.</p>
                  </div>
                );
              }

              return (
                <div className={clsx('mb-0 mt-0 px-0', 'md:px-0')}>
                  {/* 👇 YEH LINE FIX KARO - pageType prop add karo */}
                  <ModuleGrid 
                    items={page.modules} 
                    pageType="operator"  // 👈 IMPORTANT: Yeh add karo
                  />
                </div>
              );
            }}
          </Await>
        </Suspense>
      )}
    </SanityPreview>
  );
}

// Error boundary
export function ErrorBoundary() {
  const error = useRouteError();
  
  console.error('❌ OperatorSignup Error Boundary:', error);

  if (isRouteErrorResponse(error)) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Error {error.status}</h1>
        <p className="text-gray-600">{error.data}</p>
      </div>
    );
  }

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Unexpected Error</h1>
      <p className="text-red-600 mb-4">
        {error instanceof Error ? error.message : 'Unknown error occurred'}
      </p>
      {error instanceof Error && (
        <pre className="bg-gray-100 p-4 rounded text-left text-sm overflow-auto">
          {error.stack}
        </pre>
      )}
    </div>
  );
}