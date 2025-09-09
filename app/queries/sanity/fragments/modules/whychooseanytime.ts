import groq from 'groq';

export const MODULE_WHY_CHOOSE_ANYTIME_PHONES = groq`
 _type,
  _key,
  badge,
  heading,
  image {
    asset->{
      _id,
      url,
      metadata {
        lqip,
        dimensions
      }
    }
  },
  features[] {
    icon {
      asset->{
        _id,
        url
      }
    },
    title,
    description
  }
`;
