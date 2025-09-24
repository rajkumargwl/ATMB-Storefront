import groq from 'groq';
import { MODULES } from '../modules';
import { SEO } from '../seo';

export const CAREER_PAGE_QUERY = groq`
  *[_type == "page" && slug == "careers"] | order(_updatedAt desc)[0]{
    title,
    modules[] {
      ${MODULES}
    },
    ${SEO}
  }
`;
