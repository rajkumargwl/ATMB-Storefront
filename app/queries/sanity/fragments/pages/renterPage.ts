import groq from 'groq';
import { SEO } from '../seo'; 
import { RENTER_REFERRAL_FRAGMENT } from '../modules/renter';

// 🛑 FIX: Ensure the slug is hardcoded as a string "renter-referral-program", not $slug variable.
export const RENTER_PAGE_QUERY = groq`
  *[_type == "page" && slug == "renter-referral-program"] {
    _id,
    title,
    slug,
    modules[] {
      _key,
      _type,
      (_type == "renterreferralprogram") => {
        ${RENTER_REFERRAL_FRAGMENT}
      }
    },
    seo {
      ${SEO} 
    }
  }
`;