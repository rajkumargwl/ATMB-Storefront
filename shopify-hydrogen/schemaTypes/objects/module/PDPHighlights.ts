import {defineType, defineField} from 'sanity'

export const PDPHighlights = defineType({
  name: 'PDPHighlights',
  title: 'PDP Highlights',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Example: "Key Highlights"',
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights List',
      type: 'array',
      of: [
        defineField({
          name: 'highlightItem',
          title: 'Highlight Item',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
              options: {hotspot: true},
              description: 'Optional icon for the highlight (e.g., checkmark)',
            }),
            defineField({
              name: 'text',
              title: 'Highlight Text',
              type: 'string',
              description: 'Example: "Unlimited Calling"',
            }),
          ],
          preview: {
            select: {title: 'text', media: 'icon'},
          },
        }),
      ],
      description: 'Add the main highlights of the product or feature.',
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {
        title: title || 'PDP Highlights Section',
      }
    },
  },
})
