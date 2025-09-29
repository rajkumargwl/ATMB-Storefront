import {defineType, defineField} from 'sanity'

export const whyBusinessChooseUs = defineType({
  name: 'whyBusinessChooseUs',
  title: 'Why Businesses Choose Us',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main heading, e.g. Why Businesses Choose Us',
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text',
      description: 'e.g. Trusted by entrepreneurs, digital nomads...',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        defineField({
          name: 'feature',
          title: 'Feature',
          type: 'object',
          fields: [
            defineField({
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
                  description: 'Paste raw SVG markup here if not using upload',
                },
                                  {
          name: "tooltipTitle",
          title: "Tooltip Title",
          type: "string",
          description: "Title that appears on hover (tooltip) for this icon",
        },
            
              ],
            }),
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'description', title: 'Description', type: 'text'},
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'icon.upload',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({title}) {
      return {
        title: title || 'Why Businesses Choose Us Section',
      }
    },
  },
})
