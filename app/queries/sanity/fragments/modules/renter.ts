import groq from 'groq';

export const RENTER_REFERRAL_FRAGMENT = groq`
  _type,
  _key,
  modules[] {
    _type,
    _key,

   
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

   
    (_type == "renterReferralBannerModule") => {
      sectionTitle,
      buttonText,
      buttonLink,
      image {
        "url": asset->url
      }
    },
    (_type == "renterEditor") => {
      title,
      terms
    },
    (_type == "renterReferralBannerBottomModule") => {
      sectionTitle,
      buttonText,
      buttonLink,
      image {
        "url": asset->url
      }
    }
  }
`;
