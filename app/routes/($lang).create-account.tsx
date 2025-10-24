import {Form, useActionData, useNavigation} from '@remix-run/react';
import type {SeoHandleFunction} from '@shopify/hydrogen';
import type {CustomerCreatePayload} from '@shopify/hydrogen/storefront-api-types';
import {
  type ActionFunction,
  type LoaderFunctionArgs,
  redirect,
} from '@shopify/remix-oxygen';
import clsx from 'clsx';
import {useEffect, useState} from 'react';

import FormCardWrapper from '~/components/account/FormCardWrapper';
import FormFieldText from '~/components/account/FormFieldText';
import Button from '~/components/elements/Button';
import {Link} from '~/components/Link';
import {badRequest} from '~/lib/utils';

import {doLogin} from './($lang).account.login';
import { fi } from 'date-fns/locale';

const seo: SeoHandleFunction<typeof loader> = () => ({
  title: 'Register',
});

export const handle = {
  seo,
};

export async function loader({context, params}: LoaderFunctionArgs) {
  const customerAccessToken = await context.session.get('customerAccessToken');

  if (customerAccessToken) {
    return redirect(params.lang ? `${params.lang}/account` : '/account');
  }

  return new Response(null);
}

type ActionData = {
  formError?: string;
};


export const action: ActionFunction = async ({request, context, params}) => {
  const {session, storefront} = context;
  const formData = await request.formData();

  const email = formData.get('email');
  const first_name = formData.get('first_name');
  const last_name = formData.get('last_name');
  const phone = formData.get('phone');
  const password = "12345678"; // default password for all users
  
  if (!first_name || typeof first_name !== 'string') {
    return badRequest<ActionData>({
      formError: 'First name is required',
    });
  }
  
  if (!last_name || typeof last_name !== 'string') {
    return badRequest<ActionData>({
      formError: 'Last name is required',
    });
  }

  if (!email || typeof email !== 'string') {
    return badRequest<ActionData>({
      formError: 'Email is required.',
    });
  }
  
  if (!phone || typeof phone !== 'string') {
    return badRequest<ActionData>({
      formError: 'Phone number is required',
    });
  }
  

  try {
    // 1️ Create Shopify customer
    const data = await storefront.mutate<{
      customerCreate: CustomerCreatePayload;
    }>(CUSTOMER_CREATE_MUTATION, {
      variables: {
        input: {email, password, firstName: first_name, lastName: last_name, phone},
      },
    });

    if (!data?.customerCreate?.customer?.id) {
      const userErrors = data?.customerCreate?.customerUserErrors ?? [];
      const message = userErrors.map((e) => e.message).join(', ') || 'Customer creation failed';
      throw new Error(message);
    }

    // 2️ Get Microsoft Entra Token
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
          scope: 'api://anytimeapi.com/customer/.default',
          grant_type: 'client_credentials',
        }),
      }
    );

    if (!tokenResponse.ok) {
      console.error('Failed to get Microsoft Entra token', await tokenResponse.text());
      throw new Error('Could not get Microsoft Entra access token');
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // 3️ Call External API to Create User
    const userResponse = await fetch('https://anytimeapi.com/customer/', {
      method: 'POST',
      headers: {
        'API-Version': 'v1',
        'Api-Environment': 'STG',
        'Ocp-Apim-Subscription-Key': context.env.ANYTIME_SUBSCRIPTION_KEY!,
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        first_name,
        last_name,
        phone,
        status: 'Active',
        type: 'Lead',
      }),
    });

    const userResponses = await userResponse.json();
    if (userResponses.success === false) {
      // console.error('External API failed', await userResponses.errors);
      throw new Error('Could not create user in external API: ' + userResponses.errors.map((err: any) => err.message).join(', '));
    }

    //  Extract the external user ID
    const externalUserId = userResponses.data?.user_id;

    //  Get the Shopify Customer ID from Step 1
    const shopifyCustomerId = data.customerCreate.customer.id;

    //  Update existing metafield value for `custom.user_id`
    const metafieldUpdateResponse = await fetch(
      `https://${context.env.PUBLIC_STORE_DOMAIN}/admin/api/2024-07/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': context.env.SHOPIFY_ADMIN_API_TOKEN!,
        },
        body: JSON.stringify({
          query: `
            mutation UpdateCustomerMetafield($ownerId: ID!, $namespace: String!, $key: String!, $value: String!) {
              metafieldsSet(
                metafields: [
                  {
                    ownerId: $ownerId
                    namespace: $namespace
                    key: $key
                    type: "single_line_text_field"
                    value: $value
                  }
                ]
              ) {
                metafields {
                  id
                  key
                  value
                }
                userErrors {
                  field
                  message
                }
              }
            }
          `,
          variables: {
            ownerId: shopifyCustomerId,
            namespace: 'custom',
            key: 'user_id',
            value: externalUserId,
          },
        }),
      }
    );

    const metafieldUpdateResult = await metafieldUpdateResponse.json();

    if (metafieldUpdateResult.errors || metafieldUpdateResult.data?.metafieldsSet?.userErrors?.length) {
      console.error('Failed to update metafield:', metafieldUpdateResult);
      throw new Error('Could not update user_id metafield for customer');
    }


    // 4️⃣ Login customer in Shopify
    const customerAccessToken = await doLogin(context, {email, password});
    if (!customerAccessToken) throw new Error('Login failed');

    session.set('customerAccessToken', customerAccessToken);

    return redirect(params.lang ? `/${params.lang}/account` : '/account', {
      headers: {
        'Set-Cookie': await session.commit(),
      },
    });
  } catch (error: any) {
    console.error('Register action failed:', error);
    return badRequest({
      formError:
        error?.message ||
        'Sorry. We could not create an account. Please try again or login if you already have an account.',
    });
  }
};

export default function Register() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const [nativeEmailError, setNativeEmailError] = useState<null | string>(null);
  const [firstNameError, setFirstNameError] = useState<string | null>(null);
  const [lastNameError, setLastNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  useEffect(() => {
    if (actionData?.formError) {
      setFormError(actionData.formError);
    }
  }, [actionData]);

  return (
    <div className={clsx('my-32 px-4', 'md:px-8')}>
      <div className="flex justify-center">
        <FormCardWrapper title="Create an account">
          <Form method="post" noValidate onSubmit={() => setFormError(null)}>
            {formError && (
              <div className="mb-6 flex items-center justify-center rounded-sm border border-red p-4 text-sm text-red">
                <p>{formError}</p>
              </div>
            )}

            <div className="space-y-4">
              <FormFieldText
                id="first_name"
                name="first_name"
                type="text"
                required
                aria-label="First Name"
                label="First Name"
                error={firstNameError || ''}
                onFocus={() => setFormError(null)}
                onBlur={(event) => {
                  setFirstNameError(
                    event.currentTarget.value.length && !event.currentTarget.validity.valid
                      ? 'Invalid First Name'
                      : null,
                  );
                }}
              />

              <FormFieldText
                id="last_name"
                name="last_name"
                type="text"
                required
                aria-label="Last Name"
                label="Last Name"
                error={lastNameError || ''}
                onFocus={() => setFormError(null)}
                onBlur={(event) => {
                    setLastNameError(
                    event.currentTarget.value.length && !event.currentTarget.validity.valid
                        ? 'Invalid Last Name'
                        : null,
                    );
                }}
              />

              {/* Email */}
              <FormFieldText
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                aria-label="Email address"
                label="Email address"
                onFocus={() => setFormError(null)}
                error={nativeEmailError || ''}
                onBlur={(event) => {
                  setNativeEmailError(
                    event.currentTarget.value.length &&
                      !event.currentTarget.validity.valid
                      ? 'Invalid email address'
                      : null,
                  );
                }}
              />

              <FormFieldText
                id="phone"
                name="phone"
                type="text"
                required
                aria-label="Phone"
                label="Phone"
                maxLength={16}
                error={phoneError || ''}
                onFocus={() => setFormError(null)}
                onBlur={(event) => {
                  const value = event.currentTarget.value.trim();

                  // International format: optional +, then 7-15 digits
                  const isValid = /^\+?\d{7,15}$/.test(value);

                  setPhoneError(
                    value.length && !isValid ? 'Invalid phone number. Include country code if needed.' : null,
                  );
                }}
                onInput={(event) => {
                  // Allow only + at start and digits
                  event.currentTarget.value = event.currentTarget.value.replace(/(?!^\+)\D/g, '');
                }}
              />


              
            </div>

            {/* Footer */}
            <div className="mt-4 space-y-4">
              <Button
                type="submit"
                disabled={!!(firstNameError || lastNameError || phoneError || nativeEmailError) || isSubmitting}
              >
                {isSubmitting ? 'Creating account...' : 'Create account'}
              </Button>

             
            </div>
          </Form>
        </FormCardWrapper>
      </div>
    </div>
  );
}

const CUSTOMER_CREATE_MUTATION = `#graphql
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;
