// app/components/product/PlansWithoutBundles.tsx
import {useState, useEffect} from 'react';
import type {Product, ProductVariant} from '@shopify/hydrogen/storefront-api-types';
import ReplacePlanAddToCartButton from '~/components/cart/ReplacePlanAddToCartButton';
import { useRootLoaderData } from '~/root';
import { DEFAULT_LOCALE } from '~/lib/utils';
import { Money } from '@shopify/hydrogen';
 
type PlansWithoutBundlesProps = {
  product: Product;
  planData?: {
    billingCycle: 'monthly' | 'yearly';
    sortedVariants: ProductVariant[];
    replaceLineId: string | null;
    locationProperties: { key: string; value: string }[];
    location?: any;
  };
};
 
export default function PlansWithoutBundles({product,planData,location}: PlansWithoutBundlesProps) {
  const selectedLocale = useRootLoaderData()?.selectedLocale ?? DEFAULT_LOCALE;
  let currencyCode = selectedLocale?.currency || 'USD';
    
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [replaceLineId, setReplaceLineId] = useState<string | null>(null);
 
  // Retrieve replace line ID from session
  useEffect(() => {
    const storedLineId = sessionStorage.getItem('replaceLineId');
    if (storedLineId) setReplaceLineId(storedLineId);
  }, []);
 
  // Shopify variants
  const variants = (product?.variants?.nodes ?? []) as ProductVariant[];
 
  // Filter variants by metafield `plan_type`
  const filteredVariants = variants.filter((variant) => {
    const planTypeField = variant.metafields?.find((m) => m.key === 'plan_type');
    return planTypeField?.value?.toLowerCase() === billingCycle;
  });
 
  // Sort by position (if defined)
  const sortedVariants = filteredVariants.sort((a, b) => a.position - b.position);
 
  return (
    <section className="px-5 py-[40px] md:py-[60px] lg:py-[100px] bg-white relative z-[2]">
      <div className="hidden md:flex absolute z-[1] bottom-[0px] right-[0px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="593" height="579" viewBox="0 0 593 579" fill="none">
          <g opacity="0.8" filter="url(#filter0_f_4061_49881)">
            <path d="M411.881 343.27C401.099 348.922 394.495 325.028 382.786 321.704C370.853 318.317 357.913 321.101 346.004 324.57C331.506 328.793 316.091 333.323 305.594 344.188C294.942 355.212 276.999 374.042 286.863 385.777C303.962 406.119 344.216 390.996 361.734 410.977C371.288 421.875 344.748 435.423 343.008 449.817C341.04 466.113 334.911 499.552 351.227 497.944C376.574 495.446 381.924 456.035 404.26 443.782C411.576 439.769 418.013 452.857 424.944 457.506C440.834 468.163 455.265 498.319 472.141 489.306C488.214 480.722 468.288 453.503 466.405 435.363C465.509 426.723 462.92 418.285 463.873 409.652C464.667 402.461 466.661 394.924 471.465 389.519C489.283 369.474 527.986 362.058 529.966 335.299C531.328 316.889 491.642 334.148 476.32 323.877C463.656 315.388 468.593 279.983 453.998 284.376C430.704 291.386 433.43 331.975 411.881 343.27Z" fill="#FF6600"/>
          </g>
          <defs>
            <filter id="filter0_f_4061_49881" x="0" y="0" width="814" height="782" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="142" result="effect1_foregroundBlur_4061_49881"/>
            </filter>
          </defs>
        </svg>
      </div>
      <div className="flex md:hidden absolute z-[1] bottom-[0px] right-[0px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="393" height="491" viewBox="0 0 393 491" fill="none">
          <g filter="url(#filter0_f_4061_49585)">
            <path d="M279.766 335.792C270.342 340.731 264.571 319.851 254.337 316.947C243.908 313.987 232.599 316.42 222.191 319.451C209.52 323.141 196.047 327.1 186.872 336.594C177.563 346.227 161.881 362.682 170.502 372.936C185.446 390.712 220.628 377.497 235.938 394.957C244.288 404.479 221.092 416.318 219.572 428.897C217.852 443.136 212.495 472.356 226.756 470.951C248.909 468.769 253.584 434.33 273.106 423.623C279.5 420.116 285.125 431.553 291.183 435.615C305.07 444.927 317.683 471.278 332.432 463.403C346.479 455.902 329.065 432.117 327.419 416.265C326.636 408.716 324.373 401.342 325.206 393.798C325.9 387.515 327.642 380.929 331.841 376.206C347.414 358.69 381.24 352.21 382.97 328.826C384.16 312.739 349.476 327.821 336.085 318.846C325.017 311.428 329.332 280.49 316.575 284.328C296.217 290.454 298.599 325.922 279.766 335.792Z" fill="#FF6600"/>
          </g>
          <defs>
            <filter id="filter0_f_4061_49585" x="-116" y="0" width="783" height="755" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="142" result="effect1_foregroundBlur_4061_49585"/>
            </filter>
          </defs>
        </svg>
      </div>
      <div className="max-w-[1240px] mx-auto relative z-[2]">
        <div className='flex flex-col md:items-center justify-center gap-5 md:gap-5 mb-[44px] md:mb-[64px]'>
        <h2 className="text-center font-Roboto text-PrimaryBlack font-semibold leading-[38.4px] md:leading-[43.2px] text-[32px] md:text-[36px] tracking-[0.48px] md:tracking-[-0.54px]">Plans & Pricing</h2>
        <p className="text-center font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px]">
          Select a service plan that fits your needs.
        </p>
 
        {/* Billing Toggle */}
        <div className="flex justify-center items-center gap-2">
          <span
            className={`font-Roboto font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px] ${
              billingCycle === 'monthly' ? 'text-PrimaryBlack' : 'text-PrimaryBlack'
            }`}
          >
            Monthly
          </span>
          <button
            onClick={() =>
              setBillingCycle((prev) => (prev === 'monthly' ? 'yearly' : 'monthly'))
            }
            className={`rounded-[16px] w-10 h-[22px] relative ${
              billingCycle === 'yearly' ? 'bg-DarkOrange' : 'bg-[#BFBFBF]'
            }`}
          >
            <div
              className={`absolute left-[2px] top-[2px] w-[18px] h-[18px] bg-white rounded-[16px] ${
                billingCycle === 'yearly' ? 'translate-x-[18px]' : 'translate-x-0'
              }`}
            />
          </button>
          <span
            className={`font-Roboto font-normal leading-[21px] md:leading-[21px] text-[14px] md:text-[14px] tracking-[0px] ${
              billingCycle === 'yearly' ? 'text-PrimaryBlack ' : 'text-PrimaryBlack '
            }`}
          >
            Yearly{' '}
            <span className="ml-2 inline-block font-Roboto text-white font-normal leading-[18px] md:leading-[18px] text-[12px] md:text-[12px] tracking-[0px] px-2 py-1 rounded-full bg-[#537D1B]">20% Off</span>
          </span>
        </div>
        </div>
 
        {/* Plans Grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(292px,1fr))] justify-center max-w-[1240px] mx-auto md:[&>*:only-child]:max-w-[calc(50%)] lg:[&>*:only-child]:max-w-[calc(33.333%)] md:[&>*:only-child]:mx-auto">
 
          {sortedVariants.length === 0 && (
            <p className="text-center font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[27px] text-[16px] md:text-[18px] tracking-[0px]col-span-3">
              No {billingCycle} plans available.
            </p>
          )}
 
          {sortedVariants.map((variant, index) => {
            const basePrice = parseFloat(variant.price.amount);
            const yearlyPrice = (basePrice * 12 * 0.8).toFixed(2);
            const displayPrice =
              billingCycle === 'monthly' ? basePrice.toFixed(2) : yearlyPrice;
 
            // Mark “Most Popular”
            const isMostPopular =
              variant.title.toLowerCase().includes('50') || index === 1;
 
            // Example feature list
            const features = [
              variant.title.toLowerCase().includes('unlimited')
                ? 'No live answering minutes'
                : `${variant.title.split(' ')[1]} Live answering minutes`,
              'Appointment scheduling',
              'Appointment scheduling App',
            ];

            let pricewithobj = {
              amount: displayPrice,
              currencyCode: currencyCode,
            };
 
            return (
              <div
                key={variant.id}
                className={`relative rounded-[24px] p-6 md:p-8 flex flex-col justify-between ${
                  isMostPopular
                    ? 'border border-LightWhite  bg-white'
                    : 'border border-LightWhite  bg-white'
                }`}
              >
                {isMostPopular && (
                  <span className="flex items-center justify-center gap-1 absolute -top-3 right-[46px] rounded-[100px] border border-[rgba(238,109,45,0.5)] bg-[#FFF1EA] p-2 font-Roboto text-PrimaryBlack font-normal leading-[14px] md:leading-[14px] text-[14px] md:text-[14px] tracking-[0px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <g clip-path="url(#clip0_6912_17571)">
                          <path d="M1.6903 7.80312C1.6903 7.80312 2.32243 8.73178 3.6473 9.51784C3.6473 9.51784 2.68777 1.40841 8.93974 0C7.33796 5.87878 10.9772 7.53669 12.3038 4.43081C14.5192 7.38866 12.8371 9.96922 12.8371 9.96922C13.7456 10.1001 14.5086 9.10766 14.5086 9.10766C14.5154 9.22991 14.5192 9.353 14.5192 9.47697C14.5193 13.0795 11.5988 16 7.99621 16C4.39361 16 1.47314 13.0795 1.47314 9.47694C1.47314 8.89825 1.54889 8.33731 1.6903 7.80312Z" fill="#FF6536"/>
                          <path d="M14.5124 9.10766C14.5124 9.10766 13.7494 10.1001 12.841 9.96922C12.841 9.96922 14.5231 7.38866 12.3077 4.43081C10.9811 7.53669 7.34178 5.87878 8.94356 0C8.60872 0.0754375 8.29472 0.170219 8 0.281812V16C11.6026 16 14.5231 13.0795 14.5231 9.47694C14.5231 9.35297 14.5193 9.22991 14.5124 9.10766Z" fill="#FF421D"/>
                          <path d="M5.13379 13.1402C5.13379 14.7201 6.4146 16.001 7.99454 16.001C9.57448 16.001 10.8553 14.7201 10.8553 13.1402C10.8553 12.2945 10.4884 11.5346 9.90504 11.0109C8.79898 12.5135 7.22279 10.2341 8.45116 8.56958C8.45116 8.56958 5.13379 8.9853 5.13379 13.1402Z" fill="#FBBF00"/>
                          <path d="M10.8608 13.1402C10.8608 12.2945 10.4938 11.5346 9.9105 11.0109C8.80444 12.5135 7.22825 10.2341 8.45663 8.56958C8.45663 8.56958 8.27638 8.59224 8 8.67945V16.001C9.57994 16.001 10.8608 14.7201 10.8608 13.1402Z" fill="#FFA900"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_6912_17571">
                            <rect width="16" height="16" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>
                      Most Popular
                  </span>
                )}
                <div>
                <h3 className="mb-5 md:mb-6 font-Roboto text-PrimaryBlack font-semibold leading-[28px] md:leading-[31.2px] text-[20px] md:text-[24px] tracking-[-0.3px] md:tracking-[-0.36px]">{variant.title}</h3>
                <p className="mb-5 md:mb-6 font-Roboto text-PrimaryBlack font-semibold leading-[31.2px] md:leading-[38.4px] text-[24px] md:text-[32px] tracking-[-0.36px] md:tracking-[-0.48px]">
                  <Money data={{ amount: displayPrice, currencyCode: currencyCode }}/>
                  <span className="font-Roboto text-[#4B5563] font-normal text-[14px] leading-[21px] tracking-[0px]">
                    /{billingCycle}
                  </span>
                </p>
 
                <ul className="flex flex-col gap-4 mb-8 md:mb-10 pt-5 md:pt-6 border-t border-LightWhite">
                  {features.map((f) => (
                    <li key={f} className='flex items-center gap-3 font-Roboto text-PrimaryBlack font-normal leading-[24px] md:leading-[24px] text-[16px] md:text-[16px] tracking-[0px]'>
                      <span className="flex items-center justify-center w-[24px] h-[24px] min-w-[24px]"><svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none"><path d="M16.5544 0.110975C16.8206 0.305975 16.8806 0.680975 16.6856 0.950975L6.18563 15.351C6.08063 15.4935 5.92313 15.5835 5.74688 15.5947C5.57063 15.606 5.40188 15.546 5.27438 15.4222L0.174375 10.3222C-0.058125 10.0897 -0.058125 9.70722 0.174375 9.47472C0.406875 9.24222 0.789375 9.24222 1.02188 9.47472L5.62688 14.0797L15.7144 0.245975C15.9094 -0.0202754 16.2844 -0.0802754 16.5544 0.114725V0.110975Z" fill="#091019"></path></svg></span>
                       {f}</li>
                  ))}
                </ul>
                </div>
 
                <ReplacePlanAddToCartButton
                  selectedVariant={variant}
                  replaceLineId={replaceLineId}
                  locationProperties={location}
                  buttonClassName={`w-full h-[44px] md:h-[52px] rounded-[100px] font-normal leading-[16px] tracking-[0.08px] text-[16px] text-white md:text-PrimaryBlack border border-DarkOrange md:border-[#091019] px-4 py-[12px] bg-DarkOrange md:bg-white transition-all duration-300 hover:bg-DarkOrange hover:text-white hover:border-DarkOrange ${
                    isMostPopular
                      ? 'w-full h-[44px] md:h-[52px] rounded-[100px] font-normal leading-[16px] tracking-[0.08px] text-[16px] text-white md:text-PrimaryBlack border border-DarkOrange md:border-[#091019] px-4 py-[12px] bg-DarkOrange md:bg-white hover:bg-DarkOrange hover:text-white hover:border-DarkOrange'
                      : 'w-full h-[44px] md:h-[52px] rounded-[100px] font-normal leading-[16px] tracking-[0.08px] text-[16px] text-white md:text-PrimaryBlack border border-DarkOrange md:border-[#091019] px-4 py-[12px] bg-DarkOrange md:bg-white hover:bg-DarkOrange hover:text-white hover:border-DarkOrange'
                  }`}
                  text="Add to Cart"
         
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}