// import groq from 'groq';

// import {COLOR_THEME} from '../colorTheme';
// import {HERO_PAGE} from '../heroes/page';
// import {PORTABLE_TEXT} from '../portableText/portableText';
// import {SEO} from '../seo';
// import {ABOUT_US_PAGE_QUERY} from '../pages/aboutUs';
// export const PAGE = groq`
//   title,
//   body[]{
//     ${PORTABLE_TEXT}
//   },
//   colorTheme->{
//     ${COLOR_THEME}
//   },
//   (showHero == true) => {
//     hero {
//       ${HERO_PAGE}
//     },
//   },
//   ${SEO},
//   "aboutUs": ${ABOUT_US_PAGE_QUERY}
// `
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
