import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'keyHighlights',
  title: 'Key Highlights',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Key Highlights',
    }),
    defineField({
      name: 'items',
      title: 'Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'highlightItem',
          title: 'Highlight Item',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Enter an icon name or identifier (e.g., map-pin, mail, truck, card)',
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Text',
      type: 'string',
      description: 'E.g., Everything you need to manage mail with ease.',
    }),
  ],
})
