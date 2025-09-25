import { defineType, defineField } from "sanity";
 
export const uspsForm1583Content = defineType({
  name: "uspsForm1583Content",
  title: "USPS Form 1583 Content",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
 
    defineField({
      name: "contentBlocks",
      title: "Content Blocks",
      type: "array",
      of: [
        {
          name: "megaBlock",  // ← Keep the original name
          title: "Content Block",
          type: "object",
          fields: [
               // 4. First Text Field
            defineField({
              name: "textField",
              title: "Text Field ",
              type: "string",
            }),
 
            // 1. Unified Editor (heading + description + link)
            defineField({
              name: "mainContent",
              title: "Main Content",
              type: "array",
              of: [{ type: "block" }],
            }),
 
            // 2. Left Image
            defineField({
              name: "leftImage",
              title: "Left Image",
              type: "image",
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                })
              ]
            }),
 
            // 3. Right Image
            defineField({
              name: "rightImage",
              title: "Right Image",
              type: "image",
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                })
              ]
            }),
 
            // 4. First Text Field
            defineField({
              name: "textField1",
              title: "Text Field 1",
              type: "string",
            }),
 
            // 5. Image
            defineField({
              name: "image2",
              title: "Image 2",
              type: "image",
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                })
              ]
            }),
 
            // 6. Second Text Field
            defineField({
              name: "textField2",
              title: "Text Field 2",
              type: "string",
            }),
 
            // 7. Fourth Text Field
            defineField({
              name: "textField4",
              title: "Text Field 4",
              type: "string",
            }),
 
            // 8. Image 3
            defineField({
              name: "image3",
              title: "Image 3",
              type: "image",
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                })
              ]
            }),
 
            // 9. Fifth Text Field
            defineField({
              name: "textField5",
              title: "Text Field 5",
              type: "string",
            }),
 
            // 10. Optional Editor Field for rich text (if needed)
            defineField({
              name: "extraContent",
              title: "Extra Content",
              type: "array",
              of: [{ type: "block" }],
            }),
 
            // 11. Image 4
            defineField({
              name: "image4",
              title: "Image 4",
              type: "image",
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                })
              ]
            }),
 
            // 12. Sixth Text Field
            defineField({
              name: "textField6",
              title: "Text Field 6",
              type: "string",
            }),
 
            // 13. Second Rich Text Editor
            defineField({
              name: "extraContent2",
              title: "Extra Content 2",
              type: "array",
              of: [{ type: "block" }],
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'USPS Form 1583 Content',
      }
    },
  },
});