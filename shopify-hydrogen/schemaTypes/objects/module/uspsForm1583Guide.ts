import { defineType, defineField } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export const uspsForm1583Guide = defineType({
  name: 'uspsForm1583Guide',
  title: 'USPS Form 1583 Guide',
  type: 'object',
  icon: DocumentIcon,   
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Main heading text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Short supporting description',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        })
      ],
      description: 'Illustrative image for the guide',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title: title || 'USPS Form 1583 Guide',
        media: media,
      }
    },
  },
})