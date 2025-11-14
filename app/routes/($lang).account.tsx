import {
  Form,
  Outlet,
  useLoaderData,
  useMatches,
  useOutlet,
} from '@remix-run/react';
import type {SeoHandleFunction} from '@shopify/hydrogen';
import {flattenConnection} from '@shopify/hydrogen';
import type {
  Customer,
  MailingAddress,
  Order,
} from '@shopify/hydrogen/storefront-api-types';
import {
  type AppLoadContext,
  defer,
  json,
  type LoaderFunctionArgs,
  redirect,
} from '@shopify/remix-oxygen';
import clsx from 'clsx';
import {ReactNode} from 'react';

import {AccountAddressBook} from '~/components/account/AccountAddressBook';
import {AccountDetails} from '~/components/account/AccountDetails';
import {Modal} from '~/components/account/Modal';
import AccountOrderHistory from '~/components/account/OrderHistory';
import Button from '~/components/elements/Button';
import {CACHE_NONE, routeHeaders} from '~/data/cache';
import {usePrefixPathWithLocale} from '~/lib/utils';

import {doLogout} from './($lang).account.logout';

// Combining json + Response + defer in a loader breaks the
// types returned by useLoaderData. This is a temporary fix.
type TmpRemixFix = ReturnType<typeof defer<{isAuthenticated: false}>>;

export const headers = routeHeaders;

const seo: SeoHandleFunction<typeof loader> = ({data}) => ({
  title: 'Account details',
});

export const handle = {
  seo,
  isPublic: true,
};

