// app/queries/sanity/fragments/pages/uspsForm1583.ts
import groq from 'groq';
import { USPS_FORM_1583 } from '../modules/uspsform1583';
import { SEO } from '../seo';
 
export const USPS_FORM_1583_PAGE_QUERY = groq`
  *[_type == "page" && slug=='usps-form-1583']{
    _id,
    _type,
    title,
    slug,
    modules[] {
      _type,
      _key,
      _type == "uspsForm1583" => {
        ${USPS_FORM_1583}
      }
    },
    ${SEO}
  }
`;