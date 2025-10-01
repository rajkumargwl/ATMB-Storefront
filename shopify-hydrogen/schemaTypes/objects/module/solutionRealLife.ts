import {defineType, defineField} from 'sanity'

export const solutionRealLife = defineType({
  name: 'solutionRealLife',
  title: 'solutionRealLife',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: "E.g. 'How a Virtual Mailbox Works in Real Life'",
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
    defineField({
      name: 'rightImage',
      title: 'Right Side Image',
      type: 'image',
      description: 'Image of a person or illustration',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'rightImage',
    },
  },
})
