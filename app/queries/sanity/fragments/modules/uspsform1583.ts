// app/queries/sanity/fragments/modules/uspsform1583.ts
import groq from 'groq';
 
export const USPS_FORM_1583 = groq`
  subModules[] {
    _type,
    _key,
    (_type == "uspsForm1583Guide") => {
      title,
      description,
      image {
        asset-> {
          _id,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        },
        alt
      }
    },
    (_type == "uspsForm1583Content") => {
      contentBlocks[] {
        mainContent,
        leftImage {
          asset-> { _id, url, metadata { dimensions { width, height } } },
          alt
        },
        rightImage {
          asset-> { _id, url, metadata { dimensions { width, height } } },
          alt
        },
        textField,
        textField1,
        image2 {
          asset-> { _id, url, metadata { dimensions { width, height } } },
          alt
        },
        textField2,
        textField4,
        image3 {
          asset-> { _id, url, metadata { dimensions { width, height } } },
          alt
        },
        textField5,
        extraContent,
        image4 {
          asset-> { _id, url, metadata { dimensions { width, height } } },
          alt
        },
        textField6,
        extraContent2
      }
    }
  }
`;