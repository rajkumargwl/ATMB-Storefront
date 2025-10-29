import { CartForm, Money } from '@shopify/hydrogen';
import { DEFAULT_LOCALE } from '~/lib/utils';
import { useRootLoaderData } from '~/root';

export default function CartBundleSection({ bundleProducts }: { bundleProducts: any[] }) {
  if (!bundleProducts || bundleProducts.length === 0) return null;

  const selectedLocale = useRootLoaderData()?.selectedLocale ?? DEFAULT_LOCALE;
  let currencyCode = selectedLocale?.currency || 'USD';
  const bundle = bundleProducts[0]; // show only the first bundle

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

      {/* Single Bundle Section */}
      <div className="flex flex-col w-full p-6 gap-4 rounded-[12px] border border-[#DCDCDC] bg-[#FFF] hover:shadow-sm transition">
        {/* Main Bundle Row */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <h3 className="font-Roboto text-[#171717] text-[20px] font-semibold">
              {bundle.title}
            </h3>
            {savePercentage && (
              <p className="text-[#74A038] text-[14px] font-Roboto">
                Save {savePercentage}% with virtual mailbox
              </p>
            )}
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-baseline gap-2">
              {displayCompare && (
                <span className="text-[#9CA3AF] line-through text-[14px]"> <Money data={{ amount: displayCompare, currencyCode: currencyCode }}/></span>
              )}
              <span className="text-[#171717] text-[20px] font-semibold"><Money data={{ amount: displayPrice, currencyCode: currencyCode }}/></span>
              <span className="text-[#9CA3AF] text-[14px]">
                /{bundle.billing === 'monthly' ? 'month' : 'year'}
              </span>
            </div>
          </div>
        </div>

        {/* Associated Items - Inline Scrollable Row */}
        {bundle.associatedItems?.length > 0 && (
          <div className="flex overflow-x-auto flex-nowrap gap-4 mt-2 pb-2 scrollbar-thin scrollbar-thumb-gray-300">
            {bundle.associatedItems.map((item, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 flex flex-col justify-between p-4 w-[180px] rounded-[12px] border border-[#DCDCDC] bg-[#F9FAFB] hover:shadow-md transition"
              >
                <div>
                  <span className="font-semibold text-[#171717] text-[14px] block mb-1">
                    {item.productTitle}
                  </span>
                  {item.price && (
                    <span className="flex text-[#9CA3AF] text-[13px]">  
                    <Money data={{ amount: item.price, currencyCode: currencyCode }}/>/m</span>
                  )}
                </div>

                {item.features && item.features.length > 0 && (
                  <ul className="mt-2 mb-2 space-y-1 text-[13px] text-[#333333]">
                    {item.features.map((f: string, fIdx: number) => (
                      <li key={fIdx} className="flex items-center gap-1">
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

        {/* Add to Cart Button */}
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
    </div>
  );
}
