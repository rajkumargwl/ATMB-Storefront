import { defineType, defineField } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons'

export const prefectvirtualbox = defineType({
  name: 'prefectvirtualbox',
  title: 'Perfect Virtual Mailbox',
  type: 'object',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'searchPlaceholder',
      title: 'Search Placeholder',
      type: 'string',
      initialValue: 'Address, City or Zip Code...',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      initialValue: 'Search',
    }),
    defineField({
      name: 'buttonIcon',
      title: 'Button Icon',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],

  preview: {
    select: {
      title: 'heading',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Perfect Virtual Mailbox',
        media,
      }
    },
  },
})
