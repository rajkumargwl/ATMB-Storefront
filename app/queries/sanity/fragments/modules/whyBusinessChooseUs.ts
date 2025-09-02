import groq from 'groq';

import {IMAGE_WITH_PRODUCT_HOTSPOTS} from '../imageWithProductHotspots';
import {LINK_EXTERNAL} from '../linkExternal';
import {LINK_INTERNAL} from '../linkInternal';
import {PRODUCT_WITH_VARIANT} from '../productWithVariant';
import {IMAGE} from '../image';

export const WHY_BUSINESS_CHOOSE_US = groq`
    heading,
    description,
     features[] {
        _key,
        _type,
        title,
        description
      },
    image {
      ${IMAGE}
    },
`;
