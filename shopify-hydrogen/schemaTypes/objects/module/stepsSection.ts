import {defineField, defineType} from 'sanity'
import {SparkleIcon} from '@sanity/icons'

export const stepsSection = defineType({
  name: 'stepsSection',
  title: 'Steps Section',
  type: 'object',
  icon: SparkleIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main heading for the section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Introductory description shown under the heading',
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      description: 'Process steps with icon, title, and description',
      of: [
        defineField({
          name: 'step',
          title: 'Step',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon (SVG)',
              type: 'file',
              options: {
                accept: '.svg',
              },
              description: 'Upload an SVG file for the step icon',
            }),
            defineField({
              name: 'title',
              title: 'Step Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'text',
              title: 'Step Description',
              type: 'text',
              rows: 2,
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
    }),
    defineField({
      name: 'ctaText',
      title: 'Button Text',
      type: 'string',
      description: 'Text for the call-to-action button (optional)',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'Button URL',
      type: 'url',
      description: 'Link for the call-to-action button (optional)',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({title}) {
      return {
        title: title || 'Steps Section',
      }
    },
  },
})
