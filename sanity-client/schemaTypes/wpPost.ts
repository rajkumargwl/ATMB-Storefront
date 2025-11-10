import { defineField } from 'sanity'
import { GROUPS } from '../constants'

export default {
  name: 'wpPost',
  title: 'Blogs',
  type: 'document',
  groups: GROUPS, // 👈 Enables the same grouped tabs (Editorial, SEO, etc.)
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'editorial',
      validation: (Rule) => Rule.required(),
    }),
    {
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
    },
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
              _type == "wpPost" &&
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
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      group: 'editorial',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
      group: 'editorial',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      group: 'editorial',
    }),
    defineField({
      name: 'link',
      title: 'Original Link',
      type: 'url',
      group: 'editorial',
    }),
    defineField({
      name: 'authorName',
      title: 'Author',
      type: 'string',
      group: 'editorial',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'number' }],
      group: 'editorial',
    }),

    // ✅ Added SEO field group
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
}
