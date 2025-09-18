import {defineType, defineField} from 'sanity'

export const aboutFeaturesSection = defineType({
  name: 'aboutFeaturesSection',
  title: 'About - Features Section',
  type: 'object',
  fields: [
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Set a hex color or theme reference (e.g. #FF6600)',
      initialValue: '#FF6600',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        defineField({
          name: 'feature',
          title: 'Feature',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
            }),
          ],
          preview: {
            select: {title: 'title', media: 'icon', subtitle: 'subtitle'},
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'features.0.title'},
    prepare({title}) {
      return {
        title: title || 'Features Section',
      }
    },
  },
})
