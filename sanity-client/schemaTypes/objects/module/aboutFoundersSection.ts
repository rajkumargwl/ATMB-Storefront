import {defineType, defineField} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export const aboutFoundersSection = defineType({
  name: 'aboutFoundersSection',
  title: 'Our Founders Section',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Our Founders',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'string',
      initialValue: 'Meet the driving force behind our vision and commitment to excellence.',
    }),
    defineField({
      name: 'founders',
      title: 'Founders',
      type: 'array',
      of: [
        defineField({
          name: 'founder',
          title: 'Founder',
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
            defineField({
              name: 'linkedin',
              title: 'LinkedIn Profile URL',
              type: 'url',
            }),
            defineField({
              name: 'bio',
              title: 'Biography',
              type: 'text',
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
