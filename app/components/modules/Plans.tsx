// import React, { useState } from "react";
// import PlanBg from '~/components/icons/PlanBg';
// import Fire from '~/components/icons/Fire';
// import CheckBlack from '~/components/icons/CheckBlack';
// import Phone from '~/components/icons/Phone';

// /* ---------------- Mock JSON ---------------- */
// const mockData = {
//   badge: "Simple, Transparent Pricing Plans",
//   heading:
//     "Choose the plan that fits your needs — from basic mailbox services to feature-packed plans.",
//   individualPlans: [
//     {
//       title: "Phone Unlimited",
//       heading: "Keep your business connected from any location.",
//       monthlyPrice: "$19.99",
//       yearlyPrice: "$16.00",
//       ctaText: "Buy Now",
//       isMostPopular: false,
//       features: [
//         "Live Answering Minutes",
//         "Appointment Scheduling",
//         "Professional Appointment Scheduling App",
//       ],
//     },
//     {
//       title: "Live Receptionist 50",
//       heading: "Access and manage your mail from anywhere.",
//       monthlyPrice: "$125",
//       yearlyPrice: "$100",
//       ctaText: "Buy Now",
//       isMostPopular: true,
//       features: [
//         "50 Live Answering Minutes",
//         "Appointment Scheduling",
//         "Professional Appointment Scheduling App",
//       ],
//     },
//     {
//       title: "Live Receptionist 100",
//       heading: "Resources, mentorship, and tools to grow faster.",
//       monthlyPrice: "$175",
//       yearlyPrice: "$140",
//       ctaText: "Buy Now",
//       isMostPopular: false,
//       features: [
//         "100 Live Answering Minutes",
//         "Appointment Scheduling",
//         "Professional Appointment Scheduling App",
//       ],
//     },
//   ],
//   bundlePlans: [
//     {
//       title: "Solo Starter",
//       heading: "Ideal for freelancers & solo founders.",
//       monthlyPrice: "$20",
//       yearlyPrice: "$16",
//       discountPercent: "8%",
//       discountedMonthlyPrice: "$18.4",
//       discountedYearlyPrice: "$14.7",
//       ctaText: "Buy Now",
//       services: [
//         {
//           name: "Anytime Mailbox",
//           tier: "Basic",
//           desc: "Mail scanning & forwarding",
//         },
//         {
//           name: "Anytime Phone",
//           tier: "Basic",
//           desc: "Dedicated business number",
//         },
//       ],
//       features: [
//         "Affordable essentials to get started.",
//         "Professional image without high costs.",
//         "Easy upgrade to higher tiers.",
//       ],
//     },
//     {
//       title: "Mobile Pro",
//       heading: "Perfect for on-the-go professionals.",
//       monthlyPrice: "$27",
//       yearlyPrice: "$22",
//       discountPercent: "12%",
//       discountedMonthlyPrice: "$23.75",
//       discountedYearlyPrice: "$19.4",
//       ctaText: "Buy Now",
//       services: [
//         {
//           name: "Anytime Mailbox",
//           tier: "Standard",
//           desc: "Increased scans & storage",
//         },
//         {
//           name: "Anytime Phone",
//           tier: "Standard",
//           desc: "Call forwarding & voicemail transcription",
//         },
//       ],
//       features: [
//         "Reliable communication on the move.",
//         "Professional presence in multiple locations.",
//         "Flexible setup with no downtime.",
//       ],
//     },
//   ],
// };

// /* ---------------- UI Helpers ---------------- */
// const Check = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="13" viewBox="0 0 16 13" fill="none">
//   <path d="M15.6652 0.851508C16.1116 1.32018 16.1116 2.08132 15.6652 2.54999L6.52338 12.1485C6.077 12.6172 5.35208 12.6172 4.9057 12.1485L0.334784 7.34924C-0.111595 6.88057 -0.111595 6.11943 0.334784 5.65076C0.781163 5.18208 1.50608 5.18208 1.95246 5.65076L5.71633 9.59889L14.0511 0.851508C14.4975 0.382831 15.2224 0.382831 15.6688 0.851508H15.6652Z" fill="#091019"/>
// </svg>
// );

