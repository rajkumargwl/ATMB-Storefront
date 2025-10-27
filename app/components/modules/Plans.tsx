import React, { useState } from "react";
import PlanBg from '~/components/icons/PlanBg';
import Fire from '~/components/icons/Fire';
import CheckBlack from '~/components/icons/CheckBlack';
import RightArrowWhite from '~/components/icons/RightArrowWhite';

type PlanType = {
ctaBgColor?: string | null;
ctaText: string;
ctaTextColor?: string | null;
ctaUrl?: string | null;
features?: string[] | null;
icon?: { svgCode?: string | null; svgFile?: { asset: { url: string } } | null } | null;
isMostPopular?: boolean;
mostPopularLabel?: string;
pricing?: { monthly?: string; yearly?: string } | null;
startingFromText?: string;
subheading?: string | null;
title: string;
};

type PricingData = {
individualProductsTab: {
heading: string;
description: string;
plans: PlanType[];
};
billingToggle: {
discountLabel: string;
monthlyLabel: string;
yearlyLabel: string;
};
};

type PricingModuleProps = {
data: PricingData;
bundles?: any[];
};

export default function Pricingmodule({ data, bundles }: PricingModuleProps) {
const [activeTab, setActiveTab] = useState<"individual" | "bundles">("individual");
const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
const isYearly = billing === "yearly";

const tabs = [
{
id: "individual",
tabName: "Individual Products",
heading: data.individualProductsTab.heading,
description: data.individualProductsTab.description,
tabCards: data.individualProductsTab.plans || [],
},
{
id: "bundles",
tabName: "Bundles",
heading: "Bundles",
description: "Choose from our curated Shopify bundles.",
tabCards: [], // no Sanity bundles
},
];

const currentTab = tabs.find((t) => t.id === activeTab)!;
const plans = currentTab.tabCards;

return ( 
<section className="bg-[#F6F6F6] px-5 py-[40px] md:py-[60px] lg:py-[100px]"> <div className="max-w-[1240px] mx-auto flex flex-col items-center justify-center">
{/* Heading */} <h2 className="max-w-[870px] mx-auto font-Roboto text-PrimaryBlack font-semibold leading-[43.2px] text-[36px] text-center">
{currentTab.heading} </h2> <p className="mt-5 font-Roboto text-PrimaryBlack text-[18px] text-center">
{currentTab.description} </p>

    {/* Tabs + Billing */}
    <div className="mt-11 flex flex-col md:flex-row gap-6 w-full max-w-[1240px] items-center justify-between relative">
      <div className="absolute top-[-55px] right-[46px] hidden md:flex">
        <PlanBg />
      </div>

      {/* Tabs */}
      <div className="flex-1 flex justify-center">
        <div role="tablist" className="flex gap-4">
          {tabs.map((tab, idx) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveTab(tab.id as "individual" | "bundles")}
                className={`px-6 py-3 font-Roboto text-[16px] rounded-full border transition ${
                  isSelected
                    ? "border-PrimaryBlack text-white bg-PrimaryBlack"
                    : "text-PrimaryBlack"
                }`}
              >
                {tab.tabName}
              </button>
            );
          })}
        </div>
      </div>

      {/* Billing Toggle */}
      <div className="flex items-center gap-2">
        <span
          onClick={() => setBilling("monthly")}
          className={`font-Roboto text-[14px] ${
            !isYearly ? "text-PrimaryBlack" : "text-gray-500 hover:text-PrimaryBlack"
          }`}
        >
          {data?.billingToggle?.monthlyLabel}
        </span>

        <button
          onClick={() => setBilling(isYearly ? "monthly" : "yearly")}
          className={`relative h-[22px] w-10 rounded-full transition ${
            isYearly ? "bg-[#ff6600]" : "bg-[#BFBFBF]"
          }`}
        >
          <span
            className={`absolute top-[2px] left-[2px] h-[18px] w-[18px] rounded-full bg-white shadow transition-transform ${
              isYearly ? "translate-x-[18px]" : ""
            }`}
          />
        </button>

        <span
          onClick={() => setBilling("yearly")}
          className={`font-Roboto text-[14px] ${
            isYearly ? "text-PrimaryBlack" : "text-gray-500 hover:text-PrimaryBlack"
          }`}
        >
          {data?.billingToggle?.yearlyLabel}
        </span>

        <span className="font-Roboto text-[12px] bg-[#537D1B] text-white px-2 py-1 rounded-full">
          {data?.billingToggle.discountLabel}
        </span>
      </div>
    </div>

    {/* --- Render Section --- */}
    <div className="mt-11 w-full">
      {activeTab === "bundles" ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
          {bundles?.length ? (
            bundles.map((bundle) => {
              const displayPrice =
                billing === "monthly" ? bundle.price : bundle.yearlyPrice;
              const displayCompare =
                billing === "monthly"
                  ? bundle.compareAtPrice
                  : bundle.yearlyCompareAtPrice;

              return (
                <div
                  key={bundle.id}
                  className="p-6 bg-white rounded-[20px] shadow-md relative group hover:shadow-lg transition"
                >
                  {displayCompare && (
                    <div className="absolute top-4 right-4 bg-[#74A038] text-white text-xs font-Roboto px-2 py-1 rounded-full">
                      Save{" "}
                      {Math.round(
                        ((parseFloat(displayCompare) -
                          parseFloat(displayPrice || "0")) /
                          parseFloat(displayCompare)) *
                          100
                      )}
                      %
                    </div>
                  )}

                  <h3 className="font-Roboto text-PrimaryBlack text-[24px] font-semibold mb-2">
                    {bundle.title}
                  </h3>
                  <p className="font-Roboto text-LightGray mb-4">
                    {bundle.description}
                  </p>

                  {/* Associated Products */}
                  {bundle.associatedItems?.length > 0 && (
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                      {[...new Set(bundle.associatedItems.map((i) => i.productTitle))].map(
                        (title, idx) => {
                          const variants = bundle.associatedItems
                            .filter((i) => i.productTitle === title)
                            .map((i) => i.variantTitle)
                            .filter(Boolean);
                          return (
                            <li key={idx}>
                              <strong>{title}</strong>
                              {variants.length > 0 && (
                                <ul className="list-disc pl-5 mt-1 space-y-1 text-gray-600 text-sm">
                                  {variants.map((v, vi) => (
                                    <li key={vi}>{v}</li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          );
                        }
                      )}
                    </ul>
                  )}

                  {/* Pricing */}
                  <div className="flex items-end mt-2">
                    {displayCompare && (
                      <span className="line-through text-gray-400 text-sm mr-2">
                        {displayCompare} {bundle.currency}
                      </span>
                    )}
                    <span className="font-Roboto text-PrimaryBlack text-[24px] font-semibold">
                      {displayPrice} {bundle.currency}
                    </span>
                    <span className="text-LightGray text-[14px] ml-1">
                      /{billing === "monthly" ? "month" : "year"}
                    </span>
                  </div>

                  {/* Features */}
                  {bundle.bundleFeature?.length > 0 && (
                    <ul className="mt-3 space-y-2 text-[14px] text-[#333333]">
                      {bundle.bundleFeature.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-4 h-4 flex-shrink-0 bg-[#74A038] text-white text-xs rounded-full flex items-center justify-center">
                            ✓
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  <button
                    className="mt-4 w-full bg-PrimaryBlack text-white py-2 rounded-full font-Roboto font-medium"
                    onClick={() => {
                      const hasVirtualMailbox = bundle.associatedItems?.some((i) =>
                        i.productTitle.toLowerCase().includes("virtual mailbox")
                      );
                      const gid =
                        billing === "monthly"
                          ? bundle.monthlyVariantId
                          : bundle.yearlyVariantId;
                      const numericVariantId = gid?.split("/").pop();
                      window.location.href = hasVirtualMailbox
                        ? `/sublocations?variantId=${numericVariantId}`
                        : `/checkout/${numericVariantId}`;
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500">
              No bundles available from Shopify.
            </p>
          )}
        </div>
      ) : (
        /* Individual Products (Sanity) */
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
          {plans.map((plan, idx) => {
            const price = isYearly
              ? plan.pricing?.yearly
              : plan.pricing?.monthly;
            return (
              <div
                key={idx}
                className="p-6 bg-white rounded-[20px] shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-Roboto text-PrimaryBlack text-[22px] font-semibold mb-2">
                  {plan.title}
                </h3>
                <p className="text-LightGray mb-4">{plan.subheading}</p>

                {price && (
                  <div className="flex items-end mb-3">
                    <span className="font-Roboto text-PrimaryBlack text-[24px] font-semibold">
                      {price}
                    </span>
                    <span className="text-LightGray text-[14px] ml-1">
                      /{isYearly ? "year" : "month"}
                    </span>
                  </div>
                )}

                {plan.features && (
                  <ul className="space-y-2 text-[14px] text-[#333333]">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckBlack /> {feature}
                      </li>
                    ))}
                  </ul>
                )}

                <button
                  className="mt-5 w-full border border-PrimaryBlack text-PrimaryBlack py-2 rounded-full hover:bg-PrimaryBlack hover:text-white transition"
                  onClick={() => (window.location.href = plan.ctaUrl || "#")}
                >
                  {plan.ctaText}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  </div>
</section> );
}
