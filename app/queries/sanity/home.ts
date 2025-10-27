import groq from 'groq';

import {HOME_PAGE} from './fragments/pages/home';

export const HOME_PAGE_QUERY = groq`
  *[_type == 'home'  && (language == $language || !defined(language))] | order(_updatedAt desc) [0]{
    ${HOME_PAGE}
  }
`;
