// import {DocumentIcon} from '@sanity/icons'
// import {defineField, defineType} from 'sanity'

// import {validateSlug} from '../../utils/validateSlug'
// import {GROUPS} from '../../constants'

// export const pageType = defineType({
//   name: 'page',
//   title: 'Page',
//   type: 'document',
//   icon: DocumentIcon,
//   groups: GROUPS,
//   fields: [
//     defineField({
//       name: 'title',
//       group: 'editorial',
//       type: 'string',
//       validation: (Rule) => Rule.required(),
//     }),
  

//     // 👇 Add Page Modules (with About Us module)
//     defineField({
//       name: 'modules',
//       title: 'Modules',
//       type: 'array',
//       group: 'editorial',
//       of: [
//         { type: 'aboutUsModule' }, // new module
//         // you can add more like contactUsModule, cmsPageModule, etc.
//       ],
//     }),

//     defineField({
//       name: 'seo',
//       title: 'SEO',
//       type: 'seo',
//       group: 'seo',
//     }),
//   ],
//   preview: {
//     select: {
//       seoImage: 'seo.image',
//       title: 'title',
//     },
//     prepare({seoImage, title}) {
//       return {
//         media: seoImage ?? DocumentIcon,
//         title,
//       }
//     },
//   },
// })
import { DocumentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { GROUPS } from '../../constants'

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  groups: GROUPS,
  fields: [
    defineField({
      name: 'title',
      group: 'editorial',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      group: 'editorial',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    
    // 👇 Page Modules
        // 👇 Page Modules
    defineField({
      name: 'modules',
      title: 'Modules',
      type: 'array',
      group: 'editorial',
      of: [
        { type: 'aboutUsModule' },
         { type: 'solutionsMailbox' },
          { type: 'careersPageModule' },
          { type: 'faqPageModule' },
            { type: 'uspsForm1583' },
          
        // add more modules if needed
      ],
    }),
   
  ],
  preview: {
    select: {
      seoImage: 'seo.image',
      title: 'title',
    },
    prepare({ seoImage, title }) {
      return {
        media: seoImage ?? DocumentIcon,
        title,
      }
    },
  },
})
