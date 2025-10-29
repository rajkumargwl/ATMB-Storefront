import { defineType, defineField } from "sanity";

export const footerType = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Footer Title",
      type: "string",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),

    // ------------------------
    // Company Column
    // ------------------------
    defineField({
      name: "companyColumn",
      title: "Company Column",
      type: "object",
      fields: [
        { name: "title", title: "Title", type: "string" },
        {
          name: "links",
          title: "Links",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "label", title: "Label", type: "string" },
                { name: "link", title: "Link", type: "string" },
              ],
            },
          ],
        },
      ],
    }),

    // ------------------------
    // Services Column (Shop by Use Case)
    // ------------------------
    defineField({
      name: "servicesColumn",
      title: "Shop By Use Case",
      type: "object",
      fields: [
        { name: "title", title: "Title", type: "string" },
        {
          name: "links",
          title: "Links",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "label", title: "Label", type: "string" },
                { name: "link", title: "Link", type: "string" },
              ],
            },
          ],
        },
      ],
    }),

    // ------------------------
    // Popular Locations Column (Solutions)
    // ------------------------
    defineField({
      name: "locationsColumn",
      title: "Solutions",
      type: "object",
      fields: [
        { name: "title", title: "Title", type: "string" },
        {
          name: "links",
          title: "Links",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "label", title: "Label", type: "string" },
                { name: "link", title: "Link", type: "string" },
              ],
            },
          ],
        },
      ],
    }),

    // ------------------------
    // Mailbox Renters
    // ------------------------
    defineField({
      name: "MailboxRenters",
      title: "Mailbox Renters",
      type: "object",
      fields: [
        { name: "title", title: "Title", type: "string" },
        {
          name: "links",
          title: "Links",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "label", title: "Label", type: "string" },
                { name: "link", title: "Link", type: "string" },
              ],
            },
          ],
        },
      ],
    }),

    // ------------------------
    // Mail Center Operator
    // ------------------------
    defineField({
      name: "MailCenterOperator",
      title: "Mail Center Operator",
      type: "object",
      fields: [
        { name: "title", title: "Title", type: "string" },
        {
          name: "links",
          title: "Links",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "label", title: "Label", type: "string" },
                { name: "link", title: "Link", type: "string" },
              ],
            },
          ],
        },
      ],
    }),

    // ------------------------
    // Contact Column
    // ------------------------
    defineField({
      name: "contactColumn",
      title: "Contact Column",
      type: "object",
      fields: [
        { name: "title", title: "Title", type: "string" },
        {
          name: "links",
          title: "Links",
          type: "array",
          validation: (Rule) => Rule.max(3),
          of: [
            {
              type: "object",
              fields: [
                { name: "icon", title: "Icon", type: "image", options: { hotspot: true } },
                { name: "tooltipTitle", title: "Tooltip Title", type: "string", description: "Title that appears on hover (tooltip) for this icon" },
                { name: "label", title: "Label", type: "string" },
                { name: "link", title: "Link", type: "string" },
              ],
            },
          ],
        },
        { name: "address", title: "Address", type: "string" },
      ],
    }),

    // ------------------------
    // App Download Buttons
    // ------------------------
    defineField({
      name: "appButtons",
      title: "App Download Buttons",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", title: "Icon", type: "image", options: { hotspot: true } },
            { name: "link", title: "Link", type: "string" },
            { name: "tooltipTitle", title: "Tooltip Title", type: "string", description: "Title that appears on hover (tooltip) for this icon" },
          ],
        },
      ],
    }),

    // ------------------------
    // Social Links
    // ------------------------
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", title: "Icon", type: "image" },
            { name: "tooltipTitle", title: "Tooltip Title", type: "string", description: "Title that appears on hover (tooltip) for this icon" },
            { name: "link", title: "Link", type: "string" },
          ],
        },
      ],
    }),

    // ------------------------
    // Bottom Legal Links
    // ------------------------
    defineField({
      name: "bottomLinks",
      title: "Bottom Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "link", title: "Link", type: "string" },
          ],
        },
      ],
    }),
  ],
});
