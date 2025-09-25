import groq from 'groq';

export const PLANS = groq`
  // Individual Products Tab
  individualProductsTab {
    heading,
    description,
    plans[] {
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
      isMostPopular,
      mostPopularLabel
    }
  },

  // Bundles Tab
  bundlesTab {
    heading,
    description,
    plans[] {
      title,
      subheading,
      pricing {
        originalPrice,
        discountedPrice,
        saveLabel,
        monthly,
        yearly
      },
      associatedProducts[] {
        productName,
        subheading,
        level
      },
      features[],
      ctaText,
      ctaUrl
    }
  },

  // Billing Toggle
  billingToggle {
    monthlyLabel,
    yearlyLabel,
    discountLabel
  }
`;
