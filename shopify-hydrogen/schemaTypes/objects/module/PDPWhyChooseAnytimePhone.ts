import {defineType, defineField} from 'sanity'

export const PDPWhyChooseAnytimePhone = defineType({
  name: 'PDPWhyChooseAnytimePhone',
  title: 'PDP - Why Choose',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main section heading, e.g., "Why Choose Anytime Phone"',
    }),
    defineField({
      name: 'subHeading',
      title: 'Sub Heading',
      type: 'text',
      description: 'Small description text under heading',
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
              options: { hotspot: true },
              description: 'Feature icon image',
            }),
            defineField({
              name: 'title',
              title: 'Feature Title',
              type: 'string',
              description: 'Example: "Professional Image"',
            }),
            defineField({
              name: 'description',
              title: 'Feature Description',
              type: 'text',
              description: 'Supporting text for the feature',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'image',
      title: 'Right Side Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Main image displayed on the right side',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'image',
    },
    prepare({title, media}) {
      return {
        title: title || 'Why Choose Anytime Phone Section',
        media,
      }
    },
  },
})
