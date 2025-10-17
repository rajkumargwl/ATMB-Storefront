import groq from 'groq';

export const ANYTIME_MOBILE_APP = groq`
  _type,
  _key,
  modules[] {
    _type,
    _key,

    // Small Business Owner App Download Section
    (_type == "smallBusinessOwnerAppDownloadSection") => {
      title,
      description,
      buttons[] {
        icon {
          "url": asset->url
        },
        link
      },
      image {
        "url": asset->url
      }
    },

    // Download Mailbox Renter Apps Section
    (_type == "downloadMailboxRenterAppsSection") => {
      title,
      description,
      appStoreIcon {
        "url": asset->url
      },
      appStoreLink,
      googlePlayIcon {
        "url": asset->url
      },
      googlePlayLink,
      mockupImage {
        "url": asset->url
      }
    },
  }
`;
