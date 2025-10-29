import type { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ context }) => {
  try {
    console.log("🧹 Inside clear cart");

    const currentCart = await context.cart.get();

    if (!currentCart || !currentCart.id) {
      console.warn("⚠️ No active cart found to clear");
      return new Response(
        JSON.stringify({ success: false, message: "No active cart found" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const lineIds =
      currentCart.lines?.edges?.map((edge: any) => edge.node.id) || [];

    if (lineIds.length === 0) {
      console.log("🧺 Cart already empty");
      return new Response(
        JSON.stringify({ success: true, message: "Cart already empty" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // Remove all lines
    const clearedCart = await context.cart.removeLines(lineIds);

    console.log(
      "✅ Cart cleared successfully. New cart state:",
      clearedCart?.cart?.id || clearedCart?.id || "(no ID returned)"
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: "Cart cleared successfully",
        cartId: clearedCart?.cart?.id || clearedCart?.id || null,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("❌ Failed to clear cart:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
