import {defineType, defineField} from 'sanity'

export const cityPageVideoSection = defineType({
  name: 'cityPageVideoSection',
  title: 'City Page Video Section',
  type: 'object',
  fields: [
    defineField({
      name: 'Title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube or Vimeo video URL',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {title: 'heading', media: 'thumbnail'},
    prepare({title, media}) {
      return {
        title: title || 'City Page Video Section',
        media,
      }
    },
  },
})
