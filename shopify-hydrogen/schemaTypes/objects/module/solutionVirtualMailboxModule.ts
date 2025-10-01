import {defineType, defineField} from 'sanity'

export const solutionVirtualMailboxModule = defineType({
  name: 'solutionVirtualMailboxModule',
  title: 'Solution Virtual Mailbox Module',
  type: 'object',
  fields: [
    defineField({
      name: 'leftImage',
      title: 'Left Side Image',
      type: 'image',
      description: 'Main mockup image (desktop + mobile view)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: "E.g. 'What is a Virtual Mailbox?'",
    }),
    defineField({
      name: 'description',
      title: 'Description',
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
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
      ],
      description: 'Rich text description under the title',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'leftImage',
    },
  },
})
