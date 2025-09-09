import {defineType, defineField} from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Thousand trust - Testimonials',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'string',
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        defineField({
          name: 'testimonial',
          title: 'Testimonial',
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Quote with Rating', value: 'quote' },
                  { title: 'Video Testimonial', value: 'video' },
                ],
                layout: 'radio',
              },
            }),

            // ⭐ Quote Testimonials
            defineField({
              name: 'rating',
              title: 'Star Rating',
              type: 'number',
              validation: (Rule) => Rule.min(1).max(5),
              hidden: ({ parent }) => parent?.type !== 'quote',
            }),
            defineField({
              name: 'starIcon',
              title: 'Star Icon (SVG Upload/Code)',
              type: 'object',
              fields: [
                { name: 'svgFile', title: 'Upload SVG File', type: 'file', options: { accept: '.svg' } },
                { name: 'svgCode', title: 'Inline SVG Code', type: 'text' },
              ],
              hidden: ({ parent }) => parent?.type !== 'quote',
            }),
            defineField({
              name: 'quote',
              title: 'Quote',
              type: 'text',
              hidden: ({ parent }) => parent?.type !== 'quote',
            }),

            // 🎥 Video Testimonials
            defineField({
              name: 'videoUrl',
              title: 'Video URL',
              type: 'url',
              hidden: ({ parent }) => parent?.type !== 'video',
            }),
            defineField({
              name: 'playIcon',
              title: 'Video Thumbnail Image',
              type: 'object',
              fields: [
                { name: 'playSvgFile', title: 'Thumbnail', type: 'image', options: { hotspot: true } },
                { name: 'playSvgCode', title: 'Thumbnail (Inline SVG Code)', type: 'text' },
              ],
              hidden: ({ parent }) => parent?.type !== 'video',
            }),

            // 👤 Author Info (common)
            defineField({
              name: 'authorName',
              title: 'Author Name',
              type: 'string',
            }),
            defineField({
              name: 'authorTitle',
              title: 'Author Title/Role',
              type: 'string',
            }),
            defineField({
              name: 'authorImage',
              title: 'Author Image',
              type: 'image',
              options: { hotspot: true },
              // hidden: ({ parent }) => parent?.type !== 'quote', // hide in video testimonials
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'subheadline',
    },
  },
})