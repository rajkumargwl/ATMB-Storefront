import { defineType, defineField } from "sanity";
import { TagIcon } from "@sanity/icons"; 

export const pricingModule = defineType({
  name: "pricingModule",
  title: "Pricing Module",
  type: "object",
  icon: TagIcon,
  fields: [
    defineField({
      name: "label",
      title: "Section Label",
      type: "string",
      description: "Small label above the heading (e.g., Simple, Transparent Pricing Plans)",
    }),
    defineField({
      name: "title",
      title: "Heading",
      type: "string",
      description: "Main section title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tabs",
      title: "Tabs",
      type: "array",
      of: [{ type: "string" }],
      description: "Tabs for switching (e.g., Individual Products, Bundles)",
    }),
    defineField({
      name: "billingOptions",
      title: "Billing Options",
      type: "array",
      of: [
        defineField({
          name: "billingOption",
          title: "Billing Option",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: "e.g., Monthly, Yearly",
            }),
            defineField({
              name: "discountText",
              title: "Discount Text",
              type: "string",
              description: "e.g., 20% Off",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "plans",
      title: "Pricing Plans",
      type: "array",
      of: [
        defineField({
          name: "plan",
          title: "Plan",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Plan Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "price",
              title: "Price",
              type: "string",
              description: "e.g., $19.99",
            }),
            defineField({
              name: "frequency",
              title: "Frequency",
              type: "string",
              description: "e.g., /month",
            }),
            defineField({
              name: "features",
              title: "Features",
              type: "array",
              of: [{ type: "string" }],
              description: "List of features for this plan",
            }),
            defineField({
              name: "ctaText",
              title: "Button Text",
              type: "string",
              initialValue: "Select Plan",
            }),
            defineField({
              name: "ctaUrl",
              title: "Button Link",
              type: "url",
            }),
            defineField({
              name: "highlight",
              title: "Highlight Badge",
              type: "string",
              description: "e.g., MOST POPULAR",
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "price",
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "label",
    },
  },
});
