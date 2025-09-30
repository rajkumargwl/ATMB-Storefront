import {defineType, defineField} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Case Study Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
      name: 'date',
      title: 'Publish Date',
      type: 'date',
    }),
    defineField({
      name: 'cta',
      title: 'Download Button',
      type: 'object',
      fields: [
        defineField({ name: 'text', title: 'Button Text', type: 'string' }),
        defineField({ name: 'file', title: 'PDF File', type: 'file' }),
      ],
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    // 🔑 Single rich text editor for all content
    defineField({
      name: 'content',
      title: 'Case Study Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'object',
      fields: [
        defineField({ name: 'quote', title: 'Quote', type: 'text' }),
        defineField({ name: 'author', title: 'Author', type: 'string' }),
      ],
    }),

    // ✅ New "By The Numbers" section
    defineField({
      name: 'byTheNumbers',
      title: 'By The Numbers',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'By The Numbers',
        }),
        defineField({
          name: 'stats',
          title: 'Stats',
          type: 'array',
          of: [
            defineField({
              name: 'statItem',
              title: 'Stat Item',
              type: 'object',
              fields: [
                defineField({
                  name: 'value',
                  title: 'Value',
                  type: 'string', // "$400", "60%", etc.
                }),
                defineField({
                  name: 'label',
                  title: 'Label',
                  type: 'string', // description
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'relatedCaseStudies',
      title: 'Related Case Studies',
      type: 'array',
      of: [
        defineField({
          type: 'reference',
          name: 'relatedCaseStudy',
          to: [{ type: 'caseStudy' }],
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
      media: 'heroImage',
    },
  },
})
