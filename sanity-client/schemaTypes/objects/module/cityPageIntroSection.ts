import {defineType, defineField} from 'sanity'

export const cityPageIntroSection = defineType({
  name: 'cityPageIntroSection',
  title: 'City Page Intro Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main heading with bold text',
    }),
    defineField({
        name: 'description',
        title: 'Description',
        type: 'array',
        of: [{ type: 'block' }],
        // group: 'editorial',
      }),
    defineField({
      name: 'image',
      title: 'Left Side Image',
      type: 'image',
      options: {hotspot: true},
    })
  ],
  preview: {
    select: {title: 'heading', media: 'image'},
    prepare({title, media}) {
      return {
        title: title || 'City Page Intro Section',
        media,
      }
    },
  },
})
