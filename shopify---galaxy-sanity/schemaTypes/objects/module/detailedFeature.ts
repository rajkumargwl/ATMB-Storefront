import {defineType, defineField} from "sanity";

export const detailedFeatureType = defineType({
  name: "detailedFeature",
  title: "Detailed Feature",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      initialValue: "Detailed Feature",
    }),
    defineField({
      name: "features",
      title: "Top Features",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "icon", title: "Icon", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "value", title: "Value", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "storageRules",
      title: "Storage Rules",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "type", title: "Mail/Box Type", type: "string" }),
            defineField({ name: "freeStorage", title: "Free Storage (days)", type: "string" }),
            defineField({ name: "extraCost", title: "Extra Cost", type: "string" }),
          ],
        },
      ],
    }),
  ],
});
