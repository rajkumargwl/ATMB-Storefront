import React, { useState } from "react";
import PlanBg from '~/components/icons/PlanBg';
import Fire from '~/components/icons/Fire';
import CheckBlack from '~/components/icons/CheckBlack';
import RightArrowWhite from '~/components/icons/RightArrowWhite';
import {
  flattenConnection,
  Image,
  Money,
  ShopPayButton,
} from '@shopify/hydrogen-react';
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
individualProducts?: any[];
};

export default function Pricingmodule({ data, bundles, individualProducts}: PricingModuleProps) {
const [activeTab, setActiveTab] = useState<"individual" | "bundles">("individual");
const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
const isYearly = billing === "yearly";
//console.log("individual product in Pricing Module:",individualProducts);
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
heading: "Simple, Transparent Pricing Plans",
description: "Choose Choose the plan that fits your needs — from basic mailbox services to feature-packed plans. our curated Shopify bundles.",
tabCards: [], // no Sanity bundles
},
];

const currentTab = tabs.find((t) => t.id === activeTab)!;
const plans = currentTab.tabCards;

return ( 
<section id = "bundle-mail-phone" className="bg-[#F6F6F6] px-5 py-[40px] md:py-[60px] lg:py-[100px]"> 
  <div className="max-w-[1240px] mx-auto flex flex-col items-center justify-center">
{/* Heading */} 
    <h2 className="max-w-[870px] mx-auto font-Roboto text-PrimaryBlack font-semibold leading-[33.8px] md:leading-[43.2px] text-[26px] md:text-[36px] tracking-[-0.39px] md:tracking-[-0.54px] text-center text-center">
      {currentTab.heading} 
    </h2> 
    <p className="mt-5 font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[27px] text-[14px] md:text-[18px] tracking-[0px] text-center">
      {currentTab.description} 
    </p>

    {/* Tabs + Billing */}
    <div className="mt-11 flex flex-col md:flex-row gap-6 w-full max-w-[1240px] items-center justify-between relative">
      <div className="hidden md:flex min-w-[209px]">&nbsp;</div>
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
                className={`px-6 py-3 font-Roboto text-[16px] font-normal leading-[24px] tracking-[0] rounded-full border transition ${
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
          className={`font-Roboto font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px] text-PrimaryBlack ${
            !isYearly ? "text-PrimaryBlack" : "text-PrimaryBlack"
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
            className={`absolute top-[2px] left-[2px] h-[18px] w-[18px] rounded-full bg-white transition-transform ${
              isYearly ? "translate-x-[18px]" : ""
            }`}
          />
        </button>

        <span
          onClick={() => setBilling("yearly")}
          className={`font-Roboto font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px] text-PrimaryBlack ${
            isYearly ? "text-PrimaryBlack" : "text-PrimaryBlack"
          }`}
        >
          {data?.billingToggle?.yearlyLabel}
        </span>

        <span className="font-Roboto text-[12px] font-normal leading-[18px] tracking-[0] bg-[#537D1B] text-white px-2 py-1 rounded-full">
          {data?.billingToggle.discountLabel}
        </span>
      </div>
    </div>

    {/* --- Render Section --- */}
    <div className="mt-11 w-full">
      {activeTab === "bundles" ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
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
                  className="flex flex-col justify-between p-6 md:p-8 bg-white rounded-[24px] relative border border-LightWhite"
                >
                  <div>
                  <div className="flex flex-row items-center justify-between mb-[11px]">
                     <h3 className="font-Roboto text-PrimaryBlack font-semibold leading-[28px] md:leading-[31.2px] text-[20px] md:text-[24px] tracking-[-0.3px] md:tracking-[-0.36px]">
                       {bundle.title}
                     </h3>
                  {displayCompare && (
                    <div className="font-Roboto text-[12px] font-normal leading-[18px] tracking-[0] bg-[#537D1B] text-white px-2 py-1 rounded-full">
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

                 
                  </div>
                  <p className="mb-5 md:mb-6 font-Roboto text-LightGray font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">
                    {bundle.description}
                  </p>
                  

                  {/* Associated Products */}
                  {bundle.associatedItems?.length > 0 && (
                    <ul className="list-none p-0 m-0 mb-5 md:mb-6 flex flex-col gap-4">
                      {[...new Set(bundle.associatedItems.map((i) => i.productTitle))].map(
                        (title, idx) => {
                          const variants = bundle.associatedItems
                            .filter((i) => i.productTitle === title)
                            .map((i) => i.variantTitle)
                            .filter(Boolean);
                          return (
                            <li key={idx} className="pb-4 border-b border-LightWhite">
                              <strong className="mb-1 block font-Roboto text-PrimaryBlack font-medium leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">{title}</strong>
                              {/* {variants.length > 0 && (
                                <ul className="list-none p-0 m-0">
                                  {variants.map((v, vi) => (
                                    <li key={vi} className="font-Roboto text-LightGray font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px]">{v}</li>
                                  ))}
                                </ul>
                              )} */}
                            </li>
                          );
                        }
                      )}
                    </ul>
                  )}
                  <p className="mb-1 font-Roboto text-[#4B5563] font-normal text-[14px] leading-[21px] tracking-[0px]">Starting from </p>

                  {/* Pricing */}
                  <div className="flex items-end mb-5 md:mb-6 gap-[2px]">
                    {displayCompare && (
                      <span className="line-through font-Roboto text-LightGray font-medium leading-[27px] md:leading-[27px] text-[18px] md:text-[18px] tracking-[0px]">
                        <Money data={{ amount: displayCompare, currencyCode: bundle.currency }} />
                      </span>
                    )}
                    <span className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[38.4px] text-[24px] md:text-[32px] tracking-[-0.36px] md:tracking-[-0.48px]">
                      <Money data={{ amount: displayPrice, currencyCode: bundle.currency }} />
                    </span>
                    <span className="font-Roboto text-[#4B5563] font-normal text-[14px] leading-[21px] tracking-[0px]">
                      /{billing === "monthly" ? "month" : "year"}
                    </span>
                  </div>

                  {/* Features */}
                  {bundle.bundleFeature?.length > 0 && (
                    <ul className="flex flex-col gap-4 mb-8 md:mb-10 pt-5 md:pt-6 border-t border-LightWhite">
                      {bundle.bundleFeature.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]">
                          <span className="flex items-center justify-center w-[24px] h-[24px]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none"><path d="M16.5544 0.110975C16.8206 0.305975 16.8806 0.680975 16.6856 0.950975L6.18563 15.351C6.08063 15.4935 5.92313 15.5835 5.74688 15.5947C5.57063 15.606 5.40188 15.546 5.27438 15.4222L0.174375 10.3222C-0.058125 10.0897 -0.058125 9.70722 0.174375 9.47472C0.406875 9.24222 0.789375 9.24222 1.02188 9.47472L5.62688 14.0797L15.7144 0.245975C15.9094 -0.0202754 16.2844 -0.0802754 16.5544 0.114725V0.110975Z" fill="#091019"></path>
                          </svg>
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                  </div>
                  <button
                    className="group relative flex items-center justify-center w-full h-[44px] md:h-[52px] rounded-[100px] font-normal tracking-[0.08px] text-[16px] leading-[16px] text-PrimaryBlack border border-[#091019] px-4 py-[12px] bg-white  hover:bg-DarkOrange hover:text-white hover:border-DarkOrange overflow-hidden transition-all"
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
                    
                    <span className="relative flex items-center">Buy Now <span className="absolute right-0 opacity-0 translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-[35px] transition-all duration-300">
              <RightArrowWhite />
            </span></span>
                  </button>
                </div>
              );
            })
          ) : (
            <p className="font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[27px] text-[14px] md:text-[18px] tracking-[0px] text-center">
              No bundles available from Shopify.
            </p>
          )}
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(292px,1fr))] justify-center max-w-[1240px] mx-auto md:[&>*:only-child]:max-w-[calc(50%)] lg:[&>*:only-child]:max-w-[calc(33.333%)] md:[&>*:only-child]:mx-auto">
          {/* Individual Products (Dynamic from Shopify) */}   
            {individualProducts && individualProducts.length > 0 ? (
              individualProducts.map((product, idx) => {
                const price =
                          billing === "yearly"
                            ? product.yearlyPrice
                              ? `${product.yearlyPrice} ${product.currency}`
                              : "Coming Soon"
                            : product.monthlyPrice
                              ? `${product.monthlyPrice} ${product.currency}`
                              : "Coming Soon";


                return (
          <div
            key={product.id || idx}
            className="flex flex-col justify-between p-6 md:p-8 bg-white rounded-[24px] border border-LightWhite"
          >
            <div>
              <h3 className="mb-[11px] font-Roboto text-PrimaryBlack font-semibold leading-[28px] md:leading-[31.2px] text-[20px] md:text-[24px] tracking-[-0.3px] md:tracking-[-0.36px]">
                {product.title}
              </h3>

              {product.description && (
                    <p
                      className="mb-5 md:mb-6 font-Roboto text-LightGray font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px] line-clamp-2"
                    >
                      {product.description}
                    </p>
                  )}


              <p className="mb-1 font-Roboto text-[#4B5563] font-normal text-[14px] leading-[21px] tracking-[0px]">
                Starting from
              </p>

              {/* Price */}
              <div className="flex items-end mb-5 md:mb-6">
            <span className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[38.4px] text-[24px] md:text-[32px] tracking-[-0.36px] md:tracking-[-0.48px]">
              <Money
                data={{
                  amount:
                    billing === "yearly"
                      ? product.yearlyPrice || product.monthlyPrice
                      : product.monthlyPrice,
                  currencyCode: product.currency,
                }}
              />
            </span>
            <span className="font-Roboto text-[#4B5563] text-[14px] ml-1">
              /{billing === "yearly" ? "year" : "month"}
            </span>
          </div>

              {/* Features (from metafield or hardcoded) */}
              {product.features && product.features.length > 0 && (
                <ul className="flex flex-col gap-4 mb-8 md:mb-10 pt-5 md:pt-6 border-t border-LightWhite">
                  {product.features.map((feature: string, i: number) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[24px] text-[16px]"
                    >
                      <span className="flex items-center justify-center w-[24px] h-[24px]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="17"
                          height="16"
                          viewBox="0 0 17 16"
                          fill="none"
                        >
                          <path
                            d="M16.5544 0.110975C16.8206 0.305975 16.8806 0.680975 16.6856 0.950975L6.18563 15.351C6.08063 15.4935 5.92313 15.5835 5.74688 15.5947C5.57063 15.606 5.40188 15.546 5.27438 15.4222L0.174375 10.3222C-0.058125 10.0897 -0.058125 9.70722 0.174375 9.47472C0.406875 9.24222 0.789375 9.24222 1.02188 9.47472L5.62688 14.0797L15.7144 0.245975C15.9094 -0.0202754 16.2844 -0.0802754 16.5544 0.114725V0.110975Z"
                            fill="#091019"
                          ></path>
                        </svg>
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* CTA */}
            <button
              className="group relative flex items-center justify-center w-full h-[44px] md:h-[52px] rounded-[100px] font-normal tracking-[0.08px] text-[16px] leading-[16px] text-PrimaryBlack border border-[#091019] px-4 py-[12px] bg-white  hover:bg-DarkOrange hover:text-white hover:border-DarkOrange overflow-hidden transition-all"
              onClick={() =>
                (window.location.href = product.ctaUrl || "#")
              }
            >
              <span className="relative flex items-center">
                {product.ctaText || "Buy Now"}
                <span className="absolute right-0 opacity-0 translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-[35px] transition-all duration-300">
                  <RightArrowWhite />
                </span>
              </span>
            </button>
          </div>
        );
      })
    ) : (
      <p className="font-Roboto text-PrimaryBlack text-center text-[16px]">
        No individual products found.
      </p>
    )}
        </div>
      )}
    </div>
  </div>
</section> );
}