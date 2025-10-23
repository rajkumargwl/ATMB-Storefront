import groq from "groq";
import { SMALL_BUSINESS_OWNER_MODULE } from "../modules/smallBusinessOwner";
import { SEO } from "../seo";

export const SMALL_BUSINESS_OWNER_PAGE_QUERY = groq`
  *[_type == "page" && slug == "small-business-owner"] | order(_updatedAt desc)[0]{
    title,
    modules[] {
      ${SMALL_BUSINESS_OWNER_MODULE}
    },
    ${SEO}
  }
`;
