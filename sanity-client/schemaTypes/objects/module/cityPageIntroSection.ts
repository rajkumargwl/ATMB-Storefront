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
      description: 'Please mention @city and @country for dynamic text',
    }),
    defineField({
        name: 'description',
        title: 'Description',
        type: 'array',
        of: [{ type: 'block' }],
        description: 'Please mention @city and @country for dynamic text',
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
