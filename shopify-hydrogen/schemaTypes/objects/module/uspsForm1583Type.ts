import { defineType, defineField } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export const uspsForm1583Type = defineType({
  name: 'uspsForm1583',
  title: 'USPS Form 1583',
  type: 'object',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'subModules',
      title: 'Sub Modules',
      type: 'array',
      of: [
        { type: 'uspsForm1583Guide' },
        { type: 'uspsForm1583Content' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'USPS Form 1583',
      }
    },
  },
})