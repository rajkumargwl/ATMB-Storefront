import groq from 'groq';

export const CAREER_PAGE_MODULE = groq`
  _type,
  _key,
  modules[] {
    _type,
    _key,

    // Career Promotion Section
    (_type == "careerPromotionSection") => {
      smallHeading,
      mainHeading,
      highlightedWords,
      buttonText,
      buttonLink,
      image {
        "url": asset->url,
      }
    },

    // Why Work Section
    (_type == "whyWorkSection") => {
      title,
      subtitle,
      features[] {
        title,
        description,
        icon {
          "url": asset->url,
        }
      }
    },

    // About Company Section
    (_type == "aboutCompanySection") => {
      title,
      subtitle,
      items[] {
        description,
        icon {
          "url": asset->url,
        }
      }
    },

    // Core Values Section
    (_type == "coreValuesSection") => {
      title,
      subtitle,
      values[] {
        title,
        description,
        icon {
          "url": asset->url,
        }
      }
    },

    // Join Team Section
    (_type == "joinTeamSection") => {
      title,
      subtitle,
      buttonText,
      buttonLink,
      backgroundColor,
      textColor
    }
  }
`;
