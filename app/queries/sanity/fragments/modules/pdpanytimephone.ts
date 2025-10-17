import groq from 'groq';
 
export const PDP_PHONE_PAGE_MODULE = groq`
  _type,
  _key,
  modules[] {
    _type,
    _key,
 
    // 🔹 PDP Intro Section
    (_type == "PDPIntroSection") => {
      heading,
      description,
      "features": features[] {
        text,
        icon {
          "url": asset->url
        }
      },
      testimonial {
        quote,
        author,
        role,
        authorImage {
          "url": asset->url
        }
      },
      rightImage {
        "url": asset->url
      }
    },
 
    // 🔹 PDP Highlights Section
    (_type == "PDPHighlights") => {
      heading,
      "highlights": highlights[] {
        text,
        icon {
          "url": asset->url
        }
      }
    },
 
    // 🔹 PDP - How It Works Section
    (_type == "PDPHowItWorks") => {
      heading,
      description,
      "steps": steps[] {
        title,
        description,
        icon {
          "url": asset->url
        }
      }
    },
 
    // 🔹 PDP - Why Choose Anytime Phone Section
    (_type == "PDPWhyChooseAnytimePhone") => {
      heading,
      subHeading,
      "features": features[] {
        title,
        description,
        icon {
          "url": asset->url
        }
      },
      image {
        "url": asset->url
      }
    },
 
    // 🔹 PDP - Testimonials Section
    (_type == "PDPTestimonials") => {
      heading,
      "testimonials": testimonials[] {
        rating,
        quote,
        authorName,
        authorRole,
        authorImage {
          "url": asset->url
        },
        video {
          thumbnail {
            "url": asset->url
          },
          url
        },
        readMoreLink
      }
    },
 
    // 🔹 PDP - Detailed Feature Section
    (_type == "PDPDetailedFeature") => {
      title,
      subtitle,
      "features": features[] {
        label,
        icon {
          "url": asset->url
        }
      }
    },
 
    // 🔹 PDP - Common Features Section
    (_type == "PDPCommonFeatures") => {
      title,
      subtitle,
      "featureSections": featureSections[] {
        sectionTitle,
        icon {
          "url": asset->url
        },
        "features": features[] {
          featureItem
        }
      }
    }
  }
`;