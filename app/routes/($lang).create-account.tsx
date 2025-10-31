import {Await, Form, useActionData, useLoaderData, useNavigation} from '@remix-run/react';
import type {SeoHandleFunction} from '@shopify/hydrogen';
import type {CustomerCreatePayload} from '@shopify/hydrogen/storefront-api-types';
import {
  type ActionFunction,
  type LoaderFunctionArgs,
  redirect,
} from '@shopify/remix-oxygen';
import clsx from 'clsx';
import {Suspense, useEffect, useState} from 'react';

import FormCardWrapper from '~/components/account/FormCardWrapper';
import FormFieldText from '~/components/account/FormFieldText';
import Button from '~/components/elements/Button';
import {Link} from '~/components/Link';
import {badRequest} from '~/lib/utils';

import {doLogin} from './($lang).account.login';
import { fi } from 'date-fns/locale';
import {
  Money,
} from '@shopify/hydrogen-react';
import CartBundleSection from '~/components/cart/CartBundleSection';
import CartEssentialsSection from '~/components/cart/CartEssentialsSection';
import {
  CartActions,
  CartLineItems,
  CartSummary,
} from '~/components/cart/Cart';
import SpinnerIcon from "~/components/icons/Spinner";
import {PRODUCT_QUERY, ALL_PRODUCTS_QUERY} from '~/queries/shopify/product';
import type {Product} from '@shopify/hydrogen/storefront-api-types';
import {notFound} from '~/lib/utils';
import { useRootLoaderData } from '~/root';
import { usePrefixPathWithLocale } from '~/lib/utils';

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
    console.log('External API user creation response:', userResponses);
    if (!userResponses?.success === false) {
      // console.error('External API failed', await userResponses.errors);
      throw new Error('Could not create user in external API: ' + userResponses?.errors.map((err: any) => err?.message).join(', '));
    }

    //  Extract the external user ID
    const externalUserId = userResponses?.data?.user_id;

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

    if (metafieldUpdateResult?.errors || metafieldUpdateResult?.data?.metafieldsSet?.userErrors?.length) {
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
   const rootData = useRootLoaderData();
    const cart = rootData?.cart?._data;
    const lines = cart?.lines?.edges;
  const { bundleProducts, essentialsProducts,customer} = useLoaderData<typeof loader>();
  return (
     <section className="">
          <Suspense fallback={<div className="flex justify-center"><SpinnerIcon /></div>}>
           <Await resolve={rootData?.cart}>
              {(cart) => {
                  return (
                    <>
                    {/* {cart && cart.lines.edges.length > 0 && ( */}
                      <div>
                         {/* Back to cart */}
                         <div className="flex flex-row items-center justify-between gap-3 border-b border-[#DCDCDC] px-25 py-5">
                              {/* Left side - Back button and text */}
                              <div className="flex items-center gap-3">
                                <Button
                                  onClick={() => window.history.back()}
                                  className="bg-[#ffffff] p-6 w-[32px] md:w-[36px] h-[32px] md:h-[36px] border border-LightWhite rounded-full flex items-center justify-center p-0"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="16"
                                    viewBox="0 0 20 16"
                                    fill="none"
                                  >
                                    <path
                                      d="M7.53027 1.33008C7.56751 1.29284 7.63366 1.29284 7.6709 1.33008C7.70773 1.36727 7.70774 1.43254 7.6709 1.46973L1.24121 7.89941H19C19.0539 7.89941 19.1006 7.94614 19.1006 8C19.1005 8.05381 19.0538 8.09961 19 8.09961H1.24121L7.6709 14.5293C7.70807 14.5665 7.70794 14.6326 7.6709 14.6699C7.63366 14.7072 7.56751 14.7072 7.53027 14.6699L0.930664 8.07031C0.893426 8.03307 0.893426 7.96693 0.930664 7.92969L7.53027 1.33008Z"
                                      fill="#091019"
                                      stroke="#091019"
                                    />
                                  </svg>
                                </Button>

                                <h1 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[28px] text-[24px] md:text-[20px] tracking-[-0.36px] md:tracking-[-0.3px]">
                                  Back to cart
                                </h1>
                              </div>

                              {/* Right side - Logo */}
                              <a href={usePrefixPathWithLocale('/')}>
                              <img
                                src="https://cdn.sanity.io/images/m5xb8z9y/production/6312d6eb4f994397153b67ef3043e166e1f574d4-101x50.svg"
                                alt="Anytime Mailbox Logo"
                                className="w-[101px]"
                              />
                              </a>
                          </div>
                        <div className="bg-white px-[200px] pt-[40px] pb-[40px] md:pb-[80px]">
                          <div className="">
                            {/* Checkout header */}
                            <div className="mb-8">
                              <h1 className="font-[600] text-[#091019] md:text-[32px] md:leading-[38.4px] md:tracking-[-0.48px] text-[24px] leading-[31.2px] tracking-[-0.36px]">
                                Checkout
                              </h1>
                              <p className="text-[#4D4E4F] font-[400] text-[16px] leading-[24px] mt-1">
                                Get started in seconds and manage your mail anytime, anywhere.
                              </p>
                            </div>
                          </div>
                  
                          {/* Form + Cart summary */}
                          <div className=" gap-[24px] flex flex-col-reverse lg:flex-row">
                            {/* Left: Form */}
                            <div className="w-full lg:w-[65.35%]">
                              <div
                                role="row"
                                className="flex flex-col p-6 border border-[#DCDCDC] rounded-[12px]"
                              >
                                <h3 className="font-[400] md:font-[600] text-[#091019] md:text-[24px] md:leading-[31.2px] tracking-[-0.48px] text-[20px] leading-[28px]">
                                  Create an Account
                                </h3>
                                <p className="text-[#4D4E4F] font-[400] text-[14px] leading-[21px] mt-1">
                                  Join us for a secure experience with your personal information
                                </p>
                
                                <Form method="post" noValidate onSubmit={() => setFormError(null)} className="mt-[20px]">
                                  {formError && (
                                    <div className="mb-6 flex items-center justify-center rounded-sm border border-red p-4 text-sm text-red">
                                      <p>{formError}</p>
                                    </div>
                                  )}
                                  {/* Name fields */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="relative">
                                      <input
                                        id="first_name"
                                        name="first_name"
                                        aria-label="First Name"
                                        type="text"
                                        required
                                        placeholder="Chirstopher"
                                        onFocus={() => setFormError(null)}
                                        onBlur={(event) => {
                                          setFirstNameError(
                                            event.currentTarget.value.length && !event.currentTarget.validity.valid
                                              ? 'Invalid First Name'
                                              : null,
                                          );
                                        }}
                                        className="font-[400] peer w-full border border-[#E5E7EB] rounded-[8px] px-4 pt-[30px] pb-2 leading-[24px] text-[16px] text-[#091019] placeholder-[#091019] focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
                                      />
                                      <label
                                        htmlFor="first_name"
                                        aria-label="First Name"
                                        className="font-[400] absolute left-4 top-[10px] text-[12px] leading-[18px] text-[#4D4E4F] peer-placeholder-shown:top-2 peer-placeholder-shown:text-[14px] peer-placeholder-shown:text-[#9CA3AF] transition-all duration-150"
                                      >
                                        First Name
                                      </label>
                                    </div>
                  
                                    <div className="relative">
                                      <input
                                        id="last_name"
                                        name="last_name"
                                        aria-label='Last Name'
                                        type="text"
                                        placeholder="Philip"
                                        required
                                        onFocus={() => setFormError(null)}
                                        onBlur={(event) => {
                                            setLastNameError(
                                            event.currentTarget.value.length && !event.currentTarget.validity.valid
                                                ? 'Invalid Last Name'
                                                : null,
                                            );
                                        }}
                                        className="font-[400] peer w-full border border-[#E5E7EB] rounded-[8px] px-4 pt-[30px] pb-2 leading-[24px] text-[16px] text-[#091019] placeholder-[#091019] focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
                                      />
                                      <label
                                        htmlFor="last_name"
                                        aria-label='Last Name'
                                        className="font-[400] absolute left-4 top-[10px] text-[12px] leading-[18px] text-[#4D4E4F] peer-placeholder-shown:top-2 peer-placeholder-shown:text-[14px] peer-placeholder-shown:text-[#9CA3AF] transition-all duration-150"
                                      >
                                        Last Name
                                      </label>
                                    </div>
                                  </div>
                  
                                  {/* Phone number */}
                                  <div className="mt-5 flex flex-col gap-5">
                                    <div className="relative">
                                      <input
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        aria-label='Phone Number'
                                        placeholder="+1 786 564 683"
                                        maxLength={16}
                                        required
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
                                        className="font-[400] peer w-full border border-[#E5E7EB] rounded-[8px] px-4 pt-[30px] pb-2 text-[16px] text-[#091019] leading-[24px] placeholder-[#091019] focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
                                      />
                                      <label
                                        htmlFor="phone"
                                        aria-label='Phone Number'
                                        className="font-[400] absolute left-4 top-[10px] text-[12px] text-[#4D4E4F] leading-[18px] peer-placeholder-shown:top-2 peer-placeholder-shown:text-[14px] peer-placeholder-shown:text-[#9CA3AF] transition-all duration-150"
                                      >
                                        Phone Number
                                      </label>
                                    </div>
                                  </div>
                  
                                  {/* Email + Verification */}
                                  <div className="mt-5 flex flex-col gap-5">
                                    <div className="relative">
                                      <input
                                        id="email"
                                        name="email"
                                        type="text"
                                        required
                                        aria-label='Email Address'
                                        placeholder="chris.philip@anytime.com"
                                        onFocus={() => setFormError(null)}
                                        onBlur={(event) => {
                                          setNativeEmailError(
                                            event.currentTarget.value.length &&
                                              !event.currentTarget.validity.valid
                                              ? 'Invalid email address'
                                              : null,
                                          );
                                        }}
                                        className="font-[400] peer w-full border border-[#E5E7EB] rounded-[8px] px-4 pt-[30px] pb-2 text-[16px] text-[#091019] leading-[24px] placeholder-[#091019] focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
                                      />
                                      <label
                                        htmlFor="email"
                                        aria-label='Email Address'
                                        className="font-[400] absolute left-4 top-[10px] text-[12px] text-[#4D4E4F] leading-[18px] peer-placeholder-shown:top-2 peer-placeholder-shown:text-[14px] peer-placeholder-shown:text-[#9CA3AF] transition-all duration-150"
                                      >
                                        Email Address
                                      </label>
                  
                                      {/* Desktop: inside input */}
                                      {/* <span className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 text-[#FF6600] text-[14px] cursor-pointer">
                                        Send Verification Code
                                      </span> */}
                                    </div>
                  
                                    {/* Mobile: below input */}
                                    {/* <span className="block md:hidden text-center text-[#FF6600] text-[14px] cursor-pointer">
                                      Send Verification Code
                                    </span> */}
                                  </div>
                  
                                  {/* Verification Code Inputs */}
                                  {/* <div className="mt-5 flex flex-col relative">
                                    <label
                                      htmlFor="VerificationCode"
                                      aria-label='Enter Verification Code'
                                      className="font-[400] absolute top-[-5px] text-[12px] text-[#404040] leading-[18px] transition-all duration-150"
                                    >
                                      Enter Verification Code
                                    </label>
                  
                                    <div
                                      className="mt-5 flex gap-2 justify-between max-w-[260px]"
                                      id="verification-code"
                                    >
                                      {Array.from({ length: 6 }).map((_, i) => (
                                        <input
                                          aria-label='Enter Verification Code'
                                          name="VerificationCode"
                                          key={i}
                                          id={`code-${i}`}
                                          type="text"
                                          maxLength={1}
                                          placeholder="-"
                                          className="w-[44px] h-[44px] border border-[#E5E7EB] rounded-[8px] text-center text-[18px] font-[500] text-[#091019] focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
                                          onInput={(e) => {
                                            const input = e.target as HTMLInputElement;
                                            const next = document.getElementById(
                                              `code-${i + 1}`
                                            ) as HTMLInputElement | null;
                                            if (input.value && next) next.focus();
                                            else if (input.value && !next) input.blur(); // move out when last filled
                                          }}
                                          onKeyDown={(e) => {
                                            const input = e.target as HTMLInputElement;
                                            const prev = document.getElementById(
                                              `code-${i - 1}`
                                            ) as HTMLInputElement | null;
                                            if (e.key === "Backspace" && !input.value && prev)
                                              prev.focus();
                                          }}
                                        />
                                      ))}
                                    </div>
                                  </div> */}
                  
                                  {/* Buttons */}
                                  <button
                                    type="submit"
                                    title='Create an Account'
                                    aria-label='Create an Account'
                                    disabled={!!(firstNameError || lastNameError || phoneError || nativeEmailError) || isSubmitting}
                                    className="flex items-center justify-center mt-5 bg-[#F6F6F6] h-[52px] hover:bg-[#e55a00] px-4 text-[#4D4E4F] hover:text-white font-medium text-[16px] py-3 rounded-full transition-all w-full"
                                  >
                                    {isSubmitting ? 'Creating account...' : 'Create an Account'}
                                  </button>
                  
                                  <button
                                    type="button"
                                    title='Login'
                                    aria-label='Login'
                                    onClick={() => {
                                      const ssoUrl = "https://store.xecurify.com/moas/broker/login/shopify/0dv7ud-pz.myshopify.com/account?idpname=custom_openidconnect_Okf";
                                      const width = 800;
                                      const height = 600;
                                      const left = (window.screen.width - width) / 2;
                                      const top = (window.screen.height - height) / 2;
                                      window.open(
                                        ssoUrl,
                                        "SSO Login",
                                        `width=${width},height=${height},top=${top},left=${left},resizable,scrollbars=yes,status=1`
                                      );
                                    }}
                                    className="flex items-center justify-center mt-4 h-[52px] px-4 text-[#FF6600] font-medium text-[16px] py-3 rounded-full transition-all w-full"
                                  >
                                    Already have an account? Login
                                  </button>
                                </Form>
                              </div>
                            </div>
                  
                            {/* Right: Cart Summary */}
                            <div className="w-full lg:w-[34.65%] md:sticky md:top-[80px] space-y-6">
                            {cart && cart.lines.edges.length > 0 && (
                              <CartSummary cart={cart} cost={cart.cost} />
                            )}
                            </div>
                          </div>
                        </div>
                      </div>
                    {/* // )} */}
                  
                    {/* {!cart?.lines?.edges?.length && (
                      <div className="mx-auto max-w-[600px] text-center flex flex-col gap-6 mt-10 md:mt-40">
                        <h1 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[38.4px] text-[24px] md:text-[32px] tracking-[-0.36px] md:tracking-[-0.48px]">
                          Your Cart is Empty
                        </h1>
                        <p className="font-Roboto text-PrimaryBlack font-normal leading-[24px] text-[16px]">
                          Looks like you haven't added anything to your cart yet.
                        </p>
                        <a
                          href={usePrefixPathWithLocale('/')}
                          className="flex items-center justify-center bg-DarkOrange text-white font-Roboto text-[16px] py-[12px] px-4 rounded-full h-[52px]"
                        >
                          Continue Shopping
                        </a>
                      </div>
                    )} */}
                  </>
                  
                  );
              }}
              </Await>
             </Suspense>
           </section>
    // <div className={clsx('my-32 px-4', 'md:px-8')}>
    //   <div className="flex justify-center">
    //     <FormCardWrapper title="Create an account">
    //       <Form method="post" noValidate onSubmit={() => setFormError(null)}>
    //         {formError && (
    //           <div className="mb-6 flex items-center justify-center rounded-sm border border-red p-4 text-sm text-red">
    //             <p>{formError}</p>
    //           </div>
    //         )}

    //         <div className="space-y-4">
    //           <FormFieldText
    //             id="first_name"
    //             name="first_name"
    //             type="text"
    //             required
    //             aria-label="First Name"
    //             label="First Name"
    //             error={firstNameError || ''}
    //             onFocus={() => setFormError(null)}
    //             onBlur={(event) => {
    //               setFirstNameError(
    //                 event.currentTarget.value.length && !event.currentTarget.validity.valid
    //                   ? 'Invalid First Name'
    //                   : null,
    //               );
    //             }}
    //           />

    //           <FormFieldText
    //             id="last_name"
    //             name="last_name"
    //             type="text"
    //             required
    //             aria-label="Last Name"
    //             label="Last Name"
    //             error={lastNameError || ''}
    //             onFocus={() => setFormError(null)}
    //             onBlur={(event) => {
    //                 setLastNameError(
    //                 event.currentTarget.value.length && !event.currentTarget.validity.valid
    //                     ? 'Invalid Last Name'
    //                     : null,
    //                 );
    //             }}
    //           />

    //           {/* Email */}
    //           <FormFieldText
    //             id="email"
    //             name="email"
    //             type="email"
    //             autoComplete="email"
    //             required
    //             aria-label="Email address"
    //             label="Email address"
    //             onFocus={() => setFormError(null)}
    //             error={nativeEmailError || ''}
    //             onBlur={(event) => {
    //               setNativeEmailError(
    //                 event.currentTarget.value.length &&
    //                   !event.currentTarget.validity.valid
    //                   ? 'Invalid email address'
    //                   : null,
    //               );
    //             }}
    //           />

    //           <FormFieldText
    //             id="phone"
    //             name="phone"
    //             type="text"
    //             required
    //             aria-label="Phone"
    //             label="Phone"
    //             maxLength={16}
    //             error={phoneError || ''}
    //             onFocus={() => setFormError(null)}
    //             onBlur={(event) => {
    //               const value = event.currentTarget.value.trim();

    //               // International format: optional +, then 7-15 digits
    //               const isValid = /^\+?\d{7,15}$/.test(value);

    //               setPhoneError(
    //                 value.length && !isValid ? 'Invalid phone number. Include country code if needed.' : null,
    //               );
    //             }}
    //             onInput={(event) => {
    //               // Allow only + at start and digits
    //               event.currentTarget.value = event.currentTarget.value.replace(/(?!^\+)\D/g, '');
    //             }}
    //           />


              
    //         </div>

    //         {/* Footer */}
    //         <div className="mt-4 space-y-4">
    //           <Button
    //             type="submit"
    //             disabled={!!(firstNameError || lastNameError || phoneError || nativeEmailError) || isSubmitting}
    //           >
    //             {isSubmitting ? 'Creating account...' : 'Create account'}
    //           </Button>

             
    //         </div>
    //       </Form>
    //     </FormCardWrapper>
    //   </div>
    // </div>
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
