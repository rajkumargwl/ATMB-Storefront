import {
  isRouteErrorResponse,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useMatches,
  useRouteError,
} from '@remix-run/react';
import {
  Seo,
  type SeoHandleFunction,
  ShopifySalesChannel,
  useNonce,
} from '@shopify/hydrogen';
import type {Collection, Shop} from '@shopify/hydrogen/storefront-api-types';
import {
  defer,
  type LinksFunction,
  type LoaderFunctionArgs,
  type MetaFunction,
  type SerializeFrom,
} from '@shopify/remix-oxygen';
import {getPreview, PreviewProvider} from 'hydrogen-sanity';
 
import {GenericError} from '~/components/global/GenericError';
import {Layout} from '~/components/global/Layout';
import {NotFound} from '~/components/global/NotFound';
import {PreviewLoading} from '~/components/global/PreviewLoading';
import {useAnalytics} from '~/hooks/useAnalytics';
import {DEFAULT_LOCALE} from '~/lib/utils';
import {LAYOUT_QUERY} from '~/queries/sanity/layout';
import {COLLECTION_QUERY_ID} from '~/queries/shopify/collection';
import stylesheet from '~/styles/tailwind.css';
import type {I18nLocale} from '~/types/shopify';
import {SanityLayout} from './lib/sanity';
import swiperStyles from 'swiper/css?url';
import swiperNavStyles from 'swiper/css/navigation?url';
import Header from '~/components/global/Header';
import Footer from '~/components/global/Footer';
import {HEADER_QUERY} from '~/queries/sanity/header';
import {FOOTER_QUERY} from '~/queries/sanity/footer';
const seo: SeoHandleFunction<typeof loader> = ({data}) => ({
  title: data?.layout?.seo?.title,
  titleTemplate: `%s${
    data?.layout?.seo?.title ? ` · ${data?.layout?.seo?.title}` : ''
  }`,
  description: data?.layout?.seo?.description,
});
 
export const handle = {
  seo,
};
 
export const meta: MetaFunction = () => [
  {
    name: 'viewport',
    content: 'width=device-width,initial-scale=1',
  },
];
 
export const links: LinksFunction = () => {
  return [
    {rel: 'stylesheet', href: stylesheet},
    {
      href: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,500;0,700;1,500;1,700&display=swap',
      rel: 'stylesheet',
    },
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
      crossOrigin: 'anonymous',
    },
    {rel: 'stylesheet', href: swiperStyles},
    {rel: 'stylesheet', href: swiperNavStyles},
  ];
};
export async function loader({request, context}: LoaderFunctionArgs) {
  const {cart} = context;
  const customerAccessToken = await context.session.get('customerAccessToken');
  let customer;
  if (customerAccessToken) {
    try {
      customer = await context.storefront.query<{
        customer: { id: string };
      }>(
        `#graphql
          query customer($customerAccessToken: String!) {
            customer(customerAccessToken: $customerAccessToken) {
              id
              firstName
              lastName
              email
            }
          }
        `,
        {
          variables: {
            customerAccessToken,
          },
        }
      );
  
      // If the token is invalid, remove it from the session
      // if (!customer) {
      //   context.session.unset('customerAccessToken');
      // }
    } catch (error) {
      console.error("Error fetching customer:", error);
    }
  }
 
  const isAuthenticated = Boolean(customerAccessToken);

  const cache = context.storefront.CacheCustom({
    mode: 'public',
    maxAge: 60,
    staleWhileRevalidate: 60,
  });
 
  const preview = getPreview(context);
 
  const [shop, layout] = await Promise.all([
    context.storefront.query<{shop: Shop}>(SHOP_QUERY),
    context.sanity.query<SanityLayout>({query: LAYOUT_QUERY, cache}),
  ]);
  const [header, footer] = await Promise.all([
    context.sanity.query({query: HEADER_QUERY, cache}),
    context.sanity.query({query: FOOTER_QUERY, cache}),
  ]);

  // 🔹 Handle search param
  const url = new URL(request.url);
  const q = url.searchParams.get('q') || '';

  let mergedResults: any[] = [];
  if (q) {
    try {
      const searchParam = `${q}*`;
      const results = await context.sanity.query({
        query: `{
          "locations": *[_type == "location" && (
            name match $search ||
            city match $search ||
            postalCode match $search
          )][0...5]{
            _id,
            _type,
            name,
            city,
            postalCode,
            "slug": slug.current
          },
          "products": *[_type == "product" && (
            title match $search ||
            description match $search ||
            store.title match $search
          )][0...5]{
            _id,
            _type,
            "title": store.title,
            "handle": select(store.slug.current != null => store.slug.current, "")
          }
        }`,
        params: {search: searchParam},
      });
      mergedResults = [
        ...(results.locations || []).map((item: any) => ({
          ...item,
          type: 'location',
        })),
        ...(results.products || []).map((item: any) => ({
          ...item,
          type: 'product',
        })),
      ];
    } catch (err) {
      console.error('Search error:', err);
    }
  }
  const selectedLocale = context.storefront.i18n as I18nLocale;
 
  return defer({
    preview,
    analytics: {
      shopifySalesChannel: ShopifySalesChannel.hydrogen,
      shopId: shop.shop.id,
    },
    cart: cart.get(),
    layout,
    notFoundCollection: layout?.notFoundPage?.collectionGid
      ? context.storefront.query<{collection: Collection}>(
          COLLECTION_QUERY_ID,
          {
            variables: {
              id: layout.notFoundPage.collectionGid,
              count: 16,
            },
          },
        )
      : undefined,
    sanityProjectID: context.env.SANITY_PROJECT_ID,
    sanityDataset: context.env.SANITY_DATASET,
    selectedLocale,
    storeDomain: context.storefront.getShopifyDomain(),
    header,
    footer,
    q,
    searchResults: mergedResults,
    customer: customer ? customer.customer : null,
    customerAccessToken,
    isLoggedIn: isAuthenticated,
  });
}
 
