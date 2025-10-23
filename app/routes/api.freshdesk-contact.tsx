
import { json } from "@shopify/remix-oxygen";
import type { ActionArgs } from "@shopify/remix-oxygen";

export async function action({ request, context }: ActionArgs) {
  const { FRESHDESK_DOMAIN, FRESHDESK_API_KEY } = context.env;
  // Parse JSON body
  const payload = await request.json();

  // Map incoming form fields to Freshdesk fields
  const ticketData = {
    firstname: payload.firstname,
    lastname: payload.lastname,
    email: payload.email,
    phone: payload.phone,
    whatBestDescribesYou: payload.what_best_describes_you_ || "N/A",
    hearAboutUs: payload.how_did_you_hear_about_us_ || "N/A",
    message: payload.message,
    userId: "N/A",
    siteId: "N/A",
  };

  try {
    const result = await createFreshdeskTicket(ticketData, FRESHDESK_DOMAIN, FRESHDESK_API_KEY);
    return json({ success: true, ticketId: result.id });
  } catch (error: any) {
    console.error("Freshdesk API Error:", error.message);
    return json({ success: false, error: error.message }, { status: 500 });
  }
}
async function createFreshdeskTicket(
  {
    firstname,
    lastname,
    email,
    phone,
    whatBestDescribesYou,
    hearAboutUs,
    message,
    userId = "N/A",
    siteId = "N/A",
  }: any,
  FRESHDESK_DOMAIN: string,
  FRESHDESK_API_KEY: string
) {
  const body = {
    email,
    name: `${firstname} ${lastname}`,
    phone,
    subject: `Contact Us Form Submission`,
    description: `Message: ${message}\nBest describes: ${whatBestDescribesYou}\nHeard about us via: ${hearAboutUs}`,
    priority: 1,
    status: 2,
    source: 2,
    custom_fields: {
      cf_rntusrid: userId,
      cf_sitid: siteId,
    },
  };

  const response = await fetch(`https://${FRESHDESK_DOMAIN}/api/v2/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(`${FRESHDESK_API_KEY}:x`),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Freshdesk API Error: ${text}`);
  }

  return response.json();
}

