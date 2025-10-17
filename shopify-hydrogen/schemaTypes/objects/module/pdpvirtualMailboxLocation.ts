import { defineField, defineType } from 'sanity'
import { MapPin } from 'lucide-react'

export const pdpvirtualMailboxLocation = defineType({
  name: 'pdpvirtualMailboxLocation',
  title: 'Virtual Mailbox Location',
  type: 'document',
  icon: MapPin,

  fields: [
    // 🔹 Main location title
    defineField({
      name: 'locationTitle',
      title: 'Location Title',
      type: 'string',
      description: 'Main title of the location (e.g., Anaheim - Ball Rd)',
      validation: (Rule) => Rule.required(),
    }),

    // 🔹 Tags / Badges (now support icons)
    defineField({
      name: 'tags',
      title: 'Tags / Badges',
      type: 'array',
      description: 'Tags such as "Top Rated", "Premium Address", etc. Each tag can include an icon.',
      of: [
        defineField({
          name: 'tag',
          title: 'Tag',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Tag Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Tag Icon (Optional)',
              type: 'image',
              options: { accept: 'image/svg+xml' },
              description: 'Upload small SVG icon for this tag/badge.',
            }),
          ],
        }),
      ],
    }),

    // 🔹 Available Services
    defineField({
      name: 'services',
      title: 'Available Services',
      type: 'array',
      description: 'List of services provided at this location',
      of: [
        defineField({
          name: 'service',
          title: 'Service',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Service Icon',
              type: 'image',
              options: { hotspot: true, accept: 'image/svg+xml' },
              description: 'Upload SVG or image icon for the service',
            }),
            defineField({
              name: 'serviceName',
              title: 'Service Name',
              type: 'string',
              description: 'e.g., Mail Forwarding, Document Scanning',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),

    // 🔹 Address Preview (converted to use rich text for address)
    defineField({
      name: 'addressPreview',
      title: 'Your Real Street Address Preview',
      type: 'object',
      description: 'Right-side section showing address and name details',
      fields: [
        defineField({
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          description: 'e.g., Your Real Street Address Preview',
        }),
        defineField({
          name: 'yourNameLabel',
          title: 'Your Name Label',
          type: 'string',
          description: 'Label text for Your Name',
          initialValue: 'Your Name',
        }),
        defineField({
          name: 'yourCompanyLabel',
          title: 'Your Company Label',
          type: 'string',
          description: 'Label text for Your Company Name',
          initialValue: 'Your Company Name',
        }),
        defineField({
          name: 'address',
          title: 'Address Details',
          type: 'portableText', // 🟢 changed from array → rich text editor
          description:
            'Enter address with formatting (e.g., “Ste 4B #MAILBOX, Anaheim, CA 92804”). Supports bold, line breaks, etc.',
        }),
      ],
    }),

  ],

  preview: {
    select: {
      title: 'locationTitle',
      subtitle: 'tags.0.label',
      media: 'services.0.icon',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `Tag: ${subtitle}` : 'Virtual Mailbox Location',
        media,
      }
    },
  },
})
