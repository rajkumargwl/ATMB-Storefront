import groq from 'groq';

export const CITY_PAGE_MODULE = groq`
  *[_type == "page" && count(modules[_type == "cityPageModule"]) > 0 && (language == $language || !defined(language))][0]{
    _id,
    title,
    modules[] {
      _type,
      _key,
      (_type == "cityPageModule") => {
        _type,
        _key,
        modules[] {
          _type,
          _key,

          // City Page Intro Section
          (_type == "cityPageIntroSection") => {
            heading,
            description[] {
              ...,
              markDefs[] {
                ...,
                _type == "link" => {
                  _type,
                  href
                }
              }
            },
            image {
              "url": asset->url,
              altText
            }
          },

          // City Page Advantages Section
          (_type == "cityPageAdvantagesSection") => {
            heading,
            advantages[] {
              _key,
              icon,
              heading,
              description
            }
          },

          // City Page Video Section
          (_type == "cityPageVideoSection") => {
            Title,
            videoUrl
          },

          // City Page Virtual Mailbox Section (How It Works)
          (_type == "cityPageVirtualMailboxSection") => {
            heading,
            steps[] {
              _key,
              icon,
              title,
              description
            }
          },

          // Testimonial Section
          (_type == "testimonial") => {
            headline,
            subheadline,
            testimonials[] {
              _key,
              type,
              rating,
              quote,
              readMoreText,
              readMoreUrl,
              starIcon {
                "url": asset->url
              },
              videoUrl,
              videoThumbnail {
                "url": asset->url,
                altText
              },
              playIcon {
                "url": asset->url
              },
              authorName,
              authorTitle,
              authorImage {
                "url": asset->url,
                altText
              }
            }
          },

          // City Page Pricing Banner Section
          (_type == "cityPagePricingBannerSection") => {
            text,
            ctaText,
            ctaLink,
            image {
              "url": asset->url,
              altText
            }
          }
        }
      }
    }
  }
`;

