import groq from 'groq';

export const PLANS = groq`
  heading,
  description,
  tabs[] {
    tabName,
    tabCards[] {
      icon {
        svgCode,
        svgFile {
          asset->{
            url
          }
        }
      },
      title,
      subheading,
      startingFromText,
      pricing {
        monthly,
        yearly
      },
      features[],
      ctaText,
      ctaUrl,
      ctaTextColor,
      ctaBgColor,
      isMostPopular,
      mostPopularLabel
    }
  },
  billingToggle {
    monthlyLabel,
    yearlyLabel,
    discountLabel
  }
`;
