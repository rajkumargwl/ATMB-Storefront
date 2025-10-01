import type {Image, PortableTextBlock} from '@sanity/types';

import type {SanityColorTheme} from '~/lib/theme';
import type {ProductWithNodes} from '~/types/shopify';

export interface SanityAssetImage extends Image {
  _type: 'image';
  altText?: string;
  blurDataURL: string;
  height: number;
  url: string;
  width: number;
}

export type SanityLayout = {
  seo: SanitySeo;
  menuLinks?: SanityMenuLink[];
  footer?: {
    links?: SanityLink[];
    text?: PortableTextBlock[];
  };
  notFoundPage?: SanityNotFoundPage;
};

export type SanityCollection = {
  _id: string;
  colorTheme: SanityColorTheme;
  gid: string;
  hero?: SanityHeroPage;
  slug?: string;
  title: string;
  vector?: string;
};

export type SanityCollectionPage = {
  _id: string;
  colorTheme: SanityColorTheme;
  hero?: SanityHeroCollection;
  modules: (SanityModuleImage | SanityModuleInstagram)[];
  seo: SanitySeo;
  slug?: string;
  sortOrder: string;
  title: string;
};

export type SanityCollectionGroup = {
  _key: string;
  _type: 'collectionGroup';
  collectionLinks?: SanityCollection[];
  collectionProducts?: SanityCollection;
  title: string;
};

export type SanityCustomProductOption =
  | SanityCustomProductOptionColor
  | SanityCustomProductOptionSize;

interface SanityCustomProductOptionBase {
  _key: string;
  title: string;
}
export interface SanityCustomProductOptionColor
  extends SanityCustomProductOptionBase {
  _type: 'customProductOption.color';
  colors: {
    hex: string;
    title: string;
  }[];
}

export interface SanityCustomProductOptionSize
  extends SanityCustomProductOptionBase {
  _type: 'customProductOption.size';
  sizes: {
    height: number;
    title: string;
    width: number;
  }[];
}

export type SanityHero = SanityHeroCollection | SanityHeroHome | SanityHeroPage;

export type SanityHeroCollection = {
  content?: SanityImageWithProductHotspots | SanityProductWithVariant;
  description?: string;
  title?: string;
  data?: ProductWithNodes[] | ProductWithNodes;
};

