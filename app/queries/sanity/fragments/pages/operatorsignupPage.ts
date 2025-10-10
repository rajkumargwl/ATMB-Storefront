import groq from 'groq';
import { MODULES } from '../modules';
import { SEO } from '../seo';

export const OPERATOR_SIGNUP_PAGE = groq`
  *[_type == "page" && slug == "operator-signup"] | order(_updatedAt desc)[0]{
    title,
    modules[] {
      ${MODULES}
    },
    ${SEO}
  }
`;