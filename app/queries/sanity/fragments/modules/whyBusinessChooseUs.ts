import groq from 'groq';
import { IMAGE } from '../image';

export const WHY_BUSINESS_CHOOSE_US = groq`
  heading,
  description,
  features[] {
    _key,
    title,
    description,
    icon {
       upload {
        "url": asset->url,
        altText,
        
      },
      svgCode,
       tooltipTitle 
    }
  }
`;
