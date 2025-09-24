import {defineType, defineField} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export const joinTeamSection = defineType({
  name: 'joinTeamSection',
  title: 'Join Team Section',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Want to Join Our Team',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
      rows: 2,
      initialValue:
        "Join a team that powers one of the world's leading virtual mailbox services—while growing your own career.",
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      initialValue: 'Job Openings',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'url',
      description: 'Link to job openings page',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      initialValue: '#FF6600',
      description: 'Hex color code for background (default orange)',
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      initialValue: '#FFFFFF',
      description: 'Hex color code for text',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'buttonText',
    },
  },
})
