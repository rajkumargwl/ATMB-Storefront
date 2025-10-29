// objects/module/PDPDetailedFeature.ts
import {defineType, defineField} from "sanity";

export const PDPDetailedFeatureType = defineType({
  name: "PDPDetailedFeature",
  title: "PDP Detailed Feature",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      initialValue: "PDP Detailed Feature",
    }),
    defineField({
      name: "subtitle",
      title: "Section Subtitle",
      type: "string",
      initialValue: "Live Receptionist 50 Plan Features",
    }),
    defineField({
      name: "features",
      title: "Top Features",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "image", // ✅ updated from string → image
              options: { hotspot: true },
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "label",
              media: "icon",
            },
          },
        },
      ],
    }),
  ],
});
