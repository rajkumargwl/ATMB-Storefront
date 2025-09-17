import groq from 'groq';
import { IMAGE } from '../image';

export const PLANS = groq`
  heading,
  description,
  tabs[],
  billingToggle {
    monthlyLabel,
    yearlyLabel,
    discountLabel
  },
  plans[] {
    icon {
      svgCode,
      svgFile {
        ${IMAGE}
      }
    },
    title,
    subheading,
    startingFromText,
    price,
    features[],
    ctaText,
    ctaUrl,
    ctaTextColor,
    ctaBgColor,
    isMostPopular,
    mostPopularLabel
  }
`;
