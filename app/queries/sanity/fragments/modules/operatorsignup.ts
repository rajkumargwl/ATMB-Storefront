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
        asset->{
          _id,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        },
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
        _key,
        type,
        rating,
        starIcon {
          asset->{
            _id,
            url
          }
        },
        quote,
        readMoreText,
        readMoreUrl,
        videoUrl,
        videoThumbnail {
          asset->{
            _id,
            url
          }
        },
        playIcon {
          asset->{
            _id,
            url
          }
        },
        authorName,
        authorTitle,
        authorImage {
          asset->{
            _id,
            url
          }
        }
      }
    },
    (_type == "operatorYourCompetitors") => {
      label,
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