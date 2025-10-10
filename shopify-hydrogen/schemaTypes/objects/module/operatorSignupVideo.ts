// /schemaTypes/modules/operatorSignupVideo.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'operatorSignupVideo',
  title: 'Operator Signup Video',
  type: 'object',
  fields: [
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube Video URL',
      type: 'url',
      description:
        'Paste the full YouTube video link (e.g. https://www.youtube.com/watch?v=XXXX).',
    
    }),
    defineField({
      name: 'thumbnail',
      title: 'Custom Thumbnail Image',
      type: 'image',
      description: 'Upload a custom thumbnail image for the video (optional).',
      options: {
        hotspot: true, // enables cropping/focal point
      },
    }),
  ],

  preview: {
    select: {
      media: 'thumbnail',
      youtubeUrl: 'youtubeUrl',
    },
    prepare({youtubeUrl}) {
      return {
        title: 'Operator Signup Video',
        subtitle: youtubeUrl ? 'YouTube Embed Module' : 'No video link provided',
      }
    },
  },
})
