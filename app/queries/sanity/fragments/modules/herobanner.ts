import groq from 'groq';

export const MODULE_HERO_BANNER = groq`
  _type,
  _key,
  title,
  subtitle,
  ctaText,
  ctaUrl,
  background {
    asset->{
      _id,
      url
    }
  }
`;