export async function loader({request, context, params}: LoaderFunctionArgs) {
  const {pathname} = new URL(request.url);
  const lang = params.lang;
  const customerAccessToken = await context.session.get('customerAccessToken');
  const isAuthenticated = Boolean(customerAccessToken);
  const loginPath = lang ? `/${lang}/account/login` : '/account/login';
  const isAccountPage = /\/account\/?$/.test(pathname);

  if (!isAuthenticated) {
    if (isAccountPage) {
      return redirect(loginPath) as unknown as TmpRemixFix;
    }
    // pass through to public routes
    return json({isAuthenticated: false}) as unknown as TmpRemixFix;
  }

  const customer = await getCustomer(context, customerAccessToken);

  const metafields = customer.metafields;
  const user_id = metafields.find((m: any) => m?.key === 'user_id')?.value;

  //Get token
  const tokenResponse = await fetch(
    `https://login.anytimehq.co/${context.env.MS_ENTRA_TENANT_ID}/oauth2/v2.0/token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: context.env.MS_ENTRA_CLIENT_ID!,
        client_secret: context.env.MS_ENTRA_CLIENT_SECRET!,
        scope: 'api://stg.anytimeapi.com/customer/.default',
        grant_type: 'client_credentials',
      }),
    }
  );
  if (!tokenResponse.ok) {
    console.error('Failed to get Microsoft Entra token', await tokenResponse.text());
    throw new Error('Could not get Microsoft Entra access token');
  }
  const tokenData = await tokenResponse.json();
  const accessToken = tokenData?.access_token || '';
  // Assign organization to user
  const CustomerDetailResponse = await fetch('https://anytimeapi.com/customer/detail', {
    method: 'POST',
    headers: {
      'API-Version': 'v1',
      'Api-Environment': 'STG',
      'Ocp-Apim-Subscription-Key': context.env.ANYTIME_SUBSCRIPTION_KEY!,
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: user_id,
    }),
  });
  const CustomerDetailResponses = await CustomerDetailResponse.json();
  console.log('CustomerDetailResponses:', CustomerDetailResponses);
  

  const heading = customer
    ? customer.firstName
      ? `Hi, ${customer.firstName}.`
      : `Welcome to your account.`
    : 'Account Details';

  const orders = flattenConnection(customer.orders) as Order[];

  return defer(
    {
      isAuthenticated,
      customer,
      heading,
      orders,
      CustomerDetailResponses,
      addresses: flattenConnection(customer.addresses) as MailingAddress[],
    },
    {
      headers: {
        'Cache-Control': CACHE_NONE,
      },
    },
  );
}

export default function Authenticated() {
  const data = useLoaderData<typeof loader>();
  const outlet = useOutlet();
  const matches = useMatches();

  // routes that export handle { renderInModal: true }
  const renderOutletInModal = matches.some((match) => {
    return match?.handle?.renderInModal;
  });

  // Public routes
  if (!data.isAuthenticated) {
    return <Outlet />;
  }

  // Authenticated routes
  if (outlet) {
    if (renderOutletInModal) {
      const modalSeo = matches.map((match) => {
        if (typeof match.handle?.seo === 'function') {
          return match.handle.seo(match);
        }
        return match?.handle?.seo || '';
      });

      const modalTitle = modalSeo.length
        ? modalSeo[modalSeo.length - 1]?.title
        : '';

      return (
        <>
          <Modal title={modalTitle} cancelLink="/account">
            <Outlet context={{customer: data.customer}} />
          </Modal>
          <Account {...(data as Account)} />
        </>
      );
    } else {
      return <Outlet context={{customer: data.customer}} />;
    }
  }

  return <Account {...(data as Account)} />;
}

interface Account {
  customer: Customer;
  orders: Order[];
  heading: string;
  addresses: MailingAddress[];
}

function Account({customer, orders, heading, addresses, CustomerDetailResponses}: Account) {
  return (
    <div className="divide-y divide-gray pb-24 pt-10">
      <AccountSection>
        <h1
          className={clsx([
            'mb-4 text-2xl', //
            'md:text-3xl',
          ])}
        >
          {heading}
        </h1>

        {(CustomerDetailResponses.success === true && CustomerDetailResponses.data.user_id !== null) || customer.email === 'testuser@email.com' && (
          <Form method="post" action={usePrefixPathWithLocale('/account/logout')}>
            <Button type="submit">Log out</Button>
          </Form>
        )}
        
      </AccountSection>

      {orders && (
        <AccountSection>
          <AccountOrderHistory orders={orders as Order[]} />
        </AccountSection>
      )}

      <AccountSection>
        <AccountDetails customer={customer as Customer} />
      </AccountSection>
      <AccountSection>
        <AccountAddressBook
          addresses={addresses as MailingAddress[]}
          customer={customer as Customer}
        />
      </AccountSection>
    </div>
  );
}

const AccountSection = ({children}: {children: ReactNode}) => {
  return (
    <div>
      <div
        className={clsx(['mx-auto w-full max-w-[1400px] px-4 py-8', 'md:px-8'])}
      >
        {children}
      </div>
    </div>
  );
};

const CUSTOMER_QUERY = `#graphql
  query CustomerDetails(
    $customerAccessToken: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    customer(customerAccessToken: $customerAccessToken) {
      firstName
      lastName
      phone
      email
      metafields(identifiers: [
        { namespace: "custom", key: "user_id" },
      ]) {
        namespace
        key
        value
      }
      defaultAddress {
        id
        formatted
        firstName
        lastName
        company
        address1
        address2
        country
        province
        city
        zip
        phone
      }
      addresses(first: 6) {
        edges {
          node {
            id
            formatted
            firstName
            lastName
            company
            address1
            address2
            country
            province
            city
            zip
            phone
          }
        }
      }
      orders(first: 250, sortKey: PROCESSED_AT, reverse: true) {
        edges {
          node {
            id
            orderNumber
            processedAt
            financialStatus
            fulfillmentStatus
            currentTotalPrice {
              amount
              currencyCode
            }
            lineItems(first: 100) {
              edges {
                node {
                  variant {
                    image {
                      url
                      altText
                      height
                      width
                    }
                  }
                  title
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function getCustomer(
  context: AppLoadContext,
  customerAccessToken: string,
) {
  const {storefront} = context;

  const data = await storefront.query<{
    customer: Customer;
  }>(CUSTOMER_QUERY, {
    variables: {
      customerAccessToken,
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
  });

  /**
   * If the customer failed to load, we assume their access token is invalid.
   */
  if (!data || !data.customer) {
    throw await doLogout(context);
  }

  return data.customer;
}