// /* ---------------- Pricing Section ---------------- */
// function PricingSection({ data }: { data: typeof mockData }) {
//   const [activeTab, setActiveTab] = useState<"individual" | "bundles">(
//     "individual"
//   );
//   const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

//   const isYearly = billing === "yearly";
//   const plans =
//     activeTab === "individual" ? data.individualPlans : data.bundlePlans;

//   return (
//     <section className="bg-[#F6F6F6] px-5 py-[40px] md:py-[60px] lg:py-[100px]">
//       <div className="max-w-[1240px] mx-auto items-center justify-center flex flex-col">
//         {/* Badge */}
//         {/* <div className="flex gap-2 mb-4 bg-[#FFE5D8] px-3 py-2 rounded-full w-max">
//           <span className="w-2 h-2 bg-[#EE6D2D] rounded-full" />
//           <span className="text-sm font-medium text-gray-700">
//             {data?.badge}
//           </span>
//         </div> */}

//         {/* Heading */}
//         <h2 className="max-w-[870px] mx-auto font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[26px] md:text-[36px] tracking-[-0.39px] md:tracking-[-0.54px] text-center">
//           {data.heading}
//         </h2>
//         <p className="mt-5 font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[27px] text-[14px] md:text-[18px] tracking-[0px] text-center">Virtual tools that let you manage mail, calls, and growth from anywhere.</p>

//         {/* Tabs + Toggle */}
//         <div className="mt-11 flex flex-col md:flex-row gap-6 w-full max-w-[1240px] items-center justify-between relative">
//            <div className='absolute top-[0px] md:top-[-55px] lg:top-[-65px] right-[46px] hidden md:flex '>
//              <PlanBg />
//           </div>
//           <div className="min-w-[237px] hidden lg:flex">&nbsp;</div>
//           {/* Center Tabs */}
//           <div className="flex-1 flex justify-center">
//             <div className="flex gap-4">
//               <button
//                 onClick={() => setActiveTab("individual")}
//                 className={`px-6 py-3 font-Roboto text-[16px] leading-[24px] tracking-[0px] font-normal rounded-full  border border-LightWhite transition ${
//                   activeTab === "individual"
//                     ? "border-PrimaryBlack text-white bg-PrimaryBlack"
//                     : "text-PrimaryBlack"
//                 }`}
//               >
//                 Individual Products
//               </button>
//               <button
//                 onClick={() => setActiveTab("bundles")}
//                 className={`px-6 py-3 font-Roboto text-[16px] leading-[24px] tracking-[0px] font-normal rounded-full  border border-LightWhite transition ${
//                   activeTab === "bundles"
//                     ? "border-PrimaryBlack text-white bg-PrimaryBlack"
//                     : "text-PrimaryBlack"
//                 }`}
//               >
//                 Bundles
//               </button>
//             </div>
//           </div>

//           {/* Billing Toggle (Right) */}
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setBilling("monthly")}
//               className={`font-Roboto text-PrimaryBlack font-normal leading-[21px] text-[14px] tracking-[0px] ${
//                 !isYearly ? "text-text-PrimaryBlack" : "text-gray-500 hover:text-text-PrimaryBlack"
//               }`}
//             >
//               Monthly
//             </button>

//             <button
//               onClick={() => setBilling(isYearly ? "monthly" : "yearly")}
//               className={`relative h-8 w-16 rounded-full transition ${
//                 isYearly ? "bg-[#74A038]" : "bg-[#BFBFBF]"
//               }`}
//               aria-label="Toggle billing cycle"
//             >
//               <span
//                 className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-white shadow transition-transform ${
//                   isYearly ? "translate-x-8" : ""
//                 }`}
//               />
//             </button>

//             <button
//               onClick={() => setBilling("yearly")}
//               className={`font-Roboto text-PrimaryBlack font-normal leading-[21px] text-[14px] tracking-[0px] ${
//                 isYearly ? "text-PrimaryBlack" : "text-gray-500 hover:text-PrimaryBlack"
//               }`}
//             >
//               Yearly
//             </button>

