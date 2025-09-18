
import groq from 'groq';

export const TESTIMONIAL = groq`
  headline,
  subheadline,
  testimonials[] {
    _key,
    type, // 'quote' or 'video'

    // ⭐ Star Rating (for both quote & video)
    rating,

    // Quote Testimonial
    quote,
    readMoreText,
    readMoreUrl,
    starIcon {
      "url": asset->url
    },

    // Video Testimonial
    videoUrl,
    videoThumbnail {
      "url": asset->url,
      altText
    },
    playIcon {
      "url": asset->url
    },
   starIcon {
      "url": asset->url
    },

    // 👤 Author Info
    authorName,
    authorTitle,
    authorImage {
      "url": asset->url,
      altText
    }
  }
`;
