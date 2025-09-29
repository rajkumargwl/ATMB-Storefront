import groq from 'groq';

export const CONTACT_US_MODULE = groq`
  _type,
  _key,
  title,
  formTitle,
  formDescription,
  supportSection {
    sectionTitle,
    sectionDescription,
    supportItems[] {
      title,
      note,
      icon {
        "url": asset->url,
      },
      contacts[] {
        icon {
          "url": asset->url,
        },
        number,
        phoneLink
      }
    }
  },
  quickLinks[] {
    label,
    url
  }
`
