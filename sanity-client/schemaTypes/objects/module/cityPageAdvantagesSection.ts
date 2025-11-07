import {defineType, defineField} from 'sanity'

export const cityPageAdvantagesSection = defineType({
  name: 'cityPageAdvantagesSection',
  title: 'City Page Advantages Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      description: 'Main heading for the advantages section (e.g., "Advantages of a Indiana Business Address")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'advantages',
      title: 'Advantages',
      type: 'array',
      of: [
        defineField({
          name: 'advantage',
          title: 'Advantage',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon (SVG Code)',
              type: 'text',
              description: 'Paste SVG icon code here',
            }),
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
              description: 'Card heading (e.g., "Key Sectors", "Market Access", "Supportive Policies")',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              description: 'Description text for the advantage card',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'heading',
              subtitle: 'description',
            },
            prepare({title, subtitle}) {
              return {
                title: title || 'Untitled Advantage',
                subtitle: subtitle || '',
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'heading', advantages: 'advantages'},
    prepare({title, advantages}) {
      return {
        title: title || 'City Page Advantages Section',
        subtitle: advantages
          ? `${advantages.length} advantage${advantages.length !== 1 ? 's' : ''}`
          : 'No advantages yet',
      }
    },
  },
})

