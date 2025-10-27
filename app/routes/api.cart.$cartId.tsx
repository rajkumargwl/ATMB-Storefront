export async function loader({ params, context }: any) {
  const cartId = atob(params.cartId);
  // console.log("Decoded cartId:", cartId);
    // const { cartId } = params;
    const response = await context.storefront.query(CART_QUERY, {
      variables: { id: cartId },
    });
    return Response.json(response.cart);
  }
  
  const CART_QUERY = `#graphql
   query CartQuery($id: ID!) {
  cart(id: $id) {
    id
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              product {
                handle
                title
                featuredImage {
                  url
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
  