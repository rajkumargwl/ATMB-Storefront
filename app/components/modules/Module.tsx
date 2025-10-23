import CalloutModule from '~/components/modules/Callout';
import CallToActionModule from '~/components/modules/CallToAction';
import CollectionModule from '~/components/modules/Collection';
import ImageModule from '~/components/modules/Image';
import InstagramModule from '~/components/modules/Instagram';
import ProductModule from '~/components/modules/Product';
import type {SanityModule} from '~/lib/sanity';
import HomeHero from '~/components/heroes/Home';
import TrustedByBusiness from '~/components/modules/TrustedByBusiness';
import WhoWeHelp from '~/components/modules/WhoWeHelp';
import Locations from '~/components/modules/Locations';
import Plans from '~/components/modules/Plans';
import Bundles from '~/components/modules/Bundles';
import WhyBusinessChooseUs from '~/components/modules/WhyBusinessChooseUs';
import Testimonial from '~/components/modules/Testimonial';
import BusinessAtFingertips from '~/components/modules/BusinessAtFingertips';
import FAQ from '~/components/modules/FAQ';
import FeaturesModule from '~/components/modules/FeaturesModule';
import AboutHowItStartedSection from '~/components/modules/AboutHowItStartedSection';
import AboutFeaturesSection from '~/components/modules/AboutFeaturesSection';
import AboutResourceAuthorsSection from '~/components/modules/AboutResourceAuthorsSection';
import AboutIntroSection from '~/components/modules/AboutIntroSection';
import AboutDetailedFeaturesSection from '~/components/modules/AboutDetailedFeaturesSection';
import AboutFoundersSection from '~/components/modules/AboutFoundersSection';
import Pricingmodule from '~/components/modules/Pricingmodule';
import HowItWorks from '~/components/modules/Howitworks';
import WhyChooseUs from '~/components/modules/WhyChooseUs';
import CustomerReviews from '~/components/modules/CustomerReviews';
import CareerPromotionSection from '~/components/modules/CareerPromotionSection';
import WhyWorkSection from '~/components/modules/WhyWorkSection';
import AboutCompanySection from '~/components/modules/AboutCompanySection';
import CoreValuesSection from '~/components/modules/CoreValuesSection';
import JoinTeamSection from '~/components/modules/JoinTeamSection';
import FAQSection from './FAQSection';
import FAQWithCategory from './FAQWithCategory';
import ContactUsSection from '~/components/modules/ContactUsSection';
import AffiliateProgramSection from '~/components/modules/AffiliateProgramSection';
import WhyJoinSection from '~/components/modules/WhyJoinSection';
import StepsSection from '~/components/modules/StepsSection';
import { RenterReferralHero } from '~/components/modules/renter-referralhero';
import { RenterReferralWork } from '~/components/modules/renter-referralwork';
import { RenterReferralNoCatch } from '~/components/modules/renter-referralno-catch';
import { RenterReferralEditor } from '~/components/modules/renter-referraleditor';
import SolutionHero from '~/components/modules/SolutionHero';
import SolutionVirtualMailbox from '~/components/modules/SolutionVirtualMailbox';
import SolutionRealLife from '~/components/modules/SolutionRealLife';
import SolutionMailboxFeatures from '~/components/modules/SolutionMailboxFeatures';
import SolutionMailboxBenefitFaq from '~/components/modules/SolutionMailboxBenefitFaq';
import SolutionMailboxLocationHowItWorks from '~/components/modules/SolutionMailboxLocationHowItWorks';
import MarketplaceIntro from '~/components/modules/MarketplaceIntro';
import MarketplaceCategories from '~/components/modules/MarketplaceCategories';

