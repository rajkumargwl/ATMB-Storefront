import {defineType, defineField} from 'sanity'

export const heroType = defineType({
  name: 'hero',
  title: 'Mail. Calls. Growth',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'object',
      fields: [
        { name: 'label', title: 'Label', type: 'string' },
        { name: 'textColor', title: 'Text Color', type: 'color' },
        { name: 'bgColor', title: 'Background Color', type: 'color' },
      ],
    }),
    defineField({
      name: 'buttonLink',
      type: 'url',
      title: 'Button Link',
      validation: (Rule) => Rule.uri({
        allowRelative: true,  // allows /relative/links
        scheme: ['http', 'https', 'mailto', 'tel'],
      }),
    }),
    defineField({
      name: 'card',
      title: 'Card',
      type: 'object',
      fields: [
        { name: 'title1', title: 'Title 1', type: 'string' },
        { name: 'subtitle1', title: 'Sub Title 1', type: 'string' },
        { name: 'image1', title: 'Image 1', type: 'image' },
        { name: 'title2', title: 'Title 2', type: 'string' },
        { name: 'subtitle2', title: 'Sub Title 2', type: 'string' },
        { name: 'image2', title: 'Image 2', type: 'image' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'title',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Business Section',
        subtitle: subtitle || 'No title set',
      }
    },
  },
})