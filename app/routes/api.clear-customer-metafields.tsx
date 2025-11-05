import type { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ context }) => {
  try {

    const shopDomain = context.env.PUBLIC_STORE_DOMAIN;
    const token = context.env.SHOPIFY_ADMIN_API_TOKEN;

    if (!shopDomain || !token) {
      throw new Error("Missing Shopify Admin API credentials");
    }

    //Get customer access token from session
    const customerAccessToken = await context.session.get("customerAccessToken");
    if (!customerAccessToken) {
      throw new Error("Customer not logged in or token missing");
    }

    // fetch customer ID dynamically from Storefront API
    const customerQuery = `
      query GetCustomer($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
          id
        }
      }
    `;

    const customerRes = await context.storefront.query(customerQuery, {
      variables: { customerAccessToken },
    });

    const customerId = customerRes?.customer?.id;


    if (!customerId) {
      throw new Error("Customer not found or invalid access token");
    }

    // Clear metafield
    const UPDATE_METAFIELD_MUTATION = `
      mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
        metafieldsSet(metafields: $metafields) {
          metafields {
            id
            key
            value
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      metafields: [
        {
          ownerId: customerId,
          namespace: "custom",
          key: "payment_details",
          type: "json",
          value: "{}", 
        },
      ],
    };

    const response = await fetch(
      `https://${shopDomain}/admin/api/2025-01/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": token,
        },
        body: JSON.stringify({ query: UPDATE_METAFIELD_MUTATION, variables }),
      }
    );

    const data = await response.json();
   // console.log("Clear metafield response:", JSON.stringify(data, null, 2));

    const userErrors = data?.data?.metafieldsSet?.userErrors;
    if (userErrors?.length) {
      console.error("Shopify returned errors:", userErrors);
      return new Response(
        JSON.stringify({ success: false, errors: userErrors }),
        { status: 400 }
      );
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    console.error("Error clearing metafields:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to clear metafields",
        details: error.message,
      }),
      { status: 500 }
    );
  }
};
