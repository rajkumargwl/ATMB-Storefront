import {defineType, defineField} from 'sanity'

export const homeSection3 = defineType({
  name: 'homeSection3',
  title: 'Who We Help',
  type: 'object',
  fields: [
   
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle1',
      title: 'Subtitle 1',
      type: 'string',
    }),
    defineField({
      name: 'subtitle2',
      title: 'Subtitle 2',
      type: 'string',
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
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
            defineField({
              name: 'keyNeeds',
              title: 'Key Needs',
              type: 'array',
              of: [{type: 'string'}],
            }),
            defineField({
              name: 'services',
              title: 'Relevant Services',
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
                          description: 'Paste raw SVG markup here',
                        },
                      ],
                    },
                    {name: 'title', title: 'Service Title', type: 'string'},
                  ],
                }),
              ],
            }),
            defineField({
              name: 'button',
              title: 'Button',
              type: 'object',
              fields: [
                {name: 'label', title: 'Label', type: 'string'},
                {name: 'textColor', title: 'Text Color', type: 'color'},
                {name: 'bgColor', title: 'Background Color', type: 'color'},
              ],
            }),
            defineField({
              name: 'image',
              title: 'Main Image',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({
              name: 'quote',
              title: 'Quote',
              type: 'string',
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