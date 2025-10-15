import groq from "groq";

export const SMALL_BUSINESS_OWNER_MODULE = groq`
  _type,
  _key,
  modules[] {
    _type,
    _key,

    // 🧩 Small Business Owner Section
    (_type == "smallBusinessOwnerSection") => {
      title,
      description,
      primaryCta { label, url },
      secondaryCta { label, url },
      ownerImage { "url": asset->url },
      trustedByText,
      brandLogos[] {
        "url": asset->url,
        alt
      }
    },

    // 🚀 Smart Business Section
  (_type == "smartBusinessSection") => {
      title,
      subtitle,
      featureTitle,
      features, // now just an array of strings
      benefitIcons[] {
        "url": asset->url
      },
      benefitAlts, // array of strings
      benefitLabels, // array of strings
      testimonials[] {
        quote,
        author,
        designation,
        authorImage { "url": asset->url }
      }
    },

    // 💼 Business Benefits Section
    (_type == "businessBenefitsSection") => {
      heading,
      subHeading,
      benefitCards[] {
        icon { "url": asset->url },
        stat,
        title,
        testimonial,
        customerName,
        customerRole
      }
    },

    // 🏆 Business Industry Recognition Section
    (_type == "businessIndustryRecognitionSection") => {
      heading,
      awards[] {
        icon { "url": asset->url },
        title,
        subTitle
      },
      mediaCoverage[] {
        logo { "url": asset->url },
        link
      },
      industryPartners[] {
        logo { "url": asset->url },
        name,
        link
      }
    },

    // 🤝 Business Trusted Section
    (_type == "businessTrustedSection") => {
      heading,
      subHeading,
      highlightedWord,
      ratings[] {
        icon { "url": asset->url },
        ratingText
      },
      testimonialVideo {
        thumbnail { "url": asset->url },
        videoUrl,
        playIcon { "url": asset->url },
        ratingBadge,
        customerImage { "url": asset->url },
        customerName,
        customerRole
      },
      provenResults[] {
        title,
        description
      }
    },

    // 💬 Client Success Stories Section
    (_type == "clientSuccessStoriesSection") => {
      heading,
      testimonials[] {
        profileImage { "url": asset->url },
        name,
        designation,
        quoteIcon { "url": asset->url },
        quote,
        result,
        beforeAfter {
          roleTag,
          beforeTitle,
          beforeDescription,
          afterTitle,
          afterDescription
        }
      }
    },

    // ❓ FAQ With Comment
  (_type == "faqWithComment") => {
      headline,
      subheadline,
      faqs[] {
        question,
        answer,
        comment {
          quote,
          author,
          role,
          authorImage { "url": asset->url }
        }
      }
    },

    // 📣 Join CTA Banner Section
    (_type == "joinCtaBannerSection") => {
      heading,
      subText,
      cta { label, url },
      notification {
        avatar { "url": asset->url },
        text
      },
      sideImage { "url": asset->url }
    },
// ⚠️ Small Business Challenges Section
(_type == "smallBusinessChallengesSection") => {
  title,
  subtitle,
  challenges[]{
    icon {
      "url": asset->url,
      alt
    },
    title,
    description,
    quote,
    author {
      name,
      designation
    }
  }
},

    // 💰 Plans Section
    (_type == "plans") => {
      individualProductsTab {
        heading,
        description,
        plans[] {
          icon {
            svgCode,
            svgFile { "url": asset->url },
            tooltipTitle
          },
          title,
          subheading,
          startingFromText,
          pricing {
            monthly,
            yearly
          },
          features,
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
          features,
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
`;
