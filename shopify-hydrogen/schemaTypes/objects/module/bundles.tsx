import {defineType, defineField} from 'sanity'

export const bundles = defineType({
  name: 'bundles',
  title: 'Bundle & Save ',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow / Small Heading',
      type: 'string',
    }),
 
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'plans',
      title: 'Plans / Bundles',
      type: 'array',
      of: [
        defineField({
          name: 'plan',
          title: 'Plan',
          type: 'object',
          fields: [
            {
              name: 'badgeText',
              title: 'Badge Text (e.g. Save 12%)',
              type: 'string',
            },
            {
              name: 'title',
              title: 'Plan Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'subtitle',
              title: 'Plan Subtitle',
              type: 'string',
            },
            {
              name: 'startingFrom',
              title: 'Starting From',
              type: 'string',
              description: ' Starting price note',
            },
            {
              name: 'oldPrice',
              title: 'Old Price',
              type: 'string',
              description: 'Shown with strikethrough',
            },
            {
              name: 'price',
              title: 'Current Price',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'priceUnit',
              title: 'Price Unit (e.g. /month)',
              type: 'string',
              initialValue: '/month',
            },
            {
              name: 'services',
              title: 'Included Services',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'name', title: 'Service Name', type: 'string'},
                    {name: 'description', title: 'Service Description', type: 'string'},
                    {name: 'tier', title: 'Tier Label (Standard, Pro, Premium, Full, Core)', type: 'string'},
                  ],
                },
              ],
            },
            {
              name: 'features',
              title: 'Key Features',
              type: 'array',
              of: [{type: 'string'}],
            },
            {
              name: 'ctaText',
              title: 'CTA Button Text',
              type: 'string',
              initialValue: 'Get This Bundle',
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
         
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'price',
            },
          },
        }),
      ],
    }),
  ],
})