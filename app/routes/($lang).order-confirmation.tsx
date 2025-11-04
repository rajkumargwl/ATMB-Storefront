import { loadStripe } from "@stripe/stripe-js";
import {Await, useLoaderData, useNavigate} from '@remix-run/react';
import {Suspense} from 'react';
import {useRootLoaderData} from '~/root'; 
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useEffect,useState } from "react";
import type { LoaderFunction } from "@remix-run/node";

import {
  redirect,
} from '@shopify/remix-oxygen';
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
import type {Product, ProductVariant} from '@shopify/hydrogen/storefront-api-types';
import {type ShopifyAnalyticsProduct} from '@shopify/hydrogen';
import {DEFAULT_LOCALE, notFound, usePrefixPathWithLocale} from '~/lib/utils';
import Button from "~/components/elements/Button";
import AddToCartWithDraftOrderButton from '~/components/product/buttons/AddToCartWithDraftOrderButton';
import { type CartType } from '~/types'; // Add this import

export const loader: LoaderFunction = async ({ context, params }) => {
  const { env,storefront } = context;

  const cart = await context.cart.get();
  
  const customerAccessToken = await context.session.get('customerAccessToken');
  
  if (customerAccessToken === null || customerAccessToken === undefined || customerAccessToken === '') {
    return redirect('/create-account');
  }
  const CUSTOMER_QUERY = `
  query CustomerQuery($accessToken: String!) {
    customer(customerAccessToken: $accessToken) {
      id
      email
      firstName
      lastName
      metafields(identifiers: [
        { namespace: "custom", key: "user_id" },
        { namespace: "custom", key: "payment_details" }
      ]) {
        namespace
        key
        value
      }
    }
  }
`;


    const customerRes = await storefront.query(CUSTOMER_QUERY, {
      variables: { accessToken: customerAccessToken },
    });

    const customer = customerRes?.customer;
    const metafields = Array.isArray(customer?.metafields) ? customer.metafields : [];

    const userIdMetafield = metafields.find((m: any) => m?.key === 'user_id');
    const paymentDetailsMetafield = metafields.find((m: any) => m?.key === 'payment_details');

    const user_id = userIdMetafield?.value ?? null;
    const paymentDetailsMetafieldValue = paymentDetailsMetafield?.value ?? null;   
   
    // Parse payment details JSON safely
    let paymentMethodId = null;
    let customerPaymentKey = null;

    if (paymentDetailsMetafield?.value) {
      try {
        const paymentDetails = JSON.parse(paymentDetailsMetafield.value);
        paymentMethodId = paymentDetails.paymentMethodId ?? null;
        customerPaymentKey = paymentDetails.customerPaymentKey ?? null;
      } catch (err) {
        console.error("Error parsing payment_details metafield:", err);
      }
    }

  const [virtualMailbox, virtualPhone, BusinessAcc, LiveReceptionist] = await Promise.all([
      context.storefront.query<{product: Product}>(PRODUCT_QUERY, {
        variables: {handle: 'virtual-mailbox', selectedOptions: []},
      }),
      context.storefront.query<{product: Product}>(PRODUCT_QUERY, {
        variables: {handle: 'virtual-phone-number', selectedOptions: []},
      }),
      context.storefront.query<{product: Product}>(PRODUCT_QUERY, {
        variables: {handle: 'business-accelerato', selectedOptions: []},
      }),
      context.storefront.query<{product: Product}>(PRODUCT_QUERY, {
        variables: {handle: 'live-receptionist-100', selectedOptions: []},
      }),
      // context.storefront.query(ALL_PRODUCTS_QUERY, {
      //   variables: {first: 50}, 
      // }),
      
    ]);
  
    if (!virtualMailbox?.product || !virtualPhone?.product || !BusinessAcc?.product) {
      throw notFound();
    }
  
   // Combine them into an array
  const AllProducts = [
    virtualMailbox.product,
    virtualPhone.product,
    BusinessAcc.product,
    LiveReceptionist.product
  ];

  return new Response(
    JSON.stringify({
      stripePublishableKey: env.VITE_STRIPE_PUBLISHABLE_KEY,
      billingConfig: {
        baseUrl: env.BILLING_ANYTIME_BASE_URL,
        subscriptionKey: env.BILLING_ANYTIME_SUBSCRIPTION_KEY,
        clientId: env.BILLING_ANYTIME_CLIENT_ID,
        clientSecret: env.BILLING_ANYTIME_CLIENT_SECRET,
        scope: env.BILLING_ANYTIME_SCOPE,
      },
      bundleProducts: [virtualMailbox.product, virtualPhone.product],
      essentialsProducts: AllProducts ?? [],
      BusinessAcc,
      LiveReceptionist,
      user_id,
      paymentMethodId,
      customerPaymentKey,
      cart
    }),
    { headers: { "Content-Type": "application/json" } }
  );
};


