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
          asset->{url, metadata{lqip}}
        }
      }
    },
    // Detailed Features Section
    (_type == "aboutDetailedFeaturesSection") => {
      heading,
      description,
      rightImage {
        asset->{url, metadata{lqip}}
      },
      backgroundColor,
      features[] {
        title,
        subtitle,
        icon {
          asset->{url, metadata{lqip}}
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
          asset->{url, metadata{lqip}}
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
          asset->{url, metadata{lqip}}
        }
      }
    }
  }
`;
