import {accordionGroupType} from './objects/module/accordionGroupType'
import {accordionType} from './objects/module/accordionType'
import {calloutType} from './objects/module/calloutType'
import {callToActionType} from './objects/module/callToActionType'
import {collectionGroupType} from './objects/collection/collectionGroupType'
import {collectionLinksType} from './objects/collection/collectionLinksType'
import {collectionReferenceType} from './objects/module/collectionReferenceType'
import {collectionRuleType} from './objects/shopify/collectionRuleType'
import {customProductOptionColorObjectType} from './objects/customProductOption/customProductOptionColorObjectType'
import {customProductOptionColorType} from './objects/customProductOption/customProductOptionColorType'
import {customProductOptionSizeObjectType} from './objects/customProductOption/customProductOptionSizeObjectType'
import {customProductOptionSizeType} from './objects/customProductOption/customProductOptionSizeType'
import {footerType} from './objects/global/footerType'
import {header} from './objects/global/headerType'
import {gridItemType} from './objects/module/gridItemType'
import {gridType} from './objects/module/gridType'
import {heroType} from './objects/module/heroType'
import {homeSection2} from './objects/module/homeSection2'
import {homeSection3} from './objects/module/homeSection3'
import {homeSection4} from './objects/module/homeSection4'
import {plans} from './objects/module/plans'
import {bundles} from './objects/module/bundles'
import {whyBusinessChooseUs} from './objects/module/whyBusinessChooseUs'
import {businessAtFingertips} from './objects/module/businessAtFingertips'
import {faq} from './objects/module/faq'
import {testimonial} from './objects/module/testimonial'
import {imageCallToActionType} from './objects/module/imageCallToActionType'
import {imageFeaturesType} from './objects/module/imageFeaturesType'
import {imageFeatureType} from './objects/module/imageFeatureType'
import {imageWithProductHotspotsType} from './objects/hotspot/imageWithProductHotspotsType'
import {instagramType} from './objects/module/instagramType'
import {inventoryType} from './objects/shopify/inventoryType'
import {linkEmailType} from './objects/link/linkEmailType'
import {linkExternalType} from './objects/link/linkExternalType'
import {linkInternalType} from './objects/link/linkInternalType'
import {linkProductType} from './objects/link/linkProductType'
import {menuLinksType} from './objects/global/menuLinksType'
import {menuType} from './objects/global/menuType'
import {notFoundPageType} from './objects/global/notFoundPageType'
import {optionType} from './objects/shopify/optionType'
import {placeholderStringType} from './objects/shopify/placeholderStringType'
import {priceRangeType} from './objects/shopify/priceRangeType'
import {productFeaturesType} from './objects/module/productFeaturesType'
import {productHotspotsType} from './objects/hotspot/productHotspotsType'
import {productReferenceType} from './objects/module/productReferenceType'
import {productWithVariantType} from './objects/shopify/productWithVariantType'
import {proxyStringType} from './objects/shopify/proxyStringType'
import {seoType} from './objects/seoType'
import {shopifyCollectionType} from './objects/shopify/shopifyCollectionType'
import {shopifyProductType} from './objects/shopify/shopifyProductType'
import {shopifyProductVariantType} from './objects/shopify/shopifyProductVariantType'
import {spotType} from './objects/hotspot/spotType'
import {menu} from './objects/shopify/menu'
import {keyHighlights} from './objects/module/keyHighlights'
import {detailedFeatureType} from './objects/module/detailedFeature'
import solutions from './singletons/solutions'
//import { heroBanner } from "./objects/module/heroBanner";
// import { heroBanner } from "./objects/module/heroBanner";
import location from './location'
import wpPost from './wpPost'
import news from './news'
import blockContent from './blockContent'
import { featuresModule } from "./objects/module/featuresModule";
import { pricingModule } from "./objects/module/pricingModule";
import { extraFeatures } from "./objects/module/extraFeatures";
import { howItWorks } from "./objects/module/howItWorks";
import { whyChooseAnytimePhones } from "./objects/module/whyChooseAnytimePhones";
import { review } from "./objects/module/review";
import {aboutIntroSection} from './objects/module/aboutIntroSection'
import {aboutHowItStartedSection} from './objects/module/aboutHowItStartedSection'
import {aboutFeaturesSection} from './objects/module/aboutFeaturesSection'
import {aboutDetailedFeaturesSection} from './objects/module/aboutDetailedFeaturesSection'
import {aboutFoundersSection} from './objects/module/aboutFoundersSection'
import {aboutResourceAuthorsSection} from './objects/module/aboutResourceAuthorsSection'
import {aboutUsModule} from './objects/module/aboutUsModule'
import { solutionsMailbox } from './objects/module/solutionsMailbox'
import { prefectvirtualbox } from './objects/module/prefectvirtualbox'
import {whyChooseVirtualMailbox} from './objects/module/whyChooseVirtualMailbox'
import {careerPromotion} from './objects/module/careerPromotion'
import {whyWorkSection} from './objects/module/whyWorkSection'
import {aboutCompanySection} from './objects/module/aboutCompanySection'
import {coreValuesSection} from './objects/module/coreValuesSection'
import {joinTeamSection} from './objects/module/joinTeamSection'
import {careersPageModule} from './objects/module/careersPageModule'
import {faqCoverModule} from './objects/module/faqCoverModule'
import {faqWithCategory} from './objects/module/faqWithCategory'
import {faqPageModule} from './objects/module/faqPageModule'
import { uspsForm1583Type } from './objects/module/uspsForm1583Type'
import { uspsForm1583Guide } from './objects/module/uspsForm1583Guide'
import { uspsForm1583Content } from "./objects/module/uspsForm1583Content"
import {contactUsSection} from './objects/module/contactUsSection'
import {affiliateProgramSection} from './objects/module/affiliateProgramSection'
import {whyJoinSection} from './objects/module/whyJoinSection'
import {stepsSection} from './objects/module/stepsSection'
import {affiliatedProgramPageModule} from './objects/module/affiliatedProgramPageModule'

