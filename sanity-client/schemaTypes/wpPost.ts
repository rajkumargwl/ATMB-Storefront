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
     {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: async (slug, context) => {
          const { document, getClient } = context
          const client = getClient({ apiVersion: '2023-01-01' })
    
          // Fallback to 'en' if language is missing
          const language = document?.language || 'en'
    
          const params = {
            slug,
            language,
            id: document._id,
          }
    
          // Query for other wpPost documents with same slug + language
          const duplicate = await client.fetch(
            `*[
              _type == "wpPost" &&
              slug.current == $slug &&
              (
                (defined(language) && language == $language) ||
                (!defined(language) && $language == "en")
              ) &&
              !(_id in [$id, "drafts." + $id])
            ][0]._id`,
            params
          )
    
          // If none found, slug is unique for this language
          return !duplicate
        },
      },
    },
    // defineField({
    //   name: 'slug',
    //   title: 'Slug',
    //   type: 'slug',
    //   options: {
    //     source: 'title',
    //     maxLength: 96,
    //   },
    //   group: 'editorial',
    //   validation: (Rule) => Rule.required(),
    // }),
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
