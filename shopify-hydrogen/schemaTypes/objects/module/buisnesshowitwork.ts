import {defineType, defineField} from 'sanity'
// import {RocketIcon} from '@sanity/icons'

export const buisnesshowitwork = defineType({
  name: 'buisnesshowitwork',
  title: 'Business Accelerator Section (How It Works)',
  type: 'object',
  // icon: RocketIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'How it works',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text',
      initialValue: 'Get started in minutes and unlock growth resources at your fingertips.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [
        defineField({
          name: 'step',
          title: 'Step',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Step Icon',
              type: 'image',
              options: {hotspot: true},
              description: 'Upload an icon for this step (e.g., clock, benefits, money)',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'heading',
              title: 'Step Heading',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'text',
              title: 'Step Description',
              type: 'text',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'heading',
              subtitle: 'text',
              media: 'icon',
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).error('At least one step is required'),
      description: 'Add step-by-step cards like “Join in Minutes”, “Access All Benefits”, “Grow Your Business”',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Business Accelerator Section (How It Works)',
        subtitle: subtitle,
      }
    },
  },
})
