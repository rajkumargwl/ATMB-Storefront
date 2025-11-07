import { defineType, defineField } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'
import { GROUPS } from '../constants' // ✅ correct path for your setup

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  icon: DocumentTextIcon,
  groups: GROUPS, // 👈 enables the same tabs: Editorial, SEO, etc.

  fields: [
    defineField({
      name: 'title',
      title: 'Case Study Title',
      type: 'string',
      group: 'editorial',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      initialValue: 'en',
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: 'Spanish', value: 'en-es' },
        ],
      },
      hidden: true,
    }),
    // defineField({
    //   name: 'slug',
    //   title: 'Slug',
    //   type: 'slug',
    //   options: { source: 'title', maxLength: 96 },
    //   group: 'editorial',
    //   validation: Rule => Rule.required(),
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

          // Ensure slug and language exist
          if (!slug || !document) return true

          const language = document.language || 'en'
          const id = document._id.replace(/^drafts\./, '')

          // ✅ Fetch documents with same slug *and* same language, excluding self
          const duplicate = await client.fetch(
            `count(*[
              _type == "caseStudy" &&
              slug.current == $slug &&
              language == $language &&
              !(_id in [$id, "drafts." + $id])
            ])`,
            { slug, language, id }
          )

          // If 0 matches found, it’s unique
          return duplicate === 0
        },
      },
    }),
    defineField({
      name: 'date',
      title: 'Publish Date',
      type: 'date',
      group: 'editorial',
    }),
    defineField({
      name: 'cta',
      title: 'Download Button',
      type: 'object',
      group: 'editorial',
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
      group: 'editorial',
    }),
    defineField({
      name: 'content',
      title: 'Case Study Content',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'editorial',
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'object',
      group: 'editorial',
      fields: [
        defineField({ name: 'quote', title: 'Quote', type: 'text' }),
        defineField({ name: 'author', title: 'Author', type: 'string' }),
      ],
    }),
    defineField({
      name: 'byTheNumbers',
      title: 'By The Numbers',
      type: 'object',
      group: 'editorial',
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
    defineField({
      name: 'virtualMailSection',
      title: 'Virtual Mail Section',
      type: 'object',
      group: 'editorial',
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
      group: 'editorial',
      of: [
        defineField({
          type: 'reference',
          name: 'relatedCaseStudy',
          to: [{ type: 'caseStudy' }],
        }),
      ],
    }),

    // ✅ Added SEO field group
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
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
