import groq from 'groq';

export const MODULE_FEATURES = groq`
 _type,
  _key,
  label,
  title,
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
