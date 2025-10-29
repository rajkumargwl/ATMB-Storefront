import {defineType, defineField} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export const aboutResourceAuthorsSection = defineType({
  name: 'aboutResourceAuthorsSection',
  title: 'Resource Authors Section',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Resource Authors',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'string',
      initialValue:
        'Our team of experts on all our resources for virtual mailboxes, the mailing industry, small business, remote work, and tech for travelers.',
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [
        defineField({
          name: 'author',
          title: 'Author',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
            }),
            defineField({
              name: 'role',
              title: 'Role / Position',
              type: 'string',
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
  },
})
