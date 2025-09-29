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
import Home from '~/components/heroes/Home';
import FeaturesModule from '~/components/modules/FeaturesModule';
import AboutHowItStartedSection from '~/components/modules/AboutHowItStartedSection';
import AboutFeaturesSection from '~/components/modules/AboutFeaturesSection';
import AboutResourceAuthorsSection from '~/components/modules/AboutResourceAuthorsSection';
import AboutIntroSection from '~/components/modules/AboutIntroSection';
import AboutDetailedFeaturesSection from '~/components/modules/AboutDetailedFeaturesSection';
import AboutFoundersSection from '~/components/modules/AboutFoundersSection';
import Pricingmodule from '~/components/modules/Pricingmodule';
import HowItWorks from '~/components/modules/Howitworks'; // Add this import
import WhyChooseUs from '~/components/modules/WhyChooseUs'; // Add this import
import CustomerReviews from '~/components/modules/CustomerReviews'; // Add this import
import CareerPromotionSection from '~/components/modules/CareerPromotionSection';
import WhyWorkSection from '~/components/modules/WhyWorkSection';
import AboutCompanySection from '~/components/modules/AboutCompanySection';
import CoreValuesSection from '~/components/modules/CoreValuesSection';
import JoinTeamSection from '~/components/modules/JoinTeamSection';
import FAQSection from './FAQSection';
import FAQWithCategory from './FAQWithCategory';
import ContactUsSection from '~/components/modules/ContactUsSection';
type Props = {
  imageAspectClassName?: string;
  module: SanityModule;
  homeSearchResults?: any;
  searchQuery?: string | null;
};

export default function Module({imageAspectClassName, module, homeSearchResults, searchQuery}: Props) {

    console.log("homeSearchResults in module", homeSearchResults);
  switch (module._type) {
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
    // Existing cases
    // -----------------------
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
    case 'plans':
      return <Plans data={module} />;
    case 'bundles':
      return <Bundles data={module} />;
    case 'whyBusinessChooseUs':
      return <WhyBusinessChooseUs data={module} />;
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
    default:
      return null;
  }
}
