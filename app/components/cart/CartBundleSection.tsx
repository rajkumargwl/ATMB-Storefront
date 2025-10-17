import {Money} from '@shopify/hydrogen';
import {Link} from '~/components/Link';

export default function CartBundleSection({bundleProducts}: {bundleProducts: any[]}) {
  const {linesAdd} = useCart(); 
  return (
    <div className="w-full lg:w-[50%]">
      {/* Header */}
      <div className="flex flex-col gap-1 mb-[24px] md:mb-[40px]">
        <h2 className="font-Roboto text-PrimaryBlack font-semibold text-[24px] md:text-[24px] leading-[31.2px] tracking-[-0.36px]">
          Bundle smart and save 15% on the plan
        </h2>
        <p className="font-Roboto text-PrimaryBlack font-normal text-[14px] md:text-[16px] leading-[21px] md:leading-[24px]">
          80% of our customers pick this winning combination
        </p>
      </div>

      {/* Bundles Grid */}
      <div className="grid md:grid-cols-2 gap-6">
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

          return (
            <div
              key={bundle.id}
              className="p-6 bg-white rounded-[20px] shadow-md hover:shadow-lg transition flex flex-col"
            >
              {/* Bundle Title */}
              <h3 className="font-Roboto text-PrimaryBlack text-[22px] md:text-[24px] font-semibold mb-2">
                {bundle.title}
              </h3>

              {/* Price */}
              <div className="flex flex-col mb-3">
                {displayCompare && (
                  <span className="line-through text-gray-400 text-sm">${displayCompare}</span>
                )}
                <span className="font-Roboto text-PrimaryBlack text-[24px] font-semibold">
                  ${displayPrice}
                </span>
                <span className="text-LightGray text-sm">
                  /{bundle.billing === 'monthly' ? 'month' : 'year'}
                </span>
              </div>

              {/* Save Message */}
              {savePercentage && (
                <p className="text-[#74A038] font-Roboto text-sm mb-3">
                  Save {savePercentage}% with virtual mailbox
                </p>
              )}

              {/* Associated Products Vertical */}
              {bundle.associatedItems && bundle.associatedItems.length > 0 && (
                <div className="mb-4 space-y-3">
                  {bundle.associatedItems.map((item, idx) => (
                    <div key={idx} className="flex flex-col border-b border-gray-200 pb-2">
                      <div className="flex justify-between items-center">
                        <strong className="text-[#171717] text-[14px] font-Roboto">{item.productTitle}</strong>
                        {item.price && (
                          <span className="text-gray-500 text-[13px]">
                            Individually at ${item.price}/m
                          </span>
                        )}
                      </div>
                      {/* Optional: Add product features below title */}
                      {item.features && (
                        <ul className="mt-1 text-[13px] text-gray-600 space-y-1">
                          {item.features.map((f: string, fIdx: number) => (
                            <li key={fIdx}>• {f}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Bundle Features */}
              {bundle.bundleFeature?.length > 0 && (
                <ul className="space-y-1 mb-4 text-[14px] text-[#333333] font-Roboto">
                  {bundle.bundleFeature.map((feature: string, idx: number) => (
                    <li key={idx}>• {feature}</li>
                  ))}
                </ul>
              )}

              {/* Upgrade Button */}
              {bundle.associatedItems && bundle.associatedItems.length > 0 && (
              <CartLinesAdd
                lines={bundle.associatedItems.map(item => ({
                  quantity: 1,
                  merchandiseId: item.variantId,
                }))}
              >
                {({submit}) => (
                  <button
                    type="button"
                    className="mt-auto text-center bg-PrimaryBlack text-white py-2 rounded-full font-Roboto font-medium"
                    onClick={() => submit()}
                  >
                    Upgrade to Bundle
                  </button>
                )}
              </CartLinesAdd>
            )}


              {/* <Link
                to={`/checkout/${bundle.monthlyVariantId?.split('/').pop()}`}
                className="mt-auto text-center bg-PrimaryBlack text-white py-2 rounded-full font-Roboto font-medium"
              >
                Upgrade to Bundle
              </Link> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}



