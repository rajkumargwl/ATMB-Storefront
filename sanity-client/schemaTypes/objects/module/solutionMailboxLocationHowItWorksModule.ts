import {defineType, defineField} from 'sanity'

export const solutionMailboxLocationHowItWorksModule = defineType({
  name: 'solutionMailboxLocationHowItWorksModule',
  title: 'Solution Mailbox Location + How It Works Module',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'string',
      description: "E.g. 'Ready to Take Control of Your Mail?'",
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description:
        "E.g. 'Choose a location near you and get started in minutes — no long-term commitment required.'",
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'card',
          fields: [
            defineField({
              name: 'image',
              title: 'Card Image',
              type: 'image',
              options: {hotspot: true},
              description: 'Upload card image (e.g., person with a map, laptop screen, etc.)',
            }),
            defineField({
              name: 'title',
              title: 'Card Title',
              type: 'string',
              description: 'E.g. "Choose Location" or "How It Works"',
            }),
            defineField({
              name: 'description',
              title: 'Card Description',
              type: 'text',
              rows: 2,
              description:
                'E.g. "Select from hundreds of locations across the US that best fits your needs."',
            }),
            defineField({
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
              description: 'E.g. "Choose Location" or "How it Works"',
            }),
            defineField({
              name: 'buttonLink',
              title: 'Button Link',
              type: 'url',
              description: 'URL for button action',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'image',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
  },
})
