import groq from 'groq';

export const ABOUT_US_MODULE = groq`
  _type,
  _key,
  modules[] {
    _type,
    _key,
    // About Intro Section
    (_type == "aboutIntroSection") => {
      label,
      heading,
      highlightedText,
      description,
      buttonText,
      buttonLink,
       image {
      "url": asset->url,
  }
    },
    // How It Started Section
    (_type == "aboutHowItStartedSection") => {
      heading,
      content,
      image {
      "url": asset->url,
  }
    },
    // Features Section
    (_type == "aboutFeaturesSection") => {
      backgroundColor,
      features[] {
        title,
        subtitle,
        icon {
          "url": asset->url,
        }
      }
    },
    // Detailed Features Section
    (_type == "aboutDetailedFeaturesSection") => {
      heading,
      description,
      rightImage {
        "url": asset->url,
      },
      backgroundColor,
      features[] {
        title,
        subtitle,
        icon {
          "url": asset->url,
        }
      }
    },
    // Founders Section
    (_type == "aboutFoundersSection") => {
      title,
      subtitle,
      founders[] {
        name,
        role,
        bio,
        linkedin,
        image {
          "url": asset->url,
        }
      }
    },
    // Resource Authors Section
    (_type == "aboutResourceAuthorsSection") => {
      title,
      subtitle,
      authors[] {
        name,
        role,
        image {
          "url": asset->url,
        }
      }
    }
  }
`;
