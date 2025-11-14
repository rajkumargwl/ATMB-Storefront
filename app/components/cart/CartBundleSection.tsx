import { CartForm, Money } from '@shopify/hydrogen';
import { DEFAULT_LOCALE } from '~/lib/utils';
import { useRootLoaderData } from '~/root';
import { useRef, useEffect } from "react";
 
export default function CartBundleSection({ bundleProducts }: { bundleProducts: any[] }) {
  const prevState = useRef<string>("idle");
  const stateRef = useRef<string>("idle");

  const selectedLocale = useRootLoaderData()?.selectedLocale ?? DEFAULT_LOCALE;
  let currencyCode = selectedLocale?.currency || 'USD';

  if (!bundleProducts || bundleProducts.length === 0) return null; 

  const bundle = bundleProducts[0];

 
  const displayPrice = bundle.billing === 'monthly' ? bundle.price : bundle.yearlyPrice;
  
  const displayCompare =
    bundle.billing === 'monthly' ? bundle.compareAtPrice : bundle.yearlyCompareAtPrice;
 
  const savePercentage =
    displayCompare && displayPrice
      ? Math.round(
          ((parseFloat(displayCompare) - parseFloat(displayPrice)) / parseFloat(displayCompare)) *
            100,
        )
      : null;
 
  const variantId = bundle.billing === 'monthly' ? bundle.monthlyVariantId : bundle.yearlyVariantId;
  const scrollTo = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
 
    // Optionally move keyboard focus
    const topEl = document.querySelector("main, h1, #top");
    if (topEl) {
      topEl.setAttribute("tabIndex", "-1");
      topEl.focus();
    }
  };
 
 
  return (
    <div className="flex flex-col items-start w-full lg:w-[50%] gap-[24px] md:gap-10">
      {/* Header */}
      <div className="flex flex-col items-start text-left gap-1">
        <h2 className="font-Roboto text-[#171717] text-[24px] font-semibold leading-[31.2px] tracking-[-0.36px]">
          Bundle smart and save 15% on the plan
        </h2>
        <p className="font-Roboto text-[#171717] text-[14px] md:text-[16px] leading-[21px] md:ading-[24px] font-normal">
          80% of our customers pick this winning combination
        </p>
      </div>
 
      {/* Single Bundle Section */}
      <div className="flex flex-col w-full p-6 gap-[24px] rounded-[12px] border border-[#DCDCDC] bg-[#FFF] transition">
        {/* Main Bundle Row */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-[16px]">
          <div className="flex flex-col gap-1">
            <h3 className="font-Roboto text-PrimaryBlack font-semibold leading-[27px] md:leading-[27px] text-[18px] md:text-[18px] tracking-[0px]">
              {bundle.title}
            </h3>
            {savePercentage && (
              <p className="font-Roboto text-LightGray font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px] ">
                Save {savePercentage}% with virtual mailbox
              </p>
            )}
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-baseline">
              {displayCompare && (
                <span className="relative inline-block pr-2 font-Roboto text-PrimaryBlack font-semibold leading-[27px] md:leading-[27px] text-[18px] md:text-[18px] tracking-[0px]"> <Money data={{ amount: displayCompare, currencyCode: currencyCode }}/>
                 <span
                  className="absolute left-[-7px] top-1/2 w-full border-t-2 border-[#FF2E32]"
                  style={{ transform: 'rotate(12deg)' }}
                ></span>
                </span>
              )}
              <span className="font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[31.2px] text-[24px] md:text-[24px] tracking-[-0.3px] md:tracking-[-0.36px]"><Money data={{ amount: displayPrice, currencyCode: currencyCode }}/></span>
              <span className="font-Roboto text-LightGray font-normal leading-[21px] text-[14px] tracking-[0px]">
                /{bundle.billing === 'monthly' ? 'month' : 'year'}
              </span>
            </div>
          </div>
        </div>
 
        {/* Associated Items - Inline Scrollable Row */}
        {bundle.associatedItems?.length > 0 && (
          <div className="flex flex-col md:flex-row gap-[24px]">
            {bundle.associatedItems.map((item, idx) => (
              <div
                key={idx}
                className="w-full md:w-[50%] flex flex-col p-5 rounded-[12px] border border-[#DCDCDC] bg-[#FFF]"
              >
                <div>
                  <span className=" font-Roboto text-PrimaryBlack font-semibold leading-[28px] md:leading-[28px] text-[20px] md:text-[20px] tracking-[-0.3px] md:tracking-[-0.3px] block mb-2">
                    {item.productTitle}
                  </span>
                  {item.price && (
                    <span className="flex font-Roboto text-PrimaryBlack font-normal leading-[18px] text-[12px] tracking-[0px] py-[6px] px-2 bg-[#D7F3DD] rounded-[8px] w-fit">  
                    <Money data={{ amount: item.price, currencyCode: currencyCode }}/>/m</span>
                  )}
                </div>
 
                {item.features && item.features.length > 0 && (
                  <ul className="mt-[24px] space-y-4">
                    {item.features.map((f: string, fIdx: number) => (
                      <li key={fIdx} className="flex items-center gap-3 font-Roboto text-PrimaryBlack font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px]">
                        <span className="flex items-center justify-center w-[24px] h-[24px]">
                          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none"><path d="M16.5544 0.110975C16.8206 0.305975 16.8806 0.680975 16.6856 0.950975L6.18563 15.351C6.08063 15.4935 5.92313 15.5835 5.74688 15.5947C5.57063 15.606 5.40188 15.546 5.27438 15.4222L0.174375 10.3222C-0.058125 10.0897 -0.058125 9.70722 0.174375 9.47472C0.406875 9.24222 0.789375 9.24222 1.02188 9.47472L5.62688 14.0797L15.7144 0.245975C15.9094 -0.0202754 16.2844 -0.0802754 16.5544 0.114725V0.110975Z" fill="#091019"></path>
                          </svg>
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
 
        {/* Add to Cart Button */}
        <div className="flex items-center justify-center">
        

        <CartForm
          action={CartForm.ACTIONS.LinesAdd}
          inputs={{
            lines: [{ merchandiseId: variantId, quantity: 1 }],
          }}
        >
         {(props: { state: string }) => {
              console.log("CartForm state:", props.state);
             
            return (
              <button
              aria-label="Upgrade to Bundle"
                type="submit"
                disabled={props.state !== "idle"}
                onClick={() => {
                  // set state to submitting before actual form submit
                  scrollTo();
                  prevState.current = "submitting";
                }}
                className="flex items-center justify-center gap-[12px] w-full md:w-[202px] h-[44px] rounded-[100px] font-normal leading-[16px] tracking-[0.08px] text-[16px] text-PrimaryBlack border border-[#091019] px-4 py-[12px] transition-all hover:bg-PrimaryBlack hover:text-white"
              >
                {props.state !== "idle" ? "Adding..." : "Upgrade to Bundle"}
              </button>
            );
          }}
 
        </CartForm>
        </div>
      </div>
    </div>
  );
}
 