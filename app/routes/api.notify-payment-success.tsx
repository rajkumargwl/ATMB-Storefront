import { json } from "@remix-run/node";

export async function action({ request }: { request: Request }) {
  const data = await request.json();

  console.log("Payment succeeded, notify backend:", data);

  // Example actions:
  // 1. Update Shopify draft order
  // 2. Save payment info to DB
  // 3. Trigger email or webhook

  return json({ status: "ok" });
}
