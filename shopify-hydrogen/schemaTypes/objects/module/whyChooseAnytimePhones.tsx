// ./schemas/modules/whyChooseAnytimePhones.ts
import { defineType, defineField } from "sanity";
import { StarIcon } from "@sanity/icons"; // 👈 You can pick another icon if you prefer

export const whyChooseAnytimePhones = defineType({
  name: "whyChooseAnytimePhones",
  title: "Why Choose Anytime Phones",
  type: "object",
  icon: StarIcon,
  fields: [
    defineField({
      name: "badge",
      title: "Badge Text",
      type: "string",
      initialValue: "Why Choose Anytime Phones",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      initialValue:
        "Simple, reliable, and built to make your business communication effortless.",
    }),
    defineField({
      name: "image",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [
        defineField({
          name: "feature",
          title: "Feature",
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Feature Icon",
              type: "image",
              options: { hotspot: true },
            },
            {
              name: "title",
              title: "Feature Title",
              type: "string",
            },
            {
              name: "description",
              title: "Feature Description",
              type: "text",
              rows: 3,
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "heading",
      subtitle: "badge",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Why Choose Anytime Phones",
        subtitle: subtitle || "Custom features module",
        media,
      };
    },
  },
});
