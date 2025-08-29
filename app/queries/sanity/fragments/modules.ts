import groq from 'groq';

<<<<<<< HEAD
export const MODULES = groq`
  _key,
  _type,

  // --------- existing module.* types ---------
  (_type == "module.accordion") => {
    title,
    items[]{ title, content }
  },

  (_type == "module.callout") => {
    title,
    description,
    ctaText,
    ctaLink
  },

  (_type == 'module.callToAction') => {
    title,
    description,
    buttonText,
    buttonLink
  },

  (_type == "module.collection") => {
    title,
    description,
    products[]{ _id, title, slug, price, image{ asset->{url} } }
  },

  (_type == "module.image") => {
    title,
    description,
    image{ asset->{url} },
    ctaText,
    ctaLink
  },

  (_type == "module.instagram") => {
    title,
    feedUrl
  },

  (_type == "module.product") => {
    product->{ _id, title, slug, price, image{ asset->{url} } }
  },

  (_type == "module.grid") => {
    title,
    items[]{ title, description, image{ asset->{url} }, ctaText, ctaLink }
  },

  // --------- your object modules (no module. prefix) ---------
  (_type == "slider") => {
    slides[]{
      image{ asset->{url} },
      title,
      subtitle,
      buttonText,
      buttonLink
    }
  },

  (_type == "welcomeSection") => {
    heading,
    text,
    image{ asset->{url} },
    doctorName,
    doctorTitle
  },

  (_type == "doctorSection") => {
    "doctors": doctors[]{
      name,
      specialty,
      photo{ asset->{url} },
      phone,
      email
    }
  },

  (_type == "latestNewsSection") => {
    heading,
    "latestNews": newsItems[] {
      date,
      title,
      description,
      image { asset->{url} },
      author {
        name,
        role,
        photo { asset->{url} }
      }
    }
  },

  (_type == "appointmentSection") => {
    heading,
    subheading,
    image{ asset->{url} },
    nameLabel,
    namePlaceholder,
    emailLabel,
    emailPlaceholder,
    dateLabel,
    datePlaceholder,
    departmentLabel,
    departmentPlaceholder,
    phoneLabel,
    phonePlaceholder,
    messageLabel,
    messagePlaceholder,
    buttonText
  },

  (_type == "mapSection") => {
    heading,
    subheading,
    embedUrl,
    address
  },

  (_type == "heroSection") => {
    subtitle,
    title,
    buttonText,
    buttonLink,
    backgroundImage{ asset->{url} }
  }
=======
import {MODULE_ACCORDION} from './modules/accordion';
import {MODULE_CALLOUT} from './modules/callout';
import {MODULE_CALL_TO_ACTION} from './modules/callToAction';
import {MODULE_COLLECTION} from './modules/collection';
import {MODULE_IMAGE} from './modules/image';
import {MODULE_INSTAGRAM} from './modules/instagram';
import {MODULE_PRODUCT} from './modules/product';

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
>>>>>>> 3097ce2e79576a54ef13bd1a5712ec165470d926
`;
