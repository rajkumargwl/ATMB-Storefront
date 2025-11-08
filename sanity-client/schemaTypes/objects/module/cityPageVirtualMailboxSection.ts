import {defineType, defineField} from 'sanity'

export const cityPageVirtualMailboxSection = defineType({
  name: 'cityPageVirtualMailboxSection',
  title: 'How Virtual Mailbox Works Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      description: 'Main heading for the section (e.g., "How Virtual Mailbox Works")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [
        defineField({
          name: 'step',
          title: 'Step',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon (SVG Code)',
              type: 'text',
              description: 'Paste the SVG code directly (e.g., from Figma or Heroicons)',
            }),
            defineField({
              name: 'title',
              title: 'Step Title',
              type: 'string',
              description: 'Please mention @city and @country for dynamic text',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Step Description',
              type: 'text',
              description: 'Please mention @city and @country for dynamic text',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
            prepare({title, subtitle}) {
              return {
                title: title || 'Untitled Step',
                subtitle: subtitle || '',
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    })
  ],
  preview: {
    select: {title: 'heading', steps: 'steps'},
    prepare({title, steps}) {
      return {
        title: title || 'Virtual Mailbox Section',
        subtitle: steps
          ? `${steps.length} step${steps.length !== 1 ? 's' : ''}`
          : 'No steps added yet',
      }
    },
  },
})
