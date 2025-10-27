// app/components/product/PlansWithoutBundles.tsx
import {useState, useEffect} from 'react';
import type {Product, ProductVariant} from '@shopify/hydrogen/storefront-api-types';
import ReplacePlanAddToCartButton from '~/components/cart/ReplacePlanAddToCartButton';

type PlansWithoutBundlesProps = {
  product: Product;
};

export default function PlansWithoutBundles({product}: PlansWithoutBundlesProps) {
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
    <section className="w-full py-16 bg-[#fafafa]">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Plans & Pricing</h2>
        <p className="text-gray-500 mb-8">
          Select a service plan that fits your needs.
        </p>

        {/* Billing Toggle */}
        <div className="flex justify-center items-center gap-3 mb-10">
          <span
            className={`font-medium ${
              billingCycle === 'monthly' ? 'text-black' : 'text-gray-500'
            }`}
          >
            Monthly
          </span>
          <button
            onClick={() =>
              setBillingCycle((prev) => (prev === 'monthly' ? 'yearly' : 'monthly'))
            }
            className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
              billingCycle === 'yearly' ? 'bg-green-500' : 'bg-DarkOrange'
            }`}
          >
            <div
              className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-300 ${
                billingCycle === 'yearly' ? 'translate-x-8' : 'translate-x-0'
              }`}
            />
          </button>
          <span
            className={`font-medium ${
              billingCycle === 'yearly' ? 'text-black' : 'text-gray-500'
            }`}
          >
            Yearly{' '}
            <span className="text-green-600 text-sm font-semibold">20% Off</span>
          </span>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sortedVariants.length === 0 && (
            <p className="text-gray-500 col-span-3">
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

            return (
              <div
                key={variant.id}
                className={`relative rounded-2xl p-8 flex flex-col items-center justify-between ${
                  isMostPopular
                    ? 'border-2 border-orange-500 shadow-lg bg-white'
                    : 'border border-gray-200 shadow-sm bg-white'
                }`}
              >
                {isMostPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    🔥 Most Popular
                  </span>
                )}

                <h3 className="text-lg font-semibold mb-2">{variant.title}</h3>
                <p className="text-3xl font-bold mb-4">
                  ${displayPrice}
                  <span className="text-base font-normal text-gray-500">
                    /{billingCycle}
                  </span>
                </p>

                <ul className="space-y-2 text-gray-700 flex-1 text-left">
                  {features.map((f) => (
                    <li key={f}>✓ {f}</li>
                  ))}
                </ul>

                <ReplacePlanAddToCartButton
                  selectedVariant={variant}
                  replaceLineId={replaceLineId}
                  locationProperties={[]}
                  buttonClassName={`w-full mt-6 py-3 rounded-xl font-bold transition ${
                    isMostPopular
                      ? 'bg-orange-500 hover:bg-orange-600 text-white'
                      : 'border border-gray-300 text-gray-800 hover:bg-gray-100'
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
