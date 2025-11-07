import {defineType, defineField} from 'sanity'

export const advantages = defineType({
  name: 'advantages',
  title: 'Advantages Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      description: 'Main heading shown at the top, e.g. "Advantages of a Indiana Business Address"',
    }),
    defineField({
      name: 'items',
      title: 'Advantage Items',
      type: 'array',
      of: [
        defineField({
          name: 'advantageItem',
          title: 'Advantage Item',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
              options: {hotspot: true},
              description: 'Upload an icon image (e.g., for key sectors, market access, etc.)',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'e.g. "Key Sectors", "Market Access", etc.',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              description: 'Short text describing this advantage',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'icon',
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Optional — choose a background color (e.g. #ff6600)',
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {
        title: title || 'Advantages Section',
      }
    },
  },
})
