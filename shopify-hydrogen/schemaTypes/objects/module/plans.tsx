import {defineType, defineField} from 'sanity'

export const plans = defineType({
  name: 'plans',
  title: 'Stay Connected Section',
  type: 'object',
  fields: [
    // Section heading + description
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

    // Tabs (Individual Products, Bundles, Collections...)
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
            {
              name: 'tabName',
              title: 'Tab Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'tabCards',
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
                          type: 'file',
                          description: 'Upload SVG file if preferred',
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
                      name: 'subheading',
                      title: 'Subheading',
                      type: 'string',
                      description: 'Short description under the title',
                    },
                    {
                      name: 'startingFromText',
                      title: 'Starting From Text',
                      type: 'string',
                      initialValue: 'Starting from',
                    },
                    {
                      name: 'pricing',
                      title: 'Pricing',
                      type: 'object',
                      fields: [
                        {
                          name: 'monthly',
                          title: 'Monthly Price',
                          type: 'string',
                          description: 'Example: US$9/month',
                        },
                        {
                          name: 'yearly',
                          title: 'Yearly Price',
                          type: 'string',
                          description: 'Example: US$90/year',
                        },
                      ],
                    },
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
                      initialValue: 'Buy Now',
                    },
                    {
                      name: 'ctaUrl',
                      title: 'CTA Button URL',
                      type: 'url',
                    },
                    {
                      name: 'ctaTextColor',
                      title: 'CTA Text Color',
                      type: 'string',
                      description: 'Hex or CSS color (e.g. #fff)',
                    },
                    {
                      name: 'ctaBgColor',
                      title: 'CTA Background Color',
                      type: 'string',
                      description: 'Hex or CSS color (e.g. #FF6600)',
                    },
                    {
                      name: 'isMostPopular',
                      title: 'Mark as Most Popular',
                      type: 'boolean',
                      initialValue: false,
                    },
                    {
                      name: 'mostPopularLabel',
                      title: 'Most Popular Label',
                      type: 'string',
                      initialValue: 'Most Popular',
                    },
                  ],
                  preview: {
                    select: {
                      title: 'title',
                      subtitle: 'pricing.monthly',
                    },
                  },
                }),
              ],
            },
          ],
          preview: {
            select: {
              title: 'tabName',
            },
          },
        }),
      ],
    }),

    // Toggle (Monthly / Yearly)
    defineField({
      name: 'billingToggle',
      title: 'Billing Toggle',
      type: 'object',
      fields: [
        {
          name: 'monthlyLabel',
          title: 'Monthly Label',
          type: 'string',
          initialValue: 'Monthly',
        },
        {
          name: 'yearlyLabel',
          title: 'Yearly Label',
          type: 'string',
          initialValue: 'Yearly',
        },
        {
          name: 'discountLabel',
          title: 'Discount Label',
          type: 'string',
          initialValue: '20% Off',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'description',
    },
  },
})
