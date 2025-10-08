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
  savedPercentage?: number | null;
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
  variantTitle?: string | null;
  associatedItems: BundleItem[];
  bundleFeature: string[] | null;
  savedPercentage?: number | null;
};
//parse bundle product
export function parseBundleProduct(product: any): BundleProduct {
  const associatedItemsMap: Record<string, Set<string>> = {}; // productTitle -> set of variantTitles
  const associatedItems: BundleItem[] = [];

  for (const vEdge of product.variants?.edges ?? []) {
    const variant = vEdge.node;
    if (!Array.isArray(variant.metafields)) continue;

    for (const mf of variant.metafields) {
      if (!mf) continue;

      if (mf.key === "bundle_items" && mf.references?.edges?.length > 0) {
        for (const { node } of mf.references.edges) {
          const productTitle = node.product?.title ?? "Unknown Product";
          const variantTitle = node.title ?? "";

          // Initialize the set for this product if needed
          if (!associatedItemsMap[productTitle]) {
            associatedItemsMap[productTitle] = new Set();
          }

          // Only add if variantTitle not already present
          if (!associatedItemsMap[productTitle].has(variantTitle)) {
            associatedItemsMap[productTitle].add(variantTitle);

            associatedItems.push({
              variantId: node.id,
              variantTitle: variantTitle,
              sku: node.sku ?? null,
              price: node.priceV2?.amount ?? null,
              compareAtPrice: node.compareAtPriceV2?.amount ?? null,
              currency: node.priceV2?.currencyCode ?? null,
              selectedOptions: node.selectedOptions ?? [],
              productId: node.product?.id ?? null,
              productTitle: productTitle,
              productHandle: node.product?.handle ?? null,
              productImage: node.product?.featuredImage?.url ?? null,
            });
          }
        }
      }
    }
  }

  // Get monthly/yearly prices
  const monthlyVariant = product.variants?.edges?.find(
    (vEdge: any) => vEdge.node.title.toLowerCase() === "monthly"
  )?.node;
  const yearlyVariant = product.variants?.edges?.find(
    (vEdge: any) => vEdge.node.title.toLowerCase() === "yearly"
  )?.node;

  const monthlyPrice = monthlyVariant?.priceV2?.amount ?? null;
  const yearlyPrice = yearlyVariant?.priceV2?.amount ?? null;
  const monthlyCompareAtPrice = monthlyVariant?.compareAtPriceV2?.amount ?? null;
  const yearlyCompareAtPrice = yearlyVariant?.compareAtPriceV2?.amount ?? null;
 const bundleFeatureMf = product.metafields?.find((mf: any) => mf.key === "bundle_feature");
 let bundleFeature: string[] = [];

 if (bundleFeatureMf?.value) {
   try {
     const parsed = JSON.parse(bundleFeatureMf.value);
     if (Array.isArray(parsed)) bundleFeature = parsed;
   } catch {
     bundleFeature = [bundleFeatureMf.value];
   }
 }
  return {
    id: product.id,
    title: product.title,
    handle: product.handle,
    description: product.description,
    image: product.featuredImage?.url ?? null,
    price: monthlyPrice,
    compareAtPrice: monthlyCompareAtPrice,
    yearlyPrice,
    yearlyCompareAtPrice,
    monthlyVariantId: monthlyVariant?.id ?? null,
    yearlyVariantId: yearlyVariant?.id ?? null,
    currency: monthlyVariant?.priceV2?.currencyCode ?? null,
    associatedItems,
    bundleFeature
  };
}
export async function fetchBundleProducts(context: any, billing: "monthly" | "yearly" = "monthly"): Promise<BundleProduct[]> {
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

    return bundleProducts.map((product) => parseBundleProduct(product, billing));
  } catch (err: any) {
    console.error("Failed to fetch bundle products:", err);
    throw new Error("Failed to fetch bundle products");
  }
}
