import type { ActionFunction } from "@remix-run/node";

import { getBillingToken } from "./api.get-billing-token";
// This route creates a billing purchase by sending a request to an external billing service
export const action: ActionFunction = async ({ request, context }) => {
  try {
    const { env } = context;

    const { billingPayload } = await request.json();
 
    const accessToken = await getBillingToken(env);

    const billingConfig = {
      baseUrl: env.BILLING_ANYTIME_BASE_URL,
      subscriptionKey: env.BILLING_ANYTIME_SUBSCRIPTION_KEY,
    };

    const purchaseResponse = await fetch(`${billingConfig.baseUrl}/purchase`, {
      method: "POST",
      headers: {
        "Api-Version": "v1",
        "Api-Environment": "dev",
        "Ocp-Apim-Subscription-Key": billingConfig.subscriptionKey,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(billingPayload),
    });

    const result = await purchaseResponse.json();

    if (!purchaseResponse.ok) {
      return new Response(JSON.stringify({ success: false, error: result }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ success: true, result }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Billing purchase failed:", err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

