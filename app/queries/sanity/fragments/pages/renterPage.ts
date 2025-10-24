import groq from 'groq';
import { SEO } from '../seo'; 
import { RENTER_REFERRAL_FRAGMENT } from '../modules/renter';
import { MODULES } from '../modules';

export const RENTER_PAGE_QUERY = groq`
  *[_type == "page" && slug == "renter-referral-program"] {
    _id,
    title,
    slug,
    modules[] {
          ${MODULES}
        },
    ${SEO}
  }
`;