import {defineType, defineField} from 'sanity'

export const solutionVirtualMailboxModule = defineType({
  name: 'solutionVirtualMailboxModule',
  title: 'Solution Virtual Mailbox Module',
  type: 'object',
  fields: [
    defineField({
      name: 'desktopImage',
      title: 'Desktop View Image',
      type: 'image',
      description: 'Main mockup image for desktop view',
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
      media: 'desktopImage', // show desktop image in preview
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: 'Virtual Mailbox Module',
        media: selection.media,
      }
    },
  },
})
