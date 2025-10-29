import {defineType, defineField} from 'sanity'

export const marketPlaceIntroSection = defineType({
  name: 'marketPlaceIntroSection',
  title: 'Marketplace Intro Section',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Small Label',
      type: 'string',
      description: 'Example: "Market Place"',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main heading with bold text',
    }),
    // defineField({
    //   name: 'highlightedText',
    //   title: 'Highlighted Text',
    //   type: 'array',
    //   of: [{type: 'string'}],
    //   description: 'Words to highlight in color (like partners, customers, employees)',
    // }),
    // defineField({
    //   name: 'description',
    //   title: 'Description',
    //   type: 'text',
    // }),
    defineField({
      name: 'image',
      title: 'Right Side Image',
      type: 'image',
      options: {hotspot: true},
    }),
    // defineField({
    //   name: 'buttonText',
    //   title: 'Button Text',
    //   type: 'string',
    //   description: 'Example: "What we are about"',
    // }),
    // defineField({
    //   name: 'buttonLink',
    //   title: 'Button Link',
    //   type: 'url',
    // }),
  ],
  preview: {
    select: {title: 'heading', media: 'image'},
    prepare({title, media}) {
      return {
        title: title || 'Marketplace Intro Section',
        media,
      }
    },
  },
})
