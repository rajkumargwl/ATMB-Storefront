import {defineType, defineField} from "sanity";

export const pdpPage = defineType({
  name: "pdpPage",
  title: "PDP Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
    }),

    // ✅ Key Highlights Section
    defineField({
      name: "keyHighlights",
      title: "Key Highlights",
      type: "object",
      fields: [
        defineField({
          name: "sectionTitle",
          title: "Section Title",
          type: "string",
          initialValue: "Key Highlights",
        }),
        defineField({
          name: "items",
          title: "Highlights",
          type: "array",
          of: [
            {
              type: "object",
              name: "highlightItem",
              fields: [
                defineField({
                  name: "icon",
                  title: "Icon Upload",
                  type: "image",
                  options: {hotspot: true}, // enables cropping
                  description: "Upload an icon image.",
                }),
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "string",
                }),
              ],
            },
          ],
        }),
        defineField({
          name: "footerText",
          title: "Footer Text",
          type: "string",
          initialValue: "Everything you need to manage mail with ease.",
        }),
      ],
    }),
  ],
});
