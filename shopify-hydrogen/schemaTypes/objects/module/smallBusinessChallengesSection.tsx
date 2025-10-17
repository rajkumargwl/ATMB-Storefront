import { defineType, defineField } from "sanity";
import { WarningOutlineIcon } from "@sanity/icons";

export const smallBusinessChallengesSection = defineType({
  name: "smallBusinessChallengesSection",
  title: "Small Business Challenges Section",
  type: "object",
  icon: WarningOutlineIcon,

  fields: [
    // ✅ Section Heading
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Main heading, e.g., 'Challenges Every Small Business Owner Faces'",
    }),

    // ✅ Subtitle
    defineField({
      name: "subtitle",
      title: "Section Subtitle",
      type: "text",
      rows: 2,
      description:
        "Short paragraph explaining the section, e.g., 'Running a business is tough. Don’t let mail, communication, or growth resources slow you down.'",
    }),

    // ✅ Challenge Cards Array (flattened)
    defineField({
      name: "challenges",
      title: "Challenges Cards",
      type: "array",
      of: [
        defineField({
          name: "challenge",
          title: "Challenge Card",
          type: "object",
          fields: [
            // ✅ Icon (supports SVG upload)
            defineField({
              name: "icon",
              title: "Card Icon",
              type: "image",
              options: { hotspot: true },
              description: "Upload an SVG or PNG icon for this challenge.",
              fields: [
                defineField({
                  name: "alt",
                  title: "Alt Text",
                  type: "string",
                  description: "Accessibility alt text for the icon.",
                }),
              ],
            }),

            // ✅ Title
            defineField({
              name: "title",
              title: "Challenge Title",
              type: "string",
              validation: (Rule) => Rule.required(),
              description: "e.g., 'Missed Important Mail'",
            }),

            // ✅ Description
            defineField({
              name: "description",
              title: "Challenge Description",
              type: "text",
              rows: 3,
              description:
                "Short summary of the issue, e.g., 'Critical documents and contracts often get lost or stuck in home mailboxes.'",
            }),

            // ✅ Quote / Testimonial Text
            defineField({
              name: "quote",
              title: "Customer Quote",
              type: "text",
              rows: 2,
              description:
                "e.g., 'I once lost a client because their contract got stuck in my home mailbox.'",
            }),

            // ✅ Author Info
            defineField({
              name: "author",
              title: "Author Information",
              type: "object",
              fields: [
                defineField({
                  name: "name",
                  title: "Name",
                  type: "string",
                  description: "e.g., 'David K.'",
                }),
                defineField({
                  name: "designation",
                  title: "Designation",
                  type: "string",
                  description: "e.g., 'E-Commerce Entrepreneur'",
                }),
              ],
            }),
          ],

          preview: {
            select: {
              title: "title",
              subtitle: "author.name",
              media: "icon",
            },
            prepare({ title, subtitle, media }) {
              return {
                title,
                subtitle: subtitle ? `By ${subtitle}` : "Challenge Card",
                media,
              };
            },
          },
        }),
      ],
      description: "List of key challenges faced by small business owners.",
    }),
  ],

  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "Small Business Challenges Section",
        subtitle: "Challenges grid section",
      };
    },
  },
});