import { HowItWorksHero } from './howitworkshero';
import { HowItWorksVirtualbox } from './howitworks-virtualbox';
import { HowItWorks2 } from './howitworks-2';
import { BuiltForYou } from './builtforyou';
import { HowItWork3Steps } from './howitwork3steps';
import { HowItWorksFaq } from './howitworksfaq';
import BusinessAcceleratorSection from '~/components/modules/BusinessAcceleratorSection';
import BusinessTransformationSection from '~/components/modules/BusinessTransformationSection';
import BusinessStrategySection from '~/components/modules/BusinessStrategySection';
import BuisnessHowitWork from '~/components/modules/BuisnessHowitWork';
import BusinessProfitSection from '~/components/modules/BusinessProfitSection';
import BusinessGrowth from '~/components/modules/BusinessGrowth';
import BusinessSupport from '~/components/modules/BusinessSupport';
import BusinessBanner from '~/components/modules/BusinessBanner';
import WebinarsTopicsSection from '~/components/modules/WebinarsTopicsSection';

import SmartBusiness from '~/components/modules/SmartBusiness';




import { OperatorAdvantage } from './operatorAdvantage';

import { OperatorMailCenter } from './operatormailcenter';
import { OperatorNowYourCustomer } from './operatornowyourcustomer';
import { OperatorVideo } from './operatorvideo';


import { OperatorYourCompetitors } from './operatoryourcompetitors';

import NoOfficeSection from '~/components/modules/NoOfficeSection';
import  AnytimeFeaturesModule from '~/components/modules/AnytimeFeaturesModule';
import  PDPIntroSection from '~/components/modules/PDPIntroSection';
import PDPDetailedFeatureSection from '~/components/modules/PDPDetailedFeatureSection';
import PDPHighlightsSection from '~/components/modules/PDPHighlightsSection';
import PDPWhyChooseSection from '~/components/modules/PDPWhyChooseSection';
import PDPHowItWorks from '~/components/modules/PDPHowItWorksSection';
import PDPTestimonials from '~/components/modules/PDPTestimonialsSection';
// import PDPCommonFeaturesSection from '~/components/modules/PDPCommonFeaturesSection';

 import DownloadMailboxRenterApps from './DownloadMailboxRenterApps';
 import SmallBusinessChallanges from './SmallBusinessChallanges';
 import SmallBusinessOwnerAppDownloadSection from './SmallBusinessOwnerAppDownloadSection';
 import SmallBusinessOwnerSection from './SmallBusinessOwnerSection';
 import BusinessBenefitsSection from './BusinessBenefitsSection';
 import BusinessTrustedSection from './BusinessTrustedSection';

 import BusinessIndustryRecognitionSection from './BusinessIndustryRecognitionSection';
 import BusinessClientSuccessStoriesSection from './BusinessClientSuccessStoriesSection';

 import FaqWithComment from './FaqWithComment';
 import JoinCtaBannerSection from './JoinCtaBannerSection';
import PdpDetailedFeaturesSection from './PdpDetailedFeaturesSection';
import PdpMailCenterHighlightsSection from './PdpMailCenterHighlightsSection';
import VirtualMailboxLocationCard from './VirtualMailboxLocationCard';
import PdpFeatureGridSection from './PdpFeatureGridSection';
import PdpAnytimePhoneSection from './PdpAnytimePhoneSection';
import PdpCommonFeaturesSection from './PdpCommonFeaturesSection';
import PDPWhyChooseAnytimePhone from './PdpWhyChooseAnytimePhone';
import PdpWhyChooseAnytimePhone from './PdpWhyChooseAnytimePhone';
import { InviteFriend } from './InviteFriend';
import { RefferalBanner } from './RefferalBanner';
import { RefferalStep } from './RefferalStep';

type Props = {
  module: SanityModule | ProductWithNodes;
  homeSearchResults?: any;
  searchQuery?: string | null;
  bundles?: any[];
  pageType?: 'operator' | 'default' ; // 争 ADDED pageType PROP
};

