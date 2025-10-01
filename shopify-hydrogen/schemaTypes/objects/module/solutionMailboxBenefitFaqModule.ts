import {defineType, defineField} from 'sanity'

export const solutionMailboxBenefitFaqModule = defineType({
  name: 'solutionMailboxBenefitFaqModule',
  title: 'Solution Mailbox Benefit + FAQ Module',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'string',
      description: "E.g. 'Is a Virtual Mailbox Right for You?'",
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: "E.g. 'You might benefit from a virtual mailbox if:'",
    }),
    defineField({
      name: 'benefits',
      title: 'Benefit Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'benefit',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
              description: 'Upload benefit icon (SVG or image)',
              options: { hotspot: true },
            }),
            defineField({
              name: 'text',
              title: 'Benefit Text',
              type: 'string',
              description: 'E.g. "You work remotely or travel often"',
            }),
          ],
          preview: {
            select: {
              title: 'text',
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
      description: 'Phone mockup or supporting image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'faqs',
      title: 'FAQ Section',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faq',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              description: 'E.g. "Can I use this for government or bank mail?"',
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 2,
              description: 'Short answer to the FAQ',
            }),
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'answer',
            },
          },
        },
      ],
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
