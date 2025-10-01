import groq from 'groq'

export const SOLUTION_PAGE_MODULE = groq`
  _type,
  _key,
  modules[] {
    _type,
    _key,

    (_type == "solutionHeroModule") => {
      heading,
      highlightText,
      description,
      cta {
        label,
        url,
        variant
      },
      trustSection {
        text,
        avatars[] {
          "url": asset->url
        },
        licensedText,
        licensedIcon {
          "url": asset->url
        }
      },
      rightImage {
        "url": asset->url
      },
      overlayOne {
        title,
        subtitle,
        icon {
          "url": asset->url
        }
      },
      overlayTwo {
        title,
        subtitle,
        icon {
          "url": asset->url
        }
      }
    },

    (_type == "solutionVirtualMailboxModule") => {
      title,
      description,
      desktopImage {
        "url": asset->url
      },
      mobileImage {
        "url": asset->url
      }
    },

    (_type == "solutionRealLife") => {
      title,
      description,
      rightImage {
        "url": asset->url
      }
    },

    (_type == "solutionMailboxFeaturesModule") => {
      title,
      subtitle,
      features[] {
        featureTitle,
        featureDescription,
        icon {
          "url": asset->url
        }
      },
      rightImage {
        "url": asset->url
      },
      bottomHeading
    },

    (_type == "solutionMailboxBenefitFaqModule") => {
      title,
      subtitle,
      benefits[] {
        text,
        icon {
          "url": asset->url
        }
      },
      rightImage {
        "url": asset->url
      },
      faqs[] {
        question,
        answer
      }
    },

    (_type == "solutionMailboxLocationHowItWorksModule") => {
      title,
      subtitle,
      cards[] {
        title,
        description,
        buttonText,
        buttonLink,
        image {
          "url": asset->url
        }
      }
    },

    // ✅ FAQ module
    (_type == "faq") => {
      headline,
      subheadline,
      faqs[] {
        _key,
        question,
        answer
      }
    },
    (_type == "plans") => {
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
            },
            tooltipTitle
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

      billingToggle {
        monthlyLabel,
        yearlyLabel,
        discountLabel
      }
    }
  }
`
