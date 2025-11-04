// app/components/ReplacePlanAddToCartButton.tsx
import {CartForm} from '@shopify/hydrogen';
import type {ProductVariant} from '@shopify/hydrogen/storefront-api-types';
import { usePrefixPathWithLocale } from '~/lib/utils';
import RightArrowWhite from '~/components/icons/RightArrowWhite';
 
interface Props {
  selectedVariant: ProductVariant | null;
  replaceLineId?: string | null;
  locationProperties?: {key: string; value: string}[];
  disabled?: boolean;
  buttonClassName?: string;
  text?: string;
}
 
export default function ReplacePlanAddToCartButton({
  selectedVariant,
  replaceLineId,
  locationProperties = [],
  disabled,
  buttonClassName,
  text,
}: Props) {
  if (!selectedVariant) return null;
  
      const billingProductId =
      selectedVariant?.metafields?.find((m) => m.key === 'billing_product_id')?.value || '';

    //Normalize locationProperties so it's always iterable
    const normalizedLocationProps =
      Array.isArray(locationProperties)
        ? locationProperties
        : Object.entries(locationProperties || {}).map(([key, value]) => ({
            key,
            value: String(value ?? ''),
          }));

    // Combine normalized location properties + billing_product_id
    const attributes = [
      ...normalizedLocationProps,
      {
        key: 'billing_product_id',
        value: billingProductId,
      },
    ];

  // If replacing, first remove the old one
  if (replaceLineId) {
   // console.log('ReplacePlanAddToCartButton - replaceLineId:', replaceLineId);
   //console.log('Location Properties:', locationProperties);
    return (
        <CartForm
        route={usePrefixPathWithLocale('/cart')}
        action="REPLACE_LINE"
        inputs={{
          lineIds: replaceLineId ? [replaceLineId] : [],
          lines: [
            {
              merchandiseId: selectedVariant.id,
              quantity: 1,
              attributes, 
            //  attributes: Object.entries(locationProperties).map(([key, value]) => ({
            //   key,
            //   value: String(value ?? ''),
            // })),
            },
          ],
          redirectTo: usePrefixPathWithLocale('/cart'),
        }}
      >
        <button type="submit" disabled={disabled} className={buttonClassName}>
          {text || 'Change Plan'}
        </button>
      </CartForm>
    );
  }
 
  // Normal add-to-cart
  return (
    <CartForm
    route={usePrefixPathWithLocale('/cart')}
      action={CartForm.ACTIONS.LinesAdd}
      inputs={{
        lines: [
          {
            merchandiseId: selectedVariant.id,
            quantity: 1,
            attributes, 
          //  attributes: Object.entries(locationProperties).map(([key, value]) => ({
          //   key,
          //   value: String(value ?? ''),
          // })),
          },
        ],
        redirectTo: usePrefixPathWithLocale('/cart'),
      }}
    >
      <button
        type="submit"
        disabled={disabled}
        className={buttonClassName}>
        <span className="relative flex items-center">{text || 'Add to Cart'} <span className="absolute right-0 opacity-0 translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-[35px] transition-all duration-300">
              <RightArrowWhite />
            </span></span>      
        
      </button>
    </CartForm>
  );
}