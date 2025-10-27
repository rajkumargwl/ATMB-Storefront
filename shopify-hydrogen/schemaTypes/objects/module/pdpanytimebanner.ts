import { defineType, defineField } from "sanity";
import { MobileDeviceIcon } from "@sanity/icons";

export const pdpanytimePhonebannerSection = defineType({
  name: "pdpanytimePhonebannerSection",
  title: "PDP - Anytime Phone banner Section",
  type: "object",
  icon: MobileDeviceIcon,
  fields: [
    // Title and description
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Main heading, e.g. 'Anytime Phone'",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description:
        "Short description about the Anytime Phone service or feature.",
    }),

    // Features (icons + text)
    defineField({
      name: "features",
      title: "Key Features",
      type: "array",
      description: "Add features like '1 Included Phone Number', etc.",
      of: [
        defineField({
          name: "feature",
          title: "Feature",
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Feature Icon",
              type: "image",
              options: { hotspot: true },
              description: "Upload an SVG or PNG icon for this feature.",
            }),
            defineField({
              name: "text",
              title: "Feature Text",
              type: "string",
              description: "Example: '1 Included Phone Number'",
            }),
          ],
          preview: {
            select: {
              title: "text",
              media: "icon",
            },
          },
        }),
      ],
    }),

    // Testimonial section
    defineField({
      name: "testimonial",
      title: "Testimonial",
      type: "object",
      fields: [
        defineField({
          name: "quote",
          title: "Quote",
          type: "text",
          rows: 3,
          description:
            "Testimonial text, e.g. 'I travel for work most of the year…'",
        }),
        defineField({
          name: "authorName",
          title: "Author Name",
          type: "string",
        }),
        defineField({
          name: "authorTitle",
          title: "Author Title/Role",
          type: "string",
          description: "Example: 'E-Commerce Entrepreneur'",
        }),
        defineField({
          name: "authorImage",
          title: "Author Image",
          type: "image",
          options: { hotspot: true },
        }),
      ],
      preview: {
        select: {
          title: "authorName",
          subtitle: "authorTitle",
          media: "authorImage",
        },
      },
    }),

    // Main image (right side visual)
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
      description:
        "Main visual image on the right side (e.g., phone and laptop).",
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "description",
      media: "mainImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "PDP - Anytime Phone banner Section",
        subtitle,
        media,
      };
    },
  },
});
