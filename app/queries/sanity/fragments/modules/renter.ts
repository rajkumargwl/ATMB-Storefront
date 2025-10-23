import groq from 'groq';

export const RENTER_REFERRAL_FRAGMENT = groq`
  _type,
  _key,
  modules[] {
    _type,
    _key,

    // 🧠 Invite a Friend Section
    (_type == "inviteAFriendSection") => {
      sectionTitle,
      heading,
      description,
      cta {
        label,
        url
      },
      mainImage {
        "url": asset->url,
        alt
      }
    },

    // 👣 Referral Steps Section
    (_type == "referralStep") => {
      heading,
      subheading,
      steps[] {
        title,
        description,
        icon {
          "url": asset->url
        }
      }
    },

    // 🎁 Renter Referral Banner Section
    (_type == "renterReferralBannerModule") => {
      sectionTitle,
      buttonText,
      buttonLink,
      image {
        "url": asset->url
      }
    },

    // 🧾 Renter Editor Section (Terms & Conditions)
    (_type == "renterEditor") => {
      title,
      terms
    }
  }
`;
