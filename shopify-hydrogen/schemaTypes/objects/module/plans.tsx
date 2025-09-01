import {defineType, defineField} from 'sanity'

export const plans = defineType({
  name: 'plans',
  title: 'Stay Connected',
  type: 'object',
  fields: [
  defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    // Cards array
    defineField({
      name: 'plans',
      title: 'Plans / Cards',
      type: 'array',
      of: [
        defineField({
          name: 'plan',
          title: 'Plan',
          type: 'object',
          fields: [
              {
              name: 'icon',
              title: 'Icon',
              type: 'object',
              fields: [
                {
                  name: 'svgCode',
                  title: 'SVG Code',
                  type: 'text',
                  description: 'Paste raw SVG markup here (optional)',
                },
                {
                  name: 'svgFile',
                  title: 'SVG File Upload',
                  type: 'image',
                  description: 'Upload SVG file if you prefer',
                  options: {accept: 'image/svg+xml'},
                },
              ],
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'price',
              title: 'Price',
              type: 'string',
              description: 'Example: $9/month, Free, etc.',
            },
            defineField({
                name: 'heading',
                title: 'Heading',
                type: 'string',
                validation: (Rule) => Rule.required(),
            }),
            {
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [{type: 'string'}],
              description: 'Plain text list — checkmark icons added in frontend',
            },
     
            {
              name: 'ctaText',
              title: 'CTA Button Text',
              type: 'string',
              initialValue: 'Get Started',
            },
            {
              name: 'ctaUrl',
              title: 'CTA Button URL',
              type: 'url',
            },
            {
              name: 'ctaTextColor',
              title: 'CTA Text Color',
              type: 'color',  
            },
            {
              name: 'ctaBgColor',
              title: 'CTA Background Color',
              type: 'color',  
            },
            {
              name: 'isMostPopular',
              title: 'Mark as Most Popular',
              type: 'boolean',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'price',
              media: 'icon',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'eyebrow',
    },
  },
})