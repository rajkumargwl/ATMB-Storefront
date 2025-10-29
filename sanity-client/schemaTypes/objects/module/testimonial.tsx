import { defineType, defineField } from 'sanity';
import { CommentIcon } from '@sanity/icons'; // 🧩 Icon import
export const testimonial = defineType({
  name: 'testimonial',
  title: 'Thousand Trust - Testimonials',
  type: 'object',
  icon: CommentIcon,
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

            // ⭐ Star Rating (for both quote & video)
            defineField({
              name: 'rating',
              title: 'Star Rating',
              type: 'number',
              validation: (Rule) => Rule.min(1).max(5),
            }),

            // Star Icon (for both types)
            defineField({
              name: 'starIcon',
              title: 'Star Icon',
              type: 'file',
              options: { accept: '.svg,.png' },
            }),

            // Quote Testimonial
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

            // Video Testimonial
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
              title: 'Play Icon',
              type: 'file',
              options: { accept: '.svg,.png' },
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
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'subheadline',
    },
  },
});
