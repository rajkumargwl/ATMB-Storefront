import groq from 'groq';
import { MODULES } from '../modules';
import { SEO } from '../seo';
export const PDP_PHONE_PAGE = groq`
  *[_type == "page" && slug == "pdp-page"] [0]{
    title,
    modules[] {
      ${MODULES}
    },
    ${SEO}
  }
`;