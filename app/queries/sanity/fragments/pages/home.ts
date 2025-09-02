import groq from 'groq';

<<<<<<< HEAD
import { HERO_HOME } from '../heroes/home';
import { MODULES } from '../modules';
import { SEO } from '../seo';

export const HOME_PAGE = groq`
  ...,
  hero {
    ${HERO_HOME}
  },
  welcome {
    heading,
    text,
    image {
      asset -> {
        url
      }
    },
    doctorName,
    doctorTitle
  },
  slider {
  slides[] {
    buttonLink,
    buttonText,
    subtitle,
    title,
    image {
      asset->{
        url
      }
    }
  }
},
  doctors[] {
    name,
    specialty,
    phone,
    email,
    photo {
      asset -> {
        url
      }
    }
  },
  latestNews[] {
    date,
    title,
    description,
    author {
      name,
      role,
      photo {
        asset -> {
          url
        }
      }
    },
    image {
      asset -> {
        url
      }
    }
  },
  appointment {
    heading,
    subheading,
    image {
      asset -> {
        url
      }
    },
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
  map {
    heading,
    subheading,
    embedUrl,
    address
  },
  modules[] {
    ${MODULES}
  },
  subtitle,
=======
import {HERO_HOME} from '../heroes/home';
import {MODULES} from '../modules';
import {SEO} from '../seo';

export const HOME_PAGE = groq`
  hero {
    ${HERO_HOME}
  },
  modules[] {
    ${MODULES}
  },
>>>>>>> 9d8d655 (Pushing code of header and footer 02/09)
  ${SEO}
`;
