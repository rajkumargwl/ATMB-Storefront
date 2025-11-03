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
    console.log('User ID Metafield:', user_id);
    console.log('Payment Method ID:', paymentMethodId);
    console.log('Customer Payment Key:', customerPaymentKey);
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
    <div className="top-6 w-full mx-auto flex items-center justify-center py-4 px-6 md:px-12 lg:px-24 bg-white">
        <img
          src="https://cdn.sanity.io/images/m5xb8z9y/production/6312d6eb4f994397153b67ef3043e166e1f574d4-101x50.svg"
          alt="Anytime Mailbox Logo"
          className="w-[101px]"
        />
    </div>
     <div className=" bg-white flex flex-col items-center justify-center p-6 mt-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Want to supercharge your business even more?
        </h1>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">
          Unlock add-ons that enhance your mailbox service instantly, helping you stay connected,
          look professional, and grow quickly.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Live Receptionist 100 */}
        <div className="border border-orange-300 rounded-2xl p-6 shadow-sm hover:shadow-md transition bg-white">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            {LiveReceptionist?.product?.title}
          </h2>
          <p className="flex text-2xl font-bold text-gray-900 mb-4"><Money data={{ amount: LiveReceptionist?.product?.variants?.nodes[0]?.price?.amount, currencyCode: currencyCode }}/><span className="text-base font-medium">/month</span></p>

          <ul className="space-y-2 text-gray-700 mb-6">
            <li className="flex items-center gap-2">
              <span className="text-orange-500 font-bold">✓</span> 100 Live Answering Minutes
            </li>
            <li className="flex items-center gap-2">
              <span className="text-orange-500 font-bold">✓</span> Appointment Scheduling
            </li>
            <li className="flex items-center gap-2">
              <span className="text-orange-500 font-bold">✓</span> Appointment Scheduling App
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
              buttonClassName="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition"
              text="Add Virtual Phone"
              cart={cart}
              userId={user_id}
              paymentMethodId={paymentMethodId}
              customerPaymentKey={customerPaymentKey}
            /> 
        </div>

        {/* Business Accelerator */}
        <div className="border border-orange-300 rounded-2xl p-6 shadow-sm hover:shadow-md transition bg-white">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
          {BusinessAcc?.product?.title}
          </h2>
          <p className="flex text-2xl font-bold text-gray-900 mb-4"><Money data={{ amount: BusinessAcc?.product?.variants?.nodes[0]?.price?.amount, currencyCode: currencyCode }}/><span className="text-base font-medium">/month</span></p>

          <ul className="space-y-2 text-gray-700 mb-6">
            <li className="flex items-center gap-2">
              <span className="text-orange-500 font-bold">✓</span> Monthly Webinars, Podcasts
            </li>
            <li className="flex items-center gap-2">
              <span className="text-orange-500 font-bold">✓</span> Well-researched Playbooks and Whitepapers
            </li>
            <li className="flex items-center gap-2">
              <span className="text-orange-500 font-bold">✓</span> Special Promotions
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
              buttonClassName="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition"
              text="Add Business Accelerator"
              cart={cart}
              userId={user_id}
              paymentMethodId={paymentMethodId}
              customerPaymentKey={customerPaymentKey}
            /> 
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
        className="mt-8 border border-gray-400 text-gray-700 hover:bg-gray-100 py-2 px-6 rounded-full transition"
        onClick={async () => {
    try {
      const edges = cart?.lines?.edges;
      if (!edges || edges.length === 0) {
        navigate("/payment-fail");
        return;
      }
      // ✅ Extract location_id from cart attributes
      const locationAttr = cart?.attributes?.find(
        (attr) => attr.key === "locationId"
      );
      const locationId = locationAttr?.value || null;

      console.log("Cart Lines Edges:", edges, locationId);

      const cartLines = edges.map((l: any) => ({
        variantId: l.node?.merchandise?.id,
        quantity: l.node?.quantity ?? 1,
      }));

  
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

      // Billing Payload
      const billingPayload = {
        locationId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", //D
        locationUnitId: "b2c3d4e5-f6a7-8901-bcde-f12345678901",//static
        customerId: user_id, 
        bundle: null,
        subscription: {
          providerId: "d4e5f6a7-b8c9-0123-def1-234567890123",//s
          label: "Monthly Premium Subscription",//d
          culture: "en-US",//static
          currency: "USD",//static
          items: [
            {
              productId: "e5f6a7b8-c9d0-1234-ef12-345678901234",//metafields
              providerId: "d4e5f6a7-b8c9-0123-def1-234567890123",
              isChargeProrated: false,
              label: "Premium License - Monthly",
              price: 99.99,
              quantity: 5,
              subtotal: 499.95,
              total: 449.95,
              totalAdjustment: 50.0,
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
          metadata: {
            source: "web_portal",
            campaign: "spring_2024_promotion",
            sales_rep: "john.doe@company.com",
          },
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
    No Thanks, Continue
  </button>

    </div>
    </>
  );
}
