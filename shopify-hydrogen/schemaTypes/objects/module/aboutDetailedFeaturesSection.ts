import {defineType, defineField} from 'sanity'

export const aboutDetailedFeaturesSection = defineType({
  name: 'aboutDetailedFeaturesSection',
  title: 'About - Detailed Features Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Example: Features of Anytime Mailbox',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Introductory text, supports multiple paragraphs',
    }),
    defineField({
      name: 'features',
      title: 'Feature List',
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
              description: 'Example: Open and Scan',
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
              description: 'Example: Open & scan mail content and it will be available to you in PDF',
            }),
          ],
          preview: {
            select: {title: 'title', media: 'icon', subtitle: 'subtitle'},
          },
        }),
      ],
    }),
    defineField({
      name: 'rightImage',
      title: 'Right Side Image',
      type: 'image',
      options: {hotspot: true},
      description: 'Example: Phone mockup screenshot',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Optional background (e.g. light peach color)',
      initialValue: '#FFF6F1',
    }),
  ],
  preview: {
    select: {title: 'heading', media: 'rightImage'},
    prepare({title, media}) {
      return {
        title: title || 'Detailed Features Section',
        media,
      }
    },
  },
})
