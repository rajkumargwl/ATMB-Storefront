import { defineType, defineField } from "sanity";

export const noOfficeSection = defineType({
  name: "noOfficeSection",
  title: "No Office or Secretary Section",
  type: "object",

  fields: [
    defineField({
      name: "title",
      title: "Main Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Main heading, e.g. 'No office or secretary? No problem!'",
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "array",
      description:
        "Brief paragraph describing the section, shown under the title. You can add bold text.",
      of: [
        {
          type: "block",
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
          },
        },
      ],
    }),
    defineField({
      name: "features",
      title: "Feature List",
      type: "array",
      description: "List of features or service highlights with checkmarks.",
      of: [
        defineField({
          name: "feature",
          title: "Feature",
          type: "object",
          fields: [
            defineField({
              name: "text",
              title: "Feature Text",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "image",
      title: "Right Side Image",
      type: "image",
      description: "Upload the representative image (e.g., smiling woman).",
      options: {
        hotspot: true,
      },
      
    }),
    
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title || "No Office Section",
        subtitle: "Business Phone System Section",
        media,
      };
    },
  },
});
