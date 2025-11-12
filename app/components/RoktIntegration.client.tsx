import { useEffect } from "react";

export default function RoktIntegration({
  userData,
  cart,
}: {
  userData?: any;
  cart?: any;
}) {
  useEffect(() => {
    const loadRokt = async () => {
      // Avoid double loading
      if ((window as any).Rokt) return;

      // Create and inject the Rokt script
      const target = document.head || document.body;
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://apps.rokt.com/wsdk/integrations/launcher.js";
      script.fetchPriority = "high";
      script.crossOrigin = "anonymous";
      script.async = true;
      script.id = "rokt-launcher";
      target.appendChild(script);

      // Wait for the script to load
      await new Promise<void>((resolve) => {
        if ((window as any).Rokt) resolve();
        else
          script.addEventListener("load", () => {
            resolve();
          });
      });

      // Initialize Rokt Launcher
      const launcher = await (window as any).Rokt.createLauncher({
        accountId: "3147080751641851509",
        sandbox: false, // ❗️Set to false in production
      });

      // Send customer and order data
      await launcher.selectPlacements({
        attributes: {
          email: userData?.email || "",
          firstname: userData?.firstName || "",
          lastname: userData?.lastName || "",
          mobile: userData?.phone || "",
          confirmationref: cart?.id || "",
          amount: cart?.cost?.totalAmount?.amount || "",
          currency: cart?.cost?.totalAmount?.currencyCode || "USD",
          paymenttype: "",
          ccbin: "",
          zipcode: "",
          country: "",
          language: "",
        },
      });
    };

    // Trigger when the page fully loads
    window.addEventListener("load", () => {
      console.log("Rokt start");
      loadRokt().then(() => console.log("Rokt end"));
    });
  }, [userData, cart]);

  // ✅ Placeholder where Rokt injects the content
  return <div id="rokt-placeholder"></div>;
}
