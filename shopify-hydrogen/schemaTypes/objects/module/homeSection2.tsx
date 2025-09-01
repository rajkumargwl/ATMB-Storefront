import {defineType, defineField} from 'sanity'

export const homeSection2 = defineType({
  name: 'homeSection2',
  title: 'Trusted by Businesses',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
  
    defineField({
      name: 'icons',
      title: 'Icons / Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'object',
              fields: [
                {
                  name: 'upload',
                  title: 'Upload Icon (SVG/PNG)',
                  type: 'image',
                  options: {hotspot: true},
                },
                {
                  name: 'svgCode',
                  title: 'SVG Code',
                  type: 'text',
                  rows: 4,
                  description: 'Paste raw SVG markup if no upload',
                },
              ],
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
          ],
          preview: {
            select: {title: 'label', media: 'icon.upload'},
            prepare({title, media}) {
              return {
                title: title || 'Icon item',
                media,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'images',
      title: 'Logos / Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      heading: 'heading',
    },
    prepare({title, heading}) {
      return {
        title: heading || 'Business Section 2',
        subtitle: title || 'No title set',
      }
    },
  },
})