export default function Module({imageAspectClassName, module, homeSearchResults, searchQuery, bundles, pageType = 'default'}: Props) { // 争 Set default pageType
 

  // Helper boolean for conditional rendering
  const isOperatorPage = pageType === 'operator';

  switch (module._type) {
     case 'anytimemobile':
  return (
    <>
      {module.modules?.map((sub: any) => (
        <Module key={sub._key} module={sub} />
      ))}
    </>
  );
  case 'downloadMailboxRenterAppsSection':
  return <DownloadMailboxRenterApps {...module} />;
  case 'smallBusinessOwnerAppDownloadSection':
  return <SmallBusinessOwnerAppDownloadSection {...module} />;



 case 'pdpdetailedFeaturesSection':
  return <PdpDetailedFeaturesSection {...module} />;
 case 'pdpmailCenterHighlightsSection':
  return <PdpMailCenterHighlightsSection {...module} />;
   case 'pdpvirtualMailboxLocation':
  return <VirtualMailboxLocationCard {...module} />;

   
   case 'pdpFeatureGridSection':
  return <PdpFeatureGridSection data={module} />;
   case 'pdpanytimePhoneSection':
  return <PdpAnytimePhoneSection {...module} />;

    case 'pdpCommonFeaturesSection':
  return <PdpCommonFeaturesSection data={module} />;
   case 'pdpwhyChooseAnytimePhoneSection':
  return <PdpWhyChooseAnytimePhone data={module} />;



    case 'anytimePhone':
  return (
    <>
      {module.modules?.map((sub: any) => (
        <Module key={sub._key} module={sub} />
      ))}
    </>
  );
  case 'noOfficeSection':
  return <NoOfficeSection {...module} />;
  case 'featuresSection':
  return <AnytimeFeaturesModule {...module} />;
 
   
   case 'smallBusinessOwnerPage':
  return (
    <>
      {module.modules?.map((sub: any) => (
        <Module key={sub._key} module={sub} />
      ))}
    </>
  );

   case 'smallBusinessOwnerSection':
  return <SmallBusinessOwnerSection {...module} />;
  
  case 'smallBusinessChallengesSection':
  return <SmallBusinessChallanges {...module} />;

case 'smartBusinessSection':
  return <SmartBusiness {...module} />;
 
  case 'businessBenefitsSection':
  return <BusinessBenefitsSection {...module} />;

  case 'businessTrustedSection':
  return <BusinessTrustedSection {...module} />;

   case 'businessIndustryRecognitionSection':
  return <BusinessIndustryRecognitionSection {...module} />;
    
    case 'clientSuccessStoriesSection':
    return <BusinessClientSuccessStoriesSection {...module} />;

  case "faqWithComment":
    return <FaqWithComment data={module} />;

 case "joinCtaBannerSection":
  return <JoinCtaBannerSection {...module} />;

  case 'whyBusinessChooseUs':
    return <WhyBusinessChooseUs data={module} />;
    // 櫨 OPERATOR SIGNUP CONTAINER
    case 'operatorsignup':
      return (
        <>
          {module.modules?.map((sub: any) => (
            <Module key={sub._key} module={sub} pageType='operator' /> // 争 PASSING 'operator' down to children
          ))}
        </>
      );
 
    
    // affilateProgramSection -> OperatorGrowYour / AffiliateProgramSection
   case 'affiliateProgramSection':
      return <AffiliateProgramSection {...module} />;
 
    // whyJoinSection -> OperatorWhyJoin / WhyJoinSection
      case 'whyJoinSection':
      return <WhyJoinSection {...module} />;
 
    // howitworks3steps -> OperatorNowYourCustomer / HowItWork3Steps
    case 'howitworks3steps':
      return isOperatorPage
        ? <OperatorNowYourCustomer module={module} />
        : <HowItWork3Steps data={module} />;
    
    // This is the FIRST (and correct) instance of operatorSignupVideo
    case 'operatorSignupVideo':
      return <OperatorVideo module={module} />;
 
    // businessAtFingertips -> OperatorYourBusiness / BusinessAtFingertips
     case 'businessAtFingertips':
      return <BusinessAtFingertips data={module} />;
 
  case 'whyBusinessChooseUs':
     
        return <OperatorAdvantage module={module} />;
 
      // Renter Referral Program Logic (module._key === '21b68d61ef37' was a key check)
      if (module._key === '21b68d61ef37') {
        return <RenterReferralWork data={module} />;
      }
      // Default Fallback
      return <WhyBusinessChooseUs data={module} />;
        
    // testimonial -> OperatorThousand / Testimonial
    case 'testimonial':
      return  <Testimonial data={module} />;
 
  
 
    case 'operatorYourCompetitors':
      return <OperatorYourCompetitors module={module} />;
      
    // joinTeamSection -> OperatorMailCenter / JoinTeamSection (using joinTeamSection as placeholder for CTA)
    case 'joinTeamSection':
      return isOperatorPage
        ? <OperatorMailCenter module={module} />
        : <JoinTeamSection {...module} />;
 
 
  
   case 'acceleratorPageModule':
  return (
    <>
      {module.modules?.map((sub: any) => (
        <Module key={sub._key} module={sub} pageType={pageType} />
      ))}
    </>
  );

  
    case 'businessAcceleratorSection':
    return <BusinessAcceleratorSection data={module} />;


   case 'businessTransformationSection':
  return <BusinessTransformationSection {...module} />;
   
  case 'businessStrategySection':
  return <BusinessStrategySection {...module} />;

  case 'buisnesshowitwork':
  return <BuisnessHowitWork {...module} />;
 
  case 'businessProfitSection':
  return <BusinessProfitSection {...module} />;
 
  case 'businessGrowthToolkitSection':
  return <BusinessGrowth data={module} />;

  case 'businessSupportSection':
  return <BusinessSupport data={module} />;
  
  case 'businessAcceleratorBannerSection':
  return <BusinessBanner title={module.title} cta={module.cta} image={module.image} />;
   
  case 'webinarsTopicsSection':
  return <WebinarsTopicsSection data={module} />;


    case 'howitworks':
      return (
        <>
          {module.modules?.map((sub: any) => (
            <Module key={sub._key} module={sub} pageType={pageType} />
          ))}
        </>
      );
 
    case 'howitworksVirtualbox':
      return <HowItWorksVirtualbox data={module} />;
 
    case 'uspsForm1583Guide':
      return <HowItWorksHero data={module} />;
 
    case 'howitworks2':
      return <HowItWorks2 data={module} />;
 
    case 'builtForHowYouWorkToday':
      return <BuiltForYou data={module} />;
 
    
    case 'howitworksfaq':
      return <HowItWorksFaq data={module} />;
    
    // -----------------------
    // Renter Referral Program
    // -----------------------
    case 'renterreferralprogram':
      return (
        <>
          {module.modules?.map((sub: any) => (
            <Module key={sub._key} module={sub} pageType={pageType} />
          ))}
        </>
      );

   case 'inviteAFriendSection':
  return <InviteFriend data={module} />

     case 'referralStep':
  return <RefferalStep data={module} />;


     case 'renterEditor':
      return <RenterReferralEditor data={module}/>

    case 'renterReferralBannerModule':
  return <RefferalBanner data={module} />
    
    case 'pdpPageModule':
      return (
        <>
       
          {module.modules?.map((sub: any) => (
            <Module key={sub._key} module={sub} pageType={pageType} />
          ))}
        </>
      );
   
    // case 'PDPCommonFeatures':
    //   return <PDPCommonFeaturesSection {...module} />;    
    

   
    case 'aboutUsModule':
      return (
        <>
          {module.modules?.map((sub: any) => (
            <Module key={sub._key} module={sub} pageType={pageType} />
          ))}
        </>
      );
     
    case 'careersPageModule':
      return (
        <>
          {module.modules?.map((sub: any) => (
            <Module key={sub._key} module={sub} pageType={pageType} />
          ))}
        </>
      );
      
    case 'careerPromotionSection':
      return <CareerPromotionSection {...module} />;

    case 'whyWorkSection':
      return <WhyWorkSection {...module} />;
  
    case 'contactUsSection':
      return <ContactUsSection data={module} />;
    
    case 'aboutCompanySection':
      return <AboutCompanySection {...module} />;
    
    case 'coreValuesSection':
      return <CoreValuesSection {...module} />;
    
    case 'aboutIntroSection':
     return <AboutIntroSection {...module} />;
    case 'aboutHowItStartedSection':
      return <AboutHowItStartedSection {...module} />;

    case 'aboutFeaturesSection':
      return <AboutFeaturesSection {...module} />;

    case 'aboutDetailedFeaturesSection':
      return <AboutDetailedFeaturesSection {...module} />;

    case 'aboutFoundersSection':
      return <AboutFoundersSection {...module} />;

    case 'aboutResourceAuthorsSection':
      return <AboutResourceAuthorsSection {...module} />;
   
    case 'affiliatedProgramPageModule':
      return (
        <>
          {module.modules?.map((sub: any) => (
            <Module key={sub._key} module={sub} pageType={pageType} />
          ))}
        </>
      );

   
    case 'stepsSection':
      return <StepsSection {...module} />;

    case 'faqPageModule':
      return (
        <>
          {module.modules?.map((sub: any) => (
            <Module key={sub._key} module={sub} pageType={pageType} />
          ))}
        </>
      );
    
    case 'faqCoverModule':
      return <FAQSection {...module} />;
    
    case 'faqWithCategory':
      return <FAQWithCategory {...module} />;



     // -----------------------
  // Solution Page Module
  // -----------------------
  case 'solutionPageModule':
    return (
      <>
        {module.modules?.map((sub: any) => (
          <Module key={sub._key} module={sub} pageType={pageType} />
        ))}
      </>
    );

  case 'solutionHeroModule':
    return <SolutionHero data={module} />;
  case 'solutionVirtualMailboxModule':
  return <SolutionVirtualMailbox data={module} />;

  case 'solutionRealLife':
  return <SolutionRealLife data={module} />;

  case 'solutionMailboxFeaturesModule':
  return <SolutionMailboxFeatures data={module} />;
case 'solutionMailboxBenefitFaqModule':
  return <SolutionMailboxBenefitFaq data={module} />;

  case 'solutionMailboxLocationHowItWorksModule':
  return <SolutionMailboxLocationHowItWorks data={module} />;

    case 'heroType':
      return <Home data={module} />;
    
    case 'featuresModule':
      return <FeaturesModule {...module} />;
    
    case 'pricingModule':
      return <Pricingmodule data={module} />;
    
    case 'howItWorks':
      return <HowItWorks data={module} />;
    
    case 'whyChooseAnytimePhones':
      return <WhyChooseUs data={module} />;
    
    case 'review':
      return <CustomerReviews data={module} />;
    
    case 'module.callout':
      return <CalloutModule module={module} />;
    
    case 'module.callToAction':
      return <CallToActionModule module={module} />;
    
    case 'module.collection':
      return <CollectionModule module={module} />;
    
    case 'module.image':
      return <ImageModule module={module} />;
    
    case 'module.instagram':
      return <InstagramModule module={module} />;
    
    case 'hero':
      return <HomeHero hero={module} homeSearchResults={homeSearchResults} searchQuery={searchQuery ?? ''} />;
    
    case 'homeSection2':
      return <TrustedByBusiness data={module} />;
    
    case 'homeSection3':
      return <WhoWeHelp data={module} />;
    
    case 'homeSection4':
      return <Locations data={module} />;
    
    // case 'plans':
    //   return <Plans data={module} bundles={bundles}/>;
    
    //  case 'bundles':
    //  return <Bundles data={module} />;
    
    // 'testimonial' is handled above for operator conditional rendering.

    // NOTE: 'businessAtFingertips' is handled above for operator conditional rendering.
    // The previous duplicate case is removed.
    
    case 'faq':
      return <FAQ data={module} />;
    
    case 'module.product':
      return (
        <ProductModule
          imageAspectClassName={imageAspectClassName}
          module={module}
        />
      );

    case 'marketPlaceModule':
      return (
        <>
          {module.modules?.map((sub: any) => (
            <Module key={sub._key} module={sub} pageType={pageType} />
          ))}
        </>
      );
    case 'marketPlaceIntroSection':
      return <MarketplaceIntro data={module} />;  

    case 'marketPlaceCategoriesSection':
      return <MarketplaceCategories data={module} />;  


    default:
      console.warn(`No component found for module type: ${module._type}`);
     
      return null;
  }
}