import { defineField, defineType } from 'sanity'
import { UserIcon } from '@sanity/icons'

export const referralStep = defineType({
  name: 'referralStep',
  title: 'Renter Referral',
  type: 'object',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Main Heading',
      type: 'string',
      description: 'Main title of the section (e.g., "How Does It Work?")',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
      description: 'A short subtitle below the main heading (e.g., "In 4 easy steps")',
    }),

    defineField({
      name: 'steps',
      title: 'Referral Steps',
      type: 'array',
      description: 'Add each step for the referral process (Register, Refer, Reward, Repeat)',
      of: [
        {
          type: 'object',
          title: 'Step',
          fields: [
            defineField({
              name: 'icon',
              title: 'Step Icon',
              type: 'image',
              description: 'Upload an icon for this step (e.g., register, refer, reward, repeat)',
              options: { hotspot: true },
            }),
            defineField({
              name: 'title',
              title: 'Step Title',
              type: 'string',
              description: 'Title for the step (e.g., "Register")',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Step Description',
              type: 'text',
              rows: 3,
              description: 'Description for this step (e.g., how the step works)',
              validation: (Rule) => Rule.required(),
            }),
            
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'icon',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],

  preview: {
    select: {
      title: 'heading',
      subtitle: 'subheading',
    },
  },
})
