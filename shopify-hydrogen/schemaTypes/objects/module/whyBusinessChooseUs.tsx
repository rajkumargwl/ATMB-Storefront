import {defineType, defineField} from 'sanity'

export const whyBusinessChooseUs = defineType({
  name: 'whyBusinessChooseUs',
  title: 'Why Businesses Choose Us',
  type: 'object',
  fields: [
   defineField({
      name: 'heading',
      title: ' Heading',
      type: 'string',
    }),
 
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text',
    
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        defineField({
          name: 'feature',
          title: 'Feature',
          type: 'object',
          fields: [
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'description', title: 'Description', type: 'text'},
          ],
        }),
      ],
    }),
  ],
  preview: {
     select: {
      title: 'heading', 
    },
  },
})