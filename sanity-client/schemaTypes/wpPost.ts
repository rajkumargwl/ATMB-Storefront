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
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      group: 'editorial',
      validation: (Rule) => Rule.required(),
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
