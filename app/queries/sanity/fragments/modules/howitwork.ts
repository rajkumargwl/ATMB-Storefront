import groq from 'groq';

export const MODULE_HOW_IT_WORKS = groq`
 _type,
  _key,
  badge,
  heading,
  subheading,
  steps[] {
    icon {
      asset->{
        _id,
        url
      }
    },
    title,
    description,
    tooltipTitle // ADD THIS
  }
`;