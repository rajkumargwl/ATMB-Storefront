import {defineType, defineField} from 'sanity'

export const plans = defineType({
  name: 'plans',
  title: 'Stay Connected Section',
  type: 'object',
  fields: [
    // Individual Products Tab (with its own heading + description)
    defineField({
      name: 'individualProductsTab',
      title: 'Individual Products Tab',
      type: 'object',
      fields: [
        { 
          name: 'heading', 
          title: 'Heading', 
          type: 'string', 
          validation: (Rule) => Rule.required() 
        },
        { 
          name: 'description', 
          title: 'Description', 
          type: 'text', 
          rows: 2 
        },
        {
          name: 'plans',
          title: 'Individual Products',
          type: 'array',
          of: [
            {
              name: 'plan',
              title: 'Product Plan',
              type: 'object',
              fields: [
                {
                  name: 'icon',
                  title: 'Icon',
                  type: 'object',
                  fields: [
                    { name: 'svgCode', title: 'SVG Code', type: 'text' },
                    { name: 'svgFile', title: 'SVG File Upload', type: 'file' },
                                      {
          name: "tooltipTitle",
          title: "Tooltip Title",
          type: "string",
          description: "Title that appears on hover (tooltip) for this icon",
        },
            
                  ],
                },
                { name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() },
                { name: 'subheading', title: 'Subheading', type: 'string' },
                { name: 'startingFromText', title: 'Starting From Text', type: 'string', initialValue: 'Starting from' },
                {
                  name: 'pricing',
                  title: 'Pricing',
                  type: 'object',
                  fields: [
                    { name: 'monthly', title: 'Monthly Price', type: 'string' },
                    { name: 'yearly', title: 'Yearly Price', type: 'string' },
                  ],
                },
                { name: 'features', title: 'Features', type: 'array', of: [{ type: 'string' }] },
                { name: 'ctaText', title: 'CTA Button Text', type: 'string', initialValue: 'Buy Now' },
                { name: 'ctaUrl', title: 'CTA Button URL', type: 'url' },
                { name: 'isMostPopular', title: 'Mark as Most Popular', type: 'boolean', initialValue: false },
                { name: 'mostPopularLabel', title: 'Most Popular Label', type: 'string', initialValue: 'Most Popular' },
              ],
              preview: {
                select: { title: 'title', subtitle: 'pricing.monthly' },
              },
            },
          ],
        },
      ],
    }),

    // Bundles Tab (with its own heading + description)
    defineField({
      name: 'bundlesTab',
      title: 'Bundles Tab',
      type: 'object',
      fields: [
        { 
          name: 'heading', 
          title: 'Heading', 
          type: 'string', 
          validation: (Rule) => Rule.required() 
        },
        { 
          name: 'description', 
          title: 'Description', 
          type: 'text', 
          rows: 2 
        },
        {
          name: 'plans',
          title: 'Bundles',
          type: 'array',
          of: [
            {
              name: 'bundlePlan',
              title: 'Bundle Plan',
              type: 'object',
              fields: [
                { name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() },
                { name: 'subheading', title: 'Subheading', type: 'string' },
                {
                  name: 'pricing',
                  title: 'Pricing',
                  type: 'object',
                  fields: [
                    { name: 'originalPrice', title: 'Original Price', type: 'string' },
                    { name: 'discountedPrice', title: 'Discounted Price', type: 'string' },
                    { name: 'saveLabel', title: 'Save Label', type: 'string', description: 'e.g. Save 12%' },
                    { name: 'monthly', title: 'Monthly Price', type: 'string' },
                    { name: 'yearly', title: 'Yearly Price', type: 'string' },
                  ],
                },
                {
                  name: 'associatedProducts',
                  title: 'Associated Products',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        { name: 'productName', title: 'Product Name', type: 'string' },
                        { name: 'subheading', title: 'Subheading', type: 'string' },
                        { name: 'level', title: 'Level', type: 'string', description: 'e.g. Standard, Pro, Premium, Core, Full' },
                      ],
                    },
                  ],
                },
                { name: 'features', title: 'Bundle Features', type: 'array', of: [{ type: 'string' }] },
                { name: 'ctaText', title: 'CTA Button Text', type: 'string', initialValue: 'Buy Now' },
                { name: 'ctaUrl', title: 'CTA Button URL', type: 'url' },
              ],
              preview: {
                select: { title: 'title', subtitle: 'pricing.discountedPrice' },
              },
            },
          ],
        },
      ],
    }),

    // Toggle (Monthly / Yearly)
    defineField({
      name: 'billingToggle',
      title: 'Billing Toggle',
      type: 'object',
      fields: [
        { name: 'monthlyLabel', title: 'Monthly Label', type: 'string', initialValue: 'Monthly' },
        { name: 'yearlyLabel', title: 'Yearly Label', type: 'string', initialValue: 'Yearly' },
        { name: 'discountLabel', title: 'Discount Label', type: 'string', initialValue: '20% Off' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'individualProductsTab.heading',
      subtitle: 'bundlesTab.heading',
    },
  },
})
