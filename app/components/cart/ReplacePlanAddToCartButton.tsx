// app/components/ReplacePlanAddToCartButton.tsx
import {CartForm} from '@shopify/hydrogen';
import type {ProductVariant} from '@shopify/hydrogen/storefront-api-types';

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
    console.log('ReplacePlanAddToCartButton - replaceLineId:', replaceLineId);
    return (
        <CartForm
        route={`/cart`}
        action="REPLACE_LINE"
        inputs={{
          lineIds: replaceLineId ? [replaceLineId] : [],
          lines: [
            {
              merchandiseId: selectedVariant.id,
              quantity: 1,
              attributes: locationProperties,
            },
          ],
          redirectTo: '/cart',
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
    route={`/cart`}
      action={CartForm.ACTIONS.LinesAdd}
      inputs={{
        lines: [
          {
            merchandiseId: selectedVariant.id,
            quantity: 1,
            attributes: locationProperties,
          },
        ],
        redirectTo: '/cart',
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
