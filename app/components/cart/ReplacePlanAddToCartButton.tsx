// app/components/ReplacePlanAddToCartButton.tsx
import {CartForm} from '@shopify/hydrogen';
import type {ProductVariant} from '@shopify/hydrogen/storefront-api-types';
import { usePrefixPathWithLocale } from '~/lib/utils';

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

  // If replacing, first remove the old one
  if (replaceLineId) {
   // console.log('ReplacePlanAddToCartButton - replaceLineId:', replaceLineId);
   console.log('Location Properties:', locationProperties);
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
             // attributes: locationProperties,
             attributes: Object.entries(locationProperties).map(([key, value]) => ({
              key,
              value: String(value ?? ''),
            })),
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
           // attributes: locationProperties,
           attributes: Object.entries(locationProperties).map(([key, value]) => ({
            key,
            value: String(value ?? ''),
          })),
          },
        ],
        redirectTo: usePrefixPathWithLocale('/cart'),
      }}
    >
      <button
        type="submit"
        disabled={disabled}
        className={buttonClassName}
      >
        {text || 'Add to Cart'}
      </button>
    </CartForm>
  );
}