//             <span className="font-Roboto font-normal leading-[18px] text-[12px] tracking-[0px] text-[#ffffff] bg-[#74A038] px-2 py-1 rounded-full">
//               20% off
//             </span>
//           </div>
//         </div>


//         {/* Cards */}
//         <div className={`mt-11 items-center justify-center ${activeTab === 'individual' ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3' : 'grid md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-6'} w-full`}>
//           {plans.map((plan, idx) => {
//             if (activeTab === "individual") {
//               // ---------- Individual Card ----------
//               const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
//               const unit = isYearly ? "year" : "month";

//               return (
//                 <div
//                   key={idx}
//                   className={`relative ${
//                     plan?.isMostPopular
//                       ? "px-[11px] bg-PrimaryBlack rounded-[32px]"
//                       : "p-[8px] pt-[8px] pb-[24px] border border-LightWhite bg-[#F6F6F6] rounded-[24px]"
//                   }`}
//                 >
                  
//                   <div className={`${plan?.isMostPopular ? "bg-white rounded-[20px] px-[8px] pt-[8px] pb-[24px] mt-[11px] mb-[11px] border border-[#EE6D2D] shadow-[0_6px_24px_0_rgba(0,0,0,0.05)]" : "h-full" }`}>
//                     {/* Inner White Box (Title + Price + CTA Button) */}
//                     <div className="bg-white rounded-[20px] p-6 border border-[#EE6D2D] shadow-[0_6px_24px_0_rgba(0,0,0,0.05)]">
//                       <div className="flex items-center justify-between">
//                       <div className="w-12 h-12 rounded-full bg-[#F9F9F9] border border-[#DCDCDC] flex items-center justify-center">
//                         <Phone />
//                       </div>
//                        {plan?.isMostPopular && (
//                       <div className="flex gap-2 p-2 rounded-[100px] border border-[rgba(238,109,45,0.5)] bg-[#FFF1EA] font-Roboto text-PrimaryBlack font-normal leading-[18px] text-[12px]">
//                        <Fire /> Most Popular
//                       </div>
//                     )}
//                       </div>
                      
//                       <h3 className="font-Roboto text-PrimaryBlack text-[22px] md:text-[24px] leading-[28.6px] md:leading-[31.2px] font-semibold tracking-[-0.33px] md:tracking-[-0.36px] mt-6 mb-2">
//                         {plan.title}
//                       </h3>
//                       <p className="font-Roboto text-LightGray font-normal leading-[21px] text-[14px] tracking-[0px]">{plan.heading}</p>

//                       <div className="mt-6 flex flex-row justify-between items-center">
//                         {/* Left: Price */}
//                         <div>
//                            <p className="font-Roboto text-LightGray font-normal leading-[21px] text-[14px] tracking-[0px]">Starting from</p>
//                           <div className="flex items-end mt-1">
//                             <span className="font-Roboto text-PrimaryBlack text-[24px] leading-[31.2px] font-semibold tracking-[-0.36px]">
//                               {price}
//                             </span>
//                             <span className="font-Roboto text-LightGray font-normal leading-[21px] text-[14px] tracking-[0px]">/{unit}</span>
//                           </div>
                         
//                         </div>

                        
//                       </div>
                    
//                     </div>

//                     {/* Features Outside White Box */}
//                     <ul className="mt-7 mb-7 space-y-4 text-[16px] text-[#091019] pl-[7px] md:pl-6">
//                       {plan.features.map((f, i) => (
//                         <li key={i} className="flex items-center gap-3 font-Roboto text-PrimaryBlack font-normal leading-[24px] text-[16px]">
//                           <CheckBlack />
//                           {f}
//                         </li>
//                       ))}
//                     </ul>

//                     {/* Right: Button */}
//                         <button
//                           className={`flex-shrink-0 flex items-center justify-center w-full md:w-[calc(100%-48px)] mx-auto h-[52px] rounded-full px-4 py-3 text-[16px] font-normal font-Roboto leading-[16px] tracking-[0.08px] transition ${
//                             plan.isMostPopular
//                               ? "bg-DarkOrange text-white"
//                               : "border border-PrimaryBlack text-PrimaryBlack"
//                           }`}
//                         >
//                           {plan.ctaText}
//                         </button>

