import { defineType, defineField } from "sanity";

export const smartBusinessSection = defineType({
  name: "smartBusinessSection",
  title: "Smart Business Section",
  type: "object",

  fields: [
    // ✅ Main Title
    defineField({
      name: "title",
      title: "Main Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "e.g., 'A Smarter Way to Run Your Business'",
    }),

    // ✅ Subtitle / Description
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 2,
      description:
        "e.g., 'Stop worrying about missed mail, unanswered calls, or credibility issues. Anytime Mailbox handles it all.'",
    }),

    // ✅ Left Feature Title
    defineField({
      name: "featureTitle",
      title: "Left Column Title",
      type: "string",
      description:
        "e.g., 'With Anytime Mailbox Virtual Mailbox & Phone, you can:'",
    }),

    // ✅ Flattened Feature List
    defineField({
      name: "features",
      title: "Feature List",
      type: "array",
      of: [{ type: "string" }],
      description: "List of benefits shown with check icons (plain text).",
    }),

    // ✅ Flattened Bottom Benefits Row
    defineField({
      name: "benefitIcons",
      title: "Benefit Icons",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Upload icons (SVG/PNG) for each benefit.",
    }),

    defineField({
      name: "benefitAlts",
      title: "Benefit Icon Alt Text",
      type: "array",
      of: [{ type: "string" }],
      description: "Alt text for each benefit icon (same order).",
    }),

    defineField({
      name: "benefitLabels",
      title: "Benefit Labels",
      type: "array",
      of: [{ type: "string" }],
      description: "Label for each benefit (same order as icons).",
    }),

    // ✅ Flattened Testimonials
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [
        defineField({
          name: "testimonialCard",
          title: "Testimonial Card",
          type: "object",
          fields: [
            defineField({
              name: "quote",
              title: "Quote",
              type: "text",
              rows: 2,
              description:
                "e.g., 'It’s frustrating when I have to physically visit the office just to sign for a package or deposit a check...'",
            }),
            defineField({
              name: "author",
              title: "Author Name",
              type: "string",
              description: "e.g., 'Bessie Cooper'",
            }),
            defineField({
              name: "designation",
              title: "Author Designation",
              type: "string",
              description: "e.g., 'E-Commerce Entrepreneur'",
            }),
            defineField({
              name: "authorImage",
              title: "Author Image",
              type: "image",
              options: { hotspot: true },
              description: "Optional author image or avatar.",
            }),
          ],
          preview: {
            select: {
              title: "author",
              subtitle: "designation",
              media: "authorImage",
            },
          },
        }),
      ],
      description: "Customer testimonials shown on the right side.",
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Smart Business Section",
        subtitle: subtitle || "Feature + Testimonial layout",
      };
    },
  },
});
