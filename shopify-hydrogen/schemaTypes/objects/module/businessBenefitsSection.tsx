import {defineType, defineField} from 'sanity'

export const businessBenefitsSection = defineType({
  name: 'businessBenefitsSection',
  title: 'Business Benefits Section',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Main Heading',
      type: 'string',
      description: 'Enter the main heading for the section (e.g., "The Real Benefits Our Customers Experience")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subHeading',
      title: 'Sub Heading',
      type: 'text',
      description: 'Short description shown below the main heading',
    }),
    defineField({
      name: 'benefitCards',
      title: 'Benefit Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Benefit Card',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon (SVG supported)',
              type: 'image',
              description: 'Upload an SVG or image icon representing the benefit',
              options: {hotspot: true},
            }),
            defineField({
              name: 'stat',
              title: 'Statistic / Highlight',
              type: 'string',
              description: 'Example: "87% of customers manage mail remotely"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Card Title',
              type: 'string',
              description: 'Example: "Run Your Business from Anywhere"',
            }),
          
            defineField({
              name: 'testimonial',
              title: 'Customer Testimonial',
              type: 'text',
              description: 'Example: "I run my business while traveling 8 months a year."',
            }),
            defineField({
              name: 'customerName',
              title: 'Customer Name',
              type: 'string',
              description: 'Example: "David K."',
            }),
            defineField({
              name: 'customerRole',
              title: 'Customer Role',
              type: 'string',
              description: 'Example: "E-Commerce Entrepreneur"',
            }),
          ],
        },
      ],
    }),
  ],
})
