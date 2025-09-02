import groq from 'groq';
import { IMAGE } from '../image';

export const BUSINESS_AT_FINGERTIPS = groq`
    heading,
    description,
    phoneImage{
      ${IMAGE}
    },
    personas[] {
      authorImage {
        ${IMAGE}
      },    
      role,
      quote
    },
    features[] {
      icon {
        iconFile,
        iconCode
      },
      title,
      description
    },
    appButtons[] {
      icon{
        iconFile{
            asset->{
            _id,
            url
            }
        },
        iconCode,
        textColor,
        bgColor
        },
      label,
        url
    },
    socialProof{
        text, 
        rating,
         starIcon{
      svgFile{
        asset->{
          _id,
          url
        }
      },
      svgCode
    },    
  },

`;
