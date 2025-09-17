import groq from 'groq';

// import {MODULE_HERO_BANNER} from '../modules/herobanner';
import {MODULES} from '../modules';
import {SEO} from '../seo';

export const HOME_PAGE = groq`
 
  modules[] {
    ${MODULES}
  },
  ${SEO}
`;
