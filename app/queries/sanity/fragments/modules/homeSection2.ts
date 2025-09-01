import groq from 'groq';

import {IMAGE} from '../image';
import {IMAGE_WITH_PRODUCT_HOTSPOTS} from '../imageWithProductHotspots';
import {LINK_EXTERNAL} from '../linkExternal';
import {LINK_INTERNAL} from '../linkInternal';
import {PRODUCT_WITH_VARIANT} from '../productWithVariant';

export const HOME_SECTION_2 = groq`
  heading,
  icons[] {
    icon {
      upload {
         ${IMAGE}
      },
      svgCode
    },
    label
  },
  images[] {
      ${IMAGE_WITH_PRODUCT_HOTSPOTS}
  },
`;
