import {defineType, defineField} from 'sanity'

export const aboutIntroSection = defineType({
  name: 'aboutIntroSection',
  title: 'About Intro Section',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Small Label',
      type: 'string',
      description: 'Example: "About Us"',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main heading with bold text',
    }),
    defineField({
      name: 'highlightedText',
      title: 'Highlighted Text',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Words to highlight in color (like partners, customers, employees)',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    // ⬇️ Changed image field to video object
    defineField({
      name: 'video',
      title: 'Right Side Video',
      type: 'object',
      fields: [
        defineField({
          name: 'thumbnail',
          title: 'Thumbnail',
          type: 'image',
          options: {hotspot: true},
        }),
        defineField({
          name: 'url',
          title: 'Video URL',
          type: 'url',
        }),
      ],
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      description: 'Example: "What we are about"',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'url',
    }),
  ],
  preview: {
    select: {title: 'heading', media: 'video.thumbnail'},
    prepare({title, media}) {
      return {
        title: title || 'About Intro Section',
        media,
      }
    },
  },
})
