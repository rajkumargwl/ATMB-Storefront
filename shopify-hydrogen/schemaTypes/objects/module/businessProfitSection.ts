import {defineType, defineField} from 'sanity'
// import {ChartUpIcon} from '@sanity/icons'

export const businessProfitSection = defineType({
  name: 'businessProfitSection',
  title: 'Business Profit Section',
  type: 'object',
  // icon: ChartUpIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Everything you need to make record profits',
      validation: (Rule) => Rule.required(),
    }),

    // 👉 Content Cards
    defineField({
      name: 'features',
      title: 'Feature Cards',
      type: 'array',
      of: [
        defineField({
          name: 'feature',
          title: 'Feature',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Feature Icon',
              type: 'image',
              options: {hotspot: true},
              description: 'Upload an icon for this feature card (e.g., step, toolkit, masterclass).',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'heading',
              title: 'Feature Heading',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Feature Description',
              type: 'text',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'heading',
              subtitle: 'description',
              media: 'icon',
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).error('At least one feature card is required'),
      description:
        'Add feature cards like "7 Step Rapid Growth System", "Monthly Masterclasses", "Live Training with Tony", etc.',
    }),

    // 👉 Image Section (Right Side)
    defineField({
      name: 'sideImage',
      title: 'Right Side Image',
      type: 'image',
        options: {
    accept: 'image/*,.svg', // allows all images + svg
  },
      description: 'Upload the main image that appears on the right (e.g., smiling businessman with money).',
      validation: (Rule) => Rule.required(),
    }),

    // 👉 Testimonials Section
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        defineField({
          name: 'testimonial',
          title: 'Testimonial',
          type: 'object',
          fields: [
            defineField({
              name: 'quote',
              title: 'Testimonial Quote',
              type: 'text',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'name',
              title: 'Person Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Person Role',
              type: 'string',
              initialValue: 'E-Commerce Entrepreneur',
            }),
            defineField({
              name: 'avatar',
              title: 'Person Avatar',
              type: 'image',
              options: {hotspot: true},
              description: 'Upload the avatar image for the testimonial person.',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'quote',
              media: 'avatar',
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).error('At least one testimonial is required'),
      description:
        'Add testimonials with quote, name, role, and avatar image (e.g., “Thank you for the SEO presentation” – Bessie Cooper).',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'features.0.heading',
      media: 'sideImage',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Business Profit Section',
        subtitle: subtitle ? `First Feature: ${subtitle}` : 'No features added yet',
        media,
      }
    },
  },
})
