import groq from 'groq';

<<<<<<< HEAD
import { COLLECTION_GROUP } from './collectionGroup';
import { LINK_EXTERNAL } from './linkExternal';
import { LINK_INTERNAL } from './linkInternal';
=======
import {COLLECTION_GROUP} from './collectionGroup';
import {LINK_EXTERNAL} from './linkExternal';
import {LINK_INTERNAL} from './linkInternal';
>>>>>>> 3097ce2e79576a54ef13bd1a5712ec165470d926

export const LINKS = groq`
  _key,
  (_type == 'collectionGroup') => {
    ${COLLECTION_GROUP}
  },
  (_type == 'linkGroup') => {
    _type,
    links[] {
      (_type == 'linkExternal') => {
        ${LINK_EXTERNAL}
      },
      (_type == 'linkInternal') => {
        ${LINK_INTERNAL}
      },
<<<<<<< HEAD
      (_type == 'pageLink') => {
        title,
        url
      }
=======
>>>>>>> 3097ce2e79576a54ef13bd1a5712ec165470d926
    },
    title
  },
  (_type == 'linkExternal') => {
    ${LINK_EXTERNAL}
  },
  (_type == 'linkInternal') => {
    ${LINK_INTERNAL}
  },
<<<<<<< HEAD
  (_type == 'pageLink') => {
    title,
    url
  }
=======
>>>>>>> 3097ce2e79576a54ef13bd1a5712ec165470d926
`;
