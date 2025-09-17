import groq from 'groq';

export const FAQ = groq`
  _type,
  headline,
  subheadline,
  faqs[] {
    _key,
    question,
    answer
  }
`;