export type SanityHeroHome = {
  content?: SanityImageWithProductHotspots | SanityProductWithVariant;
  link?: SanityLink;
  title?: string;
  subheading?: string;
  data?: ProductWithNodes[] | ProductWithNodes;
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: SanityLink;
  card?: {
    title1?: string;
    subtitle1?: string;
    title2?: string;
    subtitle2?: string;
  };
};
export type SanityTrustedByBusiness = {
  _key?: string;
  _type: 'homeSection2';
  heading?: string;
  icons?: SanityAssetImage[];
  images?: SanityAssetImage[];
};
export type SanityWhoWeHelp = {
  _key?: string;
  _type: 'homeSection3';
  title?: string;
  subtitle1?: string;
  subtitle2?: string;
  tabs?: {
    _key: string;
    _type: 'tab';
    label: string;
    description?: string;
    keyNeeds?: string[];
    services?: {
      _key: string;
      _type: 'service';
      icon?: SanityAssetImage;
      title: string;
      description?: string;
    }[];
    image?: SanityAssetImage;
  }[];
};
export type SanityLocations = {
  _key?: string;
  _type: 'homeSection4';
  heading?: string;
  description?: string;
  searchPlaceholder?: string;
  title?: string;
};
export type SanityPlans = {
  _key?: string;
  _type: 'plans';
  heading?: string;
  description?: string;
  plans?: {
    icon?: {
      svgCode?: string;
      svgFile?: SanityAssetImage;
    };
    title: string;
    price: string;
    heading?: string;
    features?: string[];
    ctaText?: string;
    ctaUrl?: SanityLink;
    isMostPopular?: boolean;
  }[];
};
export type SanityBundles = {
  _key?: string;
  _type: 'bundles';
  eyebrow?: string;
  description?: string;
  plans?: {
    badgeText?: string;
    title: string;
    subtitle?: string;
    startingFrom?: string;
    oldPrice?: string;
    price: string;
    priceUnit?: string;
    services?: {
      name: string;
      description?: string;
      tier?: string;
    }[];
    features?: string[];
    ctaText?: string;
    ctaUrl?: SanityLink;
    isMostPopular?: boolean;
    points?: string[];
  }[];
};
export type SanityWhyBusinessesChooseUs = {
  _key?: string;
  _type: 'whyBusinessesChooseUs';
  heading?: string;
  description?: string;
  image?: SanityAssetImage;
  features?: {
    _key: string;
    _type: 'feature';
    title: string;
    description?: string;
  }[];
};
export type SanityTestimonial = {
  _key?: string;
  _type: 'testimonial';
  headline?: string;
  subheadline?: string;
  testimonials?: {
    _key: string;
    _type: 'text' | 'video';
    authorName: string;
    authorTitle: string;
    authorImage?: SanityAssetImage;
    rating?: number;
    starIcon?: {
      svgFile?: SanityAssetImage;
      svgCode?: string;
    };
    quote?: string;
    svgFile?: SanityAssetImage;
    svgCode?: string;
    videoUrl?: string;
    playIcon?: {
      playSvgFile?: SanityAssetImage;
      playSvgCode?: string;
    };
  }[];
};
export type SanityBusinessAtFingerips = {
  _key?: string;
  _type: 'testimonial';
  heading?: string;
  description?: string;
  phoneImage?: SanityAssetImage;
  personas?: {
    _key: string;
    _type: 'persona';
    authorImage?: SanityAssetImage;
    role: string;
    quote?: string;
  }[];
  features?: {
    _key: string;
    _type: 'feature';
    icon?: {
      iconFile?: SanityAssetImage;
      iconCode?: string;
    };
    title: string;
    description?: string;
  }[];
  appButtons?: {
    _key: string;
    _type: 'appButton';
    icon?: {
      iconFile?: SanityAssetImage;
      iconCode?: string;
      textColor?: string;
      bgColor?: string;
    };
    label: string;
    url?: SanityLink;
  }[];
  socialProof?: {
    text?: string;
    rating?: number;
    starIcon?: {
      svgFile?: SanityAssetImage;
      svgCode?: string;
    };
  };
};
export type SanityFAQ = {
  _key?: string;
  _type: 'faq';
  headline?: string;
  subheadline?: string;
  faqCategories?: {
    _key: string;
    _type: 'faqCategory';
    title: string;
    faqs?: {
      _key: string;
      _type: 'faqItem';
      question: string;
      answer: string;
    }[];
  }[];
};
export type SanityMarketPlaceIntro = {
  _key?: string;
  _type: 'faq';
  label?: string;
  heading: string;
  image?: { url?: string; alt?: string };
};
export type SANITY_MARKETPLACE_CATEGORIES = {
  _key?: string;
  _type: 'marketPlaceCategoriesSection';
  allIcon?: { url?: string; alt?: string };
  categories?: {
    title: string;
    icon?: { url?: string; alt?: string };
    image?: { url?: string; alt?: string };
    subcategories?: {
      name: string;
      description?: string;
      logo?: { url?: string; alt?: string };
      buttonText?: string;
      buttonLink?: { url?: string; alt?: string };
    }[];
  }[];
}
export type SanityHeroPage = {
  content?: SanityImageWithProductHotspots | SanityProductWithVariant;
  title?: string;
  subheading?: string;
  data?: ProductWithNodes[] | ProductWithNodes;
};

export type SanityHomePage = {
  hero?: SanityHeroHome;
  modules: (SanityModuleImage | SanityModuleInstagram | SanityTrustedByBusiness | SanityWhoWeHelp)[];
  seo: SanitySeo;
};

export type SanityImageWithProductHotspots = {
  _key?: string;
  _type: 'imageWithProductHotspots';
  image: SanityAssetImage;
  productHotspots: SanityProductHotspot[];
};

export type SanityLink = SanityLinkExternal | SanityLinkInternal;

export type SanityLinkExternal = {
  _key: string;
  _type: 'linkExternal';
  newWindow?: boolean;
  url: string;
  title: string;
};

