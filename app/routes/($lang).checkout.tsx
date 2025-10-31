import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from "@stripe/react-stripe-js";

import {Await, useLoaderData, useNavigate} from '@remix-run/react';
import {Suspense} from 'react';
import {useRootLoaderData} from '~/root'; 

import { useEffect,useState } from "react";
import type { LoaderFunction } from "@remix-run/node";
import {DEFAULT_LOCALE, usePrefixPathWithLocale} from '~/lib/utils';

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
import type {Product} from '@shopify/hydrogen/storefront-api-types';
import {notFound} from '~/lib/utils';
import Button from "~/components/elements/Button";

export const loader: LoaderFunction = async ({ context, params }) => {
  const { env } = context;
  
  const customerAccessToken = await context.session.get('customerAccessToken');
  
  if (customerAccessToken === null || customerAccessToken === undefined || customerAccessToken === '') {
    return redirect('/create-account');
  }
      // Fetch customer details
      const customerData = await context.storefront.query<{ customer: { firstName: string; lastName: string; email: string } }>(`
        query getCustomer($customerAccessToken: String!) {
          customer(customerAccessToken: $customerAccessToken) {
            firstName
            lastName
            email
          }
        }
      `, {
        variables: { customerAccessToken },
      });

      const customer = customerData.customer;

      if (!customer) {
        return redirect('/create-account');
      }
  const [virtualMailbox, virtualPhone, BusinessAcc] = await Promise.all([
      context.storefront.query<{product: Product}>(PRODUCT_QUERY, {
        variables: {handle: 'virtual-mailbox', selectedOptions: []},
      }),
      context.storefront.query<{product: Product}>(PRODUCT_QUERY, {
        variables: {handle: 'virtual-phone-number', selectedOptions: []},
      }),
      context.storefront.query<{product: Product}>(PRODUCT_QUERY, {
        variables: {handle: 'business-accelerato', selectedOptions: []},
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
  ];
  
  console.log(customer);


  return new Response(
    JSON.stringify({
      stripePublishableKey: env.STRIPE_PUBLISHABLE_KEY,
      bundleProducts: [virtualMailbox.product, virtualPhone.product],
      essentialsProducts: AllProducts ?? [],
      customer: {
        name: `${customer.firstName} ${customer.lastName}`,
        email: customer.email
      }
    }),
    { headers: { "Content-Type": "application/json" } }
  );
};
function CheckoutForm() {
  const selectedLocale = useRootLoaderData()?.selectedLocale ?? DEFAULT_LOCALE;
  let currencyCode = selectedLocale?.currency || 'USD';
  const stripe = useStripe();
  const elements = useElements();
   const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [priceId, setPriceId] = useState<string | null>(null);
  const rootData = useRootLoaderData();
  const cart = rootData?.cart?._data;
  
useEffect(() => {
  if (cart) {
    try {
      localStorage.setItem("checkoutCart", JSON.stringify(cart));
      console.log("Cart updated in localStorage");
    } catch (error) {
      console.error("Failed to update cart in localStorage:", error);
    }
  }
}, [cart]);

  const lines = cart?.lines?.edges;
  const { bundleProducts, essentialsProducts,customer} = useLoaderData<typeof loader>();
 const getPrefixedPath = usePrefixPathWithLocale2(); 
  
  // Fetch priceId from backend on mount
  useEffect(() => {
    fetch("/api/create-price", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        const typedData = data as { priceId?: string; error?: string };
        if (typedData.priceId) {
          console.log("priceId", typedData.priceId);
          setPriceId(typedData.priceId);
        } else {
          setError("Failed to load price ID");
        }
      })
      .catch(() => setError("Failed to load price ID"));
  }, []);
  /*const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = "/order-confirmation";
    // setLoading(true);
    // setError(null);

    // if (!stripe || !elements) {
    //   setError("Stripe has not loaded yet");
    //   setLoading(false);
    //   return;
    // }

    // const cardElement = elements.getElement(CardElement);
    // if (!cardElement) {
    //   setError("Card Element not found");
    //   setLoading(false);
    //   return;
    // }
    // const draftRes = await fetch("/api/create-draft-order", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     lines: lines,
    //     customerId: rootData?.customer?.id,  
    //   }),
    // });
    
    // const draftData = await draftRes.json();
    // console.log("Draft order created:", draftData);
  
    // if (!draftData?.data?.draftOrderCreate?.draftOrder?.id) {
    //   setError("Failed to create draft order");
    //   setLoading(false);
    //   return;
    // }
  
    // const draftOrderId = draftData?.data?.draftOrderCreate?.draftOrder?.id;

    // const { paymentMethod, error: pmError } = await stripe.createPaymentMethod({
    //   type: "card",
    //   card: cardElement,
    //   billing_details: { email },
    // });

    // if (pmError) {
    //   setError(pmError.message || "Failed to create payment method");
    //   setLoading(false);
    //   return;
    // }

    // const res = await fetch("/api/create-payment-intent", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     email,
    //     paymentMethodId: paymentMethod.id,
    //     priceId,
    //   }),
    // });

    // const data = (await res.json()) as {
    //   clientSecret?: string;
    //   error?: string;
    // };
    
    // if (!data.clientSecret) {
    //   setError(data.error || "Failed to get client secret");
    //   setLoading(false);
    //   return;
    // }
    // console.log("response data" , data);
   

    // const confirmResult = await stripe.confirmCardPayment(data.clientSecret);
    // console.log("Payment confirmation result:", confirmResult);

    // if (confirmResult.error) {
    //   setError(confirmResult.error.message || "Payment confirmation failed");
    // } else if (confirmResult.paymentIntent?.status === "succeeded") {
    //   alert("Subscription successful!");
    // }

    setLoading(false);
  };*/
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    if (!stripe || !elements) {
      setError("Stripe has not loaded yet");
      setLoading(false);
      return;
    }
  
    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);
  
    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
      setError("Card elements not found");
      setLoading(false);
      return;
    }
  
    try {
      const { paymentMethod, error: pmError } = await stripe.createPaymentMethod({
        type: "card",
        card: cardNumberElement, 
        //billing_details: email ? { email } : undefined,
        billing_details: {
          name: customer.name,
          email: customer.email,
        },
      });
  
      if (pmError) {
        setError(pmError.message || "Failed to create payment method");
        setLoading(false);
        return;
      }
  
      // Send paymentMethod.id to your backend
      const res = await fetch("/api/save-payment-method", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: customer.email,
          name: customer.name, 
          paymentMethodId: paymentMethod.id,
        }),
        
      });
  
      const data = await res.json();
      // Log the data to console
      console.log("Backend response:", data);

      if (data.success) {
        const { defaultPaymentMethodId, customerId } = data; 
      
        const resDetails = await fetch("/api/save-payment-details", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerEmail: customer.email,
            paymentIntentId:defaultPaymentMethodId,
            paymentCustomerId:customerId,
          }),
        });
     
       // alert("Payment successful and details saved!");
       localStorage.setItem("checkoutCart", JSON.stringify(cart));
       const redirectTo = getPrefixedPath('/order-confirmation');
       navigate(redirectTo);
      } else {
        setError(data.error || "Failed to save payment method");
      }
    } catch (err) {
      console.error("Error during payment method saving:", err);
      setError("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  
  async function chargeAgain() {
    const response = await fetch("/api/charge-again", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerId: "cus_Sr1qkseza0M0Z4",
        priceId: "price_1RvYWf38luiX6x7kYojGbQW8",
        defaultPaymentMethodId: "pm_1RvJmt38luiX6x7k5t6HnFvm"
      }),
    });

    const data = await response.json();
    console.log("Invoice created:", data);
    alert(JSON.stringify(data, null, 2));
  }
  const VISIBLE_ATTRIBUTES = [
    'locationId',
    'displayName',
    'addressLine1',
    'city',
    'state',
    'postalCode',
    'country',
  ];
  

  return (
    // <div className="mt-20 max-w-md mx-auto p-4 space-y-4">
    //   <form onSubmit={handleSubmit} className="border p-4 rounded shadow space-y-4">
    //     {error && <p className="text-red-500">{error}</p>}

    //     <input
    //       type="email"
    //       placeholder="Email"
    //       required
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       className="border p-2 rounded w-full"
    //     />

    //     <CardElement className="border p-2 rounded" />

    //     <button
    //       type="submit"
    //       disabled={!stripe || loading}
    //       className="bg-blue-500 text-white px-4 py-2 rounded w-full"
    //     >
    //       {loading ? "Processing..." : "Subscribe"}
    //     </button>
    //   </form>

    //   <button
    //     onClick={chargeAgain}
    //     className="bg-green-500 text-white px-4 py-2 rounded w-full"
    //   >
    //     Test Charge Again
    //   </button>
    // </div>
    <>
    <section className="">
      <Suspense fallback={<div className="flex justify-center"><SpinnerIcon /></div>}>
       <Await resolve={rootData?.cart}>
          {(cart) => {
              const availableEssentials = essentialsProducts.filter(
                (product) =>
                  !cart.lines.edges.some(
                    (line) => line.node.merchandise.product.handle === product.handle
                  )
              );
              const firstEssential = availableEssentials.length
              ? availableEssentials[Math.floor(Math.random() * availableEssentials.length)]
              : null;
              return (
                <>
                  {cart && cart.lines.edges.length > 0 && (
                    <div className="">
                      <div className="bg-white px-5 pt-[32px] pb-[40px] md:pb-[60px]">
                        <div className='max-w-[1240px] mx-auto'>
                          <div className='flex flex-row items-center justify-start mb-6 md:mb-10 gap-3 border-b border-[#DCDCDC] pb-5'>
                              <Button
                                onClick={() => window.history.back()}
                                title="Back to cart"
                                type="button"
                                aria-label="Back to cart"
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
                              <h1 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[28px] text-[24px] md:text-[20px] tracking-[-0.36px] md:tracking-[-0.3px]">Back to cart</h1>
                          </div>
                          <div className="mb-8">
                            <h1 className="font-[600] text-[#091019] md:text-[32px] md:leading-[38.4px] md:tracking-[-0.48px] text-[24px] leading-[31.2px] tracking-[-0.36px]">Checkout</h1>
                            <p className="text-[#4D4E4F] font-[400] text-[16px] leading-[24px] mt-1">
                              Get started in seconds and manage your mail anytime, anywhere.
                            </p>
                          </div>
                        </div>
                      
                        <div className="max-w-[1240px] mx-auto gap-[24px] md:gap-[24px] flex flex-col lg:flex-row">
                          <div className="w-full lg:w-[65.35%]">                
                            {/* Removed incorrect role="row" since this isn't part of a grid/table */}
                            <div className="flex flex-col p-6 border border-[#DCDCDC] rounded-[12px]">
                              <h3 className="font-[400] md:font-[600] text-[#091019] md:text-[24px] md:leading-[31.2px] tracking-[-0.48px] text-[20px] leading-[28px]">
                                Payment Details
                              </h3>
                              <p className="text-[#4D4E4F] font-[400] text-[14px] leading-[21px] mt-1">
                                Your transaction and card details are fully secure with our encrypted payment system.
                              </p>
                              
                              <form onSubmit={handleSubmit} className="mt-[20px]">
                                {error && <p className="text-red-500">{error}</p>}

                                {/* Card Number */}
                                <div className="relative">
                                  <CardNumberElement
                                    options={{
                                      style: { base: { fontSize: "16px", color: "#091019" }, invalid: { color: "#FF6600" } },
                                      placeholder: '1212 1212 1212 1212'
                                    }}
                                    className="peer font-[400] peer w-full border border-[#E5E7EB] rounded-[8px] px-4 pt-[30px] pb-2 text-[16px] text-[#091019] leading-[24px] placeholder-[#091019] focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
                                  />
                                  <label
                                    aria-label="Card Number"
                                    className="font-[400] absolute left-4 top-[10px] text-[12px] text-[#4D4E4F]  leading-[18px] peer-placeholder-shown:top-2 peer-placeholder-shown:text-[14px] peer-placeholder-shown:text-[#9CA3AF] transition-all duration-150"
                                  >
                                    Card Number
                                  </label>
                                </div>

                                {/* Expiry & CVC */}
                                <div className="grid grid-cols-2 gap-4 mt-[20px]" role="row">
                                  <div className="relative" role="cell">
                                    <CardExpiryElement
                                      options={{
                                        style: { base: { fontSize: "16px", color: "#091019" }, invalid: { color: "#FF6600" } },
                                        placeholder: '12/2028'
                                      }}
                                      className="peer font-[400] peer w-full border border-[#E5E7EB] rounded-[8px] px-4 pt-[30px] pb-2 text-[16px] text-[#091019] leading-[24px] placeholder-[#091019] focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
                                    />
                                    <label aria-label="Expiry Date" className="font-[400] absolute left-4 top-[10px] text-[12px] text-[#4D4E4F]  leading-[18px] peer-placeholder-shown:top-2 peer-placeholder-shown:text-[14px] peer-placeholder-shown:text-[#9CA3AF] transition-all duration-150">
                                      Expiry Date
                                    </label>
                                  </div>
                                  <div className="relative" role="cell">
                                    <CardCvcElement
                                      options={{
                                        style: { base: { fontSize: "16px", color: "#091019" }, invalid: { color: "#FF6600" } },
                                        placeholder: '126'
                                      }}
                                      className="peer font-[400] peer w-full border border-[#E5E7EB] rounded-[8px] px-4 pt-[30px] pb-2 text-[16px] text-[#091019] leading-[24px] placeholder-[#091019] focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
                                    />
                                    <label aria-label="CVV" className="font-[400] absolute left-4 top-[10px] text-[12px] text-[#4D4E4F]  leading-[18px] peer-placeholder-shown:top-2 peer-placeholder-shown:text-[14px] peer-placeholder-shown:text-[#9CA3AF] transition-all duration-150">
                                      CVV
                                    </label>
                                  </div>
                                </div>

                                {/* Zip & Cardholder */}
                                <div className="grid grid-cols-2 gap-4 mt-[20px]" role="row">
                                  <div className="relative" role="cell">
                                    <input
                                      type="text"
                                      aria-label="Zip Code"
                                      placeholder="11018"
                                      className="peer font-[400] peer w-full border border-[#E5E7EB] rounded-[8px] px-4 pt-[30px] pb-2 text-[16px] text-[#091019] leading-[24px] placeholder-[#b3b3b3] focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
                                    />
                                    <label aria-label="Zip Code" className="font-[400] absolute left-4 top-[10px] text-[12px] text-[#4D4E4F]  leading-[18px] peer-placeholder-shown:top-2 peer-placeholder-shown:text-[14px] peer-placeholder-shown:text-[#4D4E4F] transition-all duration-150">
                                      Zip Code
                                    </label>
                                  </div>
                                  <div className="relative" role="cell">
                                    <input
                                      type="text"
                                      aria-label="Card Holder Name"
                                      placeholder="John Doe"
                                      className="peer font-[400] peer w-full border border-[#E5E7EB] rounded-[8px] px-4 pt-[30px] pb-2 text-[16px] text-[#091019] leading-[24px] placeholder-[#b3b3b3] focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
                                    />
                                    <label aria-label="Card Holder Name" className="font-[400] absolute left-4 top-[10px] text-[12px] text-[#4D4E4F]  leading-[18px] peer-placeholder-shown:top-2 peer-placeholder-shown:text-[14px] peer-placeholder-shown:text-[#4D4E4F] transition-all duration-150">
                                      Card Holder Name
                                    </label>
                                  </div>
                                </div>

                                {/* Terms & Payment Button */}
                                <div className="flex items-center gap-3 mt-[20px]">
                                  <input type="checkbox" id="agree" className="w-4 h-4 accent-[#FF6600]" />
                                  <label htmlFor="agree" aria-label="Agree" className="text-[14px] text-[#4D4E4F] font-[400] leading-[21px]">
                                    I agree to the{' '}
                                    <a href="#" className="text-[#FF6600] underline">
                                      terms & conditions
                                    </a>{' '}
                                    and{' '}
                                    <a href="#" className="text-[#FF6600] underline">
                                      privacy policy
                                    </a>
                                  </label>
                                </div>

                                <button
                                  type="submit"
                                  disabled={!stripe || loading}
                                  className="flex items-center justify-center mt-5 bg-[#FF6600] h-[52px] hover:bg-[#e55a00] px-4 text-white font-medium text-[16px] py-3 rounded-full transition-all w-full"
                                >
                                  {loading ? (
                                    "Processing..."
                                  ) : (
                                    <>
                                      Make Payment
                                      {cart?.cost?.subtotalAmount && (
                                        <>
                                          {"  -  "}
                                          <Money data={{ amount: cart?.cost?.subtotalAmount?.amount, currencyCode: currencyCode }} />
                                        </>
                                      )}
                                    </>
                                  )}
                                </button>
                              </form>
                            </div>
                          </div>

                          <div className="w-full lg:w-[34.65%] md:sticky md:top-[80px] space-y-6">
                            <CartSummary cart={cart} cost={cart.cost} />
                          </div>
                        </div>

          
                      </div>
                      
                    </div>
                  )}
          
                  {!cart?.lines?.edges?.length && (
                    <div className="mx-auto max-w-[1240px] text-center flex flex-col gap-6">
                      <h1 className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[38.4px] text-[24px] md:text-[32px] tracking-[-0.36px] md:tracking-[-0.48px]">Your Cart is Empty</h1>
                      <p className="font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">Looks like you haven't added anything to your cart yet.</p>
                      <a
                        href="/"
                        className="flex items-center justify-center bg-DarkOrange text-white font-normal font-Roboto text-[16px] tracking-[0.08px] py-[12px] px-4 rounded-full h-[52px]"
                      >
                        Continue Shopping
                      </a>
                    </div>
                  )}
                </>
              );
          }}
          </Await>
         </Suspense>
       </section>
    </>
  
  );
}