export default function CheckoutPage() {
  const selectedLocale = useRootLoaderData()?.selectedLocale ?? DEFAULT_LOCALE;
  let currencyCode = selectedLocale?.currency || 'USD';
 
  const rootData = useRootLoaderData();
  const { bundleProducts, essentialsProducts, cart, BusinessAcc, LiveReceptionist,billingConfig,user_id,customerPaymentKey,paymentMethodId} = useLoaderData<typeof loader>();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

  const navigate = useNavigate();
  const [cartData, setCartData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("checkoutCart");
    if (stored) {
      setCartData(JSON.parse(stored));
      localStorage.removeItem("checkoutCart"); 
    }
  }, []);
  
  const LiveReceptionistProductAnalytics: ShopifyAnalyticsProduct | null = selectedVariant
      ? {
          productGid: LiveReceptionist?.product?.id,
          variantGid: selectedVariant?.id,
          name: LiveReceptionist?.title,
          variantName: selectedVariant?.title,
          brand: LiveReceptionist?.vendor,
          price: selectedVariant?.price?.amount,
          quantity: 1,
        }
      : null;
  const BusinessAccProductAnalytics: ShopifyAnalyticsProduct | null = selectedVariant
  ? {
      productGid: BusinessAcc?.product?.id,
      variantGid: selectedVariant?.id,
      name: BusinessAcc?.title,
      variantName: selectedVariant?.title,
      brand: BusinessAcc?.vendor,
      price: selectedVariant?.price?.amount,
      quantity: 1,
    }
  : null;

  const prefixPathWithLocale = usePrefixPathWithLocale;
  const paymentSuccessUrl = prefixPathWithLocale("/payment-success");

  return (
    <>
    <div className="absolute hidden md:flex z-[1] top-[-13px] right-[-20px] lg:right-[-23px]"><svg xmlns="http://www.w3.org/2000/svg" width="507" height="486" viewBox="0 0 507 486" fill="none"><g filter="url(#filter0_f_1664_59555)"><path d="M411.881 46.6449C401.099 52.2969 394.495 28.4027 382.786 25.0789C370.853 21.6916 357.913 24.4759 346.004 27.9448C331.506 32.1676 316.091 36.6981 305.594 47.5629C294.942 58.5867 276.999 77.417 286.863 89.1524C303.962 109.494 344.216 94.3713 361.734 114.352C371.288 125.25 344.748 138.798 343.008 153.192C341.04 169.488 334.911 202.927 351.227 201.319C376.574 198.821 381.924 159.41 404.26 147.157C411.576 143.144 418.013 156.232 424.944 160.881C440.834 171.538 455.265 201.694 472.141 192.681C488.214 184.097 468.288 156.878 466.405 138.738C465.509 130.098 462.92 121.66 463.873 113.027C464.667 105.836 466.661 98.2987 471.465 92.8942C489.283 72.8494 527.986 65.4332 529.966 38.6735C531.328 20.264 491.642 37.5227 476.32 27.2524C463.656 18.7633 468.593 -16.6418 453.998 -12.2493C430.704 -5.23929 433.43 35.3496 411.881 46.6449Z" fill="#FF6600"></path></g><defs><filter id="filter0_f_1664_59555" x="0" y="-296.625" width="814" height="782" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur stdDeviation="142" result="effect1_foregroundBlur_1664_59555"></feGaussianBlur></filter></defs></svg></div>
    <div className="md:px-25 md:pb-10 px-5 pb-10">
      <div className="top-6 w-full mx-auto flex items-center justify-center md:pt-9 pt-5 pb-5 px-5 md:px-25 bg-white">
          <img
            src="https://cdn.sanity.io/images/m5xb8z9y/production/6312d6eb4f994397153b67ef3043e166e1f574d4-101x50.svg"
            alt="Anytime Mailbox Logo"
            className="w-[101px]"
          />
      </div>
      <hr className="md:hidden border border-[#DCDCDC] -mx-5 md:-mx-25 w-auto" />
      <div className=" bg-white flex flex-col items-center justify-center mt-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-[24px] leading-[31.2px] tracking-[-0.36px] md:text-[36px] font-[600] text-[#091019] md:leading-[43.2px] md:tracking-[-0.54px]">
            Want to supercharge your business even more?
          </h1>
          <p className="text-[16px] leading-[24px] text-[#091019] md:text-[18px] font-[400] md:leading-[27px] mt-2">
            Unlock add-ons that enhance your mailbox service instantly, helping you stay connected,
            look professional, and grow quickly.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {/* Live Receptionist 100 */}
          <div className="border border-[#DCDCDC] rounded-lg pb-6 pt-2 px-2 shadow-sm hover:shadow-md transition bg-white">
            <div className="p-6 border border-[#FF6600] rounded-lg">
              <h2 className="text-[20px] md:text-[24px] font-[600] text-[#091019] md:leading-[31.2px] md:tracking-[-0.36px] leading-[28px] tracking-[-0.3px] mb-4">
                {LiveReceptionist?.product?.title}
              </h2>
              <p className="flex items-baseline gap-1 text-[24px] leading-[31.2px] tracking-[-0.36] font-[600] text-[#242629]">
                <Money data={{ amount: LiveReceptionist?.product?.variants?.nodes[0]?.price?.amount, currencyCode: currencyCode }}/> 
                <span className="text-[14px] font-[400] text-[#4B5563] leading-[21px]">
                  /month
                </span>
              </p>
            </div>

            <div className="mt-5 px-4">
              <ul className="space-y-3 text-gray-700 mb-5">
                <li className="flex items-center gap-3 text-[14px] font-[400] leading-[21px] font-roboto text-[#374151]">
                <span className="text-orange-500 font-bold">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                  <path d="M16.5544 0.110975C16.8206 0.305975 16.8806 0.680975 16.6856 0.950975L6.18563 15.351C6.08063 15.4935 5.92313 15.5835 5.74688 15.5947C5.57063 15.606 5.40188 15.546 5.27438 15.4222L0.174375 10.3222C-0.058125 10.0897 -0.058125 9.70722 0.174375 9.47472C0.406875 9.24222 0.789375 9.24222 1.02188 9.47472L5.62688 14.0797L15.7144 0.245975C15.9094 -0.0202754 16.2844 -0.0802754 16.5544 0.114725V0.110975Z" fill="#091019"/>
                </svg>
                </span> 
                100 Live Answering Minutes
              </li>
              <li className="flex items-center gap-3 text-[14px] font-[400] leading-[21px] font-roboto text-[#374151]">
                <span className="text-orange-500 font-bold">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                  <path d="M16.5544 0.110975C16.8206 0.305975 16.8806 0.680975 16.6856 0.950975L6.18563 15.351C6.08063 15.4935 5.92313 15.5835 5.74688 15.5947C5.57063 15.606 5.40188 15.546 5.27438 15.4222L0.174375 10.3222C-0.058125 10.0897 -0.058125 9.70722 0.174375 9.47472C0.406875 9.24222 0.789375 9.24222 1.02188 9.47472L5.62688 14.0797L15.7144 0.245975C15.9094 -0.0202754 16.2844 -0.0802754 16.5544 0.114725V0.110975Z" fill="#091019"/>
                </svg>
                </span> 
                Appointment Scheduling
              </li>
              <li className="flex items-center gap-3 text-[14px] font-[400] leading-[21px] font-roboto text-[#374151]">
                  <span className="text-orange-500 font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                    <path d="M16.5544 0.110975C16.8206 0.305975 16.8806 0.680975 16.6856 0.950975L6.18563 15.351C6.08063 15.4935 5.92313 15.5835 5.74688 15.5947C5.57063 15.606 5.40188 15.546 5.27438 15.4222L0.174375 10.3222C-0.058125 10.0897 -0.058125 9.70722 0.174375 9.47472C0.406875 9.24222 0.789375 9.24222 1.02188 9.47472L5.62688 14.0797L15.7144 0.245975C15.9094 -0.0202754 16.2844 -0.0802754 16.5544 0.114725V0.110975Z" fill="#091019"/>
                  </svg>
                  </span> 
                  Appointment Scheduling App
              </li>
            </ul>
           

            {/* <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition">
              Add Virtual Phone
            </button> */}
            <AddToCartWithDraftOrderButton
                lines={[
                  {merchandiseId: LiveReceptionist?.product?.variants?.nodes[0]?.id, quantity: 1},
                ]}
                customerId={rootData?.customer?.id}
                disabled={!LiveReceptionist?.product?.variants?.nodes[0]?.availableForSale}
                analytics={
                  LiveReceptionistProductAnalytics
                    ? {
                        products: [LiveReceptionistProductAnalytics],
                        totalValue: parseFloat(LiveReceptionistProductAnalytics.price),
                      }
                    : undefined
                }
                billingConfig={billingConfig} 
                buttonClassName="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-xl font-[400] text-[16px] leading-[16px] transition"
                text="Add Virtual Phone"
                cart={cart}
                userId={user_id}
              paymentMethodId={paymentMethodId}
              customerPaymentKey={customerPaymentKey}
              /> 
               </div>
          </div>

          {/* Business Accelerator */}
          <div className="border border-[#DCDCDC] rounded-lg pb-6 pt-2 px-2 shadow-sm hover:shadow-md transition bg-white">
            <div className="p-6 border border-[#FF6600] rounded-lg">
              <h2 className="text-[20px] md:text-[24px] font-[600] text-[#091019] md:leading-[31.2px] md:tracking-[-0.36px] leading-[28px] tracking-[-0.3px] mb-4">
               {BusinessAcc?.product?.title}
              </h2>
              <p className="flex items-baseline gap-1 text-[24px] leading-[31.2px] tracking-[-0.36] font-[600] text-[#242629]">
                <Money
                  data={{
                    amount: BusinessAcc?.product?.variants?.nodes[0]?.price?.amount,
                    currencyCode: currencyCode,
                  }}
                />
                <span className="text-[14px] font-[400] text-[#4B5563] leading-[21px]">
                  /month
                </span>
              </p>
            </div>
            <div className="mt-5 px-4">
              <ul className="space-y-3 text-gray-700 mb-5">
                <li className="flex items-center gap-3 text-[14px] font-[400] leading-[21px] font-roboto text-[#374151]">
                  <span className="text-orange-500 font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                    <path d="M16.5544 0.110975C16.8206 0.305975 16.8806 0.680975 16.6856 0.950975L6.18563 15.351C6.08063 15.4935 5.92313 15.5835 5.74688 15.5947C5.57063 15.606 5.40188 15.546 5.27438 15.4222L0.174375 10.3222C-0.058125 10.0897 -0.058125 9.70722 0.174375 9.47472C0.406875 9.24222 0.789375 9.24222 1.02188 9.47472L5.62688 14.0797L15.7144 0.245975C15.9094 -0.0202754 16.2844 -0.0802754 16.5544 0.114725V0.110975Z" fill="#091019"/>
                  </svg>
                  </span> 
                  Monthly Webinars, Podcasts
                </li>
                <li className="flex items-center gap-3 text-[14px] font-[400] leading-[21px] font-roboto text-[#374151]">
                  <span className="text-orange-500 font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                    <path d="M16.5544 0.110975C16.8206 0.305975 16.8806 0.680975 16.6856 0.950975L6.18563 15.351C6.08063 15.4935 5.92313 15.5835 5.74688 15.5947C5.57063 15.606 5.40188 15.546 5.27438 15.4222L0.174375 10.3222C-0.058125 10.0897 -0.058125 9.70722 0.174375 9.47472C0.406875 9.24222 0.789375 9.24222 1.02188 9.47472L5.62688 14.0797L15.7144 0.245975C15.9094 -0.0202754 16.2844 -0.0802754 16.5544 0.114725V0.110975Z" fill="#091019"/>
                  </svg>
                  </span> 
                  Well-researched Playbooks and Whitepapers
                </li>
                <li className="flex items-center gap-3 text-[14px] font-[400] leading-[21px] font-roboto text-[#374151]">
                  <span className="text-orange-500 font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                    <path d="M16.5544 0.110975C16.8206 0.305975 16.8806 0.680975 16.6856 0.950975L6.18563 15.351C6.08063 15.4935 5.92313 15.5835 5.74688 15.5947C5.57063 15.606 5.40188 15.546 5.27438 15.4222L0.174375 10.3222C-0.058125 10.0897 -0.058125 9.70722 0.174375 9.47472C0.406875 9.24222 0.789375 9.24222 1.02188 9.47472L5.62688 14.0797L15.7144 0.245975C15.9094 -0.0202754 16.2844 -0.0802754 16.5544 0.114725V0.110975Z" fill="#091019"/>
                  </svg>
                  </span> 
                  Special Promotions
                </li>
              </ul>

              {/* <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition">
                Add Business Accelerator
              </button> */}
              <AddToCartWithDraftOrderButton
                  lines={[
                    {merchandiseId: BusinessAcc?.product?.variants?.nodes[0]?.id, quantity: 1},
                  ]}
                  customerId={rootData?.customer?.id}
                  disabled={!BusinessAcc?.product?.variants?.nodes[0]?.availableForSale}
                  analytics={
                    BusinessAccProductAnalytics
                      ? {
                          products: [BusinessAccProductAnalytics],
                          totalValue: parseFloat(BusinessAccProductAnalytics.price),
                        }
                      : undefined
                  }
                  billingConfig={billingConfig} 
                  buttonClassName="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-xl font-[400] text-[16px] leading-[16px] transition"
                  text="Add Business Accelerator"
                  cart={cart}
                  userId={user_id}
              paymentMethodId={paymentMethodId}
              customerPaymentKey={customerPaymentKey}
                /> 
            </div>
          </div>
        </div>

        {/* No Thanks Button */}
        {/* <button className="mt-8 border border-gray-400 text-gray-700 hover:bg-gray-100 py-2 px-6 rounded-full transition" onClick={() => {
          navigate('/checkout', {state: {cartData}});
        }}>
          No Thanks, Continue
        </button> */}
        {/* No Thanks Button with Billing + Draft Order */}
                <button
          className="mt-10 border border-gray-400 text-[#091019] text-[16px] text-[500] leading-[16px] tracking-[0.08px] hover:bg-gray-100 py-3 px-4 rounded-full transition w-[236px]"
          onClick={async () => {
            try {
              const edges = cart?.lines?.edges;
              if (!edges || edges.length === 0) {
                navigate("/payment-fail");
                return;
              }
              
        
              // const cartLines = edges.map((l: any) => ({
              //   variantId: l.node?.merchandise?.id,
              //   quantity: l.node?.quantity ?? 1,
              // }));
              const cartLines = edges.map((l: any) => {
                const attrs = l.node?.attributes ?? [];
                
                // find the attributes
                const locationAttr = attrs.find((a: any) => a.key === "locationId");
                const billingAttr = attrs.find((a: any) => a.key === "billing_product_id");
                const selectedPlan =
                l.node?.merchandise?.selectedOptions?.[0]?.value || "Default Plan";
              const planPrice = parseFloat(l.node?.cost?.totalAmount?.amount || 0);
                return {
                  variantId: l.node?.merchandise?.id,
                  quantity: l.node?.quantity ?? 1,
                  locationId: locationAttr?.value || null,
                  billingProductId: billingAttr?.value || null,
                  planName: selectedPlan,
                  planPrice: planPrice,
                };
              });
              
              
              // Create Draft Order
              const draftRes = await fetch("/api/create-draft-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  lines: cartLines,
                  customerId: rootData?.customer?.id || null,
                }),
              });
        
              const draftData = await draftRes.json();
              const draftOrderId =
                draftData?.data?.draftOrderCreate?.draftOrder?.id || null;
        
              if (!draftOrderId) {
                console.error("Draft order creation failed:", draftData);
                navigate("/payment-fail");
                return;
              }
              const firstLine = cartLines[0] || {};
              const {
                locationId,
                billingProductId,
                planName,
                planPrice,
                quantity,
              } = firstLine;
                
              // Billing Payload
              const billingPayload = {
                locationId: locationId,
                locationUnitId: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
                customerId: user_id, 
                bundle: null,
                subscription: {
                  providerId: "d4e5f6a7-b8c9-0123-def1-234567890123",
                  //label: "Monthly Premium Subscription",
                  label: `${planName} Subscription`,
                  culture: "en-US",
                  currency: "USD",
                  items: [
                    {
                      productId: billingProductId,
                      providerId: "d4e5f6a7-b8c9-0123-def1-234567890123",
                      isChargeProrated: false,
                     // label: "Premium License - Monthly",
                      label: `${planName} License - Monthly`,
                      price: planPrice,
                      quantity: quantity,
                      subtotal: planPrice * quantity,
                      total: planPrice * quantity,
                      totalAdjustment: 0,
                      recurrenceInterval: "month",
                      adjustments: [
                        {
                          label: "10% Volume Discount",
                          adjustAmount: 50.0,
                          adjustPercent: 10.0,
                          adjustSubtotal: 50.0,
                        },
                      ],
                      attribution: [
                        {
                          organizationId: "f6a7b8c9-d0e1-2345-f123-456789012345",
                          quantityMin: 0.0,
                          quantityMax: 5.0,
                          quantityUnit: "licenses",
                          splitAmount: 449.95,
                          splitPercent: 100.0,
                          splitSubtotal: 449.95,
                          label: "Organization ABC",
                          type: "organization",
                          status: "active",
                          providerKey: "org_abc123",
                        },
                      ],
                    },
                  ],
                },
                customer: {
                  defaultCulture: "en-US",
                  defaultCurrency: "USD",
                  exemptTax: false,
                  status: "active",
                  type: "business",
                }, 
                payment: {
                  paymentMethodId: paymentMethodId,
                  customerPaymentKey: customerPaymentKey,
                  // metadata: {
                  //   source: "web_portal",
                  //   campaign: "spring_2024_promotion",
                  //   sales_rep: "john.doe@company.com",
                  // },
                },
              };
                
              const res = await fetch("/api/create-billing-purchase", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ billingPayload }),
              });
             
              const data = await res.json();
        
              if (!data.success) {
                console.error("Billing failed with new code:", data.error);
                navigate("/payment-fail");
                return;
              }
              localStorage.removeItem("checkoutCart");
              navigate("/payment-success");
        
            } catch (error) {
              console.error("NoThanksButton flow error:", error);
              navigate("/payment-fail");
            }
          }}
        >
          No Thanks, Continue </button>
      </div>
    </div>
    </>
  );
}
