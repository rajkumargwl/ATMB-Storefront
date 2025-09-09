import { defineType, defineField } from "sanity";
import { StarIcon } from "@sanity/icons";

export const featuresModule = defineType({
  name: "featuresModule",
  title: "Features Module",
  type: "object",
  icon: StarIcon,
  fields: [
    defineField({
      name: "label",
      title: "Section Label",
      type: "string",
      description: "Small label above the heading (e.g., Key Features)",
    }),
    defineField({
      name: "title",
      title: "Heading",
      type: "string",
      description: "Main title (e.g., Powerful tools to keep your business connected…)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [
        defineField({
          name: "featureItem",
          title: "Feature",
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "image",
              options: { hotspot: true },
              description: "Upload or select an icon for the feature",
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
              media: "icon",
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