//                   </div>
//                 </div>
//               );
//             } else {
//               // ---------- Bundle Card ----------
//               const discountPrice = isYearly
//                 ? plan.discountedYearlyPrice
//                 : plan.discountedMonthlyPrice;
//               const originalPrice = isYearly
//                 ? plan.yearlyPrice
//                 : plan.monthlyPrice;
//               const unit = isYearly ? "year" : "month";

//               return (
//                 <div
//                   key={idx}
//                 className="relative relative p-[8px] pt-[8px] pb-[24px] border border-LightWhite bg-[#F6F6F6] rounded-[24px] xl:min-w-[390px] xl:max-w-[390px]"
//                 >
//                   <div className="bg-white rounded-[20px] p-6 border border-[#EE6D2D] shadow-[0_6px_24px_0_rgba(0,0,0,0.05)]">
//                     <div className="font-Roboto bg-[#74A03812] text-[#558019] text-[14px] px-4 py-3 rounded-full w-max border border-[#74A038] mt-4 mb-5">
//                       Save {plan.discountPercent}
//                     </div>

//                     <h3 className="font-Roboto text-PrimaryBlack text-[24px] leading-[31.2px] font-semibold tracking-[-0.36px] mt-6 mb-2">
//                       {plan.title}
//                     </h3>
//                     <p className="font-Roboto text-LightGray font-normal leading-[21px] text-[14px] tracking-[0px]">{plan.heading}</p>

//                      <div className="mt-6 flex flex-row justify-between items-center">
//                         {/* Left: Price */}
//                         <div>
//                           <p className="font-Roboto text-LightGray font-normal leading-[21px] text-[14px] tracking-[0px]">Starting from</p>
//                           <div className="flex items-end mt-1">
//                             <span className="font-Roboto text-LightGray font-normal leading-[21px] text-[18px]">
//                               {originalPrice}
//                             </span>
//                             <span className="font-Roboto text-PrimaryBlack text-[24px] leading-[31.2px] font-semibold tracking-[-0.36px]">
//                               {discountPrice}
//                             </span>
//                             <span className="font-Roboto text-LightGray font-normal leading-[21px] text-[14px] tracking-[0px]">/{unit}</span>
//                           </div>
                          
//                         </div>

                      
//                       </div>
//                   </div>

