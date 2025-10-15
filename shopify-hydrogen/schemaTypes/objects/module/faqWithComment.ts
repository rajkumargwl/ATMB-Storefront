import { defineType, defineField } from 'sanity'

export const faqWithComment = defineType({
  name: 'faqWithComment',
  title: 'FAQ With Comment',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Main heading for the FAQ section, e.g. "Frequently Asked Questions".',
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      description: 'Optional subtitle for the FAQ section, e.g. "Find quick answers...".',
    }),

    // ✅ Corrected FAQ Array
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faq',
          title: 'FAQ',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'comment',
              title: 'Comment (Optional)',
              type: 'object',
              fields: [
                {
                  name: 'quote',
                  title: 'Quote Text',
                  type: 'text',
                  rows: 2,
                  description: 'Short testimonial or quote related to this FAQ.',
                },
                {
                  name: 'author',
                  title: 'Author Name',
                  type: 'string',
                },
                {
                  name: 'role',
                  title: 'Author Role',
                  type: 'string',
                  description: 'Example: E-Commerce Entrepreneur',
                },
                {
                  name: 'authorImage',
                  title: 'Author Image',
                  type: 'image',
                  options: { hotspot: true },
                },
              ],
            },
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
      title: 'headline',
      subtitle: 'subheadline',
    },
  },
})
