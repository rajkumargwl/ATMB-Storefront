import { defineType, defineField } from 'sanity'
import { PackageIcon } from '@sanity/icons'

export const pdpdetailedFeaturesSection = defineType({
  name: 'pdpdetailedFeaturesSection',
  title: 'Detailed Features Section',
  type: 'object',
  icon: PackageIcon,

  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Main title for the section (e.g., "Detailed Features")',
      validation: (Rule) => Rule.required(),
    }),

    // Top features (Forwarding, Recycling, etc.)
    defineField({
      name: 'topFeatures',
      title: 'Top Features',
      type: 'array',
      description: 'List of main features such as Forwarding, Recycling, etc.',
      of: [
        defineField({
          name: 'feature',
          title: 'Feature',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon (SVG Supported)',
              type: 'image',
              options: { accept: 'image/svg+xml' },
              description: 'Upload SVG icon for the feature',
            }),
            defineField({
              name: 'title',
              title: 'Feature Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
              description: 'Short text like “Each at $5.00” or “Unlimited”',
            }),
          ],
        }),
      ],
    }),

    // Physical storage section
    defineField({
      name: 'physicalStorage',
      title: 'Physical Storage',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Subsection Title',
          type: 'string',
          initialValue: 'Physical Storage',
        }),
        defineField({
          name: 'storageItems',
          title: 'Storage Items',
          type: 'array',
          of: [
            defineField({
              name: 'storageItem',
              title: 'Storage Item',
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Item Title',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 2,
                  description:
                    'Example: “Free storage for 30 day(s), then $0.15 for every mail item per day”',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Detailed Features Section',
        subtitle: 'Features and Physical Storage details',
      }
    },
  },
})
