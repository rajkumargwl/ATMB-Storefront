import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useEffect,useState } from "react";
import type { LoaderFunction } from "@remix-run/node";

import { useLoaderData } from "@remix-run/react";
import {
  redirect,
} from '@shopify/remix-oxygen';

export const loader: LoaderFunction = async ({ context, params }) => {
  const { env } = context;
  const customerAccessToken = await context.session.get('customerAccessToken');
  
  if (customerAccessToken === null || customerAccessToken === undefined || customerAccessToken === '') {
    return redirect(params.lang ? `${params.lang}/register` : '/account/register');
  }

  return new Response(
    JSON.stringify({
      stripePublishableKey: env.VITE_STRIPE_PUBLISHABLE_KEY,
    }),
    { headers: { "Content-Type": "application/json" } }
  );
};
function CheckoutForm() {
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
   

    const confirmResult = await stripe.confirmCardPayment(data.clientSecret);
    console.log("Payment confirmation result:", confirmResult);

    if (confirmResult.error) {
      setError(confirmResult.error.message || "Payment confirmation failed");
    } else if (confirmResult.paymentIntent?.status === "succeeded") {
      alert("Subscription successful!");
    }

    setLoading(false);
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

  return (
    <div className="mt-20 max-w-md mx-auto p-4 space-y-4">
      {/* Subscription Form */}
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

      {/* Test Charge Again Button */}
      <button
        onClick={chargeAgain}
        className="bg-green-500 text-white px-4 py-2 rounded w-full"
      >
        Test Charge Again
      </button>
    </div>
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
