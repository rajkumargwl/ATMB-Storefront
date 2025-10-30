import groq from 'groq';
import { MODULES } from '../modules';
import { SEO } from '../seo';

export const FAQ_OPERATOR_PAGE = groq`
  *[_type == "page" && slug == "faq-operator" && (language == $language || !defined(language))] | order(_updatedAt desc)[0]{
    title,
    modules[] {
      ${MODULES}
    },
    ${SEO}
  }
`;
