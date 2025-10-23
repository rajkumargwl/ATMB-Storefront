import type { ActionFunction } from "@remix-run/node";
import Stripe from "stripe";

export const action: ActionFunction = async ({ request, context }) => {
  const { env } = context;
  const { email, name, paymentMethodId } = await request.json();

  if (!paymentMethodId) {
    return new Response(
      JSON.stringify({ success: false, error: "Payment Method ID is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: "2022-11-15" });

  let customer;

  if (email) {
    // Search for existing customers
    const existingCustomers = await stripe.customers.list({ email, limit: 1 });
    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];

      // Update name if different or missing
      if (name && customer.name !== name) {
        await stripe.customers.update(customer.id, { name });
      }
    } else {
      // Create new customer with email & name
      customer = await stripe.customers.create({ email, name });
    }
  } else {
    // Create customer without email (rare case)
    customer = await stripe.customers.create({ name });
  }

  // Attach payment method if not already attached
  const attachedPaymentMethods = await stripe.paymentMethods.list({
    customer: customer.id,
    type: "card",
  });

  if (!attachedPaymentMethods.data.some(pm => pm.id === paymentMethodId)) {
    await stripe.paymentMethods.attach(paymentMethodId, { customer: customer.id });
  }

  // Set default payment method
  await stripe.customers.update(customer.id, {
    invoice_settings: { default_payment_method: paymentMethodId },
  });

  return new Response(
    JSON.stringify({
      success: true,
      customerId: customer.id,
      defaultPaymentMethodId: paymentMethodId,
    }),
    { headers: { "Content-Type": "application/json" } }
  );
};
