import type { ActionFunction } from '@remix-run/node';
import Stripe from 'stripe';

type RequestBody = {
  email: string;
  paymentMethodId: string;
  priceId: string;
};

export const action: ActionFunction = async ({ request, context }) => {
  const stripe = new Stripe(context.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' as any });

  const body = (await request.json()) as RequestBody;
  const { email, paymentMethodId, priceId } = body;

  if (!email || !paymentMethodId || !priceId) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
      // Create or retrieve existing customer - here we just create new for simplicity
      let customer;

      const existingCustomers = await stripe.customers.list({ email, limit: 1 });

      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0];
        console.log("existing customer found:", customer.id);
      } else {
        customer = await stripe.customers.create({
          email,
          payment_method: paymentMethodId,
          invoice_settings: {
            default_payment_method: paymentMethodId,
          },
        });
        console.log("new customer created:", customer.id);
      }

    // Create subscription with the priceId passed from frontend
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete', // so payment confirmation is needed if required
      expand: ['latest_invoice.payment_intent'], // expand payment intent info
      collection_method: 'charge_automatically',
    });
    const subscriptionId = subscription.id;
    const customerId = subscription.customer as string;
    const priceIdFromSubscription = subscription.items.data[0].price.id;
    const defaultPaymentMethodId = customer.invoice_settings.default_payment_method; 
    // Get client secret to confirm payment on frontend if required
    
    const latestInvoice = subscription.latest_invoice;
    let clientSecret: string | undefined;

    if (typeof latestInvoice !== 'string') {
      const invoice = latestInvoice as Stripe.Invoice & {
        payment_intent?: Stripe.PaymentIntent;
      };
    
      if (invoice.payment_intent && typeof invoice.payment_intent !== 'string') {
        // client_secret can be null, so convert null to undefined
        clientSecret = invoice.payment_intent.client_secret ?? undefined;
      }
    }
        
    // return new Response(JSON.stringify({
    //   subscriptionId: subscription.id,
    //   clientSecret,
    // }), {
    //   headers: { 'Content-Type': 'application/json' },
    // });
     // Return all necessary details for frontend and database
     return new Response(
      JSON.stringify({
        subscriptionId,
        customerId,
        priceId: priceIdFromSubscription,
        defaultPaymentMethodId,
        clientSecret,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
