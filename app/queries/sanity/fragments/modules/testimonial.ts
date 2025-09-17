import groq from 'groq';
import { IMAGE } from '../image';

export const TESTIMONIAL = groq`
  headline,
  subheadline,
  testimonials[] {
    _key,
    type, // 'quote' or 'video'

    // ⭐ Quote Testimonials
    rating,
    starIcon {
      svgFile,
      svgCode
    },
    quote,
    readMoreText,
    readMoreUrl,

    // 🎥 Video Testimonials
    videoUrl,
    videoThumbnail {
      ${IMAGE}
    },
    playIcon {
      playSvgFile,
      playSvgCode
    },

    // 👤 Author Info
    authorName,
    authorTitle,
    authorImage {
      ${IMAGE}
    }
  },
  navigation {
    prevIcon,
    nextIcon
  }
`;
