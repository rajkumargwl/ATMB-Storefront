import groq from 'groq';
import { IMAGE } from '../image';

export const HOME_SECTION_4 = groq`
  heading,
  description,
  searchPlaceholder,
  title,
  locations[] {
    city,
    state,
    operatorCount,
    image {
      ${IMAGE}
    },
    locationUrl
  },
  browseAllText,
  browseAllUrl
`;
