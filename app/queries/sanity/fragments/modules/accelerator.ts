import groq from "groq";

export const BUSINESS_ACCELERATOR_MODULE = groq`

  _type,
  _key,
  modules[] {
    _type,
    _key,

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

    // 🔸 Business Accelerator Section
    (_type == "businessAcceleratorSection") => {
      title,
      description,
      cta {
        label,
        url
      },
      image {
        "url": asset->url
      }
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

    // 🔸 Growth Toolkit Section
    (_type == "businessGrowthToolkitSection") => {
      title,
      subtitle,
      features[] {
        title,
        description,
        icon {
          "url": asset->url
        }
      },
      sideImage {
        "url": asset->url
      }
    },

    // 🔸 Profit Section
    (_type == "businessProfitSection") => {
      title,
      features[] {
        heading,
        description,
        icon {
          "url": asset->url
        }
      },
      sideImage {
        "url": asset->url
      },
      testimonials[] {
        quote,
        name,
        role,
        avatar {
          "url": asset->url
        }
      }
    },

    // 🔸 Strategy (Video) Section
    (_type == "businessStrategySection") => {
      title,
      description,
      videoThumbnail {
        "url": asset->url
      },
      videoLink,
      label
    },

    // 🔸 Support Section
    (_type == "businessSupportSection") => {
      title,
      description,
      cta {
        label,
        url
      },
      sideImage {
        "url": asset->url
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

    // 🔸 Webinars Topics Section
    (_type == "webinarsTopicsSection") => {
      title,
      description,
      topics[] {
        heading,
        points,
        icon {
          "url": asset->url
        }
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
