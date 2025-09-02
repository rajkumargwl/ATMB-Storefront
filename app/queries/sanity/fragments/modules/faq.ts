import groq from 'groq';

import {IMAGE_WITH_PRODUCT_HOTSPOTS} from '../imageWithProductHotspots';
import {LINK_EXTERNAL} from '../linkExternal';
import {LINK_INTERNAL} from '../linkInternal';
import {PRODUCT_WITH_VARIANT} from '../productWithVariant';
import {IMAGE} from '../image';

export const FAQ = groq`
   headline,
    subheadline,
    faqCategories[] {
      title,
      faqs[] {
        question,
        answer
      }
    }
`;
