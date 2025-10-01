import React from "react";

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
  if (!data) {
    return null; // nothing to render if no data
  }

  return (
    <section
      className="w-full max-w-6xl mx-auto px-4 md:px-8 my-16"
      aria-labelledby="contact-heading"
    >
      {/* Page Title */}
      {data.title && (
        <h1
          id="contact-heading"
          className="text-center text-3xl font-bold text-gray-900 mb-10"
        >
          {data.title}
        </h1>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* LEFT: Static Form */}
        <div
          className="col-span-2 bg-white shadow rounded-lg p-6"
          role="form"
          aria-labelledby="form-title"
        >
          {data.formTitle && (
            <h2
              id="form-title"
              className="text-xl font-semibold text-gray-900 mb-2"
            >
              {data.formTitle}
            </h2>
          )}
          {data.formDescription && (
            <p className="text-gray-600 mb-6">{data.formDescription}</p>
          )}

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-md py-2 px-4 font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </form>
        </div>

        {/* RIGHT: Support + Quick Links */}
        <aside
          className="space-y-6"
          aria-labelledby="support-heading quick-links-heading"
        >
          {/* Support Section */}
          {data.supportSection && (
            <div
              className="bg-white shadow rounded-lg p-6"
              aria-labelledby="support-heading"
            >
              {data.supportSection.sectionTitle && (
                <h2
                  id="support-heading"
                  className="text-lg font-semibold text-gray-900 mb-2"
                >
                  {data.supportSection.sectionTitle}
                </h2>
              )}
              {data.supportSection.sectionDescription && (
                <p className="text-gray-600 mb-4">
                  {data.supportSection.sectionDescription}
                </p>
              )}

              <ul className="space-y-4">
                {data.supportSection.supportItems?.map((item, idx) => (
                  <li
                    key={idx}
                    className="border rounded-lg p-4 flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-2">
                      {item.icon?.url && (
                        <img
                          src={item.icon.url}
                          alt=""
                          className="w-5 h-5"
                          aria-hidden="true"
                        />
                      )}
                      {item.title && (
                        <span className="font-medium text-gray-900">
                          {item.title}
                        </span>
                      )}
                    </div>

                    {item.contacts && (
                      <ul className="pl-6 space-y-1">
                        {item.contacts.map((contact, cIdx) => (
                          <li key={cIdx} className="flex items-center gap-2">
                            {contact.icon?.url && (
                              <img
                                src={contact.icon.url}
                                alt=""
                                className="w-4 h-4"
                                aria-hidden="true"
                              />
                            )}
                            {contact.phoneLink ? (
                              <a
                                href={contact.phoneLink}
                                className="text-blue-600 hover:underline"
                                aria-label={`Call ${contact.number}`}
                              >
                                {contact.number}
                              </a>
                            ) : (
                              <span className="text-gray-700">
                                {contact.number}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}

                    {item.note && (
                      <p className="text-sm text-gray-500">{item.note}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quick Links */}
          {data.quickLinks && data.quickLinks.length > 0 && (
            <nav
              className="bg-white shadow rounded-lg p-6"
              aria-labelledby="quick-links-heading"
            >
              <h2
                id="quick-links-heading"
                className="text-lg font-semibold text-gray-900 mb-2"
              >
                Quick Links
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                {data.quickLinks.map((link, idx) => (
                  <li key={idx}>
                    {link.url ? (
                      <a
                        href={link.url}
                        className="text-blue-600 hover:underline"
                        aria-label={`Quick link: ${link.label}`}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <span className="text-gray-700">{link.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </aside>
      </div>
    </section>
  );
}
