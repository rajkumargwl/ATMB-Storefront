
import groq from 'groq';

export const BUSINESS_AT_FINGERTIPS = groq`
  headline,
  subheadline,
  phoneImage {
    "url": asset->url,
    altText
  },
  features[] {
    icon {
      iconFile {
        "url": asset->url,
        originalFilename
      },
   
      tooltipTitle // ADD THIS LINE
    },
    title,
    description,
    highlight
  }
`;