//                   {/* Sub-services */}
//                   <div className="mt-7 space-y-5">
//                     {plan.services.map((s, i) => (
//                       <div
//                         key={i}
//                         className="flex items-center justify-between bg-white rounded-[20px] p-6 border border-[#EE6D2D] shadow-[0_6px_24px_0_rgba(0,0,0,0.05)]"
//                       >
//                         <div>
//                           <p className="font-Roboto text-PrimaryBlack text-[24px] leading-[31.2px] font-semibold tracking-[-0.36px] mb-2">
//                             {s.name}
//                           </p>
//                           <p className="font-Roboto text-LightGray font-normal leading-[21px] text-[14px] tracking-[0px]">{s.desc}</p>
//                         </div>
//                         <span className="font-Roboto text-[12px] bg-[#FFF1EA] text-[#091019] px-4 py-3 border border-[#EE6D2D] rounded-full">
//                           {s.tier}
//                         </span>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Features */}
//                   <ul className="mt-7 mb-7 space-y-4 text-[16px] text-[#091019] pl-[7px] md:pl-6">
//                     {plan.features.map((f, i) => (
//                       <li key={i} className="flex items-center gap-3 font-Roboto text-PrimaryBlack font-normal leading-[24px] text-[16px]">
//                         <Check />
//                         {f}
//                       </li>
//                     ))}
//                   </ul>
//                     {/* Right: Button */}
//                         <button
//                           className={`flex-shrink-0 flex items-center justify-center w-full md:w-[calc(100%-48px)] mx-auto h-[52px] rounded-full px-4 py-3 text-[16px] font-normal font-Roboto leading-[16px] tracking-[0.08px] transition border border-PrimaryBlack text-PrimaryBlack`}
//                         >
//                           {plan.ctaText}
//                         </button>
//                 </div>
//               );
//             }
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default function PricingSectionDemo() {
//   return <PricingSection data={mockData} />;
// }
// import React, { useState } from "react";
// import PlanBg from '~/components/icons/PlanBg';
// import Fire from '~/components/icons/Fire';
//  import CheckBlack from '~/components/icons/CheckBlack';
//  import RightArrowWhite from '~/components/icons/RightArrowWhite';
// type PlanType = {
//   ctaBgColor: string | null;
//   ctaText: string;
//   ctaTextColor: string | null;
//   ctaUrl: string | null;
//   features: string[] | null;
//   icon: { svgCode: string | null; svgFile: { asset: { url: string } } | null } | null;
//   isMostPopular: boolean;
//   mostPopularLabel: string;
//   pricing: { monthly: string; yearly: string } | null;
//   startingFromText: string;
//   subheading: string | null;
//   title: string;
// };

// type TabType = {
//   tabName: string;
//   tabCards: PlanType[];
// };

// type PricingData = {
//   billingToggle: {
//     discountLabel: string;
//     monthlyLabel: string;
//     yearlyLabel: string;
//   };
//   description: string;
//   heading: string;
//   tabs: TabType[];
// };

// const Check = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="13" viewBox="0 0 16 13" fill="none">
//     <path d="M15.6652 0.851508C16.1116 1.32018 16.1116 2.08132 15.6652 2.54999L6.52338 12.1485C6.077 12.6172 5.35208 12.6172 4.9057 12.1485L0.334784 7.34924C-0.111595 6.88057 -0.111595 6.11943 0.334784 5.65076C0.781163 5.18208 1.50608 5.18208 1.95246 5.65076L5.71633 9.59889L14.0511 0.851508C14.4975 0.382831 15.2224 0.382831 15.6688 0.851508H15.6652Z" fill="#091019"/>
//   </svg>
// );

// export default function PricingSection({ data }: { data: PricingData }) {
//   const [activeTab, setActiveTab] = useState(0); // 0 -> Individual, 1 -> Bundles
//   const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

//   const isYearly = billing === "yearly";
//   const currentTab = data.tabs[activeTab];
//   const plans = currentTab?.tabCards || [];

//   return (
//     <section className="bg-[#F6F6F6] px-5 py-[40px] md:py-[60px] lg:py-[100px]">
//       <div className="max-w-[1240px] mx-auto items-center justify-center flex flex-col">
//         {/* Heading */}
//         <h2 className="max-w-[870px] mx-auto font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[43.2px] text-[26px] md:text-[36px] tracking-[-0.39px] md:tracking-[-0.54px] text-center">
//           {data.heading}
//         </h2>
//         <p className="mt-5 font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[27px] text-[14px] md:text-[18px] tracking-[0px] text-center">
//           {data.description}
//         </p>

//         {/* Tabs + Toggle */}
//         <div className="mt-11 flex flex-col md:flex-row gap-6 w-full max-w-[1240px] items-center justify-between relative">
//           <div className='absolute top-[0px] md:top-[-55px] lg:top-[-65px] right-[46px] hidden md:flex '>
//             <PlanBg />
//           </div>
//           <div className="min-w-[237px] hidden lg:flex">&nbsp;</div>

//           {/* Center Tabs */}
//           <div className="flex-1 flex justify-center">
//             <div className="flex gap-4">
//               {data.tabs.map((tab, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => setActiveTab(idx)}
//                   className={`px-6 py-3 font-Roboto text-[16px] leading-[24px] tracking-[0px] font-normal rounded-full border border-LightWhite transition ${
//                     activeTab === idx
//                       ? "border-PrimaryBlack text-white bg-PrimaryBlack"
//                       : "text-PrimaryBlack"
//                   }`}
//                 >
//                   {tab?.tabName}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Billing Toggle */}
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setBilling("monthly")}
//               className={`font-Roboto text-PrimaryBlack font-normal leading-[21px] text-[14px] tracking-[0px] ${
//                 !isYearly ? "text-PrimaryBlack" : "text-gray-500 hover:text-PrimaryBlack"
//               }`}
//             >
//               {data?.billingToggle?.monthlyLabel}
//             </button>

