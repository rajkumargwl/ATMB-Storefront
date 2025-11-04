import {type FetcherWithComponents, useFetcher, useNavigate} from '@remix-run/react';
import {
  AnalyticsEventName,
  CartForm,
  getClientBrowserParameters,
  sendShopifyAnalytics,
  type ShopifyAddToCartPayload,
} from '@shopify/hydrogen';
import type {CartLineInput} from '@shopify/hydrogen/storefront-api-types';
import {useEffect, useRef} from 'react';
import {twMerge} from 'tailwind-merge';

import {defaultButtonStyles} from '~/components/elements/Button';
import SpinnerIcon from '~/components/icons/Spinner';
import {usePageAnalytics} from '~/hooks/usePageAnalytics';
import {DEFAULT_LOCALE, notFound, usePrefixPathWithLocale} from '~/lib/utils';

type FormMode = 'default' | 'inline';

  export default function AddToCartWithDraftOrderButton({
    children = 'Add to cart',
    lines,
    analytics,
    mode = 'default',
    buttonClassName,
    customerId,
    billingConfig,
    cart,
    user_id,
    paymentMethodId,
    customerPaymentKey,
    ...props
  }: {
    children?: React.ReactNode;
    lines: CartLineInput[];
    analytics?: unknown;
    mode?: 'default' | 'inline';
    buttonClassName?: string;
    customerId: string | null;
    cart?: any;
    user_id: string;
    paymentMethodId: string;
    customerPaymentKey: string;
    billingConfig?: {
      baseUrl: string;
      subscriptionKey: string;
      clientId: string;
      clientSecret: string;
      scope: string;
    };
    [key: string]: any;
  }) {
  
    const hasSubmitted = useRef(false);
    const navigate = useNavigate();
    const successUrl = usePrefixPathWithLocale("/payment-success");
    const failUrl = usePrefixPathWithLocale("/payment-fail");

    return (
      <div className={mode == "inline" ? "[&>*]:inline" : ""}>
        <CartForm
          route={`/cart`}
          inputs={{ lines }}
          action={CartForm.ACTIONS.LinesAdd}
        >
          {(fetcher) => {
            // Run side-effect when AddToCart completes
            useEffect(() => {
              if (fetcher.state === "submitting") {
                hasSubmitted.current = true;
              }
  
              // detect completion
              if (
                hasSubmitted.current &&
                fetcher.state === "idle" &&
                fetcher.data
              ) {
                hasSubmitted.current = false;
  
                // Call Draft Order API
                (async () => {
                  try {
                    const cartId = fetcher.data.cart.id;
                    const cartRes = await fetch(`/api/cart/${btoa(cartId)}`);
                    const fullCart = await cartRes.json();
                   
                   // const edges = fullCart?.lines?.edges;
                    const edges = cart?.lines?.edges;
                    if (!edges || !Array.isArray(edges)) {
                      console.warn("No valid cart lines found in fullCart:", fullCart);
                      navigate("/payment-fail");
                      return;
                    }
                    
                    // Extract cart lines
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
                        customerId,
                      }),
                    });
                    const draftData = await draftRes.json();
              
                    if (draftData?.data?.draftOrderCreate?.draftOrder?.id) {
                      const firstLine = cartLines[0] || {};
                      const {
                        locationId,
                        billingProductId,
                        planName,
                        planPrice,
                        quantity,
                      } = firstLine;
                  //Call Anytime Billing Purchase API
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
                  const billingResponse = await fetch("/api/create-billing-purchase", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ billingPayload }),
                  });
                 
              
                  const billingResult = await billingResponse.json();
                  console.log("Billing purchase result:", billingResult);
              
                  if (!billingResponse.ok) {
                    console.error("Billing purchase failed:", billingResult);
                    navigate("/payment-fail");
                    return;
                  }
                  console.log("Billing purchase successful");
                  try {
                    localStorage.removeItem("checkoutCart");
                    //await fetch("/api/clear-cart", { method: "POST" });
                  } catch (err) {
                    console.error("Failed to clear local storage cart:", err);
                  }
                  navigate("/payment-success");
                    } else {
                      console.error("No draft order returned:", draftData);
                      navigate(failUrl);
                    }
                  } catch (err) {
                    console.error("Failed to create draft order:", err);
                  }
                })();
              }
            }, [fetcher.state]);
  
            return (
              <AddToCartAnalytics fetcher={fetcher}>
                <input
                  type="hidden"
                  name="analytics"
                  value={JSON.stringify(analytics)}
                />
                <button
                  className={
                    mode == "default"
                      ? twMerge("px-4 py-2 rounded", buttonClassName)
                      : buttonClassName
                  }
                  {...props}
                  disabled={fetcher.state !== "idle" || props.disabled}
                >
                  {fetcher.state !== "idle" ? (
                    <SpinnerIcon width={24} height={24} />
                  ) : (
                    children
                  )}
                </button>
              </AddToCartAnalytics>
            );
          }}
        </CartForm>
      </div>
    );
}



export function AddToCartLink({
  children = 'Add to cart',
  lines,
  analytics,
  mode = 'default',
  buttonClassName,
  loadingContent,
  ...props
}: {
  children?: React.ReactNode;
  lines: CartLineInput[];
  analytics?: unknown;
  mode?: FormMode;
  buttonClassName?: string;
  loadingContent?: React.ReactNode;
  [key: string]: any;
}) {
  const fetcher = useFetcher();

  const onClick = () =>
    fetcher.submit(
      {
        cartFormInput: JSON.stringify({
          action: CartForm.ACTIONS.LinesAdd,
          inputs: {
            lines,
          },
        }),
        analytics: JSON.stringify(analytics),
      },
      {method: 'post', action: '/cart?index'},
    );

  return (
    <AddToCartAnalytics fetcher={fetcher}>
      <button
        className={
          mode == 'default'
            ? twMerge(defaultButtonStyles(), buttonClassName)
            : buttonClassName
        }
        onClick={onClick}
        {...props}
      >
        {fetcher.state === 'submitting' && loadingContent
          ? loadingContent
          : children}
      </button>
    </AddToCartAnalytics>
  );
}

function AddToCartAnalytics({
  fetcher,
  children,
}: {
  fetcher: FetcherWithComponents<any>;
  children: React.ReactNode;
}): JSX.Element {
  const fetcherData = fetcher.data;
  const formData = fetcher.formData;
  const pageAnalytics = usePageAnalytics({hasUserConsent: true});
  const navigate = useNavigate();

  useEffect(() => {
    if (formData) {
      const cartData: Record<string, unknown> = {};
      const cartInputs = CartForm.getFormInput(formData);

      try {
        if (cartInputs.inputs.analytics) {
          const dataInForm: unknown = JSON.parse(
            String(cartInputs.inputs.analytics),
          );
          Object.assign(cartData, dataInForm);
        }
      } catch {
        // do nothing
      }

      if (Object.keys(cartData).length && fetcherData?.cart) {
        const addToCartPayload: ShopifyAddToCartPayload = {
          ...getClientBrowserParameters(),
          ...pageAnalytics,
          ...cartData,
          cartId: fetcherData.cart.id,
        };

        sendShopifyAnalytics({
          eventName: AnalyticsEventName.ADD_TO_CART,
          payload: addToCartPayload,
        });
        let redirectTo = usePrefixPathWithLocale('/cart');
        navigate(redirectTo);
      }
    }
  }, [fetcherData, formData, pageAnalytics]);
  return <>{children}</>;
}
