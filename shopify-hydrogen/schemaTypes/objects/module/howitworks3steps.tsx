import { defineType, defineField } from 'sanity'
import { DocumentIcon } from '@sanity/icons'
 
export const howitworks3steps = defineType({
  name: 'howitworks3steps',
  title: 'How It Works - 3 Steps',
  type: 'object',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main heading, e.g. How It Works in 3 Steps',
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text',
      description: 'e.g. A short introduction explaining the steps',
    }),
 
    // Features / Steps
    defineField({
      name: 'features',
      title: 'Steps / Features',
      type: 'array',
      of: [
        defineField({
          name: 'feature',
          title: 'Step',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Step Icon',
              type: 'object',
              fields: [
                {
                  name: 'upload',
                  title: 'Upload Icon',
                  type: 'image',
                  options: { hotspot: true },
                },
                {
                  name: 'svgCode',
                  title: 'SVG Code',
                  type: 'text',
                  description: 'Paste raw SVG markup here if not using upload',
                },
              ],
            }),
              defineField({
                      name: 'tooltip',
                      title: 'Tool Tip',
                      type: 'string',
                    }),
            defineField({
              name: 'title',
              title: 'Step Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Step Description',
              type: 'text',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'icon.upload',
            },
          },
        }),
      ],
    }),
 
    // CTA Buttons
    defineField({
      name: 'buttonPrimary',
      title: 'Primary Button',
      type: 'object',
      fields: [
        { name: 'label', title: 'Button Label', type: 'string' },
        { name: 'url', title: 'Button URL', type: 'url' },
      ],
    }),
    defineField({
      name: 'buttonSecondary',
      title: 'Secondary Button',
      type: 'object',
      fields: [
        { name: 'label', title: 'Button Label', type: 'string' },
        { name: 'url', title: 'Button URL', type: 'url' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'How It Works - 3 Steps Section',
      }
    },
  },
})