
import type { ActionFunction } from '@remix-run/node';
import Stripe from 'stripe';

export const action: ActionFunction = async ({ context }) => {
  const stripe = new Stripe(context.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' as any });

  try {
    const product = await stripe.products.create({
      name: 'Pro Plan',
    });

    const price = await stripe.prices.create({
      unit_amount: 5000, // ₹50.00
      currency: 'inr',
      recurring: { interval: 'month' },
      product: product.id,
    });

    return new Response(JSON.stringify({ priceId: price.id }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Error creating price' }), { status: 500 });
  }
};
