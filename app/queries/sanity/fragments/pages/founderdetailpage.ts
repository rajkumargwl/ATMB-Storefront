// import groq from 'groq';
// import { MODULES } from '../modules';
// import { SEO } from '../seo';

// // Founder Detail Page Query
// export const FOUNDER_DETAIL_PAGE_QUERY = groq`
//   *[_type == "page" && slug == "founder-page"] | order(_updatedAt desc)[0]{
//     title,
//     modules[] {
//       ${MODULES}
//     },
    
//     ${SEO}
//   }
// `;

import groq from 'groq';
import { MODULES } from '../modules';
import { SEO } from '../seo';

export const FOUNDER_DETAIL_PAGE_QUERY = groq`
*[_type == "page" && slug == "founder-page"] | order(_updatedAt desc)[0]{
  title,
  modules[] {
    _key,
    _type,
    // If this module is founderModule, fetch the founder by $slug
    (_type == "founderModule") => {
      title,
      founders[slug.current== 'matt-going'][0]{
        name,
        "slug": slug.current,
        role,
        profileImage { "url": asset->url },
        longBio[]{ ... },
        socialLinks {
          linkedin
        }
      }
    },
   
   
  },
  ${SEO}
}
`;

