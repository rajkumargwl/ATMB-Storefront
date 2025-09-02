import groq from 'groq';

import {IMAGE_WITH_PRODUCT_HOTSPOTS} from '../imageWithProductHotspots';
import {LINK_EXTERNAL} from '../linkExternal';
import {LINK_INTERNAL} from '../linkInternal';
import {PRODUCT_WITH_VARIANT} from '../productWithVariant';
import {IMAGE} from '../image';

export const TESTIMONIAL = groq`
   headline,
    subheadline,
    testimonials[] {
      _key,
      _type,
      type, // 'quote' or 'video'
        // Quote Testimonials
        rating,
        starIcon {
            svgFile,
            svgCode
        },
        quote,
        svgFile,
        svgCode,
      // Video Testimonials
        videoUrl,
        playIcon {
          playSvgFile,
          playSvgCode
        },
      //  Author Info (common)
        authorName,
        authorTitle,
        authorImage {
          ${IMAGE}
        }
    }
`;
