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
            type: 'array',
            of: [
              {
                type: 'block', // enables rich text
                styles: [
                  {title: 'Normal', value: 'normal'},
                  {title: 'H1', value: 'h1'},
                  {title: 'H2', value: 'h2'},
                  {title: 'H3', value: 'h3'},
                  {title: 'Quote', value: 'blockquote'},
                ],
                marks: {
                  decorators: [
                    {title: 'Bold', value: 'strong'},
                    {title: 'Italic', value: 'em'},
                    {title: 'Underline', value: 'underline'},
                    {title: 'Code', value: 'code'},
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
