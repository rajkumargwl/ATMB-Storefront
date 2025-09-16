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
      description: 'Main heading, e.g. Trusted by Businesses Around the World',
    }),
    defineField({
      name: 'highlight',
      title: 'Highlight Years',
      type: 'object',
      fields: [
        {name: 'value', title: 'Value', type: 'string', description: 'e.g. 15+'},
        {name: 'label', title: 'Label', type: 'string', description: 'e.g. Years powering virtual operations'},
      ],
    }),
    defineField({
      name: 'ratings',
      title: 'Ratings',
      type: 'array',
      of: [
        defineField({
          name: 'ratingItem',
          title: 'Rating Item',
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform Name',
              type: 'string',
              description: 'e.g. Google, Shopper Approved',
            },
            {
              name: 'logo',
              title: 'Platform Logo',
              type: 'image',
              options: {hotspot: true},
            },
            {
              name: 'score',
              title: 'Score',
              type: 'string',
              description: 'e.g. 4.5/5',
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'e.g. on Google Review',
            },
          ],
          preview: {
            select: {title: 'platform', subtitle: 'score', media: 'logo'},
          },
        }),
      ],
    }),
    defineField({
      name: 'logos',
      title: 'Partner Logos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'logo',
              title: 'Logo',
              type: 'image',
              options: {hotspot: true},
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
          preview: {
            select: {title: 'alt', media: 'logo'},
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
    },
    prepare({heading}) {
      return {
        title: heading || 'Trusted by Businesses Section',
      }
    },
  },
})
