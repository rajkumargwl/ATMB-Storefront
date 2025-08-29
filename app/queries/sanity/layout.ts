// import groq from 'groq';

// import {COLOR_THEME} from './fragments/colorTheme';
// import {LINKS} from './fragments/links';
// import {PORTABLE_TEXT} from './fragments/portableText/portableText';

// export const LAYOUT_QUERY = groq`
//   *[_type == 'settings'] | order(_updatedAt desc) [0] {
//     seo,
//     "menuLinks": menu.links[] {
//       ${LINKS}
//     },
//     footer {
//       links[] {
//         ${LINKS}
//       },
//       text[]{
//         ${PORTABLE_TEXT}
//       },
//     },
//     notFoundPage {
//       body,
//       "collectionGid": collection->store.gid,
//       colorTheme->{
//         ${COLOR_THEME}
//       },
//       title
//     }
//   }
// `;
import groq from 'groq';

import { COLOR_THEME } from './fragments/colorTheme';
import { LINKS } from './fragments/links';
import { PORTABLE_TEXT } from './fragments/portableText/portableText';

export const LAYOUT_QUERY = groq`
  *[_type == "settings"] | order(_updatedAt desc) [0] {
    seo,

    // Fetch all menu (header) fields
    menu {
      welcomeText,
      phoneNumber,
      workingHours,
      email,
      "logoUrl": logo.asset->url,
      "menuLinks": links[] {
        ${LINKS}
      },
      appointmentButton {
        text,
        link
      }
    },

    footer {
      // Contact Info
      contactInfo {
        description,
        phone,
        email
      },

      // Latest News
      latestNews[] {
        "imageUrl": image.asset->url,
        title,
        date
      },

      // Opening Hours
      openingHours[] {
        day,
        time
      },

      // Social Media Links
      socialLinks {
        facebook,
        twitter,
        instagram
      },

      // Bottom Links
      bottomLinks[] {
        text,
        url
      },

      // Copyright Text
      copyright
    },

    notFoundPage {
      body,
      "collectionGid": collection->store.gid,
      colorTheme->{
        ${COLOR_THEME}
      },
      title
    }
  }
`;
