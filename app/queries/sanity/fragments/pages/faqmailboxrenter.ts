import groq from 'groq';
import { MODULES } from '../modules';
import { SEO } from '../seo';

export const FAQ_MAILBOX_RENTER_PAGE = groq`
  *[_type == "page" && slug == "faq-mail-box-renter" && (language == $language || !defined(language))] | order(_updatedAt desc)[0]{
    title,
    modules[] {
      ${MODULES}
    },
    ${SEO}
  }
`;
