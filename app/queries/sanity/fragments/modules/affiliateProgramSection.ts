import groq from 'groq';

export const AFFILIATE_MODULE = groq`
  _type,
  _key,
  modules[] {
    _type,
    _key,

    // Affiliate Program Section
    (_type == "affiliateProgramSection") => {
      label,
      heading,
      description,
      ctaText,
      ctaUrl,
      image {
        "url": asset->url,
        alt
      }
    },

    // Steps Section
    (_type == "stepsSection") => {
      heading,
      description,
      steps[] {
        icon {
          "url": asset->url
        },
        title,
        text
      },
      ctaText,
      ctaUrl
    },

    // Why Join Section
    (_type == "whyJoinSection") => {
      heading,
      features[] {
        text
      }
    }
  }
`;
