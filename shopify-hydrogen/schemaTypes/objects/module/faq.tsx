import {defineType, defineField} from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
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

    // FAQ Categories
    defineField({
      name: 'faqCategories',
      title: 'FAQ Categories',
      type: 'array',
      of: [
        defineField({
          name: 'faqCategory',
          title: 'FAQ Category',
          type: 'object',
          fields: [
            { name: 'title', title: 'Category Title', type: 'string' },

            {
              name: 'faqs',
              title: 'FAQs',
              type: 'array',
              of: [
                defineField({
                  name: 'faq',
                  title: 'FAQ',
                  type: 'object',
                  fields: [
                    { name: 'question', title: 'Question', type: 'string' },
                    { name: 'answer', title: 'Answer', type: 'text' },
                   
                  ],
                }),
              ],
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
    },
  },
})