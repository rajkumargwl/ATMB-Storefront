import React, { useEffect, useRef, useState } from "react";
import Contact from "~/components/media/contact.png";
import RightArrowWhite from '~/components/icons/RightArrowWhite';
 
type ContactUsProps = {
  data?: {
    title?: string;
    formTitle?: string;
    formDescription?: string;
    supportSection?: {
      sectionTitle?: string;
      sectionDescription?: string;
      supportItems?: {
        title?: string;
        note?: string;
        icon?: { url?: string };
        contacts?: {
          icon?: { url?: string };
          number?: string;
          phoneLink?: string | null;
        }[];
      }[];
    };
    quickLinks?: { label?: string; url?: string | null }[];
  };
};
 
export default function ContactUsSection({ data }: ContactUsProps) {
  if (!data) return null;
 
  const recaptchaRef = useRef<HTMLDivElement | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
 
  // Load Google reCAPTCHA script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    document.body.appendChild(script);
  
    // Define global callback for reCAPTCHA
    (window as any).onRecaptchaSuccess = (token: string) => {
      setRecaptchaToken(token);
    };
  }, []);
  
  
  // const HUBSPOT_PORTAL_ID = '244116084';
  // const HUBSPOT_FORM_ID = '3fb77e45-e6b4-4275-ad2f-4ef212666d0d';
  const HUBSPOT_PORTAL_ID = '47460136'; //client's HubSpot Portal ID
  const HUBSPOT_FORM_ID = '24cefeaf-82b5-412a-976a-c348ec39d319'; //client's HubSpot Form ID
  const formRef = useRef<HTMLFormElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const messageRef = useRef<HTMLParagraphElement | null>(null);

    useEffect(() => {
      if (successMessage || errorMessage) {
        messageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        const timer = setTimeout(() => {
          setSuccessMessage(null);
          setErrorMessage(null);
        }, 5000); // Auto-hide success & error messages after 5 seconds

        return () => clearTimeout(timer);
      }
    }, [successMessage, errorMessage]);
   
  const sanitizeInput = (str: string) => {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;");
  };
  
  const validateForm = (payload: Record<string, any>) => {
    const errors: string[] = [];
  
    // Common malicious patterns
    const xssRegex = /<script|<\/script|<img|onerror=|onload=|onclick=|javascript:|<.*?>/i;
    const sqlRegex = /\b(drop table|sleep\(|union select|--|;|\/\*|\*\/|xp_)\b/i;
  
    const validateField = (
      field: string,
      value: string,
      max: number
    ) => {
      if (!value || value.trim() === "") {
        errors.push(`${field} is required.`);
        return;
      }
  
      // Length check
      if (value.length > max) {
        errors.push(`${field} must be at most ${max} characters.`);
      }
  
      // XSS check
      if (xssRegex.test(value)) {
        errors.push(`${field} contains invalid or unsafe characters.`);
      }
  
      // SQL Injection check
      if (sqlRegex.test(value)) {
        errors.push(`${field} contains prohibited input.`);
      }
    };
  
    validateField("First name", payload.firstname as string, 255);
    validateField("Last name", payload.lastname as string, 50);
  
    // Email specific validation
    if (!payload.email) {
      errors.push("Email is required.");
    } else {
      if (payload.email.length > 30)
        errors.push("Email must be less than 30 characters.");
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(payload.email))
        errors.push("Invalid email format.");
  
      if (xssRegex.test(payload.email) || sqlRegex.test(payload.email)) {
        errors.push("Email contains invalid characters.");
      }
    }
  
    validateField("Phone number", payload.phone as string, 20);
    validateField("Message", payload.message as string, 500);
    validateField("Company name", payload.company as string, 100);
    validateField("Job title", payload.what_best_describes_you_ as string, 100);
    validateField("Referral source", payload.how_did_you_hear_about_us_ as string, 100);
  
    return errors;
  };
  
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
 
    if (!recaptchaToken) {
      //alert("Please verify you are not a robot before submitting.");
        setErrorMessage("Please verify you are not a robot before submitting.");
        setSuccessMessage(null);
          return;
    }
  
    const formData = new FormData(e.currentTarget);
   // const payload = Object.fromEntries(formData.entries()); // convert to JSON
  

    // Sanitize inputs
    const payload = Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => [
        key,
        typeof value === "string" ? sanitizeInput(value) : value
      ])
    );
  
    // Validate inputs
    const validationErrors = validateForm(payload);
    if (validationErrors.length > 0) {
      //alert(validationErrors.join("\n"));
      setErrorMessage(validationErrors.join("\n"));
      setSuccessMessage(null);
      return;
    }
    try {
      const freshdeskResponse = await fetch("/api/freshdesk-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      const freshdeskResult = await freshdeskResponse.json();
 
      if (!freshdeskResult?.success) {
        let validationErrors: any[] | undefined;
      
        // If error is a string, try to extract JSON
        if (typeof freshdeskResult.error === "string") {
          try {
            // Find the first '{' to extract JSON
            const jsonStart = freshdeskResult.error.indexOf("{");
            if (jsonStart !== -1) {
              const jsonPart = freshdeskResult.error.slice(jsonStart);
              const parsed = JSON.parse(jsonPart);
              validationErrors = parsed.errors;
            }
          } catch (err) {
            console.error("Error parsing Freshdesk error string:", err);
          }
        } else if (Array.isArray(freshdeskResult.error?.errors)) {
          validationErrors = freshdeskResult.error.errors;
        } else if (Array.isArray(freshdeskResult.errors)) {
          validationErrors = freshdeskResult.errors;
        }
      
        //console.log("validationErrors", validationErrors);
      
        if (validationErrors && Array.isArray(validationErrors)) {
          const messages = validationErrors.map((err: any) => {
            switch (err.field) {
              case "email":
                return "Please enter a valid email address.";
              case "phone":
                return "Please enter a valid phone number.";
              default:
                return err.message || "There was an error with this field.";
            }
          }).join("\n");
          //alert(messages);
          setErrorMessage(messages);
          setSuccessMessage(null);
          return;
        } else {
          //alert("Error submitting Freshdesk form. Please try again.");
          setErrorMessage("Error submitting form. Please try again.");
          setSuccessMessage(null);
          return;
          
        }
      }
      
 
      const hubspotData = {
        fields: [
          { name: "company", value: formData.get("company") },
          { name: "firstname", value: formData.get("firstname") },
          { name: "lastname", value: formData.get("lastname") },
          { name: "email", value: formData.get("email") },
          { name: "phone", value: formData.get("phone") },
          { name: "onboarding_how_heard", value: formData.get("how_did_you_hear_about_us_") },
          { name: "onboarding_description", value: formData.get("message") },
          { name: "jobtitle", value: formData.get("what_best_describes_you_") },
        ],
      };
 
      const hubspotResponse = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(hubspotData),
        }
      );
 
      if (hubspotResponse.status !== 200) {
        const errorText = await hubspotResponse.text();
        console.error("HubSpot submission error:", errorText);
        //alert(`Error submitting HubSpot form: ${errorText}`);
        setErrorMessage("Error submitting HubSpot form. Please try again.");
        setSuccessMessage(null);
        return;

        return;
      }
 
      // --- Success message (only if both succeed) ---
     // alert("Thank you! Your form has been submitted.");
      setSuccessMessage("Thank you! Your form has been submitted.");
      setErrorMessage(null);

     
      // setRecaptchaToken(null);
      // if (window.grecaptcha && recaptchaRef.current) {
      //   window.grecaptcha.reset();
      // }
      setTimeout(() => {
        if (formRef.current) {
          formRef.current.reset();
        }
        setRecaptchaToken(null);
      
        if (window.grecaptcha && recaptchaRef.current) {
          window.grecaptcha.reset();
        }
      }, 100);
     
    } catch (error: any) {
      console.error("Form submission error:", error);
      alert(`Error submitting form: ${error.message}`);
    }
  };
  
  return (
    <section className="px-5 py-[40px] md:py-[60px] lg:py-[100px] bg-white" aria-labelledby="contact-heading">
      <div className="max-w-[1240px] mx-auto">
        {data.title && (
          <h1
            id="contact-heading"
            className="mb-[44px] md:mb-[56px] text-center font-Roboto text-PrimaryBlack font-semibold leading-[38.4px] md:leading-[61.6px] text-[32px] md:text-[56px] tracking-[-0.48px] md:tracking-[-1.12px]"
          >
            {data.title}
          </h1>
        )}
 
        <div className="max-w-[1120px] mx-auto flex flex-col lg:flex-row gap-10">
          
          <div className="w-full lg:w-[59.8%] rounded-[12px] p-6 bg-white border border-LightWhite" role="form" aria-labelledby="form-title">
            {data.formTitle && (
              <h2 id="form-title" className="font-Roboto text-PrimaryBlack font-semibold leading-[28px] md:leading-[31.2px] text-[20px] md:text-[24px] tracking-[-0.3px] md:tracking-[-0.36px]">
                {data.formTitle}
              </h2>
            )}
            {data.formDescription && (
              <p className="mt-1 mb-8 font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[24px] text-[14px] md:text-[16px] tracking-[0px]">
                {data.formDescription}
              </p>
            )}
           {errorMessage && (
             <p   ref={messageRef} className="mb-4 text-red text-[14px] whitespace-pre-line ">
              {errorMessage}
            </p>
          )}

          {successMessage && (
            <p className="mb-4 text-[14px] whitespace-pre-line text-green-800">
              {successMessage}
            </p>
          )}

            <form   ref={messageRef} ref={formRef} className="space-y-5" onSubmit={handleSubmit}>
             
              <div className="relative">
                <label htmlFor="company" className="absolute left-[12px] top-[6px] font-Roboto text-LightGray font-normal leading-[18px] text-[12px]">
                  Company Name<span className="text-red ml-1">*</span>
                </label>
                <input type="text" id="company" name="company" placeholder="ABC Corporation" required
                  className="block w-full rounded-[8px] border border-LightWhite bg-white h-[60px] pl-[12px] pt-[24px] pb-[10px] font-Roboto text-PrimaryBlack text-[16px]"  maxLength={100}/>
              </div>
 
              
              <div className="flex flex-col md:flex-row gap-5 md:gap-4">
                <div className="relative w-full">
                  <label htmlFor="firstname" className="absolute left-[12px] top-[6px] font-Roboto text-LightGray text-[12px]">First Name<span className="text-red ml-1">*</span></label>
                  <input type="text" id="firstname" name="firstname" placeholder="Scott" required className="block w-full rounded-[8px] border border-LightWhite bg-white h-[60px] pl-[12px] pt-[24px] pb-[10px] font-Roboto text-PrimaryBlack text-[16px]"  maxLength={50}/>
                </div>
                <div className="relative w-full">
                  <label htmlFor="lastname" className="absolute left-[12px] top-[6px] font-Roboto text-LightGray text-[12px]">Last Name<span className="text-red ml-1">*</span></label>
                  <input type="text" id="lastname" name="lastname" placeholder="Morrison" required className="block w-full rounded-[8px] border border-LightWhite bg-white h-[60px] pl-[12px] pt-[24px] pb-[10px] font-Roboto text-PrimaryBlack text-[16px]"  maxLength={50}/>
                </div>
              </div>
 
              
              <div className="flex flex-col md:flex-row gap-5 md:gap-4">
                <div className="relative w-full">
                  <label htmlFor="email" className="absolute left-[12px] top-[6px] font-Roboto text-LightGray text-[12px]">Email<span className="text-red ml-1">*</span></label>
                  <input type="email" id="email" name="email" placeholder="scott.morrison@example.com" required className="block w-full rounded-[8px] border border-LightWhite bg-white h-[60px] pl-[12px] pt-[24px] pb-[10px] font-Roboto text-PrimaryBlack text-[16px]" maxLength={50}/>
                </div>
                <div className="relative w-full">
                  <label htmlFor="phone" className="absolute left-[12px] top-[6px] font-Roboto text-LightGray text-[12px]">Phone Number<span className="text-red ml-1">*</span></label>
                  <input type="number" id="phone" name="phone" placeholder="123-456-7890" required className="block w-full rounded-[8px] border border-LightWhite bg-white h-[60px] pl-[12px] pt-[24px] pb-[10px] font-Roboto text-PrimaryBlack text-[16px]" maxLength={20}/>
                </div>
              </div>
 
              
              <div className="relative">
                <label htmlFor="what_best_describes_you_" className="absolute left-[12px] top-[6px] font-Roboto text-LightGray text-[12px]">Which best describes you?<span className="text-red ml-1">*</span></label>
                <input type="text" id="what_best_describes_you_" name="what_best_describes_you_" placeholder="Small business owner" required className="block w-full rounded-[8px] border border-LightWhite bg-white h-[60px] pl-[12px] pt-[24px] pb-[10px] font-Roboto text-PrimaryBlack text-[16px]" maxLength={100}/>
              </div>
              <div className="relative">
                <label htmlFor="how_did_you_hear_about_us_" className="absolute left-[12px] top-[6px] font-Roboto text-LightGray text-[12px]">How did you hear about us?<span className="text-red ml-1">*</span></label>
                <input type="text" id="how_did_you_hear_about_us_" name="how_did_you_hear_about_us_" placeholder="Instagram" required className="block w-full rounded-[8px] border border-LightWhite bg-white h-[60px] pl-[12px] pt-[24px] pb-[10px] font-Roboto text-PrimaryBlack text-[16px]" maxLength={100}/>
              </div>
              <div className="relative">
                <label htmlFor="message" className="absolute left-[12px] top-[6px] font-Roboto text-LightGray text-[12px]">Tell us how we can help you<span className="text-red ml-1">*</span></label>
                <textarea rows={4} id="message" name="message" required 
                placeholder="Looking for a reliable mailbox service" 
                className="block w-full rounded-[8px] border border-LightWhite bg-white h-[126px] pl-[12px] pt-[24px] pb-[10px] font-Roboto text-PrimaryBlack text-[16px]"
                maxLength={500}
                ></textarea>
              </div>
 
              
              <div className="relative">
                 {/* Google reCAPTCHA */}
                 <div
                    className="g-recaptcha"
                    ref={recaptchaRef}
                    data-sitekey="6LeqBQIsAAAAAD5eyCvN_gJrVI8vGTvCp9h4PX0n"
                    data-callback="onRecaptchaSuccess"
                  ></div>
              </div>
 
              
              <div className="relative pt-3 flex items-center justify-center">
                <button type="submit" className="flex items-center justify-center bg-DarkOrange text-white font-normal font-Roboto py-[12px] px-4 rounded-full w-full md:w-[271px] h-[52px] group relative overflow-hidden transition-all hover:scale-[1.01] hover:bg-[#DF5D07]">
                  <span className="relative flex items-center">Submit <span className="absolute right-0 opacity-0 translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-[35px] transition-all duration-300">
                    <RightArrowWhite />
                  </span></span>
                  </button>
              </div>
            </form>
          </div>
 
          <aside className="w-full lg:w-[40.2%]" aria-labelledby="support-heading quick-links-heading">
            {/* Support Section */}
            {data.supportSection && (
              <div className="bg-[#F6F6F6] border border-LightWhite rounded-[12px] p-6" aria-labelledby="support-heading">
                {data.supportSection.sectionTitle && <h2 id="support-heading" className="font-Roboto text-PrimaryBlack font-semibold leading-[28px] md:leading-[31.2px] text-[20px] md:text-[24px] tracking-[-0.3px] md:tracking-[-0.36px]">{data.supportSection.sectionTitle}</h2>}
                {data.supportSection.sectionDescription && <p className="mt-1 mb-6 font-Roboto text-PrimaryBlack font-normal leading-[24px] text-[16px]">{data.supportSection.sectionDescription}</p>}
                <ul className="space-y-6">
                  {data.supportSection.supportItems?.map((item, idx) => (
                    <li key={idx} className="px-5 py-4 border border-LightWhite rounded-[12px] bg-white flex gap-4">
                      {item.icon?.url && <img src={item.icon.url} alt="" className="w-8 h-8" aria-hidden="true" />}
                      <div className="flex flex-col gap-2">
                        {item.title && <span className="font-Roboto text-PrimaryBlack font-medium text-[18px]">{item.title}</span>}
                        {item.contacts && <ul className="space-y-2">{item.contacts.map((contact, cIdx) => (
                          <li key={cIdx} className="flex gap-2 items-center">
                            {contact.icon?.url && <img src={contact.icon.url} alt="" className="w-6" aria-hidden="true" />}
                            {contact.phoneLink ? (
                              <a href={contact.phoneLink} className="font-Roboto text-LightWhite text-[14px]" aria-label={`Call ${contact.number}`}>{contact.number}</a>
                            ) : (
                              <span className="font-Roboto text-LightGray text-[14px]"><a href={`tel:${contact.number}`}>{contact.number}</a></span>
                            )}
                          </li>
                        ))}</ul>}
                        {item.note && <p className="font-Roboto text-LightGray text-[14px]">{item.note}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
 
            {/* Quick Links */}
            {data.quickLinks && data.quickLinks.length > 0 && (
              <nav className="mt-6 md:mt-8 bg-white border border-LightWhite rounded-[12px] p-6" aria-labelledby="quick-links-heading">
                <h2 id="quick-links-heading" className="mb-6 font-Roboto text-PrimaryBlack font-semibold text-[24px]">Quick Links</h2>
                <ul className="list-none space-y-4">
                  {data.quickLinks.map((link, idx) => (
                    <li key={idx}>
                      {link.url ? (
                        <a href={link.url} className="font-Roboto text-DarkOrange text-[18px] underline">{link.label}</a>
                      ) : (
                        <span className="font-Roboto text-DarkOrange text-[18px] underline">{link.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}