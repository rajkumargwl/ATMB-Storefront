export default function PricingSection() {
    const plans = [
      {
        title: "Anytime Phone",
        price: "$12",
        subtitle: "Starting from $12/month",
        description: "Keep your business connected from any location.",
        features: ["Business number", "Call forwarding", "Voicemail transcription"],
        button: "Buy Now",
        highlight: false,
      },
      {
        title: "Anytime Mailbox",
        price: "$9",
        subtitle: "Starting from $9/month",
        description: "Access and manage your mail from anywhere.",
        features: [
          "Scan, forward, or shred remotely",
          "Secure digital archive",
          "Real-time alerts",
        ],
        button: "Get Started",
        highlight: true, // Most popular
      },
      {
        title: "Business Accelerator",
        price: "$29",
        subtitle: "Starting from $29/month",
        description: "Resources, mentorship, and tools to grow faster.",
        features: [
          "Expert guidance",
          "Partner network",
          "Growth planning tools",
        ],
        button: "Buy Now",
        highlight: false,
      },
    ];
  
    return (
      <section className="bg-[#F9FAFB] py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-md font-bold text-gray-600 tracking-wide">
            Stay Connected, Look Professional, Grow Faster
          </h3>
          <p className="mt-6 text-xl md:text-2xl text-gray-900">
            Virtual tools that let you manage mail, calls, and growth from anywhere.
          </p>
        </div>
  
        <div className="mt-12 grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl border bg-white p-6 shadow-sm ${
                plan.highlight ? "border-black shadow-md" : "border-[#E5E7EB]"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <div className="flex items-center justify-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">🔒</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{plan.title}</h3>
              <p className="text-gray-600 mt-2 text-sm">{plan.subtitle}</p>
              <p className="mt-2 text-sm text-gray-500 mt-3">{plan.description}</p>
  
              <ul className="mt-5 space-y-2 text-sm text-gray-700">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 mt-1">
                    ✅ <span>{feature}</span>
                  </li>
                ))}
              </ul>
  
              <button
                className={`mt-6 w-full rounded-lg border px-4 py-2 text-sm font-medium ${
                  plan.highlight
                    ? "text-gray-700 hover:bg-gray-900"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {plan.button}
              </button>
            </div>
          ))}
        </div>
      </section>
    );
  }
  