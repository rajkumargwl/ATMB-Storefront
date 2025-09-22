import { redirect } from "@shopify/remix-oxygen";

export async function loader({ context, request }) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  if (!token) return redirect("/login");

  const { session, cart } = context;

  const tokenFromUrl = url.searchParams.get("token");
  console.log("customerAccessToken (from URL)", tokenFromUrl);

  if (tokenFromUrl) {
    // Save token in session
    session.set("customerAccessToken", tokenFromUrl);

    // Sync customerAccessToken with existing cart
    const result = await cart.updateBuyerIdentity({ customerAccessToken: tokenFromUrl });

    // Build headers safely
    const headers = new Headers();

    // 1. Persist cart id
    const cartHeaders = cart.setCartId(result.cart.id);
    cartHeaders.forEach((value, key) => headers.append(key, value));

    // 2. Persist session
    headers.append("Set-Cookie", await session.commit());
    return redirect("/account", { headers });
    
  }

  return redirect("/account");
  
}
