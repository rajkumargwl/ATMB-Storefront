import {defineType, defineField} from 'sanity'
// import {VideoIcon} from '@sanity/icons'

export const businessStrategySection = defineType({
  name: 'businessStrategySection',
  title: 'Business Strategy Section (Video)',
  type: 'object',
  // icon: VideoIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue:
        'Learn the strategies Anytime Business Accelerator uses to grow your business',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
              {title: 'Underline', value: 'underline'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'URL',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'Link URL',
                  },
                ],
              },
            ],
          },
        },
      ],
      description: 'Rich text area describing the section content',
      validation: (Rule) => Rule.required(),
    }),
   
    // 🎥 Video Fields
    defineField({
      name: 'videoThumbnail',
      title: 'Video Thumbnail',
      type: 'image',
      options: {hotspot: true},
      description: 'Upload a thumbnail image that appears before the video plays',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoLink',
      title: 'Video Link',
      type: 'url',
      description:
        'Add a video URL (YouTube, Vimeo, or a hosted MP4 file link)',
      validation: (Rule) => Rule.uri({
        scheme: ['http', 'https'],
        allowRelative: false,
      }),
    }),
    defineField({
          name: 'label',
          title: 'Button Label',
          type: 'string',
          initialValue: 'What we are about',
        }),
   

  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'videoLink',
      media: 'videoThumbnail',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Business Strategy Section (Video)',
        subtitle: subtitle ? `Video: ${subtitle}` : 'No video link added',
        media,
      }
    },
  },
})
