import {defineType, defineField} from 'sanity'
import {UsersIcon} from '@sanity/icons'
 
export const howitworks2 = defineType({
  name: 'howitworks2',
  title: 'How It Works - 2',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'sectionSubtitle',
      title: 'Section Subheading',
      type: 'text',
      rows: 3,
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
              name: 'steps',
              title: 'Steps',
              type: 'string',
              
            }),
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
              defineField({
              name: 'icon',
              title: 'Icon (PNG only)',
              type: 'image',
              options: {
                accept: '.png',
              },
              description: 'Upload a PNG icon representing this feature.',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'button',
      title: 'Section Button',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'url',
          title: 'Button URL',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['http', 'https', 'mailto', 'tel'],
            }),
        }),
      ],
    }),
  ],
 
  preview: {
    select: {
      title: 'sectionTitle',
      subtitle: 'sectionSubtitle',
    },
  },
})