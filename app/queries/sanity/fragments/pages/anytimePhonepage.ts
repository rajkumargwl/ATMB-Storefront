import groq from 'groq';
import { MODULES } from '../modules';
import { SEO } from '../seo';

export const ANYTIME_PHONE_PAGE_QUERY = groq`
  *[_type == "page" && slug == "anytime-phone"] | order(_updatedAt desc)[0]{
    title,
    modules[] {
      ${MODULES}
    },
    ${SEO}
  }
`;
