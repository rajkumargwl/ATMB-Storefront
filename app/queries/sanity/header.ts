// ~/queries/sanity/header.ts
import groq from "groq";

// Main query to fetch header by specific language
export const HEADER_QUERY = groq`
*[

  _type == "header" && (language == $language || !defined(language))

] | order(_updatedAt desc) [0] {
    logo {
      "url": asset->url
    },
    menu[] {
      label,
      url,
      hasSubmenu,
      subMenu[] {
        label,
        url
      }
    },
    icon1 { "url": asset->url },
    icon2 { "url": asset->url },
    icon3 { "url": asset->url },
    loginButton { label, link },
    getStartedButton { label, link },
    _updatedAt
  }
`;

// Fallback query for English headers (explicitly look for English)
export const HEADER_FALLBACK_QUERY = groq`
  *[_type == "header" && language == "en"] | order(_updatedAt desc) [0] {
    logo {
      "url": asset->url
    },
    menu[] {
      label,
      url,
      hasSubmenu,
      subMenu[] {
        label,
        url
      }
    },
    icon1 { "url": asset->url },
    icon2 { "url": asset->url },
    icon3 { "url": asset->url },
    loginButton { label, link },
    getStartedButton { label, link },
    _updatedAt
  }
`;