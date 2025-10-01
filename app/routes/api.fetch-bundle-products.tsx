import type { ActionFunction } from "@remix-run/node";
import { PRODUCT_METAFIELDS_QUERY } from '~/queries/shopify/product';
import type { Product } from '@shopify/hydrogen/storefront-api-types';

export const action: ActionFunction = async ({ context, request }) => {
  try {
    const { handle } = (await request.json()) as { handle: string };
    if (!handle) return { error: "Product handle is required" };

    // Fetch product via Hydrogen Storefront API
    const { product } = await context.storefront.query<{ product: Product }>(
      PRODUCT_METAFIELDS_QUERY,
      {
        variables: { handle, selectedOptions: [] },
      }
    );

    if (!product) return { error: `No product found with handle "${handle}"` };

// Grab the bundle_items metafield
const bundleMetafield = product.metafields?.[0]; // because GraphQL returns an array

const associatedProducts =
  bundleMetafield?.references?.edges.map(({ node }: any) => ({
    productId: node.id,
    title: node.title,
    handle: node.handle,
    description: node.description,
    image: node.featuredImage?.url,
    variants: node.variants.nodes.map((v: any) => ({
      id: v.id,
      title: v.title,
      price: v.price.amount,
      currency: v.price.currencyCode,
      availableForSale: v.availableForSale,
      planType: v.metafields?.find((m: any) => m.key === 'plan_type')?.value,
    })),
  })) || [];


    return {
      bundle: {
        id: product.id,
        title: product.title,
        description: product.description,
        associatedProducts,
      },
    };
  } catch (err: any) {
    console.error("Fetch failed:", err);
    return { error: "Fetch failed", details: err.message };
  }
};
