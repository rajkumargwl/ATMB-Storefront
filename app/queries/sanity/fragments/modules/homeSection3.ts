
import groq from 'groq';

export const HOME_SECTION_3 = groq`
  title,
  subtitle,
  tabs[] {
    label,
    heading,
    description,
    keyNeeds[],
    quote {
      avatar {
        "url": asset->url,
        altText
      },
      author,
      text
    },
    services[] {
      icon {
        upload {
          "url": asset->url,
          altText
        },
        svgCode,
        tooltipTitle // ADD THIS LINE
      },
      title,
      description
    },
    button {
      label,
      textColor,
      bgColor
    }
  }
`;


