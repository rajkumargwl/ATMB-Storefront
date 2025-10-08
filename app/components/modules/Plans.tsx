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

  // Bundles
  originalPrice?: string | null;
  discountedPrice?: string | null;
  saveLabel?: string | null;
  associatedProducts?: { productName: string; subheading?: string; level: string }[];
};

type PricingData = {
  individualProductsTab: {
    heading: string;
    description: string;
    plans: PlanType[];
  };
  bundlesTab: {
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

export default function PricingSection({ data }: { data: PricingData }) {
  const [activeTab, setActiveTab] = useState<"individual" | "bundles">("individual");
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const isYearly = billing === "yearly";

  const tabs = [
    { 
      id: "individual",
      tabName: "Individual Products", 
      heading: data.individualProductsTab.heading, 
      description: data.individualProductsTab.description, 
      tabCards: data.individualProductsTab.plans || [] 
    },
    { 
      id: "bundles",
      tabName: "Bundles", 
      heading: data.bundlesTab.heading, 
      description: data.bundlesTab.description, 
      tabCards: data.bundlesTab.plans || [] 
    },
  ];

  const currentTab = activeTab === "individual" ? tabs[0] : tabs[1];
  const plans = currentTab?.tabCards || [];

  return (
    <section className="bg-[#F6F6F6] px-5 py-[40px] md:py-[60px] lg:py-[100px]">
      <div className="max-w-[1240px] mx-auto items-center justify-center flex flex-col">
        {/* Heading */}
        <h2 className="max-w-[870px] mx-auto font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[26px] md:text-[36px] tracking-[-0.39px] md:tracking-[-0.54px] text-center">
          {currentTab.heading}
        </h2>
        <p className="mt-5 font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[27px] text-[14px] md:text-[18px] tracking-[0px] text-center">
          {currentTab.description}
        </p>

        {/* Tabs + Toggle */}
        <div className="mt-11 flex flex-col md:flex-row gap-6 w-full max-w-[1240px] items-center justify-between relative">
          <div className='absolute top-[0px] md:top-[-55px] lg:top-[-65px] right-[46px] hidden md:flex '>
            <PlanBg />
          </div>
          <div className="min-w-[237px] hidden lg:flex">&nbsp;</div>

          {/* Center Tabs with proper ARIA roles */}
          <div className="flex-1 flex justify-center">
<div 
  role="tablist" 
  aria-label="Pricing plans"
  className="flex gap-4"
>
  {tabs.map((tab, idx) => {
    const isSelected = activeTab === tab.id;

    // Make only Bundles tab tabbable initially
    const tabIndex = tab.id === "bundles" ? 0 : -1;

    return (
      <button
        key={tab.id}
        id={`tab-${tab.id}`}
        role="tab"
        aria-selected={isSelected}
        aria-controls={`tabpanel-${tab.id}`}
        tabIndex={tabIndex} 
        onClick={() => setActiveTab(tab.id as "individual" | "bundles")}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setActiveTab(tab.id as "individual" | "bundles");
          }
          if (e.key === "ArrowRight") {
            e.preventDefault();
            const next = (idx + 1) % tabs.length;
            setActiveTab(tabs[next].id as "individual" | "bundles");
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            const prev = (idx - 1 + tabs.length) % tabs.length;
            setActiveTab(tabs[prev].id as "individual" | "bundles");
          }
        }}
        className={`px-6 py-3 font-Roboto text-[16px] leading-[24px] tracking-[0px] font-normal rounded-full border border-LightWhite transition ${
          isSelected
            ? "border-PrimaryBlack text-white bg-PrimaryBlack"
            : "text-PrimaryBlack"
        }`}
      >
        {isSelected && <span className="sr-only">(selected tab is)</span>}
        {tab.tabName}
      </button>
    );
  })}
</div>



          </div>

          {/* Billing Toggle */}
          <div className="flex items-center gap-2">
            {/* Monthly Label (visible only, not read again) */}
            <span
              onClick={() => setBilling("monthly")}
              aria-hidden="true" // hides from SR so it won't announce twice
              className={`font-Roboto text-PrimaryBlack font-normal leading-[21px] text-[14px] tracking-[0px] ${
                !isYearly ? "text-PrimaryBlack" : "text-gray-500 hover:text-PrimaryBlack"
              }`}
            >
              {data?.billingToggle?.monthlyLabel}
            </span>

            {/* Toggle Switch */}
            <button
              onClick={() => setBilling(isYearly ? "monthly" : "yearly")}
              className={`relative h-[22px] w-10 rounded-full transition ${
                isYearly ? "bg-[#ff6600]" : "bg-[#BFBFBF]"
              }`}
              role="switch"
              aria-checked={isYearly}
              aria-label="Toggle billing cycle"
            >
              <span
                className={`absolute top-[2px] left-[2px] h-[18px] w-[18px] rounded-full bg-white shadow transition-transform ${
                  isYearly ? "translate-x-[18px]" : ""
                }`}
              />
            </button>

            {/* Live region for billing toggle */}
            <div key={billing} className="sr-only" aria-live="assertive">
              {isYearly ? "Billing cycle is selected as Yearly" : "Billing cycle is selected as Monthly"}
            </div>

            <span
              onClick={() => setBilling("yearly")}
              className={`font-Roboto text-PrimaryBlack font-normal leading-[21px] text-[14px] tracking-[0px] ${
                isYearly ? "text-PrimaryBlack" : "text-gray-500 hover:text-PrimaryBlack"
              }`}
            >
              {data?.billingToggle.yearlyLabel}
            </span>

            <span className="font-Roboto font-normal leading-[18px] text-[12px] tracking-[0px] text-[#ffffff] bg-[#537D1B] px-2 py-1 rounded-full">
              {data?.billingToggle.discountLabel}
            </span>
          </div>
        </div>

        {/* Tab Panels */}
        <div 
          id={`tabpanel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          tabIndex={0}
          className="mt-11 w-full"
        >
          {/* Cards */}
          <div className="items-start justify-center grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
            {plans.map((plan, idx) => {
              const price = plan.pricing
                ? isYearly
                  ? plan.pricing.yearly
                  : plan.pricing.monthly
                : plan.pricing?.discountedPrice || null;

              const isBundlesTab = activeTab == 'bundles';
              
              return (
                <div
                  key={idx}
                  className={`relative group transition-all duration-500 ease-in-out hover:bg-[#ff66001a] ${
                    isBundlesTab
                      ? plan?.isMostPopular
                        ? "p-[2px] pt-[2px] pb-[8px] border border-[#EE6D2D] bg-gradient-to-b from-[#EE6D2D] to-transparent rounded-[24px]"
                        : "p-[2px] pt-[2px] pb-[8px] border border-LightWhite bg-white rounded-[24px]"
                      : plan?.isMostPopular
                        ? "p-[8px] pt-[8px] pb-[8px] border border-LightWhite bg-white rounded-[24px]"
                        : "p-[8px] pt-[8px] pb-[8px] border border-LightWhite bg-white rounded-[24px]"
                  }`}
                >
                  <div className={`relative pb-[16px] rounded-[20px] group-hover:bg-white ${plan?.isMostPopular ? "" : "h-full"}`}>
                    {/* Orange border effect - only for individual products tab */}
                    {!isBundlesTab && (
                      <div className="absolute left-0 top-0 w-full h-[260px] rounded-[20px] border border-[#EE6D2D] transition-all duration-500 ease-in-out group-hover:h-[100%]"></div>
                    )}
                    {isBundlesTab && (
                      <div className="absolute left-0 top-0 w-full h-[260px] rounded-[20px] border border-[#EE6D2D] transition-all duration-500 ease-in-out group-hover:h-[100%]"></div>
                    )}
                    
                    <div className={`bg-white rounded-[20px] p-6 shadow-[0_6px_24px_0_rgba(0,0,0,0.05)] ${
                      isBundlesTab && plan?.isMostPopular ? "border border-[#EE6D2D]" : ""
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className={`transition-all duration-500 ease-in-out w-12 h-12 rounded-full border ${
                          isBundlesTab ? "border-[#E5E5E5] bg-[#F9F9F9]" : "border-[#DCDCDC]"
                        } flex items-center justify-center bg-[#F6F6F6] group-hover:bg-DarkOrange group-hover:border-DarkOrange`}>
                          {plan.icon?.svgFile?.asset?.url ? (
                            <img src={plan.icon.svgFile.asset.url} alt={plan.title} className="w-6 h-6 bg-Dark transition-all  group-hover:invert  "title={plan.icon?.tooltipTitle}   />
                            
                          ) : (
                            <span className="text-xs text-gray-500">Icon</span>
                          )}
                        </div>
                        
                        {/* Most Popular Badge - different styling for bundles */}
                        {plan?.isMostPopular && (
                          <div className={`flex gap-2 p-2 rounded-[100px] border ${
                            isBundlesTab
                              ? "border-[rgba(238,109,45,0.3)] bg-[#FFF1EA]"
                              : "border-[rgba(238,109,45,0.5)] bg-[#FFF1EA]"
                          } font-Roboto text-PrimaryBlack font-normal leading-[18px] text-[12px]`}>
                            <Fire /> {plan.mostPopularLabel}
                          </div>
                        )}
                        
                        {/* Save Label - bundles specific */}
                        {plan.pricing?.saveLabel && isBundlesTab && (
                          <div className="px-2 py-1 rounded-full bg-[#74A038] text-white text-xs font-Roboto">
                            {plan.pricing.saveLabel}
                          </div>
                        )}
                      </div>

                      <h3 className="font-Roboto text-PrimaryBlack text-[22px] md:text-[24px] leading-[28.6px] md:leading-[31.2px] font-semibold tracking-[-0.33px] md:tracking-[-0.36px] mt-6 mb-2">
                        {plan.title}
                      </h3>
                      
                      {/* Bundle-specific subheading styling */}
                      <p className={`font-Roboto ${
                        isBundlesTab ? "text-[#666666]" : "text-LightGray"
                      } font-normal leading-[21px] text-[14px] tracking-[0px]`}>
                        {plan.subheading}
                      </p>

                      {/* Associated Products for Bundles */}
                      {/* {isBundlesTab && plan.associatedProducts && plan.associatedProducts.length > 0 && (
                        <div className="mt-4 p-3 bg-[#F9F9F9] rounded-lg">                
                          <div className="space-y-2">
                            {plan.associatedProducts.map((product, productIdx) => (
                              <div key={productIdx} className="flex items-center justify-between">
                                <div>
                                  <p className="font-Roboto text-LightGray font-normal leading-[21px] text-[14px] tracking-[0px]">
                                    {plan.subheading || "Starting from"}
                                  </p>
                                  {price && (
                                    <div className="flex items-end mt-1">
                                      {plan.originalPrice && (
                                        <span className="line-through text-gray-400 text-sm mr-2">{plan.originalPrice}</span>
                                      )}
                                      <span className="font-Roboto text-PrimaryBlack text-[24px] leading-[31.2px] font-semibold tracking-[-0.36px]">
                                        {price}
                                      </span>
                                      <span className="font-Roboto text-LightGray font-normal leading-[21px] text-[14px] tracking-[0px]">
                                        /{isYearly ? "year" : "month"}
                                      </span>
                                    </div>
                                  )}
                                </div>
                                {product.level && (
                                  <span className="px-2 py-1 bg-[#E5E5E5] text-[#333333] text-xs rounded-full">
                                    {product.level}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )} */}
                      {isBundlesTab && plan.associatedProducts && plan.associatedProducts.length > 0 && (
                          <div className="mt-4 p-3 bg-[#F9F9F9] rounded-lg">                
                            <div className="space-y-2">
                              {plan.associatedProducts.map((product, productIdx) => (
                                <div key={productIdx} className="flex items-center justify-between">
                                  <div>
                                    <p className="font-Roboto text-LightGray font-normal leading-[21px] text-[14px] tracking-[0px]">
                                      {product.productName}
                                    </p>
                                    {product.subheading && (
                                      <p className="text-sm text-gray-500">{product.subheading}</p>
                                    )}
                                  </div>
                                  {product.level && (
                                    <span className="px-2 py-1 bg-[#E5E5E5] text-[#333333] text-xs rounded-full">
                                      {product.level}
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>

                            {/* Bundle Price - shown once */}
                            {price && (
                              <div className="flex items-end mt-4">
                                {plan.originalPrice && (
                                  <span className="line-through text-gray-400 text-sm mr-2">{plan.originalPrice}</span>
                                )}
                                <span className="font-Roboto text-PrimaryBlack text-[24px] leading-[31.2px] font-semibold tracking-[-0.36px]">
                                  {price}
                                </span>
                                <span className="font-Roboto text-LightGray font-normal leading-[21px] text-[14px] tracking-[0px]">
                                  /{isYearly ? "year" : "month"}
                                </span>
                              </div>
                            )}
                          </div>
                        )}

                      <div className="mt-6 flex flex-row justify-between items-center">
                        <div>
                          <p className="font-Roboto text-LightGray font-normal leading-[21px] text-[14px] tracking-[0px]">
                            {plan.startingFromText || "Starting from"}
                          </p>
                          {price && (
                            <div className="flex items-end mt-1">
                              {/* Show original price for bundles if available */}
                              {isBundlesTab && plan.pricing?.originalPrice && (
                                <span className="line-through text-gray-400 text-sm mr-2">{plan.pricing.originalPrice}</span>
                              )}
                              <span className="font-Roboto text-PrimaryBlack text-[24px] leading-[31.2px] font-semibold tracking-[-0.36px]">
                                {price}
                              </span>
                              <span className="font-Roboto text-LightGray font-normal leading-[21px] text-[14px] tracking-[0px]">
                                /{isYearly ? "year" : "month"}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {/* Bundle-specific additional info */}
                        {isBundlesTab && plan.additionalInfo && (
                          <div className="text-right">
                            <p className="font-Roboto text-[#666666] text-[12px] leading-[18px]">
                              {plan.additionalInfo}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Features - different styling for bundles */}
                    {plan.features && plan.features.length > 0 && (
                      <ul className={`mt-7 mb-7 space-y-4 text-[16px] text-[#091019] ${
                        isBundlesTab ? "pl-0" : "pl-[24px] md:pl-6"
                      }`}>
                        {plan.features.map((f, i) => (
                          <li key={i} className={`flex items-center gap-3 font-Roboto ${
                            isBundlesTab ? "text-[#333333]" : "text-PrimaryBlack"
                          } font-normal leading-[24px] text-[16px]`}>
                            {isBundlesTab ? (
                              <div className="w-5 h-5 rounded-full bg-[#74A038] flex items-center justify-center">
                                <span className="text-white text-xs">✓</span>
                              </div>
                            ) : (
                              <CheckBlack />
                            )}
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Button - different styling for bundles */}
                    <button
                      className={`btn-main relative z-[8] flex-shrink-0 flex items-center justify-center w-[calc(100%-48px)] mx-auto h-[52px] border rounded-full px-4 py-3 text-[16px] font-normal font-Roboto leading-[16px] tracking-[0.08px] transition-all hover:scale-[1.01] ${
                        isBundlesTab
                          ? "border-[#EE6D2D] bg-[#EE6D2D] text-white hover:bg-[#DD5827] hover:border-[#DD5827]"
                          : "border-PrimaryBlack text-PrimaryBlack group-hover:bg-DarkOrange group-hover:text-white group-hover:border-DarkOrange hover:bg-[#DD5827]"
                      }`}
                    >
                      <span className="relative flex items-center">
                        {plan.ctaText}
                        <span className={`arrow-show absolute right-0 opacity-0 translate-x-[-8px] transition-all duration-300 ${
                          isBundlesTab ? "text-white" : ""
                        }`}>
                           <span className="sr-only">(Click to Buy this Product) {plan.title}</span>
                          {isBundlesTab ? (
                            <span className="text-white">→</span>
                          ) : (
                            <RightArrowWhite />
                          )}
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}