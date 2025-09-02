import groq from 'groq';

import {IMAGE_WITH_PRODUCT_HOTSPOTS} from '../imageWithProductHotspots';
import {LINK_EXTERNAL} from '../linkExternal';
import {LINK_INTERNAL} from '../linkInternal';
import {PRODUCT_WITH_VARIANT} from '../productWithVariant';
import {IMAGE} from '../image';

export const BUNDLES = groq`
   eyebrow,
   description,
    plans[] {
      badgeText,
      title,
      subtitle,
      startingFrom,
      oldPrice,
      price,
      priceUnit,
      services[] {
        name,
        description,
        tier,
      },
      features[],
      ctaText,
        ctaUrl {
                ...LINK_INTERNAL,
                ...LINK_EXTERNAL    
        }
    }
`;
