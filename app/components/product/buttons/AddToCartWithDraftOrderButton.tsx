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

type FormMode = 'default' | 'inline';


export default function AddToCartWithDraftOrderButton({
  children = 'Add to cart',
  lines,
  analytics,
  mode = 'default',
  buttonClassName,
  customerId,
  ...props
}: {
  children?: React.ReactNode;
  //lines: CartLineInput[];
  lines: (CartLineInput & { properties?: Record<string, any> })[]; // ✅ allow properties
  analytics?: unknown;
  mode?: FormMode;
  buttonClassName?: string;
  customerId: string | null;
  [key: string]: any;
}) {
    const hasSubmitted = useRef(false);

    return (
      <div className={mode == "inline" ? "[&>*]:inline" : ""}>
        <CartForm
          route={`/cart`}
          inputs={{ lines }}
          action={CartForm.ACTIONS.LinesAdd}
        >
          {(fetcher) => {
            // 👇 Run side-effect when AddToCart completes
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
  
                // ✅ Call Draft Order API
                (async () => {
                  try {
                    const draftRes = await fetch("/api/create-draft-order", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        lines,
                        customerId,
                      }),
                    });
  
                    const draftData = await draftRes.json();
                    console.log("✅ Draft order created:", draftData);
                  } catch (err) {
                    console.error("❌ Failed to create draft order:", err);
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
        navigate('/cart');
      }
    }
  }, [fetcherData, formData, pageAnalytics]);
  return <>{children}</>;
}
