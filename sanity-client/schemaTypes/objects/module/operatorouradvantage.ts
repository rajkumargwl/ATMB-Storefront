import { defineType, defineField } from "sanity";

export const operatorOurAdvantage = defineType({
  name: "operatorOurAdvantage",
  title: "Operator – Our Advantage Section",
  type: "object",

  fields: [
    defineField({
      name: "heading",
      title: "Main Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Main section heading, e.g. 'Our Advantage'.",
    }),

    defineField({
      name: "features",
      title: "Feature List",
      type: "array",
      description: "List of feature items, each with an icon, title, and description.",
      of: [
        defineField({
          name: "feature",
          title: "Feature",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Feature Title",
              type: "string",
              validation: (Rule) => Rule.required(),
              description: "Title for the feature, e.g. 'More Revenue'.",
            }),
            defineField({
              name: "description",
              title: "Feature Description",
              type: "text",
              rows: 3,
              description:
                "Short description of the feature. Appears below the title.",
            }),
            defineField({
              name: "icon",
              title: "Feature Icon",
              type: "object",
              fields: [
                defineField({
                  name: "tooltipTitle",
                  title: "Tooltip Title",
                  type: "string",
                  description:
                    "Title shown when hovering over the icon (optional).",
                }),
                defineField({
                  name: "upload",
                  title: "Upload Icon",
                  type: "image",
                  options: { hotspot: true },
                  description: "Upload the icon image (SVG, PNG, etc.).",
                }),
              ],
              preview: {
                select: {
                  title: "tooltipTitle",
                  media: "upload",
                },
              },
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
              media: "icon.upload",
            },
          },
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "heading",
      subtitle: "features[0].title",
      media: "features[0].icon.upload",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Operator – Our Advantage Section",
        subtitle: subtitle
          ? `Includes feature: ${subtitle}`
          : "No features added yet",
        media,
      };
    },
  },
});
