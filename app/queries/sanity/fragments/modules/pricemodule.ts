import groq from 'groq';

export const MODULE_PRICING = groq`
 _type,
  _key,
  label,
  title,
  tabs[],
  billingOptions[] {
    label,
    discountText
  },
  plans[] {
    title,
    description,
    price,
    frequency,
    features[],
    ctaText,
    ctaUrl,
    highlight
  }
`;
