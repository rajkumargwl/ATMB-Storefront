import {defineType, defineField} from 'sanity'

export const PDPTestimonials = defineType({
  name: 'PDPTestimonials',
  title: 'PDP Testimonials',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main heading for the section, e.g., "Thousand’s trust Anytime Phones"',
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'rating',
              title: 'Rating',
              type: 'number',
              description: 'Rating value, e.g., 4.5',
            }),
            defineField({
              name: 'quote',
              title: 'Quote',
              type: 'text',
              description: 'Testimonial text provided by the customer',
            }),
            defineField({
              name: 'authorName',
              title: 'Author Name',
              type: 'string',
              description: 'Name of the customer giving the testimonial',
            }),
            defineField({
              name: 'authorRole',
              title: 'Author Role',
              type: 'string',
              description: 'Customer role or title, e.g., "E-Commerce Entrepreneur"',
            }),
            defineField({
              name: 'authorImage',
              title: 'Author Image',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'video',
              title: 'Optional Video',
              type: 'object',
              fields: [
                defineField({
                  name: 'thumbnail',
                  title: 'Thumbnail',
                  type: 'image',
                  options: { hotspot: true },
                }),
                defineField({
                  name: 'url',
                  title: 'Video URL',
                  type: 'url',
                }),
              ],
            }),
            defineField({
              name: 'readMoreLink',
              title: 'Read More Link',
              type: 'url',
              description: 'Optional link for "Read More"',
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'testimonials.0.authorImage',
    },
    prepare({title, media}) {
      return {
        title: title || 'PDP Testimonials',
        media,
      }
    },
  },
})
