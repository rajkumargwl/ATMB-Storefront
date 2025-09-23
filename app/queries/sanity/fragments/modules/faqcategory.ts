import groq from 'groq';

export const FAQ_MODULES = groq`
   
    _type,
     _key,
  modules[] {
  
    _type,
     _key,

    // FAQ Cover Module
    (_type == "faqCoverModule") => {
     
      label,
      title,
      image {
        "url": asset->url
      }
    },

    // FAQ Module (with Categories)
    (_type == "faqWithCategory") => {
       _type,
     _key,
      categories[] {
        title,
        faqs[] {
          question,
          answer
        }
      }
    }
  }
`;
