import groq from 'groq';

import {IMAGE_WITH_PRODUCT_HOTSPOTS} from '../imageWithProductHotspots';
import {LINK_EXTERNAL} from '../linkExternal';
import {LINK_INTERNAL} from '../linkInternal';
import {PRODUCT_WITH_VARIANT} from '../productWithVariant';
import {IMAGE} from '../image';

export const PLANS = groq`
    heading,
    description,
    plans[] {
      icon {
         svgCode,
         svgFile{
           ${IMAGE}
         }
      },
      title,
      price,
      heading,
      features[],
      ctaText,
        ctaUrl {
             ...LINK_INTERNAL,
                ...LINK_EXTERNAL    
        },
        isMostPopular
    }
`;
