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
import HeroBanner from '~/components/modules/HeroBanner';
import FeaturesModule from '~/components/modules/FeaturesModule';
import Pricingmodule from '~/components/modules/Pricingmodule';
import HowItWorks from '~/components/modules/Howitworks'; // Add this import
import WhyChooseUs from '~/components/modules/WhyChooseUs'; // Add this import
import CustomerReviews from '~/components/modules/CustomerReviews'; // Add this import
type Props = {
  imageAspectClassName?: string;
  module: SanityModule;
};

export default function Module({imageAspectClassName, module}: Props) {
  switch (module._type) {
    case 'heroBanner':       // <-- add this
      return <HeroBanner data={module} />;
    case 'featuresModule':   // ✅ new case for features
      return <FeaturesModule {...module} />;
       case 'pricingModule':       // <-- add this
      return <Pricingmodule data={module} />;
    case 'howItWorks': // Add this case
      return <HowItWorks data={module} />;
    case 'whyChooseAnytimePhones': // Add this case
      return <WhyChooseUs data={module} />;
    case 'review': // Add this case
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
    case "hero":
      return <HomeHero hero={module} />;
    case "homeSection2":
      return <TrustedByBusiness data={module} />;
    case "homeSection3":
      return <WhoWeHelp data={module} />;
    case "homeSection4":
        return <Locations data={module} />;
    case "plans":
      return <Plans data={module} />;
    case "bundles":
      return <Bundles data={module} />;
    case "whyBusinessChooseUs":
      return <WhyBusinessChooseUs data={module} />;
    case "testimonial":
      return <Testimonial data={module} />;
    case "businessAtFingertips":
      return <BusinessAtFingertips data={module} />;
    case "faq":
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
