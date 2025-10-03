import groq from 'groq';

export const MARKETPLACE = groq`
  _type,
  _key,
  modules[] {
    _type,
    _key,

    // Marketplace Intro Section
    (_type == "marketPlaceIntroSection") => {
      label,
      heading,
      image {
        "url": asset->url
      }
    },

    // Marketplace Categories Section
    (_type == "marketPlaceCategoriesSection") => {
      allIconWhite,
      allIconBlack,
      categories[] {
        title,
        iconBlack,
        iconWhite,
        image {
          "url": asset->url
        },
        subcategories[] {
          name,
          description,
          logo {
            "url": asset->url
          },
          buttonText,
          buttonLink
        }
      }
    },
        
  }

`;
