import { defineType, defineField } from "sanity";
import { SparkleIcon } from "@sanity/icons";

export const pdpwhyChooseAnytimePhoneSection = defineType({
  name: "pdpwhyChooseAnytimePhoneSection",
  title: "PDP - Why Choose Anytime Phone Section",
  type: "object",
  icon: SparkleIcon,

  fields: [
    // Section heading
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Example: 'Why Choose Anytime Phone'",
    }),

    // Subtitle / Description
    defineField({
      name: "subtitle",
      title: "Section Subtitle",
      type: "text",
      rows: 2,
      description:
        "Short supporting text, e.g. 'Simple, reliable, and built to make your business communication effortless.'",
    }),

    // Features list (with icon, title, and description)
    defineField({
      name: "features",
      title: "Feature List",
      type: "array",
      of: [
        defineField({
          name: "feature",
          title: "Feature",
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "image",
              options: { hotspot: true },
              description: "Upload SVG/PNG icon for this feature.",
            }),
            defineField({
              name: "heading",
              title: "Feature Title",
              type: "string",
              validation: (Rule) => Rule.required(),
              description: "Example: 'Professional Image'",
            }),
            defineField({
              name: "description",
              title: "Feature Description",
              type: "text",
              rows: 2,
              description:
                "Example: 'Present your business with a dedicated phone number and custom greetings.'",
            }),
          ],
          preview: {
            select: {
              title: "heading",
              subtitle: "description",
              media: "icon",
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),

    // Right-side image
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
      description:
        "Main image displayed on the right side (e.g., person using a phone).",
    }),


    
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      media: "mainImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Why Choose Anytime Phone Section",
        subtitle,
        media,
      };
    },
  },
});
