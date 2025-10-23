
import groq from 'groq';
import { MODULES } from '../modules';
import { SEO } from '../seo';

export const PAGE = groq`
  *[_type == "page"][0]{
    title,
    modules[] {
      ${MODULES}
    },
    ${SEO}
  }
`;
