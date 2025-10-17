import { json } from "@shopify/remix-oxygen";
import type { ActionArgs } from "@shopify/remix-oxygen";

export async function action({ request, context }: ActionArgs) {
  const { FRESHDESK_DOMAIN, FRESHDESK_API_KEY } = context.env;

  const formData = await request.formData();
  const payload = {
    company: formData.get("company") as string,
    firstname: formData.get("firstname") as string,
    lastname: formData.get("lastname") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    whatBestDescribesYou: formData.get("what_best_describes_you_") as string,
    hearAboutUs: formData.get("how_did_you_hear_about_us_") as string,
    message: formData.get("message") as string,
  };

  try {
    await createFreshdeskTicket(payload, FRESHDESK_DOMAIN, FRESHDESK_API_KEY);
    return json({ success: true });
  } catch (error: any) {
    console.error("Freshdesk API Error:", error);
    return json({ success: false, error: error.message }, { status: 500 });
  }
}

async function createFreshdeskTicket(
  { company, firstname, lastname, email, phone, whatBestDescribesYou, hearAboutUs, message }: any,
  FRESHDESK_DOMAIN: string,
  FRESHDESK_API_KEY: string
) {
  const body = {
    email,
    name: `${firstname} ${lastname}`,
    phone,
    subject: `Contact Us Form Submission from ${company}`,
    description: `Message: ${message}\nBest describes: ${whatBestDescribesYou}\nHeard about us via: ${hearAboutUs}`,
    priority: 1,
    status: 2,
    source: 2,
    custom_fields: {
      company_name: company,
    },
  };

  const response = await fetch(`https://${FRESHDESK_DOMAIN}/api/v2/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(`${FRESHDESK_API_KEY}:x`), // <-- fixed
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Freshdesk API Error: ${text}`);
  }

  return response.json();
}
