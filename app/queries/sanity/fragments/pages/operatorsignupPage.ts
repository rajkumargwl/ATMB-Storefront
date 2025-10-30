import groq from 'groq';
import { MODULES } from '../modules';
import { SEO } from '../seo';

export const OPERATOR_SIGNUP_PAGE = groq`
  *[_type == "page" && slug == "operator-signup" && (language == $language || !defined(language))] | order(_updatedAt desc)[0]{
    title,
    modules[] {
      ${MODULES}
    },
    ${SEO}
  }
`;