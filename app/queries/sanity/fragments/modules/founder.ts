import groq from 'groq';

export const FOUNDER_BY_SLUG = groq`
_type,
_key,
modules[] {
  _type,
  _key,
  // Only for founderModule, include the founder matching $slug
  (_type == "founderModule") => {
    founders[slug.current == $slug]| order(_updatedAt desc)[0]{
      name,
      "slug": slug.current,
      role,
      profileImage {
        "url": asset->url
      },
      longBio[]{
        ...
      },
      socialLinks {
        linkedin
      }
    }
  }
}
`;
