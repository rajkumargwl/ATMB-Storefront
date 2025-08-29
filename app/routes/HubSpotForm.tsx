import { useEffect, useRef } from "react";

export default function HubSpotForm() {
  const formLoadedRef = useRef(false); // Prevent double render

  useEffect(() => {
    if (formLoadedRef.current) return; // Skip if already loaded
    formLoadedRef.current = true;

    const loadForm = () => {
      const formContainer = document.getElementById("hubspotForm");
      if (formContainer) {
        formContainer.innerHTML = ""; // Clear previous
      }

      // @ts-ignore
      window.hbspt.forms.create({
        portalId: "243584369",
        formId: "94df493b-4e07-4780-9452-a2c38b87bbab",
        target: "#hubspotForm"
      });
    };

    if (window.hbspt) {
      loadForm();
    } else {
      if (!document.querySelector('script[src="//js-na2.hsforms.net/forms/embed/v2.js"]')) {
        const script = document.createElement("script");
        script.src = "//js-na2.hsforms.net/forms/embed/v2.js";
        script.async = true;
        script.onload = loadForm;
        document.body.appendChild(script);
      } else {
        const interval = setInterval(() => {
          if (window.hbspt) {
            clearInterval(interval);
            loadForm();
          }
        }, 50);
      }
    }
  }, []);

  return <div id="hubspotForm"></div>;
}
