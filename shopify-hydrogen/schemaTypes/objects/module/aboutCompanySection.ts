import {defineType, defineField} from 'sanity'
// import {GlobeIcon} from '@sanity/icons'

export const aboutCompanySection = defineType({
  name: 'aboutCompanySection',
  title: 'About Company Section',
  type: 'object',
//   icon: GlobeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'About Anytime Mailbox',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
      rows: 3,
      initialValue:
        "We're more than just a company—we’re a team driven by innovation, collaboration, and a shared passion for making an impact.",
    }),
    defineField({
      name: 'items',
      title: 'Info Items',
      type: 'array',
      of: [
        defineField({
          name: 'item',
          title: 'Item',
          type: 'object',
          fields: [
             defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
              options: {
                accept: '.svg', // Restrict upload to SVG only
              },
              description: 'Icon name or reference (e.g., globe, house, star)',
            }),
            defineField({
          name: "tooltipTitle",
          title: "Tooltip Title",
          type: "string",
          description: "Title that appears on hover (tooltip) for this icon",
        }),

           
            defineField({
              name: 'description',
              title: 'Item Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
  },
})
