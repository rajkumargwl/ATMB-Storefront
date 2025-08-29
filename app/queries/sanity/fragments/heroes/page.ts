import groq from 'groq';

import {IMAGE_WITH_PRODUCT_HOTSPOTS} from '../imageWithProductHotspots';
import {PRODUCT_WITH_VARIANT} from '../productWithVariant';

export const HERO_PAGE = groq`
  content[0] {
    _type,
    (_type == 'imageWithProductHotspots') => {
      ${IMAGE_WITH_PRODUCT_HOTSPOTS}
    },
    (_type == 'productWithVariant') => {
      ...${PRODUCT_WITH_VARIANT}
    },
  },
<<<<<<< HEAD
  title,
  subtitle
=======
  title
>>>>>>> 3097ce2e79576a54ef13bd1a5712ec165470d926
`;
