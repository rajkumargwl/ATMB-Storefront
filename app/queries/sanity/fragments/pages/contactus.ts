import groq from 'groq';
import { MODULES } from '../modules';
import { SEO } from '../seo';

export const CONTACT_US_PAGE_QUERY = groq`
  *[_type == "page" && slug == "contact-us" && (language == $language || !defined(language))] | order(_updatedAt desc)[0]{
    title,
    modules[] {
      ${MODULES}
    },
    ${SEO}
  }
`;