/*function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [priceId, setPriceId] = useState<string | null>(null);
 

  // Fetch priceId from backend on mount
  useEffect(() => {
    fetch("/api/create-price", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        const typedData = data as { priceId?: string; error?: string };
        if (typedData.priceId) {
          console.log("priceId", typedData.priceId);
          setPriceId(typedData.priceId);
        } else {
          setError("Failed to load price ID");
        }
      })
      .catch(() => setError("Failed to load price ID"));
  }, []);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setError("Stripe has not loaded yet");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card Element not found");
      setLoading(false);
      return;
    }

    // Create Payment Method using card details
    const { paymentMethod, error: pmError } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: { email },
    });

    if (pmError) {
      setError(pmError.message || "Failed to create payment method");
      setLoading(false);
      return;
    }

    // Call backend to create subscription and get client secret
    const res = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        paymentMethodId: paymentMethod.id,
        priceId,
      }),
    });


    const data = (await res.json()) as {
      clientSecret?: string;
      error?: string;
    };
    
    if (!data.clientSecret) {
      setError(data.error || "Failed to get client secret");
      setLoading(false);
      return;
    }
    console.log("response data" , data);
    // Confirm the payment intent (handles 3D Secure if needed)
    const confirmResult = await stripe.confirmCardPayment(data.clientSecret);
    // Log entire response object to see what you get
    console.log("Payment confirmation result:", confirmResult);
    if (confirmResult.error) {
      setError(confirmResult.error.message || "Payment confirmation failed");
    } else if (confirmResult.paymentIntent?.status === "succeeded") {
      alert("Subscription successful!");
    }

    setLoading(false);
  };

  return (
    <div className="mt-20 max-w-md mx-auto p-4 space-y-4">
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow space-y-4">
        {error && <p className="text-red-500">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <CardElement className="border p-2 rounded" />

        <button
          type="submit"
          disabled={!stripe || loading}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Processing..." : "Subscribe"}
        </button>
      </form>
    </div>
  );



  
}*/

export default function CheckoutPage() {
  const { stripePublishableKey } = useLoaderData<{ stripePublishableKey: string }>();
  const stripePromise = loadStripe(stripePublishableKey);

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export function usePrefixPathWithLocale2() {
  const selectedLocale = useRootLoaderData()?.selectedLocale ?? DEFAULT_LOCALE;

  return (path?: string | null) => {
    if (!path) return selectedLocale.pathPrefix || '/';
    return `${selectedLocale.pathPrefix}${path.startsWith('/') ? path : '/' + path}`;
  };
}