// Objects used as annotations must be imported first
const annotations = [linkEmailType, linkExternalType, linkInternalType, linkProductType]

const objects = [
  review,
  whyChooseAnytimePhones,
  howItWorks,
  extraFeatures,
  pricingModule,
  featuresModule,
  //heroBanner,
  aboutUsModule,
  detailedFeatureType,
  keyHighlights,
  header,
  accordionGroupType,
  accordionType,
  calloutType,
  callToActionType,
  collectionGroupType,
  collectionLinksType,
  collectionReferenceType,
  collectionRuleType,
  customProductOptionColorObjectType,
  customProductOptionColorType,
  customProductOptionSizeObjectType,
  customProductOptionSizeType,
  footerType,
  gridItemType,
  gridType,
  heroType,
  homeSection2,
  homeSection3,
  homeSection4,
  plans,
  bundles,
  whyBusinessChooseUs,
  faq,
  testimonial,
  businessAtFingertips,
  imageCallToActionType,
  imageFeaturesType,
  imageFeatureType,
  imageWithProductHotspotsType,
  instagramType,
  inventoryType,
  menuLinksType,
  menuType,
  notFoundPageType,
  optionType,
  placeholderStringType,
  priceRangeType,
  productFeaturesType,
  productHotspotsType,
  productReferenceType,
  productWithVariantType,
  proxyStringType,
  seoType,
  shopifyCollectionType,
  shopifyProductType,
  shopifyProductVariantType,
  spotType,
  menu,
  aboutIntroSection,
    aboutHowItStartedSection,
      aboutFeaturesSection,
      aboutDetailedFeaturesSection,
       aboutFoundersSection, 
       aboutResourceAuthorsSection,
       solutionsMailbox,
prefectvirtualbox,
whyChooseVirtualMailbox,
 // Careers Page Modules
  careerPromotion,
  whyWorkSection,
  aboutCompanySection,
  coreValuesSection,
  joinTeamSection,
  careersPageModule,
  faqCoverModule,
  faqWithCategory,
  faqPageModule,
  uspsForm1583Type,
uspsForm1583Guide,
uspsForm1583Content,
contactUsSection,
  // Affiliate Program Page Modules
  affiliateProgramSection,
  whyJoinSection,
  stepsSection,
  affiliatedProgramPageModule,

]

import {portableTextType} from './portableText/portableTextType'
import {portableTextSimpleType} from './portableText/portableTextSimpleType'

const blocks = [portableTextType, portableTextSimpleType]

import {collectionType} from './documents/collection'
import {colorThemeType} from './documents/colorTheme'
import {pageType} from './documents/page'
import {productType} from './documents/product'
import {productVariantType} from './documents/productVariant'
import {plansType} from './documents/plans'

const documents = [collectionType, colorThemeType, pageType, productType, productVariantType,plansType,wpPost,blockContent,news]

import {homeType} from './singletons/homeType'
import {settingsType} from './singletons/settingsType'


const singletons = [homeType, settingsType,solutions,]

export const schemaTypes = [...annotations, ...objects, ...singletons, ...blocks, ...documents,location]