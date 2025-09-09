import groq from 'groq';

export const MODULE_REVIEW = groq`
 _type,
  _key,
  badge,
  heading,
  reviews[] {
    authorImage {
      asset->{
        _id,
        url
      }
    },
    rating,
    quote,
    authorName,
    authorTitle
  }
`;
