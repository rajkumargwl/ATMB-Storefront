export const PRODUCT_VARIANT_FIELDS = `
  fragment ProductVariantFields on ProductVariant {
    availableForSale
    compareAtPrice {
      currencyCode
      amount
    }
    id
    image {
      altText
      height
      id
      url
      width
    }
    price {
      currencyCode
      amount
    }
    selectedOptions {
      name
      value
    }
    title
    sku
    unitPrice {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
  }
`;

export const PRODUCT_FIELDS = `
  fragment ProductFields on Product {
    handle
    id
    options {
      name
      values
    }
    title
    vendor
    description
  }
`;

// export const PRODUCT_QUERY = `#graphql
//   ${PRODUCT_FIELDS}
//   ${PRODUCT_VARIANT_FIELDS}

//   query product($country: CountryCode, $language: LanguageCode, $handle: String!, $selectedOptions: [SelectedOptionInput!]!)
//   @inContext(country: $country, language: $language) {
//     product(handle: $handle) {
//       ...ProductFields
//       media(first: 20) {
//         nodes {
//           ... on MediaImage {
//             id
//             mediaContentType
//             image {
//               id
//               url
//               altText
//               width
//               height
//             }
//           }
//           ... on Model3d {
//             id
//             mediaContentType
//             sources {
//               mimeType
//               url
//             }
//           }
//         }
//       }
//       selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
//         ...ProductVariantFields
//       }
//       variants(first: 1) {
//         nodes {
//           ...ProductVariantFields
//         }
//       }
//     }
//   }
// `;
// export const PRODUCT_QUERY = `#graphql
//   ${PRODUCT_FIELDS}
//   ${PRODUCT_VARIANT_FIELDS}

//   query product(
//     $country: CountryCode
//     $language: LanguageCode
//     $handle: String!
//     $selectedOptions: [SelectedOptionInput!]!
//   ) @inContext(country: $country, language: $language) {
//     product(handle: $handle) {
//       ...ProductFields
//       media(first: 20) {
//         nodes {
//           ... on MediaImage {
//             id
//             mediaContentType
//             image {
//               id
//               url
//               altText
//               width
//               height
//             }
//           }
//           ... on Model3d {
//             id
//             mediaContentType
//             sources {
//               mimeType
//               url
//             }
//           }
//         }
//       }
//       selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
//         ...ProductVariantFields
//       }
//       variants(first: 50) {
//         nodes {
//           ...ProductVariantFields
//         }
//       }
//     }
//   }
// `;

export const PRODUCT_QUERY = `#graphql
  ${PRODUCT_FIELDS}
  ${PRODUCT_VARIANT_FIELDS}

  query product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...ProductFields
      media(first: 20) {
        nodes {
          ... on MediaImage {
            id
            mediaContentType
            image {
              id
              url
              altText
              width
              height
            }
          }
          ... on Model3d {
            id
            mediaContentType
            sources {
              mimeType
              url
            }
          }
        }
      }
      selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
        ...ProductVariantFields
        metafields(identifiers: [
          {namespace: "custom", key: "plan_type"}
        ]) {
          key
          value
        }
      }
      variants(first: 50) {
        nodes {
          ...ProductVariantFields
          metafields(identifiers: [
            {namespace: "custom", key: "plan_type"}
          ]) {
            key
            value
          }
        }
      }
    }
  }
`;



export const PRODUCTS_AND_VARIANTS = `#graphql
  ${PRODUCT_FIELDS}
  ${PRODUCT_VARIANT_FIELDS}

  query products(
    $country: CountryCode
    $language: LanguageCode
    $ids: [ID!]!
    $variantIds: [ID!]!
  ) @inContext(country: $country, language: $language) {
    products: nodes(ids: $ids) {
      ... on Product {
        ...ProductFields
      }
    }
    productVariants: nodes(ids: $variantIds) {
      ... on ProductVariant {
        ...ProductVariantFields
      }
    }
  }
`;

