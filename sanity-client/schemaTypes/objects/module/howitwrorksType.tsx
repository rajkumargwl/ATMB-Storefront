import { defineType, defineField } from 'sanity'
import { DocumentIcon } from '@sanity/icons'
 
export const howitworksType = defineType({
name: 'howitworks',
  title: 'How It Works',
  type: 'object',
  icon: DocumentIcon,
   fields: [
    defineField({
      name: 'modules',
      type: 'array',
      of: [
  { type: 'howitworksVirtualbox' },    
    { type: 'uspsForm1583Guide' },   
     { type: 'howitworks2' },
          { type: 'builtForHowYouWorkToday'  },                                  
{ type: 'howitworks3steps' },
  { type: 'faq' },    
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'How It Works',
      }
    },
  },
})