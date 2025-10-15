import {defineType, defineField} from 'sanity'

export const PDPHowItWorks = defineType({
  name: 'PDPHowItWorks',
  title: 'PDP How It Works',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main heading, e.g., "How it works"',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Supporting text below the heading',
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'step',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
              options: { hotspot: true },
              description: 'Icon representing the step',
            }),
            defineField({
              name: 'title',
              title: 'Step Title',
              type: 'string',
              description: 'E.g., "Login to Dashboard"',
            }),
            defineField({
              name: 'description',
              title: 'Step Description',
              type: 'text',
              description: 'Brief explanation of the step',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'icon',
            },
            prepare({title, subtitle, media}) {
              return {
                title: title || 'Step',
                subtitle,
                media,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({title}) {
      return {
        title: title || 'PDP How It Works',
      }
    },
  },
})
