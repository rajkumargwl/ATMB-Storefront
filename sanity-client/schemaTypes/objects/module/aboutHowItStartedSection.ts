import {defineType, defineField} from 'sanity'

export const aboutHowItStartedSection = defineType({
  name: 'aboutHowItStartedSection',
  title: 'About - How It Started Section',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Left Side Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Example: "How it started"',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}], // rich text to allow multiple paragraphs
    }),
  ],
  preview: {
    select: {title: 'heading', media: 'image'},
    prepare({title, media}) {
      return {
        title: title || 'How It Started Section',
        media,
      }
    },
  },
})
