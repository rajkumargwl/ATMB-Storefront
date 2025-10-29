import {defineType, defineField} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export const whyWorkSection = defineType({
  name: 'whyWorkSection',
  title: 'Why Work Section',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Why work at Anytime Mailbox?',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
      rows: 3,
      initialValue:
        'Join a global team that values growth, flexibility, and innovation—where your career can thrive, no matter where you are.',
    }),
  
    defineField({
      name: 'features',
      title: 'Work Benefits / Features',
      type: 'array',
      of: [
        defineField({
          name: 'feature',
          title: 'Feature',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
              options: {
                accept: '.svg', // Restrict upload to SVG only
              },
              description: 'Reference to an icon name (e.g., house, money, growth)',
            }),
                          {
          name: "tooltipTitle",
          title: "Tooltip Title",
          type: "string",
          description: "Title that appears on hover (tooltip) for this icon",
        },
            defineField({
              name: 'title',
              title: 'Feature Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Feature Description',
              type: 'text',
              rows: 3,
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
