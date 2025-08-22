import type { ActionFunction } from "@remix-run/node";
import Stripe from "stripe";

type RequestBody = {
  customerId: string;
  priceId: string;
};

export const action: ActionFunction = async ({ request, context }) => {
  const stripe = new Stripe(context.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-11-15" as any,
  });

  const body = (await request.json()) as RequestBody;
  const { customerId, priceId } = body;

  if (!customerId || !priceId) {
    return new Response(JSON.stringify({ error: "Missing customerId or priceId" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // ✅ Create a subscription for recurring price
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: "default_incomplete", // or "error_if_incomplete"
      expand: ["latest_invoice.payment_intent"],
    });

    return new Response(
      JSON.stringify({ subscriptionId: subscription.id }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
