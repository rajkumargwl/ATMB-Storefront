// app/queries/sanity/fragments/modules/operatorsignup.ts
import groq from 'groq';

export const OPERATOR_SIGNUP_FRAGMENT = groq`
  _key,
  _type,
  modules[] {
    _key,
    _type,
    (_type == "affiliateProgramSection") => {
      label,
      heading,
      description,
      ctaText,
      ctaUrl,
      image {
        "url": asset->url,
        alt
      }
    },
    (_type == "whyJoinSection") => {
      heading,
      features[] {
        _key,
        text
      }
    },
    (_type == "howitworks3steps") => {
      heading,
      description,
      features[] {
        _key,
        title,
        description,
        tooltip,
        icon {
          upload {
            asset->{
              _id,
              url
            }
          },
          svgCode
        }
      },
      buttonPrimary {
        label,
        url
      },
      buttonSecondary {
        label,
        url
      }
    },
    (_type == "operatorSignupVideo") => {
      youtubeUrl,
      thumbnail {
        asset->{
          _id,
          url
        }
      }
    },
    (_type == "businessAtFingertips") => {
      headline,
      subheadline,
      phoneImage {
        asset->{
          _id,
          url
        }
      },
      features[] {
        _key,
        title,
        description,
        highlight,
        icon {
          iconFile {
            asset->{
              _id,
              url
            }
          },
          iconCode,
          tooltipTitle
        }
      }
    },
    (_type == "whyBusinessChooseUs") => {
      heading,
      description,
      features[] {
        _key,
        title,
        description,
        icon {
          upload {
            asset->{
              _id,
              url
            }
          },
          svgCode,
          tooltipTitle
        }
      }
    },
    (_type == "joinTeamSection") => {
      title,
      subtitle,
      buttonText,
      buttonLink,
      backgroundColor,
      textColor
    },
  (_type == "testimonial") => {
      headline,
      subheadline,
      testimonials[] {
        type,
        rating,
        starIcon {
          "url": asset->url
        },
        quote,
        readMoreText,
        readMoreUrl,
        videoUrl,
        videoThumbnail {
          "url": asset->url
        },
        playIcon {
          "url": asset->url
        },
        authorName,
        authorTitle,
        authorImage {
          "url": asset->url
        }
      }
    },    (_type == "operatorOurAdvantage") => {
      heading,
      features[] {
        _key,
        title,
        description,
        icon {
          tooltipTitle,
          upload {
            asset->{
              _id,
              url
            }
          }
        }
      }
    },
       (_type == "operatorYourCompetitors") => {
      heading,
      description,
      ctaText,
      ctaUrl,
      image {
        asset->{
          _id,
          url
        },
        alt
      }
    }
  }
`;