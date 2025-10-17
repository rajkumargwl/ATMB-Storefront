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

export default function ContactUsSection({ data }: ContactUsProps) {
  if (!data) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries()); // convert to JSON
  
    try {
      const response = await fetch("/api/freshdesk-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
      if (result.success) {
        alert("✅ Thank you! Your form has been submitted.");
        e.currentTarget.reset();
      } else {
        alert(`❌ Error submitting form: ${result.error}`);
      }
    } catch (error: any) {
      console.error("Form submission error:", error);
      alert(`❌ Error submitting form: ${error.message}`);
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
          {/* LEFT: Form */}
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

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Company Name */}
              <div className="relative">
                <label htmlFor="company" className="absolute left-[12px] top-[6px] font-Roboto text-LightGray font-normal leading-[18px] text-[12px]">
                  Company Name
                </label>
                <input type="text" id="company" name="company" placeholder="ABC Corporation" required
                  className="block w-full rounded-[8px] border border-LightWhite bg-white h-[60px] pl-[12px] pt-[24px] pb-[10px] font-Roboto text-PrimaryBlack text-[16px]" />
              </div>

              {/* First & Last Name */}
              <div className="flex flex-col md:flex-row gap-5 md:gap-4">
                <div className="relative w-full">
                  <label htmlFor="firstname" className="absolute left-[12px] top-[6px] font-Roboto text-LightGray text-[12px]">First Name</label>
                  <input type="text" id="firstname" name="firstname" placeholder="Scott" required className="block w-full rounded-[8px] border border-LightWhite bg-white h-[60px] pl-[12px] pt-[24px] pb-[10px] font-Roboto text-PrimaryBlack text-[16px]" />
                </div>
                <div className="relative w-full">
                  <label htmlFor="lastname" className="absolute left-[12px] top-[6px] font-Roboto text-LightGray text-[12px]">Last Name</label>
                  <input type="text" id="lastname" name="lastname" placeholder="Morrison" required className="block w-full rounded-[8px] border border-LightWhite bg-white h-[60px] pl-[12px] pt-[24px] pb-[10px] font-Roboto text-PrimaryBlack text-[16px]" />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="flex flex-col md:flex-row gap-5 md:gap-4">
                <div className="relative w-full">
                  <label htmlFor="email" className="absolute left-[12px] top-[6px] font-Roboto text-LightGray text-[12px]">Email</label>
                  <input type="email" id="email" name="email" placeholder="scott.morrison@example.com" required className="block w-full rounded-[8px] border border-LightWhite bg-white h-[60px] pl-[12px] pt-[24px] pb-[10px] font-Roboto text-PrimaryBlack text-[16px]" />
                </div>
                <div className="relative w-full">
                  <label htmlFor="phone" className="absolute left-[12px] top-[6px] font-Roboto text-LightGray text-[12px]">Phone Number</label>
                  <input type="text" id="phone" name="phone" placeholder="123-456-7890" required className="block w-full rounded-[8px] border border-LightWhite bg-white h-[60px] pl-[12px] pt-[24px] pb-[10px] font-Roboto text-PrimaryBlack text-[16px]" />
                </div>
              </div>

              {/* Other Fields */}
              <div className="relative">
                <label htmlFor="what_best_describes_you_" className="absolute left-[12px] top-[6px] font-Roboto text-LightGray text-[12px]">Which best describes you?</label>
                <input type="text" id="what_best_describes_you_" name="what_best_describes_you_" placeholder="Small business owner" required className="block w-full rounded-[8px] border border-LightWhite bg-white h-[60px] pl-[12px] pt-[24px] pb-[10px] font-Roboto text-PrimaryBlack text-[16px]" />
              </div>
              <div className="relative">
                <label htmlFor="how_did_you_hear_about_us_" className="absolute left-[12px] top-[6px] font-Roboto text-LightGray text-[12px]">How did you hear about us?</label>
                <input type="text" id="how_did_you_hear_about_us_" name="how_did_you_hear_about_us_" placeholder="Instagram" required className="block w-full rounded-[8px] border border-LightWhite bg-white h-[60px] pl-[12px] pt-[24px] pb-[10px] font-Roboto text-PrimaryBlack text-[16px]" />
              </div>
              <div className="relative">
                <label htmlFor="message" className="absolute left-[12px] top-[6px] font-Roboto text-LightGray text-[12px]">Tell us how we can help you</label>
                <textarea rows={4} id="message" name="message" required placeholder="Looking for a reliable mailbox service" className="block w-full rounded-[8px] border border-LightWhite bg-white h-[126px] pl-[12px] pt-[24px] pb-[10px] font-Roboto text-PrimaryBlack text-[16px]"></textarea>
              </div>

              {/* Captcha / Image */}
              <div className="relative">
                <img src={Contact} alt="captcha" className="rounded-[20px] w-full max-w-[368px] h-auto object-cover" />
              </div>

              {/* Submit */}
              <div className="relative pt-3 flex items-center justify-center">
                <button type="submit" className="flex items-center justify-center bg-DarkOrange text-white font-normal font-Roboto py-[12px] px-4 rounded-full w-full md:w-[271px] h-[52px]">Submit</button>
              </div>
            </form>
          </div>

          {/* RIGHT: Support + Quick Links */}
          {/* ... your support and quick links JSX remains unchanged ... */}
        </div>
      </div>
    </section>
  );
}
