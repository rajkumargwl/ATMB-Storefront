// ./schemas/modules/howItWorks.ts
import {defineType, defineField} from 'sanity'
import {SparkleIcon} from '@sanity/icons'

export const howItWorks = defineType({
  name: 'howItWorks',
  title: 'How It Works',
  type: 'object',
  icon: SparkleIcon,
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge Text',
      type: 'string',
      initialValue: 'How it works',
    }),
    defineField({
      name: 'heading',
      title: 'Main Heading',
      type: 'string',
      initialValue: 'Setting up Anytime Phones is easy.',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      initialValue:
        'Anytime Phones is currently available for Anytime Mailbox customers only.',
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
            {
              name: 'icon',
              title: 'Icon',
              type: 'image',
              options: { hotspot: true },
            },
            {
              name: 'title',
              title: 'Step Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Step Description',
              type: 'text',
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'icon',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'badge',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'How It Works',
        subtitle: subtitle || 'Steps module',
      }
    },
  },
})
