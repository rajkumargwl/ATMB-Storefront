import groq from 'groq';
import { MODULES } from '../modules';
import { SEO } from '../seo';

export const BUSINESS_ACCELERATOR_PAGE_QUERY = groq`
  *[_type == "page" && slug == "business-accelerator-page"] | order(_updatedAt desc)[0]{
    title,
    modules[] {
      ${MODULES}
    },
    ${SEO}
  }
`;

