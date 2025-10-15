import { defineType, defineField } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export const clientSuccessStoriesSection = defineType({
  name: 'clientSuccessStoriesSection',
  title: 'Testimonials Section',
  type: 'object',
  icon: UsersIcon,

  fields: [
    // 🏷️ Section Heading
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      description: 'Main title for the testimonials section',
    }),

    // 💬 Testimonials Array
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Testimonial',
          fields: [
            // 👤 Person Info
            {
              name: 'profileImage',
              title: 'Profile Image',
              type: 'image',
              options: { hotspot: true },
            },
            {
              name: 'name',
              title: 'Name',
              type: 'string',
            },
            {
              name: 'designation',
              title: 'Designation / Role',
              type: 'string',
              description: 'e.g. Independent Designer, New York',
            },

            // 💬 Quote or Highlight
            {
              name: 'quoteIcon',
              title: 'Quote Icon',
              type: 'image',
              description: 'Optional — small icon for the quote mark',
              options: { hotspot: true },
            },
            {
              name: 'quote',
              title: 'Main Quote',
              type: 'text',
              rows: 3,
              description: 'Displayed as the main testimonial quote',
            },

            // 📊 Result
            {
              name: 'result',
              title: 'Result Text',
              type: 'string',
              description: 'E.g. “Result: +40% client sign-ups in 6 months”',
            },

            // 🧩 Before/After Story
            {
              name: 'beforeAfter',
              title: 'Before / After Story',
              type: 'object',
              fields: [
                {
                  name: 'roleTag',
                  title: 'Role Tag',
                  type: 'string',
                  description: 'Small tag like “Freelancer – Designer & Consultant”',
                },
                {
                  name: 'beforeTitle',
                  title: 'Before Label',
                  type: 'string',
                  initialValue: 'Before:',
                },
                {
                  name: 'beforeDescription',
                  title: 'Before Description',
                  type: 'text',
                  rows: 3,
                },
                {
                  name: 'afterTitle',
                  title: 'After Label',
                  type: 'string',
                  initialValue: 'After:',
                },
                {
                  name: 'afterDescription',
                  title: 'After Description',
                  type: 'text',
                  rows: 3,
                },
              ],
            },
          ],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Testimonials Section',
        subtitle: 'Section with multiple client success stories',
      }
    },
  },
})
