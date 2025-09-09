import React, { useState } from "react";

/* ---------------- Mock JSON ---------------- */
const mockData = {
  badge: "Simple, Transparent Pricing Plans",
  heading:
    "Choose the plan that fits your needs — from basic mailbox services to feature-packed plans.",
  individualPlans: [
    {
      title: "Phone Unlimited",
      heading: "Keep your business connected from any location.",
      monthlyPrice: "$19.99",
      yearlyPrice: "$16.00",
      ctaText: "Buy Now",
      isMostPopular: false,
      features: [
        "Live Answering Minutes",
        "Appointment Scheduling",
        "Professional Appointment Scheduling App",
      ],
    },
    {
      title: "Live Receptionist 50",
      heading: "Access and manage your mail from anywhere.",
      monthlyPrice: "$125",
      yearlyPrice: "$100",
      ctaText: "Buy Now",
      isMostPopular: true,
      features: [
        "50 Live Answering Minutes",
        "Appointment Scheduling",
        "Professional Appointment Scheduling App",
      ],
    },
    {
      title: "Live Receptionist 100",
      heading: "Resources, mentorship, and tools to grow faster.",
      monthlyPrice: "$175",
      yearlyPrice: "$140",
      ctaText: "Buy Now",
      isMostPopular: false,
      features: [
        "100 Live Answering Minutes",
        "Appointment Scheduling",
        "Professional Appointment Scheduling App",
      ],
    },
  ],
  bundlePlans: [
    {
      title: "Solo Starter",
      heading: "Ideal for freelancers & solo founders.",
      monthlyPrice: "$20",
      yearlyPrice: "$16",
      discountPercent: "8%",
      discountedMonthlyPrice: "$18.4",
      discountedYearlyPrice: "$14.7",
      ctaText: "Buy Now",
      services: [
        {
          name: "Anytime Mailbox",
          tier: "Basic",
          desc: "Mail scanning & forwarding",
        },
        {
          name: "Anytime Phone",
          tier: "Basic",
          desc: "Dedicated business number",
        },
      ],
      features: [
        "Affordable essentials to get started.",
        "Professional image without high costs.",
        "Easy upgrade to higher tiers.",
      ],
    },
    {
      title: "Mobile Pro",
      heading: "Perfect for on-the-go professionals.",
      monthlyPrice: "$27",
      yearlyPrice: "$22",
      discountPercent: "12%",
      discountedMonthlyPrice: "$23.75",
      discountedYearlyPrice: "$19.4",
      ctaText: "Buy Now",
      services: [
        {
          name: "Anytime Mailbox",
          tier: "Standard",
          desc: "Increased scans & storage",
        },
        {
          name: "Anytime Phone",
          tier: "Standard",
          desc: "Call forwarding & voicemail transcription",
        },
      ],
      features: [
        "Reliable communication on the move.",
        "Professional presence in multiple locations.",
        "Flexible setup with no downtime.",
      ],
    },
  ],
};

/* ---------------- UI Helpers ---------------- */
const Check = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="13" viewBox="0 0 16 13" fill="none">
  <path d="M15.6652 0.851508C16.1116 1.32018 16.1116 2.08132 15.6652 2.54999L6.52338 12.1485C6.077 12.6172 5.35208 12.6172 4.9057 12.1485L0.334784 7.34924C-0.111595 6.88057 -0.111595 6.11943 0.334784 5.65076C0.781163 5.18208 1.50608 5.18208 1.95246 5.65076L5.71633 9.59889L14.0511 0.851508C14.4975 0.382831 15.2224 0.382831 15.6688 0.851508H15.6652Z" fill="#091019"/>
</svg>
);

