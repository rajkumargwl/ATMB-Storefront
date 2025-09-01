import CalloutModule from '~/components/modules/Callout';
import CallToActionModule from '~/components/modules/CallToAction';
import CollectionModule from '~/components/modules/Collection';
import ImageModule from '~/components/modules/Image';
import InstagramModule from '~/components/modules/Instagram';
import ProductModule from '~/components/modules/Product';
import type {SanityModule} from '~/lib/sanity';
import HomeHero from '~/components/heroes/Home';
import HomeSection2 from '~/components/modules/HomeSection2';
import HomeSection3 from '~/components/modules/HomeSection3';

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
      return <HomeSection2 hero={module} />;
    case "homeSection3":
      return <HomeSection3 hero={module} />;
    case 'module.product':
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
