import groq from 'groq';

export const RENTER_REFERRAL_FRAGMENT = groq`
  _key,
  _type,
  modules[] {
    _key,
    _type,
    // About Intro Section - handles both hero and no-catch sections
    (_type == "aboutIntroSection") => {
      label,
      heading,
      highlightedText,
      description,
      buttonText,
      buttonLink,
      image {
        asset-> {
          url,
          metadata {
            dimensions
          }
        }
      }
    },
    // Why Business Choose Us
    (_type == "whyBusinessChooseUs") => {
      heading,
      description,
      features[] {
        _key,
        title,
        description,
        icon {
          upload {
            asset-> {
              url,
              metadata {
                dimensions
              }
            }
          },
          svgCode,
          tooltipTitle,
          asset-> { // Duplicate asset definition but kept as per your original file
            url,
            metadata {
              dimensions
            }
          }
        }
      }
    },
    // Renter Editor
    (_type == "renterEditor") => {
      title,
      terms[]
    }
  }
`;