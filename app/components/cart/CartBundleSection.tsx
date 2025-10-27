import { CartForm } from '@shopify/hydrogen';

export default function CartBundleSection({ bundleProducts }: { bundleProducts: any[] }) {
  return (
    <div className="flex flex-col items-center w-[600px] p-6 gap-6 bg-white border border-[#DCDCDC] rounded-[12px]">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-2">
        <h2 className="font-Roboto text-[#171717] text-[24px] font-semibold leading-[31.2px] tracking-[-0.36px]">
          Bundle smart and save 15% on the plan
        </h2>
        <p className="font-Roboto text-[#171717] text-[16px] leading-[24px] font-normal">
          80% of our customers pick this winning combination
        </p>
      </div>

      {/* Bundles */}
      <div className="flex flex-col gap-6 w-full">
        {bundleProducts.map((bundle) => {
          const displayPrice = bundle.billing === 'monthly' ? bundle.price : bundle.yearlyPrice;
          const displayCompare =
            bundle.billing === 'monthly' ? bundle.compareAtPrice : bundle.yearlyCompareAtPrice;

          const savePercentage =
            displayCompare && displayPrice
              ? Math.round(
                  ((parseFloat(displayCompare) - parseFloat(displayPrice)) /
                    parseFloat(displayCompare)) *
                    100,
                )
              : null;

          const variantId =
            bundle.billing === 'monthly' ? bundle.monthlyVariantId : bundle.yearlyVariantId;

          return (
            <div
              key={bundle.id}
              className="flex flex-col w-full p-6 gap-4 rounded-[12px] border border-[#DCDCDC] bg-[#FFF] transition hover:shadow-sm"
            >
             {/* Title + Price */}
            <div className="flex justify-between items-center">
              <h3 className="font-Roboto text-[#171717] text-[20px] font-semibold">
                {bundle.title}
              </h3>
              <div className="flex items-baseline gap-2">
                {displayCompare && (
                  <span className="text-[#9CA3AF] line-through text-[14px]">
                    ${displayCompare}
                  </span>
                )}
                <span className="text-[#171717] text-[20px] font-semibold">${displayPrice}</span>
                <span className="text-[#9CA3AF] text-[14px]">
                  /{bundle.billing === 'monthly' ? 'month' : 'year'}
                </span>
              </div>
            </div>


              {/* Save Message */}
              {savePercentage && (
                <p className="text-[#74A038] text-[14px] font-Roboto">
                  Save {savePercentage}% with virtual mailbox
                </p>
              )}
   
               {/* Associated Items - Square Boxes */}
            {bundle.associatedItems?.length > 0 && (
              <div className="flex flex-wrap gap-4 py-2">
                {bundle.associatedItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col justify-between p-5 w-[150px] rounded-[12px] border border-[#DCDCDC] bg-[#FFF] shadow-sm hover:shadow-md transition break-words"
                  >
                    <span className="font-semibold text-[#171717] text-[14px] block mb-1">
                      {item.productTitle}
                    </span>
                    {item.price && (
                      <span className="text-[#9CA3AF] text-[13px]">${item.price}/m</span>
                    )}
                 {item.features && item.features.length > 0 && (
                      <ul className="mt-2 mb-4 space-y-2 text-[14px] text-[#333333]">
                        {item.features.map((f: string, fIdx: number) => (
                          <li key={fIdx} className="flex items-center gap-2">
                            <span className="text-[#74A038] text-sm">✓</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}

                  </div>
                ))}
              </div>
            )}


              {/* Bundle Features */}
              {/* {bundle.bundleFeature?.length > 0 && (
                <ul className="pl-3 space-y-1 text-[14px] text-[#333333]">
                  {bundle.bundleFeature.map((feature: string, idx: number) => (
                    <li key={idx}>• {feature}</li>
                  ))}
                </ul>
              )} */}

              {/* Add to Cart */}
              <CartForm
                action={CartForm.ACTIONS.LinesAdd}
                inputs={{
                  lines: [{ merchandiseId: variantId, quantity: 1 }],
                }}
              >
                {(props: { state: string }) => (
                  <button
                    type="submit"
                    disabled={props.state !== 'idle'}
                    className="flex items-center justify-center w-full h-[44px] rounded-[100px] border border-[#171717] text-[#171717] text-[16px] font-normal tracking-[0.08px] hover:bg-[#171717] hover:text-white transition"
                  >
                    {props.state !== 'idle' ? 'Adding...' : 'Upgrade to Bundle'}
                  </button>
                )}
              </CartForm>
            </div>
          );
        })}
      </div>
    </div>
  );
}
