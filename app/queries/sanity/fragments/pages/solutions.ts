import groq from 'groq';

import {MODULE_HERO_BANNER} from '../modules/herobanner';
import {MODULE_FEATURES} from '../modules/extrafeatures';
import {MODULE_PRICING} from '../modules/pricemodule';
import {MODULE_HOW_IT_WORKS} from '../modules/howitwork';
import {MODULE_WHY_CHOOSE_ANYTIME_PHONES} from '../modules/whychooseanytime';
import {MODULE_REVIEW} from '../modules/review';
import {FAQ} from '../modules/faq';

export const SOLUTION_PAGE = groq`
  *[_type == "solutions"][0] {
    modules[] {
      _key,
      _type == "heroBanner" => {
        ${MODULE_HERO_BANNER}
      },
      _type == "featuresModule" => {
        ${MODULE_FEATURES}
      },
      _type == "pricingModule" => {
        ${MODULE_PRICING}
      },
      _type == "howItWorks" => {
        ${MODULE_HOW_IT_WORKS}
      },
      _type == "whyChooseAnytimePhones" => {
        ${MODULE_WHY_CHOOSE_ANYTIME_PHONES}
      },
      _type == "review" => {
        ${MODULE_REVIEW}
      },
      _type == "faq" => {
        ${FAQ}
      },
      
    }
  }
`;
