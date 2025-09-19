// app/routes/proxy/redirect-to-hydrogen.tsx
import { redirect } from "@remix-run/node";
import type { LoaderArgs, ActionArgs } from "@remix-run/node";
import { authenticate } from "~/shopify.server"; // adapt to your project

const HYDROGEN_URL = process.env.HYDROGEN_URL || "https://atmb-f69287bd1bb487ccbb38.o2.myshopify.dev";

// small helper to avoid open-redirects: allow only exact host(s)
function isAllowedHydrogenTarget(target: string) {
  try {
    const u = new URL(target);
    return ["atmb-f69287bd1bb487ccbb38.o2.myshopify.dev", "www.atmb-f69287bd1bb487ccbb38.o2.myshopify.dev"].includes(u.hostname);
  } catch {
    return false;
  }
}

export async function loader({ request }: LoaderArgs) {
  // Optional: validate that this came through Shopify App Proxy
  // authenticate.public.appProxy will throw if invalid or return a context
  try {
    await authenticate.public.appProxy(request);
  } catch (err) {
    // Log/monitor. You can still choose to redirect to a safe default.
    console.warn("AppProxy validation failed:", err);
  }

  const url = new URL(request.url);
  const qs = url.search; // preserve query params if any
  const target = `${HYDROGEN_URL}${qs}`;

  // safety check
  if (!isAllowedHydrogenTarget(target)) {
    return redirect(HYDROGEN_URL);
  }

  return redirect(target); // 302 by default
}

export async function action({ request }: ActionArgs) {
  // Handle POSTs (e.g., if IdP posts RelayState or form data)
  const form = await request.formData();

  // Common name for SAML relay is 'RelayState' but miniOrange might use other names.
  let relay = form.get("RelayState") || form.get("redirect") || "/";

  // Convert and sanitize
  relay = String(relay);
  let final = relay;
  if (!/^https?:\/\//i.test(final)) {
    // treat as path on hydrogen
    final = `${HYDROGEN_URL}${final.startsWith("/") ? final : "/" + final}`;
  }

  // final safety check
  if (!isAllowedHydrogenTarget(final)) {
    final = HYDROGEN_URL;
  }

  return redirect(final);
}
