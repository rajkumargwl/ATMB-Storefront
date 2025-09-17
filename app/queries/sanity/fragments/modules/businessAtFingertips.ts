import groq from 'groq';
import { IMAGE } from '../image';

export const BUSINESS_AT_FINGERTIPS = groq`
  headline,
  subheadline,
  phoneImage {
    ${IMAGE}
  },
  features[] {
    icon {
      iconFile,
      iconCode
    },
    title,
    description,
    highlight
  }
`;
