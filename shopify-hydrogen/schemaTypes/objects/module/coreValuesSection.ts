import {defineType, defineField} from 'sanity'
import {StarIcon} from '@sanity/icons'

export const coreValuesSection = defineType({
  name: 'coreValuesSection',
  title: 'Core Values Section',
  type: 'object',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Our Core Values',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
      rows: 2,
      initialValue:
        'Our core values shape the way we work, grow, and support each other—creating a workplace where careers thrive and people make a real impact.',
    }),
    defineField({
      name: 'values',
      title: 'Core Values',
      type: 'array',
      of: [
        defineField({
          name: 'value',
          title: 'Value',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
              options: {
                accept: '.svg', // Restrict upload to SVG only
              },
              description: 'Icon name or reference (e.g., lightbulb, people, customer, excellence)',
            }),
            defineField({
              name: 'title',
              title: 'Value Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Value Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
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
