import {defineField, defineType} from 'sanity'
import {SparkleIcon} from '@sanity/icons'
export const affiliateProgramSection = defineType({
  name: 'affiliateProgramSection',
  title: 'Affiliate Program Section',
  type: 'object',

  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      icon: SparkleIcon,
      description: 'Small label above the heading (e.g. Affiliate Program)',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main heading text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Short description under the heading',
    }),
    defineField({
      name: 'ctaText',
      title: 'Button Text',
      type: 'string',
      description: 'Text for the call-to-action button',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'Button URL',
      type: 'url',
      description: 'Link for the call-to-action button',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Image shown on the right side',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Important for SEO and accessibility',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'label',
      media: 'image',
    },
  },
})
