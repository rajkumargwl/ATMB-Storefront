import { defineType, defineField } from "sanity";
import { StarIcon } from "@sanity/icons"; // You can change the icon

export const featuresSection = defineType({
  name: "featuresSection",
  title: "Features Section",
  type: "document",
  icon: StarIcon,
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Section Subtitle",
      type: "string",
    }),
    defineField({
      name: "featureCategories",
      title: "Feature Categories",
      type: "array",
      of: [
        defineField({
          name: "featureCategory",
          title: "Feature Category",
          type: "object",
          fields: [
            defineField({
              name: "categoryTitle",
              title: "Category Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "image",
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: "points",
              title: "Points / Features List",
              type: "array",
              of: [
                defineField({
                  name: "point",
                  title: "Point",
                  type: "string",
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
