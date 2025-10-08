import groq from 'groq';

import { MODULE_ACCORDION } from './modules/accordion';
import { MODULE_CALLOUT } from './modules/callout';
import { MODULE_CALL_TO_ACTION } from './modules/callToAction';
import { MODULE_COLLECTION } from './modules/collection';
import { MODULE_IMAGE } from './modules/image';
import { MODULE_INSTAGRAM } from './modules/instagram';
import { MODULE_PRODUCT } from './modules/product';
import { MODULE_HERO_BANNER } from './modules/herobanner';
import { HOME_SECTION_2 } from './modules/homeSection2';
import { HOME_SECTION_3 } from './modules/homeSection3';
import { HOME_SECTION_4 } from './modules/homeSection4';
import { PLANS } from './modules/plans';
import { BUNDLES } from './modules/bundles';
import { WHY_BUSINESS_CHOOSE_US } from './modules/whyBusinessChooseUs';
import { BUSINESS_AT_FINGERTIPS } from './modules/businessAtFingertips';
import { TESTIMONIAL } from './modules/testimonial';
import { FAQ } from './modules/faq';
import { ABOUT_US_MODULE } from './modules/aboutus';
import { CAREER_PAGE_MODULE } from './modules/careerpage';
import { FAQ_MODULES } from './modules/faqcategory';
import { USPS_FORM_1583 } from './modules/uspsform1583';
import { CONTACT_US_MODULE } from './modules/contactus'; 
import { AFFILIATE_MODULE } from './modules/affiliateProgramSection'; 
import { SOLUTION_PAGE_MODULE } from './modules/solutionpagemodule';
// import { FOUNDER_BY_SLUG } from './modules/founder';
import { RENTER_REFERRAL_FRAGMENT } from './modules/renter';
import { MARKETPLACE } from './modules/marketplace';
import { HOW_IT_WORKS_MODULE } from './modules/howitworksmodule';
import { BUSINESS_ACCELERATOR_MODULE } from './modules/accelerator';
 

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
  },
  (_type == "marketPlaceModule") => {
    ${MARKETPLACE}
  },
  (_type == "aboutUsModule") => {
    ${ABOUT_US_MODULE}
  },
  (_type == "careersPageModule") => {
    ${CAREER_PAGE_MODULE}
  },
  (_type == "faqPageModule") => {
    ${FAQ_MODULES}
  },
  (_type == "uspsForm1583") => {
    ${USPS_FORM_1583}
  },
  (_type == "contactUsSection") => {
    ${CONTACT_US_MODULE}
  },
  (_type == "affiliatedProgramPageModule") => {   // 👈 added parent module
    ${AFFILIATE_MODULE}
  },
(_type == "renterreferralprogram") => {
    ${RENTER_REFERRAL_FRAGMENT}
  },
  (_type == "solutionPageModule") => {
    ${SOLUTION_PAGE_MODULE}
  },
(_type == "howitworks") => {
    ${HOW_IT_WORKS_MODULE}
  },
  (_type == "acceleratorPageModule") => {
    ${BUSINESS_ACCELERATOR_MODULE}
  }
`;