//             <button
//               onClick={() => setBilling(isYearly ? "monthly" : "yearly")}
//               className={`relative h-[22px] w-10 rounded-full transition ${
//                 isYearly ? "bg-[#ff6600]" : "bg-[#BFBFBF]"
//               }`}
//               aria-label="Toggle billing cycle"
//             >
//               <span
//                 className={`absolute top-[2px] left-[2px] h-[18px] w-[18px] rounded-full bg-white shadow transition-transform ${
//                   isYearly ? "translate-x-[18px]" : ""
//                 }`}
//               />
//             </button>

//             <button
//               onClick={() => setBilling("yearly")}
//               className={`font-Roboto text-PrimaryBlack font-normal leading-[21px] text-[14px] tracking-[0px] ${
//                 isYearly ? "text-PrimaryBlack" : "text-gray-500 hover:text-PrimaryBlack"
//               }`}
//             >
//               {data?.billingToggle.yearlyLabel}
//             </button>

//             <span className="font-Roboto font-normal leading-[18px] text-[12px] tracking-[0px] text-[#ffffff] bg-[#74A038] px-2 py-1 rounded-full">
//               {data?.billingToggle.discountLabel}
//             </span>
//           </div>
//         </div>

//         {/* Cards */}
//         <div className="mt-11 items-start justify-center grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
//           {plans.map((plan, idx) => {
//             const price = plan.pricing
//               ? isYearly
//                 ? plan.pricing.yearly
//                 : plan.pricing.monthly
//               : null;

//             return (
//               <div
//                 key={idx}
//                 className={`relative group transition-all duration-500 ease-in-out ${
//                   plan?.isMostPopular
//                     ? "p-[8px] pt-[8px] pb-[24px] border border-LightWhite bg-white rounded-[24px]"
//                     : "p-[8px] pt-[8px] pb-[24px] border border-LightWhite bg-white rounded-[24px]"
//                 }`}
//               >
//                 <div className={` relative  ${plan?.isMostPopular ? "" : "h-full" }`}>
//                   <div className="absolute left-0 top-0 w-full h-[260px] rounded-[20px] border border-[#EE6D2D] transition-all duration-500 ease-in-out group-hover:h-[calc(100%+16px)]"></div>
//                   <div className={`bg-white rounded-[20px] p-6  shadow-[0_6px_24px_0_rgba(0,0,0,0.05)] ${
//                       plan.isMostPopular
//                         ? ""
//                         : ""
//                     }`}>
//                     <div className="flex items-center justify-between">
//                       <div className={`transition-all duration-500 ease-in-out w-12 h-12 rounded-full  border border-[#DCDCDC] flex items-center justify-center group-hover:bg-DarkOrange ${
//                       plan.isMostPopular
//                         ? ""
//                         : ""
//                     }`}>
//                         {plan.icon?.svgFile?.asset?.url ? (
                          
//                           <img src={plan.icon.svgFile.asset.url} alt={plan.title} className="w-6 h-6 bg-Dark" />
//                         ) : (
//                           <span className="text-xs text-gray-500">Icon</span>
//                         )}
//                       </div>
//                       {plan?.isMostPopular && (
//                         <div className="flex gap-2 p-2 rounded-[100px] border border-[rgba(238,109,45,0.5)] bg-[#FFF1EA] font-Roboto text-PrimaryBlack font-normal leading-[18px] text-[12px]">
//                           <Fire /> {plan.mostPopularLabel}
//                         </div>
//                       )}
//                     </div>

//                     <h3 className="font-Roboto text-PrimaryBlack text-[22px] md:text-[24px] leading-[28.6px] md:leading-[31.2px] font-semibold tracking-[-0.33px] md:tracking-[-0.36px] mt-6 mb-2">
//                       {plan.title}
//                     </h3>
//                     <p className="font-Roboto text-LightGray font-normal leading-[21px] text-[14px] tracking-[0px]">{plan.subheading}</p>

