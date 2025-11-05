import { defineType, defineField } from "sanity";


export const smallBusinessOwnerSection = defineType({
  name: "smallBusinessOwnerSection",
  title: "Small Business Owner Section",
  type: "object",
 

  fields: [
    // ✅ Main Heading
    defineField({
      name: "title",
      title: "Main Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Main heading, e.g., 'Run Your Business Anywhere. Without the Hassle.'",
    }),

    // ✅ Subtitle / Description
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description:
        "Short paragraph describing the section, e.g., 'No missed mail, no unanswered calls...'",
    }),

    // ✅ Primary CTA Button
    defineField({
      name: "primaryCta",
      title: "Primary Button",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Button Label",
          type: "string",
          validation: (Rule) => Rule.required(),
          description: "e.g., 'Get Started'",
        }),
        defineField({
          name: "url",
          title: "Button URL",
          type: "string",  
        }),
       { name: 'sectionid', title: 'Section Id', type: 'string' },
      ],
    }),

    // ✅ Secondary CTA Button
    defineField({
      name: "secondaryCta",
      title: "Secondary Button",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Button Label",
          type: "string",
          description: "e.g., 'Bundle & Save 35%'",
        }),
        defineField({
          name: "url",
          title: "Button URL",
          type: "string",

        }),
        { name: 'sectionid', title: 'Section Id', type: 'string' },
      ],
    }),

    // ✅ Image of Business Owner
    defineField({
      name: "ownerImage",
      title: "Owner Image",
      type: "image",
      options: { hotspot: true },
      description: "Upload the right-side image of the small business owner.",
    }),

    // ✅ Trusted Brands Section
    defineField({
      name: "trustedByText",
      title: "Trusted By Text",
      type: "string",
      description:
        "e.g., 'Trusted by 25,000+ entrepreneurs and small businesses worldwide'",
    }),

    // ✅ Logos of Trusted Brands
    defineField({
      name: "brandLogos",
      title: "Brand Logos",
      type: "array",
      of: [
        defineField({
          name: "logo",
          title: "Logo",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              description: "Accessibility text for the logo image",
            }),
          ],
        }),
      ],
      description: "Add brand logos (e.g., Annex, PostNet, GCUC).",
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "ownerImage",
    },
    prepare({ title, media }) {
      return {
        title: title || "Small Business Owner Section",
        subtitle: "Hero-style marketing section",
        media,
      };
    },
  },
});