export const PRODUCT_AND_VARIANT = `#graphql
  ${PRODUCT_FIELDS}
  ${PRODUCT_VARIANT_FIELDS}

  query product(
    $country: CountryCode
    $language: LanguageCode
    $id: ID!
    $variantId: ID!
  ) @inContext(country: $country, language: $language) {
    product: product(id: $id) {
      ...ProductFields
    }
    productVariant: node(id: $variantId) {
      ... on ProductVariant {
        ...ProductVariantFields
      }
    }
  }
`;

export const PRODUCTS_AND_COLLECTIONS = `#graphql
  ${PRODUCT_FIELDS}
  ${PRODUCT_VARIANT_FIELDS}

  query productsAndCollections(
    $country: CountryCode
    $language: LanguageCode
    $ids: [ID!]!
  ) @inContext(country: $country, language: $language) {
    productsAndCollections: nodes(ids: $ids) {
      ... on Product {
        ...ProductFields
        variants(first: 250) {
          nodes {
            ...ProductVariantFields
          }
        }
      }
      ... on Collection {
        id
        title
        description
        handle
      }
    }
  }
`;

export const VARIANTS_QUERY = `#graphql
  ${PRODUCT_VARIANT_FIELDS}

  query variants(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      variants(first: 250) {
        nodes {
          ...ProductVariantFields
        }
      }
    }
  }
`;

export const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  ${PRODUCT_FIELDS}
  ${PRODUCT_VARIANT_FIELDS}

  query productRecommendations(
    $country: CountryCode
    $language: LanguageCode
    $productId: ID!
  ) @inContext(country: $country, language: $language) {
    productRecommendations(productId: $productId) {
      ...ProductFields
      variants(first: 1) {
        nodes {
          ...ProductVariantFields
        }
      }
    }
  }
`;
export const ALL_PRODUCTS_QUERY =`#graphql
  query AllProducts($first: Int!) {
    products(first: $first) {
      nodes {
        id
        handle
        title
        description
        featuredImage {
          url
          altText
        }
        variants(first: 1) {
          nodes {
            id
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export const PRODUCT_METAFIELDS_QUERY = `#graphql
  ${PRODUCT_FIELDS}
  ${PRODUCT_VARIANT_FIELDS}

  query product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...ProductFields

      metafields(identifiers: [{ namespace: "custom", key: "bundle_items" }]) {
        value
        type
        references(first: 10) {
          edges {
            node {
              ... on Product {
                id
                title
                handle
                description
                featuredImage { url }
                variants(first: 50) {
                  nodes {
                    ...ProductVariantFields
                    metafields(identifiers: [{ namespace: "custom", key: "plan_type" }]) {
                      value
                      key
                      type
                    }
                  }
                }
              }
            }
          }
        }
      }

      media(first: 20) {
        nodes {
          ... on MediaImage {
            id
            mediaContentType
            image {
              id
              url
              altText
              width
              height
            }
          }
          ... on Model3d {
            id
            mediaContentType
            sources {
              mimeType
              url
            }
          }
        }
      }

      selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
        ...ProductVariantFields
        metafields(identifiers: [{ namespace: "custom", key: "plan_type" }]) {
          key
          value
        }
      }

      variants(first: 50) {
        nodes {
          ...ProductVariantFields
          metafields(identifiers: [{ namespace: "custom", key: "plan_type" }]) {
            key
            value
          }
        }
      }
    }
  }
`;

export const BUNDLE_PRODUCTS_QUERY = `#graphql
  query bundleProducts(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    products(first: 50) {
      nodes {
        id
        title
        handle
        description
        featuredImage { url }

        # Product-level metafield for bundle_feature
        metafields(identifiers: [{ namespace: "custom", key: "bundle_feature" }]) {
          key
          type
          value
        }

        variants(first: 50) {
          edges {
            node {
              id
              title
              priceV2 { amount currencyCode }
              compareAtPriceV2 { amount currencyCode } 
              
              # Variant-level metafield for bundle_items
              metafields(identifiers: [{ namespace: "custom", key: "bundle_items" }]) {
                key
                type
                value
                references(first: 20) {
                  edges {
                    node {
                      __typename
                      ... on ProductVariant {
                        id
                        title
                        sku
                        priceV2 { amount currencyCode }
                        selectedOptions { name value }
                        product {
                          id
                          title
                          handle
                          featuredImage { url }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;




