// import { GROUPS } from '../../constants'
// export default {
//   name: 'news',
//   title: 'Newsroom',
//   type: 'document',
//   fields: [
//     {
//       name: 'title',
//       title: 'Title',
//       type: 'string',
//       validation: Rule => Rule.required(),
//     },
//     {
//       name: 'slug',
//       title: 'Slug',
//       type: 'slug',
//       options: {
//         source: 'title',
//         maxLength: 96,
//       },
//       validation: Rule => Rule.required(),
//     },
//     {
//       name: 'description',
//       title: 'Description',
//       type: 'blockContent',
//     },
//     {
//       name: 'featuredImage',
//       title: 'Featured Image',
//       type: 'image',
//       options: {
//         hotspot: true,
//       },
//     },
//     {
//       name: 'logoImage',
//       title: 'Logo Image',
//       type: 'image',
//       options: {
//         hotspot: true,
//       },
//     },
    
//     {
//       name: 'date',
//       title: 'Publish Date',
//       type: 'datetime',
//       validation: Rule => Rule.required(),
//     },
    
//   ],
  
// };
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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
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
