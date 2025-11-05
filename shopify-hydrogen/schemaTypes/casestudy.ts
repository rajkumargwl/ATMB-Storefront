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
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          {title: 'English', value: 'en'},
          {title: 'Spanish', value: 'en-es'},
        ],
      },
      hidden: true,
    }),
    // defineField({
    //   name: 'slug',
    //   title: 'Slug',
    //   type: 'slug',
    //   options: { source: 'title', maxLength: 96 },
    // }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: async (slug, context) => {
          const { document, getClient } = context
          const client = getClient({ apiVersion: '2023-01-01' })
    
          const language = document?.language
    
          // Query for *other* caseStudy documents with same slug + language
          const duplicate = await client.fetch(
            `*[
              _type == "caseStudy" &&
              slug.current == $slug &&
              language == $language &&
              !(_id in [$id, "drafts." + $id])
            ][0]._id`,
            { slug, language, id: document._id }
          )
    
          // If none found, slug is unique for this language
          return !duplicate
        },
      },
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
                defineField({ name: 'value', title: 'Value', type: 'string' }),
                defineField({ name: 'label', title: 'Label', type: 'string' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // 🟠 Fixed "Virtual Mail CTA" section
    defineField({
      name: 'virtualMailSection',
      title: 'Virtual Mail Section',
      type: 'object',
      initialValue: {
        heading: 'Postal has gone digital, do you offer virtual mail?',
        buttonText: 'Mail Center Signup',
        buttonUrl: '',
      },
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'buttonText', title: 'Button Text', type: 'string' }),
        defineField({ name: 'buttonUrl', title: 'Button URL', type: 'string' }),
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
