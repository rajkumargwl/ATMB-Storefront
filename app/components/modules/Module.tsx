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
import  SolutionHero  from '~/components/modules/SolutionHero';
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

type Props = {
  imageAspectClassName?: string;
  module: SanityModule;
  homeSearchResults?: any;
  searchQuery?: string | null;
};

export default function Module({imageAspectClassName, module, homeSearchResults, searchQuery}: Props) {

   console.log('Module received:', module._type, module);
  switch (module._type) {
   
     
    // Add this case to your switch statement
   case 'acceleratorPageModule':
  return (
    <>
      {module.modules?.map((sub: any) => (
        <Module key={sub._key} module={sub} />
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
            <Module key={sub._key} module={sub} />
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
 
    case 'howitworks3steps':
      return <HowItWork3Steps data={module} />;
    // -----------------------
    // Renter Referral Program
    // -----------------------
    case 'renterreferralprogram':
      return (
        <>
          {module.modules?.map((sub: any) => (
            <Module key={sub._key} module={sub} />
          ))}
        </>
      );

    // Renter specific modules
    case 'aboutIntroSection':
      // Check if this is within a renter referral program context
      // You can check the parent module or use the _key to distinguish
      if (module._key === '8d29bbc6753d' || module._key === '2dab207f50c3') {
        // For the first aboutIntroSection (hero)
        if (module._key === '8d29bbc6753d') {
          return <RenterReferralHero data={module} />;
        }
        // For the second aboutIntroSection (no-catch)
        if (module._key === '2dab207f50c3') {
          return <RenterReferralNoCatch data={module} />;
        }
      }
      // Fallback to regular AboutIntroSection for other contexts
      return <AboutIntroSection {...module} />;

    case 'whyBusinessChooseUs':
      // Check if this is within a renter referral program context
      if (module._key === '21b68d61ef37') {
        return <RenterReferralWork data={module} />;
      }
      // Fallback to regular WhyBusinessChooseUs for other contexts
      return <WhyBusinessChooseUs data={module} />;

    case 'renterEditor':
      return <RenterReferralEditor data={module} />;

    // -----------------------
    // About Us nested sections
    // -----------------------
    case 'aboutUsModule':
      return (
        <>
          {module.modules?.map((sub: any) => (
            <Module key={sub._key} module={sub} />
          ))}
        </>
      );

    case 'careersPageModule':
      return (
        <>
          {module.modules?.map((sub: any) => (
            <Module key={sub._key} module={sub} />
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
    
    case 'joinTeamSection':
      return <JoinTeamSection {...module} />;

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
            <Module key={sub._key} module={sub} />
          ))}
        </>
      );

    case 'affiliateProgramSection':
      return <AffiliateProgramSection {...module} />;

    case 'whyJoinSection':
      return <WhyJoinSection {...module} />;

    case 'stepsSection':
      return <StepsSection {...module} />;

    case 'faqPageModule':
      return (
        <>
          {module.modules?.map((sub: any) => (
            <Module key={sub._key} module={sub} />
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
          <Module key={sub._key} module={sub} />
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
      return <Home data={module}  />;
    
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
    //   return <Plans data={module} />;
    
    case 'bundles':
      return <Bundles data={module} />;
    
    case 'testimonial':
      return <Testimonial data={module} />;
    
    case 'businessAtFingertips':
      return <BusinessAtFingertips data={module} />;
    
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
            <Module key={sub._key} module={sub} />
          ))}
        </>
      );
    case 'marketPlaceIntroSection':
      return <MarketplaceIntro data={module} />;  

    case 'marketPlaceCategoriesSection':
      return <MarketplaceCategories data={module} />;  

    
    // default:
    //   console.warn(`No component found for module type: ${module._type}`);
    //   return null;
  }
}