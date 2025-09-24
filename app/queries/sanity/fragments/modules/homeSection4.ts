import groq from 'groq';

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
      "url": asset->url,
      altText,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
      blurDataURL
    },
    locationUrl
  },
  browseAllText,
  browseAllUrl
`;
