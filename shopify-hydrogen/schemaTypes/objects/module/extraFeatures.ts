// ./schemas/modules/extraFeatures.ts
import {defineType, defineField} from 'sanity'
import {CheckmarkCircleIcon} from '@sanity/icons'

export const extraFeatures = defineType({
  name: 'extraFeatures',
  title: 'Extra Features',
  type: 'object',
  icon: CheckmarkCircleIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Extra Features Available For All Plans',
    }),
    defineField({
      name: 'features',
      title: 'Features List',
      type: 'array',
      of: [
        defineField({
          name: 'feature',
          title: 'Feature',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Feature Text',
              type: 'string',
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({title}) {
      return {
        title: title || 'Extra Features',
        subtitle: 'Extra features module',
      }
    },
  },
})
