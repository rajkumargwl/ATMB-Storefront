import groq from 'groq';

import {IMAGE_WITH_PRODUCT_HOTSPOTS} from '../imageWithProductHotspots';
import {LINK_EXTERNAL} from '../linkExternal';
import {LINK_INTERNAL} from '../linkInternal';
import {PRODUCT_WITH_VARIANT} from '../productWithVariant';
import {IMAGE} from '../image';

export const HOME_SECTION_3 = groq`
    title,
    subtitle1,
    subtitle2,
    tabs[] {
      label,
      description,
      keyNeeds[],
      services[] {
        service,
        icon {
           ${IMAGE}
        },
        title,
        description,
        link {
          ...LINK_INTERNAL,
          ...LINK_EXTERNAL
        },
      },
      button,
      image {
         ${IMAGE}
      },
      quote,
    }
`;
