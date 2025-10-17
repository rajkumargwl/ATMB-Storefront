import React from "react";
import Contact from "~/components/media/contact.png";

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

export default function ContactUsSection({ data, context }: ContactUsProps) {
  if (!data) {
    return null; // nothing to render if no data
  }

  // const HUBSPOT_PORTAL_ID = '244116084';
  // const HUBSPOT_FORM_ID = '3fb77e45-e6b4-4275-ad2f-4ef212666d0d';
  const HUBSPOT_PORTAL_ID = '47460136'; //client's HubSpot Portal ID
  const HUBSPOT_FORM_ID = '24cefeaf-82b5-412a-976a-c348ec39d319'; //client's HubSpot Form ID

  return (
    <section className="px-5 py-[40px] md:py-[60px] lg:py-[100px] bg-white "aria-labelledby="contact-heading">
      <div className="max-w-[1240px] mx-auto">
      {/* Page Title */}
      {data.title && (
        <h1
          id="contact-heading"
          className="mb-[44px] md:mb-[56px] text-center font-Roboto text-PrimaryBlack font-semibold leading-[38.4px] md:leading-[61.6px] text-[32px] md:text-[56px] tracking-[-0.48px] md:tracking-[-1.12px]"
        >
          {data.title}
        </h1>
      )}

      <div className="max-w-[1120px] mx-auto flex flex-col lg:flex-row gap-10">
        {/* LEFT: Static Form */}
        <div
          className="w-full lg:w-[59.8%] rounded-[12px] p-6 bg-white border border-LightWhite"
          role="form"
          aria-labelledby="form-title"
        >
          {data.formTitle && (
            <h2
              id="form-title"
              className="font-Roboto text-PrimaryBlack font-semibold leading-[28px] md:leading-[31.2px] text-[20px] md:text-[24px] tracking-[-0.3px] md:tracking-[-0.36px]"
            >
              {data.formTitle}
            </h2>
          )}
          {data.formDescription && (
            <p className="mt-1 mb-8 font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[24px] text-[14px] md:text-[16px] tracking-[0px]">{data.formDescription}</p>
          )}

          <form className="space-y-5" onSubmit={async (e) => {
              e.preventDefault();

              const formData = new FormData(e.target);
              const data = {
                fields: [
                  { name: "company", value: formData.get("company") },
                  { name: "firstname", value: formData.get("firstname") },
                  { name: "lastname", value: formData.get("lastname") },
                  { name: "email", value: formData.get("email") },
                  { name: "phone", value: formData.get("phone") },
                  { name: "what_best_describes_you_", value: formData.get("what_best_describes_you_") },
                  { name: "how_did_you_hear_about_us_", value: formData.get("how_did_you_hear_about_us_") },
                  { name: "message", value: formData.get("message") },
                ],
              };

              await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
              });

              alert("Thank you! Your form has been submitted.");
              e.target.reset();
            }}>
            {/* Name */}
            <div className="relative">
              <label htmlFor="name"
                className="absolute left-[12px] top-[6px] font-Roboto text-LightGray font-normal leading-[18px] md:leading-[18px] text-[12px] md:text-[12px] tracking-[0px]"
              >
                Company Name
              </label>
              <input type="text" id="company" name="company" placeholder="ABC Corporation" required
                className="block w-full rounded-[8px] border border-LightWhite bg-white h-[60px] pl-[12px] pt-[24px] pb-[10px]
                font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px] 
                placeholder:font-Roboto placeholder:text-PrimaryBlack placeholder:font-normal placeholder:leading-[24px]  placeholder:text-[16px]  placeholder:tracking-[0px]"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-5 md:gap-4">
              <div className="relative w-full">
              <label htmlFor="name"
                className="absolute left-[12px] top-[6px] font-Roboto text-LightGray font-normal leading-[18px] md:leading-[18px] text-[12px] md:text-[12px] tracking-[0px]"
              >
                First Name
              </label>
              <input type="text" id="firstname" name="firstname" placeholder="Scott" required
                className="block w-full rounded-[8px] border border-LightWhite bg-white h-[60px] pl-[12px] pt-[24px] pb-[10px]
                font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px] 
                placeholder:font-Roboto placeholder:text-PrimaryBlack placeholder:font-normal placeholder:leading-[24px]  placeholder:text-[16px]  placeholder:tracking-[0px]"
              />
            </div>
            <div className="relative w-full">
              <label htmlFor="name"
                className="absolute left-[12px] top-[6px] font-Roboto text-LightGray font-normal leading-[18px] md:leading-[18px] text-[12px] md:text-[12px] tracking-[0px]"
              >
                Last Name
              </label>
              <input type="text" id="lastname" name="lastname" placeholder="Morrison" required
                className="block w-full rounded-[8px] border border-LightWhite bg-white h-[60px] pl-[12px] pt-[24px] pb-[10px]
                font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px] 
                placeholder:font-Roboto placeholder:text-PrimaryBlack placeholder:font-normal placeholder:leading-[24px]  placeholder:text-[16px]  placeholder:tracking-[0px]"
              />
            </div>
            </div>
            <div className="flex flex-col md:flex-row gap-5 md:gap-4">
              <div className="relative w-full">
                  <label htmlFor="name"
                    className="absolute left-[12px] top-[6px] font-Roboto text-LightGray font-normal leading-[18px] md:leading-[18px] text-[12px] md:text-[12px] tracking-[0px]"
                  >
                    Email
                  </label>
                  <input type="email" id="email" name="email" placeholder="scott.morrison@example.com" required
                    className="block w-full rounded-[8px] border border-LightWhite bg-white h-[60px] pl-[12px] pt-[24px] pb-[10px]
                    font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px] 
                    placeholder:font-Roboto placeholder:text-PrimaryBlack placeholder:font-normal placeholder:leading-[24px]  placeholder:text-[16px]  placeholder:tracking-[0px]"
                  />
              </div>
              <div className="relative w-full">
                <label htmlFor="name"
                  className="absolute left-[12px] top-[6px] font-Roboto text-LightGray font-normal leading-[18px] md:leading-[18px] text-[12px] md:text-[12px] tracking-[0px]"
                >
                  Phone Number
                </label>
                <input type="text" id="phone" name="phone" placeholder="123-456-7890" required
                  className="block w-full rounded-[8px] border border-LightWhite bg-white h-[60px] pl-[12px] pt-[24px] pb-[10px]
                  font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px] 
                  placeholder:font-Roboto placeholder:text-PrimaryBlack placeholder:font-normal placeholder:leading-[24px]  placeholder:text-[16px]  placeholder:tracking-[0px]"
                />
              </div>
            </div>
            <div className="relative">
              <label htmlFor="name"
                className="absolute left-[12px] top-[6px] font-Roboto text-LightGray font-normal leading-[18px] md:leading-[18px] text-[12px] md:text-[12px] tracking-[0px]"
              >
                Which best describes you?
              </label>
              <input type="text" id="what_best_describes_you_" name="what_best_describes_you_" placeholder="Small business owner" required
                className="block w-full rounded-[8px] border border-LightWhite bg-white h-[60px] pl-[12px] pt-[24px] pb-[10px]
                font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px] 
                placeholder:font-Roboto placeholder:text-PrimaryBlack placeholder:font-normal placeholder:leading-[24px]  placeholder:text-[16px]  placeholder:tracking-[0px]"
              />
            </div>
            <div className="relative">
              <label htmlFor="name"
                className="absolute left-[12px] top-[6px] font-Roboto text-LightGray font-normal leading-[18px] md:leading-[18px] text-[12px] md:text-[12px] tracking-[0px]"
              >
                How did you hear about us?
              </label>
              <input type="text" id="how_did_you_hear_about_us_" name="how_did_you_hear_about_us_" placeholder="Instagram" required
                className="block w-full rounded-[8px] border border-LightWhite bg-white h-[60px] pl-[12px] pt-[24px] pb-[10px]
                font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px] 
                placeholder:font-Roboto placeholder:text-PrimaryBlack placeholder:font-normal placeholder:leading-[24px]  placeholder:text-[16px]  placeholder:tracking-[0px]"
              />
            </div>

            <div className="relative">
              <label htmlFor="name"
                className="absolute left-[12px] top-[6px] font-Roboto text-LightGray font-normal leading-[18px] md:leading-[18px] text-[12px] md:text-[12px] tracking-[0px]"
              >
               Tell us how we can help you
              </label>
              <textarea  rows={4}
                required placeholder="Looking for a reliable mailbox service"
                id="message" name="message"
                className="block w-full rounded-[8px] border border-LightWhite bg-white h-[126px] pl-[12px] pt-[24px] pb-[10px]
                font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px] 
                placeholder:font-Roboto placeholder:text-PrimaryBlack placeholder:font-normal placeholder:leading-[24px]  placeholder:text-[16px]  placeholder:tracking-[0px]"
              >
              </textarea>
            </div>   
            <div className="relative">
                 <img
                      src={Contact}
                      alt="captcha"                      
                      className="rounded-[20px] w-full max-w-[368px] h-auto  object-cover"
                    />
            </div>       

            
          <div className="relative pt-3 flex items-center justify-center">
            {/* Submit */}
            <button
              type="submit"
              className="flex items-center justify-center bg-DarkOrange text-white font-normal font-Roboto leading-[16px] text-[16px] tracking-[0.08px] py-[12px]  px-4 rounded-full w-full md:w-[271px] h-[52px]"
            >
              Submit
            </button>
            </div>
          </form>
        </div>

        {/* RIGHT: Support + Quick Links */}
        <aside
          className="w-full lg:w-[40.2%]"
          aria-labelledby="support-heading quick-links-heading"
        >
          {/* Support Section */}
          {data.supportSection && (
            <div
              className="bg-[#F6F6F6] border border-LightWhite rounded-[12px] p-6"
              aria-labelledby="support-heading"
            >
              {data.supportSection.sectionTitle && (
                <h2
                  id="support-heading"
                  className="font-Roboto text-PrimaryBlack font-semibold leading-[28px] md:leading-[31.2px] text-[20px] md:text-[24px] tracking-[-0.3px] md:tracking-[-0.36px]"
                >
                  {data.supportSection.sectionTitle}
                </h2>
              )}
              {data.supportSection.sectionDescription && (
                <p className="mt-1 mb-6 font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">
                  {data.supportSection.sectionDescription}
                </p>
              )}

              <ul className="space-y-6">
                {data.supportSection.supportItems?.map((item, idx) => (
                  <li
                    key={idx}
                    className="px-5 py-4 border border-LightWhite rounded-[12px] bg-white flex flex-row items-start gap-4"
                  >
                    <div className="flex items-center gap-4">
                      {item.icon?.url && (
                        <img
                          src={item.icon.url}
                          alt=""
                          className="w-8 h-8"
                          aria-hidden="true"
                        />
                      )}
                     
                    </div>
                    <div className="flex flex-col gap-2">
                       {item.title && (
                        <span className="font-Roboto text-PrimaryBlack font-medium leading-[27px] md:leading-[27px] text-[18px] md:text-[18px] tracking-[0px]">
                         {item.title}
                        </span>
                      )}
                    

                    {item.contacts && (
                      <ul className="space-y-2">
                        {item.contacts.map((contact, cIdx) => (
                          <li key={cIdx} className="flex gap-2 items-center">
                            {contact.icon?.url && (
                              <img
                                src={contact.icon.url}
                                alt=""
                                className="w-6"
                                aria-hidden="true"
                              />
                            )}
                            {contact.phoneLink ? (
                              <a
                                href={contact.phoneLink}
                                className="tracking-[0px] font-Roboto text-LightWhite text-[14px] leading-[21px] font-normal py-1 inline-block"
                                aria-label={`Call ${contact.number}`}
                              >
                                {contact.number}
                              </a>
                            ) : (
                              <span className="tracking-[0px] font-Roboto text-LightGray text-[14px] leading-[21px] font-normal py-1 inline-block">
                                <a href={`tel:${contact.number}`} className=""> {contact.number}</a>
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}                   

                    {item.note && (
                      <p className="tracking-[0px] font-Roboto text-LightGray text-[14px] leading-[21px] font-normal inline-block">{item.note}</p>
                    )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quick Links */}
          {data.quickLinks && data.quickLinks.length > 0 && (
            <nav
              className="mt-6 md:mt-8 bg-white border border-LightWhite rounded-[12px] p-6"
              aria-labelledby="quick-links-heading"
            >
              <h2
                id="quick-links-heading"
                className="mb-6 font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[31.2px] text-[24px] md:text-[24px] tracking-[-0.36px] md:tracking-[-0.36px]"
              >
                Quick Links
              </h2>
              <ul className="list-none space-y-4">
                {data.quickLinks.map((link, idx) => (
                  <li key={idx}>
                    {link.url ? (
                      <a
                        href={link.url}
                        className="font-Roboto text-DarkOrange font-normal leading-[27px] md:leading-[27px] text-[18px] md:text-[18px] tracking-[0px] md:tracking-[0px]
                      underline decoration-solid decoration-skip-ink-auto decoration-auto underline-offset-auto"
                        aria-label={`Quick link: ${link.label}`}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <span className="font-Roboto text-DarkOrange font-normal leading-[27px] md:leading-[27px] text-[18px] md:text-[18px] tracking-[0px] md:tracking-[0px]
                      underline decoration-solid decoration-skip-ink-auto decoration-auto underline-offset-auto">{link.label}</span>
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
