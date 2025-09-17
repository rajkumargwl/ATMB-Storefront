import {defineType, defineField} from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Thousand Trust - Testimonials',
  type: 'object',
  fields: [
    // Section heading
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

    // Testimonials list
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
            // Type of testimonial
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

            // ⭐ Quote-based testimonial
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
                { 
                  name: 'svgFile', 
                  title: 'Upload SVG File', 
                  type: 'file', 
                  options: { accept: '.svg' } 
                },
                { 
                  name: 'svgCode', 
                  title: 'Inline SVG Code', 
                  type: 'text' 
                },
              ],
              hidden: ({ parent }) => parent?.type !== 'quote',
            }),
            defineField({
              name: 'quote',
              title: 'Quote',
              type: 'text',
              hidden: ({ parent }) => parent?.type !== 'quote',
            }),
            defineField({
              name: 'readMoreText',
              title: 'Read More Text',
              type: 'string',
              initialValue: 'Read More',
              hidden: ({ parent }) => parent?.type !== 'quote',
            }),
            defineField({
              name: 'readMoreUrl',
              title: 'Read More URL',
              type: 'url',
              hidden: ({ parent }) => parent?.type !== 'quote',
            }),

            // 🎥 Video-based testimonial
            defineField({
              name: 'videoUrl',
              title: 'Video URL',
              type: 'url',
              hidden: ({ parent }) => parent?.type !== 'video',
            }),
            defineField({
              name: 'videoThumbnail',
              title: 'Video Thumbnail',
              type: 'image',
              options: { hotspot: true },
              hidden: ({ parent }) => parent?.type !== 'video',
            }),
            defineField({
              name: 'playIcon',
              title: 'Play Icon (SVG or Image)',
              type: 'object',
              fields: [
                { 
                  name: 'playSvgFile', 
                  title: 'Upload Play Icon (SVG)', 
                  type: 'file', 
                  options: { accept: '.svg' } 
                },
                { 
                  name: 'playSvgCode', 
                  title: 'Play Icon Inline SVG Code', 
                  type: 'text' 
                },
              ],
              hidden: ({ parent }) => parent?.type !== 'video',
            }),

            // 👤 Author Info
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
            }),
          ],
          preview: {
            select: {
              title: 'authorName',
              subtitle: 'type',
              media: 'authorImage',
            },
          },
        }),
      ],
    }),

    // Navigation (arrows)
    defineField({
      name: 'navigation',
      title: 'Navigation Arrows',
      type: 'object',
      fields: [
        {
          name: 'prevIcon',
          title: 'Previous Arrow Icon',
          type: 'string',
          initialValue: '←',
        },
        {
          name: 'nextIcon',
          title: 'Next Arrow Icon',
          type: 'string',
          initialValue: '→',
        },
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