//                     <div className="mt-6 flex flex-row justify-between items-center">
//                       <div>
//                         <p className="font-Roboto text-LightGray font-normal leading-[21px] text-[14px] tracking-[0px]">{plan.startingFromText}</p>
//                         {price && (
//                           <div className="flex items-end mt-1">
//                             <span className="font-Roboto text-PrimaryBlack text-[24px] leading-[31.2px] font-semibold tracking-[-0.36px]">
//                               {price}
//                             </span>
//                             <span className="font-Roboto text-LightGray font-normal leading-[21px] text-[14px] tracking-[0px]">
//                               /{isYearly ? "year" : "month"}
//                             </span>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Features */}
//                   {plan.features && (
//                     <ul className="mt-7 mb-7 space-y-4 text-[16px] text-[#091019] pl-[7px] md:pl-6">
//                       {plan.features.map((f, i) => (
//                         <li key={i} className="flex items-center gap-3 font-Roboto text-PrimaryBlack font-normal leading-[24px] text-[16px]">
//                           <CheckBlack />
//                           {f}
//                         </li>
//                       ))}
//                     </ul>
//                   )}

//                   <button
//                     className={`relative z-[8] flex-shrink-0 flex items-center justify-center w-full md:w-[calc(100%-48px)] mx-auto h-[52px] border border-PrimaryBlack  rounded-full px-4 py-3 text-[16px] text-PrimaryBlack font-normal font-Roboto leading-[16px] tracking-[0.08px] transition-all group-hover:bg-DarkOrange group-hover:text-white group-hover:border-DarkOrange hover:scale-[1.01] hover:bg-[#DD5827] group ${
//                       plan.isMostPopular
//                         ? "hover:bg-[#DD5827]"
//                         : "hover:bg-[#DD5827]"
//                     }`}
//                   >
                    
