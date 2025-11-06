
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
     defineField(  {
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
    //   options: {
    //     source: 'title',
    //     maxLength: 96,
    //   },
    //   validation: Rule => Rule.required(),
    // }),
    defineField( {
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
            id: document?._id,
          }
    
          // Query for other wpPost documents with same slug + language
          const duplicate = await client.fetch(
            `*[
              _type == "news" &&
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
    }),
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
