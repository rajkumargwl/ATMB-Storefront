import groq from 'groq';
import { MODULES } from '../modules';
import { SEO } from '../seo';

export const HOW_IT_WORKS_PAGE_QUERY = groq`
  *[_type == "page" && slug == "how-it-works"] | order(_updatedAt desc)[0]{
    _id,
    _type,
    title,
    slug,
    modules[] {
      ${MODULES}
    },
    ${SEO}
  }
`;