//                     <span className="relative flex items-center">{plan.ctaText} <span className="absolute right-0 opacity-0 translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-[35px] transition-all duration-300">
//                       <RightArrowWhite />
//                     </span></span>
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }
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
    { tabName: "Individual Products", heading: data.individualProductsTab.heading, description: data.individualProductsTab.description, tabCards: data.individualProductsTab.plans || [] },
    { tabName: "Bundles", heading: data.bundlesTab.heading, description: data.bundlesTab.description, tabCards: data.bundlesTab.plans || [] },
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

          {/* Center Tabs */}
          <div className="flex-1 flex justify-center">
            <div className="flex gap-4">
              {tabs.map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx === 0 ? "individual" : "bundles")}
                  className={`px-6 py-3 font-Roboto text-[16px] leading-[24px] tracking-[0px] font-normal rounded-full border border-LightWhite transition ${
                    (activeTab === "individual" && idx === 0) || (activeTab === "bundles" && idx === 1)
                      ? "border-PrimaryBlack text-white bg-PrimaryBlack"
                      : "text-PrimaryBlack"
                  }`}
                >
                  {tab.tabName}
                </button>
              ))}
            </div>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setBilling("monthly")}
              className={`font-Roboto text-PrimaryBlack font-normal leading-[21px] text-[14px] tracking-[0px] ${
                !isYearly ? "text-PrimaryBlack" : "text-gray-500 hover:text-PrimaryBlack"
              }`}
            >
              {data?.billingToggle?.monthlyLabel}
            </button>

            <button
              onClick={() => setBilling(isYearly ? "monthly" : "yearly")}
              className={`relative h-[22px] w-10 rounded-full transition ${
                isYearly ? "bg-[#ff6600]" : "bg-[#BFBFBF]"
              }`}
              aria-label="Toggle billing cycle"
            >
              <span
                className={`absolute top-[2px] left-[2px] h-[18px] w-[18px] rounded-full bg-white shadow transition-transform ${
                  isYearly ? "translate-x-[18px]" : ""
                }`}
              />
            </button>

            <button
              onClick={() => setBilling("yearly")}
              className={`font-Roboto text-PrimaryBlack font-normal leading-[21px] text-[14px] tracking-[0px] ${
                isYearly ? "text-PrimaryBlack" : "text-gray-500 hover:text-PrimaryBlack"
              }`}
            >
              {data?.billingToggle.yearlyLabel}
            </button>

            <span className="font-Roboto font-normal leading-[18px] text-[12px] tracking-[0px] text-[#ffffff] bg-[#537D1B] px-2 py-1 rounded-full">
              {data?.billingToggle.discountLabel}
            </span>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-11 items-start justify-center grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
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
        className={`relative group transition-all duration-500 ease-in-out ${
          isBundlesTab 
            ? plan?.isMostPopular
              ? "p-[2px] pt-[2px] pb-[16px] border border-[#EE6D2D] bg-gradient-to-b from-[#EE6D2D] to-transparent rounded-[24px]"
              : "p-[2px] pt-[2px] pb-[16px] border border-LightWhite bg-white rounded-[24px]"
            : plan?.isMostPopular
              ? "p-[8px] pt-[8px] pb-[24px] border border-LightWhite bg-white rounded-[24px]"
              : "p-[8px] pt-[8px] pb-[24px] border border-LightWhite bg-white rounded-[24px]"
        }`}
      >
        <div className={`relative ${plan?.isMostPopular ? "" : "h-full"}`}>
          {/* Orange border effect - only for individual products tab */}
          {!isBundlesTab && (
            <div className="absolute left-0 top-0 w-full h-[260px] rounded-[20px] border border-[#EE6D2D] transition-all duration-500 ease-in-out group-hover:h-[calc(100%+16px)]"></div>
          )}
          
          <div className={`bg-white rounded-[20px] p-6 shadow-[0_6px_24px_0_rgba(0,0,0,0.05)] ${
            isBundlesTab && plan?.isMostPopular ? "border border-[#EE6D2D]" : ""
          }`}>
            <div className="flex items-center justify-between">
              <div className={`transition-all duration-500 ease-in-out w-12 h-12 rounded-full border ${
                isBundlesTab ? "border-[#E5E5E5] bg-[#F9F9F9]" : "border-[#DCDCDC]"
              } flex items-center justify-center group-hover:bg-DarkOrange`}>
                {plan.icon?.svgFile?.asset?.url ? (
                  <img src={plan.icon.svgFile.asset.url} alt={plan.title} className="w-6 h-6 bg-Dark" />
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
            {isBundlesTab && plan.associatedProducts && plan.associatedProducts.length > 0 && (
              <div className="mt-4 p-3 bg-[#F9F9F9] rounded-lg">
                <h4 className="font-Roboto text-[#333333] text-sm font-semibold mb-2">Includes:</h4>
                <div className="space-y-2">
                  {plan.associatedProducts.map((product, productIdx) => (
                    <div key={productIdx} className="flex items-center justify-between">
                      <div>
                        <p className="font-Roboto text-[#333333] text-sm font-medium">{product.productName}</p>
                        {product.subheading && (
                          <p className="font-Roboto text-[#666666] text-xs">{product.subheading}</p>
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
              isBundlesTab ? "pl-0" : "pl-[7px] md:pl-6"
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
            className={`relative z-[8] flex-shrink-0 flex items-center justify-center w-full md:w-[calc(100%-48px)] mx-auto h-[52px] border rounded-full px-4 py-3 text-[16px] font-normal font-Roboto leading-[16px] tracking-[0.08px] transition-all hover:scale-[1.01] group ${
              isBundlesTab
                ? "border-[#EE6D2D] bg-[#EE6D2D] text-white hover:bg-[#DD5827] hover:border-[#DD5827]"
                : "border-PrimaryBlack text-PrimaryBlack group-hover:bg-DarkOrange group-hover:text-white group-hover:border-DarkOrange hover:bg-[#DD5827]"
            }`}
          >
            <span className="relative flex items-center">
              {plan.ctaText}
              <span className={`absolute right-0 opacity-0 translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-[35px] transition-all duration-300 ${
                isBundlesTab ? "text-white" : ""
              }`}>
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
    </section>
  );
}