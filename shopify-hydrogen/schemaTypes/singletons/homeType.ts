import {HomeIcon} from '@sanity/icons'
import {defineArrayMember, defineField} from 'sanity'
import { GROUPS } from '../../constants'

const TITLE = 'Home'

export const homeType = defineField({
  name: 'home',
  title: TITLE,
  type: 'document',
  icon: HomeIcon,
  groups: GROUPS,
  fields: [
    // defineField({
    //   name: 'hero',
    //   type: 'hero',
    //   group: 'editorial',
    // }),
    defineField({
      name: 'modules',
      type: 'array',
      of: [
        defineArrayMember({ type: 'accordion' }),
        defineArrayMember({ type: 'callout' }),
        defineArrayMember({ type: 'grid' }),
        defineArrayMember({ type: 'images' }),
        defineArrayMember({ type: 'imageWithProductHotspots', title: 'Image with Hotspots' }),
        defineArrayMember({ type: 'instagram' }),
        defineArrayMember({ type: 'products' }),
        defineArrayMember({ type: 'hero', title: 'Hero' }),
        defineArrayMember({ type: 'homeSection2', title: 'Home Section 2' }),
        defineArrayMember({ type: 'homeSection3', title: 'Home Section 3' }),
        defineArrayMember({ type: 'homeSection4', title: 'Home Section 4' }),
        defineArrayMember({ type: 'faq', title: 'FAQ' }),
        defineArrayMember({ type: 'testimonial', title: 'Testimonial' }),
      ],
      group: 'editorial',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        media: HomeIcon,
        subtitle: 'Index',
        title: TITLE,
      }
    },
  },
})
