// /api/save-payment-details.ts
import type { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request, context }) => {
  const { env } = context;

  try {
    const body = await request.json();
console.log("Incoming payment details:", body);

const { customerEmail, paymentIntentId, paymentCustomerId } = body;
    if (!customerEmail) {
      return new Response(
        JSON.stringify({ success: false, error: "Customer email is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Step 1: Fetch customer ID from Shopify using email
    const customerQuery = `
      query getCustomerByEmail($query: String!) {
        customers(first: 1, query: $query) {
          edges {
            node {
              id
              email
            }
          }
        }
      }
    `;
const SHOP_DOMAIN = env.PUBLIC_STORE_DOMAIN;

    const customerResponse = await fetch(
      `https://${SHOP_DOMAIN}/admin/api/2024-04/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": env.SHOPIFY_ADMIN_API_TOKEN,
        },
        body: JSON.stringify({
          query: customerQuery,
          variables: { query: `email:${customerEmail}` },
        }),
      }
    );

    const customerData = await customerResponse.json();
    const customerId =
      customerData?.data?.customers?.edges?.[0]?.node?.id || null;

    if (!customerId) {
      return new Response(
        JSON.stringify({ success: false, error: "Customer not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Step 2: Save payment details in customer metafield
    const mutation = `
      mutation customerUpdate($input: CustomerInput!) {
        customerUpdate(input: $input) {
          customer {
            id
            metafields(first: 5) {
              edges {
                node {
                  namespace
                  key
                  value
                }
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const metafieldPayload = {
      input: {
        id: customerId,
        metafields: [
          {
            namespace: "custom",
            key: "payment_details",
            type: "json",
            value: JSON.stringify({
              paymentMethodId:paymentIntentId,
              customerPaymentKey:paymentCustomerId,
              date: new Date().toISOString(),
            }),
          },
        ],
      },
    };

    const mutationResponse = await fetch(
      `https://${SHOP_DOMAIN}/admin/api/2024-04/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": env.SHOPIFY_ADMIN_API_TOKEN,
        },
        body: JSON.stringify({
          query: mutation,
          variables: metafieldPayload,
        }),
      }
    );

    const result = await mutationResponse.json();

    if (result.data?.customerUpdate?.userErrors?.length) {
      console.error("Shopify userErrors:", result.data.customerUpdate.userErrors);
      return new Response(
        JSON.stringify({
          success: false,
          error: result.data.customerUpdate.userErrors[0].message,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: result.data }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error saving payment details:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
