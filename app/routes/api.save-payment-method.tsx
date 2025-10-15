import type { ActionFunction } from "@remix-run/node";
import Stripe from "stripe";

export const action: ActionFunction = async ({ request, context }) => {
  const { env } = context;
  const { email, paymentMethodId } = await request.json();

  if (!paymentMethodId) {
    return new Response(
      JSON.stringify({ success: false, error: "Payment Method ID is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: "2022-11-15" });

  let customer;

  if (email) {
    // Look for all customers with this email
    const existingCustomers = await stripe.customers.list({ email, limit: 100 });
    if (existingCustomers.data.length > 0) {
      // Reuse the first one (or you could choose logic for multiple)
      customer = existingCustomers.data[0];
    } else {
      // Create a new customer
      customer = await stripe.customers.create({ email });
    }
  } else {
    customer = await stripe.customers.create({});
  }

  // Check if payment method is already attached
  const attachedPaymentMethods = await stripe.paymentMethods.list({
    customer: customer.id,
    type: "card",
  });

  const alreadyAttached = attachedPaymentMethods.data.some(pm => pm.id === paymentMethodId);

  if (!alreadyAttached) {
    await stripe.paymentMethods.attach(paymentMethodId, { customer: customer.id });
  }

  // Update default payment method
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
