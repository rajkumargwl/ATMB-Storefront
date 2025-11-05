import type { Product } from "@shopify/hydrogen/storefront-api-types";
import { ALL_PRODUCTS_INDIVIDUAL_QUERY } from "~/queries/shopify/product";

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
  billingProductId?: string | null;
  planType?: string | null;
};

export function parsePricingProduct(product: any): PricingProduct {
  const variants = product?.variants?.nodes ?? [];
  const plans: Record<string, any> = {};

  variants.forEach((variant: any) => {
    const planOption = variant.selectedOptions?.find(
      (o: any) => o.name?.toLowerCase() === "plans"
    )?.value;

    // Always check for "Plan Type" (monthly/yearly)
    const planType = variant.selectedOptions?.find(
      (o: any) => o.name?.toLowerCase() === "plan type"
    )?.value?.toLowerCase();


    if (!planType) return;

    const metafields = Array.isArray(variant.metafields)
      ? variant.metafields.filter(Boolean)
      : [];

    const featureField = metafields.find((f: any) => f?.key === "features");
    let features: string[] = [];

    if (featureField?.value) {
      try {
        const parsed = JSON.parse(featureField.value);
        if (Array.isArray(parsed)) {
          features = parsed;
        } else {
          features = featureField.value
            .split(/[\n,•,;]+/)
            .map((f: string) => f.trim())
            .filter(Boolean);
        }
      } catch {
        features = featureField.value
          .split(/[\n,•,;]+/)
          .map((f: string) => f.trim())
          .filter(Boolean);
      }
    }

    //Handle both product types
    const planKey = planOption || product.title;

    if (!plans[planKey]) plans[planKey] = {};

    plans[planKey][planType] = {
      id: variant.id,
      price: variant.price?.amount ?? "0.00",
      currency: variant.price?.currencyCode ?? "USD",
      features,
    };
  });

  const firstPlanKey = Object.keys(plans)[0];
  const firstPlan = plans[firstPlanKey] || {};

  // Prefer monthly features if available
  const selectedFeatures =
    firstPlan.monthly?.features ??
    firstPlan.yearly?.features ??
    [];

  // Determine redirect URL based on product title
  let redirectUrl = "#";

  switch (product.title.toLowerCase()) {
    case "virtual mailbox":
      redirectUrl = "/sublocations";
      break;
    case "business accelerator":
      redirectUrl = "/pdp/business-accelerator";
      break;
    case "virtual phone number":
      redirectUrl = "/pdp/virtual-phone-number";
      break;
    default:
      redirectUrl = `/checkout/${(firstPlan.monthly?.id ?? firstPlan.yearly?.id)?.split("/").pop()}`;
  }

  return {
    id: product.id,
    title: product.title,
    description: product.description || "",
    monthlyPrice: firstPlan.monthly?.price ?? null,
    yearlyPrice: firstPlan.yearly?.price ?? null,
    monthlyVariantId: firstPlan.monthly?.id ?? null,
    yearlyVariantId: firstPlan.yearly?.id ?? null,
    currency: firstPlan.monthly?.currency ?? "USD",
    features: selectedFeatures,
    ctaText: "Buy Now",
    ctaUrl: redirectUrl,
  };
}

export async function fetchIndividualProducts(context: any) {
  try {
    const data = await context.storefront.query(ALL_PRODUCTS_INDIVIDUAL_QUERY, {
      variables: { first: 10 },
    });

    const products = data?.products?.nodes ?? [];

    const allowedTitles = [
      "Virtual Mailbox",
      "Virtual Phone Number",
      "Business Accelerator",
    ];

    const filtered = products
      .filter((p: any) => allowedTitles.includes(p.title))
      .map((p: any) => parsePricingProduct(p))
      .filter((p: any) => p.monthlyPrice); 

    return filtered;
  } catch (err) {
    console.error("Failed to fetch individual products:", err);
    return [];
  }
}

