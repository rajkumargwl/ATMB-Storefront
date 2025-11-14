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
      if ((window as any).Rokt) return;
  
      const script = document.createElement("script");
      script.src = "https://apps.rokt.com/wsdk/integrations/launcher.js";
      script.async = true;
      script.crossOrigin = "anonymous";
      script.id = "rokt-launcher";
      document.body.appendChild(script);
  
      await new Promise<void>((resolve) => {
        script.addEventListener("load", () => resolve());
      });
  
      const launcher = await (window as any).Rokt.createLauncher({
        accountId: "3147080751641851509",
        sandbox: false,
      });
  
      await launcher.selectPlacements({
        attributes: {
          email: userData?.email || "",
          firstname: userData?.firstName || "",
          lastname: userData?.lastName || "",
          mobile: userData?.phone || "",
          confirmationref: cart?.id || "",
          amount: cart?.cost?.totalAmount?.amount || "",
          currency: cart?.cost?.totalAmount?.currencyCode || "USD",
        },
      });
    };
  
    console.log("Loading Rokt");
    loadRokt().catch(console.error);
  }, [userData, cart]);
  

  // ✅ Placeholder where Rokt injects the content
  return <div id="rokt-placeholder"></div>;
}
