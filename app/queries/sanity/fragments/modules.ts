import groq from 'groq';

import {MODULE_ACCORDION} from './modules/accordion';
import {MODULE_CALLOUT} from './modules/callout';
import {MODULE_CALL_TO_ACTION} from './modules/callToAction';
import {MODULE_COLLECTION} from './modules/collection';
import {MODULE_IMAGE} from './modules/image';
import {MODULE_INSTAGRAM} from './modules/instagram';
import {MODULE_PRODUCT} from './modules/product';
// import {HERO_HOME} from './heroes/home';
import {MODULE_HERO_BANNER} from './modules/herobanner';
import {HOME_SECTION_2} from './modules/homeSection2';
import {HOME_SECTION_3} from './modules/homeSection3';
import {HOME_SECTION_4} from './modules/homeSection4';
import {PLANS} from './modules/plans';
import {BUNDLES} from './modules/bundles';
import {WHY_BUSINESS_CHOOSE_US} from './modules/whyBusinessChooseUs';
import {BUSINESS_AT_FINGERTIPS} from './modules/businessAtFingertips';
import {TESTIMONIAL} from './modules/testimonial';
import {FAQ} from './modules/faq';

export const MODULES = groq`
  _key,
  _type,
  (_type == "module.accordion") => {
    ${MODULE_ACCORDION}
  },
  (_type == "module.callout") => {
    ${MODULE_CALLOUT}
  },
  (_type == 'module.callToAction') => {
    ${MODULE_CALL_TO_ACTION}
  },
  (_type == "module.collection") => {
    ${MODULE_COLLECTION}
  },
  (_type == "module.image") => {
    ${MODULE_IMAGE}
  },
  (_type == "module.instagram") => {
    ${MODULE_INSTAGRAM}
  },
  (_type == "module.product") => {
    ${MODULE_PRODUCT}
  },
   (_type == "hero") => {
    ${MODULE_HERO_BANNER}
  },
  (_type == "homeSection2") => {
    ${HOME_SECTION_2}
  },
  (_type == "homeSection3") => {
    ${HOME_SECTION_3}
  },
  (_type == "homeSection4") => {
    ${HOME_SECTION_4}
  },
  (_type == "plans") => {
    ${PLANS}
  },
  (_type == "bundles") => {
    ${BUNDLES}
  },
  (_type == "whyBusinessChooseUs") => {
    ${WHY_BUSINESS_CHOOSE_US}
  },
  (_type == "businessAtFingertips") => {
    ${BUSINESS_AT_FINGERTIPS}
  },
   (_type == "testimonial") => {
    ${TESTIMONIAL}
  },
  (_type == "faq") => {
    ${FAQ}
  }
`;
