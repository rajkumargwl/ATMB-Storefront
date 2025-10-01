import {defineType, defineField} from 'sanity'

export const solutionMailboxFeaturesModule = defineType({
  name: 'solutionMailboxFeaturesModule',
  title: 'Solution Mailbox Features Module',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'string',
      description: "E.g. 'What's Included with Anytime Mailbox'",
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      description: 'Short description under the title',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'feature',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon (SVG)',
              type: 'image',
              options: {
                accept: '.svg',
              },
              description: 'Upload SVG icon for feature',
            }),
            defineField({
              name: 'featureTitle',
              title: 'Feature Title',
              type: 'string',
              description: "E.g. 'Real Street Address'",
            }),
            defineField({
              name: 'featureDescription',
              title: 'Feature Description',
              type: 'text',
              rows: 2,
              description: 'Short description for this feature',
            }),
          ],
          preview: {
            select: {
              title: 'featureTitle',
              subtitle: 'featureDescription',
              media: 'icon',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'rightImage',
      title: 'Right Side Image',
      type: 'image',
      description: 'Upload mockup image (e.g., phone screenshot)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bottomHeading',
      title: 'Bottom Heading',
      type: 'text',
      rows: 2,
      description: 'Small note or disclaimer text shown at the bottom',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'rightImage',
    },
  },
})