export const useRootLoaderData = () => {
  const [root] = useMatches();
  return root?.data as SerializeFrom<typeof loader>;
};
 
export default function App() {
  const {preview, header, footer, q, searchResults, ...data} =
    useLoaderData<SerializeFrom<typeof loader>>();
  const locale = data.selectedLocale ?? DEFAULT_LOCALE;
  const hasUserConsent = true;
  const nonce = useNonce();
 
  useAnalytics(hasUserConsent);
 
  return (
    <html lang={locale.language}>
      <head>
        <meta charSet="utf-8" />
        <Seo />
        <Meta />
        <Links />
        <script src="//in.fw-cdn.com/32520975/1392281.js" chat="true"></script>
      </head>
      <body>
        <PreviewProvider previewConfig={preview} fallback={<PreviewLoading />}>
          {/* 🔹 Global Header with search support */}
          <Header data={header} searchQuery={q} searchResults={searchResults} />

          <Layout key={`${locale.language}-${locale.country}`}>
            <Outlet />
          </Layout>

          {/* 🔹 Global Footer */}
          <Footer data={footer} />
        </PreviewProvider>
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
        <LiveReload nonce={nonce} />
      </body>
    </html>
  );
}
 
export function ErrorBoundary({error}: {error: Error}) {
  const nonce = useNonce();
 
  const routeError = useRouteError();
  const isRouteError = isRouteErrorResponse(routeError);
 
  const rootData = useRootLoaderData();
 
  const {
    selectedLocale: locale,
    layout,
    notFoundCollection,
  } = rootData
    ? rootData
    : {
        selectedLocale: DEFAULT_LOCALE,
        layout: null,
        notFoundCollection: undefined,
      };
  const {notFoundPage} = layout || {};
 
  let title = 'Error';
  if (isRouteError) {
    title = 'Not found';
  }
 
  return (
    <html lang={locale.language}>
      <head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout
          key={`${locale.language}-${locale.country}`}
          backgroundColor={notFoundPage?.colorTheme?.background}
        >
          {isRouteError ? (
            <>
              {routeError.status === 404 ? (
                <NotFound
                  notFoundPage={notFoundPage}
                  notFoundCollection={notFoundCollection}
                />
              ) : (
                <GenericError
                  error={{message: `${routeError.status} ${routeError.data}`}}
                />
              )}
            </>
          ) : (
            <GenericError error={error instanceof Error ? error : undefined} />
          )}
        </Layout>
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
        <LiveReload nonce={nonce} />
      </body>
    </html>
  );
}
 
const SHOP_QUERY = `#graphql
  query layout {
    shop {
      id
      name
      description
    }
  }
`;