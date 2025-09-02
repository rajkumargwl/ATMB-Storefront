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


type Props = {
  imageAspectClassName?: string;
  module: SanityModule;
};

export default function Module({imageAspectClassName, module}: Props) {
  switch (module._type) {
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
