
import { defineField } from 'sanity'
import { GROUPS } from '../constants'

export default {
  name: 'news',
  title: 'Newsroom',
  type: 'document',
  groups: GROUPS, // 👈 this makes use of your GROUPS definition
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
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
              _type == "news" &&
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

    // defineField({
    //   name: 'slug',
    //   title: 'Slug',
    //   type: 'slug',
    //   options: {
    //     source: 'title',
    //     maxLength: 96,
    //   },
    //   validation: Rule => Rule.required(),
    // }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'logoImage',
      title: 'Logo Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'date',
      title: 'Publish Date',
      type: 'datetime',
      validation: Rule => Rule.required(),
    }),
    // 👇 Add SEO field group
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
}
