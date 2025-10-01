import groq from 'groq';
import { MODULES } from '../modules';
import { SEO } from '../seo';

export const MARKETPLACE_PAGE = groq`
  *[_type == "page" && slug == "marketplace"] | order(_updatedAt desc)[0]{
    title,
    modules[] {
      ${MODULES}
    },
    ${SEO}
  }
`;