export type SanityLinkInternal = {
  _key: string;
  _type: 'linkInternal';
  documentType: string;
  slug?: string;
  title: string;
};

export type SanityMenuLink =
  | SanityCollectionGroup
  | SanityLinkExternal
  | SanityLinkInternal;

export type SanityModule =
  | SanityModuleAccordion
  | SanityModuleCallout
  | SanityModuleCallToAction
  | SanityModuleCollection
  | SanityModuleGrid
  | SanityModuleImage
  | SanityModuleInstagram
  | SanityModuleProduct;

export type SanityModuleAccordion = {
  _key?: string;
  _type: 'module.accordion';
  groups: {
    _key: string;
    _type: 'group';
    body: PortableTextBlock[];
    title: string;
  }[];
};

export type SanityModuleCallout = {
  _key?: string;
  _type: 'module.callout';
  link: SanityLink;
  text: string;
};

export type SanityModuleCallToAction = {
  _key?: string;
  _type: 'module.callToAction';
  body?: string;
  content?: SanityAssetImage | SanityProductWithVariant;
  layout: 'left' | 'right';
  link: SanityLink;
  title: string;
};

export type SanityModuleCollection = {
  _key?: string;
  _type: 'module.collection';
  collection: SanityCollection;
  showBackground?: boolean;
};

export type SanityModuleImage =
  | SanityModuleImageCallToAction
  | SanityModuleImageCaption
  | SanityModuleImageProductHotspots
  | SanityModuleImageProductTags;

export type SanityModuleGrid = {
  _key?: string;
  _type: 'module.grid';
  items: {
    _key: string;
    _type: 'items';
    body: PortableTextBlock[];
    image: SanityAssetImage;
    title: string;
  }[];
};

export type SanityModuleImageBase = {
  _key?: string;
  _type: 'module.image';
  image: SanityAssetImage;
};

export interface SanityModuleImageCallToAction extends SanityModuleImageBase {
  _key?: string;
  callToAction?: {
    link: SanityLink;
    title?: string;
  };
  variant: 'callToAction';
}

export interface SanityModuleImageCaption extends SanityModuleImageBase {
  _key?: string;
  caption?: string;
  variant: 'caption';
}
export interface SanityModuleImageProductHotspots
  extends SanityModuleImageBase {
  _key?: string;
  productHotspots?: SanityProductHotspot[];
  variant: 'productHotspots';
}

export interface SanityModuleImageProductTags extends SanityModuleImageBase {
  _key?: string;
  productTags?: SanityProductWithVariant[];
  variant: 'productTags';
}

export type SanityModuleImages = {
  _key?: string;
  _type: 'module.images';
  fullWidth?: boolean;
  modules: SanityModuleImage[];
  verticalAlign?: 'bottom' | 'center' | 'top';
};

export type SanityModuleInstagram = {
  _key?: string;
  _type: 'module.instagram';
  url: string;
};

export type SanityModuleProduct = {
  _key?: string;
  _type: 'module.product';
  productWithVariant: SanityProductWithVariant;
};

export type SanityModuleProducts = {
  _key?: string;
  _type: 'module.products';
  layout?: 'card' | 'pill';
  modules: SanityModuleProduct[];
};

export type SanityNotFoundPage = {
  body?: string;
  collectionGid?: string;
  colorTheme?: SanityColorTheme;
  title: string;
};

export type SanityPage = {
  body: PortableTextBlock[];
  colorTheme?: SanityColorTheme;
  hero?: SanityHeroPage;
  seo: SanitySeo;
  title: string;
};

export type SanityProductHotspot = {
  _key?: string;
  product: SanityProductWithVariant;
  x: number;
  y: number;
};

export type SanityProductWithVariant = {
  _id: string;
  _key?: string;
  _type: 'productWithVariant';
  available: boolean;
  gid: string;
  slug?: string;
  variantGid: string;
};

export type SanityProductPage = {
  _id: string;
  available: boolean;
  body: PortableTextBlock[];
  colorTheme?: SanityColorTheme;
  customProductOptions?: SanityCustomProductOption[];
  gid: string;
  slug?: string;
  seo: SanitySeo;
};

export type SanitySeo = {
  description?: string;
  image?: SanityAssetImage;
  title: string;
};
