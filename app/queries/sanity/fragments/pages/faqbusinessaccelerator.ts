import groq from 'groq';
import { MODULES } from '../modules';
import { SEO } from '../seo';

export const FAQ_BUSINESS_ACCELERATOR_PAGE = groq`
  *[_type == "page" && slug == "faq-business-accelerator" && (language == $language || !defined(language))] | order(_updatedAt desc)[0]{
    title,
    modules[] {
      ${MODULES}
    },
    ${SEO}
  }
`;
