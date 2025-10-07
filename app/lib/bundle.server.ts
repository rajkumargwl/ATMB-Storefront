import type { Product } from "@shopify/hydrogen/storefront-api-types";
import { BUNDLE_PRODUCTS_QUERY } from "~/queries/shopify/product";

export type BundleItem = {
  variantId: string;
  variantTitle: string;
  sku: string | null;
  price: string | null;
  compareAtPrice: string | null;
  currency: string | null;
  selectedOptions: { name: string; value: string }[];
  productId: string | null;
  productTitle: string | null;
  productHandle: string | null;
  productImage: string | null;
};

export type BundleProduct = {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: string | null;
  price: string | null;
  compareAtPrice: string | null;
  currency: string | null;
  associatedItems: BundleItem[];
  bundleFeature: string | null;
};

export function parseBundleProduct(product: any): BundleProduct {
  const associatedItems: BundleItem[] = [];

  // Parse variant-level bundle_items
  for (const vEdge of product.variants?.edges ?? []) {
    const variant = vEdge.node;
    if (!Array.isArray(variant.metafields)) continue;

    for (const mf of variant.metafields) {
      if (!mf) continue;

      if (mf.key === "bundle_items") {
        // If references exist
        if (mf.references?.edges?.length > 0) {
          associatedItems.push(
            ...mf.references.edges.map(({ node }: any) => ({
              variantId: node.id,
              variantTitle: node.title,
              sku: node.sku ?? null,
              price: node.priceV2?.amount ?? null,
              compareAtPrice: node.compareAtPriceV2?.amount ?? null,
              currency: node.priceV2?.currencyCode ?? null,
              selectedOptions: node.selectedOptions ?? [],
              productId: node.product?.id ?? null,
              productTitle: node.product?.title ?? null,
              productHandle: node.product?.handle ?? null,
              productImage: node.product?.featuredImage?.url ?? null,
            }))
          );
        } else if (mf.value) {
          // If JSON string stored
          try {
            const items = JSON.parse(mf.value);
            if (Array.isArray(items)) {
              for (const i of items) {
                associatedItems.push({
                  variantId: i.variantId || null,
                  variantTitle: i.variantTitle || "",
                  sku: i.sku || null,
                  price: i.price || null,
                  compareAtPrice: i.compareAtPrice || null,
                  currency: i.currency || null,
                  selectedOptions: i.selectedOptions || [],
                  productId: i.productId || null,
                  productTitle: i.productTitle || null,
                  productHandle: i.productHandle || null,
                  productImage: i.productImage || null,
                });
              }
            }
          } catch {}
        }
      }
    }
  }

  // Parse product-level bundle_feature
  const bundleFeatureMf = product.metafields?.find((mf: any) => mf.key === "bundle_feature");
  let bundleFeature: string[] = [];

  if (bundleFeatureMf?.value) {
    try {
      const parsed = JSON.parse(bundleFeatureMf.value);
      if (Array.isArray(parsed)) bundleFeature = parsed;
    } catch {
      // fallback: treat as single string if JSON.parse fails
      bundleFeature = [bundleFeatureMf.value];
    }
  }

  const firstVariant = product.variants?.edges?.[0]?.node;

  return {
    id: product.id,
    title: product.title,
    handle: product.handle,
    description: product.description,
    image: product.featuredImage?.url ?? null,
    price: firstVariant?.priceV2?.amount ?? null,
    compareAtPrice: firstVariant?.compareAtPriceV2?.amount ?? null,
    currency: firstVariant?.priceV2?.currencyCode ?? null,
    associatedItems,
    bundleFeature,
  };
}


export async function fetchBundleProducts(context: any): Promise<BundleProduct[]> {
  try {
    const data = await context.storefront.query(BUNDLE_PRODUCTS_QUERY, {
      variables: { country: "IN", language: "EN" },
    });

    const products = data?.products?.nodes ?? [];

    const bundleProducts = products.filter(product =>
      product.variants?.edges.some(variant =>
        Array.isArray(variant.node.metafields) &&
        variant.node.metafields.some(mf => mf && (mf.references?.edges?.length > 0 || !!mf.value))
      )
    );

    return bundleProducts.map(parseBundleProduct);
  } catch (err: any) {
    console.error("Failed to fetch bundle products:", err);
    throw new Error("Failed to fetch bundle products");
  }
}
