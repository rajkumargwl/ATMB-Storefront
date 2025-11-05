import groq from 'groq';
 
export const HOW_IT_WORKS_MODULE = groq`
  _type,
  _key,
  modules[] {
    _type,
    _key,
 
    // How It Works Virtual Mailbox
    (_type == "howitworksVirtualbox") => {
      title,
      description,
      links[] {
        label,
        url,
        sectionid
      },
      ctaButton {
        label,
        url,
        sectionid
      },
      image {
        "url": asset->url,
        alt
      }
    },
 
    // USPS Form 1583 Guide
    (_type == "uspsForm1583Guide") => {
      title,
      description,
      image {
        "url": asset->url,
        alt
      }
    },
 
    // How It Works - 2
    (_type == "howitworks2") => {
      sectionTitle,
      sectionSubtitle,
      features[] {
        steps,
        title,
        description,
        icon {
          "url": asset->url
        }
      },
      button {
        text,
        url,
        sectionid
      }
    },
 
    // Built for How You Work Today
  (_type == "builtForHowYouWorkToday") => {
      title,
      subtitle,
      heading,
      tabs[] {
        icon {
          "url": asset->url
        },
        tooltip,
        label,
        avatars[] {
          "url": asset->url
        },
        sideText,
        detailsHeading,
        features[] {
          icon {
            "url": asset->url
          },
          tooltip,
          description
        }
      }
    },
    // How It Works - 3 Steps
    (_type == "howitworks3steps") => {
      heading,
      description,
      features[] {
        icon {
          upload {
            "url": asset->url
          },
          svgCode
        },
        tooltip,
        title,
        description
      },
      buttonPrimary {
        label,
        url,
        sectionid
      },
      buttonSecondary {
        label,
        url,
        sectionid

      }
    },
 
    // FAQ
    (_type == "faq") => {
      headline,
      subheadline,
      faqs[] {
        question,
        answer
      }
    }
  }
`;