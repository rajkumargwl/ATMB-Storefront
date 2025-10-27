import groq from 'groq';
import { MODULES } from '../modules';
import { SEO } from '../seo';

export const MARKETPLACE_PAGE = groq`
  *[_type == "page" && slug == "marketplace"  && (language == $language || !defined(language))] | order(_updatedAt desc)[0]{
    title,
    modules[] {
      ${MODULES}
    },
    ${SEO}
  }
`;
