// /schemaTypes/footer.ts
import {defineType, defineField} from "sanity"

export const footerType = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  // __experimental_actions: ["update", "publish"], // single doc
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
      options: {hotspot: true},
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),

    // Company Column
    defineField({
      name: "companyColumn",
      title: "Company Column",
      type: "object",
      fields: [
        {name: "title", title: "Title", type: "string"},
        {
          name: "links",
          title: "Links",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {name: "label", title: "Label", type: "string"},
                {name: "link", title: "Link", type: "string"},
              ],
            },
          ],
        },
      ],
    }),

    // Services Column
    defineField({
      name: "servicesColumn",
      title: "Services Column",
      type: "object",
      fields: [
        {name: "title", title: "Title", type: "string"},
        {
          name: "links",
          title: "Links",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {name: "label", title: "Label", type: "string"},
                {name: "link", title: "Link", type: "string"},
              ],
            },
          ],
        },
      ],
    }),

    // Popular Locations Column
    defineField({
      name: "locationsColumn",
      title: "Popular Locations Column",
      type: "object",
      fields: [
        {name: "title", title: "Title", type: "string"},
        {
          name: "links",
          title: "Links",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {name: "label", title: "Label", type: "string"},
                {name: "link", title: "Link", type: "string"},
                {
                  name: "highlight",
                  title: "Highlight",
                  type: "boolean",
                  description: "Highlight certain location (e.g. New York, NY)",
                },
              ],
            },
          ],
        },
      ],
    }),

     // Services Column
     defineField({
      name: "contactColumn",
      title: "Contact Column",
      type: "object",
      fields: [
        {name: "title", title: "Title", type: "string"},
        {
          name: "links",
          title: "Links",
          type: "array",
          validation: (Rule) => Rule.max(3),
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "icon",
                  title: "Icon",
                  type: "image",
                  options: {hotspot: true},
                },
                {name: "label", title: "Label", type: "string"},
                {name: "link", title: "Link", type: "string"},
              ],
            },
          ],
        },
        {name: "address", title: "Address", type: "string"},
      ],
    }),

    // App Download Buttons
    defineField({
      name: "appButtons",
      title: "App Download Buttons",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Icon",
              type: "image",
              options: {hotspot: true},
            },
            {name: "link", title: "Link", type: "string"},
          ],
        },
      ],
    }),

    // Social Links
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {name: "icon", title: "Icon", type: "image"},
            {name: "link", title: "Link", type: "string"},
          ],
        },
      ],
    }),

    // Bottom Legal Links
    defineField({
      name: "bottomLinks",
      title: "Bottom Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {name: "label", title: "Label", type: "string"},
            {name: "link", title: "Link", type: "string"},
          ],
        },
      ],
    }),
  ],
})
