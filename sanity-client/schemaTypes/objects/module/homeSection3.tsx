import {defineType, defineField} from 'sanity'

export const homeSection3 = defineType({
  name: 'homeSection3',
  title: 'Who We Help',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'e.g. Who We Help',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'string',
      description: 'e.g. From solo professionals to scaling businesses...',
    }),
    defineField({
      name: 'tabs',
      title: 'Tabs',
      type: 'array',
      of: [
        defineField({
          name: 'tab',
          title: 'Tab',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Tab Label',
              type: 'string',
              description: 'e.g. Small Business Owner, E-Commerce Entrepreneur',
            }),
            defineField({
              name: 'heading',
              title: 'Tab Heading',
              type: 'string',
              description: 'Main heading inside the tab content',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              description: 'Short paragraph under the heading',
            }),
            defineField({
              name: 'keyNeeds',
              title: 'Key Needs',
              type: 'array',
              of: [{type: 'string'}],
              description: 'Bullet points (use check icons in frontend)',
            }),
            defineField({
              name: 'quote',
              title: 'Quote Section',
              type: 'object',
              fields: [
                {name: 'avatar', title: 'Avatar', type: 'image', options: {hotspot: true}},
                {name: 'author', title: 'Author / Role', type: 'string'},
                {name: 'text', title: 'Quote Text', type: 'text'},
              ],
            }),
            defineField({
              name: 'services',
              title: 'Key Services',
              type: 'array',
              of: [
                defineField({
                  name: 'service',
                  title: 'Service',
                  type: 'object',
                  fields: [
                    {
                      name: 'icon',
                      title: 'Icon',
                      type: 'object',
                      fields: [
                        {
                          name: 'upload',
                          title: 'Upload Icon',
                          type: 'image',
                          options: {hotspot: true},
                        },
                        {
                          name: 'svgCode',
                          title: 'SVG Code',
                          type: 'text',
                          description: 'Paste raw SVG markup if no upload',
                        },
                          {
          name: "tooltipTitle",
          title: "Tooltip Title",
          type: "string",
          description: "Title that appears on hover (tooltip) for this icon",
        },
                      ],
                    },
                    {name: 'title', title: 'Service Title', type: 'string'},
                    {name: 'description', title: 'Service Description', type: 'string'},
                  ],
                  preview: {
                    select: {title: 'title', subtitle: 'description', media: 'icon.upload'},
                  },
                }),
              ],
            }),
        
          ],
          preview: {
            select: {title: 'label', subtitle: 'heading'},
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'subtitle'},
    prepare({title, subtitle}) {
      return {
        title: title || 'Who We Help Section',
        subtitle: subtitle,
      }
    },
  },
})
