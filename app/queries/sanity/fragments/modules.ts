import groq from 'groq';

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
`;
