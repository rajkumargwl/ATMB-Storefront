import {defineType, defineField} from 'sanity'

export const businessAtFingertips = defineType({
  name: 'businessAtFingertips',
  title: 'Your Business - Mobile/Desktop App',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
    }),

    // 📱 Phone Mockup Image
    defineField({
      name: 'phoneImage',
      title: 'Phone Mockup Image',
      type: 'image',
      options: { hotspot: true },
    }),

    // 📋 Features
    defineField({
      name: 'features',
      title: 'App Features',
      type: 'array',
      of: [
        defineField({
          name: 'feature',
          title: 'Feature',
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon (SVG Upload / Code)',
              type: 'object',
              fields: [
                { name: 'iconFile', title: 'SVG File', type: 'file', options: { accept: '.svg,.png' },},
                { name: 'iconCode', title: 'SVG Code', type: 'text' },
              ],
            },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            {
              name: 'highlight',
              title: 'Highlight Feature?',
              type: 'boolean',
              description: 'If true, this feature will be styled as the main highlighted feature (like Real-Time Notifications).',
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'subheadline',
      media: 'phoneImage',
    },
  },
})
