// app/components/RoktIntegration.client.tsx
import { useEffect } from "react";

export default function RoktIntegration({ userData, cart }: { userData?: any; cart?: any }) {
  useEffect(() => {

    // Only run in the browser
    const loadRokt = async () => {
      if (window.Rokt) return; // prevent double loading

      const orderId = cart?.id || "";
      const total = cart?.cost?.totalAmount?.amount || "";
      const currencyCode = cart?.cost?.totalAmount?.currencyCode || "USD";

      const target = document.head || document.body;
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://apps.rokt.com/wsdk/integrations/launcher.js";
      script.crossOrigin = "anonymous";
      script.async = true;
      script.id = "rokt-launcher";
      target.appendChild(script);

      await new Promise<void>((resolve) => {
        if (window.Rokt) resolve();
        else
          script.addEventListener("load", () => {
            resolve();
          });
      });

      const launcher = await window.Rokt.createLauncher({
        accountId: "3147080751641851509", 
        sandbox: true, // false in production
      });

      await launcher.selectPlacements({
        attributes: {
          email: userData?.email || "",
          firstname: userData?.firstName || "",
          lastname: userData?.lastName || "",
          mobile: userData?.phone || "",
          confirmationref: "",
          amount: total,
          currency: currencyCode,
          paymenttype: "",
          ccbin: "",
          zipcode: "",
          country: "",
          language: "",
        },
      });
    };

    loadRokt();
  },  [userData, cart]);

  return null; // no UI, script only
}
