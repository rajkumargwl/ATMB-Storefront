import {defineType, defineField} from 'sanity'

export const whyChooseVirtualMailbox = defineType({
  name: 'whyChooseVirtualMailbox',
  title: 'Why Choose Virtual Mailbox Slides',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      description: 'Main heading for this section, e.g., Why Choose Virtual Mailbox',
    }),
    defineField({
      name: 'subHeading',
      title: 'Section Description',
      type: 'text',
      description: 'Short description for the section',
    }),
    defineField({
      name: 'slides',
      title: 'Slides',
      type: 'array',
      of: [
        defineField({
          name: 'slide',
          title: 'Slide',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Slide Image',
              type: 'image',
              options: { hotspot: true },
              description: 'Upload the image for the slide',
            }),
            defineField({
              name: 'icon',
              title: 'Slide Icon',
              type: 'image',
              options: { hotspot: true },
              description: 'Optional icon for the slide',
            }),
            defineField({
              name: 'title',
              title: 'Slide Title',
              type: 'string',
              description: 'Main title for this slide',
            }),
            defineField({
              name: 'description',
              title: 'Slide Description',
              type: 'text',
              description: 'Text description for this slide',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'image',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({title}) {
      return {
        title: title || 'Why Choose Virtual Mailbox Section',
      }
    },
  },
})
