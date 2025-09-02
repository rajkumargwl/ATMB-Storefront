import {defineType, defineField} from 'sanity'

export const keyHighlights = defineType({
  name: 'keyHighlights',
  title: 'Key Highlights',
  type: 'object',
  fields: [
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image', // or string if you want to use an icon name
              options: {hotspot: true},
            }),
            defineField({
              name: 'title',
              title: 'Title',
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
  ],
})
