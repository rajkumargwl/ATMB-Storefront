import {defineType, defineField} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons'

export const contactUsSection = defineType({
  name: 'contactUsSection',
  title: 'Contact Us Section',
  type: 'object',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Contact Us',
    }),
    defineField({
      name: 'formTitle',
      title: 'Form Title',
      type: 'string',
      initialValue: 'Drop us a note',
    }),
    defineField({
      name: 'formDescription',
      title: 'Form Description',
      type: 'text',
      initialValue:
        'Please fill out the form below if you would like to learn more about our product and opportunities. One of our team members will get back to you shortly.',
    }),

    // ✅ Support Section
    defineField({
      name: 'supportSection',
      title: 'Support Section',
      type: 'object',
      fields: [
        defineField({
          name: 'sectionTitle',
          title: 'Support Section Title',
          type: 'string',
          initialValue: 'Prefer to talk to us?',
        }),
        defineField({
          name: 'sectionDescription',
          title: 'Support Section Description',
          type: 'string',
          initialValue: 'Chat or call us at',
        }),
        defineField({
          name: 'supportItems',
          title: 'Support Items',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'supportItem',
              title: 'Support Item',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string', // e.g. Customer Support
                }),
                defineField({
                  name: 'icon',
                  title: 'Country Icon',
                  type: 'image',
                  options: {hotspot: true},
                }),
                defineField({
                  name: 'contacts',
                  title: 'Contact Numbers',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      name: 'contact',
                      title: 'Contact',
                      fields: [
                        defineField({
                          name: 'icon',
                          title: ' Icon',
                          type: 'image',
                          options: {hotspot: true},
                        }),
                        defineField({
                          name: 'number',
                          title: 'Phone Number',
                          type: 'string',
                        }),
                        defineField({
                          name: 'phoneLink',
                          title: 'Phone Link',
                          type: 'url',
                          description: 'Use tel:+123456789 format',
                        }),
                      ],
                    },
                  ],
                }),
                defineField({
                  name: 'note',
                  title: 'Note',
                  type: 'string', // e.g. "Mon–Fri, 6AM–6PM PST"
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'quickLinks',
      title: 'Quick Links',
      type: 'array',
      of: [
        defineField({
          name: 'link',
          title: 'Link',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
            }),
          ],
        }),
      ],
    }),
  ]
})
