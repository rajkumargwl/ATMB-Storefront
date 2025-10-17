import groq from "groq";

export const PRODUCT_MODULE_QUERY = groq`
  _type,
  _key,

  // 🔹 PDP Virtual Mailbox Location
  (_type == "pdpvirtualMailboxLocation") => {
    locationTitle,
    tags[] {
      label,
      icon { "url": asset->url }
    },
    services[] {
      serviceName,
      icon { "url": asset->url }
    },
    addressPreview {
      sectionTitle,
      yourNameLabel,
      yourCompanyLabel,
      address
    }
  },

  // 🔹 PDP Mail Center Highlights Section
  (_type == "pdpmailCenterHighlightsSection") => {
    companyName,
    isVerified,
    icon { "url": asset->url },
    designation,
    partnerLogos[] { "url": asset->url },
    highlightsTitle,
    highlights[]
  },
(_type == "pdpanytimePhoneSection") => {
    title,
    description,
    features[] {
      text,
      icon { "url": asset->url }
    },
    testimonial {
      quote,
      authorName,
      authorTitle,
      authorImage { "url": asset->url }
    },
    mainImage { "url": asset->url }
  },
  // 🔹 PDP Detailed Features Section
  (_type == "pdpdetailedFeaturesSection") => {
    title,
    topFeatures[] {
      icon { "url": asset->url, alt },
      title,
      description
    },
    physicalStorage {
      title,
      storageItems[] {
        title,
        description
      }
    }
  },

  // 🔹 Testimonials
  (_type == "testimonial") => {
    headline,
    subheadline,
    testimonials[] {
      type,
      rating,
      starIcon { "url": asset->url },
      quote,
      readMoreText,
      readMoreUrl,
      videoUrl,
      videoThumbnail { "url": asset->url },
      playIcon { "url": asset->url },
      authorName,
      authorTitle,
      authorImage { "url": asset->url }
    }
  },

  // 🔹 PDP - Why Choose Anytime Phone Section
  (_type == "pdpwhyChooseAnytimePhoneSection") => {
    title,
    subtitle,
    features[] {
      heading,
      description,
      icon { "url": asset->url }
    },
    mainImage { "url": asset->url }
  },

  // 🔹 Why Join Section
  (_type == "whyJoinSection") => {
    heading,
    features[] {
      text
    }
  },

  // 🔹 Business Accelerator Section (How It Works)
  (_type == "buisnesshowitwork") => {
    title,
    description,
    steps[] {
      heading,
      text,
      icon { "url": asset->url }
    }
  },

  // 🔹 PDP Feature Grid Section
  (_type == "pdpFeatureGridSection") => {
    heading,
    subHeading,
    features[] {
      title,
      icon { "url": asset->url }
    }
  },

  // 🔹 PDP Common Features Section
  (_type == "pdpCommonFeaturesSection") => {
    heading,
    subHeading,
    featureCategories[] {
      categoryTitle,
      icon { "url": asset->url },
      features[]
    }
  }
`;
