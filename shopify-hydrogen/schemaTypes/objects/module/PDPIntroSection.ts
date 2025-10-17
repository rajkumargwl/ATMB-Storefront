import {defineType, defineField} from 'sanity'

export const PDPIntroSection = defineType({
  name: 'PDPIntroSection',
  title: 'PDP Intro Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main heading with bold text, e.g., "Anytime Phone"',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Intro description text under heading',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
              description: 'Icon identifier or reference',
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'string',
              description: 'Example: "1 Included Phone Number"',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'object',
      fields: [
        defineField({
          name: 'quote',
          title: 'Quote',
          type: 'text',
          description: 'Customer testimonial text',
        }),
        defineField({
          name: 'author',
          title: 'Author Name',
          type: 'string',
        }),
        defineField({
          name: 'role',
          title: 'Author Role',
          type: 'string',
          description: 'Example: "E-Commerce Entrepreneur"',
        }),
        defineField({
          name: 'authorImage',
          title: 'Author Image',
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({
      name: 'rightImage',
      title: 'Right Side Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'rightImage',
    },
    prepare({title, media}) {
      return {
        title: title || 'PDP Intro Section',
        media,
      }
    },
  },
})
