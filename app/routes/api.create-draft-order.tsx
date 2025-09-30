import type { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request, context }) => {
  const body = await request.json();
  const { lines, customerId } = body;

  const query = `
    mutation draftOrderCreate($input: DraftOrderInput!) {
      draftOrderCreate(input: $input) {
        draftOrder {
          id
          name
          invoiceUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  // Convert incoming lines into Shopify draft order lineItems
  const lineItems = lines.map((line: any) => ({
    variantId: line?.node?.merchandise?.id,
    quantity: line?.node?.quantity,
  }));

  const variables = {
    input: {
      lineItems,
      customerId,
      useCustomerDefaultAddress: true,
    },
  };

  interface Env {
    PUBLIC_STORE_DOMAIN: string;
    SHOPIFY_ADMIN_API_TOKEN: string;
  }

  const shopDomain = context.env.PUBLIC_STORE_DOMAIN;
  const token = context.env.SHOPIFY_ADMIN_API_TOKEN;

  if (!shopDomain || !token) {
    console.error("Shopify domain or token is missing!");
    return { error: "Shopify domain or token is not set in environment variables." };
  }

  try {
    const response = await fetch(
      `https://${shopDomain}/admin/api/2025-01/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": token,
        },
        body: JSON.stringify({ query, variables }),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("Shopify API returned error:", response.status, text);
      return { error: `Shopify API returned status ${response.status}`, details: text };
    }

    const data = await response.json();
    console.log("Draft order create response:", JSON.stringify(data, null, 2));
    return data;

  } catch (err: any) {
    console.error("Fetch failed:", err);
    return { error: "Fetch failed", details: err.message };
  }
};