/* ---------------- Pricing Section ---------------- */
function PricingSection({ data }: { data: typeof mockData }) {
  const [activeTab, setActiveTab] = useState<"individual" | "bundles">(
    "individual"
  );
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const isYearly = billing === "yearly";
  const plans =
    activeTab === "individual" ? data.individualPlans : data.bundlePlans;

  return (
    <section className="bg-white py-16">
      <div className="max-w-[1240px] mx-auto px-6 items-center justify-center flex flex-col">
        {/* Badge */}
        <div className="flex gap-2 mb-4 bg-[#FFE5D8] px-3 py-2 rounded-full w-max">
          <span className="w-2 h-2 bg-[#EE6D2D] rounded-full" />
          <span className="text-sm font-medium text-gray-700">
            {data?.badge}
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-[36px] xs:text-lg font-semibold text-[#091019]">
          {data.heading}
        </h2>

        {/* Tabs + Toggle */}
        <div className="mt-14 flex w-full max-w-[67rem] items-center justify-between">
          {/* Center Tabs */}
          <div className="flex-1 flex justify-center">
            <div className="flex gap-3">
              <button
                onClick={() => setActiveTab("individual")}
                className={`px-5 py-2 text-[16px] font-medium rounded-full transition ${
                  activeTab === "individual"
                    ? "border-[#091019] text-[#091019] bg-[#F9F9F9] border"
                    : "text-[#5A5D60] hover:text-[#091019]"
                }`}
              >
                Individual Products
              </button>
              <button
                onClick={() => setActiveTab("bundles")}
                className={`px-5 py-2 text-[16px] font-medium rounded-full transition ${
                  activeTab === "bundles"
                    ? "border-[#091019] text-[#091019] bg-[#F9F9F9] border"
                    : "text-[#5A5D60] hover:text-[#091019]"
                }`}
              >
                Bundles
              </button>
            </div>
          </div>

          {/* Billing Toggle (Right) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setBilling("monthly")}
              className={`text-sm font-medium ${
                !isYearly ? "text-black" : "text-gray-500 hover:text-black"
              }`}
            >
              Monthly
            </button>

            <button
              onClick={() => setBilling(isYearly ? "monthly" : "yearly")}
              className={`relative h-8 w-16 rounded-full transition ${
                isYearly ? "bg-[#BFBFBF]" : "bg-[#BFBFBF]"
              }`}
              aria-label="Toggle billing cycle"
            >
              <span
                className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-white shadow transition-transform ${
                  isYearly ? "translate-x-8" : ""
                }`}
              />
            </button>

            <button
              onClick={() => setBilling("yearly")}
              className={`text-sm font-medium ${
                isYearly ? "text-black" : "text-gray-500 hover:text-black"
              }`}
            >
              Yearly
            </button>

            <span className="text-[12px] text-[#ffffff] bg-[#EE6D2D] px-2 py-1.5 rounded-full">
              20% off
            </span>
          </div>
        </div>


        {/* Cards */}
        <div className={`mt-18 items-center justify-center ${activeTab === 'individual' ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3' : 'flex justify-center items-center gap-5 '} w-full`}>
          {plans.map((plan, idx) => {
            if (activeTab === "individual") {
              // ---------- Individual Card ----------
              const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
              const unit = isYearly ? "year" : "month";

              return (
                <div
                  key={idx}
                  className={`relative rounded-[8%] ${
                    plan?.isMostPopular
                      ? "px-[6px] py-[13px] bg-gradient-to-b from-black to-[#737373] shadow-lg max-h-[508px]"
                      : "p-[6px] border border-[#DCDCDC] bg-[#F9F9F9] max-h-[459px]"
                  }`}
                >
                   {plan?.isMostPopular && (
                      <div className="bg-black text-white text-[16px] px-4 py-3 rounded-full text-center">
                        MOST POPULAR
                      </div>
                    )}
                  <div className={`rounded-[8%] p-1 ${plan?.isMostPopular ? " bg-white h-[89%]" : "h-full" }`}>
                    {/* Inner White Box (Title + Price + CTA Button) */}
                    <div className="bg-white rounded-[8%] p-6">
                      <div className="w-10 h-10 rounded-full bg-[#F9F9F9] border border-[#DCDCDC] flex items-center justify-center mb-4">
                        +
                      </div>
                      
                      <h3 className="text-[24px] font-semibold text-[#091019] mt-6 mb-4">
                        {plan.title}
                      </h3>
                      <p className="text-[16px] text-[#5A5D60] mt-1">{plan.heading}</p>

                      <div className="mt-4 flex flex-row justify-between items-center">
                        {/* Left: Price */}
                        <div>
                          <div className="flex items-end gap-1">
                            <span className="text-[24px] font-bold text-[#242629]">
                              {price}
                            </span>
                            <span className="text-[14px] text-[#4B5563]">/{unit}</span>
                          </div>
                          <p className="text-[14px] text-[#4B5563] mt-2">Starting from</p>
                        </div>

                        {/* Right: Button */}
                        <button
                          className={`flex-shrink-0 rounded-md px-4 py-3 text-[16px] font-medium transition ${
                            plan.isMostPopular
                              ? "bg-[#EE6D2D] text-white hover:bg-[#d75c1d]"
                              : "border border-[#091019] text-[#091019] hover:bg-gray-100"
                          }`}
                        >
                          {plan.ctaText}
                        </button>
                      </div>
                    
                    </div>

                    {/* Features Outside White Box */}
                    <ul className="mt-5 space-y-3 text-[16px] text-[#091019] p-6 pt-0">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-3 leading-[24px]">
                          <Check />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            } else {
              // ---------- Bundle Card ----------
              const discountPrice = isYearly
                ? plan.discountedYearlyPrice
                : plan.discountedMonthlyPrice;
              const originalPrice = isYearly
                ? plan.yearlyPrice
                : plan.monthlyPrice;
              const unit = isYearly ? "year" : "month";

              return (
                <div
                  key={idx}
                className="relative rounded-[20px] border border-[#DCDCDC] bg-[#F9F9F9] p-3 shadow-sm flex flex-col min-w-[390px] max-w-[390px] h-[646px]"
                >
                  <div className="bg-white rounded-[8%] p-3">
                    <div className="bg-[#74A03812] text-[#558019] text-[14px] px-3 py-2 rounded-full w-max border border-[#74A038] mt-4 mb-5">
                      Save {plan.discountPercent}
                    </div>

                    <h3 className="text-[24px] font-semibold text-[#091019] mt-7">
                      {plan.title}
                    </h3>
                    <p className="text-[16px] text-[#091019] mt-3">{plan.heading}</p>

                     <div className="mt-7 flex flex-row justify-between items-center">
                        {/* Left: Price */}
                        <div>
                          <div className="flex items-end gap-1">
                            <span className="text-[#4B5563] line-through text-[#5A5D60] text-[18px]">
                              {originalPrice}
                            </span>
                            <span className="text-[24px] font-bold text-gray-900">
                              {discountPrice}
                            </span>
                            <span className="text-[14px] text-[#4B5563]">/{unit}</span>
                          </div>
                          <p className="text-[14px] text-[#4B5563] mt-2">Starting from</p>
                        </div>

                        {/* Right: Button */}
                        <button
                          className={`flex-shrink-0 rounded-md px-4 py-3 text-[16px] font-medium transition border border-[#091019] text-[#091019] hover:bg-gray-100`}
                        >
                          {plan.ctaText}
                        </button>
                      </div>
                  </div>

                  {/* Sub-services */}
                  <div className="mt-7 space-y-5">
                    {plan.services.map((s, i) => (
                      <div
                        key={i}
                        className="flex items-center bg-white justify-between border border-[#DCDCDC] rounded-lg px-4 py-4"
                      >
                        <div>
                          <p className="text-[18px] font-semibold text-[#091019]">
                            {s.name}
                          </p>
                          <p className="text-[14px] text-[#5A5D60] mt-3">{s.desc}</p>
                        </div>
                        <span className="text-[12px] bg-[#FFF1EA] text-[#091019] px-2 py-2 border border-[#EE6D2D] rounded-full">
                          {s.tier}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <ul className="mt-7 space-y-3 text-[16px] text-[#091019] p-6 pt-0">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-3 leading-[24px]">
                        <Check />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
}

export default function PricingSectionDemo() {
  return <PricingSection data={mockData} />;
}
