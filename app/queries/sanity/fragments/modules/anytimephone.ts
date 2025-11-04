import groq from "groq";

export const ANYTIME_PHONE_MODULE = groq`

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
    
      // 🔸 Transformation Section
    (_type == "businessTransformationSection") => {
      title,
       "cards":items[] {
        heading,
        description,
        icon {
          "url": asset->url
        }
      }
    },
    
// 🔹 No Office or Secretary Section
    (_type == "noOfficeSection") => {
      title,
      description,
      "features": features[] {
        text
      },
      "image": image.asset->url
    },
 // 🔸 Banner Section
    (_type == "businessAcceleratorBannerSection") => {
      title,
      cta {
        label,
        url
      },
      image {
        "url": asset->url
      },
     
    },

    // 🔸 How It Works Section
    (_type == "buisnesshowitwork") => {
      title,
      description,
      steps[] {
        heading,
        text,
        icon {
          "url": asset->url
        }
      }
    },
      // 🔸 Features Section
    (_type == "featuresSection") => {
      title,
      subtitle,
      "featureCategories": featureCategories[] {
        categoryTitle,
        "icon": icon.asset->url,
        points[]
      }
    },
    // 🔸 Testimonials (Thousand Trust)
    (_type == "testimonial") => {
      headline,
      subheadline,
      testimonials[] {
        type,
        rating,
        starIcon {
          "url": asset->url
        },
        quote,
        readMoreText,
        readMoreUrl,
        videoUrl,
        videoThumbnail {
          "url": asset->url
        },
        playIcon {
          "url": asset->url
        },
        authorName,
        authorTitle,
        authorImage {
          "url": asset->url
        }
      }
    },
    // 🔸 FAQ Section
    (_type == "faq") => {
      headline,
      subheadline,
      faqs[] {
        question,
        answer
      }
    },
    // 🔸 PLANS Section
    (_type == "plans") => {
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
    }
  }
`;
