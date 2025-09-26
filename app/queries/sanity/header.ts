
// /queries/sanity/header.ts
import groq from "groq";
 
export const HEADER_QUERY = groq`
*[_type == "header"]  | order(_updatedAt desc)[0]{
  logo{
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
  icon1{ "url": asset->url },
  icon2{ "url": asset->url },
  loginButton{ label, link },
  getStartedButton{ label, link }
}
`;
 