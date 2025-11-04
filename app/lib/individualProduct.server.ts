import type { Product } from "@shopify/hydrogen/storefront-api-types";
import { ALL_PRODUCTS_QUERY } from "~/queries/shopify/product";

export type PricingProduct = {
  id: string;
  title: string;
  description: string;
  monthlyPrice?: string | null;
  yearlyPrice?: string | null;
  monthlyVariantId?: string | null;
  yearlyVariantId?: string | null;
  currency?: string | null;
  features?: string[] | null;
  ctaText?: string;
  ctaUrl?: string;
};

// Parse an individual product from Shopify
export function parsePricingProduct(product: any): PricingProduct {
  const monthlyVariant = product.variants?.edges?.find(
    (v: any) => v.node.title.toLowerCase() === "monthly"
  )?.node;
  const yearlyVariant = product.variants?.edges?.find(
    (v: any) => v.node.title.toLowerCase() === "yearly"
  )?.node;

  // Optional metafield with features stored as JSON or comma-separated
  const featuresMf = product.metafields?.find(
    (mf: any) => mf.key === "plan_features"
  );
  let features: string[] = [];

  if (featuresMf?.value) {
    try {
      const parsed = JSON.parse(featuresMf.value);
      if (Array.isArray(parsed)) features = parsed;
    } catch {
      features = featuresMf.value.split(",").map((f: string) => f.trim());
    }
  }

  return {
    id: product.id,
    title: product.title,
    description: product.description || "",
    monthlyPrice: monthlyVariant?.priceV2?.amount ?? null,
    yearlyPrice: yearlyVariant?.priceV2?.amount ?? null,
    monthlyVariantId: monthlyVariant?.id ?? null,
    yearlyVariantId: yearlyVariant?.id ?? null,
    currency: monthlyVariant?.priceV2?.currencyCode ?? "USD",
    features,
    ctaText: "Buy Now",
    ctaUrl: `/checkout/${monthlyVariant?.id?.split("/").pop()}`,
  };
}

export async function fetchIndividualProducts(context: any) {
  try {
    const data = await context.storefront.query(ALL_PRODUCTS_QUERY, {
      variables: { first: 4 },
    });

    const products = data?.products?.nodes ?? [];
    //console.log("Fetched products:", products.length,products);
    // Filter by a naming convention or tag, if needed
    // const pricingProducts = products.filter((p: any) =>
    //   p.title.toLowerCase().includes("plan")
    // );

    //return pricingProducts.map((p: any) => parsePricingProduct(p));
    return products.map((p: any) => parsePricingProduct(p));
  } catch (err) {
    console.error("Failed to fetch pricing products:", err);
    return [];
  }
}
