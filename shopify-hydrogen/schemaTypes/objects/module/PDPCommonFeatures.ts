// objects/module/PDPDCommonFeatures.ts
import {defineType, defineField} from "sanity";

export const PDPCommonFeaturesType = defineType({
  name: "PDPCommonFeatures",
  title: "PDP Common Features",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Main Title",
      type: "string",
      initialValue: "Common Features",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      initialValue: "Extra Features Available For All Plans",
    }),
    defineField({
      name: "featureSections",
      title: "Feature Sections",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "image",
              options: {hotspot: true},
            }),
            defineField({
              name: "sectionTitle",
              title: "Section Title",
              type: "string",
            }),
            defineField({
              name: "features",
              title: "Features List",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({
                      name: "featureItem",
                      title: "Feature Item",
                      type: "string",
                    }),
                  ],
                  preview: {
                    select: {title: "featureItem"},
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {
              title: "sectionTitle",
              media: "icon",
            },
          },
        },
      ],
    }),
  ],
});
